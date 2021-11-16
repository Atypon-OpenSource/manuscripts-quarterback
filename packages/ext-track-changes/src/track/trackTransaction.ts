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
import debug from 'debug'
import { Fragment, Node as PMNode, Schema, Slice } from 'prosemirror-model'
import { EditorState, TextSelection, Transaction } from 'prosemirror-state'
import {
  AddMarkStep,
  Mapping,
  RemoveMarkStep,
  ReplaceAroundStep,
  ReplaceStep,
  Step,
  StepMap,
} from 'prosemirror-transform'

import { CHANGE_OPERATION, CHANGE_STATUS, TrackedAttrs } from '../ChangeSet'
import { DeleteAttrs, InsertAttrs, UserData } from '../types/track'
import { createTrackedAttrs, shouldMergeMarks } from './node-utils'

function markInlineNodeChange(
  node: PMNode<any>,
  insertAttrs: InsertAttrs,
  userColors: UserData,
  schema: Schema
) {
  console.warn('schema', schema)
  const filtered = node.marks.filter(
    (m) =>
      m.type !== schema.marks.tracked_insert &&
      m.type !== schema.marks.tracked_delete
  )
  const mark =
    insertAttrs.operation === CHANGE_OPERATION.insert
      ? schema.marks.tracked_insert
      : schema.marks.tracked_delete
  const pending_bg =
    insertAttrs.operation === CHANGE_OPERATION.insert
      ? userColors.insertColor
      : userColors.deleteColor
  const createdMark = mark.create({
    dataTracked: createTrackedAttrs(insertAttrs),
    pending_bg,
  })
  return node.mark(filtered.concat(createdMark))
}

function recurseContent(
  node: PMNode<any>,
  insertAttrs: InsertAttrs,
  userColors: UserData,
  schema: Schema
) {
  if (node.isInline) {
    return markInlineNodeChange(node, insertAttrs, userColors, schema)
  } else if (node.isBlock) {
    const updatedChildren: PMNode[] = []
    node.content.forEach((child) => {
      updatedChildren.push(
        recurseContent(child, insertAttrs, userColors, schema)
      )
    })
    return node.type.create(
      {
        dataTracked: createTrackedAttrs(insertAttrs),
      },
      Fragment.fromArray(updatedChildren),
      node.marks
    )
  } else {
    console.warn('Unhandled node type!')
    return node
  }
}

function setFragmentAsInserted(
  inserted: Fragment,
  insertAttrs: InsertAttrs,
  userColors: UserData,
  schema: Schema
) {
  // Recurse the content in the inserted slice and either mark it tracked_insert or set node attrs
  const updatedInserted: PMNode[] = []
  inserted.forEach((n) => {
    updatedInserted.push(recurseContent(n, insertAttrs, userColors, schema))
  })
  return updatedInserted.length === 0
    ? inserted
    : Fragment.fromArray(updatedInserted)
}

export function applyAndMergeMarks(
  from: number,
  to: number,
  doc: PMNode,
  newTr: Transaction,
  schema: Schema,
  addedAttrs: InsertAttrs | DeleteAttrs,
  userColors: UserData
) {
  if (from === to) {
    return
  }
  let leftMarks: Partial<TrackedAttrs> | null | undefined,
    leftNode: PMNode<any> | null | undefined,
    rightMarks: Partial<TrackedAttrs> | null | undefined,
    rightNode: PMNode<any> | null | undefined

  newTr.removeMark(from, to, schema.marks.tracked_insert)
  newTr.removeMark(from, to, schema.marks.tracked_delete)
  doc.nodesBetween(from, to, (node, pos) => {
    if (node.isInline) {
      const firstInlineNode = from >= pos
      const lastInlineNode = pos + node.nodeSize >= to
      if (firstInlineNode) {
        leftNode = doc.resolve(Math.max(pos, from)).nodeBefore
        leftMarks = shouldMergeMarks(leftNode, addedAttrs, schema)
      }
      if (lastInlineNode) {
        rightNode = doc.resolve(Math.min(pos + node.nodeSize, to)).nodeAfter
        rightMarks = shouldMergeMarks(rightNode, addedAttrs, schema)
      }
      const fromStartOfMark =
        from - (leftNode && leftMarks ? leftNode.nodeSize : 0)
      const toEndOfMark =
        to + (rightNode && rightMarks ? rightNode.nodeSize : 0)
      const dataTracked = createTrackedAttrs({
        ...leftMarks,
        ...rightMarks,
        ...addedAttrs,
      })
      const mark =
        addedAttrs.operation === CHANGE_OPERATION.insert
          ? schema.marks.tracked_insert
          : schema.marks.tracked_delete
      const pending_bg =
        addedAttrs.operation === CHANGE_OPERATION.insert
          ? userColors.insertColor
          : userColors.deleteColor

      newTr.addMark(
        fromStartOfMark,
        toEndOfMark,
        mark.create({
          dataTracked,
          pending_bg,
        })
      )

      leftMarks = null
      rightMarks = null
    }
  })
}

