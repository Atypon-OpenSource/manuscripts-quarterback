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
import type { Command } from '@manuscripts/manuscript-editor'
import { v4 as uuidv4 } from 'uuid'

import { setAction, Action } from './actions'
import { commentsPluginKey } from './plugin'

export const insertHighlight = (): Command => (state, dispatch) => {
  const { from, to } = state.selection
  const text = state.doc.textBetween(from, to, '\n')
  const id = uuidv4()
  const fromNode = state.schema.nodes.highlight_marker.create({
    id,
    position: 'start',
    text,
  })
  const toNode = state.schema.nodes.highlight_marker.create({
    id,
    position: 'end',
  })
  const { tr } = state
  tr.insert(from, fromNode)
  tr.insert(to + 1, toNode)
  tr.setMeta('addToHistory', false)
  setAction(tr, Action.createComment, { id })
  dispatch && dispatch(tr)
  return true
}

export const deleteHighlightMarkers =
  (rid: string): Command =>
  (state, dispatch) => {
    const markersToDelete: number[] = []

    // TODO: work through the doc instead of using the plugin positions?

    const pluginState = commentsPluginKey.getState(state)
    if (!pluginState) return false

    for (const highlight of pluginState.highlights.values()) {
      if (highlight.rid === rid) {
        if (highlight.start !== undefined) {
          markersToDelete.push(highlight.start - 1)
        }

        if (highlight.end !== undefined) {
          markersToDelete.push(highlight.end)
        }
      }
    }

    if (markersToDelete.length) {
      const { tr } = state

      // delete markers last first
      markersToDelete.sort((a, b) => b - a)

      for (const pos of markersToDelete) {
        tr.delete(pos, pos + 1)
      }

      tr.setMeta('addToHistory', false)

      dispatch && dispatch(tr)
      return true
    }
    return false
  }
