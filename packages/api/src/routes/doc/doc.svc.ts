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
import { Event, PmDoc } from '@manuscripts/quarterback-shared'
import { prosemirrorToYDoc, yDocToProsemirrorJSON } from 'y-prosemirror'
import { applyUpdate, Doc, encodeStateAsUpdate } from 'yjs'

import { CustomError, log, prisma } from '$common'
import { createRedisClient } from '$common/redis'

const pub = createRedisClient()

const yjsService = {
  async getYDocFromRedis(docId: string) {
    const updates = await pub.lrangeBuffer(`${docId}:updates`, 0, -1)
    if (updates.length === 0) {
      log.debug('Didnt find yDoc from Redis')
      return undefined
    }
    const yDoc = new Doc()
    log.debug(`Found yDoc in redis, applying ${updates.length} updates`)
    yDoc.transact(() => {
      updates.forEach((update) => {
        applyUpdate(yDoc, update)
      })
    })
    return yDoc
  },
}

export const docService = {
  async getDocuments(userId: string): Promise<Event<PmDoc[]>> {
    const found = await prisma.pmDoc.findMany({
      where: {
        user_id: userId,
      },
    })
    return { ok: true, data: found }
  },
  async openDocument(docId: string, userId: string): Promise<Event<Uint8Array>> {
    let yDoc = await yjsService.getYDocFromRedis(docId)
    if (yDoc) {
      const pmDoc = yDocToProsemirrorJSON(yDoc, 'pm-doc')
      pmDoc.type = 'manuscript'
      await prisma.pmDoc.upsert({
        where: {
          id: docId,
        },
        update: {
          doc: pmDoc,
        },
        create: {
          id: docId,
          name: 'Untitled',
          user_id: userId,
          doc: pmDoc,
        },
      })
    } else {
      const found = await prisma.pmDoc.findFirst({
        where: {
          id: docId,
        },
      })
      let doc
      if (!found) {
        doc = schema.nodes.manuscript.createAndFill()?.toJSON() || {}
        await prisma.pmDoc.create({
          data: {
            id: docId,
            name: 'Untitled',
            user_id: userId,
            doc,
          },
        })
      } else {
        doc = found.doc
      }
      const node = schema.nodeFromJSON(doc as any)
      yDoc = prosemirrorToYDoc(node, 'pm-doc')
    }
    const buffer = encodeStateAsUpdate(yDoc)
    return { ok: true, data: buffer }
  },
}
