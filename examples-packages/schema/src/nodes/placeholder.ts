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

export const placeholder: NodeSpec = {
  atom: true,
  selectable: false,
  attrs: {
    id: { default: '' },
    label: { default: '' },
    dataTracked: { default: null },
  },
  group: 'block',
  parseDOM: [
    {
      tag: 'div.placeholder',
      getAttrs: (dom: HTMLElement | string) => {
        if (dom instanceof HTMLElement) {
          return {
            id: dom.getAttribute('id'),
            label: dom.getAttribute('label'),
          }
        }
        return null
      },
    },
  ],
  toDOM: (node: PMNode) => {
    return [
      'div',
      {
        class: 'placeholder-item',
        id: node.attrs.id,
      },
    ]
  },
}
