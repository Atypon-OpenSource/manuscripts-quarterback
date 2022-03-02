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
  ISaveSnapshotResponse,
  ListedDocument,
  PmDocSnapshot,
  PmDocWithSnapshots,
} from '@manuscripts/quarterback-shared'
import * as docApi from 'api/document'
import * as snapApi from 'api/snapshot'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { AuthStore } from './AuthStore'

interface IProps {
  authStore: AuthStore
}

export class DocumentStore {
  @observable documentList: ListedDocument[] = []
  @observable currentDocument: PmDocWithSnapshots | null = null
  @observable snapshotsMap: Map<string, PmDocSnapshot> = new Map()
  @observable inspectedSnapshot: PmDocSnapshot | null = null
  STORAGE_KEY = 'document-store'

  authStore: AuthStore

  constructor(props: IProps) {
    makeObservable(this)
    this.authStore = props.authStore
  }

  @computed get snapshotLabels() {
    return this.currentDocument?.snapshots || []
  }

  @action listDocuments = async () => {
    const resp = await docApi.listDocuments()
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.documentList = resp.data.docs
      })
    }
    return resp
  }

  @action fetchDocument = async (documentId: string) => {
    const resp = await docApi.getDocument(documentId)
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    runInAction(() => {
      const { data: doc } = resp
      this.currentDocument = doc
    })
    return resp
  }

  @action openDocument = async (id: string) => {}

  @action createDocument = async (name: string) => {
    const resp = await docApi.createDocument({ name })
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        const { data: doc } = resp
        this.currentDocument = doc
        this.documentList = [
          ...this.documentList,
          {
            id: doc.id,
            name: doc.name,
            createdAt: doc.createdAt,
            user: {
              id: doc.user_id,
              firstname: this.authStore.user?.firstname || '',
            },
          },
        ]
      })
    }
    return resp
  }

  @action updateCurrentDocument = async (doc: Record<string, any>) => {
    if (!this.currentDocument) {
      return { ok: false, error: 'No current document' }
    }
    this.currentDocument.doc = doc
    const resp = await docApi.updateDocument(this.currentDocument.id, { doc })
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    return resp
  }

  @action deleteDocument = async (docId: string) => {
    const resp = await docApi.deleteDocument(docId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.documentList = this.documentList.filter((d) => d.id !== docId)
      })
    }
    return resp
  }

  @action inspectSnapshot = async (id: string) => {
    this.inspectedSnapshot = this.snapshotsMap.get(id) ?? null
    if (this.inspectedSnapshot) {
      return { ok: true, data: this.inspectedSnapshot }
    }
    const resp = await snapApi.getSnapshot(id)
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    runInAction(() => {
      this.snapshotsMap.set(id, resp.data)
      this.inspectedSnapshot = resp.data
    })
    return resp
  }

  @action resumeEditing = () => {
    this.inspectedSnapshot = null
  }

  @action saveSnapshot = async (snapshot: Record<string, any>) => {
    const docId = this.currentDocument?.id
    let resp: Event<ISaveSnapshotResponse>
    if (!docId) {
      resp = { ok: false, error: 'No current document', status: 400 }
    } else {
      resp = await snapApi.saveSnapshot({ docId, snapshot })
    }
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      const {
        data: { snapshot },
      } = resp
      runInAction(() => {
        this.snapshotsMap.set(snapshot.id, snapshot)
        this.snapshotLabels.push({ id: snapshot.id, createdAt: snapshot.createdAt })
      })
    }
    return resp
  }

  @action deleteSnapshot = async (snapId: string) => {
    const resp = await snapApi.deleteSnapshot(snapId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.snapshotsMap.delete(snapId)
        if (this.currentDocument) {
          this.currentDocument.snapshots = this.currentDocument.snapshots.filter(
            (s) => s.id !== snapId
          )
        }
      })
    }
    return resp
  }

  @action reset = () => {
    // this.documentsMap = new Map()
    this.currentDocument = null
  }
}
