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
import { YjsExtension, yjsExtensionName, YjsExtensionState, YjsStore } from '@manuscripts/ext-yjs'
import { ExtensionProvider, useEditorContext } from '@manuscripts/quarterback-editor'
import { useEffect, useState } from 'react'
import * as Y from 'yjs'

export function useYjsExtension() {
  const { extensionProvider } = useEditorContext()
  const [state, setState] = useState<YjsExtensionState>()
  const [store, setStore] = useState<YjsStore>()

  useEffect(() => {
    const updateStoreCb = (provider: ExtensionProvider) => {
      const yjs = provider?.getExtension(yjsExtensionName) as YjsExtension | undefined
      yjs && setStore(yjs.store)
    }
    const updateStateCb = (newState: YjsExtensionState) => {
      setState(newState)
    }
    if (!extensionProvider) {
      return
    }
    updateStoreCb(extensionProvider)
    const yjs = extensionProvider.getExtension<YjsExtension>(yjsExtensionName)
    setState(yjs.store ? yjs.store.getState() : undefined)
    extensionProvider.onExtensionUpdate(yjsExtensionName, updateStateCb)
    extensionProvider.onUpdate(updateStoreCb)
    return () => {
      extensionProvider.offExtensionUpdate(yjsExtensionName, updateStateCb)
      extensionProvider.offUpdate(updateStoreCb)
    }
  }, [extensionProvider])

  return [state, store] as [YjsExtensionState | undefined, YjsStore | undefined]
}
