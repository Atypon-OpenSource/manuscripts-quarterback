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
  DocStatus,
  Event,
  ISaveSnapshotResponse,
  IUpdateDocRequest,
  IUpdateSnapshotRequest,
  ListedDocument,
  PmDocSnapshot,
  PmDocWithSnapshots,
} from '@manuscripts/examples-track-types'
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

  @computed get editingDisabled() {
    if (this.authStore.isAdmin) {
      return false
    }
    return this.currentDocument?.status !== DocStatus.EDITABLE
  }

  @computed get snapshotLabels() {
    return this.currentDocument?.snapshots || []
  }

  @action setCurrentDocumentStatus = (status: DocStatus) => {
    if (this.currentDocument) {
      this.currentDocument.status = status
    }
  }

  @action listDocuments = async () => {
    const resp = await docApi.listDocuments()
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.documentList = resp.data.docs.map((d) => ({ ...d, createdAt: new Date(d.createdAt) }))
      })
    }
    return resp
  }

  @action fetchDocument = async (documentId: string) => {
    const resp = await docApi.getDocument(documentId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        const { data: doc } = resp
        this.currentDocument = doc
        this.currentDocument.snapshots = doc.snapshots
          .map((s) => ({ ...s, createdAt: new Date(s.createdAt) }))
          .sort((a, b) => (a.createdAt > b.createdAt ? 1 : -1))
      })
    }
    return resp
  }

  @action openDocument = async (id: string) => {}

  @action createDocument = async (
    payload: { name: string } | { id: string } | { name: string; id: string }
  ) => {
    const resp = await docApi.createDocument(payload)
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
    } else if (this.inspectedSnapshot) {
      return { ok: false, error: "Inspecting a snapshot, can't replace currentDocument with doc" }
    }
    this.currentDocument.doc = doc
    const resp = await docApi.updateDocument(this.currentDocument.id, { doc })
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    return resp
  }

  @action updateDocument = async (docId: string, values: IUpdateDocRequest) => {
    const resp = await docApi.updateDocument(docId, values)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      runInAction(() => {
        this.documentList = this.documentList.map((d) => (d.id === docId ? { ...d, ...values } : d))
        if (this.currentDocument?.id === docId) {
          this.currentDocument = { ...this.currentDocument, ...values }
        }
      })
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

  @action addRemoveUpdateSnapshots = (
    snapId: string,
    created?: PmDocSnapshot,
    updated?: Partial<PmDocSnapshot>
  ) => {
    if (created) {
      this.snapshotsMap.set(snapId, created)
      this.snapshotLabels.push({
        id: created.id,
        createdAt: new Date(created.createdAt),
        name: created.name,
      })
    } else if (updated) {
      const oldSnap = this.snapshotsMap.get(snapId)
      if (oldSnap) {
        this.snapshotsMap.set(snapId, { ...oldSnap, ...updated })
      }
      if (this.currentDocument) {
        this.currentDocument.snapshots = this.currentDocument.snapshots.map((s) =>
          s.id === snapId ? { ...s, ...updated } : s
        )
      }
    } else {
      this.snapshotsMap.delete(snapId)
      if (this.currentDocument) {
        this.currentDocument.snapshots = this.currentDocument.snapshots.filter(
          (s) => s.id !== snapId
        )
      }
    }
  }

  @action saveSnapshot = async (docJson: Record<string, any>) => {
    const docId = this.currentDocument?.id
    let resp: Event<ISaveSnapshotResponse>
    if (!docId) {
      resp = { ok: false, error: 'No current document', status: 400 }
    } else {
      resp = await snapApi.saveSnapshot({
        docId,
        snapshot: docJson,
        name: new Date().toLocaleString('sv'),
      })
    }
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      const {
        data: { snapshot },
      } = resp
      this.addRemoveUpdateSnapshots(snapshot.id, snapshot)
    }
    return resp
  }

  @action updateSnapshot = async (snapId: string, values: IUpdateSnapshotRequest) => {
    const resp = await snapApi.updateSnapshot(snapId, values)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      this.addRemoveUpdateSnapshots(snapId, undefined, values)
    }
    return resp
  }

  @action deleteSnapshot = async (snapId: string) => {
    const resp = await snapApi.deleteSnapshot(snapId)
    if (!resp.ok) {
      console.error(resp.error)
    } else {
      this.addRemoveUpdateSnapshots(snapId)
    }
    return resp
  }

  @action reset = () => {
    // this.documentsMap = new Map()
    this.currentDocument = null
  }
}
