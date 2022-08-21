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

export const ychange: MarkSpec = {
  attrs: {
    user: { default: null },
    type: { default: null },
    color: { default: null },
  },
  inclusive: false,
  parseDOM: [{ tag: 'ychange' }],
  toDOM(node: Mark) {
    return [
      'ychange',
      {
        ychange_user: node.attrs.user,
        ychange_type: node.attrs.type,
        style: calcYChangeStyle(node.attrs),
        ychange_color: node.attrs.color.light,
      },
      ...hoverWrapper(node.attrs, [0]),
    ]
  },
}

const calcYChangeStyle = (ychange: any) => {
  switch (ychange.type) {
    case 'removed':
      return `color:${ychange.color.dark}`
    case 'added':
      return `background-color:${ychange.color.light}`
    case null:
      return ''
  }
}

const hoverWrapper = (ychange: any, els: any[]) =>
  ychange === null
    ? els
    : [
        [
          'span',
          {
            class: 'ychange-hover',
            style: `background-color:${ychange.color.dark}`,
          },
          ychange.user || 'Unknown',
        ],
        ['span', ...els],
      ]
