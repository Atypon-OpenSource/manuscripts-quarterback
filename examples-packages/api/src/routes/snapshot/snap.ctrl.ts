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
  IUpdateDocRequest,
} from '@manuscripts/examples-track-types'
import { NextFunction } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { snapService } from './snap.svc'

export const listSnapshotLabels = async (
  req: AuthRequest<Record<string, never>, { documentId: string }>,
  res: AuthResponse<IGetSnapshotLabelsResponse>,
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
  req: AuthRequest<Record<string, never>, { snapshotId: string }>,
  res: AuthResponse<IGetSnapshotResponse>,
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
  req: AuthRequest<ISaveSnapshotRequest>,
  res: AuthResponse<ISaveSnapshotResponse>,
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
  req: AuthRequest<IUpdateDocRequest, { snapshotId: string }>,
  res: AuthResponse,
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
  req: AuthRequest<Record<string, never>, { snapshotId: string }>,
  res: AuthResponse<ISaveSnapshotResponse>,
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
