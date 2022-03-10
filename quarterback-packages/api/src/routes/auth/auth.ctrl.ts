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
import { IAuthenticateParams } from '@manuscripts/quarterback-shared'
import { NextFunction, Request, Response } from 'express'
import Joi from 'joi'

import { CustomError, jwtService } from '$common'
import { IRequest } from '$typings/request'

import { authService } from './auth.svc'

export const AUTHENTICATE_SCHEMA = Joi.object({
  token: Joi.string().min(8).max(255).required(),
})

export const authenticate = async (req: IRequest<IAuthenticateParams>, res: Response, next: NextFunction) => {
  try {
    const user = await authService.authenticateUser(req.body)
    if (!user) {
      throw new CustomError('Authentication failed', 401)
    }
    const expires = jwtService.createSessionExpiration()
    res.json({
      user,
      jwt: {
        expires,
        token: jwtService.createSessionToken(user, expires),
      },
    })
  } catch (err) {
    next(err)
  }
}
