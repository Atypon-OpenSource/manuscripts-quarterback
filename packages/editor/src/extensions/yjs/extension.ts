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
import { keymap } from 'prosemirror-keymap'
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from 'y-prosemirror'
import { Awareness } from 'y-protocols/awareness'

import type { EditorProviders } from '$context'
import type { Extension } from '$typings/extension'

import * as commands from './commands'
import { yjsPlugin } from './plugin'
import { createYjsStore } from './store'
import type { YjsOptions } from './types'

export const yjsExtensionName = 'yjs' as const

export const yjsExtension = (opts: YjsOptions) => (ctx: EditorProviders) => {
  if (opts.disabled) {
    return {
      name: yjsExtensionName,
      opts,
      commands: { ...commands },
      keymaps: [],
      plugins: [],
      store: undefined,
    }
  }
  const store = createYjsStore(ctx.viewProvider, opts).init()
  const plugins = [
    yjsPlugin(ctx.viewProvider),
    ySyncPlugin(store.yXmlFragment, {
      permanentUserData: store.permanentUserData,
      colors: [
        { light: '#ecd44433', dark: '#ecd444' },
        { light: '#ee635233', dark: '#ee6352' },
        { light: '#6eeb8333', dark: '#6eeb83' },
      ],
    }),
    yCursorPlugin(store.awareness),
    yUndoPlugin(),
    keymap({
      'Mod-z': undo,
      'Mod-y': redo,
      'Mod-Shift-z': redo,
    }),
  ]
  return {
    name: yjsExtensionName,
    opts,
    commands: { ...commands },
    keymaps: [],
    plugins,
    store,
  }
}
