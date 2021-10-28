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
import { useEffect, useState } from 'react'

import { useEditorContext } from '$context'
import type { YjsSnapshotProviderState } from '$context/YjsSnapshotProvider'

export function useYjsSnapshotProvider() {
  const { yjsSnapshotProvider } = useEditorContext()

  const [state, setState] = useState<YjsSnapshotProviderState | undefined>(
    yjsSnapshotProvider?.state
  )

  useEffect(() => {
    const cb = (newState: YjsSnapshotProviderState) => {
      setState(newState)
    }
    setState(yjsSnapshotProvider?.state)
    yjsSnapshotProvider?.onUpdate(cb)
    return () => {
      yjsSnapshotProvider?.offUpdate(cb)
    }
  }, [yjsSnapshotProvider])

  return state
}
