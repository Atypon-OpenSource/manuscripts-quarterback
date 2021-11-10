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
import React, { useState } from 'react'
import styled from 'styled-components'

import { ManuscriptsEditor } from '../components/manuscripts-editor/ManuscriptsEditor'

const LOCALSTORAGE_KEY = 'disable-track'

export function ManuscriptsPage() {
  const [disableTrack, setDisableTrack] = useState(() => {
    if (typeof window === 'undefined') return false
    let persisted
    try {
      persisted = JSON.parse(localStorage.getItem(LOCALSTORAGE_KEY) || '')
    } catch (err) {
      console.error(err)
    }
    return persisted
  })

  function handleToggleDisableTrack() {
    const disabled = !disableTrack
    setDisableTrack(disabled)
    localStorage.setItem(LOCALSTORAGE_KEY, disabled ? 'true' : 'false')
  }

  return (
    <Container>
      <header>
        <h1>Track changes with Yjs</h1>
        <button onClick={handleToggleDisableTrack}>
          {disableTrack ? 'Enable' : 'Disable'} track changes
        </button>
      </header>
      <ManuscriptsEditor disableTrack={disableTrack} />
    </Container>
  )
}

const Container = styled.div`
  & > header {
    margin-bottom: 1rem;
  }
`
