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
import React, { useEffect, useState } from 'react'

interface Options {
  disableTrack: boolean
  debug: boolean
  documentId: string
}

function useEditorOptions(storageKey: string, initialDocumentId?: string) {
  const [mounted, setMounted] = useState(false)
  const [options, setOptions] = useState<Options>({
    disableTrack: false,
    debug: true,
    documentId: initialDocumentId || 'abc123',
  })

  useEffect(() => {
    if (typeof window !== 'undefined' && !mounted) {
      let persisted
      try {
        persisted = JSON.parse(localStorage.getItem(storageKey) || '')
      } catch (err) {
        console.error(err)
      }
      if (persisted) {
        setOptions(persisted)
      }
      setMounted(true)
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(options))
    }
  }, [options])

  return { options, setOptions }
}

export default useEditorOptions
