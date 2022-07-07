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

import type { TrackOptions } from '../components/TrackOptions'

function useTrackOptions(storageKey: string, initial?: Partial<TrackOptions>) {
  const [options, setOptions] = useState<TrackOptions>((): TrackOptions => {
    if (typeof window !== 'undefined') {
      let persisted: TrackOptions | undefined
      try {
        persisted = JSON.parse(localStorage.getItem(storageKey) || '')
      } catch (err) {}
      if (persisted) {
        return {
          ...persisted,
          ...initial,
        }
      }
    }
    return {
      disableTrack: false,
      debug: true,
      documentId: 'abc123',
      ...initial,
      user: {
        id: '1-mike',
        name: 'Mike',
        clientID: 1,
        color: '#ff0000',
        ...initial?.user,
      },
    }
  })

  useEffect(() => {
    if (typeof window !== 'undefined') {
      localStorage.setItem(storageKey, JSON.stringify(options))
    }
  }, [storageKey, options])

  return { options, setOptions }
}

export default useTrackOptions
