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
import { inject, observer } from 'mobx-react'
import React, { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiChevronRight, FiEye, FiEyeOff, FiEdit3, FiTrash } from 'react-icons/fi'
import { stores } from 'stores'
import styled from 'styled-components'

import { Stores } from 'stores'
import { HistoryReview } from 'stores/HistoryStore'

import ReviewSnapshots from './ReviewSnapshots'

interface IProps {
  className?: string
  review: HistoryReview
  isVisible: boolean
}

const ReviewItem = inject((stores: Stores, { review: { id } }: IProps) => ({
  isVisible: stores.historyStore.openHistoryItems.has(id),
}))(
  observer((props: IProps) => {
    const { className, review, isVisible } = props
    const {
      documentStore,
      historyStore: { openHistoryItems, toggleItemOpen },
    } = stores

    async function handleShowReview(item: HistoryReview) {}
    function handleEditReview(item: HistoryReview) {}
    function handleDeleteReview(item: HistoryReview) {}
    return (
      <Container>
        <ItemTypeBtn onClick={() => toggleItemOpen(review.id)}>
          <ItemType>Review</ItemType>
          <Chevron>
            {isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </Chevron>
          {!isVisible && (
            <Time dateTime={review.createdAt.toLocaleString()}>
              {review.createdAt.toLocaleString()}
            </Time>
          )}
        </ItemTypeBtn>
        <div className={isVisible ? '' : 'hidden'}>
          <TitleWrapper>
            <h4>{review.name || 'Untitled review'}</h4>
            <IconButtons>
              <Button onClick={() => handleShowReview(review)}>
                <FiEye size={16} />
              </Button>
              <Button onClick={() => handleEditReview(review)}>
                <FiEdit3 size={16} />
              </Button>
              <Button onClick={() => handleDeleteReview(review)}>
                <FiTrash size={16} />
              </Button>
            </IconButtons>
          </TitleWrapper>
          <Time dateTime={review.createdAt.toLocaleString()} smallFont>
            {review.createdAt.toLocaleString()}
          </Time>
          {review.before_snapshot && (
            <ReviewSnapshots review={review} snapshot={review.before_snapshot} />
          )}
          {review.after_snapshot && (
            <ReviewSnapshots review={review} snapshot={review.after_snapshot} />
          )}
        </div>
      </Container>
    )
  })
)

const Container = styled.div`
  border-radius: 2px;
  padding: 0.25rem;
`
const ItemTypeBtn = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  margin: 0;
  padding: 0;
  display: flex;
  padding: 0;
`
const ItemType = styled.small`
  font-weight: 600;
`
const Chevron = styled.span`
  margin: 0 0.5rem;
`
const Time = styled.time<{ smallFont?: boolean }>`
  font-family: 'Times';
  font-size: ${({ smallFont }) => (smallFont ? 'smaller' : '0.9rem')};
`
const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  & > h4 {
    margin: 0;
    margin-right: 1rem;
  }
`
const IconButtons = styled.div`
  display: flex;
  margin: 0.25rem 0;
  button + button {
    margin-left: 0.5rem;
  }
`
const Button = styled.button`
  background: transparent;
  border: 0;
  cursor: pointer;
  margin: 0;
  padding: 0;
  &:hover {
    opacity: 0.7;
  }
`
export default styled(ReviewItem)``
