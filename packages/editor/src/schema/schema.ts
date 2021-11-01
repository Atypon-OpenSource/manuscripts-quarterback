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
import { QuarterBackSchema, Nodes, Marks } from './types'

import { TrackedAttrs } from '$extensions/track-changes'

export const schema: QuarterBackSchema = new Schema<Nodes, Marks>({
  nodes: {
    // :: NodeSpec The top level document node.
    doc: {
      content: 'block+',
    },

    // :: NodeSpec A plain paragraph textblock. Represented in the DOM
    // as a `<p>` element.
    paragraph: {
      attrs: { dataTracked: { default: null } },
      content: 'inline*',
      group: 'block',
      parseDOM: [{ tag: 'p' }],
      toDOM() {
        return ['p', 0]
      },
    },

    // :: NodeSpec A blockquote (`<blockquote>`) wrapping one or more blocks.
    blockquote: {
      attrs: { dataTracked: { default: null } },
      content: 'block+',
      group: 'block',
      defining: true,
      parseDOM: [{ tag: 'blockquote' }],
      toDOM() {
        return ['blockquote', 0]
      },
    },

    // :: NodeSpec A horizontal rule (`<hr>`).
    horizontal_rule: {
      group: 'block',
      parseDOM: [{ tag: 'hr' }],
      toDOM() {
        return ['hr']
      },
    },

    // :: NodeSpec A heading textblock, with a `level` attribute that
    // should hold the number 1 to 6. Parsed and serialized as `<h1>` to
    // `<h6>` elements.
    heading: {
      attrs: { level: { default: 1 } },
      content: 'inline*',
      group: 'block',
      defining: true,
      parseDOM: [
        { tag: 'h1', attrs: { level: 1 } },
        { tag: 'h2', attrs: { level: 2 } },
        { tag: 'h3', attrs: { level: 3 } },
        { tag: 'h4', attrs: { level: 4 } },
        { tag: 'h5', attrs: { level: 5 } },
        { tag: 'h6', attrs: { level: 6 } },
      ],
      toDOM(node) {
        return ['h' + node.attrs.level, 0]
      },
    },

    // :: NodeSpec A code listing. Disallows marks or non-text inline
    // nodes by default. Represented as a `<pre>` element with a
    // `<code>` element inside of it.
    code_block: {
      content: 'text*',
      marks: '',
      group: 'block',
      code: true,
      defining: true,
      parseDOM: [{ tag: 'pre', preserveWhitespace: 'full' }],
      toDOM() {
        return ['pre', ['code', 0]]
      },
    },

    // :: NodeSpec The text node.
    text: {
      group: 'inline',
    },

    // :: NodeSpec An inline image (`<img>`) node. Supports `src`,
    // `alt`, and `href` attributes. The latter two default to the empty
    // string.
    image: {
      inline: true,
      attrs: {
        src: {},
        alt: { default: null },
        title: { default: null },
      },
      group: 'inline',
      draggable: true,
      parseDOM: [
        {
          tag: 'img[src]',
          getAttrs(p) {
            const dom = p as HTMLElement
            return {
              src: dom.getAttribute('src'),
              title: dom.getAttribute('title'),
              alt: dom.getAttribute('alt'),
            }
          },
        },
      ],
      toDOM(node) {
        const { src, alt, title } = node.attrs
        return ['img', { src, alt, title }]
      },
    },

    // :: NodeSpec A hard line break, represented in the DOM as `<br>`.
    hard_break: {
      inline: true,
      group: 'inline',
      selectable: false,
      parseDOM: [{ tag: 'br' }],
      toDOM() {
        return ['br']
      },
    },
  },
  marks: {
    // :: MarkSpec A link. Has `href` and `title` attributes. `title`
    // defaults to the empty string. Rendered and parsed as an `<a>`
    // element.
    link: {
      attrs: {
        href: {},
        title: { default: null },
      },
      inclusive: false,
      parseDOM: [
        {
          tag: 'a[href]',
          getAttrs(p) {
            const dom = p as HTMLElement
            return {
              href: dom.getAttribute('href'),
              title: dom.getAttribute('title'),
            }
          },
        },
      ],
      toDOM(node) {
        const { href, title } = node.attrs
        return ['a', { href, title }, 0]
      },
    },

    // :: MarkSpec An emphasis mark. Rendered as an `<em>` element.
    // Has parse rules that also match `<i>` and `font-style: italic`.
    italic: {
      parseDOM: [{ tag: 'i' }, { tag: 'em' }, { style: 'font-style=italic' }],
      toDOM() {
        return ['em', 0]
      },
    },

    // :: MarkSpec A strong mark. Rendered as `<strong>`, parse rules
    // also match `<b>` and `font-weight: bold`.
    bold: {
      parseDOM: [
        { tag: 'strong' },
        // This works around a Google Docs misbehavior where
        // pasted content will be inexplicably wrapped in `<b>`
        // tags with a font-weight normal.
        {
          tag: 'b',
          getAttrs: (p) => {
            const node = p as HTMLElement
            return node.style.fontWeight != 'normal' && null
          },
        },
        {
          style: 'font-weight',
          getAttrs: (p) => {
            const value = p as string
            return /^(bold(er)?|[5-9]\d{2,})$/.test(value) && null
          },
        },
      ],
      toDOM() {
        return ['strong', 0]
      },
    },

    // :: MarkSpec Code font mark. Represented as a `<code>` element.
    code: {
      parseDOM: [{ tag: 'code' }],
      toDOM() {
        return ['code', 0]
      },
    },

    strikethrough: {
      parseDOM: [
        { tag: 's' },
        { tag: 'strike' },
        { style: 'text-decoration=line-through' },
        { style: 'text-decoration-line=line-through' },
      ],
      toDOM: () => ['s'],
    },

    tracked_insert: {
      excludes: 'tracked_insert tracked_delete',
      attrs: {
        dataTracked: { default: null },
        pending_bg: { default: 'greenyellow' },
      },
      parseDOM: [{ tag: 'ins' }],
      toDOM: (el) => {
        const dataTracked: TrackedAttrs | undefined = el.attrs.dataTracked
        const { status = 'pending' } = dataTracked || {}
        const { pending_bg } = el.attrs
        const attrs = {
          class: `inserted ${status}`,
          style:
            status === 'pending' ? `background: ${pending_bg};` : undefined,
        }
        return ['ins', attrs]
      },
    },

    tracked_delete: {
      excludes: 'tracked_insert tracked_delete',
      attrs: {
        dataTracked: { default: null },
        pending_bg: { default: '#ffa4a4' },
      },
      parseDOM: [{ tag: 'del' }],
      toDOM: (el) => {
        const dataTracked: TrackedAttrs | undefined = el.attrs.dataTracked
        const { status = 'pending' } = dataTracked || {}
        const { pending_bg } = el.attrs
        const attrs = {
          class: `deleted ${status}`,
          style:
            status === 'pending' ? `background: ${pending_bg};` : undefined,
        }
        return ['del', attrs]
      },
    },

    ychange: {
      attrs: {
        user: { default: null },
        type: { default: null },
        color: { default: null },
      },
      inclusive: false,
      parseDOM: [{ tag: 'ychange' }],
      toDOM(node) {
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
    },
  },
})

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

const calcYchangeDomAttrs = (
  attrs: { [key: string]: any },
  domAttrs: { [key: string]: any } = {}
) => {
  domAttrs = Object.assign({}, domAttrs)
  if (attrs.ychange !== null) {
    domAttrs.ychange_user = attrs.ychange.user
    domAttrs.ychange_type = attrs.ychange.type
    domAttrs.ychange_color = attrs.ychange.color.light
    domAttrs.style = calcYChangeStyle(attrs.ychange)
  }
  return domAttrs
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
