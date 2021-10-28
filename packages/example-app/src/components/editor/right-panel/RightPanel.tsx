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
  toggleShownStatuses,
  trackChangesPluginKey,
  TrackChangesState,
  TrackedChange,
  useEditorContext,
  usePluginState,
} from '@manuscripts/quarterback-editor'
import React from 'react'
import styled from 'styled-components'

import { ChangeList } from './ChangeList'
import { ChangesControls } from './ChangesControls'
import { SnapshotsList } from './SnapshotsList'

interface Props {
  disableYjs?: boolean
}

export function RightPanel(props: Props) {
  const { disableYjs } = props
  const { viewProvider } = useEditorContext()
  const trackChangesState = usePluginState<TrackChangesState>(
    trackChangesPluginKey
  )
  const { changeSet, shownChangeStatuses = [] } = trackChangesState || {}

  function handleAcceptChange(id: string) {
    viewProvider?.execCommand(setChangeStatuses(CHANGE_STATUS.accepted, [id]))
  }
  function handleRejectChange(id: string) {
    viewProvider?.execCommand(setChangeStatuses(CHANGE_STATUS.rejected, [id]))
  }
  function handleResetChange(id: string) {
    viewProvider?.execCommand(setChangeStatuses(CHANGE_STATUS.pending, [id]))
  }
  function toggleChangesVisibility(status: CHANGE_STATUS) {
    viewProvider?.execCommand(toggleShownStatuses([status]))
  }

  return (
    <RightSide>
      <ChangesControls className="changes-controls" disableYjs={disableYjs} />
      <SnapshotsList disableYjs={disableYjs} />
      <ChangeList
        changes={changeSet?.pending || []}
        isVisible={shownChangeStatuses.includes(CHANGE_STATUS.pending)}
        title="Pending"
        renderChangeContent={(c: TrackedChange) => (
          <Buttons>
            <button
              onClick={() => handleAcceptChange(c.id)}
              aria-label="accept-btn"
            >
              Accept
            </button>
            <button
              onClick={() => handleRejectChange(c.id)}
              aria-label="reject-btn"
            >
              Reject
            </button>
          </Buttons>
        )}
        toggleVisibility={() => toggleChangesVisibility(CHANGE_STATUS.pending)}
      />
      <ChangeList
        changes={changeSet?.accepted || []}
        isVisible={shownChangeStatuses.includes(CHANGE_STATUS.accepted)}
        title="Accepted"
        renderChangeContent={(c: TrackedChange) => (
          <Buttons>
            <button
              onClick={() => handleResetChange(c.id)}
              aria-label="accept-btn"
            >
              Reset
            </button>
            <button
              onClick={() => handleRejectChange(c.id)}
              aria-label="reject-btn"
            >
              Reject
            </button>
          </Buttons>
        )}
        toggleVisibility={() => toggleChangesVisibility(CHANGE_STATUS.accepted)}
      />
      <ChangeList
        changes={changeSet?.rejected || []}
        isVisible={shownChangeStatuses.includes(CHANGE_STATUS.rejected)}
        title="Rejected"
        renderChangeContent={(c: TrackedChange) => (
          <Buttons>
            <button
              onClick={() => handleAcceptChange(c.id)}
              aria-label="accept-btn"
            >
              Accept
            </button>
            <button
              onClick={() => handleResetChange(c.id)}
              aria-label="reject-btn"
            >
              Reset
            </button>
          </Buttons>
        )}
        toggleVisibility={() => toggleChangesVisibility(CHANGE_STATUS.rejected)}
      />
    </RightSide>
  )
}

const RightSide = styled.div``
const Buttons = styled.div`
  display: flex;
  margin: 0.25rem 0;
  button + button {
    margin-left: 0.5rem;
  }
`
