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
import { JsonValue } from '@manuscripts/quarterback-types'
import { Step } from 'prosemirror-transform'
import { docService } from './doc.svc'
import { schema } from '@manuscripts/transform'

export class CollaborationProcessor {
  async receiveSteps(
    documentId: string,
    steps: JsonValue[],
    clientId: string,
    clientVersion: number
  ) {
    const document = await docService.findDocumentWithHistory(documentId)
    if (!document.data?.history) {
      return { err: 'Document not found', code: 404 }
    }
    const { version } = document.data
    if (version != clientVersion) {
      return {
        err: `Update denied, version is ${version}, and client version is ${clientVersion}`,
        code: 409,
      }
    }
    await this.applyStepsToDocument(steps, document, clientId)
    return {
      clientIDs: convertIdsToNumbers(document.data.history.client_ids),
    }
  }

  private async applyStepsToDocument(jsonSteps: JsonValue[], document: any, clientId: string) {
    const steps = hydrateSteps(jsonSteps)
    let pmDocument = schema.nodeFromJSON(document.data.doc)
    steps.forEach((step: Step) => {
      pmDocument = step.apply(pmDocument).doc || pmDocument
      document.data.history.steps.push(step.toJSON())
      document.data.history.client_ids.push(clientId)
      document.data.version += 1
    })

    await docService.updateDocumentWithHistory(document.data.manuscript_model_id, {
      doc: pmDocument.toJSON(),
      version: document.data.version,
      history: {
        steps: document.data.history.steps,
        client_ids: document.data.history.client_ids,
      },
    })
  }

  async getInitialData(documentId: string) {
    const document = await docService.findDocumentWithHistory(documentId)
    const historyData = {
      steps: document.data?.history ? hydrateSteps(document.data.history.steps) : [],
      clientIDs: document.data?.history
        ? convertIdsToNumbers(document.data.history.client_ids)
        : [],
      version: document.data?.version || 0,
      doc: document.data?.doc || undefined,
    }
    return `data: ${JSON.stringify(historyData)}\n\n`
  }
  async getDataFromVersion(documentId: string, versionId: string) {
    const document = await docService.findDocumentWithHistory(documentId)
    if (document.data?.history) {
      const data = {
        steps: hydrateSteps(document.data.history.steps).slice(parseInt(versionId)),
        clientIDs: convertIdsToNumbers(document.data.history.client_ids.slice(parseInt(versionId))),
        version: document.data.version,
      }
      return {
        data: data,
      }
    }
    return { err: 'Document history not found', code: 404 }
  }
}

const convertIdsToNumbers = (ids: string[]) => {
  const newIds: number[] = []
  ids.forEach((id) => {
    newIds.push(parseInt(id))
  })
  return newIds
}
const hydrateSteps = (jsonSteps: JsonValue[]): Step[] => {
  return jsonSteps.map((s: JsonValue) => Step.fromJSON(schema, s)) as Step[]
}
