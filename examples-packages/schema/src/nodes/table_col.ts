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
import { Node as PMNode, NodeSpec } from 'prosemirror-model'

export const table_col: NodeSpec = {
  attrs: {
    dataTracked: { default: null },
    width: { default: '' },
  },
  tableRole: 'col',
  parseDOM: [
    {
      tag: 'col',
      getAttrs: (dom: HTMLElement | string) => {
        if (dom instanceof HTMLElement) {
          return {
            width: dom.getAttribute('width'),
          }
        }
        return null
      },
    },
  ],
  toDOM: (node: PMNode) => {
    const tableColNode = node
    const attrs: { [key: string]: string } = {}
    if (tableColNode.attrs.width) {
      attrs['width'] = tableColNode.attrs.width
    }
    return ['col', attrs]
  },
}
