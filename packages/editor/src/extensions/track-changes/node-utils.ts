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
import { Node as PMNode, Slice } from 'prosemirror-model'
import { Transaction } from 'prosemirror-state'
import { liftTarget, Mapping } from 'prosemirror-transform'

import { schema } from '$schema'

import { CHANGE_OPERATION, CHANGE_STATUS, TrackedAttrs } from './ChangeSet'
import { DeleteAttrs, InsertAttrs } from './types'

export function createTrackedAttrs(
  attrs: InsertAttrs | DeleteAttrs
): TrackedAttrs {
  return {
    id: uuidv4(),
    ...attrs,
  }
}

export function liftNode(pos: number, tr: Transaction) {
  const startPos = tr.doc.resolve(pos)
  const node = tr.doc.nodeAt(pos)
  debugger
  if (!node) {
    return undefined
  }
  const range = startPos.blockRange(
    tr.doc.resolve(startPos.pos + node.nodeSize)
  )
  const targetDepth = range ? Number(liftTarget(range)) : NaN
  if (range && !Number.isNaN(targetDepth)) {
    return tr.lift(range, targetDepth)
  }
  return undefined
}

export function insertBlockInlineContent(
  pos: number,
  tr: Transaction,
  mapping: Mapping
) {
  const startPos = tr.doc.resolve(pos)
  const nodeAbove = startPos.nodeBefore
  const node = tr.doc.nodeAt(pos)
  const nodeBelowPos = pos + (node ? node.nodeSize : 0)
  const nodeBelow = tr.doc.nodeAt(nodeBelowPos)
  if (!node) {
    return undefined
  }
  tr.delete(pos, pos + node.nodeSize)
  mapping.appendMap(tr.steps[tr.steps.length - 1].getMap())
  if (node.content.size > 0 && nodeAbove && nodeAbove.isBlock) {
    tr.insert(pos - 1, node.content)
    mapping.appendMap(tr.steps[tr.steps.length - 1].getMap())
  } else if (node.content.size > 0 && nodeBelow && nodeBelow.isBlock) {
    tr.insert(mapping.map(nodeBelowPos) + 1, node.content)
    mapping.appendMap(tr.steps[tr.steps.length - 1].getMap())
  }
  return true
}

export function isValidTrackedAttrs(attrs?: Partial<TrackedAttrs>) {
  if (!attrs) {
    return false
  }
  if (!attrs.id) {
    return false
  }
  if (!attrs.userID) {
    return false
  }
  if (!attrs.userName) {
    return false
  }
  if (!attrs.operation) {
    return false
  }
  if (!attrs.status) {
    return false
  }
  if (!attrs.time) {
    return false
  }
  return true
}

export function getTrackedMarks(node?: PMNode | null) {
  if (!node || !node.isInline) {
    return undefined
  }
  const marksTrackedData: Omit<Partial<TrackedAttrs>, 'operation'> &
    { operation: CHANGE_OPERATION }[] = []
  node.marks.forEach((mark) => {
    if (
      mark.type === schema.marks.tracked_insert ||
      mark.type === schema.marks.tracked_delete
    ) {
      const operation =
        mark.type === schema.marks.tracked_insert
          ? CHANGE_OPERATION.insert
          : CHANGE_OPERATION.delete
      marksTrackedData.push({ ...mark.attrs.dataTracked, operation })
    }
  })
  if (marksTrackedData.length > 1) {
    throw Error(
      'Inline node with more than 1 of tracked marks' + marksTrackedData
    )
  }
  return marksTrackedData[0] || undefined
}

export function getNodeTrackedMarks(
  node?: PMNode | null
): Partial<TrackedAttrs> | undefined {
  return !node
    ? undefined
    : node.isInline
    ? getTrackedMarks(node)
    : node.attrs.dataTracked
}

interface ComparedAttrs {
  userID: string
  operation: CHANGE_OPERATION
  status: CHANGE_STATUS
}
export function shouldMergeMarks(
  node: PMNode | undefined | null,
  attrs: ComparedAttrs
) {
  const nodeAttrs = getNodeTrackedMarks(node)
  const sameStatus = nodeAttrs?.status === attrs.status
  const sameOperation = nodeAttrs?.operation === attrs.operation
  const sameUser = nodeAttrs?.userID === attrs.userID
  return sameStatus && sameOperation && sameUser ? nodeAttrs : null
}