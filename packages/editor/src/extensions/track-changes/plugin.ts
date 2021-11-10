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
import { Plugin, PluginKey } from 'prosemirror-state'
import { ySyncPluginKey } from 'y-prosemirror'
import { EditorViewProvider } from '$context/EditorViewProvider'
import { QuarterBackSchema } from '$schema'
import { TrackedUser } from '$typings/user'

import { getAction, setAction, TrackChangesAction } from './actions'
import { CHANGE_STATUS, ChangeSet } from './ChangeSet'
import { findChanges } from './findChanges'
import { fixInconsistentChanges } from './fixInconsistentChanges'
import { trackTransaction } from './trackTransaction'
import { TrackChangesStatus } from './types'
import {
  updateChangeAttrs,
  updateDocAndRemoveChanges,
} from './updateChangeAttrs'

const DEFAULT_USER = {
  id: '0',
  name: 'Unknown',
}

export interface TrackChangesState {
  status: TrackChangesStatus
  currentUser: TrackedUser
  insertColor: string
  deleteColor: string
  changeSet: ChangeSet
  shownChangeStatuses: CHANGE_STATUS[]
}

export const trackChangesPluginKey = new PluginKey<
  TrackChangesState,
  QuarterBackSchema
>('track-changes')

export const trackChangesPlugin = (
  viewProvider: EditorViewProvider,
  opts: { user?: TrackedUser }
) => {
  return new Plugin<TrackChangesState, QuarterBackSchema>({
    key: trackChangesPluginKey,
    state: {
      init(config, state) {
        const changeSet = findChanges(state)
        return {
          status: TrackChangesStatus.enabled,
          currentUser: opts.user || DEFAULT_USER,
          insertColor: 'greenyellow',
          deleteColor: '#ffa4a4',
          changeSet: changeSet,
          shownChangeStatuses: [
            CHANGE_STATUS.accepted,
            CHANGE_STATUS.rejected,
            CHANGE_STATUS.pending,
          ],
        }
      },

      apply(tr, value, oldState, newState): TrackChangesState {
        const setUser = getAction(tr, TrackChangesAction.setUser)
        const setStatus = getAction(tr, TrackChangesAction.setTrackingStatus)
        if (setUser) {
          return { ...value, currentUser: setUser }
        } else if (setStatus) {
          return {
            ...value,
            status: setStatus,
            changeSet: findChanges(newState),
          }
        }
        const {
          currentUser,
          status,
          changeSet: oldChangeSet,
          shownChangeStatuses: oldShownChangeStatuses,
          ...rest
        } = value
        if (status === TrackChangesStatus.disabled) {
          return value
        }
        let changeSet = oldChangeSet
        const updatedChangeIds = getAction(tr, TrackChangesAction.updateChanges)
        const toggledChangeStatuses = getAction(
          tr,
          TrackChangesAction.toggleShownStatuses
        )
        let shownChangeStatuses = oldShownChangeStatuses
        // TODO update changes on inspect snapshot by checking !tr.getMeta(ySyncPluginKey) ?
        if (
          updatedChangeIds ||
          getAction(tr, TrackChangesAction.refreshChanges)
        ) {
          changeSet = findChanges(newState)
        }
        if (toggledChangeStatuses) {
          toggledChangeStatuses.forEach((s) => {
            const foundIdx = shownChangeStatuses.indexOf(s)
            shownChangeStatuses =
              foundIdx !== -1
                ? shownChangeStatuses.filter((_, i) => i !== foundIdx)
                : shownChangeStatuses.concat(s)
          })
        }
        return {
          status,
          currentUser,
          changeSet,
          shownChangeStatuses,
          ...rest,
        }
      },
    },
    appendTransaction(trs, oldState, newState) {
      const pluginState = trackChangesPluginKey.getState(newState)
      if (
        !pluginState ||
        pluginState.status === TrackChangesStatus.disabled ||
        !viewProvider.view.editable
      ) {
        return null
      }
      const { currentUser, insertColor, deleteColor, changeSet } = pluginState
      let createdTr = newState.tr
      trs.forEach((tr) => {
        const userData = {
          userID: currentUser.id,
          userName: currentUser.name,
          insertColor,
          deleteColor,
        }
        if (
          tr.docChanged &&
          !tr.getMeta('history$') &&
          !tr.getMeta(ySyncPluginKey)
        ) {
          createdTr = trackTransaction(tr, oldState, createdTr, userData)
        }
        if (tr.docChanged) {
          setAction(createdTr, TrackChangesAction.refreshChanges, true)
        }
        const setChangeStatuses = getAction(
          tr,
          TrackChangesAction.setChangeStatuses
        )
        if (setChangeStatuses) {
          const { status, ids } = setChangeStatuses
          ids.forEach((changeId: string) => {
            const change = changeSet?.get(changeId)
            if (change) {
              createdTr = updateChangeAttrs(createdTr, change, { status })
              setAction(createdTr, TrackChangesAction.updateChanges, [
                change.id,
              ])
            }
          })
        } else if (getAction(tr, TrackChangesAction.createSnapshot)) {
          const mapping = updateDocAndRemoveChanges(
            createdTr,
            changeSet!.textChanges
          )
          updateDocAndRemoveChanges(createdTr, changeSet!.nodeChanges, mapping)
          setAction(createdTr, TrackChangesAction.refreshChanges, true)
        }
      })
      const changed = fixInconsistentChanges(
        pluginState.changeSet,
        currentUser,
        createdTr
      )
      if (changed) {
        setAction(createdTr, TrackChangesAction.refreshChanges, true)
      }
      return createdTr
    },
  })
}
