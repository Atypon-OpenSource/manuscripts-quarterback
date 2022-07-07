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
import { generateUser, yjsExtension, YjsUser } from '@manuscripts/ext-yjs'
import { YJS_WS_URL } from 'config'
import useTrackOptions from 'hooks/useTrackOptions'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { stores } from 'stores'
import styled from 'styled-components'
import { yDocToProsemirrorJSON } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'

import { TrackOptions } from '../components/TrackOptions'
import { EditorContext } from '../components/editor/EditorContext'
import { Editor } from '../components/editor/Editor'

export function FrontPage() {
  const {
    authStore: { user: loggedUser, setEditorUser },
    documentFlows,
    documentStore: { createDocument },
  } = stores
  const history = useHistory()
  const routeParams = useParams<{ documentId: string }>()
  const { options, setOptions } = useTrackOptions('editor-track-options', {
    documentId: routeParams.documentId,
  })
  const { documentId } = options
  const [initialData, setInitialData] = useState<{
    yDoc: Doc
    pmDoc: Record<string, any>
    provider: WebsocketProvider
  }>()

  useEffect(() => {
    async function fetchOrCreateDoc() {
      let resp = await documentFlows.getDoc(documentId)
      if (!resp.ok && resp.status === 404) {
        resp = await createDocument({ id: documentId })
      }
      if (resp.ok) {
        // The postgres data is discarded since the Yjs updates are only persisted to Redis for now
      }
    }

    initialData && history.push(documentId)
    const yDoc = new Doc({ gc: false })
    const provider = new WebsocketProvider(YJS_WS_URL, documentId, yDoc)
    provider.on('synced', () => {
      const pmDoc = yDocToProsemirrorJSON(yDoc, 'pm-doc')
      const data = {
        yDoc,
        pmDoc,
        provider,
      }
      setInitialData(data)
    })
    fetchOrCreateDoc()
  }, [documentId])

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
    <Container>
      <header>
        <h1>Track changes with Yjs</h1>
        <TrackOptions options={options} setOptions={setOptions} setUser={handleSetUser} />
      </header>
      {initialData && (
        <EditorContext>
          <Editor options={options} initialData={initialData} />
        </EditorContext>
      )}
    </Container>
  )
}

const Container = styled.div``
