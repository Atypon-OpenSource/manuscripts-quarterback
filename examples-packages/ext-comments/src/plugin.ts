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
import { Plugin, PluginKey, TextSelection } from 'prosemirror-state'
import { Decoration, DecorationSet, EditorProps } from 'prosemirror-view'
import { Node as PMNode } from 'prosemirror-model'

import type { ExtensionProps, HighlightWithNode, PluginState } from './types'

export const ANNOTATION_COLOR = [250, 224, 150] as [number, number, number]
export const SET_COMMENT_TARGET = 'SET_COMMENT_TARGET'
export const isHighlightMarkerNode = (node: PMNode): node is PMNode =>
  node.type === node.type.schema.nodes.highlight_marker

export const commentsPluginKey = new PluginKey<PluginState>('comments')

const buildHighlightsMap = (doc: PMNode) => {
  const highlights = new Map<string, HighlightWithNode>()

  doc.descendants((node: PMNode, pos: number) => {
    if (isHighlightMarkerNode(node)) {
      const { position, rid } = node.attrs

      switch (position) {
        case 'start': {
          highlights.set(rid, {
            start: pos + 1,
            rid,
            node,
          })
          break
        }

        case 'end': {
          const highlight = highlights.get(rid)

          if (highlight && highlight.start !== undefined) {
            // const text = doc.textBetween(highlight.start, pos, '\n')

            highlights.set(rid, {
              ...highlight,
              end: pos,
              // text,
            })
          }

          break
        }
      }
    }
  })

  return highlights
}

const buildDecorations = (highlights: Map<string, HighlightWithNode>) => {
  const decorations: Decoration[] = []

  for (const highlight of highlights.values()) {
    const { start, end } = highlight

    if (start !== undefined && end !== undefined && start < end) {
      decorations.push(
        Decoration.inline(start, end, {
          nodeName: 'span',
          class: 'highlight',
          style: `background: rgba(${ANNOTATION_COLOR.join(', ')}, 0.6)`,
        })
      )
    }
  }

  return decorations
}

const buildPluginState = (doc: PMNode): PluginState => {
  const highlights = buildHighlightsMap(doc)

  const decorations = DecorationSet.create(doc, buildDecorations(highlights))

  return { highlights, decorations }
}

export default (props: ExtensionProps) => {
  return new Plugin<PluginState>({
    key: commentsPluginKey,
    state: {
      init: (tr, state) => buildPluginState(state.doc),
      // TODO: map the decorations through content changes, and use setMeta to add/remove/update them
      apply: (tr) => {
        const meta = tr.getMeta(commentsPluginKey)

        if (meta) {
          if (SET_COMMENT_TARGET in meta) {
            props.setCommentTarget(meta[SET_COMMENT_TARGET])
          }
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
