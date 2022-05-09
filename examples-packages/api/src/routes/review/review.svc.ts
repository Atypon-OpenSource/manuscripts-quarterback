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
import {
  Event,
  Review,
  ReviewLabel,
  ReviewStatus,
  ICreateReviewRequest,
} from '@manuscripts/examples-track-shared'

import { CustomError, log, prisma } from '$common'
// import { Review } from '@manuscripts/examples-tra-db'

export const reviewService = {
  async listReviewLabels(docId: string): Promise<Event<ReviewLabel[]>> {
    const found = await prisma.review.findMany({
      where: {
        doc_id: docId,
      },
      select: {
        id: true,
        createdAt: true,
      },
    })
    return { ok: true, data: found }
  },
  async getReview(reviewId: string): Promise<Event<Review>> {
    const found = await prisma.review.findUnique({
      where: {
        id: reviewId,
      },
    })
    if (!found) {
      return { ok: false, error: 'Review not found', status: 404 }
    }
    return { ok: true, data: found }
  },
  async createReview(payload: ICreateReviewRequest, userId: string): Promise<Event<Review>> {
    const { docId, snapshotId } = payload
    const saved = await prisma.review.create({
      data: {
        doc_id: docId,
        before_snapshot_id: snapshotId,
        user_id: userId,
      },
    })
    return { ok: true, data: saved }
  },
  async finishReview(
    reviewId: string,
  ): Promise<Event<Review>> {
    const saved = await prisma.review.update({
      data: {
        status: ReviewStatus.COMPLETED,
      },
      where: {
        id: reviewId,
      },
    })
    return { ok: true, data: saved }
  },
  async deleteReview(reviewId: string): Promise<Event<Review>> {
    const saved = await prisma.review.delete({
      where: {
        id: reviewId,
      },
    })
    return { ok: true, data: saved }
  },
}
