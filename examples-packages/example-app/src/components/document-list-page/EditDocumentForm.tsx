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
import { Evt, ListedDocument } from '@manuscripts/quarterback-shared'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import styled from 'styled-components'

export interface UpdateDocumentFormValues {
  name: string
}
interface IProps {
  className?: string
  doc: ListedDocument
  onSubmit(formValues: UpdateDocumentFormValues): AsyncGenerator<Evt<boolean>, void, unknown>
  onCancel(docId: string): void
}

export const EditDocumentForm = observer((props: IProps) => {
  const { className = '', doc, onSubmit, onCancel } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [editedName, setEditedName] = useState(doc.name)

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
          onCancel(doc.id)
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
    onCancel(doc.id)
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
    width: 25rem;
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
