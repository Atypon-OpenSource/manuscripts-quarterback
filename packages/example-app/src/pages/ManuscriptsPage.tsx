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
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import { stores } from 'stores'
import styled from 'styled-components'
import { yDocToProsemirrorJSON } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import { Doc } from 'yjs'

import { ManuscriptsEditor } from '../components/manuscripts-editor/ManuscriptsEditor'

const LOCALSTORAGE_KEY = 'manuscript-track-options'

export function ManuscriptsPage() {
  const [mounted, setMounted] = useState(false)
  const [disableTrack, setDisableTrack] = useState(false)
  const [disableDebug, setDisableDebug] = useState(false)
  const routeParams = useParams<{ documentId: string }>()
  const [initialData, setInitialData] = useState<{
    yDoc: Doc
    pmDoc: Record<string, any>
    provider: WebsocketProvider
  }>()

  useEffect(() => {
    const yDoc = new Doc({ gc: false })
    const provider = new WebsocketProvider(YJS_WS_URL, routeParams.documentId, yDoc)
    provider.on('synced', () => {
      const pmDoc = yDocToProsemirrorJSON(yDoc, 'pm-doc')
      pmDoc.type = 'manuscript'
      setInitialData({
        yDoc,
        pmDoc,
        provider,
      })
    })
    return () => {
      if (initialData) {
        initialData.yDoc.destroy()
        initialData.provider.destroy()
      }
    }
  }, [])

  useEffect(() => {
    if (typeof window !== 'undefined' && !mounted) {
      let persisted
      try {
        persisted = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '')
      } catch (err) {
        console.error(err)
      }
      if (persisted) {
        setDisableTrack(persisted.disableTrack)
        setDisableDebug(persisted.disableDebug)
      }
      setMounted(true)
    }
    if (typeof window !== 'undefined') {
      localStorage.setItem(LOCALSTORAGE_KEY, JSON.stringify({ disableTrack, disableDebug }))
    }
  }, [disableTrack, disableDebug])

  return (
    <Container>
      <header>
        <h1>Track changes with Yjs</h1>
        <button onClick={() => setDisableTrack((val) => !val)}>
          {disableTrack ? 'Enable' : 'Disable'} track changes
        </button>
        <button onClick={() => setDisableDebug((val) => !val)}>
          {disableDebug ? 'Enable' : 'Disable'} track changes debug
        </button>
      </header>
      {initialData && (
        <ManuscriptsEditor
          disableTrack={disableTrack}
          disableDebug={disableDebug}
          documentId={routeParams.documentId}
          initialData={initialData}
        />
      )}
    </Container>
  )
}

const Container = styled.div`
  & > header {
    margin-bottom: 1rem;
  }
  button {
    margin-right: 1rem;
  }
`
