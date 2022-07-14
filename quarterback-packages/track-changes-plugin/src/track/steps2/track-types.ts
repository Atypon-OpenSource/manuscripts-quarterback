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
import { Fragment, Node as PMNode, Schema } from 'prosemirror-model'

// export interface Insert {
//   op: 'insert'
//   fragment: Fragment
// }
// export interface Delete {
//   op: 'delete'
//   merge: boolean
// }
// export interface Update {
//   op: 'update'
//   attrs: Record<string, any>
// }
// export interface Change {
//   from: number
//   to: number
//   type: 'node' | 'text'
//   operation: Insert | Delete | Update
// }
export interface Insert {
  from: number
  type: 'insert'
  fragment: Fragment
}
export interface DeleteNode {
  pos: number
  nodeEnd: number
  type: 'delete-node'
  merge: boolean
}
export interface DeleteText {
  pos: number
  from: number
  to: number
  type: 'delete-text'
}
export interface UpdateNodeAttrs {
  pos: number
  type: 'update-node-attrs'
  attrs: Record<string, any>
}
export type Change = Insert | DeleteNode | DeleteText | UpdateNodeAttrs