function deleteNode(
  node: PMNode,
  pos: number,
  newTr: Transaction,
  deleteAttrs: DeleteAttrs
) {
  const dataTracked: TrackedAttrs | undefined = node.attrs.dataTracked
  const wasInsertedBySameUser =
    dataTracked?.operation === CHANGE_OPERATION.insert &&
    dataTracked.userID === deleteAttrs.userID
  if (wasInsertedBySameUser) {
    const resPos = newTr.doc.resolve(pos)
    // TODO ensure this works and blocks at the start of doc cant be deleted (as they wont merge to node above)
    if (resPos.parent !== newTr.doc || resPos.nodeBefore) {
      newTr.replaceWith(pos - 1, pos + 1, Fragment.empty)
    }
  } else {
    const attrs = {
      ...node.attrs,
      dataTracked: createTrackedAttrs(deleteAttrs),
    }
    newTr.setNodeMarkup(pos, undefined, attrs, node.marks)
  }
}

function deleteInlineIfInserted(
  node: PMNode,
  pos: number,
  newTr: Transaction,
  schema: Schema,
  deleteAttrs: DeleteAttrs,
  deleteColor: string,
  from?: number,
  to?: number
) {
  const start = from ? Math.max(pos, from) : pos
  const nodeEnd = pos + node.nodeSize
  const end = to ? Math.min(nodeEnd, to) : nodeEnd
  if (node.marks.find((m) => m.type === schema.marks.tracked_insert)) {
    // Math.max(pos, from) is for picking always the start of the node,
    // not the start of the change (which might span multiple nodes).
    // Pos can be less than from as nodesBetween iterates through all nodes starting from the top block node
    newTr.replaceWith(start, end, Fragment.empty)
  } else {
    const leftNode = newTr.doc.resolve(start).nodeBefore
    const leftMarks = shouldMergeMarks(leftNode, deleteAttrs, schema)
    const rightNode = newTr.doc.resolve(end).nodeAfter
    const rightMarks = shouldMergeMarks(rightNode, deleteAttrs, schema)
    const fromStartOfMark =
      start - (leftNode && leftMarks ? leftNode.nodeSize : 0)
    const toEndOfMark = end + (rightNode && rightMarks ? rightNode.nodeSize : 0)
    const dataTracked = createTrackedAttrs({
      ...leftMarks,
      ...rightMarks,
      ...deleteAttrs,
    })
    newTr.addMark(
      fromStartOfMark,
      toEndOfMark,
      schema.marks.tracked_delete.create({
        dataTracked,
        pending_bg: deleteColor,
      })
    )
  }
}

function getMergedNode(
  node: PMNode | null | undefined,
  currentDepth: number,
  depth: number,
  first: boolean
) {
  if (!node) {
    throw Error('getMergedNode failed to find node')
  }
  if (currentDepth === depth) {
    return {
      mergedContent: node.content,
      returnedSlice: undefined,
    }
  } else {
    const result: PMNode[] = []
    let merged
    node.content.forEach((n, _, i) => {
      if ((first && i === 0) || (!first && i === node.childCount - 1)) {
        const { mergedContent, returnedSlice } = getMergedNode(
          n,
          currentDepth + 1,
          depth,
          first
        )
        merged = mergedContent
        if (returnedSlice) {
          // @ts-ignore
          result.push(...returnedSlice.content)
        }
      } else {
        result.push(n)
      }
    })
    if (result.length > 0) {
      return {
        mergedContent: merged,
        returnedSlice: Fragment.fromArray(result),
      }
    }
    return {
      mergedContent: merged,
      returnedSlice: undefined,
    }
  }
}

function splitSliceIntoMergedParts(insertSlice: Slice) {
  const { openStart, openEnd, content } = insertSlice
  // @ts-ignore
  const nodes: PMNode[] = content.content
  let updatedSliceNodes: PMNode[] | undefined
  const firstMergedNode =
    openStart > 0 && openStart !== openEnd
      ? getMergedNode(content.firstChild, 1, openStart, true)
      : undefined
  const lastMergedNode =
    openEnd > 0 && openStart !== openEnd
      ? getMergedNode(content.lastChild, 1, openEnd, false)
      : undefined
  if (firstMergedNode) {
    updatedSliceNodes = nodes.filter((_, i) => i !== 0)
    if (firstMergedNode.returnedSlice) {
      updatedSliceNodes = [
        // @ts-ignore
        ...firstMergedNode.returnedSlice.content,
        ...updatedSliceNodes,
      ]
    }
  }
  if (lastMergedNode) {
    updatedSliceNodes = (updatedSliceNodes || nodes).filter(
      (_, i) => i + 1 !== (updatedSliceNodes || nodes).length
    )
    if (lastMergedNode.returnedSlice) {
      updatedSliceNodes = [
        ...updatedSliceNodes,
        // @ts-ignore
        ...lastMergedNode.returnedSlice.content,
      ]
    }
  }
  return {
    updatedSliceNodes,
    firstMergedNode,
    lastMergedNode,
  }
}

