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

import { CommentMarker, CommentStartMarker } from './types'

export const isCommentMarkerNode = (node: PMNode): node is PMNode =>
  node.type === node.type.schema.nodes.comment_marker

export function findCommentMarkers(doc: PMNode) {
  const markers: CommentMarker[] = []
  let current: CommentStartMarker | undefined
  doc.descendants((node, pos) => {
    if (isCommentMarkerNode(node)) {
      const { position, id, userID, createdAt } = node.attrs
      if (position === 'start') {
        current = {
          from: pos + 1,
          id,
          userID,
          createdAt,
        }
      } else if (position === 'end' && current) {
        markers.push({
          ...current,
          text: doc.textBetween(current.from, pos, '\n'),
          to: pos,
        })
        current = undefined
      } else {
        console.warn('Encountered comment_marker node with incorrect position!', node)
      }
    }
  })
  return markers
}
