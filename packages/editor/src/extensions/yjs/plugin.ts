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
// import { ySyncPluginKey } from 'y-prosemirror'
import { Plugin, PluginKey, Transaction } from 'prosemirror-state'
import { ySyncPluginKey, ProsemirrorBinding } from 'y-prosemirror'
import * as Y from 'yjs'

import type { EditorViewProvider } from '$context/Providers'
import type { QuarterBackSchema } from '$schema'

import type { YjsState } from './types'
// import { getAction, setAction, YjsAction } from './actions'
import { YjsStatus } from './types'
import { EditorView } from 'prosemirror-view'

// import { User } from '$lib/typings/user'

export const yjsPluginKey = new PluginKey<YjsState, QuarterBackSchema>('yjs')

interface ColorDef {
  light: string
  dark: string
}
interface YSyncOpts {
  colors?: ColorDef[]
  permanentUserData?: Y.PermanentUserData|null
  colorMapping?: Map<string, ColorDef>
}

const defaultColors = [{ light: '#ecd44433', dark: '#ecd444' }]

export const ySyncPlugin = (yXmlFragment: Y.XmlFragment, opts?: YSyncOpts) => {
  const { colors = defaultColors, colorMapping = new Map(), permanentUserData } = (opts || {})
  let changedInitialContent = false
  const plugin = new Plugin({
    props: {
      editable: (state) => {
        const syncState = ySyncPluginKey.getState(state)
        return syncState.snapshot == null && syncState.prevSnapshot == null
      }
    },
    key: ySyncPluginKey,
    state: {
      init: (initargs, state) => {
        return {
          type: yXmlFragment,
          doc: yXmlFragment.doc,
          binding: null,
          snapshot: null,
          prevSnapshot: null,
          isChangeOrigin: false,
          colors,
          colorMapping,
          permanentUserData
        }
      },
      apply: (tr, pluginState) => {
        const change = tr.getMeta(ySyncPluginKey)
        if (change !== undefined && typeof change === 'object') {
          pluginState = Object.assign({}, pluginState)
          for (const key in change) {
            pluginState[key] = change[key]
          }
        }
        // always set isChangeOrigin. If undefined, this is not change origin.
        pluginState.isChangeOrigin = change !== undefined && !!change.isChangeOrigin
        if (pluginState.binding !== null) {
          if (change !== undefined && (change.snapshot != null || change.prevSnapshot != null)) {
            // snapshot changed, rerender next
            setTimeout(() => {
              if (change.restore == null) {
                pluginState.binding._renderSnapshot(change.snapshot, change.prevSnapshot, pluginState)
              } else {
                pluginState.binding._renderSnapshot(change.snapshot, change.snapshot, pluginState)
                // reset to current prosemirror state
                delete pluginState.restore
                delete pluginState.snapshot
                delete pluginState.prevSnapshot
                pluginState.binding._prosemirrorChanged(pluginState.binding.prosemirrorView.state.doc)
              }
            }, 0)
          }
        }
        return pluginState
      }
    },
    view: (view: EditorView<QuarterBackSchema>) => {
      // ##################
      // Custom hack shim to set the transaction meta field for all transactions fired by ySyncPlugin.
      // Required by track-changes functionality which should intercept all transactions EXCEPT those originated
      // by yjs (since they are trigged synchronizations and other things non-user created)
      // https://github.com/yjs/y-prosemirror/issues/66
      // ##################
      const viewShim = new class ShimmedEditorView {
        get state() {
          return view.state
        }
        get _root() {
          // @ts-ignore
          return view._root
        }
        dispatch = (tr: Transaction) => view.dispatch(tr.setMeta(yjsPluginKey, true))
        hasFocus = () => view.hasFocus()
      }
      const binding = new ProsemirrorBinding(yXmlFragment, viewShim)
      // Make sure this is called in a separate context
      setTimeout(() => {
        binding._forceRerender()
        view.dispatch(view.state.tr.setMeta(ySyncPluginKey, { binding }))
      }, 0)
      return {
        update: () => {
          const pluginState = plugin.getState(view.state)
          if (pluginState.snapshot || pluginState.prevSnapshot) return
          // @ts-ignore
          if (changedInitialContent || view.state.doc.content.findDiffStart(view.state.doc.type.createAndFill().content) !== null) {
            changedInitialContent = true
            binding._prosemirrorChanged(view.state.doc)
          }
        },
        destroy: () => {
          binding.destroy()
        }
      }
    }
  })
  return plugin
}
