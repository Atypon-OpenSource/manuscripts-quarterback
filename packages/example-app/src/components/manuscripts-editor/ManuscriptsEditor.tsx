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
import '@manuscripts/manuscript-editor/styles/Editor.css'
import '@manuscripts/manuscript-editor/styles/LeanWorkflow.css'
import '@manuscripts/manuscript-editor/styles/popper.css'

// import '@manuscripts/style-guide/styles/tip.css'
// import 'prosemirror-gapcursor/style/gapcursor.css'
// import 'prosemirror-tables/style/tables.css'
// import 'prosemirror-view/style/prosemirror.css'
// import 'codemirror/lib/codemirror.css'
import { defaultEditorProps } from './default-editor-data'
import {
  ApplicationMenus,
  createDefaultProviders,
  createMenus,
  getMenus,
  // styles,
  ReactEditorContext,
  useApplicationMenus,
  useEditor,
  useEditorContext,
  useEditorState,
  useEditorV2,
} from '@manuscripts/manuscript-editor'
import { trackChangesPlugin } from '@manuscripts/pm-track-changes'
import { Plugin } from 'prosemirror-state'
import React, { useMemo, useRef } from 'react'
import { applyDevTools } from 'prosemirror-dev-toolkit'

import { createState, createView } from './setup-editor'

function Menus() {
  const { viewProvider } = useEditorContext()
  const editorState = useEditorState()
  const menuSpec = useMemo(
    () => editorState && viewProvider ? createMenus()(editorState, viewProvider?.execCommand) : [],
    [editorState, viewProvider?.execCommand]
  )
  const menus = useApplicationMenus(menuSpec)
  return <ApplicationMenus {...menus} />
}

interface Props {
  className?: string
  disableTrack: boolean
}

export function ManuscriptsEditor(props: Props) {
  const { className = '', disableTrack } = props
  const plugins: Plugin[] = disableTrack
    ? []
    : [trackChangesPlugin({ user: undefined })]
  const editorDOMRef = useRef(null)
  const providers = useMemo(() => createDefaultProviders(), [])
  useEditorV2(
    {
      ctx: providers,
      initialState: createState({ plugins }),
      extensions: [],
      manuscriptsProps: defaultEditorProps,
      onEditorReady: (ctx) => {
        applyDevTools(ctx.viewProvider.view)
      },
    },
    editorDOMRef
  )
  return (
    <ReactEditorContext.Provider value={providers}>
      <div>
        <Menus />
        <hr />
        <div id="editor" ref={editorDOMRef} className={`${className}`} />
      </div>
    </ReactEditorContext.Provider>
  )
}

export function ManuscriptsEditorOld(props: Props) {
  const { disableTrack } = props
  const plugins: Plugin[] = disableTrack
    ? []
    : [trackChangesPlugin({ user: undefined })]
  const editor = useEditor(createState({ plugins }), createView())
  const { onRender } = editor
  const menus = useApplicationMenus(getMenus(editor, () => null))
  // @ts-ignore
  window.view = editor.view
  return (
    <div>
      <ApplicationMenus {...menus} />
      <hr />
      <div ref={onRender} id="editor"></div>
    </div>
  )
}
