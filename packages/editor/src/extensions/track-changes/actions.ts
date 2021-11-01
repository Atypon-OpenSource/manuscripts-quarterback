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
import { Transaction } from 'prosemirror-state'

import { TrackedUser } from '$typings/user'

import { CHANGE_STATUS } from './ChangeSet'
import { TrackChangesStatus } from './types'

export enum TrackChangesAction {
  setUser = 'track-changes-set-user',
  setTrackingStatus = 'track-changes-set-track-status',
  setChangeStatuses = 'track-changes-set-change-statuses',
  toggleShownStatuses = 'track-changes-toggle-shown-change-statuses',
  updateChanges = 'track-changes-update-changes',
  refreshChanges = 'track-changes-refresh-changes',
  createSnapshot = 'track-changes-create-snapshot',
}

export type TrackChangesActionParams = {
  [TrackChangesAction.setUser]: TrackedUser
  [TrackChangesAction.setTrackingStatus]: TrackChangesStatus
  [TrackChangesAction.setChangeStatuses]: {
    status: CHANGE_STATUS
    ids: string[]
  }
  [TrackChangesAction.toggleShownStatuses]: CHANGE_STATUS[]
  [TrackChangesAction.updateChanges]: string[]
  [TrackChangesAction.refreshChanges]: boolean
  [TrackChangesAction.createSnapshot]: boolean
}

export function getAction<K extends keyof TrackChangesActionParams>(
  tr: Transaction,
  action: K
) {
  return tr.getMeta(action) as TrackChangesActionParams[K] | undefined
}

export function setAction<K extends keyof TrackChangesActionParams>(
  tr: Transaction,
  action: K,
  payload: TrackChangesActionParams[K]
) {
  return tr.setMeta(action, payload)
}
