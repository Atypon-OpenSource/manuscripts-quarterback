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
import { YJS_WS_URL } from 'config'
import useEditorOptions from 'hooks/useEditorOptions'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import styled from 'styled-components'
import { yDocToProsemirrorJSON } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'

import { EditorOptions } from '../components/EditorOptions'
import { ManuscriptsEditor } from '../components/manuscripts-editor/ManuscriptsEditor'

export function ManuscriptsPage() {
  const history = useHistory()
  const routeParams = useParams<{ documentId: string }>()
  const { options, setOptions } = useEditorOptions(
    'manuscript-track-options',
    routeParams.documentId
  )
  const { documentId } = options
  const [initialData, setInitialData] = useState<{
    yDoc: Doc
    pmDoc: Record<string, any>
    provider: WebsocketProvider
  }>()

  useEffect(() => {
    initialData && history.push(documentId)
    const yDoc = new Doc({ gc: false })
    const provider = new WebsocketProvider(YJS_WS_URL, documentId, yDoc)
    provider.on('synced', () => {
      const pmDoc = yDocToProsemirrorJSON(yDoc, 'pm-doc')
      pmDoc.type = 'manuscript'
      const data = {
        yDoc,
        pmDoc,
        provider,
      }
      setInitialData(data)
    })
  }, [documentId])

  return (
    <Container>
      <header>
        <h1>Track changes with Yjs</h1>
        <EditorOptions options={options} setOptions={setOptions} />
      </header>
      {initialData && <ManuscriptsEditor options={options} initialData={initialData} />}
    </Container>
  )
}

const Container = styled.div`
  & > header {
    margin-bottom: 1rem;
  }
`
