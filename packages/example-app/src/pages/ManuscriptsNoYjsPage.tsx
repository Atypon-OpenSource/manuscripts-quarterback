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
import React, { useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router-dom'
import { stores } from 'stores'
import styled from 'styled-components'

import { TrackOptions } from '../components/TrackOptions'
import { Guide } from '../components/Guide'
import { ManuscriptsNoYjsEditor } from '../components/manuscripts-editor/ManuscriptsNoYjsEditor'
import { ManuscriptsEditorContext } from '../components/manuscripts-editor/ManuscriptsEditorContext'

export function ManuscriptsNoYjsPage() {
  const { documentFlows } = stores
  const history = useHistory()
  const routeParams = useParams<{ documentId: string }>()
  const { options, setOptions } = useTrackOptions('manuscript-no-yjs-track-options', {
    documentId: routeParams.documentId,
  })
  const { documentId } = options
  const [initialData, setInitialData] = useState<PmDoc>()

  useEffect(async () => {
    const resp = await documentFlows.getDoc(documentId)
    if (resp.ok) {
      setInitialData(resp.data)
    }
  }, [documentId])

  function handleSetUser(type: 'new' | 'logged', cb: (user: any) => void) {
    if (type === 'new') {
      // const user = generateUser()
      // setEditorUser(user)
      // cb(user)
    } else if (type === 'logged') {
      // const user = generateUser({
      //   id: loggedUser.id,
      //   name: loggedUser.firstname,
      //   clientID: loggedUser.firstname.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0),
      // })
      // cb(user)
    }
  }

  return (
    <Container>
      <header>
        <h1>Track changes without Yjs</h1>
        <Guide />
        <TrackOptions options={options} setOptions={setOptions} setUser={handleSetUser} />
      </header>
      {initialData && (
        <ManuscriptsEditorContext>
          <ManuscriptsNoYjsEditor options={options} initialData={initialData} />
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
