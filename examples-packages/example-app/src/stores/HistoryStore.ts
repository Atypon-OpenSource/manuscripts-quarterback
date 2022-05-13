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
  ReviewWithSnapshots,
  SnapshotLabel,
} from '@manuscripts/examples-track-shared'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { AuthStore } from './AuthStore'
import { DocumentStore } from './DocumentStore'
import { ReviewStore } from './ReviewStore'

interface IProps {
  authStore: AuthStore
  documentStore: DocumentStore
  reviewStore: ReviewStore
}

export type HistoryReview = Review & {
  type: 'review'
  before_snapshot: SnapshotLabel
  after_snapshot?: SnapshotLabel
}
export type HistorySnapshot = SnapshotLabel & {
  type: 'snapshot'
}
export type HistoryItem = HistoryReview | HistorySnapshot

export function isReview(h: HistoryItem): h is HistoryReview {
  return h.type === 'review'
}
export function isSnapshot(h: HistoryItem): h is HistorySnapshot {
  return h.type === 'snapshot'
}

export class HistoryStore {
  STORAGE_KEY = 'history-store'

  authStore: AuthStore
  documentStore: DocumentStore
  reviewStore: ReviewStore

  constructor(props: IProps) {
    makeObservable(this)
    this.authStore = props.authStore
    this.documentStore = props.documentStore
    this.reviewStore = props.reviewStore
  }

  @computed get history(): HistoryItem[] {
    let snaps: HistorySnapshot[] = this.documentStore.snapshotLabels.map(s => ({ ...s, type: 'snapshot' }))
    const filteredSnaps: string[] = []
    const joinSnapshotsToReviews: HistoryReview[] = this.reviewStore.reviews.map(r => {
      const rr = {
        ...r,
        type: 'review',
      } as HistoryReview
      const before = snaps.find(s => s.id === rr.before_snapshot_id)
      const after = rr.after_snapshot_id && snaps.find(s => s.id === rr.after_snapshot_id)
      if (before) {
        rr.before_snapshot = before
        filteredSnaps.push(r.before_snapshot_id)
      }
      if (after) {
        rr.after_snapshot = after
        rr.after_snapshot_id && filteredSnaps.push(rr.after_snapshot_id)
      }
      return rr
    })
    snaps = snaps.filter(s => !filteredSnaps.includes(s.id))
    return [...joinSnapshotsToReviews, ...snaps]
      .sort((a, b) => new Date(a.createdAt) > new Date(b.createdAt) ? 1 : -1)
  }

  @action reset = () => {
  }
}
