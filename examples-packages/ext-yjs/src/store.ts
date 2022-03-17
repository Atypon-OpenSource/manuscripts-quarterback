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
import { trackCommands } from '@manuscripts/track-changes-plugin'
import type { EditorProviders } from '@manuscripts/manuscript-editor'
import { ProsemirrorBinding, ySyncPluginKey } from 'y-prosemirror'
import { Awareness } from 'y-protocols/awareness'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { createYjsSnapshot } from './snapshots'
import {
  AwarenessChange,
  yjsExtensionName,
  YjsExtensionState,
  YjsOptions,
  YjsSnapshot,
  YjsUser,
} from './types'

export const createYjsStore = (ctx: EditorProviders, opts: YjsOptions) => {
  const { viewProvider, extensionProvider } = ctx
  const { document, user, initial, ws_url } = opts
  const ydoc = initial?.doc || new Y.Doc()
  ydoc.gc = false
  // TODO doesnt work, cant reuse the users' clientID
  // if (user.clientID) ydoc.clientID = user.clientID
  const permanentUserData = new Y.PermanentUserData(ydoc)
  permanentUserData.setUserMapping(ydoc, user.clientID, user.name)
  const provider = initial?.provider || new WebsocketProvider(ws_url, document.id, ydoc)
  const yXmlFragment = ydoc.getXmlFragment('pm-doc')

  let snapshots: YjsSnapshot[] = []
  let selectedSnapshot: YjsSnapshot | null = null

  let currentUser: YjsUser = user
  let usersMap: Map<number, YjsUser> = new Map()

  let prevState: YjsExtensionState = {
    snapshots,
    selectedSnapshot,
    currentUser,
    usersMap,
  }

  return {
    ydoc,
    permanentUserData,
    awareness: provider.awareness,
    provider,
    yXmlFragment,

    init() {
      snapshots = ydoc.getArray<YjsSnapshot>('versions').toArray()
      ydoc.getArray<YjsSnapshot>('versions').observe(() => {
        snapshots = ydoc.getArray<YjsSnapshot>('versions').toArray()
        this.update()
      })
      this.setUser(currentUser)
      provider.awareness.on('update', this.updateUsers.bind(this))
      return this
    },

    getState(): YjsExtensionState {
      const newState: YjsExtensionState = {
        snapshots,
        selectedSnapshot,
        currentUser,
        usersMap,
      }
      const changed = Object.keys(newState).some((key: string) =>
        prevState[key as keyof YjsExtensionState] !== newState[key as keyof YjsExtensionState]
      )
      if (changed) {
        prevState = newState
        return newState
      }
      return prevState
    },

    setUser(user: YjsUser) {
      const clientID = ydoc.clientID
      currentUser.clientID = clientID
      currentUser = user
      usersMap.set(clientID, currentUser)
      permanentUserData.setUserMapping(ydoc, ydoc.clientID, user.name)
      provider.awareness.setLocalStateField('user', user)
      this.update()
    },

    createSnapshot() {
      const versions = ydoc.getArray<YjsSnapshot>('versions')
      const prevVersion = versions.length === 0 ? null : versions.get(versions.length - 1)
      const prevSnapshot =
        prevVersion === null ? Y.emptySnapshot : Y.decodeSnapshot(prevVersion.snapshot)
      const snapshot = Y.snapshot(ydoc)
      if (prevVersion) {
        // account for the action of adding a version to ydoc
        const prevVersionID = prevSnapshot.sv.get(prevVersion.clientID)
        if (!prevVersionID) {
          throw Error('Yjs prevVersionID was undefined!')
        }
        prevSnapshot.sv.set(prevVersion.clientID, prevVersionID + 1)
      }
      if (!Y.equalSnapshots(prevSnapshot, snapshot)) {
        versions.push([createYjsSnapshot(snapshot, ydoc.clientID)])
        viewProvider.execCommand(trackCommands.applyAndRemoveChanges())
      }
    },

    inspectSnapshot(snap: YjsSnapshot | undefined) {
      if (!snap || selectedSnapshot?.id === snap.id) {
        return this.resumeEditing()
      }
      const ySnapshot = Y.decodeSnapshot(snap.snapshot)
      let prevSnapshot: YjsSnapshot | undefined,
        foundPrevSnapshot = false
      ydoc.getArray<YjsSnapshot>('versions').forEach((s) => {
        if (s.id === snap.id) {
          foundPrevSnapshot = true
        } else if (!foundPrevSnapshot) {
          prevSnapshot = s
        }
      })
      const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(viewProvider.state).binding
      if (!binding) {
        throw Error('Failed to retrieve ProsemirrorBinding from ySyncPlugin')
      }
      binding.renderSnapshot(
        ySnapshot,
        prevSnapshot ? Y.decodeSnapshot(prevSnapshot.snapshot) : Y.emptySnapshot
      )
      selectedSnapshot = snap
      this.update()
      setTimeout(() => {
        // TODO it seems the event execution order is not synchronous so the changes wont refresh
        viewProvider.execCommand(trackCommands.refreshChanges())
      }, 0)
    },

    deleteSnapshot(snap: YjsSnapshot) {
      const versions = ydoc.getArray<YjsSnapshot>('versions')
      versions.forEach((v, i) => {
        if (v.id === snap.id) {
          versions.delete(i)
        }
      })
    },

    resumeEditing() {
      const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(viewProvider.state).binding
      if (!binding) {
        throw Error('Failed to retrieve ProsemirrorBinding from ySyncPlugin')
      }
      binding.unrenderSnapshot()
      selectedSnapshot = null
      viewProvider.execCommand(trackCommands.refreshChanges())
      this.update()
    },

    updateUsers(update: AwarenessChange) {
      const { added, updated, removed } = update
      if (added.length === 0 && removed.length === 0) {
        return
      }
      const states = provider.awareness.getStates() as Map<
        number,
        {
          cursor: any
          user: YjsUser
        }
      >
      added.forEach((clientID) => {
        const state = states.get(clientID)
        if (state) {
          usersMap.set(clientID, state.user)
        }
      })
      removed.map((clientID) => usersMap.delete(clientID))
      usersMap = new Map(usersMap)
      this.update()
    },

    update() {
      extensionProvider.emitExtensionUpdate(yjsExtensionName, this.getState())
    },
  }
}
