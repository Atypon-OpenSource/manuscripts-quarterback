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
import type { Transaction } from 'prosemirror-state'

export enum Action {
  createComment = 'create-comment',
}

export type ActionParams = {
  [Action.createComment]: {
    id: string
  }
}

export const getAction = <K extends keyof ActionParams & string>(tr: Transaction, action: K) =>
  tr.getMeta(action) as ActionParams[K] | undefined

export const setAction = <K extends keyof ActionParams & string>(
  tr: Transaction,
  action: K,
  payload: ActionParams[K]
) => tr.setMeta(action, payload)
