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
import { Doc, JsonValue } from '@manuscripts/quarterback-types'
import { Step } from 'prosemirror-transform'
import { docService } from './doc.svc'
import { schema } from '@manuscripts/transform'
import { ManuscriptDocHistory } from '@manuscripts/quarterback-db'

export class CollaborationProcessor {
  async receiveSteps(
    documentId: string,
    steps: JsonValue[],
    clientId: string,
    clientVersion: number
  ) {
    const document = await docService.findDocument(documentId)
    if (!document.data) {
      return { err: 'Document not found', code: 404 }
    }
    const mergedHistories = await this.getMergedHistories(documentId)
    if (!mergedHistories.data) {
      return { err: 'History not found', code: 404 }
    }
    const version = mergedHistories.data.version || 0
    if (version != clientVersion) {
      return {
        err: `Update denied, version is ${version}, and client version is ${clientVersion}`,
        code: 409,
      }
    }
    const updatedVersion = await this.applyStepsToDocument(steps, document, version)
    await docService.createDocumentHistory(
      document.data.manuscript_model_id,
      steps,
      updatedVersion,
      clientId
    )
    return {
      data: convertIdsToNumbers(mergedHistories.data.clientIds),
    }
  }

  private async applyStepsToDocument(jsonSteps: JsonValue[], document: Doc, version: number) {
    const steps = hydrateSteps(jsonSteps)
    let pmDocument = schema.nodeFromJSON(document.data.doc)
    steps.forEach((step: Step) => {
      pmDocument = step.apply(pmDocument).doc || pmDocument
    })
    version += steps.length
    await docService.updateDocument(document.data.manuscript_model_id, {
      doc: pmDocument.toJSON(),
    })
    return version
  }

  private mergeHistories(histories: ManuscriptDocHistory[]) {
    let steps: JsonValue[] = []
    let clientIds: string[] = []

    for (const history of histories) {
      steps = steps.concat(history.steps)
      clientIds = clientIds.concat(Array(history.steps.length).fill(history.client_id))
    }
    const version = steps.length
    return {
      steps: steps,
      clientIds: clientIds,
      version,
    }
  }
  private async getMergedHistories(documentId: string) {
    const histories = await docService.findAllDocumentHistories(documentId)
    if (!histories.data) {
      return { err: 'History not found', code: 404 }
    }
    return { data: this.mergeHistories(histories.data) }
  }

  async getDocumentHistory(documentId: string) {
    const document = await docService.findDocument(documentId)
    if (!document.data) {
      return { err: 'Document not found', code: 404 }
    }
    const mergedHistories = await this.getMergedHistories(documentId)
    if (!mergedHistories.data) {
      return { err: 'History not found', code: 404 }
    }
    return {
      data: {
        steps: hydrateSteps(mergedHistories.data.steps),
        clientIDs: convertIdsToNumbers(mergedHistories.data.clientIds),
        version: mergedHistories.data.version,
        doc: document.data.doc || undefined,
      },
    }
  }
  async getDataFromVersion(documentId: string, versionId: string) {
    const mergedHistories = await this.getMergedHistories(documentId)
    if (!mergedHistories.data) {
      return { err: 'History not found', code: 404 }
    }
    const steps = hydrateSteps(mergedHistories.data.steps).slice(parseInt(versionId))
    const clientIDs = convertIdsToNumbers(mergedHistories.data.clientIds.slice(parseInt(versionId)))
    const data = {
      steps: steps,
      clientIDs: clientIDs,
      version: mergedHistories.data.version,
    }
    return {
      data: data,
    }
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
  return jsonSteps.map((step: JsonValue) => Step.fromJSON(schema, step)) as Step[]
}
