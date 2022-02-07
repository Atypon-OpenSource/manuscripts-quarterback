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

import { trackChangesExtension } from '@manuscripts/ext-track-changes'
import { yjsExtension } from '@manuscripts/ext-yjs'
import {
  createDefaultProviders,
  // styles,
  ReactEditorContext,
  UseEditorProps,
  useEditorV2,
} from '@manuscripts/manuscript-editor'
import { YJS_WS_URL } from 'config'
import { observer } from 'mobx-react'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import React, { useMemo, useRef } from 'react'
import styled from 'styled-components'
import { ySyncPluginKey } from 'y-prosemirror'
import type { WebsocketProvider } from 'y-websocket'
import type { Doc } from 'yjs'

import { TrackOptions } from '../TrackOptions'

// import '@manuscripts/style-guide/styles/tip.css'
// import 'prosemirror-gapcursor/style/gapcursor.css'
// import 'prosemirror-tables/style/tables.css'
// import 'prosemirror-view/style/prosemirror.css'
// import 'codemirror/lib/codemirror.css'
import { defaultEditorProps } from './default-editor-data'
import { RightPanel } from './right-panel/RightPanel'
import { Menus, Toolbar } from './Toolbar'

interface Props {
  className?: string
  options: TrackOptions
  initialData: {
    yDoc: Doc
    pmDoc: Record<string, any>
    provider: WebsocketProvider
  }
}

export const ManuscriptsEditor = observer((props: Props) => {
  const { className = '', options, initialData } = props
  const editorDOMRef = useRef(null)
  const providers = useMemo(() => createDefaultProviders(), [])
  const extensions = useMemo(
    () => [
      ...(options.disableTrack
        ? []
        : [
            trackChangesExtension({
              pluginOpts: {
                user: {
                  id: options.user.id,
                  name: options.user.name,
                },
                skipTrsWithMetas: [ySyncPluginKey],
              },
              debug: options.debug,
            }),
          ]),
      yjsExtension({
        document: {
          id: options.documentId,
        },
        user: options.user,
        initial: {
          doc: initialData.yDoc,
          provider: initialData.provider,
        },
        ws_url: YJS_WS_URL,
      }),
    ],
    [options, initialData]
  )
  const editorProps = useMemo<UseEditorProps>(
    () => ({
      ctx: providers,
      initialDoc: initialData.pmDoc,
      extensions,
      manuscriptsProps: defaultEditorProps,
      onEditorReady: (ctx) => {
        applyDevTools(ctx.viewProvider.view)
        window.commands = ctx.extensionProvider.commands
      },
    }),
    [extensions]
  )
  useEditorV2(editorProps, editorDOMRef)
  return (
    <ReactEditorContext.Provider value={providers}>
      <Toolbar />
      <ViewGrid>
        <LeftSide>
          <Menus />
          <hr />
          <div id="editor" ref={editorDOMRef} className={`${className}`} />
        </LeftSide>
        <RightPanel disableYjs={false} />
      </ViewGrid>
    </ReactEditorContext.Provider>
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
