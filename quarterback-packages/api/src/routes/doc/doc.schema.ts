/*!
 * © 2023 Atypon Systems LLC
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

import Joi from 'joi'
export const receiveStepsSchema: Joi.SchemaMap = {
  params: Joi.object({
    documentId: Joi.string().required(),
  }),
  body: Joi.object({
    steps: Joi.array().items(Joi.object()),
    clientId: Joi.number().required(),
    version: Joi.number().required(),
  }),
}
export const listenSchema: Joi.SchemaMap = {
  params: Joi.object({
    documentId: Joi.string().required(),
  }),
}
export const getDocOfVersionSchema: Joi.SchemaMap = {
  params: Joi.object({
    documentId: Joi.string().required(),
  }),
  body: Joi.object({
    versionId: Joi.number().required(),
  }),
}
