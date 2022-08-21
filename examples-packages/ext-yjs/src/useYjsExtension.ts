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
import { ExtensionProvider, useEditorContext } from '@manuscripts/manuscript-editor'
import { useEffect, useRef, useState } from 'react'

import { YjsExtension, yjsExtensionName, YjsExtensionState, YjsStore } from './types'

export function useYjsExtension(debounce?: number) {
  const { extensionProvider } = useEditorContext()
  const [state, setState] = useState<YjsExtensionState>()
  const [store, setStore] = useState<YjsStore>()
  const timeout = useRef<ReturnType<typeof setTimeout> | undefined>()
  const data = useRef<YjsExtensionState | undefined>()

  useEffect(() => {
    const updateStoreCb = (provider: ExtensionProvider) => {
      const yjs = provider?.getExtension(yjsExtensionName) as YjsExtension | undefined
      if (yjs) {
        setStore(yjs.store)
        setState(yjs.store.getState())
      }
    }
    const updateStateCb = (newState: YjsExtensionState) => {
      if (debounce === undefined) {
        setState(newState)
      } else if (timeout.current) {
        data.current = newState
      } else {
        if (!data.current) {
          data.current = newState
        }
        timeout.current = setTimeout(() => {
          setState(data.current)
          data.current = undefined
          timeout.current = undefined
        }, debounce)
      }
    }
    if (!extensionProvider) {
      console.warn("useYjsExtension didn't subscribe to extensionProvider!")
      return
    }
    updateStoreCb(extensionProvider)
    extensionProvider.onExtensionUpdate(yjsExtensionName, updateStateCb)
    extensionProvider.onUpdate(updateStoreCb)
    return () => {
      extensionProvider.offExtensionUpdate(yjsExtensionName, updateStateCb)
      extensionProvider.offUpdate(updateStoreCb)
    }
  }, [extensionProvider])

  return { yjsState: state, yjsStore: store }
}
