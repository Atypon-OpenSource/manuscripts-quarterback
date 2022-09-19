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
import { Command, EditorState, Plugin, TextSelection, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import { wrapIn } from 'prosemirror-commands'
import { Mark, Node as PMNode, NodeRange, NodeType, Schema, Slice } from 'prosemirror-model'
// import {lift, joinUp, selectParentNode, wrapIn, setBlockType} from "prosemirror-commands"
import { findWrapping } from 'prosemirror-transform'

export const addMark =
  (text: string, pos?: number): Command =>
  (state, dispatch) => {
    const tr = state.tr
    tr.insertText(text, pos)
    dispatch && dispatch(tr)
    return true
  }

export const wrapInInline =
  (nodeType: NodeType, attrs?: { [key: string]: any }): Command =>
  (state, dispatch) => {
    const range = new NodeRange(
        state.selection.$from,
        state.selection.$to,
        state.selection.$from.depth
      ),
      wrapping = findWrapping(range, nodeType, attrs)
    if (!wrapping) return false
    dispatch && dispatch(state.tr.wrap(range, wrapping))
    return true
  }