export function deleteAndMergeSplitBlockNodes(
  from: number,
  to: number,
  startDoc: PMNode,
  newTr: Transaction,
  schema: Schema,
  deleteAttrs: DeleteAttrs,
  userColors: UserData,
  insertSlice: Slice
) {
  const deleteMap = new Mapping()
  let mergedInsertPos = undefined
  if (from === to) {
    return {
      deleteMap,
      mergedInsertPos,
      newSliceContent: insertSlice.content,
    }
  }
  const { updatedSliceNodes, firstMergedNode, lastMergedNode } =
    splitSliceIntoMergedParts(insertSlice)
  const insertStartDepth = startDoc.resolve(from).depth
  const insertEndDepth = startDoc.resolve(to).depth
  debug.log('debug: firstMergedNode', firstMergedNode)
  console.log('debug: lastMergedNode', lastMergedNode)
  startDoc.nodesBetween(from, to, (node, pos) => {
    const offsetPos = deleteMap.map(pos, 1)
    const offsetFrom = deleteMap.map(from, -1)
    const offsetTo = deleteMap.map(to, 1)
    const nodeEnd = offsetPos + node.nodeSize
    const step = newTr.steps[newTr.steps.length - 1]
    if (nodeEnd > offsetFrom) {
      // Delete touches this node
      if (node.isInline) {
        deleteInlineIfInserted(
          node,
          offsetPos,
          newTr,
          schema,
          deleteAttrs,
          userColors.deleteColor,
          offsetFrom,
          offsetTo
        )
      } else if (node.isBlock) {
        if (offsetPos >= offsetFrom && nodeEnd <= offsetTo) {
          // Block node deleted completely
          deleteNode(node, offsetPos, newTr, deleteAttrs)
        } else if (nodeEnd > offsetFrom && nodeEnd <= offsetTo) {
          console.log('MERGING END TOKEN')
          // The end token deleted: <p>asdf|</p><p>bye</p>| + [<p>] hello</p> -> <p>asdf hello</p>
          // How about <p>asdf|</p><p>|bye</p> + [<p>] hello</p><p>good[</p>] -> <p>asdf hello</p><p>goodbye</p>
          // This doesnt work at least: <p>asdf|</p><p>|bye</p> + empty -> <p>asdfbye</p>
          // Depth + 1 because the original pos was at text level(?) and we always want to insert at the correct
          // block level therefore we increment the depth. Or something like that. Does work though.
          const depth = newTr.doc.resolve(offsetPos).depth + 1
          // Pick stuff only if the slice requires it (has openStart > 0)
          // Otherwise it's just a regular delete that tries to join two same level blocks, probably paragraphs
          // Which doesn't effect the start paragraph (with the delete end token) in either way
          if (
            insertSlice.openStart > 0 &&
            depth === insertStartDepth &&
            firstMergedNode?.mergedContent
          ) {
            // const insertedNode = getBlockNodeAtDepth(insertSlice.content, 1, depth, true)
            // updatedSliceNodes = content.filter((_, i) => i !== 0)
            console.log('insert')
            newTr.insert(
              nodeEnd - 1,
              setFragmentAsInserted(
                firstMergedNode.mergedContent,
                {
                  ...deleteAttrs,
                  operation: CHANGE_OPERATION.insert,
                },
                userColors,
                schema
              )
            )
          }
        } else if (offsetPos >= offsetFrom && nodeEnd - 1 > offsetTo) {
          console.log('MERGING START TOKEN')
          // The start token deleted: |<p>hey</p><p>|asdf</p> + <p>hello [</p>] -> <p>hello asdf</p>
          // Gosh the depth... Ainakin sliceen ekan? sitten tsekkaan mikä syvyys
          // Ainakin syvin tulee ekana joten pitäis olla samassa tasossa
          // pickFirst at depth?
          const depth = newTr.doc.resolve(offsetPos).depth + 1
          // Same as before, pick stuff to be inserted only if there slice needs it
          // But in this case, contrary to deleted end token, we'll set the block node as deleted
          // To join the contents to whatever content is above if this change is accepted.
          if (
            insertSlice.openEnd > 0 &&
            depth === insertEndDepth &&
            lastMergedNode?.mergedContent
          ) {
            console.log('insert')
            // Just as a future reminder, inserting text at paragraph position wraps into into a new paragraph...
            // So you need to offset it by 1 to insert it _inside_ the paragraph
            newTr.insert(
              offsetPos + 1,
              setFragmentAsInserted(
                lastMergedNode.mergedContent,
                {
                  ...deleteAttrs,
                  operation: CHANGE_OPERATION.insert,
                },
                userColors,
                schema
              )
            )
            mergedInsertPos = offsetPos
            // const insertedNode = getBlockNodeAtDepth(insertSlice.content, 1, depth, false)
            // updatedSliceNodes = (updatedSliceNodes || content).filter((_, i) => i + 1 !== (updatedSliceNodes || content).length)
          } else if (insertSlice.openStart === insertSlice.openEnd) {
            deleteNode(node, offsetPos, newTr, deleteAttrs)
          }
        }
      } else {
        deleteNode(node, offsetPos, newTr, deleteAttrs)
      }
    }
    const newestStep = newTr.steps[newTr.steps.length - 1]
    if (step !== newestStep) {
      // New step added
      deleteMap.appendMap(newestStep.getMap())
    }
  })
  console.log(updatedSliceNodes)
  return {
    deleteMap,
    mergedInsertPos,
    newSliceContent: updatedSliceNodes
      ? Fragment.fromArray(updatedSliceNodes)
      : insertSlice.content,
  }
}

