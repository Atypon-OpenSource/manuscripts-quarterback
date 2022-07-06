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
import { Node as PMNode, Schema } from 'prosemirror-model'

export type Nodes =
  | 'blockquote'
  | 'code_block'
  | 'doc'
  | 'hard_break'
  | 'heading'
  | 'comment_marker'
  | 'horizontal_rule'
  | 'image'
  | 'paragraph'
  | 'text'
  | 'ordered_list'
  | 'bullet_list'
  | 'list_item'
  | 'table'
  | 'table_body'
  | 'table_colgroup'
  | 'table_row'
  | 'table_cell'
  | 'table_col'

export type Marks =
  | 'bold'
  | 'code'
  | 'italic'
  | 'link'
  | 'strikethrough'
  | 'tracked_insert'
  | 'tracked_delete'
  | 'ychange'

export type QuarterBackSchema = Schema<Nodes, Marks>
