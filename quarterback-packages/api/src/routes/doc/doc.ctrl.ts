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
  StepsData,
} from '@manuscripts/quarterback-types'
import { NextFunction } from 'express'

import { CustomError } from '../../common'
import { AuthRequest, AuthResponse } from '../../typings/request'
import { docService } from './doc.svc'
import { CollaborationProcessor } from './collaboration.svc'

const collaborationProcessor = new CollaborationProcessor()

export const findDocument = async (req: AuthRequest, res: AuthResponse<IGetDocumentResponse>, next: NextFunction) => {
  try {
    const { documentId } = req.params
    const result = await docService.findDocumentWithSnapshot(documentId)
    const latestDocumentHistory = await docService.findLatestDocumentHistory(documentId)
    if ('data' in result) {
      const data = latestDocumentHistory.data
        ? { ...result.data, version: latestDocumentHistory.data.version, doc: result.data.doc }
        : result.data
      res.json(data)
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
export const receiveSteps = async (req: AuthRequest<any>, res: AuthResponse<any>, next: NextFunction) => {
  try {
    const { documentId } = req.params
    const steps = req.body.steps
    const clientId = req.body.clientID
    const clientVersion = req.body.version
    const result = await collaborationProcessor.receiveSteps(documentId, steps, clientId.toString(), clientVersion)
    if (result.data) {
      res.json({ clientIDs: result.data })
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}
export const getDocumentHistory = async (req: AuthRequest, res: AuthResponse<string>, next: NextFunction) => {
  try {
    const { documentId } = req.params
    const result = await collaborationProcessor.getDocumentHistory(documentId, 0)
    if (result.data) {
      const history = `data: ${JSON.stringify(result.data)}\n\n`
      res.json(history)    }
      else {
        next(new CustomError(result.err, result.code))
      }
 
  } catch (err) {
    next(err)
  }
}
export const getStepsFromVersion = async (req: AuthRequest, res: AuthResponse<StepsData>, next: NextFunction) => {
  try {
    const { documentId, versionId } = req.params
    const result = await collaborationProcessor.getDataFromVersion(documentId, versionId)
    if (result.data) {
      res.json(result.data)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}


