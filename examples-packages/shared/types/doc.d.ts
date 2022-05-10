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
import { PmDoc } from '@manuscripts/examples-track-db'
import { SnapshotLabel } from './snapshot'
import { DocStatus } from '../src/doc'

export { PmDoc } from '@manuscripts/examples-track-db'
export { DocStatus } from '../src/doc'

export type ListedDocument = Pick<PmDoc, 'id' | 'name' | 'createdAt'> & {
  user: {
    id: string
    firstname: string
  }
}
export type PmDocWithSnapshots = PmDoc & {
  snapshots: SnapshotLabel[]
}

// GET /docs
export interface IListDocumentsResponse {
  docs: ListedDocument[]
}

//GET /doc/:documentId
export type IGetDocumentResponse = PmDocWithSnapshots

// GET /doc/:documentId/open
export type IOpenDocumentResponse = Uint8Array

// POST /doc
export interface ICreateDocRequest {
  name: string
}
export type ICreateDocResponse = PmDocWithSnapshots

// PUT /doc/:documentId
export type IUpdateDocRequest = {
  name?: string
  doc?: Record<string, any>
  status?: DocStatus
}
