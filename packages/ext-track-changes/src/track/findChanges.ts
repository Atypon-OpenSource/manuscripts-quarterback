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

import { ChangeSet } from '../ChangeSet'
import { PartialTrackedChange } from '../types/change'
import { getNodeTrackedMarks } from './node-utils'

/**
 * Finds all changes (basically text marks or node attributes) from document
 *
 * This could be possibly made more efficient by only iterating the sections of doc
 * where changes have been applied. This could attempted with eg findDiffStart
 * but it might be less robust than just using doc.descendants
 * @param state
 * @returns
 */
export function findChanges(state: EditorState) {
  const changes: PartialTrackedChange[] = []
  state.doc.descendants((node, pos) => {
    const attrs = getNodeTrackedMarks(node, state.schema)
    if (attrs) {
      const id = attrs?.id || ''
      if (node.isText) {
        changes.push({
          id,
          type: 'text-change',
          from: pos,
          to: pos + node.nodeSize,
          attrs,
        })
      } else {
        changes.push({
          id,
          type: 'node-change',
          from: pos,
          to: pos + node.nodeSize,
          nodeType: node.type.name,
          mergeInsteadOfDelete: node.type.name === 'paragraph' || node.type.name === 'blockquote',
          children: [],
          attrs,
        })
      }
    }
  })
  return new ChangeSet(changes)
}

/**
 * @deprecated
 */
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
    const attrs = getNodeTrackedMarks(node, state.schema)
    if (attrs) {
      newChanges.push({ ...current, attrs })
    }
    idx += 1
    current = updated[idx]
  }
  return new ChangeSet([...notUpdated, ...newChanges])
}
