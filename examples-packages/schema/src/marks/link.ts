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
import { Mark, MarkSpec } from 'prosemirror-model'

// :: MarkSpec A link. Has `href` and `title` attributes. `title`
// defaults to the empty string. Rendered and parsed as an `<a>`
// element.
export const link: MarkSpec = {
  attrs: {
    href: {},
    title: { default: null },
    dataTracked: { default: null },
  },
  inclusive: false,
  parseDOM: [
    {
      tag: 'a[href]',
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
  toDOM(node: Mark) {
    const { href, title } = node.attrs
    return ['a', { href, title }, 0]
  },
}
