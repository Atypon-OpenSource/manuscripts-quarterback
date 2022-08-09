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
  id: string
  suppressCaption: boolean
  suppressTitle?: boolean
}

export interface EquationElementNode extends PMNode {
  attrs: Attrs
}

export const equation_wrapper: NodeSpec = {
  content: '(equation | placeholder) figcaption',
  attrs: {
    id: { default: '' },
    suppressCaption: { default: true },
    suppressTitle: { default: undefined },
    dataTracked: { default: null },
  },
  selectable: false,
  group: 'block element',
  parseDOM: [
    {
      tag: 'figure.equation',
      getAttrs: (p) => {
        const dom = p as HTMLElement

        return {
          id: dom.getAttribute('id'),
        }
      },
    },
  ],
  toDOM: (node) => {
    const equationElementNode = node as EquationElementNode

    return [
      'figure',
      {
        class: 'equation', // TODO: suppress-caption?
        id: equationElementNode.attrs.id,
      },
      0,
    ]
  },
}
