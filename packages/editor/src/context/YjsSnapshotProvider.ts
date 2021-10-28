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
import * as Y from 'yjs'

import {
  createSnapshot as createSnapshotCmd,
  refreshChanges,
} from '$extensions/track-changes'
import { YjsSnapshot } from '$typings/snapshots'

import { EditorViewProvider } from './EditorViewProvider'
import { createYjsSnapshot } from './snapshots'
import { YjsProvider } from './YjsProvider'

export interface YjsSnapshotProviderState {
  snapshots: Y.Array<YjsSnapshot>
  selectedSnapshot: YjsSnapshot | null
}

export class YjsSnapshotProvider {
  _observable = new Observable<'update'>()
  viewProvider: EditorViewProvider
  yjsProvider: YjsProvider

  snapshots: Y.Array<YjsSnapshot> = new Y.Array()
  selectedSnapshot: YjsSnapshot | null = null

  constructor(viewProvider: EditorViewProvider, yjsProvider: YjsProvider) {
    this.viewProvider = viewProvider
    this.yjsProvider = yjsProvider
    yjsProvider.onInit(() => {
      // This is so ridiculous
      // But the reason is that the versions is updated async as it's fetched from the server
      // (or loaded from indexedDB) so this is the only way to get correctly notified when that happens.
      // Actually, I might have to keep the observer now that I think of it...
      const self = this
      yjsProvider.ydoc
        .getArray<YjsSnapshot>('versions')
        .observe(function callback() {
          self.updateVersions()
          yjsProvider.ydoc.getArray<YjsSnapshot>('versions').unobserve(callback)
        })
    })
  }

  get state(): YjsSnapshotProviderState {
    return {
      snapshots: this.snapshots,
      selectedSnapshot: this.selectedSnapshot,
    }
  }

  updateVersions() {
    const versions = this.yjsProvider.ydoc.getArray<YjsSnapshot>('versions')
    this.snapshots = versions
    this._observable.emit('update', this.state)
  }

  createSnapshot() {
    const ydoc = this.yjsProvider.ydoc
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
      this.viewProvider.execCommand(createSnapshotCmd())
      this.updateVersions()
    }
  }

  inspectSnapshot(snap: YjsSnapshot | undefined) {
    if (!snap || this.selectedSnapshot?.id === snap.id) {
      return this.resumeEditing()
    }
    const versions = this.yjsProvider.ydoc.getArray<YjsSnapshot>('versions')
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
      this.viewProvider.view.state
    ).binding
    if (binding) {
      binding.renderSnapshot(ySnapshot, prevYSnapshot)
    }
    this.selectedSnapshot = snap
    setTimeout(() => {
      // TODO it seems the event execution order is not synchronous so the changes wont refresh
      this.viewProvider.execCommand(refreshChanges())
    }, 0)
    this._observable.emit('update', this.state)
  }

  deleteSnapshot(snap: YjsSnapshot) {
    const versions = this.yjsProvider.ydoc.getArray<YjsSnapshot>('versions')
    versions.forEach((v, i) => {
      if (v.id === snap.id) {
        versions.delete(i)
        this._observable.emit('update', this.state)
      }
    })
  }

  resumeEditing() {
    const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(
      this.viewProvider.view.state
    ).binding
    if (binding) {
      binding.unrenderSnapshot()
    }
    this.selectedSnapshot = null
    this.viewProvider.execCommand(refreshChanges())
    this._observable.emit('update', this.state)
  }

  onUpdate(cb: (data: any) => void) {
    this._observable.on('update', cb)
  }

  offUpdate(cb: (data: any) => void) {
    this._observable.off('update', cb)
  }
}
