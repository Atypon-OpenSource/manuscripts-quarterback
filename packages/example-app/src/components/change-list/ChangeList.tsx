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
import { CHANGE_STATUS, ChangeSet, TrackedChange } from '@manuscripts/ext-track-changes'
import { observer } from 'mobx-react'
import React from 'react'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import { stores } from 'stores'
import styled from 'styled-components'

import { ChildrenChangeList } from './ChildrenChangeList'
import { Comments } from '../comments/Comments'

interface IProps {
  className?: string
  changes: TrackedChange[]
  isVisible: boolean
  title: string
  handleAcceptChange(c: TrackedChange): void
  handleRejectChange(c: TrackedChange): void
  handleResetChange(c: TrackedChange): void
  toggleVisibility: () => void
}

export const ChangeList = observer((props: IProps) => {
  const {
    className,
    changes,
    isVisible,
    title,
    handleAcceptChange,
    handleRejectChange,
    handleResetChange,
    toggleVisibility,
  } = props
  const {
    commentStore: { changeComments },
  } = stores

  function changeTitle(c: TrackedChange) {
    if (ChangeSet.isTextChange(c)) {
      return `Text ${c.attrs.operation}`
    } else if (ChangeSet.isNodeChange(c)) {
      return `${c.nodeType.charAt(0).toUpperCase()}${c.nodeType.slice(1)} ${c.attrs.operation}`
    }
    return 'Unknown change!'
  }
  return (
    <>
      <Header onClick={() => toggleVisibility()}>
        <span>{isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}</span>
        <h2>{title}</h2>
      </Header>
      <List className={`${className || ''} ${isVisible ? '' : 'hidden'}`}>
        {changes.map((c: TrackedChange, i: number) => (
          <ListItem key={`${c.id}-${i}`} data-test="change-item">
            <TopChange>
              <ChangeBody status={c.attrs.status}>
                <TitleWrapper>
                  <h4>{changeTitle(c)}</h4>
                  <Buttons>
                    {c.attrs.status !== CHANGE_STATUS.accepted && (
                      <button onClick={() => handleAcceptChange(c)} aria-label="accept-btn">
                        Accept
                      </button>
                    )}
                    {c.attrs.status !== CHANGE_STATUS.rejected && (
                      <button onClick={() => handleRejectChange(c)} aria-label="reject-btn">
                        Reject
                      </button>
                    )}
                    {c.attrs.status !== CHANGE_STATUS.pending && (
                      <button onClick={() => handleResetChange(c)} aria-label="reset-btn">
                        Reset
                      </button>
                    )}
                  </Buttons>
                </TitleWrapper>
                <Ranges>
                  <span className="msg">from: {c.from}</span>
                  <span className="msg">to: {c.to}</span>
                  {/* <span className="msg">{JSON.stringify(c.attrs)}</span> */}
                </Ranges>
              </ChangeBody>
              <Comments change={c} comments={changeComments.get(c.id) || []} />
            </TopChange>
            {ChangeSet.isNodeChange(c) && c.children.length > 0 && (
              <ChildrenChangeList
                parent={c}
                changes={c.children}
                handleAcceptChange={handleAcceptChange}
                handleRejectChange={handleRejectChange}
                handleResetChange={handleResetChange}
              />
            )}
          </ListItem>
        ))}
      </List>
    </>
  )
})

const Header = styled.button`
  align-items: center;
  background: transparent;
  border: 0;
  cursor: pointer;
  display: flex;
  margin: 1rem 0 0.5rem 0;
  padding: 0;
  > * {
    align-items: center;
    display: flex;
  }
  & > h2 {
    font-size: 1rem;
    font-weight: 400;
    margin: 0 0 0 0.5rem;
    text-transform: uppercase;
  }
`
const List = styled.ul<{ indent?: boolean }>`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
  & > li + li {
    margin-top: 1rem;
  }
  &.hidden {
    display: none;
    visibility: hidden;
  }
`
const ListItem = styled.li``
const markerBg = (status: CHANGE_STATUS) => {
  switch (status) {
    case CHANGE_STATUS.pending:
      return '#f8fb7d'
    case CHANGE_STATUS.accepted:
      return '#afffab'
    case CHANGE_STATUS.rejected:
      return '#ffabab'
  }
}
const TopChange = styled.div``
const ChangeBody = styled.div<{ status: CHANGE_STATUS }>`
  background: ${({ status }) => markerBg(status)};
  border-radius: 2px;
  padding: 0.25rem;
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
