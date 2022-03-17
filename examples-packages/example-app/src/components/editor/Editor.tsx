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
import { generateUser, yjsExtension, YjsUser } from '@manuscripts/ext-yjs'
import {
  baseExtension,
  EditorProps,
  useEditor,
  useEditorContext,
  usePluginState,
} from '@manuscripts/examples-track-editor'
import { YJS_WS_URL } from 'config'
import { observer } from 'mobx-react'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import React, { useMemo, useRef, useState } from 'react'
import { stores } from 'stores'
import styled from 'styled-components'
import { ySyncPluginKey } from 'y-prosemirror'

import useTrackOptions from '../../hooks/useTrackOptions'
import { trackChangesExtension } from '../../trackExtension'
import { TrackOptions } from '../TrackOptions'
import { RightPanel } from '../right-panel/RightPanel'
import { Toolbar } from './Toolbar'
import { UsersList } from './UsersList'
import { useYjsExtension } from './useYjsExtension'

export const Editor = observer(() => {
  const {
    authStore: { user: loggedUser, setEditorUser },
  } = stores
  const editorDOMRef = useRef(null)
  const { options, setOptions } = useTrackOptions('editor-track-options', {
    documentId: 'abc123',
  })
  const { viewProvider } = useEditorContext()
  const { yjsState, yjsStore } = useYjsExtension(100)
  const trackChangesState = usePluginState<TrackChangesState>(trackChangesPluginKey, 100)
  const extensions = useMemo(
    () => [
      baseExtension(),
      ...(options.disableTrack
        ? []
        : [
            trackChangesExtension({
              user: {
                id: options.user.id,
                name: options.user.name,
              },
              skipTrsWithMetas: [ySyncPluginKey],
              debug: options.debug,
            }),
          ]),
      yjsExtension({
        document: {
          id: options.documentId,
        },
        user: options.user,
        ws_url: YJS_WS_URL,
      }),
    ],
    [options]
  )
  const editorProps = useMemo<EditorProps>(
    () => ({
      extensions,
      onEditorReady: (ctx) => {
        applyDevTools(ctx.viewProvider.view)
        window.commands = ctx.extensionProvider.commands
      },
    }),
    [extensions]
  )
  useEditor(editorProps, editorDOMRef)

  function handleSetUser(type: 'new' | 'logged', cb: (user: YjsUser) => void) {
    if (type === 'new') {
      const user = generateUser()
      setEditorUser(user)
      cb(user)
    } else if (type === 'logged' && loggedUser) {
      const user = generateUser({
        id: loggedUser.id,
        name: loggedUser.firstname,
        clientID: loggedUser.firstname.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0),
      })
      cb(user)
    }
  }
  return (
    <>
      <UsersList yjsState={yjsState} />
      <TrackOptions options={options} setOptions={setOptions} setUser={handleSetUser} />
      <div>
        <ViewGrid>
          <LeftSide>
            <Toolbar />
            <div className="pm-editor" ref={editorDOMRef} />
          </LeftSide>
          {viewProvider && (
            <RightPanel
              yjsState={yjsState}
              yjsStore={yjsStore}
              viewProvider={viewProvider}
              trackChangesState={trackChangesState}
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

  .pm-editor {
    border: 1px solid black;
  }
`
const LeftSide = styled.div`
  margin-right: 1rem;
`
