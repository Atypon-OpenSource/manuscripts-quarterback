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
  IListCommentsResponse,
  ICreateCommentRequest,
  ICreateCommentResponse,
  IUpdateCommentRequest,
} from '@manuscripts/examples-track-types'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { commentService } from './comment.svc'

export const listComments = async (
  req: AuthRequest<{}, { documentId: string }>,
  res: AuthResponse<IListCommentsResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await commentService.listComments(documentId)
    if (result.ok) {
      res.json({
        comments: result.data,
      })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const createComment = async (
  req: AuthRequest<ICreateCommentRequest>,
  res: AuthResponse<ICreateCommentResponse>,
  next: NextFunction
) => {
  try {
    const result = await commentService.createComment(req.body, res.locals.user.id)
    if (result.ok) {
      res.json(result.data)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const updateComment = async (
  req: AuthRequest<IUpdateCommentRequest, { commentId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params
    const result = await commentService.updateComment(commentId, req.body)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteComment = async (
  req: AuthRequest<Record<string, never>, { commentId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { commentId } = req.params
    const result = await commentService.deleteComment(commentId)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}
