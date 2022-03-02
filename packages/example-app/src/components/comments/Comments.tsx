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
import { TrackedChange } from '@manuscripts/ext-track-changes'
import { CommentWithUserColor } from '@manuscripts/quarterback-shared'
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { FiChevronDown, FiChevronRight, FiMessageCircle } from 'react-icons/fi'
import styled from 'styled-components'

import { NewCommentForm } from './NewCommentForm'
import { UserCircle } from 'elements/UserCircle'

interface IProps {
  className?: string
  change: TrackedChange
  comments: CommentWithUserColor[]
}

export const Comments = observer((props: IProps) => {
  const { className, change, comments } = props
  const [isVisible, setIsVisible] = useState(false)
  return (
    <>
      <Header onClick={() => setIsVisible((val) => !val)}>
        <span>{isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}</span>
        <h2>{comments.length} Comments</h2>
        <HeaderCommentButton>
          <FiMessageCircle size={16} />
        </HeaderCommentButton>
      </Header>
      <Container className={`${className || ''} ${isVisible ? '' : 'hidden'}`}>
        <List>
          {comments.map((c: CommentWithUserColor, i: number) => (
            <ListItem key={`${c.id}-${i}`}>
              <CommentAuthor>
                <UserCircle color={c.user.color} currentUser={false}>
                  {c.user.firstname.charAt(0)}
                </UserCircle>
              </CommentAuthor>
              <Body>
                <CommentTop>
                  <small>{c.user.firstname}</small>
                  <small>{new Date(c.createdAt).toLocaleString()}</small>
                </CommentTop>
                <Text>
                  <span>{c.body}</span>
                </Text>
              </Body>
            </ListItem>
          ))}
        </List>
        <NewCommentForm change={change} />
      </Container>
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
const HeaderCommentButton = styled.button`
  background: #9fcaff;
  border: 0;
  border-radius: 2rem;
  cursor: pointer;
  margin-left: 1rem;
  padding: 0.25rem 1rem;
`
const Container = styled.div`
  border: 1px solid black;
  &.hidden {
    display: none;
    visibility: hidden;
  }
`
const List = styled.ul<{ indent?: boolean }>`
  display: flex;
  flex-direction: column;
  list-style: none;
  margin: 0;
  padding: 0;
`
const ListItem = styled.li`
  display: flex;
  margin: 0.5rem 0;
`
const CommentAuthor = styled.div`
  margin: 0.5rem 0.75rem;
`
const CommentTop = styled.div`
  display: flex;
  justify-content: space-between;
`
const Body = styled.div``
const Text = styled.div`
  align-items: center;
  display: flex;
  margin: 0.5rem 0;
`
