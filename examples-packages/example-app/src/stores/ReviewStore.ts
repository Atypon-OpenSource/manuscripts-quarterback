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
import { Review, ReviewStatus, ICreateReviewRequest } from '@manuscripts/examples-track-shared'
import * as reviewApi from 'api/review'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

export class ReviewStore {
  @observable reviews: Review[] = []
  STORAGE_KEY = 'review-store'

  constructor() {
    makeObservable(this)
  }

  @computed get currentReview() {
    return this.reviews.find((r) => r.status === ReviewStatus.IN_PROGRESS)
  }

  @computed get reviewStatus() {
    return this.currentReview?.status as ReviewStatus | undefined
  }

  @action listReviews = async (docId: string) => {
    const resp = await reviewApi.listReviews(docId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.reviews = resp.data.reviews
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
        if (!this.reviews.find((r) => r.id === reviewId)) {
          this.reviews.push(resp.data)
        }
      })
    }
    return resp
  }

  @action createReview = async (docId: string, payload: ICreateReviewRequest) => {
    const resp = await reviewApi.createReview(docId, payload)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        const {
          data: { review },
        } = resp
        this.reviews.push(review)
      })
    }
    return resp
  }

  @action finishReview = async (docId: string, reviewId: string, snapshot: Record<string, any>) => {
    const resp = await reviewApi.finishReview(docId, reviewId, { snapshot })
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.reviews = this.reviews.map((r) =>
          r.id === reviewId ? { ...r, status: ReviewStatus.COMPLETED } : r
        )
      })
    }
    return resp
  }

  @action deleteReview = async (docId: string, reviewId: string) => {
    const resp = await reviewApi.deleteReview(docId, reviewId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.reviews = this.reviews.filter((r) => r.id !== reviewId)
      })
    }
    return resp
  }

  @action reset = () => {
    this.reviews = []
  }
}
