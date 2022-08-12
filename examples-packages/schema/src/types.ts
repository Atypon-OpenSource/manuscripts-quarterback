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

export type Nodes =
  | 'blockquote'
  | 'bullet_list'
  | 'code_block'
  | 'comment_marker'
  | 'doc'
  | 'equation'
  | 'equation_wrapper'
  | 'figcaption'
  | 'figure'
  | 'figure_wrapper'
  | 'hard_break'
  | 'heading'
  | 'horizontal_rule'
  | 'list_item'
  | 'ordered_list'
  | 'paragraph'
  | 'placeholder'
  | 'table'
  | 'table_body'
  | 'table_cell'
  | 'table_col'
  | 'table_colgroup'
  | 'table_row'
  | 'text'

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
