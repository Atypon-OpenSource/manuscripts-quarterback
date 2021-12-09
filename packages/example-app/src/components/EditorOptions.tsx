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

interface Options {
  disableTrack: boolean
  debug: boolean
  documentId: string
}

interface Props {
  options: Options
  setOptions: React.Dispatch<React.SetStateAction<Options>>
}

export function EditorOptions(props: Props) {
  const { options, setOptions } = props
  const [debounce, setDebounce] = useState<ReturnType<typeof setTimeout>>()
  const [documentId, setDocumentId] = useState(options.documentId)

  function handleDocumentIdChange(e: React.ChangeEvent<HTMLInputElement>) {
    if (debounce) {
      clearTimeout(debounce)
    }
    const id = e.target.value
    setDocumentId(id)
    setDebounce(() =>
      setTimeout(() => {
        setOptions((opt) => ({ ...opt, documentId: id }))
      }, 500)
    )
  }

  return (
    <fieldset>
      <legend>Options</legend>
      <Container>
        <Field>
          <label htmlFor="documentId">Document id</label>
          <input id="documentId" value={documentId} onChange={handleDocumentIdChange} />
        </Field>
        <Field className="row">
          <button
            onClick={() => setOptions((opt) => ({ ...opt, disableTrack: !opt.disableTrack }))}
          >
            {options.disableTrack ? 'Enable' : 'Disable'} track changes
          </button>
          <button onClick={() => setOptions((opt) => ({ ...opt, debug: !opt.debug }))}>
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
