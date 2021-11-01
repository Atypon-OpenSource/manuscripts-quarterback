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
import type { yjsExtension } from './extension'
import type { createYjsStore } from './store'

export type YjsExtension = ReturnType<ReturnType<typeof yjsExtension>>
export type YjsOptions = YjsDisabled | YjsEnabled
export type YjsDisabled = {
  disabled: true
}
export type YjsEnabled = {
  disabled: false
  document: {
    id: string
  }
  user: {
    id: string
    name: string
  }
  ws_url: string
}

export type YjsStore = ReturnType<typeof createYjsStore>
export interface YjsExtensionState {
  snapshots: YjsSnapshot[]
  selectedSnapshot: YjsSnapshot | null
}
export interface YjsState {
  status: YjsStatus
}
export enum YjsStatus {
  enabled = 'enabled',
  disabled = 'disabled',
}
// export interface UserData {
//   userID: string
//   userName: string
//   insertColor: string
//   deleteColor: string
// }

export interface YjsSnapshot {
  id: string
  date: number
  snapshot: Uint8Array
  clientID: number
}
