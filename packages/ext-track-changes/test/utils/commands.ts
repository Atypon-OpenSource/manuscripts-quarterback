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
import type { Command } from 'prosemirror-commands'
import { Fragment, Node as PMNode } from 'prosemirror-model'
import { TextSelection } from 'prosemirror-state'

export const insertText =
  (text: string, pos?: number): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return false
    }
    const tr = state.tr
    const { from } = state.selection
    tr.insertText(text, pos !== undefined ? pos : from)

    dispatch(tr)
    return true
  }

export const deleteBetween =
  (size: number, pos?: number): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return false
    }
    const tr = state.tr
    const { from, to } = state.selection
    const start = pos !== undefined ? pos : from
    tr.delete(start, start + size)

    dispatch(tr)
    return true
  }

export const backspace =
  (times = 1): Command =>
  (state, dispatch) => {
    const { selection, tr } = state
    const { from, empty } = selection

    if (!dispatch) {
      return false
    }
    if (empty) {
      dispatch(tr.delete(from - times, from))
      return true
    }

    tr.deleteSelection()

    if (times > 1) {
      tr.delete(from - (times - 1), from)
    }

    dispatch(tr)
    return true
  }

export const replace =
  (content: Fragment | PMNode | PMNode[], start?: number, end?: number): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return false
    }
    const { tr } = state
    tr.replaceWith(start || 0, end === undefined ? state.doc.nodeSize - 2 : end, content)
    dispatch(tr)
    return true
  }

export const selectText =
  (start: number, end?: number): Command =>
  (state, dispatch) => {
    if (!dispatch) {
      return false
    }
    const { tr } = state
    tr.setSelection(TextSelection.create(state.doc, start, end))
    dispatch(tr)
    return true
  }
