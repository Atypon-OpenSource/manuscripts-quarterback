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

const getCellAttrs = (p: Node | string) => {
  const dom = p as HTMLTableCellElement

  const celltype = dom.tagName.toLowerCase()
  const colspan = Number(dom.getAttribute('colspan') || 1)

  return {
    celltype,
    colspan,
    rowspan: Number(dom.getAttribute('rowspan') || 1),
    placeholder: dom.getAttribute('data-placeholder-text') || '',
  }
}

export const table_cell: NodeSpec = {
  content: 'inline*',
  attrs: {
    dataTracked: { default: null },
    celltype: { default: 'td' },
    colspan: { default: 1 },
    rowspan: { default: 1 },
  },
  tableRole: 'cell',
  isolating: true,
  parseDOM: [
    { tag: 'td', getAttrs: getCellAttrs },
    { tag: 'th', getAttrs: getCellAttrs },
  ],
  toDOM: (node: PMNode) => {
    const tableCellNode = node
    const attrs: { [attr: string]: string } = {}
    const tag = tableCellNode.attrs.celltype
    if (tableCellNode.attrs.colspan && tableCellNode.attrs.colspan !== 1) {
      attrs.colspan = String(tableCellNode.attrs.colspan)
    }
    if (tableCellNode.attrs.rowspan && tableCellNode.attrs.rowspan !== 1) {
      attrs.rowspan = String(tableCellNode.attrs.rowspan)
    }
    return [tag, attrs, 0]
  },
}
