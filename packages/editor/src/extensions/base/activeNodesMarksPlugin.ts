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
import type { QuarterBackSchema } from '@manuscripts/quarterback-schema'
import { Plugin, PluginKey } from 'prosemirror-state'

import { getActiveMarks } from './getActiveMarks'
import type { ActiveNodesMarksState } from './types'

export const activeNodesMarksPluginKey = new PluginKey<
  ActiveNodesMarksState,
  QuarterBackSchema
>('active-nodes-marks')

export const activeNodesMarksPlugin = () => {
  return new Plugin<ActiveNodesMarksState, QuarterBackSchema>({
    key: activeNodesMarksPluginKey,
    state: {
      init() {
        return {
          activeNodes: [],
          activeMarks: [],
        }
      },

      apply(tr, pluginState, oldState, newState) {
        if (tr.docChanged || tr.selectionSet) {
          const marks = getActiveMarks(newState)
          const eqMarks =
            marks.every((m) => pluginState.activeMarks.includes(m)) &&
            marks.length === pluginState.activeMarks.length
          if (!eqMarks) {
            const nextPluginState = {
              ...pluginState,
              activeMarks: marks,
            }
            return nextPluginState
          }
        }
        return pluginState
      },
    },
  })
}
