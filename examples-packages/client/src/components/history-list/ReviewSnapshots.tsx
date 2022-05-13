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
import { SnapshotLabel } from '@manuscripts/examples-track-shared'
import React from 'react'
import { BsQuestion } from 'react-icons/bs'
import { FiCheck, FiX } from 'react-icons/fi'
import styled from 'styled-components'

import { HistoryReview } from 'stores/HistoryStore'

interface Props {
  review: HistoryReview
  snapshot: SnapshotLabel
}

function ReviewSnapshots(props: Props) {
  const { review, snapshot } = props
  return (
    <List indent>
      <ListItem>
        <MarkerBox>
          <span>ins:{Math.ceil(Math.random() * 20)}</span>
          <span>del:{Math.ceil(Math.random() * 20)}</span>
        </MarkerBox>
        <Body>
          <ItemType>{'snapshot'}</ItemType>
          <TitleWrapper>
            <h4>{snapshot.name}</h4>
          </TitleWrapper>
          <small>{new Date(snapshot.createdAt).toLocaleString()}</small>
        </Body>
      </ListItem>
    </List>
  )
}

const List = styled.ul<{ indent?: boolean }>`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0.5rem 0 0 0;
  padding: 0;
  & > li + li {
    margin-top: 1rem;
  }
  &.hidden {
    display: none;
    visibility: hidden;
  }
`
const ListItem = styled.li`
  display: flex;
`
const MarkerBox = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  margin: 0 0.5rem 0 0;
  width: 5rem;
  & > * {
    padding: 0 0.5rem;
  }
`
const Body = styled.div`
  width: 100%;
`
const ItemType = styled.small`
  font-weight: 600;
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
const Buttons = styled.div`
  display: flex;
  margin: 0.25rem 0;
  button + button {
    margin-left: 0.5rem;
  }
`
const Ranges = styled.div`
  align-items: center;
  display: flex;
  & > .msg {
    margin-right: 1rem;
  }
`
export default styled(ReviewSnapshots)``
