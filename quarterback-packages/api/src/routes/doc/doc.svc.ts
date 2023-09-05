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
  ManuscriptDoc,
  ManuscriptDocWithSnapshots,
  ICreateDocRequest,
  IUpdateDocumentRequest,
} from '@manuscripts/quarterback-types'
import { schema } from '@manuscripts/transform'
import { Step } from "prosemirror-transform"

import { CustomError, log, prisma } from '$common'
import {createDocumentStorage, getDocumentHistory} from "$common/redix.svc";

const documentStorage = createDocumentStorage()
export const docService = {

  async processCollaborationSteps(document: { data: any }, documentId: string, steps: Step[], clientId: number, clientVersion: number) {
    const documentData = await getDocumentHistory(documentId)
    let pmDocument = documentData.doc || schema.nodeFromJSON(document.data.doc)
    steps.forEach((jsonStep: Step) => {
      // @ts-ignore
      const step = Step.fromJSON(schema, jsonStep)
      pmDocument = step.apply(pmDocument).doc || pmDocument
      documentData.steps.push(step)
      documentData.clientIds.push(clientId)
    })
    documentData.version = clientVersion
    documentData.doc = pmDocument
    await documentStorage.set(documentId, documentData)
    await docService.updateDocument(documentId, {doc: pmDocument.toJSON()})
    return documentData
  },
  async initializeStepsEventHandler(documentId:string){
    const documentHistory = await getDocumentHistory(documentId)
    const initialEventData = `data: ${JSON.stringify(documentHistory)}\n\n`
    const clientId = Date.now()
    return {initialEventData: initialEventData, clientId}
  },
  async getDataOfVersion(documentId: string, versionId: string) {
    const document = await documentStorage.get(documentId)
    if (document) {
      const data = {
        // get all changes starting from the versionId
        steps: document.steps.slice(parseInt(versionId)),
        clientIds: document.clientIds.slice(parseInt(versionId)),
        version: document.version,
      }
      return data
    }
    return null
  },

  async findDocument(id: string): Promise<Maybe<ManuscriptDocWithSnapshots>> {
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

