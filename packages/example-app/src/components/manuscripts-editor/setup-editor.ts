/*!
 * © 2019 Atypon Systems LLC
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

import {
  createNodeViews,
  createPlugins,
  EditorProps,
  transformPasted,
} from '@manuscripts/manuscript-editor'
import { schema } from '@manuscripts/manuscript-transform'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { defaultEditorProps } from './default-editor-data'

export function parseDoc(json: { [key: string]: unknown }) {
  return schema.nodeFromJSON(json)
}

export const createState = (props?: Partial<EditorProps>) =>
  EditorState.create({
    doc: { ...defaultEditorProps, ...props }.doc,
    schema,
    plugins: createPlugins({ ...defaultEditorProps, ...props }),
  })

export const createView =
  (props?: Partial<EditorProps>) =>
  (
    el: HTMLElement,
    state: EditorState,
    dispatch?: (tr: Transaction) => void
  ) => {
    const view = new EditorView(el, {
      state,
      editable: () => true,
      scrollThreshold: 100,
      scrollMargin: {
        top: 100,
        bottom: 100,
        left: 0,
        right: 0,
      },
      dispatchTransaction: dispatch,
      nodeViews: createNodeViews({ ...defaultEditorProps, ...props }),
      transformPasted,
    })
    applyDevTools(view)
    return view
  }
