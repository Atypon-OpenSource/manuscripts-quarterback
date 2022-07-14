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
import { CommentMarker } from '@manuscripts/ext-comments'
import { inject, observer } from 'mobx-react'
import React, { useState, useCallback } from 'react'
import { FiChevronDown, FiChevronRight, FiCornerUpLeft, FiEdit3, FiTrash } from 'react-icons/fi'
import styled from 'styled-components'

import { stores, Stores } from 'stores'

import { UserCircle } from 'elements/UserCircle'
import CommentActions from '../comments-list/CommentActions'
import { CommentsList } from '../comments-list/CommentsList'
import NewCommentForm from '../comments-list/NewCommentForm'

interface IProps {
  className?: string
  markers?: CommentMarker[]
  userId?: string
  isAdmin?: string
  openCommentLists?: Set<string>
  onFocusToMarker: (c: CommentMarker) => void
  onDelete: (id: string) => void
}

export const CommentMarkersList = inject((stores: Stores) => ({
  userId: stores.authStore.user?.id,
  isAdmin: stores.authStore.isAdmin,
  openCommentLists: stores.commentStore.openCommentLists,
}))(
  observer((props: IProps) => {
    const {
      className,
      userId,
      isAdmin,
      markers = [],
      openCommentLists,
      onFocusToMarker,
      onDelete,
    } = props
    const { commentStore } = stores
    const [isVisible, setIsVisible] = useState(true)
    const isEditable = useCallback(
      (c: CommentMarker) => isAdmin || c.userID === userId,
      [userId, isAdmin]
    )
    const isNewCommentFormVisible = useCallback(
      (markerId: string) => openCommentLists?.has(markerId),
      [openCommentLists]
    )
    function handleDelete(c: CommentMarker) {
      onDelete(c.id)
    }
    function handleTextClick(c: CommentMarker) {
      onFocusToMarker(c)
    }
    function handleReplyButtonClick(c: CommentMarker) {
      commentStore.toggleCommentListOpen(c.id)
    }
    function handleAddCommentCancel(id: string) {
      console.log('canceled ', commentStore.changeComments.get(id))
      if (!commentStore.changeComments.get(id)?.length) {
        onDelete(id)
      }
    }
    return (
      <>
        <Header>
          <button onClick={() => setIsVisible(!isVisible)} className="header-btn">
            <span>{isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}</span>
            <Title>Comments</Title>
          </button>
        </Header>
        <List className={`${className} ${isVisible ? '' : 'hidden'}`}>
          {markers.map((marker: CommentMarker, i: number) => (
            <ListItem key={`${marker.id}`}>
              <TopComment>
                <CommentAuthor>
                  <UserCircle color={'c.user.color'} currentUser={false}>
                    {'marker.userID'.charAt(0).toUpperCase()}
                  </UserCircle>
                </CommentAuthor>
                <Body>
                  <CommentTop>
                    <CommentName>
                      <Name>{marker.userID}</Name>
                      {isEditable(marker) && (
                        <IconButtons>
                          <Button onClick={() => handleDelete(marker)}>
                            <FiTrash size={16} />
                          </Button>
                        </IconButtons>
                      )}
                    </CommentName>
                    <Time>{new Date(marker.createdAt).toLocaleString()}</Time>
                  </CommentTop>
                  <Text onClick={() => handleTextClick(marker)} tabIndex={0}>
                    {marker.text}
                  </Text>
                <CommentActions onReplyClick={() => undefined}/>
                </Body>
              </TopComment>
              <CommentsList targetId={marker.id} />
              {isNewCommentFormVisible(marker.id) && (
                <NewCommentForm targetId={marker.id} onCancel={handleAddCommentCancel} />
              )}
            </ListItem>
          ))}
        </List>
      </>
    )
  })
)

const Header = styled.div`
  align-items: center;
  display: flex;
  margin: 1rem 0 0.5rem 0;
  & > .header-btn {
    align-items: center;
    background: transparent;
    border: 0;
    cursor: pointer;
    display: flex;
    margin: 0;
    padding: 0;
  }
  & > .inspect-btn {
    margin-left: 1rem;
  }
  .hidden {
    display: none;
    visibility: hidden;
  }
`
const Title = styled.h3`
  font-size: 1rem;
  font-weight: 400;
  margin: 0 0 0 0.5rem;
  text-transform: uppercase;
`
const List = styled.ul`
  display: flex;
  flex-direction: column;
  list-style: none;
  max-height: 300px;
  overflow-y: scroll;
  padding: 0;
  &.hidden {
    display: none;
    visibility: hidden;
  }
  & > li + li {
    margin-top: 1rem;
  }
`
const ListItem = styled.li`
  margin: 0;
  padding: 0;
  & > ${NewCommentForm} {
    margin-top: 1rem;
  }
`
const TopComment = styled.div`
  /* border-width: 1px 1px 1px 4px;
  border-style: solid;
  border-color: rgb(226, 226, 226);
  border-radius: 2px; */
  border: 1px solid rgb(181, 181, 181);
  border-radius: 5px;
`
const CommentAuthor = styled.div`
  margin: 0.5rem 0.75rem;
`
const CommentTop = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
const CommentName = styled.div`
  display: flex;
  justify-content: space-between;
`
const Name = styled.small`
  font-weight: 600;
`
const Time = styled.small`
  color: rgb(110, 110, 110);
`
const IconButtons = styled.div`
  & > button + button {
    margin-left: 0.25rem;
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
const Body = styled.div`
  flex-grow: 1;
  margin: 0 0.5rem;
  padding: 0;
  & > ${CommentActions} {
    margin: 0.5rem 0 0.75rem 0;
  }
`
const Text = styled.div`
  align-items: center;
  background-color: rgb(255, 224, 139);
  border-radius: 2px;
  cursor: pointer;
  display: flex;
  margin: 0.25rem 0 0.5rem 0;
  padding: 0.25rem;
  white-space: pre-line;
`
const ReplyBox = styled.div`
  display: flex;
  justify-content: space-between;
  margin: 0.5rem;
`
