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
  IGetReviewsResponse,
  IGetReviewResponse,
  ICreateReviewResponse,
  ICreateReviewRequest,
  IFinishReviewRequest,
  IFinishReviewResponse,
  IDeleteReviewResponse,
} from '@manuscripts/examples-track-shared'
import { NextFunction } from 'express'
import Joi from 'joi'

import { CustomError } from '$common'
import { AuthRequest, AuthResponse } from '$typings/request'

import { reviewService } from './review.svc'

export const listReviews = async (
  req: AuthRequest<Record<string, never>, { documentId: string }>,
  res: AuthResponse<IGetReviewsResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const result = await reviewService.listReviews(documentId)
    if (result.ok) {
      res.json({ reviews: result.data })
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
  req: AuthRequest<ICreateReviewRequest, { documentId: string }>,
  res: AuthResponse<ICreateReviewResponse>,
  next: NextFunction
) => {
  try {
    const { documentId } = req.params
    const userId = res.locals.user.id
    const result = await reviewService.createReview(req.body, documentId, userId)
    if (result.ok) {
      res.json(result.data)
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const finishReview = async (
  req: AuthRequest<IFinishReviewRequest, { documentId: string, reviewId: string }>,
  res: AuthResponse<IFinishReviewResponse>,
  next: NextFunction
) => {
  try {
    const { documentId, reviewId } = req.params
    const result = await reviewService.finishReview(documentId, reviewId, req.body)
    if (result.ok) {
      res.json({ snapshot: result.data })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}

export const deleteReview = async (
  req: AuthRequest<Record<string, never>, { documentId: string, reviewId: string }>,
  res: AuthResponse<IDeleteReviewResponse>,
  next: NextFunction
) => {
  try {
    const { documentId, reviewId } = req.params
    const result = await reviewService.deleteReview(documentId, reviewId)
    if (result.ok) {
      res.json({ review: result.data })
    } else {
      next(new CustomError(result.error, result.status))
    }
  } catch (err) {
    next(err)
  }
}
