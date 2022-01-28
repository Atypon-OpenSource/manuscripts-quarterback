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
