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
import {
  ApplicationMenus,
  getMenus,
  // styles,
  useApplicationMenus,
  useEditor,
} from '@manuscripts/manuscript-editor'
import { trackChangesPlugin } from '@manuscripts/pm-track-changes'
import { Plugin } from 'prosemirror-state'
import React from 'react'

import { createState, createView } from './setup-editor'

interface Props {
  disableTrack: boolean
}

export function ManuscriptsEditor(props: Props) {
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
