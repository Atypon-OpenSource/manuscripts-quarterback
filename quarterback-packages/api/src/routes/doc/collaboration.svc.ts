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
import { Client, StepsData } from '@manuscripts/quarterback-types'
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
    this.documentsClientsMap.set(documentId, clients)
  }

  sendDataToClients(data: StepsData, documentId: string) {
    const clientsForDocument = this.documentsClientsMap.get(documentId)
    clientsForDocument?.forEach((client) => {
      client.res.write(`data: ${JSON.stringify(data)}\n\n`)
    })
  }
  async removeClientById(clientId: number, documentId: string) {
    const clients = this.documentsClientsMap.get(documentId) || []
    const index = clients.findIndex((client) => client.id == clientId)
    if (index != -1) {
      clients.splice(index)
      this.documentsClientsMap.set(documentId, clients)
    }
  }

  async handleCollaborationSteps(
    documentId: string,
    steps: Step[],
    clientId: number,
    clientVersion: number
  ) {
    const document = await docService.findDocumentWithHistory(documentId)
    if (document.data?.history) {
      const { version } = document.data
      if (version != clientVersion) {
        return {
          version: version,
        }
      }
      const pmDocument = await this.applyStepsToDocument(steps, document, clientId)
      await docService.updateDocumentWithHistory(documentId, {
        doc: pmDocument,
        version: document.data.version,
        history: {
          steps: document.data.history.steps,
          client_ids: document.data.history.client_ids,
        },
      })
      const newClientIDs: string[] = convertIdsToStrings(document.data.history.client_ids)
      return {
        clientIDs: newClientIDs,
      }
    } else {
      return { err: 'Document not found', code: 404 }
    }
  }

  private async applyStepsToDocument(steps: Step[], document, clientId: number) {
    let pmDocument = schema.nodeFromJSON(document.data.doc)
    steps.forEach((jsonStep: Step) => {
      const step = Step.fromJSON(schema, jsonStep)
      pmDocument = step.apply(pmDocument).doc || pmDocument
      document.data.history.steps.push(step.toJSON())
      document.data.history.client_ids.push(clientId)
      document.data.version += 1
    })
    return pmDocument.toJSON()
  }

  async initializeStepsEventHandler(documentId: string) {
    const document = await docService.findDocumentWithHistory(documentId)
    const clientIDs = document.data?.history
      ? convertIdsToStrings(document.data.history.client_ids)
      : []
    const steps: Step[] = []
    document.data?.history?.steps.forEach((step) => {
      steps.push(Step.fromJSON(schema, step))
    })
    const historyData = {
      steps: steps || [],
      clientIDs: clientIDs || [],
      version: document.data?.version || 0,
      doc: document.data?.doc || undefined,
    }

    return `data: ${JSON.stringify(historyData)}\n\n`
  }
  async getDataOfVersion(documentId: string, versionId: string) {
    const document = await docService.findDocumentWithHistory(documentId)
    if (document.data?.history) {
      const clientIDs: string[] = convertIdsToStrings(
        document.data.history.client_ids.slice(parseInt(versionId))
      )
      const data = {
        steps: document.data.history.steps.slice(parseInt(versionId)),
        clientIDs: clientIDs,
        version: document.data.version,
      }
      return {
        data: data,
      }
    }
    return { err: 'Document history not found', code: 404 }
  }
}

const convertIdsToStrings = (ids: bigint[]) => {
  const newIds: string[] = []
  ids.forEach((id) => {
    newIds.push(id.toString())
  })
  return newIds
}
