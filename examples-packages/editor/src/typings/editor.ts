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
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { EditorProviders } from '$context/Providers'

import type { CreateExtension } from './extension'

export interface EditorProps {
  extensions: CreateExtension[]
  schema: Schema
  onEditorReady?: (providers: EditorProviders) => void
  onEdit?: (state: EditorState) => void
}

export type Commands = { [name: string]: (...args: any[]) => Command }
export type CommandDispatch = (tr: Transaction) => void
export type Command = (state: EditorState, dispatch?: CommandDispatch, view?: EditorView) => boolean
export type HigherOrderCommand = (command: Command) => Command

export interface JSONEditorState {
  doc: { [key: string]: any }
  selection: { [key: string]: any }
  plugins: { [key: string]: any }
}
export type JSONPMNode = { [key: string]: any }
