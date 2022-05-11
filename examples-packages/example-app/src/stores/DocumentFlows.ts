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

import { DocStatus, Event, ICreateReviewRequest, PmDocWithSnapshots } from '@manuscripts/examples-track-shared'
import { AuthStore } from './AuthStore'
import { CommentStore } from './CommentStore'
import { DocumentStore } from './DocumentStore'
import { ReviewStore } from './ReviewStore'

interface IProps {
  authStore: AuthStore
  commentStore: CommentStore
  documentStore: DocumentStore
  reviewStore: ReviewStore
}

export class DocumentFlows {
  authStore: AuthStore
  commentStore: CommentStore
  documentStore: DocumentStore
  reviewStore: ReviewStore

  constructor(props: IProps) {
    this.authStore = props.authStore
    this.commentStore = props.commentStore
    this.documentStore = props.documentStore
    this.reviewStore = props.reviewStore
  }

  getDoc = async (documentId: string): Promise<Event<PmDocWithSnapshots>> => {
    const { user } = this.authStore
    if (!user) {
      return { ok: false, error: 'Not logged in', status: 400 }
    }
    const resp = await Promise.all([
      this.documentStore.fetchDocument(documentId),
      this.commentStore.listComments(documentId, user),
      this.reviewStore.listReviews(documentId)
    ])
    return resp[0]
  }

  startReview = async (payload: ICreateReviewRequest) => {
    const resp = await this.reviewStore.createReview(payload.docId, payload)
    if (resp.ok) {
      this.documentStore.setCurrentDocumentStatus(DocStatus.IN_REVIEW)
      this.documentStore.addRemoveUpdateSnapshots(resp.data.snapshot.id, resp.data.snapshot)
    }
  }

  submitReview = async (docId: string, reviewId: string, snap: Record<string, any>) => {
    const resp = await this.reviewStore.finishReview(docId, reviewId, snap)
    if (resp.ok) {
      const { data: { snapshot } } = resp
      this.documentStore.setCurrentDocumentStatus(DocStatus.EDITABLE)
      this.documentStore.addRemoveUpdateSnapshots(snapshot.id, snapshot)
    }
  }

  cancelReview = async (docId: string, reviewId: string) => {
    const resp = await this.reviewStore.deleteReview(docId, reviewId)
    if (resp.ok) {
      const { data: { review } } = resp
      this.documentStore.setCurrentDocumentStatus(DocStatus.EDITABLE)
      this.documentStore.addRemoveUpdateSnapshots(review.before_snapshot_id)
      if (review.after_snapshot_id) {
        this.documentStore.addRemoveUpdateSnapshots(review.after_snapshot_id)
      }
    }
  }
}
