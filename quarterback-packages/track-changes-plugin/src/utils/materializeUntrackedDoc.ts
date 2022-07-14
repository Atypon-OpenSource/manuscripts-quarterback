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
import { Node as PMNode } from 'prosemirror-model'
import { EditorState } from 'prosemirror-state'
import { CHANGE_OPERATION } from '../types/change'

export function getUntrackedContent(node: PMNode) {
  const r: PMNode[] = []
  node.forEach((child) => {
    const { attrs } = child
    const op: CHANGE_OPERATION | undefined = attrs?.dataTracked?.operation
    if (
      child.isText &&
      child.marks.find((m) => m.type.name === 'tracked_insert') === undefined
    ) {
      r.push(
        child.type.schema.text(
          child.text || '',
          child.marks.filter((m) => m.type.name !== 'tracked_delete')
        )
      )
    } else if (op !== 'insert' && !child.isText) {
      r.push(
        child.type.create(
          { ...attrs, dataTracked: null },
          getUntrackedContent(child),
          child.marks
        )
      )
    }
  })
  return r
}

export function getDocWithoutTrackContent(state: EditorState) {
  const { doc } = state
  return doc.type.create(doc.attrs, getUntrackedContent(doc), doc.marks)
}