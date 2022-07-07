/*!
 * © 2021 Atypon Systems LLC
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import { uuidv4 } from '@manuscripts/examples-track-types'
import { IncomingMessage } from 'http'
import WebSocket from 'ws'

import { log } from '$common/logger'

import { AwarenessUpdate, Connection } from './types'

interface Options {
  ping_timeout?: number
}

const EMPTY_SET = new Set<Connection>()

export class Connections {
  connections = new Map<string, Connection>()
  channels = new Map<string, Set<Connection>>()

  opts: Required<Options>

  constructor(opts?: Options) {
    this.opts = Object.assign(
      {
        ping_timeout: 30000,
      },
      opts
    )
  }

  getChannelConnections(docId: string) {
    return this.channels.get(docId) || EMPTY_SET
  }

  add(
    socket: WebSocket,
    request: IncomingMessage,
    docId: string,
    onMessage: (conn: Connection, data: ArrayBuffer) => void,
    onClose: () => void
  ) {
    const conn = {
      id: uuidv4(),
      socket,
      namespaces: [],
      awarenessClientIDs: [],
      request,
      pongReceived: true,
    }
    socket.binaryType = 'arraybuffer'
    const closeConnection = () => {
      this.connections.delete(conn.id)
      this.removeConnectionFromChannel(docId, conn)
      onClose()
    }
    socket.on('close', (code) => {
      log.debug('Received connection close: ' + code)
      closeConnection()
    })
    socket.on('message', (data: ArrayBuffer) => onMessage(conn, data))
    socket.on('pong', () => {
      log.debug('Received pong for: ' + conn.id)
      this.updateConnectionPong(conn.id)
      // TODO basically conn.pongReceived = true should work without explicit setting??
    })
    this.connections.set(conn.id, conn)
    this.addConnectionToChannel(docId, conn)
    this.initConnectionPing(conn.id, closeConnection)
    return conn
  }

  addConnectionToChannel(channel: string, conn: Connection) {
    const existing = this.channels.get(channel)
    if (existing) {
      this.channels.set(channel, existing.add(conn))
    } else {
      this.channels.set(channel, new Set([conn]))
    }
  }

  removeConnectionFromChannel(channel: string, conn: Connection) {
    const existing = this.channels.get(channel)
    if (existing) {
      existing.delete(conn)
      // TODO keep existing immutable -> create new Set with deleted values
      existing.size === 0 && this.channels.delete(channel)
    }
  }

  updateConnections(docId: string, { added, updated, removed }: AwarenessUpdate) {
    const connections = this.getChannelConnections(docId)
    connections.forEach((conn) => {
      // These assignments will mutate the original connection object, hence no
      // setting needed. HOWEVER it would be much better to do so because this is
      // very error-prone.
      conn.awarenessClientIDs = conn.awarenessClientIDs.filter((clientID) =>
        removed.includes(clientID)
      )
      conn.awarenessClientIDs.concat(added)
      // TODO check for duplicates? or why not just use Set instead of array?
    })
    return added.concat(updated, removed)
  }

  updateConnectionPong(connId: string) {
    const conn = this.connections.get(connId)
    if (conn) {
      conn.pongReceived = true
      // TODO not immutable...
    }
  }

  initConnectionPing(connId: string, onClose: () => void) {
    const pingInterval = setInterval(() => {
      const conn = this.connections.get(connId)
      if (!conn) {
        clearInterval(pingInterval)
      } else if (!conn?.pongReceived) {
        log.debug('Ping failed, closing connection: ' + connId.slice(0, 5))
        onClose()
        clearInterval(pingInterval)
      } else {
        log.debug('Ping success: ' + connId.slice(0, 5))
      }
    }, this.opts.ping_timeout)
  }
}
