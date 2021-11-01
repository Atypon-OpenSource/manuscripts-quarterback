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
import { EditorState } from 'prosemirror-state'

import { trackCommands } from '$extensions/track-changes'
import { PMSnapshot } from '$typings/snapshots'

import { EditorViewProvider } from './EditorViewProvider'
import { createSnapshot } from './snapshots'

export interface SnapshotProviderState {
  snapshots: PMSnapshot[]
  selectedSnapshot: PMSnapshot | null
}

export class SnapshotProvider {
  _observable = new Observable<'update'>()
  viewProvider: EditorViewProvider

  snapshots: PMSnapshot[] = []
  selectedSnapshot: PMSnapshot | null = null
  currentEditorState?: EditorState

  constructor(viewProvider: EditorViewProvider) {
    this.viewProvider = viewProvider
    this.hydrate()
  }

  get state(): SnapshotProviderState {
    return {
      snapshots: this.snapshots,
      selectedSnapshot: this.selectedSnapshot,
    }
  }

  createSnapshot() {
    const snapshot = createSnapshot(this.viewProvider.view.state, 1)
    this.snapshots.push(snapshot)
    this.viewProvider.execCommand(trackCommands.createSnapshot())
    this.update()
  }

  inspectSnapshot(snap: PMSnapshot | undefined) {
    if (!snap || this.selectedSnapshot?.id === snap.id) {
      return this.resumeEditing()
    }
    this.selectedSnapshot = snap
    if (!this.currentEditorState) {
      this.currentEditorState = this.viewProvider.view.state
    }
    this.viewProvider.hydrateStateFromJSON({
      doc: snap.snapshot,
      selection: { type: 'text', anchor: 0, head: 0 },
    })
    this.viewProvider.execCommand(trackCommands.refreshChanges())
    // TODO set view uneditable
    this.update()
  }

  deleteSnapshot(snap: PMSnapshot) {
    this.snapshots = this.snapshots.filter((s) => s.id !== snap.id)
    this.update()
  }

  resumeEditing() {
    this.selectedSnapshot = null
    if (!this.currentEditorState) {
      throw Error('No currentEditorState to resume editing on!')
    }
    this.viewProvider.updateState(this.currentEditorState, true)
    this.currentEditorState = undefined
    this.viewProvider.execCommand(trackCommands.refreshChanges())
    this.update()
  }

  update() {
    this._observable.emit('update', this.state)
    this.persist()
  }

  onUpdate(cb: (data: SnapshotProviderState) => void) {
    this._observable.on('update', cb)
  }

  offUpdate(cb: (data: SnapshotProviderState) => void) {
    this._observable.off('update', cb)
  }

  persist() {
    if (typeof window === undefined) {
      return
    }
    localStorage.setItem('snapshots', JSON.stringify(this.snapshots))
  }

  hydrate() {
    if (typeof window === undefined) {
      return
    }
    try {
      const snaps = JSON.parse(localStorage.getItem('snapshots') || '')
      if (snaps) {
        this.snapshots = snaps
      }
    } catch (err) {}
  }
}
