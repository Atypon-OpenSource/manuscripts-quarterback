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
import { observer } from 'mobx-react'
import React, { useState } from 'react'
import { FiChevronDown, FiChevronRight, FiMessageCircle } from 'react-icons/fi'
import { stores } from 'stores'
import styled from 'styled-components'

import { UserCircle } from 'elements/UserCircle'

interface IProps {
  className?: string
  change: TrackedChange
}

export const NewCommentForm = observer((props: IProps) => {
  const { className, change } = props
  const {
    authStore: { user },
    commentStore,
    documentStore,
  } = stores
  const [body, setBody] = useState('')
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    setLoading(true)
    const docId = documentStore.currentDocument?.id
    if (!docId) {
      setError('No current document')
      return
    } else if (!user) {
      setError('Not logged in')
      return
    }
    commentStore
      .createComment(
        {
          body,
          change_id: change.id,
          doc_id: docId,
          snapshot_id: null,
        },
        user
      )
      .then((resp) => {
        if (resp.ok) {
          setBody('')
          setError('')
        } else {
          setError(resp.error)
        }
      })
      .finally(() => {
        setLoading(false)
      })
  }
  function handleCancel() {
    setBody('')
  }
  return (
    <ReplyBox className={className || ''}>
      <CommentAuthor>
        <UserCircle color={user?.color || 'red'} currentUser={false}>
          {user?.firstname.charAt(0)}
        </UserCircle>
      </CommentAuthor>
      <ReplyBody onSubmit={handleSubmit}>
        <Input
          placeholder="Reply..."
          value={body}
          required
          onChange={(e) => setBody(e.target.value)}
        />
        <ErrorMsg>{error}</ErrorMsg>
        <ReplyButtons>
          <SendButton type="submit" disabled={loading}>
            Send
          </SendButton>
          <SendButton type="button" disabled={loading} onClick={handleCancel}>
            Cancel
          </SendButton>
        </ReplyButtons>
      </ReplyBody>
    </ReplyBox>
  )
})

const CommentAuthor = styled.div`
  margin: 0.5rem 0.75rem;
`
const ReplyBox = styled.div`
  background: #e7e7e7;
  display: flex;
  padding: 0.25rem 0;
`
const ReplyBody = styled.form`
  align-items: end;
  display: flex;
  flex-direction: column;
  margin: 0 0.25rem 0 0;
  width: 100%;
`
const Input = styled.textarea`
  background: transparent;
  border: 0;
  height: 4rem;
  outline: none;
  padding: 8px 1rem 8px 0;
  width: 100%;
`
const ErrorMsg = styled.small`
  color: red;
`
const ReplyButtons = styled.div`
  & > button + button {
    margin-left: 0.5rem;
  }
`
const SendButton = styled.button`
  cursor: pointer;
`
