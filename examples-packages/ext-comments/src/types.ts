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
import { DecorationSet } from 'prosemirror-view'
import { Node as PMNode } from 'prosemirror-model'

import type { commentsExtension } from './extension'

export const commentsExtensionName = 'comments' as const

export interface CommentStartMarker {
  id: string
  from: number
  userID: string
  createdAt: number
}
export interface CommentMarker extends CommentStartMarker {
  to: number
  text: string
}

export interface CommentsPluginState {
  markers: CommentMarker[]
  decorations: DecorationSet
}

export type CommentsExtension = ReturnType<ReturnType<typeof commentsExtension>>
export type ExtensionProps = {
  onCreateMarker: (markerId: string, node: PMNode) => void
}
