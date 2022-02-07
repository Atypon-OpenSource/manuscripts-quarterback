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
import { YjsUser } from '@manuscripts/ext-yjs'
import React, { useState } from 'react'
import styled from 'styled-components'

export interface TrackOptions {
  disableTrack: boolean
  debug: boolean
  user: YjsUser
  documentId: string
}

interface Props {
  options: TrackOptions
  setUser: (type: 'new' | 'logged', cb: (user: YjsUser) => void) => void
  setOptions: React.Dispatch<React.SetStateAction<TrackOptions>>
}

export function TrackOptions(props: Props) {
  const { options, setOptions, setUser } = props
  const [debounce, setDebounce] = useState<ReturnType<typeof setTimeout>>()
  const [userId, setUserId] = useState(options.user.id)
  const [userName, setUserName] = useState(options.user.name)
  const [userClientID, setUserClientID] = useState(options.user.clientID)
  const [userColor, setUserColor] = useState(options.user.color)
  const [documentId, setDocumentId] = useState(options.documentId)

  function setWithDebounce(cb: () => void) {
    if (debounce) {
      clearTimeout(debounce)
    }
    setDebounce(() =>
      setTimeout(() => {
        cb()
      }, 500)
    )
  }
  function handleChange(field: keyof YjsUser | 'documentId', value: string) {
    switch (field) {
      case 'id':
        setUserId(value)
        break
      case 'name':
        setUserName(value)
        break
      case 'clientID':
        setUserClientID(parseInt(value))
        break
      case 'color':
        setUserColor(value)
        break
      case 'documentId':
        setDocumentId(value)
        break
    }
    setWithDebounce(() =>
      setOptions((opt) => {
        if (field === 'documentId') {
          return { ...opt, [field]: value }
        }
        return { ...opt, user: { ...opt.user, [field]: value } }
      })
    )
  }
  function handleNewUser() {
    setUser('new', (user) => {
      setUserId(user.id)
      setUserName(user.name)
      setUserClientID(user.clientID)
      setUserColor(user.color)
      setOptions((opt) => ({ ...opt, user }))
    })
  }
  function handleUseLoggedUser() {
    setUser('logged', (user) => {
      setUserId(user.id)
      setUserName(user.name)
      setUserClientID(user.clientID)
      setUserColor(user.color)
      setOptions((opt) => ({ ...opt, user }))
    })
  }
  return (
    <fieldset>
      <legend>Options</legend>
      <Container>
        <Field className="row">
          <Field>
            <label htmlFor="userName">User name</label>
            <input
              id="userName"
              value={userName}
              onChange={(e) => handleChange('name', e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="userId">User id</label>
            <input
              id="userId"
              value={userId}
              onChange={(e) => handleChange('id', e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="userClientID">User clientID</label>
            <input
              id="userClientID"
              value={userClientID}
              onChange={(e) => handleChange('clientID', e.target.value)}
            />
          </Field>
          <Field>
            <label htmlFor="userColor">User color</label>
            <input
              id="userColor"
              value={userColor}
              onChange={(e) => handleChange('color', e.target.value)}
            />
          </Field>
        </Field>
        <Field className="row">
          <Button onClick={handleNewUser}>Generate user</Button>
          <Button onClick={handleUseLoggedUser}>Use logged user</Button>
        </Field>
        <Field>
          <label htmlFor="documentId">Document id</label>
          <input
            id="documentId"
            value={documentId}
            onChange={(e) => handleChange('documentId', e.target.value)}
          />
        </Field>
        <Field className="row">
          <button
            onClick={() => setOptions((opt) => ({ ...opt, disableTrack: !opt.disableTrack }))}
            aria-label="toggle-track-changes"
          >
            {options.disableTrack ? 'Enable' : 'Disable'} track changes
          </button>
          <button
            onClick={() => setOptions((opt) => ({ ...opt, debug: !opt.debug }))}
            aria-label="toggle-track-debug"
          >
            {options.debug ? 'Disable' : 'Enable'} track changes debug
          </button>
        </Field>
      </Container>
    </fieldset>
  )
}

const Field = styled.div`
  display: inline-flex;
  flex-direction: column;
  &.row {
    flex-direction: row;
    & > * {
      margin-right: 1rem;
    }
  }
`
const Container = styled.div`
  display: inline-flex;
  flex-direction: column;
  & > ${Field} + ${Field} {
    margin-top: 1rem;
  }
`
const Button = styled.button`
  cursor: pointer;
  & + & {
    margin-left: 0.5rem;
  }
`
