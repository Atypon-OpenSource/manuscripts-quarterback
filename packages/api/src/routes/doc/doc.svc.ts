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
import {
  Event,
  PmDoc,
  ListDocument,
  SnapshotLabel,
  ICreateDocRequest,
  PmDocWithSnapshots,
  ISaveSnapshotRequest,
  IUpdateDocRequest,
} from '@manuscripts/quarterback-shared'
import { prosemirrorToYDoc, yDocToProsemirrorJSON } from 'y-prosemirror'
import { applyUpdate, Doc, encodeStateAsUpdate } from 'yjs'

import { CustomError, log, prisma } from '$common'
import { createRedisClient } from '$common/redis'
import { PmDocSnapshot } from '@manuscripts/quarterback-db'

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
  async listDocuments(userId: string): Promise<Event<ListDocument[]>> {
    const found = await prisma.pmDoc.findMany({
      where: {
        user_id: userId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })
    return { ok: true, data: found }
  },
  async getDocument(id: string): Promise<Event<PmDocWithSnapshots>> {
    const found = await prisma.pmDoc.findUnique({
      where: {
        id,
      },
      include: {
        snapshots: {
          select: {
            id: true,
            createdAt: true,
          },
        },
      },
    })
    if (!found) {
      return { ok: false, error: 'Document not found', status: 404 }
    }
    return { ok: true, data: found }
  },
  async createDocument(
    payload: ICreateDocRequest,
    userId: string
  ): Promise<Event<PmDocWithSnapshots>> {
    const saved = await prisma.pmDoc.create({
      data: {
        name: payload.name,
        doc: payload.doc,
        user_id: userId,
      },
    })
    return { ok: true, data: { ...saved, snapshots: [] } }
  },
  async updateDocument(docId: string, payload: IUpdateDocRequest): Promise<Event<PmDoc>> {
    const saved = await prisma.pmDoc.update({
      data: payload,
      where: {
        id: docId,
      },
    })
    return { ok: true, data: saved }
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
  async listSnapshotLabels(docId: string): Promise<Event<SnapshotLabel[]>> {
    const found = await prisma.pmDocSnapshot.findMany({
      where: {
        doc_id: docId,
      },
      select: {
        id: true,
        createdAt: true,
      },
    })
    return { ok: true, data: found }
  },
  async getSnapshot(snapId: string): Promise<Event<PmDocSnapshot>> {
    const found = await prisma.pmDocSnapshot.findUnique({
      where: {
        id: snapId,
      },
    })
    if (!found) {
      return { ok: false, error: 'Snapshot not found', status: 404 }
    }
    return { ok: true, data: found }
  },
  async saveSnapshot(payload: ISaveSnapshotRequest): Promise<Event<PmDocSnapshot>> {
    const { docId, snapshot } = payload
    const saved = await prisma.pmDocSnapshot.create({
      data: {
        snapshot,
        doc_id: docId,
      },
    })
    return { ok: true, data: saved }
  },
  async deleteSnapshot(snapshotId: string): Promise<Event<PmDocSnapshot>> {
    const saved = await prisma.pmDocSnapshot.delete({
      where: {
        id: snapshotId,
      },
    })
    return { ok: true, data: saved }
  },
}
