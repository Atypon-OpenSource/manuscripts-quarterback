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
import { trackChangesExtension } from '@manuscripts/ext-track-changes'
import { yjsExtension } from '@manuscripts/ext-yjs'
import {
  baseExtension,
  createDefaultProviders,
  EditorContext,
  PMEditor,
  ReactEditorContext,
} from '@manuscripts/quarterback-editor'
import { YJS_WS_URL } from 'config'
import { observer } from 'mobx-react'
import { applyDevTools } from 'prosemirror-dev-toolkit'
import React, { useMemo, useState } from 'react'
import { stores } from 'stores'
import styled from 'styled-components'

import { RightPanel } from './right-panel/RightPanel'
import { SelectUser } from './SelectUser'
import { Toolbar } from './Toolbar'
import { UsersList } from './UsersList'

export const Editor = observer(() => {
  const editorProviders = useMemo(() => createDefaultProviders(), [])
  const {
    authStore: { editorUser },
  } = stores
  const [disableYjs, setDisableYjs] = useState(true)
  const extensions = useMemo(
    () => [
      baseExtension(),
      trackChangesExtension({
        user: {
          id: editorUser.id,
          name: editorUser.name,
        },
      }),
      yjsExtension({
        disabled: false,
        document: {
          id: 'frontpage-doc',
        },
        user: {
          id: editorUser.id,
          name: editorUser.name,
        },
        ws_url: YJS_WS_URL,
      }),
    ],
    []
  )

  // eslint-disable-next-line
  function handleEdit() {}
  // eslint-disable-next-line
  function handleEditorReady(ctx: EditorContext) {
    applyDevTools(ctx.viewProvider.view)
  }
  return (
    <ReactEditorContext.Provider value={editorProviders}>
      <UsersList />
      <SelectUser />
      <div>
        <ViewGrid>
          <LeftSide>
            <Toolbar className="toolbar full-width" />
            <div className="pm-editor full-width">
              <PMEditor
                extensions={extensions}
                onEdit={handleEdit}
                onEditorReady={handleEditorReady}
              />
            </div>
          </LeftSide>
          <RightPanel disableYjs={disableYjs} />
        </ViewGrid>
      </div>
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
