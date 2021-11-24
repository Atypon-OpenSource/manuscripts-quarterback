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
import { PmDoc } from '@manuscripts/quarterback-shared'
// import { EditorStore } from './EditorStore'
// import { ToastStore } from './ToastStore'
import { getDocuments } from 'api/document'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'

import { AuthStore } from './AuthStore'

interface IProps {
  authStore: AuthStore
  // editorStore: EditorStore
  // toastStore: ToastStore
}

export class DocumentStore {
  @observable documentsMap: Map<string, PmDoc> = new Map()
  @observable currentDocument: PmDoc | null = null
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

  @computed get documents(): PmDoc[] {
    return Array.from(this.documentsMap.entries()).map(([_id, doc]) => doc)
  }

  @action getDocuments = async () => {
    const resp = await getDocuments()
    if (!resp.ok) {
      console.error(resp.error)
      return
    }
    runInAction(() => {
      const currentDocsIds = Array.from(this.documentsMap.entries()).map(([id, _doc]) => id)
      resp.data.docs.forEach((d) => {
        const idx = currentDocsIds.indexOf(d.id)
        if (idx === -1) {
          this.documentsMap.set(d.id, d)
        }
        currentDocsIds.splice(idx, 1)
      })
    })
  }

  @action setCurrentDocument = (id: string) => {
    this.currentDocument = this.documentsMap.get(id) ?? null
    // this.editorStore.setCurrentDoc(this.currentDocument?.doc)
  }

  @action reset = () => {
    this.documentsMap = new Map()
    this.currentDocument = null
  }
}
