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
import { Review } from '../prisma'
import { PmDocSnapshot, SnapshotLabel } from './snapshot'

export { Review } from '../prisma'
export { ReviewStatus } from '../src/review'

export type ReviewWithSnapshots = Review & {
  before_snapshot: SnapshotLabel
  after_snapshot?: SnapshotLabel
}

// GET /doc/:documentId/reviews
export interface IGetReviewsResponse {
  reviews: Review[]
}

// GET /review/:reviewId
export type IGetReviewResponse = Review

// POST /doc/:documentId/review
export interface ICreateReviewRequest {
  docId: string
  name: string
  snapshot: Record<string, any>
}
export interface ICreateReviewResponse {
  snapshot: PmDocSnapshot
  review: Review
}

// POST /doc/:documentId/review/:reviewId/finish
export interface IFinishReviewRequest {
  snapshot: Record<string, any>
}
export interface IFinishReviewResponse {
  snapshot: PmDocSnapshot
}

// DELETE /doc/:documentId/review/:reviewId
export interface IDeleteReviewResponse {
  review: Review
}
