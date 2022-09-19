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

// Use inline nodes for links instead of marks as in the original example schema
// This is an useful test case for checking whether wrapping & unwrapping text with links
// is tracked properly and without errors.
export const inline_link: NodeSpec = {
  content: 'text*',
  marks: '', // no marks
  attrs: {
    href: { default: '' },
    title: { default: '' },
    dataTracked: { default: null },
  },
  inline: true,
  group: 'inline',
  draggable: true,
  atom: true,
  parseDOM: [
    {
      tag: 'a[href]',
      getAttrs: (dom) => {
        if (dom instanceof HTMLElement) {
          return {
            href: dom.getAttribute('href') || '',
            title: dom.getAttribute('title') || '',
          }
        }
        return null
      },
    },
  ],
  toDOM: (node: PMNode) => {
    const { href, title } = node.attrs
    const attrs = {
      href,
      ...(title && { title }),
      target: '_blank',
      contenteditable: 'false',
    }
    return ['a', attrs, 0]
  },
}
