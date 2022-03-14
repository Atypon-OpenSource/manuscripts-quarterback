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
  Event,
  ManuscriptDoc,
  ICreateDocRequest,
  ManuscriptDocWithSnapshots,
} from '@manuscripts/quarterback-shared'

import { CustomError, log, prisma } from '$common'

export const docService = {
  async findDocument(id: string): Promise<Event<ManuscriptDocWithSnapshots>> {
    const found = await prisma.manuscriptDoc.findUnique({
      where: {
        id,
      },
      include: {
        snapshots: {
          select: {
            id: true,
            name: true,
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
  ): Promise<Event<ManuscriptDocWithSnapshots>> {
    const saved = await prisma.manuscriptDoc.create({
      data: {
        id: payload.manuscript_model_id,
        manuscript_model_id: payload.manuscript_model_id,
        user_model_id: userId,
        project_model_id: payload.project_model_id,
      },
    })
    return { ok: true, data: { ...saved, snapshots: [] } }
  },
  async deleteDocument(docId: string): Promise<Event<ManuscriptDoc>> {
    const deleted = await prisma.manuscriptDoc.delete({
      where: {
        id: docId,
      },
    })
    return { ok: true, data: deleted }
  },
}
