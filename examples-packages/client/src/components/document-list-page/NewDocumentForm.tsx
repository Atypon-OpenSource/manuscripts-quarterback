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
import { Evt, PmDocWithSnapshots } from '@manuscripts/examples-track-types'
import React, { useState } from 'react'
import styled from 'styled-components'

export interface NewDocumentFormValues {
  name: string
}
interface Props {
  className?: string
  onSubmit(
    formValues: NewDocumentFormValues
  ): AsyncGenerator<Evt<PmDocWithSnapshots>, void, unknown>
}

export function NewDocumentForm(props: Props) {
  const { className = '', onSubmit } = props
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  const [name, setName] = useState('')

  async function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    const values = {
      name,
    }
    setLoading(true)
    for await (const evt of onSubmit(values)) {
      switch (evt.e) {
        case 'ok':
          setName('')
          setError('')
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

  return (
    <Form onSubmit={handleSubmit} className={className}>
      <Field>
        <label htmlFor="document-name">Name</label>
        <input
          required
          id="document-name"
          name="name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </Field>
      {error && (
        <Field>
          <ErrorMsg>{error}</ErrorMsg>
        </Field>
      )}
      <Field className="row">
        <button type="submit" disabled={loading}>
          Submit
        </button>
      </Field>
    </Form>
  )
}

const Field = styled.div`
  display: flex;
  flex-direction: column;
  &.row {
    flex-direction: row;
    & > * {
      margin-right: 1rem;
    }
  }
`
const Form = styled.form`
  display: flex;
  flex-direction: column;
  margin: 0;
  & > ${Field} + ${Field} {
    margin-top: 1rem;
  }
`
const ErrorMsg = styled.small`
  color: red;
`
