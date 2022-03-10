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
import { PmDoc } from '@manuscripts/quarterback-shared'
import useTrackOptions from 'hooks/useTrackOptions'
import debounce from 'lodash.debounce'
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { stores } from 'stores'
import styled from 'styled-components'

import { TrackOptions } from '../components/TrackOptions'
import { Guide } from '../components/Guide'
import { ManuscriptsNoYjsEditor } from '../components/manuscripts-editor/ManuscriptsNoYjsEditor'
import { ManuscriptsEditorContext } from '../components/manuscripts-editor/ManuscriptsEditorContext'
import { EditorState } from 'prosemirror-state'

export function ManuscriptsNoYjsPage() {
  const {
    authStore: { user, setUserColor },
    documentFlows,
    documentStore: { updateCurrentDocument },
  } = stores
  const history = useHistory()
  const routeParams = useParams<{ documentId: string }>()
  const { options, setOptions } = useTrackOptions('manuscript-no-yjs-track-options', {
    documentId: routeParams.documentId,
    ...(user && {
      user: {
        id: user.id,
        color: user.color,
        name: user.firstname,
        clientID: 1,
      },
    }),
  })
  const { documentId } = options
  const [initialData, setInitialData] = useState<PmDoc>()

  useEffect(async () => {
    const resp = await documentFlows.getDoc(documentId)
    if (resp.ok) {
      setInitialData(resp.data)
    }
  }, [documentId])
  useEffect(() => {
    if (user?.color !== options.user.color) {
      setUserColor(options.user.color)
    }
  }, [options])

  const handleEdit = debounce(
    (state: EditorState) => updateCurrentDocument(state.doc.toJSON()),
    500
  )

  return (
    <Container>
      <header>
        <h1>Track changes without Yjs</h1>
        <Guide />
        <TrackOptions options={options} setOptions={setOptions} />
      </header>
      {initialData && (
        <ManuscriptsEditorContext>
          <ManuscriptsNoYjsEditor options={options} initialData={initialData} onEdit={handleEdit} />
        </ManuscriptsEditorContext>
      )}
    </Container>
  )
}

const Container = styled.div`
  & > header {
    margin-bottom: 1rem;
  }
`
