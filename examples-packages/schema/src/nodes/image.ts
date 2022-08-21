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

// :: NodeSpec An inline image (`<img>`) node. Supports `src`,
// `alt`, and `href` attributes. The latter two default to the empty
// string.
export const image: NodeSpec = {
  inline: true,
  group: 'inline',
  draggable: true,
  attrs: {
    src: {},
    alt: { default: null },
    title: { default: null },
    dataTracked: { default: null },
  },
  parseDOM: [
    {
      tag: 'img[src]',
      getAttrs(dom: HTMLElement | string) {
        if (dom instanceof HTMLElement) {
          return {
            src: dom.getAttribute('src'),
            title: dom.getAttribute('title'),
            alt: dom.getAttribute('alt'),
          }
        }
        return null
      },
    },
  ],
  toDOM(node: PMNode) {
    const { src, alt, title } = node.attrs
    return ['img', { src, alt, title }]
  },
}
