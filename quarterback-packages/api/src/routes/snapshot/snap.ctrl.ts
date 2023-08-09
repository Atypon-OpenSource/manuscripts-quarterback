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
  IGetSnapshotLabelsResponse,
  IGetSnapshotResponse,
  ISaveSnapshotResponse,
  ISaveSnapshotRequest,
} from '@manuscripts/quarterback-types'
import { NextFunction } from 'express'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { snapService } from './snap.svc'
import { docService } from '../doc/doc.svc'

export const listSnapshotLabels = async (
  req: AuthRequest<Record<string, never>, { documentId: string }>,
  res: AuthResponse<IGetSnapshotLabelsResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await snapService.listSnapshotLabels(documentId)
    if ('data' in result) {
      res.json({ labels: result.data })
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export const getSnapshot = async (
  req: AuthRequest<Record<string, never>, { snapshotId: string }>,
  res: AuthResponse<IGetSnapshotResponse>,
  next: NextFunction
) => {
  try {
    const { snapshotId } = req.params
    const result = await snapService.getSnapshot(snapshotId)
    if ('data' in result) {
      res.json(result.data)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export const saveSnapshot = async (
  req: AuthRequest<ISaveSnapshotRequest>,
  res: AuthResponse<ISaveSnapshotResponse>,
  next: NextFunction
) => {
  try {
    const payload: ISaveSnapshotRequest = req.body
    const document: any = await docService.findDocument(payload.docId)
    if (!document) {
      next(new CustomError("Document not found"))
    }
    const result = await snapService.saveSnapshot(payload, document.data.doc)
    if ('data' in result) {
      res.json({ snapshot: result.data })
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteSnapshot = async (
  req: AuthRequest<Record<string, never>, { snapshotId: string }>,
  res: AuthResponse<ISaveSnapshotResponse>,
  next: NextFunction
) => {
  try {
    const { snapshotId } = req.params
    const result = await snapService.deleteSnapshot(snapshotId)
    if ('data' in result) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.err, result.code))
    }
  } catch (err) {
    next(err)
  }
}
