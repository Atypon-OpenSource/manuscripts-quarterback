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
import { PmDoc, PmDocSnapshot } from '@manuscripts/quarterback-db'

export { PmDoc, PmDocSnapshot } from '@manuscripts/quarterback-db'

export type ListDocument = Pick<PmDoc, 'id' | 'name' | 'createdAt'>
export type SnapshotLabel = Pick<DocSnapshot, 'id' | 'createdAt'>
export type PmDocWithSnapshots = PmDoc & {
  snapshots: SnapshotLabel[]
}

// GET /docs
export interface IListDocumentsResponse {
  docs: ListDocument[]
}

//GET /doc/:documentId
export type IGetDocumentResponse = PmDocWithSnapshots

// GET /doc/:documentId/open
export type IOpenDocumentResponse = Uint8Array

// POST /doc
export interface ICreateDocRequest {
  name: string
  doc: Record<string, any>
}
export type ICreateDocResponse = PmDocWithSnapshots

// PUT /doc/:documentId
export type IUpdateDocRequest = {
  name?: string
  doc?: Record<string, any>
}

// GET /doc/:documentId/snapshot/labels
export interface IGetSnapshotLabelsResponse {
  labels: SnapshotLabel[]
}

// GET /snapshot/:snapshotId
export type IGetSnapshotResponse = PmDocSnapshot

// POST /snapshot
export interface ISaveSnapshotRequest {
  docId: string
  snapshot: Record<string, any>
}
export interface ISaveSnapshotResponse {
  snapshot: PmDocSnapshot
}
