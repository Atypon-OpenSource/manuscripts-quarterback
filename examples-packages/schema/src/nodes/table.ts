/*!
 * © 2019 Atypon Systems LLC
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
import { NodeSpec } from 'prosemirror-model'

export const table: NodeSpec = {
  content: 'table_colgroup? table_body',
  tableRole: 'table',
  isolating: true,
  group: 'block',
  selectable: false,
  attrs: { dataTracked: { default: null }, testAttribute: { default: null } },
  parseDOM: [
    {
      tag: 'table',
    },
  ],
  toDOM: () => {
    return ['table', 0]
  },
}
