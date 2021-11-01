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
import { Transaction } from 'prosemirror-state'

import { TrackedUser } from '$typings/user'

import { CHANGE_OPERATION, CHANGE_STATUS, ChangeSet } from './ChangeSet'
import { updateChangeAttrs } from './updateChangeAttrs'

export function fixInconsistentChanges(
  changeSet: ChangeSet,
  currentUser: TrackedUser,
  newTr: Transaction
) {
  const iteratedIds = new Set()
  let changed = false
  changeSet._changes.forEach((c) => {
    if (ChangeSet.isIncompleteChange(c)) {
      const { id, userID, userName, operation, status, time } = c.attrs
      const newAttrs = {
        ...((!id || iteratedIds.has(id)) && { id: uuidv4() }),
        ...(!userID && { userID: currentUser.id }),
        ...(!userName && { userName: currentUser.name }),
        ...(!operation && { operation: CHANGE_OPERATION.insert }),
        ...(!status && { status: CHANGE_STATUS.pending }),
        ...(!time && { time: Date.now() }),
      }
      if (Object.keys(newAttrs).length > 0) {
        updateChangeAttrs(newTr, c, { ...c.attrs, ...newAttrs })
        changed = true
      }
      iteratedIds.add(newAttrs.id || id)
    }
  })
  return changed
}
