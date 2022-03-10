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
import { schema } from '@manuscripts/manuscript-transform'
import { prosemirrorToYDoc } from 'y-prosemirror'
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
  deleteInMinutes: number | null = null

  constructor(id: string) {
    this.id = id
    this.yDoc = new Doc({ gc: false })
    this.awareness = new Awareness(this.yDoc)
    this.awareness.setLocalState(null)
  }

  decrementDeletion(reset = false) {
    if (reset) {
      this.deleteInMinutes = null
    } else if (this.deleteInMinutes === null) {
      this.deleteInMinutes = 2
    } else {
      this.deleteInMinutes -= 1
    }
  }

  createDefaultDoc() {
    const node = schema.nodes.manuscript.createAndFill() as any
    applyUpdate(this.yDoc, encodeStateAsUpdate(prosemirrorToYDoc(node, 'pm-doc')))
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
