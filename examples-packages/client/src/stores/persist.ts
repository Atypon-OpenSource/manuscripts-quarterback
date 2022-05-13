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
type Storage = 'local' | 'session'

export const getStorage = (storage: Storage) => {
  if (typeof window === 'undefined') {
    return undefined
  }
  switch (storage) {
    case 'local':
      return localStorage
    case 'session':
      return sessionStorage
  }
}

export function hydrate<T>(storage: Storage = 'local', key: string) {
  if (typeof window === 'undefined') {
    return undefined
  }
  const existing = getStorage(storage)?.getItem(key)
  if (existing && existing !== null && existing.length > 0) {
    try {
      return JSON.parse(existing) as T
    } catch (err) {
      console.error('Encountered corrupted data in hydration: ', existing)
      return undefined
    }
  }
  return undefined
}

export function persist<T>(storage: Storage = 'local', key: string, val: T) {
  getStorage(storage)?.setItem(key, JSON.stringify(val))
}
