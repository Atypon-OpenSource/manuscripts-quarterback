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

export const comment_marker: NodeSpec = {
  inline: true,
  group: 'inline',
  atom: true,
  attrs: {
    id: { default: '' },
    userID: { default: null },
    createdAt: { default: null },
    position: { default: '' },
  },
  parseDOM: [
    {
      tag: 'span.comment-marker',
      getAttrs: (dom: HTMLElement | string) => {
        if (dom instanceof HTMLElement) {
          return {
            id: dom.getAttribute('id'),
            userID: dom.getAttribute('data-user-id'),
            createdAt: dom.getAttribute('data-created-at'),
            position: dom.getAttribute('data-position'),
          }
        }
        return null
      },
    },
  ],
  toDOM: (node: PMNode) => {
    const attrs = {
      class: 'comment-marker',
      'data-user-id': node.attrs.userID,
      'data-created-at': node.attrs.createdAt,
      'data-position': node.attrs.position,
      ...(node.attrs.position === 'start' && { id: node.attrs.id }),
    }
    return ['span', attrs]
  },
}
