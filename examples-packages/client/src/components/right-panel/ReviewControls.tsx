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
import { EditorViewProvider } from '@manuscripts/examples-track-editor'
import { DocStatus, Evt, ReviewStatus } from '@manuscripts/examples-track-types'
import { EditorViewProvider as MViewProvider } from '@manuscripts/manuscript-editor'
import { observer } from 'mobx-react'
import React, { useMemo } from 'react'
import { stores } from 'stores'
import styled from 'styled-components'

import { titleStyles } from 'elements/Title'

interface Props {
  className?: string
  viewProvider: EditorViewProvider | MViewProvider
}

const ReviewControls = observer((props: Props) => {
  const { className = '', viewProvider } = props
  const {
    authStore: { isAdmin, user },
    documentFlows: { startReview, submitReview, cancelReview },
    documentStore: { currentDocument },
    reviewStore,
  } = stores
  const { currentReview } = reviewStore
  const text = useMemo(() => {
    switch (currentDocument?.status) {
      case DocStatus.EDITABLE:
        return 'No pending review'
      case DocStatus.WAITING_REVIEW:
        return 'Review requested'
      case DocStatus.IN_REVIEW:
        return 'Document in review'
      case DocStatus.READ_ONLY:
        return 'Document currently read only'
      default:
        return 'No current document chosen'
    }
  }, [currentDocument?.status])

  async function handleStartReview() {
    if (currentDocument) {
      const resp = await startReview({
        docId: currentDocument.id,
        name: 'New review',
        snapshot: viewProvider.docToJSON(),
      })
    }
  }
  async function handleFinishReview() {
    if (currentReview) {
      const resp = await submitReview(
        currentReview.doc_id,
        currentReview.id,
        viewProvider.docToJSON()
      )
    }
  }
  async function handleResetReview() {
    if (currentReview) {
      // @TODO reset changes
    }
  }
  async function handleDeleteReview() {
    if (currentReview) {
      const resp = await cancelReview(currentReview.doc_id, currentReview.id)
    }
  }
  return (
    <Wrapper className={className}>
      <Title>Review</Title>
      <p>{text}</p>
      <Buttons>
        {currentDocument?.status === DocStatus.WAITING_REVIEW && (
          <button onClick={handleStartReview}>Start review</button>
        )}
        {currentDocument?.status === DocStatus.IN_REVIEW && (
          <button onClick={handleFinishReview}>Submit review</button>
        )}
        {currentDocument?.status === DocStatus.IN_REVIEW && (
          <button onClick={handleResetReview}>Reset review</button>
        )}
        {currentDocument?.status === DocStatus.IN_REVIEW && (
          <button onClick={handleDeleteReview}>Delete review</button>
        )}
      </Buttons>
    </Wrapper>
  )
})

const Wrapper = styled.div``
const Title = styled.h3`
  ${titleStyles}
`
const Buttons = styled.div`
  display: flex;
  flex-direction: column;
`

export default styled(ReviewControls)``
