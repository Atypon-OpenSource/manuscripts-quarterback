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
  ReviewStatus,
  ICreateReviewRequest,
  ICreateReviewResponse,
  DocStatus,
  PmDocSnapshot,
  IFinishReviewRequest,
} from '@manuscripts/examples-track-shared'

import { CustomError, log, prisma } from '$common'

export const reviewService = {
  async listReviews(docId: string): Promise<Event<Review[]>> {
    const found = await prisma.review.findMany({
      where: {
        doc_id: docId,
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
  async createReview(
    payload: ICreateReviewRequest,
    docId: string,
    userId: string
  ): Promise<Event<ICreateReviewResponse>> {
    const { snapshot: snapJson, name } = payload
    const doc = await prisma.pmDoc.findUnique({
      where: {
        id: docId,
      },
    })
    if (doc?.status !== DocStatus.WAITING_REVIEW) {
      return {
        ok: false,
        error: `Doc was not in WAITING_REVIEW state but in: ${doc?.status}`,
        status: 400,
      }
    }
    const [_, snapshot] = await prisma.$transaction([
      prisma.pmDoc.update({
        data: {
          status: DocStatus.IN_REVIEW,
        },
        where: {
          id: docId,
        },
      }),
      prisma.pmDocSnapshot.create({
        data: {
          snapshot: snapJson,
          doc_id: docId,
          name: `Before review`,
        },
      }),
    ])
    const review = await prisma.review
      .create({
        data: {
          doc_id: docId,
          before_snapshot_id: snapshot.id,
          user_id: userId,
        },
      })
      .catch(async (err) => {
        await prisma.$transaction([
          prisma.pmDoc.update({
            data: {
              status: DocStatus.WAITING_REVIEW,
            },
            where: {
              id: docId,
            },
          }),
          prisma.pmDocSnapshot.delete({
            where: {
              id: snapshot.id,
            },
          }),
        ])
        throw err
      })
    return {
      ok: true,
      data: {
        snapshot,
        review,
      },
    }
  },
  async finishReview(
    docId: string,
    reviewId: string,
    params: IFinishReviewRequest
  ): Promise<Event<PmDocSnapshot>> {
    const [_d, snapshot, _r] = await prisma.$transaction([
      prisma.pmDoc.update({
        data: {
          status: DocStatus.EDITABLE,
        },
        where: {
          id: docId,
        },
      }),
      prisma.pmDocSnapshot.create({
        data: {
          snapshot: params.snapshot,
          name: `After review`,
          doc: {
            connect: {
              id: docId,
            },
          },
        },
      }),
      prisma.review.update({
        data: {
          status: ReviewStatus.COMPLETED,
        },
        where: {
          id: reviewId,
        },
      }),
    ])
    return {
      ok: true,
      data: snapshot,
    }
  },
  async deleteReview(docId: string, reviewId: string): Promise<Event<Review>> {
    const [_, review] = await prisma.$transaction([
      prisma.pmDoc.update({
        data: {
          status: DocStatus.EDITABLE,
        },
        where: {
          id: docId,
        },
      }),
      prisma.review.delete({
        where: {
          id: reviewId,
        },
        include: {
          before_snapshot: true,
          after_snapshot: true,
        },
      }),
    ])
    return { ok: true, data: review }
  },
}
