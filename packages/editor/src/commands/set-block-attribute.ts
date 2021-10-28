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

import { CHANGE_OPERATION, CHANGE_STATUS } from '$extensions/track-changes'
import type { Command } from '$typings/editor'

export const setBlockNodeAttribute = (): Command => (state, dispatch) => {
  const cursor = state.selection.head
  const blockNodePos = state.doc.resolve(cursor).start(1) - 1
  const tr = state.tr.setNodeMarkup(blockNodePos, undefined, {
    dataTracked: {
      id: uuidv4(),
      userID: '1',
      userName: 'John',
      operation: CHANGE_OPERATION.insert,
      status: CHANGE_STATUS.pending,
      time: Date.now(),
    },
  })
  if (dispatch) {
    dispatch(tr)
    return true
  }
  return false
}
