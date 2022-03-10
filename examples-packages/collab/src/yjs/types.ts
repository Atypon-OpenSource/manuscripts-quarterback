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
import { IncomingMessage } from 'http'
import WebSocket from 'ws'
import { messageYjsSyncStep1, messageYjsSyncStep2, messageYjsUpdate } from 'y-protocols/sync'

export type Connection = {
  id: string
  socket: WebSocket
  namespaces: string[]
  awarenessClientIDs: number[]
  pongReceived: boolean
  request: IncomingMessage
}

export enum SyncMessageType {
  sync_step_1 = messageYjsSyncStep1,
  sync_step_2 = messageYjsSyncStep2,
  yjs_update = messageYjsUpdate,
}
export enum YjsMessageType {
  sync = 0,
  awareness = 1,
  auth = 2,
  queryAwareness = 3,
}

export interface AwarenessUpdate {
  added: number[]
  updated: number[]
  removed: number[]
}
