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
import { EditorState } from 'prosemirror-state'

import { ChangeSet, PartialTrackedChange } from './ChangeSet'
import { getNodeTrackedMarks, isValidTrackedAttrs } from './node-utils'

export function findChanges(state: EditorState) {
  const changes = new ChangeSet()
  const iteratedIds = new Set()
  state.doc.descendants((node, pos) => {
    const attrs = getNodeTrackedMarks(node)
    if (attrs) {
      const id = attrs?.id || 'undefined'
      const duplicateId = iteratedIds.has(id)
      const incompleteAttrs = !isValidTrackedAttrs(attrs) || duplicateId
      iteratedIds.add(id)
      if (node.isInline) {
        changes.push({
          id,
          type: 'text-change',
          from: pos,
          to: pos + node.nodeSize,
          attrs,
          incompleteAttrs,
        })
      } else {
        changes.push({
          id,
          type: 'node-change',
          from: pos,
          nodeType: node.type.name,
          attrs,
          incompleteAttrs,
        })
      }
    }
  })
  return changes
}

export function updateChanges(
  updatedChangeIds: string[],
  oldChanges: ChangeSet,
  state: EditorState
) {
  const notUpdated = oldChanges.getNotIn(updatedChangeIds)
  const updated = oldChanges.getIn(updatedChangeIds)
  const newChanges: PartialTrackedChange[] = []
  let idx = 0,
    current = updated[idx]
  while (current) {
    const node = state.doc.nodeAt(current.from)
    if (!node) {
      throw Error('No node at the from of change' + current)
    }
    const attrs = getNodeTrackedMarks(node)
    if (attrs) {
      newChanges.push({ ...current, attrs })
    }
    idx += 1
    current = updated[idx]
  }
  return new ChangeSet([...notUpdated, ...newChanges])
}
