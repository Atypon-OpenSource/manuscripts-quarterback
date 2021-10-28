import React, { useRef } from 'react'
import { EditorView } from 'prosemirror-view'
import { EditorState, Transaction } from 'prosemirror-state'
import { schema } from '@manuscripts/quarterback-schema'

import { useSSRLayoutEffect } from './react'

import { EditorContext as EditorProviders, useEditorContext } from './context'
import { EditorProps } from './typings/editor'

import './styles/editor.css'
import './styles/prosemirror-example-setup.css'
import './styles/menu.css'
import './styles/yjs.css'

export function PMEditor(props: EditorProps) {
  const { className = '', ...editorProps } = props
  const editorDOMRef = useRef(null)
  const editorViewRef = useRef<EditorView | null>(null)
  const ctx = useEditorContext()

  useSSRLayoutEffect(() => {
    const editorViewDOM = editorDOMRef.current
    if (editorViewDOM && ctx.viewProvider) {
      editorViewRef.current = init(editorViewDOM, ctx, editorProps, editorViewRef.current)
    }
    return () => {
      editorViewRef.current?.destroy()
    }
  }, [])

  function init(element: HTMLElement, ctx: EditorProviders, props: EditorProps, oldView?: EditorView | null) {
    const { viewProvider: vStore, extensionProvider: eStore } = ctx
    eStore.init(ctx, props.extensions || [])
    const state = createEditorState(ctx)
    const view = oldView || createEditorView(element, state, ctx, props)
    if (oldView) {
      view.setProps({
        state,
        dispatchTransaction(tr: Transaction) {
          const oldEditorState = this.state
          const newState = oldEditorState.apply(tr)
          this.updateState(newState)
          ctx.viewProvider.updateState(newState)
          ctx.pluginStateProvider.updatePluginListeners(oldEditorState, newState)
          props.onEdit && props.onEdit(newState)
        }
      })
    }
    if (window) {
      window.editorView = view
      window.commands = ctx.extensionProvider.commands
    }
    vStore.init(view)
    vStore.updateState(state)
    props.onEditorReady && props.onEditorReady(ctx)
    return view
  }

  function createEditorState(ctx: EditorProviders) {
    return EditorState.create({
      schema,
      plugins: ctx.extensionProvider.plugins
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
          const newState = oldEditorState.apply(tr)
          this.updateState(newState)
          ctx.viewProvider.updateState(newState)
          ctx.pluginStateProvider.updatePluginListeners(oldEditorState, newState)
          props.onEdit && props.onEdit(newState)
        }
      }
    )
  }

  return (
    <div id="example-editor" ref={editorDOMRef} className={className}/>
  )
}
