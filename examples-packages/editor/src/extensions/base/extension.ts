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
import { schema } from '@manuscripts/examples-track-schema'
import type { EditorProviders } from '$context'
import type { Extension } from '$typings/extension'

import { activeNodesMarksPlugin } from './activeNodesMarksPlugin'
import { exampleSetup } from './exampleSetup'

export const baseExtensionName = 'base' as const

export const baseExtension = () => (ctx: EditorProviders) => {
  const plugins = exampleSetup({ schema, history: false }).concat([activeNodesMarksPlugin()])
  return {
    name: baseExtensionName,
    commands: {},
    keymaps: [],
    plugins,
    store: {},
  }
}
