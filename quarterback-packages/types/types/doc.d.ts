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
import { ManuscriptDoc, Prisma } from '../prisma'
import { SnapshotLabel } from './snapshot'
import JsonValue = Prisma.JsonValue
import { AuthResponse } from '../../api/src/typings/auth'
import { AuthRequest, NextFunction } from '../../api/src/typings/request'
export { ManuscriptDoc, ManuscriptDocHistory } from '../prisma'
export { JsonValue }
export type ManuscriptDocWithSnapshots = ManuscriptDoc & {
  snapshots: SnapshotLabel[]
}
export type Doc = Record<string, any>

//GET /doc/:documentId
export type IGetDocumentResponse = ManuscriptDocWithSnapshots
// POST /doc
export interface ICreateDocRequest {
  manuscript_model_id: string
  project_model_id: string
  doc: Doc
}
export type ICreateDocResponse = ManuscriptDocWithSnapshots

// PUT /doc/:documentId
export type IUpdateDocumentRequest = {
  doc: Doc
}
export type StepsData = {
  steps: unknown[]
  clientIDs: unknown[]
  version: number
}
export type Client = {
  id: number
  res: AuthResponse<string>
}
export type RequestQueueItem = {
  req: AuthRequest<unkown>
  res: AuthResponse<unknown>
  next: NextFunction
}
