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
import { Review } from '@manuscripts/examples-track-db'

export { Review } from '@manuscripts/examples-track-db'
export { ReviewStatus } from '../src/review'
export type ReviewLabel = Pick<Review, 'id' | 'createdAt'>

// GET /doc/:documentId/review/labels
export interface IGetReviewLabelsResponse {
  labels: ReviewLabel[]
}

// GET /review/:reviewId
export type IGetReviewResponse = Review

// POST /review
export interface ICreateReviewRequest {
  docId: string
  snapshotId: string
}
export interface ICreateReviewResponse {
  review: Review
}

// POST /review/:reviewId/finish
export interface IFinishReviewResponse {
  ok: boolean
}