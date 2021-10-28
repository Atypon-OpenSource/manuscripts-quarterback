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
import type { SnapshotProviderState } from '$context/SnapshotProvider'

export function useSnapshotProvider() {
  const { snapshotProvider } = useEditorContext()

  const [state, setState] = useState<SnapshotProviderState | undefined>(
    snapshotProvider?.state
  )

  useEffect(() => {
    const cb = (newState: SnapshotProviderState) => {
      setState(newState)
    }
    setState(snapshotProvider?.state)
    snapshotProvider?.onUpdate(cb)
    return () => {
      snapshotProvider?.offUpdate(cb)
    }
  }, [snapshotProvider])

  return state
}
