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
import { schema } from '@manuscripts/transform'
import { Step } from 'prosemirror-transform'
import {
  IGetDocumentResponse,
  ICreateDocRequest,
  ICreateDocResponse,
  IUpdateDocumentRequest,
} from '@manuscripts/quarterback-types'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { CustomError } from '../../common'
import { AuthRequest, AuthResponse } from '../../typings/request'

import { docService } from './doc.svc'

export const findDocument = async (
  req: AuthRequest,
  res: AuthResponse<IGetDocumentResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.findDocument(documentId)
    if ('data' in result) {
      res.json(result.data)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export const createDocument = async (
  req: AuthRequest<ICreateDocRequest>,
  res: AuthResponse<ICreateDocResponse>,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id
    if (!userId) {
      return next(new CustomError('Missing user.id from res.locals', 401))
    }
    const result = await docService.createDocument(req.body, userId)
    if ('data' in result) {
      res.json(result.data)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export const updateDocument = async (
  req: AuthRequest<IUpdateDocumentRequest, { documentId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.updateDocument(documentId, req.body)
    if ('data' in result) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteDocument = async (
  req: AuthRequest<Record<string, never>, { documentId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.deleteDocument(documentId)
    if ('data' in result) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export type DocData = {
  steps: Step[]
  version: number
  clientIDs: number[]
  doc: any
}
const tempDocs = new Map<string, DocData>()
const getGlobalTemp = () => {
  return tempDocs
}

const getDocHistory = (docId: string) => {
  const temp = getGlobalTemp()
  const docData = temp.get(docId)
  if (!docData) {
    const template = {
      steps: [], // steps have to be dropped at some point
      clientIDs: [], // needs to be dropped along with steps
      version: 0,
      doc: undefined,
    }
    temp.set(docId, template)
    return template
  }
  return docData
}

export const receiveSteps = async (
  req: AuthRequest<any>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const newSteps = req.body.steps
    const clientID = req.body.clientID // clientID is not the same as userID, it's an ID of the client exactly (app instance running in the browser)
    const clientVersion = req.body.version // client the version on top of which it updates, in other words it says last version known to it

    const docSearch = await docService.findDocument(documentId)
    if ('data' in docSearch) {
      // @ts-ignore
      const { version } = docSearch.data

      // this is needed, commented for testing only
      if (version != clientVersion) {
        /*
        if client is based on an older version we deny his request. At some point in time client should receive update and will then
        resend his steps after rebasing them. Client will persist its steps.
        */
        return
      }

      const cachedItem = getDocHistory(documentId)

      let pmDoc = cachedItem.doc || schema.nodeFromJSON(docSearch.data.doc)

      newSteps.forEach((jsonStep) => {
        const step = Step.fromJSON(schema, jsonStep)
        pmDoc = step.apply(pmDoc).doc || pmDoc
        cachedItem.steps.push(step)
        cachedItem.clientIDs.push(clientID)
      })
      cachedItem.version = clientVersion
      cachedItem.doc = pmDoc

      // docService.updateDocument(documentId, {doc: pmDoc.toJSON()})
      res.sendStatus(200)

      // Signal server side listener
      sendStepsToAll({ steps: newSteps, clientIDs: cachedItem.clientIDs, version: clientVersion })
    } else {
      next(new CustomError('Unable to save steps', 500))
    }
  } catch (err) {
    next(err)
  }
}

function sendStepsToAll(data: unknown) {
  global.clients.forEach((client) => client.res.write(`data: ${JSON.stringify(data)}\n\n`))
}

export const stepsEventHandler = (
  req: AuthRequest,
  res: AuthResponse<string>,
  next: NextFunction
) => {
  const headers = {
    'Content-Type': 'text/event-stream',
    Connection: 'keep-alive',
    'Cache-Control': 'no-cache',
  }

  // initial response
  const { documentId } = req.params
  const historyData = getDocHistory(documentId)
  const data = `data: ${JSON.stringify(historyData)}\n\n`
  res.writeHead(200, headers)
  res.write(data)

  const clientId = Date.now()

  const newClient = {
    id: clientId,
    res,
  }
  global.clients.push(newClient)

  req.on('close', () => {
    console.log(`${clientId} Connection closed`)
    const index = global.clients.findIndex((client) => client.id == clientId)
    global.clients.splice(index)
  })
}

type StepsSince = {
  steps: unknown[] // json representaion of Step[]
  clientIDs: unknown[] // string or integer
  version: number
}

export const getVersion = (req: AuthRequest, res: AuthResponse<StepsSince>, next: NextFunction) => {
  try {
    const { documentId, versionId } = req.params
    const temp = getGlobalTemp()

    const item = temp.get(documentId)
    if (item) {
      const data = {
        steps: item.steps.slice(parseInt(versionId)),
        clientIDs: item.clientIDs.slice(parseInt(versionId)),
        version: item.version, // sending last version,
      }

      console.log('getVersion data')
      console.log(data)

      res.json(data)
    } else {
      console.log('item in temp not found, check id')
      res.sendStatus(404)
    }
  } catch (err) {
    next(err)
  }
}
