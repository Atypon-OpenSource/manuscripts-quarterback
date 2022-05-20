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
import { ManuscriptComment } from '../prisma'

export { ManuscriptComment } from '../prisma'

export type CommentWithUserColor = ManuscriptComment & {
  user: {
    name: string
    color: string
  }
}
export type ListedComment = ManuscriptComment

// GET /doc/:documentId/comments
export interface IListCommentsResponse {
  comments: ListedComment[]
}

// POST /comment
export interface ICreateCommentRequest {
  body: string
  change_id: string
  doc_id: string
  snapshot_id: string | null
}
export type ICreateCommentResponse = ManuscriptComment

// PUT /comment/:commentId
export type IUpdateCommentRequest = {
  body?: string
  change_id?: string
  snapshot_id?: string | null
}
