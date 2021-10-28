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
import { SnapshotProvider } from './SnapshotProvider'
import { UserProvider } from './UserProvider'
import { YjsProvider } from './YjsProvider'
import { YjsSnapshotProvider } from './YjsSnapshotProvider'

export { EditorViewProvider } from './EditorViewProvider'
export { ExtensionProvider } from './ExtensionProvider'
export { PluginStateProvider } from './PluginStateProvider'
export { SnapshotProvider } from './SnapshotProvider'
export { UserProvider } from './UserProvider'
export { YjsProvider } from './YjsProvider'
export { YjsSnapshotProvider } from './YjsSnapshotProvider'

export interface EditorProviders {
  viewProvider: EditorViewProvider
  extensionProvider: ExtensionProvider
  pluginStateProvider: PluginStateProvider
  snapshotProvider: SnapshotProvider
  userProvider: UserProvider
  yjsProvider: YjsProvider
  yjsSnapshotProvider: YjsSnapshotProvider
}

// By providing default values without providers the Providers are not created twice
// - first as the default value of createContext, second inside Editor
export const emptyProviders = {
  viewProvider: undefined,
  extensionProvider: undefined,
  pluginStateProvider: undefined,
  snapshotProvider: undefined,
  userProvider: undefined,
  yjsProvider: undefined,
  yjsSnapshotProvider: undefined,
}

export const createDefaultProviders = (): EditorProviders => {
  const viewProvider = new EditorViewProvider()
  const extensionProvider = new ExtensionProvider()
  const pluginStateProvider = new PluginStateProvider(viewProvider)
  const snapshotProvider = new SnapshotProvider(viewProvider)
  const yjsProvider = new YjsProvider(viewProvider)
  const userProvider = new UserProvider(viewProvider, yjsProvider)
  const yjsSnapshotProvider = new YjsSnapshotProvider(viewProvider, yjsProvider)
  return {
    viewProvider,
    extensionProvider,
    pluginStateProvider,
    snapshotProvider,
    userProvider,
    yjsProvider,
    yjsSnapshotProvider,
  }
}
