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
  IUpdateSnapshotRequest
} from '@manuscripts/quarterback-shared'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { IAuthRequest, IRequest } from '$typings/request'

import { snapService } from './snap.svc'

export const listSnapshotLabels = async (
  req: IAuthRequest<Record<string, never>, { documentId: string }>,
  res: Response<IGetSnapshotLabelsResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await snapService.listSnapshotLabels(documentId)
    if (result.ok) {
      res.json({ labels: result.data })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const getSnapshot = async (
  req: IAuthRequest<Record<string, never>, { snapshotId: string }>,
  res: Response<IGetSnapshotResponse>,
  next: NextFunction
) => {
  try {
    const { snapshotId } = req.params
    const result = await snapService.getSnapshot(snapshotId)
    if (result.ok) {
      res.json(result.data)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const saveSnapshot = async (
  req: IAuthRequest<ISaveSnapshotRequest>,
  res: Response<ISaveSnapshotResponse>,
  next: NextFunction
) => {
  try {
    const result = await snapService.saveSnapshot(req.body)
    if (result.ok) {
      res.json({ snapshot: result.data })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const updateSnapshot = async (
  req: IAuthRequest<IUpdateSnapshotRequest, { snapshotId: string }>,
  res: Response,
  next: NextFunction
) => {
  try {
    const { snapshotId } = req.params
    const result = await snapService.updateSnapshot(snapshotId, req.body)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteSnapshot = async (
  req: IAuthRequest<Record<string, never>, { snapshotId: string }>,
  res: Response<ISaveSnapshotResponse>,
  next: NextFunction
) => {
  try {
    const { snapshotId } = req.params
    const result = await snapService.deleteSnapshot(snapshotId)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}
