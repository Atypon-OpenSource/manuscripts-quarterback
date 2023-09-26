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
  ICreateDocResponse,
  IGetDocumentResponse,
  IUpdateDocumentRequest,
  StepsSince,
} from '@manuscripts/quarterback-types'
import { NextFunction } from 'express'
import { Step } from 'prosemirror-transform'

import { CustomError } from '../../common'
import { AuthRequest, AuthResponse } from '../../typings/request'
import { docService, CollaborationProcessor } from './doc.svc'

const collaborationProcessor = new CollaborationProcessor()
export const findDocument = async (
  req: AuthRequest,
  res: AuthResponse<IGetDocumentResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.findDocumentWithSnapshot(documentId)
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

export const receiveSteps = async (
  req: AuthRequest<any>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const steps = req.body.steps as Step[]
    const clientId = req.body.clientId as number
    const clientVersion = req.body.version as number

    const document = await collaborationProcessor.processCollaborationSteps(
      documentId,
      steps,
      clientId,
      clientVersion
    )
    if (document.data) {
      res.sendStatus(200)
      collaborationProcessor.sendDataToClients(
        {
          steps: steps,
          clientIds: document.data.clientIds,
          version: clientVersion,
        },
        documentId
      )
    } else {
      next(new CustomError(document.err, document.code))
    }
  } catch (err) {
    next(err)
  }
}
export const stepsEventHandler = async (
  req: AuthRequest,
  res: AuthResponse<string>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const initialData = await collaborationProcessor.initializeStepsEventHandler(documentId)
    if (initialData.err) {
      next(new CustomError(initialData.err, initialData.code))
    }
    res.setHeader('Content-Type', 'text/event-stream')
    res.setHeader('Connection', 'keep-alive')
    res.setHeader('Cache-Control', 'no-cache')
    res.status(200).write(initialData)
    const clientId = Date.now()

    const newClient = {
      id: clientId,
      res,
    }
    collaborationProcessor.addClient(newClient, documentId)
    req.on('close', () => {
      collaborationProcessor.removeClientById(newClient.id, documentId)
    })
  } catch (err) {
    next(err)
  }
}
export const getDocOfVersion = async (
  req: AuthRequest,
  res: AuthResponse<StepsSince>,
  next: NextFunction
) => {
  try {
    const { documentId, versionId } = req.params
    const document = await collaborationProcessor.getDataOfVersion(documentId, versionId)
    if (document.err) {
      next(new CustomError(document.err, document.code))
    }
    if (document.data) {
      res.json(document.data)
    }
  } catch (err) {
    next(err)
  }
}
