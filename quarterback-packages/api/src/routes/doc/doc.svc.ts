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
  ICreateDocRequest,
  IUpdateDocumentRequest,
  ManuscriptDoc,
  ManuscriptDocWithSnapshots,
  Maybe,
  IUpdateDocumentWithHistoryRequest,
} from '@manuscripts/quarterback-types'
import { prisma } from '../../common'

export const docService = {
  async findDocumentWithHistory(id: string) {
    const found = await prisma.manuscriptDoc.findUnique({
      where: {
        manuscript_model_id: id,
      },
      include: {
        history: {
          select: {
            steps: true,
            client_ids: true,
          },
        },
      },
    })
    if (!found) {
      return { err: 'Document not found', code: 404 }
    }
    return { data: found }
  },
  async findDocumentWithSnapshot(id: string): Promise<Maybe<ManuscriptDocWithSnapshots>> {
    const found = await prisma.manuscriptDoc.findUnique({
      where: {
        manuscript_model_id: id,
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
      return { err: 'Document not found', code: 404 }
    }
    return { data: found }
  },

  async createDocument(
    payload: ICreateDocRequest,
    userId: string
  ): Promise<Maybe<ManuscriptDocWithSnapshots>> {
    const saved = await prisma.manuscriptDoc.create({
      data: {
        manuscript_model_id: payload.manuscript_model_id,
        user_model_id: userId,
        project_model_id: payload.project_model_id,
        doc: payload.doc,
        history: {
          create: {
            client_ids: [],
            steps: [],
          },
        },
      },
    })
    return { data: { ...saved, snapshots: [] } }
  },
  async updateDocument(
    docId: string,
    payload: IUpdateDocumentRequest
  ): Promise<Maybe<ManuscriptDoc>> {
    const saved = await prisma.manuscriptDoc.update({
      data: payload,
      where: {
        manuscript_model_id: docId,
      },
    })
    return { data: saved }
  },
  async updateDocumentWithHistory(docId: string, payload: IUpdateDocumentWithHistoryRequest) {
    const { history, ...restPayload } = payload
    const currentHistory = await prisma.manuscriptDoc
      .findUnique({
        where: {
          manuscript_model_id: docId,
        },
      })
      .history()
    const saved = await prisma.manuscriptDoc.update({
      data: {
        ...restPayload,
        history: {
          upsert: {
            create: {
              steps: history?.steps || [],
              client_ids: history?.client_ids || [],
            },
            update: {
              steps: history?.steps || currentHistory?.steps || [],
              client_ids: history?.client_ids || currentHistory?.client_ids || [],
            },
          },
        },
      },
      where: {
        manuscript_model_id: docId,
      },
    })

    return { data: saved }
  },
  async deleteDocument(docId: string): Promise<Maybe<ManuscriptDoc>> {
    const deleted = await prisma.manuscriptDoc.delete({
      where: {
        manuscript_model_id: docId,
      },
    })
    return { data: deleted }
  },
}
