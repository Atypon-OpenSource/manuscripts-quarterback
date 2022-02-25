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
import { ListDocument, PmDocSnapshot, PmDocWithSnapshots } from '@manuscripts/quarterback-shared'
import * as docApi from 'api/document'
import * as snapApi from 'api/snapshot'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { AuthStore } from './AuthStore'

interface IProps {
  authStore: AuthStore
  // editorStore: EditorStore
  // toastStore: ToastStore
}

export class DocumentStore {
  @observable documentList: ListDocument[] = []
  @observable currentDocument: PmDocWithSnapshots | null = null
  @observable snapshotsMap: Map<string, PmDocSnapshot> = new Map()
  @observable inspectedSnapshot: PmDocSnapshot | null = null
  STORAGE_KEY = 'document-store'

  authStore: AuthStore
  // editorStore: EditorStore
  // toastStore: ToastStore

  constructor(props: IProps) {
    makeObservable(this)
    this.authStore = props.authStore
    // this.editorStore = props.editorStore
    // this.toastStore = props.toastStore

    if (typeof window === 'undefined') {
      return
    }
    const existing = localStorage.getItem(this.STORAGE_KEY)
    if (existing && existing !== null && existing.length > 0) {
      // const parsed: [string, IDBDocument][] = JSON.parse(existing)
      // parsed.forEach(mapValue => {
      //   this.documentsMap.set(mapValue[0], {
      //     id: mapValue[0],
      //     doc: parseDoc(mapValue[1]),
      //   })
      // })
    }
  }

  @computed get snapshotLabels() {
    return this.currentDocument?.snapshots || []
  }

  @action listDocuments = async () => {
    const resp = await docApi.listDocuments()
    if (!resp.ok) {
      console.error(resp.error)
      return
    }
    runInAction(() => {
      this.documentList = resp.data.docs
    })
    return resp
  }

  @action fetchDocument = async (documentId: string) => {
    const resp = await docApi.getDocument(documentId)
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    runInAction(() => {
      this.currentDocument = resp.data
    })
    return resp
  }

  @action openDocument = async (id: string) => {}

  @action createDocument = async (name: string) => {
    const doc = {}
    const resp = await docApi.createDocument({ name, doc })
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    runInAction(() => {
      this.currentDocument = resp.data
    })
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
    if (!docId) {
      console.error('No current document')
      return { ok: false, error: 'No current document' }
    }
    const resp = await snapApi.saveSnapshot({ docId, snapshot })
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    runInAction(() => {
      const {
        data: { snapshot },
      } = resp
      this.snapshotsMap.set(snapshot.id, snapshot)
      this.snapshotLabels.push({ id: snapshot.id, createdAt: snapshot.createdAt })
    })
  }

  @action deleteSnapshot = async (snapId: string) => {
    const resp = await snapApi.deleteSnapshot(snapId)
    if (!resp.ok) {
      console.error(resp.error)
      return resp
    }
    runInAction(() => {
      this.snapshotsMap.delete(snapId)
      if (this.currentDocument) {
        this.currentDocument.snapshots = this.currentDocument.snapshots.filter(
          (s) => s.id !== snapId
        )
      }
    })
  }

  @action reset = () => {
    // this.documentsMap = new Map()
    this.currentDocument = null
  }
}
