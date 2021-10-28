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

import { CustomError, jwtService } from '$common'

function parseJwtFromHeaders(req: Request) {
  if (
    req.headers.authorization &&
    req.headers.authorization.toLowerCase().includes('bearer')
  ) {
    return req.headers.authorization.split(' ')[1]
  }
  return null
}

export const authenticate = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const jwtToken = parseJwtFromHeaders(req)
  if (!jwtToken) {
    // Without return this method would continue processing and generate TWO errors
    // of which the next one wouldn't get caught by the errorHandler
    // -> always remember to return next() inside if
    return next(
      new CustomError('Missing authorization header with Bearer token', 401)
    )
  }
  const decrypted = jwtService.decryptSessionToken(jwtToken)
  if (!decrypted.ok) {
    next(new CustomError(decrypted.error, decrypted.status))
  } else {
    // const mutatedReq = req as IAuthRequest
    res.locals.user = decrypted.data.user
    next()
  }
}
