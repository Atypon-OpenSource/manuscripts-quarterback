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
import type { Command } from 'prosemirror-state'
import { v4 as uuidv4 } from 'uuid'

import { setAction, Action } from './actions'
import { commentsPluginKey } from './plugin'
import { CommentMarker } from './types'

export const focusCommentMarker =
  (marker: CommentMarker): Command =>
  (state, dispatch, view) => {
    // const { tr } = state
    // tr.scrollIntoView()
    const dom = document.getElementById(marker.id)
    console.log('hello', view)
    console.log('dom', dom)
    if (dom instanceof HTMLElement) {
      // dom.scrollIntoView()
      // dom.focus()
      dom.scrollIntoView({
        behavior: 'smooth',
        block: 'nearest',
        inline: 'nearest',
      })
    }
    return true
  }

export const insertCommentMarker =
  (userID: string): Command =>
  (state, dispatch) => {
    const { from, to } = state.selection
    const id = uuidv4()
    const createdAt = Date.now()
    const fromNode = state.schema.nodes.comment_marker.create({
      id,
      position: 'start',
      userID,
      createdAt,
    })
    const toNode = state.schema.nodes.comment_marker.create({
      id,
      position: 'end',
      userID,
      createdAt,
    })
    const { tr } = state
    tr.insert(from, fromNode)
    tr.insert(to + 1, toNode)
    tr.setMeta('addToHistory', false)
    setAction(tr, Action.createComment, { id, node: fromNode })
    dispatch && dispatch(tr)
    return true
  }

export const deleteCommentMarker =
  (id: string): Command =>
  (state, dispatch) => {
    const markersToDelete: number[] = []
    commentsPluginKey.getState(state)?.markers.forEach((highlight) => {
      if (highlight.id === id) {
        markersToDelete.push(highlight.from - 1)
        markersToDelete.push(highlight.to)
      }
    })
    if (markersToDelete.length === 0) return false
    const { tr } = state
    markersToDelete
      .sort((a, b) => b - a)
      .forEach((pos) => {
        tr.delete(pos, pos + 1)
      })
    tr.setMeta('addToHistory', false)
    dispatch && dispatch(tr)
    return true
  }
