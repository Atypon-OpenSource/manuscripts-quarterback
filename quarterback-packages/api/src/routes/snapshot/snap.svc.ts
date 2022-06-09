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
  Maybe,
  SnapshotLabel,
  ISaveSnapshotRequest,
  IUpdateSnapshotRequest,
} from '@manuscripts/quarterback-types'

import { CustomError, log, prisma } from '$common'
import { ManuscriptSnapshot } from '@manuscripts/quarterback-db'

export const snapService = {
  async listSnapshotLabels(docId: string): Promise<Maybe<SnapshotLabel[]>> {
    const found = await prisma.manuscriptSnapshot.findMany({
      where: {
        doc_id: docId,
      },
      select: {
        id: true,
        name: true,
        createdAt: true,
      },
    })
    return { ok: true, data: found }
  },
  async getSnapshot(snapId: string): Promise<Maybe<ManuscriptSnapshot>> {
    const found = await prisma.manuscriptSnapshot.findUnique({
      where: {
        id: snapId,
      },
    })
    if (!found) {
      return { ok: false, err: 'Snapshot not found', code: 404 }
    }
    return { ok: true, data: found }
  },
  async saveSnapshot(payload: ISaveSnapshotRequest): Promise<Maybe<ManuscriptSnapshot>> {
    const { docId, snapshot, name } = payload
    const saved = await prisma.manuscriptSnapshot.create({
      data: {
        snapshot,
        doc_id: docId,
        name,
      },
    })
    return { ok: true, data: saved }
  },
  async updateSnapshot(
    snapId: string,
    payload: IUpdateSnapshotRequest
  ): Promise<Maybe<ManuscriptSnapshot>> {
    const saved = await prisma.manuscriptSnapshot.update({
      data: payload,
      where: {
        id: snapId,
      },
    })
    return { ok: true, data: saved }
  },
  async deleteSnapshot(snapshotId: string): Promise<Maybe<ManuscriptSnapshot>> {
    const saved = await prisma.manuscriptSnapshot.delete({
      where: {
        id: snapshotId,
      },
    })
    return { ok: true, data: saved }
  },
}
