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
import { Input } from 'elements/Input'
import React, { useState } from 'react'
import styled from 'styled-components'

interface Props {
  className?: string
  onSubmit: (formValues: any) => void
}

export function DocumentForm(props: Props) {
  const { className = '', onSubmit } = props

  function handleSubmit(evt: React.FormEvent) {
    evt.preventDefault()
    const values = {
      name,
    }
    onSubmit(values)
  }
  const [name, setName] = useState('')

  return (
    <Form
      onSubmit={handleSubmit}
      className={`${className} flex items-center flex-col justify-center`}
    >
      <Field>
        <label htmlFor="document-name">Name</label>
        <Input
          required
          id="document-name"
          name="name"
          value={name}
          onChange={(val) => setName(val)}
        />
      </Field>
      <Field>
        <button
          className="w-full px-4 py-2 mt-5 leading-tight text-white bg-red-500 rounded"
          type="submit"
        >
          Submit
        </button>
      </Field>
    </Form>
  )
}

const Form = styled.form`
  display: flex;
  width: 320px;
`
const Field = styled.div`
  margin-top: 1rem;
`
