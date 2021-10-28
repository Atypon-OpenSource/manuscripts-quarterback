import { Node as PMNode, Schema } from 'prosemirror-model'

export type Marks =
  | 'bold'
  | 'code'
  | 'italic'
  | 'link'
  | 'strikethrough'
  | 'tracked_insert'
  | 'tracked_delete'
  | 'ychange'
export type Nodes =
  | 'blockquote'
  | 'code_block'
  | 'doc'
  | 'hard_break'
  | 'heading'
  | 'horizontal_rule'
  | 'image'
  | 'paragraph'
  | 'text'

export type QuarterBackSchema = Schema<Nodes, Marks>
