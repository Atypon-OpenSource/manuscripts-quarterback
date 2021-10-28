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
import { NextFunction, Request, Response } from 'express'

import { config } from '$common/config'
import { IError } from '$common/error'
import { log } from '$common/logger'

export function errorHandler(
  err: IError,
  req: Request,
  res: Response,
  next: NextFunction
): void {
  if (err) {
    const statusCode = err.statusCode ? err.statusCode : 500
    const message =
      statusCode === 500 ? 'Internal server error.' : 'Something went wrong.'
    const body: { message: string; stack?: string } = { message }
    if (statusCode === 500) {
      log.error('Handled internal server error:')
      log.error(err)
      log.error(err.stack || 'no stacktrace')
    } else {
      log.info('Handled error: ')
      log.info(err)
      log.debug(err.stack || 'no stacktrace')
    }
    if (config.ENV === 'local') {
      body.message = err.message
      body.stack = err.stack
    }
    res.status(statusCode).json(body)
  } else {
    next()
  }
}
