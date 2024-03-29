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
import { Slice } from 'prosemirror-model'
import { EditorState, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'
import React, { useRef } from 'react'

import { EditorContext as EditorProviders, useEditorContext } from './context'
import { useSSRLayoutEffect } from './react'
import { EditorProps } from './typings/editor'

export const useEditor = (editorProps: EditorProps, editorDOMRef: React.RefObject<HTMLElement>) => {
  const editorViewRef = useRef<EditorView | null>(null)
  const ctx = useEditorContext()

  useSSRLayoutEffect(() => {
    const editorViewDOM = editorDOMRef.current
    if (editorViewDOM && ctx.viewProvider) {
      editorViewRef.current = init(editorViewDOM, ctx, editorProps, editorViewRef.current)
    }
  }, [editorProps])

  function init(
    element: HTMLElement,
    ctx: EditorProviders,
    props: EditorProps,
    oldView?: EditorView | null
  ) {
    ctx.extensionProvider.destroy()
    ctx.extensionProvider.init(ctx, props)
    const state = createEditorState(ctx, props)
    const view = oldView || createEditorView(element, state, ctx, props)
    if (oldView) {
      view.setProps({
        state,
        dispatchTransaction(tr: Transaction) {
          if (!this.state) return
          const oldEditorState = this.state
          const newState = oldEditorState.apply(tr)
          ctx.viewProvider.updateState(newState)
          ctx.pluginStateProvider.updatePluginListeners(oldEditorState, newState)
          props.onEdit && props.onEdit(newState)
        },
      })
    }
    if (window) {
      // @ts-ignore
      window.editorView = view
      window.commands = ctx.extensionProvider.commands
      // @ts-ignore
      window.slice = Slice
    }
    ctx.viewProvider.init(view)
    ctx.viewProvider.updateState(state)
    props.onEditorReady && props.onEditorReady(ctx)
    return view
  }

  function createEditorState(ctx: EditorProviders, props: EditorProps) {
    return EditorState.create({
      schema: props.schema,
      plugins: ctx.extensionProvider.plugins,
    })
  }

  function createEditorView(
    element: HTMLElement,
    state: EditorState,
    ctx: EditorProviders,
    props: EditorProps
  ) {
    return new EditorView(
      { mount: element },
      {
        state,
        dispatchTransaction(tr: Transaction) {
          const oldEditorState = this.state
          const { state: newState, transactions } = oldEditorState.applyTransaction(tr)
          ctx.viewProvider.updateState(newState)
          ctx.pluginStateProvider.updatePluginListeners(oldEditorState, newState)
          props.onEdit && props.onEdit(newState)
        },
      }
    )
  }
}
