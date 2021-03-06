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
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'

import type { yjsExtension } from './extension'
import type { createYjsStore } from './store'

export const yjsExtensionName = 'yjs' as const

export type YjsExtension = ReturnType<ReturnType<typeof yjsExtension>>
export type YjsOptions = {
  document: {
    id: string
  }
  user: YjsUser
  initial?: {
    doc: Doc
    provider: WebsocketProvider
  }
  ws_url: string
}

export type YjsStore = ReturnType<typeof createYjsStore>
export interface YjsExtensionState {
  snapshots: YjsSnapshot[]
  selectedSnapshot: YjsSnapshot | null
  currentUser: YjsUser
  usersMap: Map<number, YjsUser>
}
export enum YjsStatus {
  enabled = 'enabled',
  disabled = 'disabled',
}
export interface YjsUser {
  id: string
  clientID: number
  name: string
  color: string
}

export interface YjsSnapshot {
  id: string
  date: number
  snapshot: Uint8Array
  clientID: number
}

export type AwarenessChange = {
  added: number[]
  updated: number[]
  removed: number[]
}
