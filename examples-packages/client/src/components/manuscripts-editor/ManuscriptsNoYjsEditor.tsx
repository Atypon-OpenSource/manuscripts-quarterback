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

import {
  trackChangesPluginKey,
  trackCommands,
  TrackChangesState,
} from '@manuscripts/track-changes-plugin'
import { PmDoc } from '@manuscripts/examples-track-types'
import {
  // styles,
  usePluginState,
  UseEditorProps,
  useEditorContext,
  useEditorV2,
} from '@manuscripts/manuscript-editor'
import { observer } from 'mobx-react'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import { history } from 'prosemirror-history'
import { EditorState } from 'prosemirror-state'
import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'

import { TrackOptions } from '../TrackOptions'
import { trackChangesExtension } from '../../trackExtension'

// import '@manuscripts/style-guide/styles/tip.css'
// import 'prosemirror-gapcursor/style/gapcursor.css'
// import 'prosemirror-tables/style/tables.css'
// import 'prosemirror-view/style/prosemirror.css'
// import 'codemirror/lib/codemirror.css'
import { defaultEditorProps } from './default-editor-data'
import { RightPanel } from '../right-panel/RightPanel'
import { Menus, Toolbar } from './Toolbar'

interface Props {
  className?: string
  options: TrackOptions
  initialData: PmDoc
  onEdit?: (state: EditorState) => void
}

export const ManuscriptsNoYjsEditor = observer((props: Props) => {
  const { className = '', options, initialData, onEdit } = props
  const editorDOMRef = useRef(null)
  const providers = useEditorContext()
  const trackChangesState = usePluginState<TrackChangesState>(trackChangesPluginKey, 100)
  const extensions = useMemo(
    () => [
      ...(options.disableTrack
        ? []
        : [
            trackChangesExtension({
              userID: options.user.id,
              debug: options.debug,
            }),
          ]),
    ],
    [options, initialData]
  )
  const editorProps = useMemo<UseEditorProps>(
    () => ({
      ctx: providers,
      initialDoc: initialData.doc as any, // TODO lol
      extensions,
      manuscriptsProps: {
        ...defaultEditorProps,
        plugins: [history()],
      },
      onEdit,
      onEditorReady: (ctx) => {
        applyDevTools(ctx.viewProvider.view)
        window.commands = ctx.extensionProvider.commands
        // @ts-ignore
        window.tcmds = trackCommands
        // @ts-ignore
        window.execCmd = ctx.viewProvider.execCommand
      },
    }),
    [extensions]
  )
  useEditorV2(editorProps, editorDOMRef)
  return (
    <>
      <Toolbar />
      <ViewGrid>
        <LeftSide>
          <Menus />
          <hr />
          <div id="editor" ref={editorDOMRef} className={`${className}`} />
        </LeftSide>
        {providers.viewProvider && (
          <RightPanel
            yjsDisabled={true}
            viewProvider={providers.viewProvider}
            trackChangesState={trackChangesState}
          />
        )}
      </ViewGrid>
    </>
  )
})

const ViewGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  margin-top: 1rem;
`
const LeftSide = styled.div`
  margin-right: 1rem;
`
