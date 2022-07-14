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
import { Fragment, Node as PMNode, Schema } from 'prosemirror-model'
import type {
  EditorState,
  Selection,
  NodeSelection,
  TextSelection,
  Transaction,
} from 'prosemirror-state'
import { Mapping } from 'prosemirror-transform'

import { log } from '../utils/logger'
import { CHANGE_OPERATION, CHANGE_STATUS, TrackedAttrs } from '../types/change'
import { NewEmptyAttrs } from '../types/track'
import { Change } from './steps2/track-types'
import { deleteNode } from './deleteNode'
import { mergeTrackedMarks } from './steps2/mergeTrackedMarks'
import { addTrackIdIfDoesntExist, getMergeableMarkTrackedAttrs } from './node-utils'

export function processChanges(
  changes: Change[],
  newTr: Transaction,
  emptyAttrs: NewEmptyAttrs,
  schema: Schema
) {
  const deleteMap = new Mapping()
  const deleteAttrs = { ...emptyAttrs, operation: CHANGE_OPERATION.delete }
  // @TODO add custom handler / condition?
  changes.forEach(c => {
    if (c.type === 'delete-node') {
      const pos = deleteMap.map(c.pos)
      const node = newTr.doc.nodeAt(pos)
      if (node) {
        const dataTracked: TrackedAttrs | undefined = node?.attrs.dataTracked
        const wasInsertedBySameUser =
          dataTracked?.operation === CHANGE_OPERATION.insert && dataTracked.userID === emptyAttrs.userID
        if (wasInsertedBySameUser) {
          deleteNode(node, pos, newTr)
        } else {
          const attrs = {
            ...node.attrs,
            dataTracked: addTrackIdIfDoesntExist(deleteAttrs),
          }
          newTr.setNodeMarkup(pos, undefined, attrs, node.marks)
        }
      }
    } else if (c.type === 'delete-text') {
      const pos = deleteMap.map(c.pos)
      const from = deleteMap.map(c.from)
      const to = deleteMap.map(c.to)
      const node = newTr.doc.nodeAt(pos)
      if (node?.marks.find((m) => m.type === schema.marks.tracked_insert)) {
        newTr.replaceWith(from, to, Fragment.empty)
      } else {
        const leftNode = newTr.doc.resolve(from).nodeBefore
        const leftMarks = getMergeableMarkTrackedAttrs(leftNode, deleteAttrs, schema)
        const rightNode = newTr.doc.resolve(c.to).nodeAfter
        const rightMarks = getMergeableMarkTrackedAttrs(rightNode, deleteAttrs, schema)
        const fromStartOfMark = from - (leftNode && leftMarks ? leftNode.nodeSize : 0)
        const toEndOfMark = to + (rightNode && rightMarks ? rightNode.nodeSize : 0)
        const dataTracked = addTrackIdIfDoesntExist({
          ...leftMarks,
          ...rightMarks,
          ...deleteAttrs,
        })
        newTr.addMark(
          fromStartOfMark,
          toEndOfMark,
          schema.marks.tracked_delete.create({
            dataTracked,
          })
        )
      }
    } else if (c.type === 'insert') {
      newTr.insert(deleteMap.map(c.from), c.fragment)
      mergeTrackedMarks(deleteMap.map(c.from), newTr.doc, newTr, schema)
      mergeTrackedMarks(deleteMap.map(c.from) + c.fragment.size, newTr.doc, newTr, schema)
    }
  })
}
