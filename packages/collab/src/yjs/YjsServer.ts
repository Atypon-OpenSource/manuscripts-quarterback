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
import { uuidv4 } from '@manuscripts/quarterback-shared'
import { IncomingMessage, Server as HTTPServer } from 'http'
import WebSocket, { WebSocketServer } from 'ws'
import { Awareness, removeAwarenessStates } from 'y-protocols/awareness'

import { log } from '$common/logger'

import { Connections } from './Connections'
import { Document } from './Document'
import {
  readMessageYjs,
  writeAwarenessUpdate,
  writeSyncStep1,
  writeSyncUpdate,
} from './messages'
import { AwarenessUpdate, Connection } from './types'

interface Options {
  timeout?: number
}

export class YjsServer {
  documents = new Map<string, Document>()
  httpServer?: HTTPServer
  wsServer?: WebSocketServer
  connections = new Connections()
  opts: Required<Options>

  constructor(opts?: Options) {
    this.opts = Object.assign(
      {
        timeout: 30000,
      },
      opts
    )
  }

  start(server: HTTPServer) {
    log.debug('YjsServer started')
    this.wsServer = new WebSocketServer({ noServer: true })
    this.wsServer.on('connection', this.onConnection.bind(this))
    this.httpServer = server
    this.httpServer.on('upgrade', (request, socket, head) => {
      log.warn(`Authorization header: ${request.headers['authorization']}`)
      log.warn(`Cookie: ${request.headers.cookie}`)
      // TODO parse Authorization from request, check jwt
      // and add user to the socket?
      // @ts-ignore
      this.wsServer?.handleUpgrade(request, socket, head, (ws) => {
        this.wsServer?.emit('connection', ws, request)
      })
    })
  }

  async onConnection(socket: WebSocket, request: IncomingMessage) {
    const socketId = uuidv4()
    log.debug(`New websocket connection: ${socketId.slice(0, 5)}`)
    const documentId = decodeURI(request.url?.slice(1)?.split('?')[0] || '')
    // const query = request?.url?.split('?') || []
    // const queryParams = new URLSearchParams(query[1] ? query[1] : '')
    log.debug(`Parsed documentId: ${documentId}`)
    const doc = this.documents.get(documentId) || new Document(documentId)
    if (!this.documents.has(doc.id)) {
      this.documents.set(doc.id, doc)
    }
    // const clientID = doc.yDoc.clientID ???
    // const userId = socket.user.id
    doc.onYDocUpdate(this.onDocUpdate.bind(this))
    doc.onAwarenessUpdate(this.onAwarenessUpdate.bind(this))
    log.debug(`Documents: ${this.documents.size}`)
    this.connections.add(
      socket,
      request,
      documentId,
      (conn, data) => this.onMessage(doc, conn, data),
      () => this.onClose(doc)
    )
    socket.send(writeSyncStep1(doc.yDoc))
    // TODO changedClients aka clientIDs???
    // socket.send(writeAwarenessUpdate(doc.awareness, [doc.awareness.clientID]))
  }

  onMessage(doc: Document, conn: Connection, data: ArrayBuffer) {
    log.debug('onMessage')
    const result = readMessageYjs(data, doc, conn)
    if (!result.ok) {
      log.error(`Failed to read socket message: ${result.error}`)
      return
    } else if (result.data) {
      const connections = this.connections.getChannelConnections(doc.id)
      log.debug(`Sending data to clients: ${connections.size}`)
      connections.forEach((conn) => {
        conn.socket.send(result.data)
      })
    }
  }

  onClose(doc: Document) {
    const connections = this.connections.getChannelConnections(doc.id)
    const clientIDs = Array.from(connections.values()).reduce(
      (acc, c) => [...acc, ...c.awarenessClientIDs],
      [] as number[]
    )
    removeAwarenessStates(doc.awareness, clientIDs, null)
    if (connections.size === 0) {
      this.documents.delete(doc.id)
      doc.yDoc.destroy()
      // TODO persist document here!
      // maybe write to disk?
    }
  }

  onDocUpdate(update: Uint8Array, docId: string) {
    const connections = this.connections.getChannelConnections(docId)
    const message = writeSyncUpdate(update)
    connections.forEach((conn) => {
      conn.socket.send(message)
    })
  }

  // OutgoingMessage.createAwarenessUpdateMessage
  onAwarenessUpdate(
    update: AwarenessUpdate,
    docId: string,
    awareness: Awareness
  ) {
    log.debug(
      `onAwarenessUpdate: (doc.id ${docId.slice(0, 5)}) (update ${update})`
    )
    const changedClientIDs = this.connections.updateConnections(docId, update)
    // TODO not pretty
    const clientIDs =
      changedClientIDs.length > 0
        ? changedClientIDs
        : Array.from(awareness.getStates().keys())
    const connections = this.connections.getChannelConnections(docId)
    const message = writeAwarenessUpdate(awareness, clientIDs)
    connections.forEach((conn) => {
      conn.socket.send(message)
    })
  }

  persist(docId: string, update: Uint8Array) {}

  destroy() {
    this.httpServer?.close()
    this.wsServer?.close()
  }
}
