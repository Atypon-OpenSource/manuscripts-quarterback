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
import type { Redis } from 'ioredis'

import { Document } from '../yjs/Document'
import { PersistedDoc } from './PersistedDoc'

interface Options {
  createRedisClient: () => Redis
}

// Copied from https://github.com/yjs/y-redis/blob/9e12d4b3cd1529f958b78798ac16a9a62ba553f6/src/y-redis.js
export class RedisPersistance {
  pub: Redis
  sub: Redis
  docs = new Map<string, PersistedDoc>()
  opts: Required<Options>

  constructor(opts: Options) {
    this.opts = Object.assign({}, opts)
    this.pub = opts.createRedisClient()
    this.sub = opts.createRedisClient()

    this.sub.on('message', (channel: string, sclock: any) => {
      // console.log('message', channel, sclock)
      const foundDoc = this.docs.get(channel)
      if (foundDoc) {
        const clock = Number(sclock) || Number.POSITIVE_INFINITY // case of null
        if (foundDoc._fetchingClock < clock) {
          // do not query doc updates if this document is currently already fetching
          const isCurrentlyFetching = foundDoc._fetchingClock !== foundDoc._clock
          if (foundDoc._fetchingClock < clock) {
            foundDoc._fetchingClock = clock
          }
          if (!isCurrentlyFetching) {
            foundDoc.getUpdates()
          }
        }
      } else {
        this.sub.unsubscribe(channel)
      }
    })
  }

  async fetchYDoc(docId: string): Promise<Document> {
    let persistedDoc = this.docs.get(docId),
      doc
    if (persistedDoc) {
      doc = persistedDoc.doc
    } else {
      doc = new Document(docId)
      persistedDoc = new PersistedDoc(doc, this.pub, this.sub)
      const exists = await this.pub.exists(`${docId}:updates`).then((key) => key === 1)
      this.docs.set(docId, persistedDoc)
      if (!exists) {
        doc.createDefaultDoc()
        await persistedDoc.pushUpdateToRedis(doc.encodeStateAsUpdate())
      } else {
        await persistedDoc.getUpdates()
      }
    }
    return doc
  }

  update(documentId: string, update: Uint8Array): Promise<any> {
    const persistedDocument = this.docs.get(documentId)
    if (persistedDocument) {
      return persistedDocument.pushUpdateToRedis(update)
    } else {
      return Promise.resolve(false)
    }
  }

  delete(documentId: string) {
    const persistedDocument = this.docs.get(documentId)
    // TODO get the latest updates and write them to postgres using PM JSON, throwing out
    // the editing history. If there are changes somewhere not persisted and that would need
    // the history, use the encodeStateAsUpdate to apply them or just throw them away (if very old)
    // Or show some diffing window. In any case, I'm not saving the Yjs binary to Postgres
    if (persistedDocument) {
      // persistedDocument.doc.offYDocUpdate(persistedDocument.pushUpdateToRedis)
      return persistedDocument.destroy()
    }
    return this.pub.unsubscribe(documentId)
  }
}
