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

// import { uuidv4 } from '$lib/utils/uuidv4'

// import { createSnapshot as createSnapshotCmd } from '$lib/extensions/yjs'

// import type { ViewStore } from '../../stores/view'
// import type { YjsStore } from './yjs'

// import type { YjsSnapshot } from '$lib/typings/snapshots'

// export interface YjsSnapshotProviderState {
//   snapshots: Y.Array<YjsSnapshot>
//   selectedSnapshot: YjsSnapshot | null
// }

// export type YjsSnapshotsStore = ReturnType<typeof createYjsSnapshotsStore>

// function createYjsSnapshot(ysnap: Y.Snapshot, clientID: number): YjsSnapshot {
//   return {
//     id: uuidv4(),
//     date: new Date().getTime(),
//     snapshot: Y.encodeSnapshot(ysnap),
//     clientID,
//   }
// }

// export const createYjsSnapshotsStore = (
//   viewStore: ViewStore,
//   yjsStore: YjsStore,
// ) => {
//   const snapshots = writable<YjsSnapshot[]>([])
//   const selectedSnapshot = writable<YjsSnapshot | null>(null)

//   yjsStore.ydoc.getArray<YjsSnapshot>('versions').observe(function callback() {
//     // yjsStore.ydoc.getArray<YjsSnapshot>('versions').unobserve(callback)
//     snapshots.set(yjsStore.ydoc.getArray<YjsSnapshot>('versions').toArray())
//   })

//   return {
//     createSnapshot() {
//       const ydoc = yjsStore.ydoc
//       const versions = ydoc.getArray<YjsSnapshot>('versions')
//       const prevVersion = versions.length === 0 ? null : versions.get(versions.length - 1)
//       console.info(prevVersion)
//       const prevSnapshot = prevVersion === null ? Y.emptySnapshot : Y.decodeSnapshot(prevVersion.snapshot)
//       const snapshot = Y.snapshot(ydoc)
//       console.info('created snapshot', snapshot)
//       if (prevVersion != null) {
//         // account for the action of adding a version to ydoc
//         const prevVersionID = prevSnapshot.sv.get(prevVersion.clientID)
//         if (!prevVersionID) {
//           throw Error('Yjs prevVersionID was undefined!')
//         }
//         prevSnapshot.sv.set(prevVersion.clientID, prevVersionID + 1)
//       }
//       if (!Y.equalSnapshots(prevSnapshot, snapshot)) {
//         versions.push([createYjsSnapshot(snapshot, ydoc.clientID)])
//         viewStore.execCommand(createSnapshotCmd())
//         // this.updateVersions()
//       }
//     },

//     inspectSnapshot(snap: YjsSnapshot | undefined) {
//       if (!snap || get(selectedSnapshot)?.id === snap.id) {
//         return this.resumeEditing()
//       }
//       const versions = yjsStore.ydoc.getArray<YjsSnapshot>('versions')
//       const ySnapshot = Y.decodeSnapshot(snap.snapshot)
//       console.log('inspect snapshot', ySnapshot)
//       let prevYSnapshot: Y.Snapshot = Y.emptySnapshot, foundPrevVersion = false
//       versions.forEach((s => {
//         if (s.id === snap.id) {
//           foundPrevVersion = true
//         } else if (!foundPrevVersion) {
//           prevYSnapshot = Y.decodeSnapshot(s.snapshot)
//         }
//       }))
//       const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(viewStore.getState()).binding
//       if (binding) {
//         binding.renderSnapshot(ySnapshot, prevYSnapshot)
//       }
//       selectedSnapshot.set(snap)
//       // setTimeout(() => {
//       //   // TODO it seems the event execution order is not synchronous so the changes wont refresh
//       //   viewStore.execCommand(refreshChanges())
//       // }, 0)
//     },

//     deleteSnapshot(snap: YjsSnapshot) {
//       const versions = yjsStore.ydoc.getArray<YjsSnapshot>('versions')
//       versions.forEach((v, i) => {
//         if (v.id === snap.id) {
//           versions.delete(i)
//           // this._observable.emit('update', this.state)
//         }
//       })
//     },

//     resumeEditing() {
//       const binding: ProsemirrorBinding | null = ySyncPluginKey.getState(viewStore.getState()).binding
//       if (binding) {
//         binding.unrenderSnapshot()
//       }
//       selectedSnapshot.set(null)
//       // viewStore.execCommand(refreshChanges())
//     }
//   }
// }
export {}
