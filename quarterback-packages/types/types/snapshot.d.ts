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
import { ManuscriptSnapshot } from '../prisma'

export { ManuscriptSnapshot } from '../prisma'

export type SnapshotLabel = Pick<ManuscriptSnapshot, 'id' | 'name' | 'createdAt'>

// GET /doc/:documentId/snapshot/labels
export interface IGetSnapshotLabelsResponse {
  labels: SnapshotLabel[]
}

// GET /snapshot/:snapshotId
export type IGetSnapshotResponse = ManuscriptSnapshot

// POST /snapshot
export interface ISaveSnapshotRequest {
  docId: string
  name: string
}
export interface ISaveSnapshotResponse {
  snapshot: ManuscriptSnapshot
}

// PUT /snapshot/:snapshotId
export type IUpdateSnapshotRequest = {
  name?: string
}
