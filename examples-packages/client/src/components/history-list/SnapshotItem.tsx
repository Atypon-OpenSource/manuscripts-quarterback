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
import { TrackChangesStatus, trackCommands } from '@manuscripts/track-changes-plugin'
import { Evt, PmDocSnapshot, SnapshotLabel } from '@manuscripts/examples-track-shared'
import { EditorViewProvider } from '@manuscripts/examples-track-editor'
import { EditorViewProvider as MViewProvider } from '@manuscripts/manuscript-editor'
import { inject, observer } from 'mobx-react'
import React, { useCallback, useState } from 'react'
import { FiChevronDown, FiChevronRight, FiEye, FiEyeOff, FiEdit3, FiTrash } from 'react-icons/fi'
// import { MdOutlineAssignment, MdSave } from 'react-icons/md'
import { stores } from 'stores'
import styled from 'styled-components'

import { Stores } from 'stores'
import { HistorySnapshot } from 'stores/HistoryStore'

import { EditSnapshotForm, UpdateSnapshotFormValues } from './EditSnapshotForm'
import { useMemo } from 'react'

interface IProps {
  className?: string
  viewProvider: EditorViewProvider | MViewProvider
  snap: HistorySnapshot
  isVisible: boolean
}

const SnapshotItem = inject((stores: Stores, { snap: { id } }: IProps) => ({
  isVisible: stores.historyStore.openHistoryItems.has(id),
}))(
  observer((props: IProps) => {
    const { className, viewProvider, isVisible, snap } = props
    const {
      documentStore,
      historyStore: { toggleItemOpen },
    } = stores
    const { inspectedSnapshot } = documentStore
    const [editedSnapId, setEditedSnapId] = useState<string | undefined>()
    const isBeingInspected = useCallback(
      (snap: SnapshotLabel) => inspectedSnapshot?.id === snap.id,
      [inspectedSnapshot]
    )

    async function handleInspectSnapshot(snap: SnapshotLabel) {
      if (!inspectedSnapshot) {
        await documentStore.updateCurrentDocument(viewProvider.docToJSON())
      } else if (isBeingInspected(snap)) {
        handleResumeEditing()
        return
      }
      const resp = await documentStore.inspectSnapshot(snap.id)
      if (resp.ok) {
        viewProvider.hydrateDocFromJSON(resp.data.snapshot as any)
        viewProvider.execCommand(trackCommands.setTrackingStatus(TrackChangesStatus.viewSnapshots))
      }
    }
    function handleResumeEditing() {
      documentStore.resumeEditing()
      const { currentDocument } = documentStore
      if (currentDocument?.doc) {
        viewProvider.hydrateDocFromJSON(currentDocument.doc as any)
      }
      viewProvider.execCommand(trackCommands.setTrackingStatus(TrackChangesStatus.enabled))
    }
    function handleEditSnapshot(doc: SnapshotLabel) {
      if (editedSnapId === doc.id) {
        setEditedSnapId(undefined)
      } else {
        setEditedSnapId(doc.id)
      }
    }
    function handleDeleteSnapshot(snap: SnapshotLabel) {
      documentStore.deleteSnapshot(snap.id)
    }
    async function* handleEditSubmit(
      values: UpdateSnapshotFormValues
    ): AsyncGenerator<Evt<boolean>, void, unknown> {
      if (!editedSnapId) {
        yield { e: 'error', error: 'No edited doc' }
        return
      }
      try {
        const resp = await documentStore.updateSnapshot(editedSnapId, values)
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
      <Container inspected={isBeingInspected(snap)}>
        <ItemTypeBtn onClick={() => toggleItemOpen(snap.id)}>
          <ItemType>Snapshot</ItemType>
          <Chevron>
            {isVisible ? <FiChevronDown size={16} /> : <FiChevronRight size={16} />}
          </Chevron>
          {!isVisible && (
            <Time dateTime={snap.createdAt.toLocaleString()}>
              {snap.createdAt.toLocaleString()}
            </Time>
          )}
        </ItemTypeBtn>
        <div className={isVisible ? '' : 'hidden'}>
          <TitleWrapper>
            {editedSnapId === snap.id ? (
              <EditSnapshotForm
                snapshot={snap}
                onSubmit={handleEditSubmit}
                onCancel={() => setEditedSnapId(undefined)}
              />
            ) : (
              <h4>{snap.name}</h4>
            )}
            <IconButtons>
              <Button onClick={() => handleInspectSnapshot(snap)}>
                {isBeingInspected(snap) ? <FiEyeOff size={16} /> : <FiEye size={16} />}
              </Button>
              <Button onClick={() => handleEditSnapshot(snap)}>
                <FiEdit3 size={16} />
              </Button>
              <Button onClick={() => handleDeleteSnapshot(snap)}>
                <FiTrash size={16} />
              </Button>
            </IconButtons>
          </TitleWrapper>
          <Time dateTime={snap.createdAt.toLocaleString()} smallFont>
            {snap.createdAt.toLocaleString()}
          </Time>
        </div>
      </Container>
    )
  })
)

const Container = styled.div<{ inspected: boolean }>`
  background: ${({ inspected }) => (inspected ? '#aaffaa' : '')};
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
const Buttons = styled.div`
  display: flex;
  margin: 0.25rem 0;
  button + button {
    margin-left: 0.5rem;
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
export default styled(SnapshotItem)``
