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
import type { Event } from '@manuscripts/quarterback-shared'

import { API_URL } from '../config'
import { stores } from '../stores'

function getAuthHeader() {
  const jwt = stores?.authStore.jwt
  return jwt && { Authorization: `Bearer ${jwt.token}` }
}

export async function wrappedFetch<T>(
  path: string,
  options: RequestInit,
  defaultError = 'Request failed'
): Promise<Event<T>> {
  let resp
  try {
    resp = await fetch(`${API_URL}/${path}`, options)
  } catch (err) {
    // Must be a connection error (?)
    console.error(err)
    return { ok: false, error: 'Connection error', status: 550 }
  }
  const data = await resp.json()
  if (!resp.ok) {
    console.error(data?.message || defaultError)
    return {
      ok: false,
      error: data?.message || defaultError,
      status: resp.status,
    }
  }
  return { ok: true, data }
}

export function get<T>(path: string, defaultError?: string): Promise<Event<T>> {
  return wrappedFetch(
    path,
    {
      method: 'GET',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    },
    defaultError
  )
}

export function post<T>(path: string, payload: any, defaultError?: string): Promise<Event<T>> {
  return wrappedFetch(
    path,
    {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    },
    defaultError
  )
}

export function put<T>(path: string, payload: any, defaultError?: string): Promise<Event<T>> {
  return wrappedFetch(
    path,
    {
      method: 'PUT',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
      body: JSON.stringify(payload),
    },
    defaultError
  )
}

export function del<T>(path: string, defaultError?: string): Promise<Event<T>> {
  return wrappedFetch(
    path,
    {
      method: 'DELETE',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        ...getAuthHeader(),
      },
    },
    defaultError
  )
}