export function trackTransaction(
  tr: Transaction,
  oldState: EditorState,
  newTr: Transaction,
  userData: UserData
) {
  const defaultAttrs: Omit<TrackedAttrs, 'id' | 'operation'> = {
    userID: userData.userID,
    userName: userData.userName,
    time: tr.time,
    status: CHANGE_STATUS.pending,
  }
  const insertAttrs: InsertAttrs = {
    ...defaultAttrs,
    operation: CHANGE_OPERATION.insert,
  }
  const deleteAttrs: DeleteAttrs = {
    ...defaultAttrs,
    operation: CHANGE_OPERATION.delete,
  }
  debug.log('TRACKED Transaction', tr)
  tr.steps.forEach((step) => {
    debug.log('\ntransaction step', step)
    if (step instanceof ReplaceStep) {
      step
        .getMap()
        .forEach((fromA: number, toA: number, fromB: number, toB: number) => {
          debug.log(`changed ranges: ${fromA} ${toA} ${fromB} ${toB}`)
          // @ts-ignore
          const { slice }: { slice: Slice } = step
          newTr.step(step.invert(oldState.doc))
          const { deleteMap, mergedInsertPos, newSliceContent } =
            deleteAndMergeSplitBlockNodes(
              fromA,
              toA,
              oldState.doc,
              newTr,
              oldState.schema,
              deleteAttrs,
              userData,
              slice
            )
          console.log('tr after delete', newTr)
          const toAWithOffset = mergedInsertPos ?? deleteMap.map(toA)
          // applyAndMergeMarks(deleteMap.map(fromA), toAWithOffset, oldState.doc, newTr, deleteAttrs, userColors)
          if (newSliceContent.size > 0) {
            const openStart =
              slice.openStart !== slice.openEnd ? 0 : slice.openStart
            const openEnd =
              slice.openStart !== slice.openEnd ? 0 : slice.openEnd
            const insertedSlice = new Slice(
              setFragmentAsInserted(
                newSliceContent,
                insertAttrs,
                userData,
                oldState.schema
              ),
              openStart,
              openEnd
            )
            const newStep = new ReplaceStep(
              toAWithOffset,
              toAWithOffset,
              insertedSlice
            )
            const stepResult = newTr.maybeStep(newStep)
            if (stepResult.failed) {
              console.log('Insert step', newStep)
              throw Error(`Insert ReplaceStep failed: "${stepResult.failed}"`)
            }
            console.log('tr after insert', newTr)
            applyAndMergeMarks(
              toAWithOffset,
              toAWithOffset + insertedSlice.size,
              newTr.doc,
              newTr,
              oldState.schema,
              insertAttrs,
              userData
            )
            newTr.setSelection(
              new TextSelection(
                newTr.doc.resolve(toAWithOffset + insertedSlice.size)
              )
            )
          } else {
            newTr.setSelection(new TextSelection(newTr.doc.resolve(fromA)))
          }
          // Here somewhere do a check if adjacent insert & delete cancel each other out (matching their content char by char, not diffing)
          // @ts-ignore
          const { meta }: { meta: { [key: string]: any } } = tr
          // This is quite non-optimal in some sense but to ensure no information is lost
          // we have to readd all the old meta keys, such as inputType or uiEvent.
          // So that other plugins/widgets can rely upon them as normal.
          Object.keys(meta).forEach((key) =>
            newTr.setMeta(key, tr.getMeta(key))
          )
        })
      // } else if (step instanceof ReplaceAroundStep) {
    }
  })
  console.log('newTr', newTr)
  return newTr.setMeta('track-changes-enabled', true)
}
