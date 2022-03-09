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
import { Evt, ListedDocument } from '@manuscripts/examples-track-shared'
import { observer } from 'mobx-react'
import React, { useCallback, useMemo, useState } from 'react'
import { FiChevronDown, FiChevronRight, FiEdit3, FiTrash } from 'react-icons/fi'
import { Link } from 'react-router-dom'
import { stores } from 'stores'
import styled from 'styled-components'

import { EditDocumentForm, UpdateDocumentFormValues } from './EditDocumentForm'

interface IProps {
  className?: string
}

export const DocumentList = observer((props: IProps) => {
  const { className } = props
  const {
    authStore: { isAdmin, user },
    documentStore,
  } = stores
  const userId = user?.id
  const { documentList, updateDocument, deleteDocument } = documentStore
  const [isVisible, setIsVisible] = useState(true)
  const [editedDocId, setEditedDocId] = useState<string | undefined>()
  const documentsWithTitles = useMemo(() => {
    const users = new Set()
    return [...documentList]
      .sort((a, b) => {
        if (a.user.id === b.user.id) return a.createdAt > b.createdAt ? -1 : 1
        else if (a.user.id > b.user.id) return 1
        else return -1
      })
      .map((d) => {
        let userTitle
        if (!users.has(d.user.id)) {
          userTitle = d.user.firstname
          users.add(d.user.id)
        }
        return { ...d, userTitle }
      })
  }, [documentList])
  const isEditable = useCallback(
    (c: ListedDocument) => isAdmin || c.user.id === userId,
    [userId, isAdmin]
  )

  function handleEdit(doc: ListedDocument) {
    if (editedDocId === doc.id) {
      setEditedDocId(undefined)
    } else {
      setEditedDocId(doc.id)
    }
  }
  function handleDelete(doc: ListedDocument) {
    deleteDocument(doc.id)
  }
  async function* handleEditSubmit(
    values: UpdateDocumentFormValues
  ): AsyncGenerator<Evt<boolean>, void, unknown> {
    if (!editedDocId) {
      yield { e: 'error', error: 'No edited doc' }
      return
    }
    try {
      const resp = await updateDocument(editedDocId, values)
      if (resp.ok) {
        yield { e: 'ok', data: resp.data }
      } else {
        yield { e: 'error', error: resp.error }
      }
    } catch (err: any) {
      yield { e: 'error', error: err.toString() }
    } finally {
      yield { e: 'finally' }
    }
  }
  return (
    <>
      <Header>
        <button onClick={() => setIsVisible(!isVisible)} className="header-btn">
          <span>{isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}</span>
          <Title>Documents</Title>
        </button>
      </Header>
      <List className={`${className} ${isVisible ? '' : 'hidden'}`}>
        {documentsWithTitles.map((doc: ListedDocument & { userTitle?: string }, i: number) => (
          <SnapListItem key={`${doc.id}`}>
            {doc.userTitle && <h3>{doc.userTitle}</h3>}
            <TitleWrapper>
              {editedDocId === doc.id ? (
                <EditDocumentForm
                  doc={doc}
                  onSubmit={handleEditSubmit}
                  onCancel={() => setEditedDocId(undefined)}
                />
              ) : (
                <h4>
                  <Link to={`/manuscripts-no-yjs/${doc.id}`}>{doc.name}</Link>
                </h4>
              )}
              {isEditable(doc) && (
                <IconButtons>
                  <Button onClick={() => handleEdit(doc)}>
                    <FiEdit3 size={16} />
                  </Button>
                  <Button onClick={() => handleDelete(doc)}>
                    <FiTrash size={16} />
                  </Button>
                </IconButtons>
              )}
            </TitleWrapper>
            <small>Created: {new Date(doc.createdAt).toLocaleString()}</small>
          </SnapListItem>
        ))}
      </List>
    </>
  )
})

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
  margin: 0;
  max-height: 1200px;
  overflow-y: scroll;
  padding: 0;
  &.hidden {
    display: none;
    visibility: hidden;
  }
  & > li:nth-child(odd) {
    background: #f3f3f3;
  }
`
const SnapListItem = styled.li`
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
