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
  Review,
  ReviewLabel,
  ReviewStatus,
  ICreateReviewRequest
} from '@manuscripts/examples-track-shared'
import * as reviewApi from 'api/review'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

export class ReviewStore {
  @observable reviewLabels: ReviewLabel[] = []
  @observable reviewsMap: Map<string, Review> = new Map()
  @observable currentReview: Review | undefined = undefined
  @observable openReviewLists: Set<string> = new Set()
  STORAGE_KEY = 'review-store'

  constructor() {
    makeObservable(this)
  }

  @computed get reviews() {
    return Array.from(this.reviewsMap.values())
  }

  @computed get reviewStatus() {
    return this.currentReview?.status as ReviewStatus | undefined
  }

  @action listReviews = async (docId: string) => {
    const resp = await reviewApi.listReviewLabels(docId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.reviewLabels = resp.data.labels
      })
    }
    return resp
  }

  @action fetchReview = async (reviewId: string) => {
    const resp = await reviewApi.getReview(reviewId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        const { data: review } = resp
        this.reviewsMap.set(reviewId, review)
      })
    }
    return resp
  }

  @action createReview = async (payload: ICreateReviewRequest) => {
    const resp = await reviewApi.createReview(payload)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.reviewsMap.set(resp.data.review.id, {
          ...resp.data.review,
        })
      })
    }
    return resp
  }

  @action finishReview = async (reviewId: string) => {
    const resp = await reviewApi.finishReview(reviewId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        const old = this.reviewsMap.get(reviewId)
        old && this.reviewsMap.set(reviewId, { ...old, status: ReviewStatus.COMPLETED })
      })
    }
    return resp
  }

  @action deleteReview = async (reviewId: string) => {
    const resp = await reviewApi.deleteReview(reviewId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.reviewsMap.delete(reviewId)
        this.reviewLabels = this.reviewLabels.filter((r) => r.id === reviewId)
      })
    }
    return resp
  }

  @action reset = () => {}
}
