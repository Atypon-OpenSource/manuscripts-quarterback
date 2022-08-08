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

// :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
// also match `<b>` and `font-weight: bold`.
export const bold: MarkSpec = {
  attrs: { dataTracked: { default: null } },
  parseDOM: [
    { tag: 'strong' },
    // This works around a Google Docs misbehavior where
    // pasted content will be inexplicably wrapped in `<b>`
    // tags with a font-weight normal.
    {
      tag: 'b',
      getAttrs: (dom: HTMLElement | string) => {
        if (dom instanceof HTMLElement) {
          return dom.style.fontWeight !== 'normal' && null
        }
        return null
      },
    },
    {
      style: 'font-weight',
      getAttrs: (dom: HTMLElement | string) => {
        if (typeof dom === 'string') {
          return /^(bold(er)?|[5-9]\d{2,})$/.test(dom) && null
        }
        return null
      },
    },
  ],
  toDOM() {
    return ['strong', 0]
  },
}
