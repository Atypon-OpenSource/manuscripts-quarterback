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

interface Attrs {
  columns: number
  figureLayout: string
  figureStyle: string
  id: string
  label: string
  rows: number
  alignment?: string
  sizeFraction: number
  suppressCaption: boolean
  suppressTitle?: boolean
  expandListing: boolean
}

export const figure_wrapper: NodeSpec = {
  content: '(figure | placeholder)+ figcaption placeholder',
  attrs: {
    figureLayout: { default: '' },
    figureStyle: { default: '' },
    id: { default: '' },
    label: { default: '' },
    sizeFraction: { default: 0 },
    alignment: { default: undefined },
    suppressCaption: { default: false },
    suppressTitle: { default: undefined },
    dataTracked: { default: null },
  },
  selectable: false,
  group: 'block element executable',
  parseDOM: [
    {
      tag: 'figure.figure-group',
      getAttrs: (dom: HTMLElement | string) => {
        if (dom instanceof HTMLElement) {
          return {
            id: dom.getAttribute('id'),
            figureStyle: dom.getAttribute('data-figure-style'),
            figureLayout: dom.getAttribute('data-figure-layout'),
            sizeFraction: Number(dom.getAttribute('data-size-fraction')) || 0,
            alignment: dom.getAttribute('data-alignment') || undefined,
          }
        }
        return null
      },
    },
  ],
  toDOM: (node: PMNode) => {
    const classes: string[] = ['figure-group']
    node.attrs.sizeFraction === 2 && classes.push('figure-group--static')
    const attrs = {
      id: node.attrs.id,
      'data-figure-style': node.attrs.figureStyle,
      'data-figure-layout': node.attrs.figureLayout,
      'data-size-fraction': node.attrs.sizeFraction,
      'data-alignment': node.attrs.alignment,
      class: classes.join(' '),
    }
    return ['figure', attrs, 0]
  },
}
