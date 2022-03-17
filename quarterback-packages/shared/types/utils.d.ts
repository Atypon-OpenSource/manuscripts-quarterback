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
export type Event<T> = SuccessEvent<T> | ErrorEvent
export interface SuccessEvent<T> {
  ok: true
  data: T
}
export interface ErrorEvent {
  ok: false
  error: string
  status: number
}
export type OkEvt<T> = {
  e: 'ok'
  data: T
}
export type ErrorEvt = {
  e: 'error'
  error: string
  code?: number
}
export type FinallyEvt = {
  e: 'finally'
}
export type Evt<T> = OkEvt<T> | ErrorEvt | FinallyEvt
