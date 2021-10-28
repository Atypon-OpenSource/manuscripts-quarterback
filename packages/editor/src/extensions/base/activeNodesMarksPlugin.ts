import { Plugin, PluginKey } from 'prosemirror-state'

import { getActiveMarks } from './getActiveMarks'

import type { QuarterBackSchema } from '@manuscripts/quarterback-schema'
import type { ActiveNodesMarksState } from './types'

export const activeNodesMarksPluginKey = new PluginKey<ActiveNodesMarksState, QuarterBackSchema>(
  'active-nodes-marks'
)

export const activeNodesMarksPlugin = () => {
  return new Plugin<ActiveNodesMarksState, QuarterBackSchema>({
    key: activeNodesMarksPluginKey,
    state: {
      init() {
        return {
          activeNodes: [],
          activeMarks: []
        }
      },

      apply(tr, pluginState, oldState, newState) {
        if (tr.docChanged || tr.selectionSet) {
          const marks = getActiveMarks(newState)
          const eqMarks =
            marks.every(m => pluginState.activeMarks.includes(m)) &&
            marks.length === pluginState.activeMarks.length
          if (!eqMarks) {
            const nextPluginState = {
              ...pluginState,
              activeMarks: marks
            }
            return nextPluginState
          }
        }
        return pluginState
      }
    }
  })
}
