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
  setChangeStatuses,
  trackChangesPluginKey,
  TrackChangesState,
  useEditorContext,
  usePluginState,
} from '@manuscripts/quarterback-editor'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  className?: string
  disableYjs?: boolean
}

export function ChangesControls(props: IProps) {
  const { className, disableYjs } = props
  const { viewProvider, snapshotProvider, yjsSnapshotProvider } =
    useEditorContext()
  const trackChangesState = usePluginState<TrackChangesState>(
    trackChangesPluginKey
  )

  function handleAcceptPending() {
    const ids = trackChangesState?.changeSet.pending.map((c) => c.id) || []
    viewProvider?.execCommand(setChangeStatuses(CHANGE_STATUS.accepted, ids))
  }
  function handleRejectPending() {
    const ids = trackChangesState?.changeSet.pending.map((c) => c.id) || []
    viewProvider?.execCommand(setChangeStatuses(CHANGE_STATUS.rejected, ids))
  }
  function handleReset() {
    const ids = trackChangesState?.changeSet.changes.map((c) => c.id) || []
    viewProvider?.execCommand(setChangeStatuses(CHANGE_STATUS.pending, ids))
  }
  function handleSnapshot() {
    disableYjs
      ? snapshotProvider?.createSnapshot()
      : yjsSnapshotProvider?.createSnapshot()
  }
  return (
    <Container className={className}>
      <button onClick={() => handleAcceptPending()}>Accept pending</button>
      <button onClick={() => handleRejectPending()}>Reject pending</button>
      <button onClick={() => handleReset()}>Reset</button>
      <button onClick={() => handleSnapshot()}>Snapshot</button>
    </Container>
  )
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  button {
    margin: 0.05rem;
  }
`
