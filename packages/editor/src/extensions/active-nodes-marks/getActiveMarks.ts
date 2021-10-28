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
import { EditorState } from 'prosemirror-state'

// From https://github.com/PierBover/prosemirror-cookbook
export function getActiveMarks(state: EditorState): string[] {
  if (state.selection.empty) {
    const $from = state.selection.$from
    const storedMarks = state.storedMarks

    // Return either the stored marks, or the marks at the cursor position.
    // Stored marks are the marks that are going to be applied to the next input
    // if you dispatched a mark toggle with an empty cursor.
    if (storedMarks) {
      return storedMarks.map((mark) => mark.type.name)
    } else {
      return $from.marks().map((mark) => mark.type.name)
    }
  } else {
    const $head = state.selection.$head
    const $anchor = state.selection.$anchor

    // We're using a Set to not get duplicate values
    const activeMarks = new Set<string>()

    // Here we're getting the marks at the head and anchor of the selection
    $head.marks().forEach((mark) => activeMarks.add(mark.type.name))
    $anchor.marks().forEach((mark) => activeMarks.add(mark.type.name))

    return Array.from(activeMarks)
  }
}
