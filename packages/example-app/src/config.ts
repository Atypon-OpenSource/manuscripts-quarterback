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
export const IS_DEV = process.env.NODE_ENV !== 'production'
export const YJS_WS_URL =
  process.env.REACT_APP_YJS_WS_URL || 'ws://localhost:3800'
export const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:3800'
