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
declare module 'prosemirror-dev-tools' {
  import { EditorView } from 'prosemirror-view'
  export function applyDevTools(view: EditorView): void
}

declare module 'prosemirror-example-setup' {
  import { Plugin } from 'prosemirror-state'
  import type { Schema } from 'prosemirror-model'
  import type { Keymap } from 'prosemirror-commands'

  export interface Options {
    schema: Schema
    mapKeys?: any
    menuBar?: boolean
    floatingMenu?: boolean
    menuContent?: any
    history?: boolean
  }
  export function buildMenuItems(schema: Schema): any
  export function buildKeymap(schema: Schema, mapKeys?: any): Keymap
  export function buildInputRules(schema: Schema): Plugin
  export function exampleSetup(options: Options): Plugin[]
}
