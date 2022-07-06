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
import { Plugin, PluginKey } from 'prosemirror-state'
import { Decoration, DecorationSet, EditorProps } from 'prosemirror-view'
import { Node as PMNode } from 'prosemirror-model'

import { getAction, Action } from './actions'
import { findCommentMarkers } from './findCommentMarkers'

import type { ExtensionProps, CommentsPluginState } from './types'

export const commentsPluginKey = new PluginKey<CommentsPluginState>('comments')

const buildPluginState = (doc: PMNode): CommentsPluginState => {
  const markers = findCommentMarkers(doc)
  const decorations = DecorationSet.create(
    doc,
    markers.map((h) =>
      Decoration.inline(h.from, h.to, {
        nodeName: 'mark',
      })
    )
  )
  return { markers, decorations }
}

export const commentsPlugin = (props: ExtensionProps) => {
  return new Plugin<CommentsPluginState>({
    key: commentsPluginKey,
    state: {
      init: (tr, state) => buildPluginState(state.doc),
      // TODO: map the decorations through content changes, and use setMeta to add/remove/update them
      apply: (tr) => {
        const created = getAction(tr, Action.createComment)
        if (created) {
          props.onCreateMarker(created.id, created.node)
        }
        return buildPluginState(tr.doc)
      },
    },
    props: {
      decorations: (state) => {
        const pluginState = commentsPluginKey.getState(state)
        if (pluginState) {
          return pluginState.decorations
        }
      },
    } as EditorProps,
  })
}
