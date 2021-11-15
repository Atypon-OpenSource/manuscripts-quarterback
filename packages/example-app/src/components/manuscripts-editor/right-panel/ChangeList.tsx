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
import { ChangeSet, TrackedChange } from '@manuscripts/pm-track-changes'
import React from 'react'
import { FiChevronDown, FiChevronRight } from 'react-icons/fi'
import styled from 'styled-components'

interface IProps {
  className?: string
  changes: TrackedChange[]
  isVisible: boolean
  title: string
  renderChangeContent: (c: TrackedChange) => React.ReactNode
  toggleVisibility: () => void
}

export function ChangeList(props: IProps) {
  const {
    className,
    changes,
    isVisible,
    title,
    renderChangeContent,
    toggleVisibility,
  } = props

  function changeTitle(c: TrackedChange) {
    if (ChangeSet.isTextChange(c)) {
      return `Text ${c.attrs.operation}`
    } else if (ChangeSet.isNodeChange(c)) {
      return `${c.nodeType.charAt(0).toUpperCase()}${c.nodeType.slice(1)} ${
        c.attrs.operation
      }`
    }
    return 'Unknown change!'
  }
  return (
    <>
      <Header onClick={() => toggleVisibility()}>
        <span>
          {isVisible ? (
            <FiChevronDown size={16} />
          ) : (
            <FiChevronRight size={16} />
          )}
        </span>
        <h2>{title}</h2>
      </Header>
      <List className={`${className || ''} ${isVisible ? '' : 'hidden'}`}>
        {changes.map((c: TrackedChange, i: number) => (
          <ListItem key={`${c.id}-${i}`} data-test="change-item">
            <TitleWrapper>
              <h4>{changeTitle(c)}</h4>
              {renderChangeContent(c)}
            </TitleWrapper>
            <Ranges>
              <span className="msg">from: {c.from}</span>
              {c.type === 'text-change' && (
                <span className="msg">to: {c.to}</span>
              )}
              {/* <span className="msg">{JSON.stringify(c.attrs)}</span> */}
            </Ranges>
          </ListItem>
        ))}
      </List>
    </>
  )
}

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
const List = styled.ul`
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
const TitleWrapper = styled.div`
  align-items: center;
  display: flex;
  justify-content: space-between;
  & > h4 {
    margin: 0;
    margin-right: 1rem;
  }
`
const Ranges = styled.div`
  align-items: center;
  display: flex;
  & > .msg {
    margin-right: 1rem;
  }
`
