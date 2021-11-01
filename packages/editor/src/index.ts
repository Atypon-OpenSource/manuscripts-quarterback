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

import type { EditorView } from 'prosemirror-view'

import type { Commands } from './typings/editor'

declare global {
  interface Window {
    editorView: EditorView
    commands: Commands
  }
}

import { baseCommands, trackCommands, yjsCommands } from '.'
export const commands = { baseCommands, trackCommands, yjsCommands }

export * from './context'
export * from './react'
export * from './extensions/base'
export * from './extensions/track-changes'
export * from './extensions/yjs'
export * from './typings'
export { PMEditor } from './PMEditor'
export { pickExtension } from './extensions'
