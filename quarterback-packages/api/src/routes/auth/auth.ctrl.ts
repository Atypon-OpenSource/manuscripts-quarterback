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
import { IAuthenticateParams } from '@manuscripts/quarterback-types'
import { NextFunction, Response } from 'express'
import Joi from 'joi'

import { version } from '../../../package.json'
import { CustomError, jwtService } from '../../common'
import { IRequest } from '../../typings/request'
import { authService } from './auth.svc'

export const AUTHENTICATE_SCHEMA = Joi.object({
  token: Joi.string().min(8).max(255).required(),
})

export const authenticate = async (
  req: IRequest<IAuthenticateParams>,
  res: Response,
  next: NextFunction
) => {
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

export const stats = async (req: IRequest, res: Response, next: NextFunction) => {
  try {
    const up_s = process.uptime()
    const up_min = Math.floor(up_s / 60)
    const up_h = Math.floor(up_s / 60 / 60)
    const up_d = Math.floor(up_s / 60 / 60 / 24)
    const started = new Date(Date.now() - up_s * 1000)
    res.json({
      version,
      process: {
        started: started.toISOString(),
        up_seconds: Math.floor(up_s),
        up_minutes: up_min,
        up_hours: up_h,
        up_days: up_d,
      },
    })
  } catch (err) {
    next(err)
  }
}
