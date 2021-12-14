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
import { uuidv4 } from '@manuscripts/quarterback-shared'
import randomColor from 'randomcolor'
import { names, uniqueNamesGenerator } from 'unique-names-generator'

import { YjsUser } from './types'

export const generateColor = () =>
  randomColor({
    luminosity: 'dark',
  })

export function generateUser(clientID?: number, name?: string): YjsUser {
  return {
    id: uuidv4(),
    clientID: clientID || Math.floor(Math.random() * 1000000),
    name:
      name ||
      uniqueNamesGenerator({
        dictionaries: [names],
      }),
    color: randomColor({
      luminosity: 'dark',
    }),
  }
}

export function generateYjsUser(user: { id: string; name: string; color?: string }): YjsUser {
  return {
    clientID: Math.floor(Math.random() * 1000000),
    color: generateColor(),
    ...user,
  }
}
