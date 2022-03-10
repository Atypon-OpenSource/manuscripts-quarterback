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
import { Evt, SnapshotLabel } from '@manuscripts/quarterback-shared'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import styled from 'styled-components'

export interface UpdateSnapshotFormValues {
  name: string
}
interface IProps {
  className?: string
  snapshot: SnapshotLabel
  onSubmit(formValues: UpdateSnapshotFormValues): AsyncGenerator<Evt<boolean>, void, unknown>
  onCancel(snapshotId: string): void
}

export const EditSnapshotForm = observer((props: IProps) => {
  const { className = '', snapshot, onSubmit, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editedName, setEditedName] = useState(snapshot.name)

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    const values = {
      name: editedName,
    }
    setLoading(true)
    for await (const evt of onSubmit(values)) {
      switch (evt.e) {
        case 'ok':
          setError('')
          onCancel(snapshot.id)
          break
        case 'error':
          setError(evt.error)
          break
        case 'finally':
          setLoading(false)
          break
      }
    }
  }
  function handleEditCancel() {
    onCancel(snapshot.id)
  }
  return (
    <EditForm className={className} onSubmit={handleSubmit}>
      <input value={editedName} required onChange={(e) => setEditedName(e.target.value)} />
      {error && <ErrorMsg>{error}</ErrorMsg>}
      <button type="submit" disabled={loading}>
        Save
      </button>
      <button type="button" disabled={loading} onClick={handleEditCancel}>
        Cancel
      </button>
    </EditForm>
  )
})

const EditForm = styled.form`
  margin: 0;
  input {
    margin: 0 0.5rem 0 0;
    width: 10rem;
  }
  button {
    cursor: pointer;
  }
  button + button {
    margin-left: 0.5rem;
  }
`
const ErrorMsg = styled.small`
  color: red;
`
