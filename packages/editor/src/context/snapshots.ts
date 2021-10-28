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
import { EditorState } from 'prosemirror-state'
import * as Y from 'yjs'

import { PMSnapshot, YjsSnapshot } from '$typings/snapshots'

export function createSnapshot(
  state: EditorState,
  clientID: number
): PMSnapshot {
  return {
    id: uuidv4(),
    date: new Date().getTime(),
    snapshot: state.doc.toJSON(),
    clientID,
  }
}

export function createYjsSnapshot(
  ysnap: Y.Snapshot,
  clientID: number
): YjsSnapshot {
  return {
    id: uuidv4(),
    date: new Date().getTime(),
    snapshot: Y.encodeSnapshot(ysnap),
    clientID,
  }
}
