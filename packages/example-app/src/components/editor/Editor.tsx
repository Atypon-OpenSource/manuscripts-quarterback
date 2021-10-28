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
  createDefaultProviders,
  EditorContext,
  PMEditor,
  ReactEditorContext,
} from '@manuscripts/quarterback-editor'
import { YJS_WS_URL } from 'config'
import React, { useMemo, useState } from 'react'
import styled from 'styled-components'

import { RightPanel } from './right-panel/RightPanel'
import { SelectUser } from './SelectUser'
import { Toolbar } from './Toolbar'
import { UsersList } from './UsersList'

export function Editor() {
  const editorProviders = useMemo(() => createDefaultProviders(), [])
  const [disableYjs, setDisableYjs] = useState(true)

  function handleEdit() {}
  function handleEditorReady(ctx: EditorContext) {}
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
                yjs={{
                  disabled: false,
                  ws_url: YJS_WS_URL,
                  document: {
                    id: '1234',
                  },
                  user: {
                    id: 'abc',
                    name: 'Hellow',
                  },
                }}
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
}

const ViewGrid = styled.div`
  display: grid;
  grid-template-columns: 2fr 1fr;
  grid-template-rows: auto auto;
  margin-top: 1rem;
`
const LeftSide = styled.div`
  margin-right: 1rem;
`
