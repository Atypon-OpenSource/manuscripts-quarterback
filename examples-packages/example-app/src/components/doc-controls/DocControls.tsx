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
import { Evt, DocStatus } from '@manuscripts/examples-track-shared'
import { observer } from 'mobx-react'
import React, { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiChevronRight, FiEdit3, FiTrash } from 'react-icons/fi'
import { stores } from 'stores'
import styled from 'styled-components'

import { titleStyles } from 'elements/Title'

interface Props {
  className?: string
}

const DocControls = observer((props: Props) => {
  const { className = '' } = props
  const {
    authStore: { isAdmin, user },
    documentStore: { currentDocument, inspectedSnapshot, updateDocument },
  } = stores
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')
  if (!currentDocument) {
    return null
  }
  async function updateDocStatus(status: DocStatus) {
    setLoading(false)
    if (!currentDocument) {
      setError('No current doc')
      return
    }
    try {
      setLoading(true)
      const resp = await updateDocument(currentDocument.id, { status })
      if (resp.ok) {
        setError('')
      } else {
        setError(resp.error)
      }
    } catch (err: any) {
      setError(err.toString())
    } finally {
      setLoading(false)
    }
  }
  async function handleSubmitForReview() {
    updateDocStatus(DocStatus.WAITING_REVIEW)
  }
  async function handleCancelReviewRequest() {
    updateDocStatus(DocStatus.EDITABLE)
  }
  return (
    <Wrapper className={className}>
      <legend>Document</legend>
      <Title>{currentDocument.name}</Title>
      <p>Status: {currentDocument.status}</p>
      <small>Created: {new Date(currentDocument.createdAt).toLocaleString()}</small>
      <small>Updated: {new Date(currentDocument.updatedAt).toLocaleString()}</small>
      <Buttons>
        {currentDocument.status === DocStatus.EDITABLE && (
          <button onClick={handleSubmitForReview} disabled={loading}>
            Submit doc for review
          </button>
        )}
        {currentDocument.status === DocStatus.WAITING_REVIEW && (
          <button onClick={handleCancelReviewRequest} disabled={loading}>
            Cancel review request
          </button>
        )}
        {error && <ErrorMsg>{error}</ErrorMsg>}
      </Buttons>
    </Wrapper>
  )
})

const Wrapper = styled.fieldset`
  border-radius: 2px;
  /* box-shadow: 0 0 2px 2px rgb(0 0 0 / 18%); */
  display: flex;
  flex-direction: column;
  padding: 1rem 1rem 1rem 1rem;
`
const Title = styled.h1`
  margin: 0;
`
const Buttons = styled.div`
  margin-top: 1rem;
`
const ErrorMsg = styled.small`
  color: red;
`

export default styled(DocControls)``
