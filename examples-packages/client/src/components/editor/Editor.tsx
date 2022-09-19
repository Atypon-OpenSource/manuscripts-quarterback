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
import {
  trackCommands,
  trackChangesPlugin,
  trackChangesPluginKey,
  TrackChangesState,
} from '@manuscripts/track-changes-plugin'
import {
  commentsPluginKey,
  commentsExtension,
  CommentsPluginState,
} from '@manuscripts/ext-comments'
import { exampleSetupExtension } from '@manuscripts/ext-example-setup'
import { equationExtension } from '@manuscripts/ext-equation'
import { generateUser, yjsExtension, YjsUser } from '@manuscripts/ext-yjs'
import {
  EditorProps,
  useEditor,
  useEditorContext,
  usePluginState,
} from '@manuscripts/examples-track-editor'
import { schema } from '@manuscripts/examples-track-schema'
import { YJS_WS_URL } from 'config'
import { observer } from 'mobx-react'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import React, { useMemo, useRef, useState } from 'react'
import { stores } from 'stores'
import styled from 'styled-components'
import { ySyncPluginKey } from 'y-prosemirror'
import type { WebsocketProvider } from 'y-websocket'
import type { Doc } from 'yjs'

import { trackChangesExtension } from '../../trackExtension'
import { TrackOptions } from '../TrackOptions'
import { RightPanel } from '../right-panel/RightPanel'
import { Toolbar } from './Toolbar'
import { UsersList } from './UsersList'
import { useYjsExtension } from './useYjsExtension'

import '@manuscripts/track-changes-plugin/src/styles.css'
import '@manuscripts/ext-example-setup/prosemirror-example-setup.css'
import '@manuscripts/ext-example-setup/menu.css'
import '@manuscripts/ext-yjs/yjs.css'
import '@manuscripts/ext-equation/styles.css'

interface Props {
  options: TrackOptions
  initialData: {
    yDoc: Doc
    pmDoc: Record<string, any>
    provider: WebsocketProvider
  }
}

export const Editor = observer((props: Props) => {
  const { options, initialData } = props
  const {
    commentStore: { toggleCommentListOpen },
  } = stores
  const editorDOMRef = useRef(null)
  const { viewProvider } = useEditorContext()
  const { yjsState, yjsStore } = useYjsExtension(100)
  const trackChangesState = usePluginState<TrackChangesState>(trackChangesPluginKey, 100)
  const commentsState = usePluginState<CommentsPluginState>(commentsPluginKey, 1)
  const extensions = useMemo(
    () => [
      exampleSetupExtension({ schema, history: false }),
      ...(options.disableTrack
        ? []
        : [
            trackChangesExtension({
              userID: options.user.id,
              skipTrsWithMetas: [ySyncPluginKey],
              debug: options.debug,
            }),
          ]),
      equationExtension(),
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
      commentsExtension({
        onCreateMarker: (id: string, node: any) => {
          console.log('id', id)
          console.log('node', node)
          toggleCommentListOpen(id)
        },
      }),
    ],
    [options]
  )
  const editorProps = useMemo<EditorProps>(
    () => ({
      initialDoc: initialData.pmDoc,
      schema,
      extensions,
      onEditorReady: (ctx) => {
        applyDevTools(ctx.viewProvider.view)
        window.commands = ctx.extensionProvider.commands
      },
    }),
    [extensions]
  )
  useEditor(editorProps, editorDOMRef)

  return (
    <>
      <UsersList yjsState={yjsState} />
      <div>
        <ViewGrid>
          <LeftSide>
            <Toolbar />
            <div ref={editorDOMRef} />
          </LeftSide>
          {viewProvider && (
            <RightPanel
              yjsState={yjsState}
              yjsStore={yjsStore}
              viewProvider={viewProvider}
              trackChangesState={trackChangesState}
              commentsState={commentsState}
            />
          )}
        </ViewGrid>
      </div>
    </>
  )
})

const ViewGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  margin-top: 1rem;

  .ProseMirror {
    border: 1px solid black;
    min-height: 140px;
    overflow-wrap: break-word;
    outline: none;
    padding: 10px;
    white-space: pre-wrap;
    max-width: 600px;
    width: 100%;
  }
  .ProseMirror img {
    width: -webkit-fill-available;
  }
  .ProseMirror mark {
    background-color: rgba(250, 224, 150, 0.6);
  }
  .ProseMirror mark:focus {
    background-color: rgb(255 192 13);
  }
  .ProseMirror a {
    color: #0d79d0;
    cursor: pointer;
  }
`
const LeftSide = styled.div`
  margin-right: 1rem;
`
