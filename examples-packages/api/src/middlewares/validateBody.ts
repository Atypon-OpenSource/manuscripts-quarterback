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
import { NextFunction, Response } from 'express'
import { ObjectSchema } from 'joi'

import { ValidationError } from '$common/error'
import { log } from '$common/logger'
import { AnyRequest } from '$typings/request'

export const validateBody =
  (schema: ObjectSchema) => async (req: AnyRequest, res: Response, next: NextFunction) => {
    const { body } = req

    const result = schema.strict().validate(body)
    log.debug('parsed JSON body', result)
    if (result.error) {
      next(new ValidationError(result.error.message))
    } else {
      await next()
    }
  }
