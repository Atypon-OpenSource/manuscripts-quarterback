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
import { Plugin, PluginKey } from 'prosemirror-state'
import { EditorProps } from 'prosemirror-view'

import { EquationView } from './EquationView'
import { EquationElementView } from './EquationElementView'

import type { EditorProviders } from '@manuscripts/examples-track-editor'
import type { EquationPluginState } from './types'

export const equationPluginKey = new PluginKey<EquationPluginState>('equation')

export const equationPlugin = (ctx: EditorProviders) => {
  return new Plugin<EquationPluginState>({
    key: equationPluginKey,
    props: {
      nodeViews: {
        equation: EquationView.fromComponent(ctx),
        equation_element: EquationElementView.fromComponent(ctx),
      },
    } as EditorProps,
  })
}
