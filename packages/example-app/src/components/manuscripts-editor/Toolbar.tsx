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
  ApplicationMenus,
  createMenus,
  ManuscriptToolbar,
  useApplicationMenus,
  useEditorContext,
  useEditorState,
} from '@manuscripts/manuscript-editor'
import React, { useMemo } from 'react'

const DEFAULT_CAPABILITIES = {
  acceptTask: false,
  accessEditor: true,
  changeDesignation: false,
  changeDueDate: false,
  completeTask: false,
  createComment: true,
  createNotes: false,
  createSuggestion: true,
  downloadFiles: true,
  editNotTracked: false,
  handleNotes: false,
  handleOthersComments: false,
  handleOwnComments: true,
  handleQualityReport: false,
  handleSuggestion: false,
  previewAccess: true,
  putOnHoldTask: false,
  rejectOwnSuggestion: true,
  rejectTask: false,
  replaceFile: false,
  resolveOnHoldTask: false,
  resolveOthersComment: true,
  resolveOwnComment: true,
  restoreVersion: false,
  seeEditorToolbar: true,
  setMainManuscript: false,
  uploadFile: false,
  viewHistory: false,
  viewNotes: true,
  viewSuggestion: true,
}

export function Menus() {
  const { viewProvider } = useEditorContext()
  const editorState = useEditorState()
  const menuSpec = useMemo(
    () =>
      editorState && viewProvider ? createMenus()(editorState, viewProvider?.execCommand) : [],
    [editorState, viewProvider]
  )
  const menus = useApplicationMenus(menuSpec)
  return <ApplicationMenus {...menus} />
}

export function Toolbar() {
  const { viewProvider } = useEditorContext()
  const editorState = useEditorState()
  if (!viewProvider?._view || !editorState) {
    return null
  }
  return (
    <ManuscriptToolbar
      can={DEFAULT_CAPABILITIES}
      view={viewProvider?.view}
      state={editorState}
      dispatch={viewProvider?.view.dispatch}
      footnotesEnabled={true}
    />
  )
}
