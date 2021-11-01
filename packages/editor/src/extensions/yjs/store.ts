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
import { Observable } from '@manuscripts/quarterback-shared'
import { ProsemirrorBinding, ySyncPluginKey } from 'y-prosemirror'
import { Awareness } from 'y-protocols/awareness'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import { applyUpdate, Doc, encodeStateAsUpdate } from 'yjs'

import { EditorViewProvider } from '$context/EditorViewProvider'
import { trackCommands } from '$extensions/track-changes'

import { createYjsSnapshot } from './snapshots'
import type { YjsEnabled, YjsExtensionState, YjsSnapshot } from './types'

export interface User {
  id: string
  name: string
}

export const createYjsStore = (
  viewProvider: EditorViewProvider,
  opts: YjsEnabled
) => {
  const { disabled, document, user, ws_url } = opts
  const _observable = new Observable<'update'>()
  const ydoc = new Y.Doc()
  const permanentUserData = new Y.PermanentUserData(ydoc)
  permanentUserData.setUserMapping(ydoc, ydoc.clientID, user.name)
  ydoc.gc = false
  const provider = new WebsocketProvider(ws_url, document.id, ydoc)
  const yXmlFragment = ydoc.getXmlFragment('pm-doc')
  let snapshots: YjsSnapshot[] = []
  let selectedSnapshot: YjsSnapshot | null = null

  ydoc.getArray<YjsSnapshot>('versions').observe(function callback() {
    // yjsStore.ydoc.getArray<YjsSnapshot>('versions').unobserve(callback)
    snapshots = ydoc.getArray<YjsSnapshot>('versions').toArray()
  })

  return {
    ydoc,
    permanentUserData,
    awareness: provider.awareness,
    yXmlFragment,

    getState(): YjsExtensionState {
      return {
        snapshots: snapshots,
        selectedSnapshot: selectedSnapshot,
      }
    },

    setOptions(newProps: YjsEnabled) {},

    setUser(user: User) {
      permanentUserData.setUserMapping(ydoc, ydoc.clientID, user.name)
      provider.awareness.setLocalStateField('user', user)
    },

    createSnapshot() {
      const versions = ydoc.getArray<YjsSnapshot>('versions')
      const prevVersion =
        versions.length === 0 ? null : versions.get(versions.length - 1)
      console.info(prevVersion)
      const prevSnapshot =
        prevVersion === null
          ? Y.emptySnapshot
          : Y.decodeSnapshot(prevVersion.snapshot)
      const snapshot = Y.snapshot(ydoc)
      console.info('created snapshot', snapshot)
      if (prevVersion != null) {
        // account for the action of adding a version to ydoc
        const prevVersionID = prevSnapshot.sv.get(prevVersion.clientID)
        if (!prevVersionID) {
          throw Error('Yjs prevVersionID was undefined!')
        }
        prevSnapshot.sv.set(prevVersion.clientID, prevVersionID + 1)
      }
      if (!Y.equalSnapshots(prevSnapshot, snapshot)) {
        versions.push([createYjsSnapshot(snapshot, ydoc.clientID)])
        viewProvider.execCommand(trackCommands.createSnapshot())
        this.updateVersions()
      }
    },

    inspectSnapshot(snap: YjsSnapshot | undefined) {
      if (!snap || selectedSnapshot?.id === snap.id) {
        return this.resumeEditing()
      }
      const versions = ydoc.getArray<YjsSnapshot>('versions')
      const ySnapshot = Y.decodeSnapshot(snap.snapshot)
      console.log('inspect snapshot', ySnapshot)
      let prevYSnapshot: Y.Snapshot = Y.emptySnapshot,
        foundPrevVersion = false
      versions.forEach((s) => {
        if (s.id === snap.id) {
          foundPrevVersion = true
        } else if (!foundPrevVersion) {
          prevYSnapshot = Y.decodeSnapshot(s.snapshot)
        }
      })
      const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(
        viewProvider.state
      ).binding
      if (binding) {
        binding.renderSnapshot(ySnapshot, prevYSnapshot)
      }
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
          this.update()
        }
      })
    },

    resumeEditing() {
      const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(
        viewProvider.state
      ).binding
      if (binding) {
        binding.unrenderSnapshot()
      }
      selectedSnapshot = null
      viewProvider.execCommand(trackCommands.refreshChanges())
      this.update()
    },

    updateVersions() {
      snapshots = ydoc.getArray<YjsSnapshot>('versions').toArray()
      _observable.emit('update', this.getState)
    },

    update() {
      _observable.emit('update', this.getState)
    },

    onUpdate(cb: (data: any) => void) {
      _observable.on('update', cb)
    },

    offUpdate(cb: (data: any) => void) {
      _observable.off('update', cb)
    },
  }
}
