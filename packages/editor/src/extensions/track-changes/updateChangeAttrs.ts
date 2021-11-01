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
import { Mapping } from 'prosemirror-transform'

import { QuarterBackSchema, schema } from '$schema'

import {
  CHANGE_OPERATION,
  CHANGE_STATUS,
  ChangeSet,
  PartialTrackedChange,
  TrackedAttrs,
  TrackedChange,
} from './ChangeSet'
import {
  getNodeTrackedMarks,
  insertBlockInlineContent,
  liftNode,
} from './node-utils'

export function updateChangeAttrs(
  tr: Transaction<QuarterBackSchema>,
  change: PartialTrackedChange,
  trackedAttrs: Partial<TrackedAttrs>
): Transaction<QuarterBackSchema> {
  const node = tr.doc.nodeAt(change.from)
  if (!node) {
    throw Error('No node at the from of change' + change)
  }
  const dataTracked = { ...getNodeTrackedMarks(node), ...trackedAttrs }
  const oldMark = node.marks.find(
    (m) =>
      m.type === schema.marks.tracked_insert ||
      m.type === schema.marks.tracked_delete
  )
  if (change.type === 'text-change' && oldMark) {
    tr.addMark(
      change.from,
      change.to,
      oldMark.type.create({ ...oldMark.attrs, dataTracked })
    )
  } else if (change.type === 'node-change') {
    tr.setNodeMarkup(
      change.from,
      undefined,
      { ...node.attrs, dataTracked },
      node.marks
    )
  }
  return tr
}

export function updateDocAndRemoveChanges(
  tr: Transaction<QuarterBackSchema>,
  changes: TrackedChange[],
  mapping?: Mapping
): Mapping {
  const deleteMap = mapping || new Mapping()
  changes.forEach((change) => {
    const { status, operation } = change.attrs
    if (status === CHANGE_STATUS.pending) {
      return
    }
    const from = deleteMap.map(change.from)
    const node = tr.doc.nodeAt(from)
    if (!node) {
      return
      // throw Error('No node at the from of change' + change)
    }
    const noChangeNeeded =
      (operation === CHANGE_OPERATION.insert &&
        status === CHANGE_STATUS.accepted) ||
      (operation === CHANGE_OPERATION.delete &&
        status === CHANGE_STATUS.rejected)
    if (ChangeSet.isTextChange(change) && noChangeNeeded) {
      tr.removeMark(from, deleteMap.map(change.to), schema.marks.tracked_insert)
      tr.removeMark(from, deleteMap.map(change.to), schema.marks.tracked_delete)
    } else if (ChangeSet.isTextChange(change)) {
      tr.delete(from, deleteMap.map(change.to))
      deleteMap.appendMap(tr.steps[tr.steps.length - 1].getMap())
    } else if (ChangeSet.isNodeChange(change) && noChangeNeeded) {
      const attrs = { ...node.attrs, dataTracked: null }
      tr.setNodeMarkup(from, undefined, attrs, node.marks)
    } else if (ChangeSet.isNodeChange(change)) {
      // lift?
      // liftNode(change.from + offset, tr)
      insertBlockInlineContent(from, tr, deleteMap)
    }
  })
  return deleteMap
}
