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
import { exampleSetup } from 'prosemirror-example-setup'
import { keymap } from 'prosemirror-keymap'
import {
  redo,
  undo,
  yCursorPlugin,
  ySyncPlugin,
  yUndoPlugin,
} from 'y-prosemirror'

import { EditorContext } from './context'
// import { exampleSetup } from './exampleSetup'
import { activeNodesMarksPlugin } from './extensions/active-nodes-marks'
import { trackChangesPlugin } from './extensions/track-changes'
import { schema } from './schema'

export const pluginsWithoutYjs = (ctx: EditorContext) =>
  exampleSetup({ schema, history: true }).concat([
    activeNodesMarksPlugin(),
    trackChangesPlugin(ctx.viewProvider, ctx.userProvider),
  ])

export const plugins = (ctx: EditorContext) =>
  exampleSetup({ schema, history: false }).concat([
    activeNodesMarksPlugin(),
    trackChangesPlugin(ctx.viewProvider, ctx.userProvider),
    ySyncPlugin(ctx.yjsProvider.yXmlFragment, {
      permanentUserData: ctx.yjsProvider.permanentUserData,
      colors: [
        { light: '#ecd44433', dark: '#ecd444' },
        { light: '#ee635233', dark: '#ee6352' },
        { light: '#6eeb8333', dark: '#6eeb83' },
      ],
    }),
    yCursorPlugin(ctx.yjsProvider.provider.awareness),
    yUndoPlugin(),
    keymap({
      'Mod-z': undo,
      'Mod-y': redo,
      'Mod-Shift-z': redo,
    }),
  ])
