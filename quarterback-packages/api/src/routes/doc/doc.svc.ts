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
  IUpdateDocumentHistoryRequest,
  IUpdateDocumentRequest,
  ManuscriptDoc,
  ManuscriptDocWithSnapshots,
  ManuscriptDocHistory,
  Maybe,
} from '@manuscripts/quarterback-types'
import { schema } from '@manuscripts/transform'
import { Step } from 'prosemirror-transform'

import { prisma } from '../../common'

export const docService = {
  async updateDocumentHistory(
    docId: string,
    payload: IUpdateDocumentHistoryRequest
  ): Promise<Maybe<ManuscriptDocHistory>> {
    const saved = await prisma.manuscriptDocHistory.update({
      data: payload,
      where: {
        doc_id: docId,
      },
    })
    return { data: saved }
  },

  async findDocumentHistory(id: string): Promise<Maybe<ManuscriptDocHistory>> {
    const data = await prisma.manuscriptDocHistory.findUnique({
      where: {
        doc_id: id,
      },
    })
    if (!data) {
      return { err: 'Document not found', code: 404 }
    }
    return { data: data }
  },

  async findDocument(id: string): Promise<Maybe<ManuscriptDoc>> {
    const data = await prisma.manuscriptDoc.findUnique({
      where: {
        manuscript_model_id: id,
      },
    })
    if (!data) {
      return { err: 'Document not found', code: 404 }
    }
    return { data: data }
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
  async deleteDocument(docId: string): Promise<Maybe<ManuscriptDoc>> {
    const deleted = await prisma.manuscriptDoc.delete({
      where: {
        manuscript_model_id: docId,
      },
    })
    return { data: deleted }
  },
}

export class CollaborationProcessor {
  async processCollaborationSteps(
    documentId: string,
    steps: Step[],
    clientId: number,
    clientVersion: number
  ) {
    const document = await docService.findDocument(documentId)
    const documentHistory = await docService.findDocumentHistory(documentId)
    if ('err' in document || 'err' in documentHistory) {
      return { err: 'Document not found', code: 404 }
    }

    const { version } = document.data
    if (version != clientVersion) {
      return { err: 'Version is behind', code: 409 }
    }
    const pmDocument = this.applyStepsToDocument(steps, documentHistory.data, document.data)

    await docService.updateDocument(documentId, {
      doc: pmDocument,
      version: clientVersion,
    })

    documentHistory.data.client_ids.push(clientId)
    await docService.updateDocumentHistory(documentId, documentHistory.data)

    return {
      data: {
        clientIds: documentHistory.data.client_ids,
      },
    }
  }
  private applyStepsToDocument(
    steps: Step[],
    documentHistory: ManuscriptDocHistory,
    document: ManuscriptDoc
  ) {
    let pmDocument = schema.nodeFromJSON(document.doc)
    steps.forEach((jsonStep: Step) => {
      const step = Step.fromJSON(schema, jsonStep)
      pmDocument = step.apply(pmDocument).doc || pmDocument
      documentHistory.steps.push(step.toJSON())
    })
    return pmDocument
  }
  async initializeStepsEventHandler(documentId: string) {
    const documentHistory = await docService.findDocumentHistory(documentId)
    if ('data' in documentHistory) {
      const initialEventData = `data: ${JSON.stringify(documentHistory.data)}\n\n`
      const clientId = Date.now()
      return { initialEventData: initialEventData, clientId }
    } else {
      return { err: 'Document history not found', code: 404 }
    }
  }
  async getDataOfVersion(documentId: string, versionId: string) {
    const documentHistory = await docService.findDocumentHistory(documentId)
    const document = await docService.findDocument(documentId)
    if ('data' in documentHistory && 'data' in document) {
      return {
        data: {
          steps: documentHistory.data.steps.slice(parseInt(versionId)),
          clientIds: documentHistory.data.client_ids.slice(parseInt(versionId)),
          version: document.data.version,
        },
      }
    }
    return { err: 'Document history not found', code: 404 }
  }
}
