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
import { createRedisClient } from '$common/redis'

import { RedisPersistance } from '../y-redis/RedisPersistance'
import { Connections } from './Connections'
import { Document } from './Document'
import { readMessageYjs, writeAwarenessUpdate, writeSyncStep1, writeSyncUpdate } from './messages'
import { AwarenessUpdate, Connection } from './types'

interface Options {
  timeout?: number
}

export class YjsServer {
  documents = new Map<string, Document>()
  httpServer?: HTTPServer
  wsServer?: WebSocketServer
  connections = new Connections()
  redisPersistence = new RedisPersistance({
    createRedisClient,
  })
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
      // log.debug(`Authorization header: ${request.headers['authorization']}`)
      // log.debug(`Cookie: ${request.headers.cookie}`)
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
    // let doc: Document
    // if (this.documents.has(documentId)) {
    //   doc = this.documents.get(documentId) as Document
    // } else {
    //   doc = new Document(documentId)
    //   doc.createDefaultDoc()
    //   this.documents.set(doc.id, doc)
    // }

    // Queue messages while fetching the document from persistence
    // Otherwise they'll be lost (probably could be handled by improving WebSocketProvider)
    // and the client's provider won't trigger 'synced' event
    const queue: Uint8Array[] = []
    const listener = (data: Uint8Array) => queue.push(data)
    socket.on('message', listener)

    const doc = await this.redisPersistence.fetchYDoc(documentId)
    if (!this.documents.has(doc.id)) {
      this.documents.set(doc.id, doc)
    }
    log.debug(`Documents: ${this.documents.size}`)

    // const clientID = doc.yDoc.clientID ???
    // const userId = socket.user.id
    doc.onYDocUpdate(this.onDocUpdate.bind(this))
    doc.onAwarenessUpdate(this.onAwarenessUpdate.bind(this))

    this.connections.add(
      socket,
      request,
      documentId,
      (conn, data) => this.onMessage(doc, conn, data),
      () => this.onClose(doc)
    )
    socket.send(writeSyncStep1(doc.yDoc))
    socket.off('message', listener)
    // Replay queued messages
    queue.forEach((d) => socket.emit('message', d))

    // TODO changedClients aka clientIDs???
    // socket.send(writeAwarenessUpdate(doc.awareness, [doc.awareness.clientID]))
  }

  onMessage(doc: Document, conn: Connection, data: ArrayBuffer) {
    const result = readMessageYjs(data, doc, conn)
    log.debug(`onMessage (${doc.id}) (ok ${result.ok})`)
    if (!result.ok) {
      log.error(`Failed to read socket message: ${result.error}`)
      return
    } else if (result.data) {
      // TODO unneeded? onDocUpdate triggers if update?
      const connections = this.connections.getChannelConnections(doc.id)
      log.debug(`Sending data to clients: ${connections.size}`)
      connections.forEach((conn) => {
        conn.socket.send(result.data)
      })
    }
  }

  onClose(doc: Document) {
    log.debug(`onClose (${doc.id})`)
    const connections = this.connections.getChannelConnections(doc.id)
    const clientIDs = Array.from(connections.values()).reduce(
      (acc, c) => [...acc, ...c.awarenessClientIDs],
      [] as number[]
    )
    removeAwarenessStates(doc.awareness, clientIDs, null)
    if (connections.size === 0) {
      doc.decrementDeletion()
      // TODO check documents either in pingIntervals or in another minute interval
      // and decrementDeletion for all docs that have no connections, delete & persist
      // them once it reaches 0
    }
  }

  onDocUpdate(update: Uint8Array, docId: string) {
    log.debug(`onDocUpdate (${docId})`)
    const connections = this.connections.getChannelConnections(docId)
    const message = writeSyncUpdate(update)
    connections.forEach((conn) => {
      conn.socket.send(message)
    })
  }

  // OutgoingMessage.createAwarenessUpdateMessage
  onAwarenessUpdate(update: AwarenessUpdate, docId: string, awareness: Awareness) {
    log.debug(`onAwarenessUpdate: (doc.id ${docId}) (update ${update})`)
    const changedClientIDs = this.connections.updateConnections(docId, update)
    // TODO not pretty
    const clientIDs =
      changedClientIDs.length > 0 ? changedClientIDs : Array.from(awareness.getStates().keys())
    const connections = this.connections.getChannelConnections(docId)
    const message = writeAwarenessUpdate(awareness, clientIDs)
    connections.forEach((conn) => {
      conn.socket.send(message)
    })
  }

  destroy() {
    this.httpServer?.close()
    this.wsServer?.close()
  }
}
