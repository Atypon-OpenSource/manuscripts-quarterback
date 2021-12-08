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
import { useEditorContext } from '@manuscripts/manuscript-editor'
import { useEffect, useState } from 'react'

import { yjsExtensionName } from './extension'
import { YjsExtension, YjsExtensionState, YjsStore } from './types'

export function useYjsExtension() {
  const { extensionProvider } = useEditorContext()
  // const [ext, setExt] = useState<YjsExtension>()
  const [state, setState] = useState<YjsExtensionState>()
  const [store, setStore] = useState<YjsStore>()

  useEffect(() => {
    const cb = (newState: YjsExtensionState) => {
      setState(newState)
    }
    const yjs = extensionProvider?.getExtension(yjsExtensionName) as YjsExtension | undefined
    if (!yjs || yjs.opts.disabled || !yjs.store) {
      return
    }
    setStore(yjs.store)
    const { onUpdate, offUpdate, getState } = yjs.store
    setState(getState())
    // setExt(yjs)
    onUpdate(cb)
    return () => {
      offUpdate(cb)
    }
  }, [extensionProvider])

  return [state, store] as [YjsExtensionState | undefined, YjsStore | undefined]
}
