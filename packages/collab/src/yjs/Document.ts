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
import { Awareness } from 'y-protocols/awareness'
import { applyUpdate, Doc, encodeStateAsUpdate } from 'yjs'

import { AwarenessUpdate } from './types'

/**
 * Basically a wrapper class around Y.Doc since IMO composition over inheritance is less messy.
 */
export class Document {
  id: string
  yDoc: Doc
  awareness: Awareness

  constructor(id: string) {
    this.id = id
    this.yDoc = new Doc({ gc: true })
    this.awareness = new Awareness(this.yDoc)
    this.awareness.setLocalState(null)
  }

  getClients() {
    return this.yDoc.store.clients.size
  }

  encodeStateAsUpdate() {
    return encodeStateAsUpdate(this.yDoc)
  }

  applyUpdate(update: Uint8Array) {
    return applyUpdate(this.yDoc, update)
  }

  transact(f: () => void) {
    return this.yDoc.transact(f)
  }

  onYDocUpdate(cb: (update: Uint8Array, docId: string) => void) {
    this.yDoc.on('update', (update: Uint8Array) => cb(update, this.id))
  }

  offYDocUpdate(cb: (update: Uint8Array, docId: string) => void) {
    this.yDoc.off('update', cb)
  }

  onAwarenessUpdate(cb: (update: AwarenessUpdate, docId: string, awareness: Awareness) => void) {
    this.awareness.on('update', (update: AwarenessUpdate) => cb(update, this.id, this.awareness))
  }
}
