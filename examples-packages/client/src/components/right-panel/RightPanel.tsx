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
import {
  CHANGE_STATUS,
  TrackChangesState,
  trackCommands,
  TrackedChange,
} from '@manuscripts/track-changes-plugin'
import { YjsExtension, YjsExtensionState } from '@manuscripts/ext-yjs'
import { EditorViewProvider } from '@manuscripts/examples-track-editor'
import { EditorViewProvider as MViewProvider } from '@manuscripts/manuscript-editor'
import React, { memo, useState } from 'react'
import { stores } from 'stores'
import styled from 'styled-components'

import { ChangeList } from '../change-list/ChangeList'
import { ChangesControls } from './ChangesControls'
import DocControls from 'components/doc-controls/DocControls'
import HistoryList from 'components/history-list/HistoryList'
import ReviewControls from './ReviewControls'
import { SnapshotsList } from '../snapshots/SnapshotsList'
import { YjsSnapshotsList } from './YjsSnapshotsList'

interface Props {
  yjsDisabled?: boolean
  yjsState?: YjsExtensionState
  yjsStore?: YjsExtension['store']
  viewProvider: EditorViewProvider | MViewProvider
  trackChangesState: TrackChangesState | null
}

export const RightPanel = memo((props: Props) => {
  const { yjsDisabled, yjsState, yjsStore, viewProvider, trackChangesState } = props
  const { changeSet } = trackChangesState || {}
  const { documentStore } = stores
  const [showPending, setShowPending] = useState(true)
  const [showAccepted, setShowAccepted] = useState(true)
  const [showRejected, setShowRejected] = useState(true)

  function handleAcceptChange(c: TrackedChange) {
    const ids = [c.id]
    if (c.type === 'node-change') {
      c.children.forEach((child) => {
        ids.push(child.id)
      })
    }
    viewProvider.execCommand(trackCommands.setChangeStatuses(CHANGE_STATUS.accepted, ids))
  }
  function handleRejectChange(c: TrackedChange) {
    const ids = [c.id]
    if (c.type === 'node-change') {
      c.children.forEach((child) => {
        ids.push(child.id)
      })
    }
    viewProvider.execCommand(trackCommands.setChangeStatuses(CHANGE_STATUS.rejected, ids))
  }
  function handleResetChange(c: TrackedChange) {
    const ids = [c.id]
    if (c.type === 'node-change') {
      c.children.forEach((child) => {
        ids.push(child.id)
      })
    }
    viewProvider.execCommand(trackCommands.setChangeStatuses(CHANGE_STATUS.pending, ids))
  }
  async function handleCreateSnapshot() {
    if (yjsDisabled) {
      const saved = await documentStore.saveSnapshot(viewProvider.docToJSON())
      saved.ok && viewProvider.execCommand(trackCommands.applyAndRemoveChanges())
    } else {
      yjsStore?.createSnapshot()
    }
  }

  return (
    <RightSide>
      <DocControls />
      <ReviewControls viewProvider={viewProvider} />
      <ChangesControls
        className="changes-controls"
        viewProvider={viewProvider}
        trackChangesState={trackChangesState}
        createSnapshot={handleCreateSnapshot}
      />
      <HistoryList viewProvider={viewProvider} />
      {yjsDisabled ? (
        <SnapshotsList viewProvider={viewProvider} />
      ) : (
        <YjsSnapshotsList yjsState={yjsState} yjsStore={yjsStore} />
      )}
      <ChangeList
        changes={changeSet?.pending || []}
        isVisible={showPending}
        title="Pending"
        handleAcceptChange={handleAcceptChange}
        handleRejectChange={handleRejectChange}
        handleResetChange={handleResetChange}
        toggleVisibility={() => setShowPending((v) => !v)}
      />
      <ChangeList
        changes={changeSet?.accepted || []}
        isVisible={showAccepted}
        title="Accepted"
        handleAcceptChange={handleAcceptChange}
        handleRejectChange={handleRejectChange}
        handleResetChange={handleResetChange}
        toggleVisibility={() => setShowAccepted((v) => !v)}
      />
      <ChangeList
        changes={changeSet?.rejected || []}
        isVisible={showRejected}
        title="Rejected"
        handleAcceptChange={handleAcceptChange}
        handleRejectChange={handleRejectChange}
        handleResetChange={handleResetChange}
        toggleVisibility={() => setShowRejected((v) => !v)}
      />
    </RightSide>
  )
})

RightPanel.displayName = 'RightPanel'

const RightSide = styled.div`
  & > ${DocControls} {
    margin: 0 0 1rem 0;
  }
  & > ${ReviewControls} {
    margin: 1rem 0 0.5rem 0;
  }
`
