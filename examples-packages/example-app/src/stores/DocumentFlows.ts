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

import { Event, PmDocWithSnapshots } from '@manuscripts/examples-track-shared'
import { AuthStore } from './AuthStore'
import { CommentStore } from './CommentStore'
import { DocumentStore } from './DocumentStore'

interface IProps {
  authStore: AuthStore
  commentStore: CommentStore
  documentStore: DocumentStore
}

export class DocumentFlows {
  authStore: AuthStore
  commentStore: CommentStore
  documentStore: DocumentStore

  constructor(props: IProps) {
    this.authStore = props.authStore
    this.commentStore = props.commentStore
    this.documentStore = props.documentStore
  }

  getDoc = async (documentId: string): Promise<Event<PmDocWithSnapshots>> => {
    const { user } = this.authStore
    if (!user) {
      return { ok: false, error: 'Not logged in', status: 400 }
    }
    const resp = await Promise.all([
      this.documentStore.fetchDocument(documentId),
      this.commentStore.listComments(documentId, user),
    ])
    return resp[0]
  }
}
