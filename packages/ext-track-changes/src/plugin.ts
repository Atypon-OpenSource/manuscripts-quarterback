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
import { Plugin, PluginKey, Transaction } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { getAction, setAction, TrackChangesAction } from './actions'
import { ChangeSet } from './ChangeSet'
import { logger } from './logger'
import { findChanges } from './track/findChanges'
import { fixInconsistentChanges } from './track/fixInconsistentChanges'
import { trackTransaction } from './track/trackTransaction'
import { updateChangeAttrs, updateDocAndRemoveChanges } from './track/updateChangeAttrs'
import { CHANGE_STATUS } from './types/change'
import { TrackChangesPluginOptions, TrackChangesState, TrackChangesStatus } from './types/track'
import { TrackedUser } from './types/user'

const DEFAULT_USER = {
  id: '0',
  name: 'Unknown',
}

export const trackChangesPluginKey = new PluginKey<TrackChangesState, any>('track-changes')

const infiniteLoopCounter = {
  start: 0,
  iters: 0,
}

export const trackChangesPlugin = ({
  user = DEFAULT_USER,
  skipTrsWithMetas = [],
}: TrackChangesPluginOptions) => {
  let editorView: EditorView | undefined
  return new Plugin<TrackChangesState, any>({
    key: trackChangesPluginKey,
    props: {
      editable(state) {
        return this.getState(state).status !== TrackChangesStatus.viewSnapshots
      },
    },
    state: {
      init(config, state) {
        const changeSet = findChanges(state)
        return {
          status: TrackChangesStatus.enabled,
          currentUser: user,
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

      apply(tr, pluginState, oldState, newState): TrackChangesState {
        const setUser = getAction(tr, TrackChangesAction.setUser)
        const setStatus = getAction(tr, TrackChangesAction.setPluginStatus)
        if (setUser) {
          return { ...pluginState, currentUser: setUser }
        } else if (setStatus) {
          return {
            ...pluginState,
            status: setStatus,
            changeSet: findChanges(newState),
          }
        } else if (pluginState.status === TrackChangesStatus.disabled) {
          return pluginState
        }
        const {
          changeSet: oldChangeSet,
          shownChangeStatuses: oldShownChangeStatuses,
          ...rest
        } = pluginState
        let changeSet = oldChangeSet,
          shownChangeStatuses = oldShownChangeStatuses
        const updatedChangeIds = getAction(tr, TrackChangesAction.updateChanges)
        const toggledChangeStatuses = getAction(tr, TrackChangesAction.toggleShownStatuses)
        // TODO update changes on inspect snapshot by checking !tr.getMeta(ySyncPluginKey) ?
        if (updatedChangeIds || getAction(tr, TrackChangesAction.refreshChanges)) {
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
          changeSet,
          shownChangeStatuses,
          ...rest,
        }
      },
    },
    view(p) {
      editorView = p
      return {
        update: undefined,
        destroy: undefined,
      }
    },
    appendTransaction(trs, oldState, newState) {
      const pluginState = trackChangesPluginKey.getState(newState)
      if (
        !pluginState ||
        pluginState.status === TrackChangesStatus.disabled ||
        !editorView?.editable
      ) {
        return null
      }
      if (infiniteLoopCounter.start < Date.now() - 10000) {
        infiniteLoopCounter.start = Date.now()
        infiniteLoopCounter.iters = 0
      }
      if (infiniteLoopCounter.iters >= 100) {
        console.error('Detected probable infinite loop in track changes!')
        return null
      }
      const { currentUser, insertColor, deleteColor, changeSet } = pluginState
      let createdTr = newState.tr,
        docChanged = false
      trs.forEach((tr) => {
        const userData = {
          userID: currentUser.id,
          userName: currentUser.name,
          insertColor,
          deleteColor,
        }
        const wasAppended = tr.getMeta('appendedTransaction') as Transaction | undefined
        const skipMetaUsed = skipTrsWithMetas.some((m) => tr.getMeta(m) || wasAppended?.getMeta(m))
        const skipTrack =
          getAction(tr, TrackChangesAction.skipTrack) ||
          (wasAppended && getAction(wasAppended, TrackChangesAction.skipTrack))
        if (tr.docChanged && !skipMetaUsed && !skipTrack && !tr.getMeta('history$')) {
          createdTr = trackTransaction(tr, oldState, createdTr, userData)
          infiniteLoopCounter.iters += 1
        }
        docChanged = docChanged || tr.docChanged
        const setChangeStatuses = getAction(tr, TrackChangesAction.setChangeStatuses)
        if (setChangeStatuses) {
          const { status, ids } = setChangeStatuses
          ids.forEach((changeId: string) => {
            const change = changeSet?.get(changeId)
            if (change) {
              createdTr = updateChangeAttrs(createdTr, change, { status }, oldState.schema)
              setAction(createdTr, TrackChangesAction.updateChanges, [change.id])
            }
          })
        } else if (getAction(tr, TrackChangesAction.createSnapshot)) {
          const mapping = updateDocAndRemoveChanges(
            createdTr,
            oldState.schema,
            changeSet!.changeTree.filter((c) => c.type === 'node-change')
          )
          updateDocAndRemoveChanges(
            createdTr,
            oldState.schema,
            changeSet!.changes.filter((c) => c.type === 'text-change'),
            mapping
          )
          setAction(createdTr, TrackChangesAction.refreshChanges, true)
        }
      })
      const changed = fixInconsistentChanges(
        pluginState.changeSet,
        currentUser,
        createdTr,
        oldState.schema
      )
      if (docChanged || createdTr.docChanged || changed) {
        setAction(createdTr, TrackChangesAction.refreshChanges, true)
      }
      return createdTr
    },
  })
}
