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
  trackChangesPluginKey,
  TrackChangesState,
  trackCommands,
} from '@manuscripts/ext-track-changes'
import { useYjsExtension } from '@manuscripts/ext-yjs'
import {
  useEditorContext,
  usePluginState,
} from '@manuscripts/manuscript-editor'
import React from 'react'
import styled from 'styled-components'

interface IProps {
  className?: string
  disableYjs?: boolean
}

export function ChangesControls(props: IProps) {
  const { className } = props
  const { viewProvider } = useEditorContext()
  const [_, yjsStore] = useYjsExtension()
  const trackChangesState = usePluginState<TrackChangesState>(
    trackChangesPluginKey
  )

  function handleAcceptPending() {
    const ids = trackChangesState?.changeSet.pending.map((c) => c.id) || []
    viewProvider?.execCommand(
      trackCommands.setChangeStatuses(CHANGE_STATUS.accepted, ids)
    )
  }
  function handleRejectPending() {
    const ids = trackChangesState?.changeSet.pending.map((c) => c.id) || []
    viewProvider?.execCommand(
      trackCommands.setChangeStatuses(CHANGE_STATUS.rejected, ids)
    )
  }
  function handleReset() {
    const ids = trackChangesState?.changeSet.changes.map((c) => c.id) || []
    viewProvider?.execCommand(
      trackCommands.setChangeStatuses(CHANGE_STATUS.pending, ids)
    )
  }
  function handleSnapshot() {
    yjsStore?.createSnapshot()
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
