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
import { Evt, ReviewLabel, ReviewStatus } from '@manuscripts/examples-track-shared'
import { observer } from 'mobx-react'
import React, { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiChevronRight, FiEdit3, FiTrash } from 'react-icons/fi'
import { stores } from 'stores'
import styled from 'styled-components'

import { titleStyles } from 'elements/Title'

interface Props {
  className?: string
}

const ReviewControls = observer((props: Props) => {
  const { className = '' } = props
  const {
    authStore: { isAdmin, user },
    documentStore: { currentDocument, inspectedSnapshot },
    reviewStore,
  } = stores
  const { createReview, finishReview, deleteReview, currentReview, reviewStatus } = reviewStore

  async function handleCreateReview() {
    console.log(currentDocument)
    console.log(inspectedSnapshot)
    if (currentDocument && inspectedSnapshot) {
      const resp = await createReview({
        docId: currentDocument.id,
        snapshotId: inspectedSnapshot.id,
      })
    }
  }
  async function handleFinishReview() {
    if (currentReview) {
      const resp = await finishReview(currentReview.id)
    }
  }
  return (
    <Wrapper className={className}>
      <Title>Review</Title>
      <p>
        Changes left: x
      </p>
      <button onClick={handleCreateReview}>Start review</button>
      {reviewStatus === ReviewStatus.IN_PROGRESS && <button>Cancel review</button>}
      {reviewStatus === ReviewStatus.IN_PROGRESS && <button onClick={handleFinishReview}>Finish review</button>}
      {reviewStatus === ReviewStatus.COMPLETED && <button>Delete review</button>}
    </Wrapper>
  )
})

const Wrapper = styled.div``
const Title = styled.h3`
  ${titleStyles}
`

export default styled(ReviewControls)``
