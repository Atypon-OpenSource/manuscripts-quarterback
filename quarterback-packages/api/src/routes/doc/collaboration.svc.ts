/*!
 * © 2023 Atypon Systems LLC
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
  ManuscriptDoc,
  ManuscriptDocHistory,
  Client,
  StepsData,
} from '@manuscripts/quarterback-types'
import { Step } from 'prosemirror-transform'
import { docService } from './doc.svc'
import { schema } from '@manuscripts/transform'

export class CollaborationProcessor {
  private _documentClientsMap = new Map<string, Client[]>()
  get documentsClientsMap() {
    return this._documentClientsMap
  }
  addClient(newClient: Client, documentId: string) {
    const clients = this._documentClientsMap.get(documentId) || []
    clients.push(newClient)
    this._documentClientsMap.set(documentId, clients)
  }

  sendDataToClients(data: StepsData, documentId: string) {
    const clientsForDocument = this._documentClientsMap.get(documentId)
    clientsForDocument?.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`)
    })
  }
  removeClientById(clientId: number, documentId: string): void {
    const clients = this._documentClientsMap.get(documentId) || []
    const index = clients.findIndex((client) => client.id === clientId)
    if (index !== -1) {
      clients.splice(index)
      this._documentClientsMap.set(documentId, clients)
    }
  }

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

    if (version > clientVersion) {
      return { err: 'Version is behind', code: 409 }
    }
    const pmDocument = this.applyStepsToDocument(
      steps,
      documentHistory.data,
      document.data,
      clientId
    )
    await docService.updateDocument(documentId, {
      doc: pmDocument.toJSON(),
      version: clientVersion,
    })
    await docService.updateDocumentHistory(documentId, {
      client_ids: documentHistory.data.client_ids,
      steps: documentHistory.data.steps,
    })
    return {
      data: {
        clientIDs: documentHistory.data.client_ids,
      },
    }
  }

  private applyStepsToDocument(
    steps: Step[],
    documentHistoryData: ManuscriptDocHistory,
    documentData: ManuscriptDoc,
    clientId: number
  ) {
    let pmDocument = schema.nodeFromJSON(documentData.doc)
    steps.forEach((jsonStep: Step) => {
      const step = Step.fromJSON(schema, jsonStep)
      pmDocument = step.apply(pmDocument).doc || pmDocument
      documentHistoryData.steps.push(step.toJSON())
      documentHistoryData.client_ids.push(clientId)
    })
    return pmDocument
  }

  async initializeStepsEventHandler(documentId: string) {
    const document = await docService.findDocument(documentId)
    const documentHistory = await docService.findDocumentHistory(documentId)
    let historyData
    if ('err' in documentHistory) {
      historyData = {
        steps: [],
        clientIDs: [],
        version: 0,
        doc: undefined,
      }
    }
    if ('data' in document && 'data' in documentHistory) {
      historyData = {
        steps: documentHistory.data.steps,
        clientIDs: documentHistory.data.client_ids,
        version: document.data.version,
        doc: document.data.doc,
      }
    }
    const initialData = `data: ${JSON.stringify(historyData)}\n\n`
    return initialData
  }
  async getDataOfVersion(documentId: string, versionId: string) {
    const documentHistory = await docService.findDocumentHistory(documentId)
    const document = await docService.findDocument(documentId)

    if ('data' in documentHistory && 'data' in document) {
      const data = {
        steps: documentHistory.data.steps.slice(parseInt(versionId)),
        clientIDs: documentHistory.data.client_ids.slice(parseInt(versionId)),
        version: document.data.version,
      }
      return {
        data: data,
      }
    }
    return { err: 'Document history not found', code: 404 }
  }
}
