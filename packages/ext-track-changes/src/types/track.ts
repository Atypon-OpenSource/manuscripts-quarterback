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
import type { PluginKey } from 'prosemirror-state'

import { ChangeSet } from '../ChangeSet'
import { CHANGE_OPERATION, CHANGE_STATUS, TrackedAttrs } from './change'
import type { TrackedUser } from './user'

export interface TrackChangesOptions {
  disabled?: boolean
  debug?: boolean
  pluginOpts?: TrackChangesPluginOptions
}

export interface TrackChangesPluginOptions {
  user?: TrackedUser
  skipTrsWithMetas?: (PluginKey | string)[]
}

export interface TrackChangesState {
  status: TrackChangesStatus
  currentUser: TrackedUser
  insertColor: string
  deleteColor: string
  changeSet: ChangeSet
  shownChangeStatuses: CHANGE_STATUS[]
}

export type InsertAttrs = Omit<TrackedAttrs, 'id' | 'operation'> & {
  operation: CHANGE_OPERATION.insert
}
export type DeleteAttrs = Omit<TrackedAttrs, 'id' | 'operation'> & {
  operation: CHANGE_OPERATION.delete
}

export enum TrackChangesStatus {
  enabled = 'enabled',
  viewSnapshots = 'view-snapshots',
  disabled = 'disabled',
}
export interface UserData {
  userID: string
  userName: string
  insertColor: string
  deleteColor: string
}
