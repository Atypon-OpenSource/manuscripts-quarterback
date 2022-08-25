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
import { Schema } from 'prosemirror-model'
import {
  bold,
  code,
  italic,
  link,
  strikethrough,
  tracked_delete,
  tracked_insert,
  ychange,
} from './marks'
import {
  blockquote,
  code_block,
  comment_marker,
  doc,
  equation,
  equation_wrapper,
  figcaption,
  figure,
  figure_wrapper,
  hard_break,
  heading,
  horizontal_rule,
  ordered_list,
  bullet_list,
  list_item,
  paragraph,
  placeholder,
  table,
  table_body,
  table_cell,
  table_col,
  table_colgroup,
  table_row,
  text,
} from './nodes'

// From https://github.com/ProseMirror/prosemirror-schema-basic/blob/master/src/schema-basic.js
export const schema = new Schema({
  nodes: {
    doc,
    paragraph,
    text,
    blockquote,
    bullet_list,
    code_block,
    comment_marker,
    equation,
    equation_wrapper,
    figcaption,
    figure,
    figure_wrapper,
    hard_break,
    heading,
    horizontal_rule,
    list_item,
    ordered_list,
    placeholder,
    table,
    table_body,
    table_cell,
    table_col,
    table_colgroup,
    table_row,
    image: {
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
      toDOM(node: any) {
        const { src, alt, title } = node.attrs
        return ['img', { src, alt, title }]
      },
    },
  },
  marks: {
    bold,
    code,
    italic,
    link,
    strikethrough,
    tracked_insert,
    tracked_delete,
    ychange,
  },
})
