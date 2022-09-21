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

import type { Document } from '../yjs/Document'

export class PersistedDoc {
  doc: Document
  pub: Redis
  sub: Redis
  /**
   * Next expected index / len of the list of updates
   * @type {number}
   */
  _clock = 0
  _fetchingClock = 0
  synced = false

  constructor(doc: Document, pub: Redis, sub: Redis) {
    this.doc = doc
    this.pub = pub
    this.sub = sub
    if (this.doc.getClients() > 0) {
      this.pushUpdateToRedis(doc.encodeStateAsUpdate())
    }
    doc.onYDocUpdate(this.pushUpdateToRedis.bind(this))
    this.sub.subscribe(this.doc.id).then(() => this.getUpdates())
  }

  get updateEvent() {
    return this.doc.id + ':updates'
  }

  async pushUpdateToRedis(update: Uint8Array) {
    const len = await this.pub.rpush(this.updateEvent, Buffer.from(update))
    if (len === this._clock + 1) {
      this._clock++
      if (this._fetchingClock < this._clock) {
        this._fetchingClock = this._clock
      }
    }
    this.pub.publish(this.doc.id, len.toString())
  }

  destroy() {
    this.doc.offYDocUpdate(this.pushUpdateToRedis)
    return this.sub.unsubscribe(this.doc.id)
  }

  async getUpdates(): Promise<void> {
    const startClock = this._clock
    const updates = await this.pub.lrangeBuffer(this.updateEvent, startClock, -1)
    // logger('Fetched ', logging.BOLD, logging.PURPLE, (updates.length).toString().padEnd(2), logging.UNBOLD, logging.UNCOLOR, ' updates')
    this.doc.transact(() => {
      updates.forEach((update) => {
        this.doc.applyUpdate(update)
      })
      const nextClock = startClock + updates.length
      if (this._clock < nextClock) {
        this._clock = nextClock
      }
      if (this._fetchingClock < this._clock) {
        this._fetchingClock = this._clock
      }
    })
    if (this._fetchingClock <= this._clock) {
      return Promise.resolve()
    } else {
      // there is still something missing. new updates came in. fetch again.
      if (updates.length === 0) {
        // Calling getUpdates recursively has the potential to be an infinite fetch-call.
        // In case no new updates came in, reset _fetching clock (in case the pubsub lied / send an invalid message).
        // Being overly protective here..
        this._fetchingClock = this._clock
        return Promise.resolve()
      }
      return this.getUpdates()
    }
  }
}
