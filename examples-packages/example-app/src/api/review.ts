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
  IGetReviewsResponse,
  IGetReviewResponse,
  ICreateReviewRequest,
  ICreateReviewResponse,
  IFinishReviewRequest,
  IFinishReviewResponse,
  IDeleteReviewResponse,
} from '@manuscripts/examples-track-shared'

import { get, post, del } from './methods'

export const listReviews = (docId: string) =>
  get<IGetReviewsResponse>(`doc/${docId}/reviews`, 'Fetching reviews failed')

export const getReview = (reviewId: string) =>
  get<IGetReviewResponse>(`review/${reviewId}`, 'Fetching a review failed')

export const createReview = (docId: string, payload: ICreateReviewRequest) =>
  post<ICreateReviewResponse>(`doc/${docId}/review`, payload, 'Creating review failed')

export const finishReview = (docId: string, reviewId: string, payload: IFinishReviewRequest) =>
  post<IFinishReviewResponse>(
    `doc/${docId}/review/${reviewId}/finish`,
    payload,
    'Finishing review failed'
  )

export const deleteReview = (docId: string, reviewId: string) =>
  del<IDeleteReviewResponse>(`doc/${docId}/review/${reviewId}`, 'Deleting review failed')
