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
import { AuthStore } from './AuthStore'
import { CommentStore } from './CommentStore'
import { DocumentStore } from './DocumentStore'

import { DocumentFlows } from './DocumentFlows'

export class Stores {
  authStore: AuthStore
  commentStore: CommentStore
  documentStore: DocumentStore

  documentFlows: DocumentFlows

  constructor() {
    this.authStore = new AuthStore(this.reset)
    this.documentStore = new DocumentStore({
      authStore: this.authStore,
    })
    this.commentStore = new CommentStore()
    this.documentFlows = new DocumentFlows({
      authStore: this.authStore,
      commentStore: this.commentStore,
      documentStore: this.documentStore,
    })
  }

  reset = () => {
    this.authStore.reset()
    this.commentStore.reset()
    this.documentStore.reset()
  }
}
