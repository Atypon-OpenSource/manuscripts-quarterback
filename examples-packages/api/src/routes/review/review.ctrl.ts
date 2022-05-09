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
  IGetReviewLabelsResponse,
  IGetReviewResponse,
  ICreateReviewResponse,
  ICreateReviewRequest,
} from '@manuscripts/examples-track-shared'
import { NextFunction } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { reviewService } from './review.svc'

export const listReviewLabels = async (
  req: AuthRequest<Record<string, never>, { documentId: string }>,
  res: AuthResponse<IGetReviewLabelsResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await reviewService.listReviewLabels(documentId)
    if (result.ok) {
      res.json({ labels: result.data })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const getReview = async (
  req: AuthRequest<Record<string, never>, { reviewId: string }>,
  res: AuthResponse<IGetReviewResponse>,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.params
    const result = await reviewService.getReview(reviewId)
    if (result.ok) {
      res.json(result.data)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const createReview = async (
  req: AuthRequest<ICreateReviewRequest>,
  res: AuthResponse<ICreateReviewResponse>,
  next: NextFunction
) => {
  try {
    const userId = res.locals.user.id
    console.log(res.locals)
    const result = await reviewService.createReview(req.body, userId)
    if (result.ok) {
      res.json({ review: result.data })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const finishReview = async (
  req: AuthRequest<{}, { reviewId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.params
    const result = await reviewService.finishReview(reviewId)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteReview = async (
  req: AuthRequest<Record<string, never>, { reviewId: string }>,
  res: AuthResponse,
  next: NextFunction
) => {
  try {
    const { reviewId } = req.params
    const result = await reviewService.deleteReview(reviewId)
    if (result.ok) {
      res.sendStatus(200)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}
