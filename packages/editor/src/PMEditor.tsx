import React, { useRef } from 'react'
import { EditorView } from 'prosemirror-view'
import { EditorState, Transaction } from 'prosemirror-state'

import { useSSRLayoutEffect } from './react'

import { schema } from './schema'

import { commands } from './commands'
import { plugins, pluginsWithoutYjs } from './plugins'

import { EditorContext, useEditorContext } from './context'
import { EditorProps } from './typings/editor'

import './editor.css'
import './prosemirror-example-setup.css'
import './menu.css'
import './yjs.css'

export function PMEditor(props: EditorProps) {
  const { className = '', yjs } = props
  const editorDOMRef = useRef(null)
  const editorViewRef = useRef<EditorView | null>(null)
  const ctx = useEditorContext()

  useSSRLayoutEffect(() => {
    const disableYjs = !yjs || yjs.disabled
    !disableYjs && ctx.yjsProvider!.init(yjs)
    const state = createEditorState(ctx as EditorContext, disableYjs)
    const editorViewDOM = editorDOMRef.current
    if (editorViewDOM) {
      editorViewRef.current = createEditorView(editorViewDOM, state)
      ctx.viewProvider!.init(editorViewRef.current)
      props.onEditorReady && props?.onEditorReady(ctx as EditorContext)
    }
    return () => {
      editorViewRef.current?.destroy()
    }
  }, [])

  function createEditorState(ctx: EditorContext, disableYjs?: boolean) {
    return EditorState.create({
      schema,
      plugins: disableYjs ? pluginsWithoutYjs(ctx) : plugins(ctx)
    })
  }

  function createEditorView(element: HTMLDivElement, state: EditorState) {
    const view = new EditorView({ mount: element }, {
      state,
      dispatchTransaction,
    })
    if (window) {
      // @ts-ignore
      window.editorView = view
      // @ts-ignore
      window.commands = commands
    }
    return view
  }

  function dispatchTransaction(tr: Transaction) {
    if (!editorViewRef.current) {
      return
    }
    const oldEditorState = editorViewRef.current.state
    const newState = oldEditorState.apply(tr)
    ctx.viewProvider?.updateState(newState)
    ctx.pluginStateProvider?.updatePluginListeners(oldEditorState, newState)
    if (props.onEdit) {
      props.onEdit(newState)
    }
  }

  return (
    <div id="example-editor" ref={editorDOMRef} className={className}/>
  )
}
