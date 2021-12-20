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
  TrackedChange,
} from '@manuscripts/ext-track-changes'
import { useEditorContext, usePluginState } from '@manuscripts/manuscript-editor'
import React from 'react'
import styled from 'styled-components'

import { ChangeList } from '../../change-list/ChangeList'
import { ChangesControls } from './ChangesControls'
import { SnapshotsList } from './SnapshotsList'

interface Props {
  disableYjs?: boolean
}

export function RightPanel(props: Props) {
  const { disableYjs } = props
  const { viewProvider } = useEditorContext()
  const trackChangesState = usePluginState<TrackChangesState>(trackChangesPluginKey)
  const { changeSet, shownChangeStatuses = [] } = trackChangesState || {}

  function handleAcceptChange(c: TrackedChange) {
    const ids = [c.id]
    if (c.type === 'node-change') {
      c.children.forEach((child) => {
        ids.push(child.id)
      })
    }
    viewProvider?.execCommand(trackCommands.setChangeStatuses(CHANGE_STATUS.accepted, ids))
  }
  function handleRejectChange(c: TrackedChange) {
    const ids = [c.id]
    if (c.type === 'node-change') {
      c.children.forEach((child) => {
        ids.push(child.id)
      })
    }
    viewProvider?.execCommand(trackCommands.setChangeStatuses(CHANGE_STATUS.rejected, ids))
  }
  function handleResetChange(c: TrackedChange) {
    const ids = [c.id]
    if (c.type === 'node-change') {
      c.children.forEach((child) => {
        ids.push(child.id)
      })
    }
    viewProvider?.execCommand(trackCommands.setChangeStatuses(CHANGE_STATUS.pending, ids))
  }
  function toggleChangesVisibility(status: CHANGE_STATUS) {
    viewProvider?.execCommand(trackCommands.toggleShownStatuses([status]))
  }

  return (
    <RightSide>
      <ChangesControls className="changes-controls" disableYjs={disableYjs} />
      <SnapshotsList disableYjs={disableYjs} />
      <ChangeList
        changes={changeSet?.pending || []}
        isVisible={shownChangeStatuses.includes(CHANGE_STATUS.pending)}
        title="Pending"
        handleAcceptChange={handleAcceptChange}
        handleRejectChange={handleRejectChange}
        handleResetChange={handleResetChange}
        toggleVisibility={() => toggleChangesVisibility(CHANGE_STATUS.pending)}
      />
      <ChangeList
        changes={changeSet?.accepted || []}
        isVisible={shownChangeStatuses.includes(CHANGE_STATUS.accepted)}
        title="Accepted"
        handleAcceptChange={handleAcceptChange}
        handleRejectChange={handleRejectChange}
        handleResetChange={handleResetChange}
        toggleVisibility={() => toggleChangesVisibility(CHANGE_STATUS.accepted)}
      />
      <ChangeList
        changes={changeSet?.rejected || []}
        isVisible={shownChangeStatuses.includes(CHANGE_STATUS.rejected)}
        title="Rejected"
        handleAcceptChange={handleAcceptChange}
        handleRejectChange={handleRejectChange}
        handleResetChange={handleResetChange}
        toggleVisibility={() => toggleChangesVisibility(CHANGE_STATUS.rejected)}
      />
    </RightSide>
  )
}

const RightSide = styled.div``
