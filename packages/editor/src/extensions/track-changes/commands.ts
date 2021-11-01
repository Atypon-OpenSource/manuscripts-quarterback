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

import type { Command } from '$typings/editor'
import { User } from '$typings/user'

import { setAction, TrackChangesAction } from './actions'
import { CHANGE_OPERATION, CHANGE_STATUS } from './ChangeSet'
import { trackChangesPluginKey } from './plugin'
import {
  applyAndMergeMarks,
  deleteAndMergeSplitBlockNodes,
} from './trackTransaction'
import { DeleteAttrs, InsertAttrs, TrackChangesStatus } from './types'

export const toggleTrackChanges = (): Command => (state, dispatch) => {
  const currentStatus = trackChangesPluginKey.getState(state)?.status
  if (dispatch && currentStatus) {
    const newStatus =
      currentStatus === TrackChangesStatus.enabled
        ? TrackChangesStatus.disabled
        : TrackChangesStatus.enabled
    dispatch(
      setAction(state.tr, TrackChangesAction.setTrackingStatus, newStatus)
    )
    return true
  }
  return false
}

export const setInserted = (): Command => (state, dispatch) => {
  const pluginState = trackChangesPluginKey.getState(state)
  if (!dispatch || !pluginState) {
    return false
  }
  const { currentUser, insertColor, deleteColor } = pluginState
  const tr = state.tr
  const { from, to } = state.selection
  const insertAttrs: InsertAttrs = {
    userID: currentUser.id,
    userName: currentUser.name,
    time: tr.time,
    operation: CHANGE_OPERATION.insert,
    status: CHANGE_STATUS.pending,
  }
  const userColors = {
    userID: currentUser.id,
    userName: currentUser.name,
    insertColor,
    deleteColor,
  }
  applyAndMergeMarks(from, to, state.doc, tr, insertAttrs, userColors)
  dispatch(tr)
  return true
}

export const setDeleted = (): Command => (state, dispatch) => {
  const pluginState = trackChangesPluginKey.getState(state)
  if (!dispatch || !pluginState) {
    return false
  }
  const { currentUser, insertColor, deleteColor } = pluginState
  const tr = state.tr
  const { from, to } = state.selection
  const deleteAttrs: DeleteAttrs = {
    userID: currentUser.id,
    userName: currentUser.name,
    time: tr.time,
    operation: CHANGE_OPERATION.delete,
    status: CHANGE_STATUS.pending,
  }
  const userColors = {
    userID: currentUser.id,
    userName: currentUser.name,
    insertColor,
    deleteColor,
  }
  const { deleteMap, newSliceContent } = deleteAndMergeSplitBlockNodes(
    from,
    to,
    state.doc,
    tr,
    deleteAttrs,
    userColors,
    state.doc.slice(0, 0)
  )
  applyAndMergeMarks(
    deleteMap.map(from),
    deleteMap.map(to),
    state.doc,
    tr,
    deleteAttrs,
    userColors
  )
  dispatch(tr)
  return true
}

export const addTrackedAttributesToBlockNode =
  (): Command => (state, dispatch) => {
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

export const setChangeStatuses =
  (status: CHANGE_STATUS, ids: string[]): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        setAction(state.tr, TrackChangesAction.setChangeStatuses, {
          status,
          ids,
        })
      )
      return true
    }
    return false
  }

export const setUser =
  (user: User): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(setAction(state.tr, TrackChangesAction.setUser, user))
      return true
    }
    return false
  }

export const toggleShownStatuses =
  (statuses: CHANGE_STATUS[]): Command =>
  (state, dispatch) => {
    if (dispatch) {
      dispatch(
        setAction(state.tr, TrackChangesAction.toggleShownStatuses, statuses)
      )
      return true
    }
    return false
  }

export const createSnapshot = (): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(setAction(state.tr, TrackChangesAction.createSnapshot, true))
    return true
  }
  return false
}

export const refreshChanges = (): Command => (state, dispatch) => {
  if (dispatch) {
    dispatch(setAction(state.tr, TrackChangesAction.updateChanges, []))
    return true
  }
  return false
}
