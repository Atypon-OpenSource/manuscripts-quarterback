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
import { EditorViewProvider } from './EditorViewProvider'
import { ExtensionProvider } from './ExtensionProvider'
import { PluginStateProvider } from './PluginStateProvider'
import { PopperProvider } from './PopperProvider'

export interface EditorContext {
  viewProvider: EditorViewProvider
  extensionProvider: ExtensionProvider
  pluginStateProvider: PluginStateProvider
  popperProvider: PopperProvider
}

// By providing default values without providers the Providers are not created twice
// - first as the default value of createContext, second inside Editor
export const emptyProviders = {
  viewProvider: undefined,
  extensionProvider: undefined,
  pluginStateProvider: undefined,
  popperProvider: undefined,
}

export const createDefaultProviders = (): EditorContext => {
  const viewProvider = new EditorViewProvider()
  const extensionProvider = new ExtensionProvider()
  const pluginStateProvider = new PluginStateProvider(viewProvider)
  const popperProvider = new PopperProvider()
  return {
    viewProvider,
    extensionProvider,
    pluginStateProvider,
    popperProvider,
  }
}
