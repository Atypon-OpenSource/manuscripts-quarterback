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
  IListDocumentsResponse,
  ICreateDocRequest,
  ICreateDocResponse,
  IGetDocumentResponse,
  IUpdateDocRequest,
} from '@manuscripts/examples-track-shared'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { IAuthRequest, IRequest } from '$typings/request'

import { docService } from './doc.svc'

export const listDocuments = async (
  req: IAuthRequest,
  res: Response<IListDocumentsResponse>,
  next: NextFunction
) => {
  try {
    const result = await docService.listDocuments()
    if (result.ok) {
      res.json({
        docs: result.data,
      })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const getDocument = async (
  req: IAuthRequest,
  res: Response<IGetDocumentResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.getDocument(documentId)
    if (result.ok) {
      res.json(result.data)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const createDocument = async (
  req: IAuthRequest<ICreateDocRequest>,
  res: Response<ICreateDocResponse>,
  next: NextFunction
) => {
  try {
    const result = await docService.createDocument(req.body, res.locals.user.id)
    if (result.ok) {
      res.json(result.data)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const updateDocument = async (
  req: IAuthRequest<IUpdateDocRequest, { documentId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.updateDocument(documentId, req.body)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteDocument = async (
  req: IAuthRequest<Record<string, never>, { documentId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.deleteDocument(documentId)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const openDocument = async (
  req: IAuthRequest<Record<string, never>, { documentId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await docService.openDocument(documentId, res.locals.user.id)
    if (result.ok) {
      res.setHeader('Content-Type', 'application/octet-stream')
      res.write(result.data, 'binary')
      res.end(null, 'binary')
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}
