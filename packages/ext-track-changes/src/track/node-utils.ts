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
import { Mark, Node as PMNode, Schema } from 'prosemirror-model'
import { Transaction } from 'prosemirror-state'
import { liftTarget, Mapping } from 'prosemirror-transform'

import { ChangeSet } from '../ChangeSet'
import { logger } from '../logger'
import { CHANGE_OPERATION, CHANGE_STATUS, TrackedAttrs, TrackedChange } from '../types/change'

export function addTrackIdIfDoesntExist(attrs: Partial<TrackedAttrs>) {
  if (!attrs.id) {
    return {
      id: uuidv4(),
      ...attrs,
    }
  }
  return attrs
}

/**
 * Not in use, maybe for ReplaceAroundSteps but we'll see
 * @param pos
 * @param tr
 * @returns
 */
export function liftNode(pos: number, tr: Transaction) {
  const startPos = tr.doc.resolve(pos)
  const node = tr.doc.nodeAt(pos)
  // debugger
  if (!node) {
    return undefined
  }
  const range = startPos.blockRange(tr.doc.resolve(startPos.pos + node.nodeSize))
  const targetDepth = range ? Number(liftTarget(range)) : NaN
  if (range && !Number.isNaN(targetDepth)) {
    return tr.lift(range, targetDepth)
  }
  return undefined
}

export function updateChangeChildrenAttributes(
  changes: TrackedChange[],
  tr: Transaction,
  mapping: Mapping
) {
  const nodes: PMNode[] = []
  changes.forEach((c) => {
    if (c.type === 'node-change' && ChangeSet.shouldNotDelete(c)) {
      const from = mapping.map(c.from)
      const node = tr.doc.nodeAt(from)
      if (!node) {
        return
      }
      const attrs = { ...node.attrs, dataTracked: null }
      tr.setNodeMarkup(from, undefined, attrs, node.marks)
    }
  })
  return nodes
}

export function getChangeContent(changes: TrackedChange[], doc: PMNode, mapping: Mapping) {
  const nodes: PMNode[] = []
  changes.forEach((c) => {
    if (ChangeSet.shouldNotDelete(c)) {
      const node = doc.nodeAt(mapping.map(c.from))
      node && nodes.push(node)
    }
  })
  return nodes
}

export function getPosToInsertMergedContent(pos: number, tr: Transaction, mapping: Mapping) {
  const startPos = tr.doc.resolve(pos)
  const nodeAbove = startPos.nodeBefore
  const node = tr.doc.nodeAt(pos)
  const nodeBelowPos = pos + (node ? node.nodeSize : 0)
  const nodeBelow = tr.doc.nodeAt(nodeBelowPos)
  if (!node) {
    return undefined
  }
  if (node.content.size > 0 && nodeAbove && nodeAbove.isBlock && nodeAbove.type === node.type) {
    return pos - 1
  } else if (
    node.content.size > 0 &&
    nodeBelow &&
    nodeBelow.isBlock &&
    nodeBelow.type === node.type
  ) {
    return mapping.map(nodeBelowPos) + 1
  }
  return undefined
}

export function getTrackedMarks(node: PMNode | undefined | null, schema: Schema) {
  if (!node || !node.isInline) {
    return undefined
  }
  const marksTrackedData: Omit<Partial<TrackedAttrs>, 'operation'> &
    { operation: CHANGE_OPERATION }[] = []
  node.marks.forEach((mark) => {
    if (mark.type === schema.marks.tracked_insert || mark.type === schema.marks.tracked_delete) {
      const operation =
        mark.type === schema.marks.tracked_insert
          ? CHANGE_OPERATION.insert
          : CHANGE_OPERATION.delete
      marksTrackedData.push({ ...mark.attrs.dataTracked, operation })
    }
  })
  if (marksTrackedData.length > 1) {
    throw Error('Inline node with more than 1 of tracked marks' + marksTrackedData)
  }
  return marksTrackedData[0] || undefined
}

export function getNodeTrackedMarks(
  node: PMNode | undefined | null,
  schema: Schema
): Partial<TrackedAttrs> | undefined {
  return !node ? undefined : node.isInline ? getTrackedMarks(node, schema) : node.attrs.dataTracked
}

interface ComparedAttrs {
  userID: string
  operation: CHANGE_OPERATION
  status: CHANGE_STATUS
}
/**
 * @deprecated
 */
export function shouldMergeMarks(
  node: PMNode | undefined | null,
  attrs: ComparedAttrs,
  schema: Schema
) {
  const nodeAttrs = getNodeTrackedMarks(node, schema)
  const sameStatus = nodeAttrs?.status === attrs.status
  const sameOperation = nodeAttrs?.operation === attrs.operation
  const sameUser = nodeAttrs?.userID === attrs.userID
  return sameStatus && sameOperation && sameUser ? nodeAttrs : null
}

export function shouldMergeTrackedAttributes(
  left?: Partial<TrackedAttrs>,
  right?: Partial<TrackedAttrs>
) {
  if (!left || !right) {
    logger(
      `%c WARNING passed undefined dataTracked attributes for shouldMergeTrackedAttributes`,
      'color: #f3f32c',
      left || right
    )
    return false
  }
  const sameStatus = left.status === right.status
  const sameOperation = left.operation === right.operation
  const sameUser = left.userID === right.userID
  return sameStatus && sameOperation && sameUser
}
