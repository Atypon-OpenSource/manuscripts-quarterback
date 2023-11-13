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
import {
  RequestQueueItem,
} from '@manuscripts/quarterback-types'
import { NextFunction } from 'express-serve-static-core'
import { AuthRequest, AuthResponse } from 'src/typings/request'
import { getStepsFromVersion, receiveSteps, getDocumentHistory } from './routes/doc/doc.ctrl'
import { saveSnapshot } from './routes/snapshot/snap.ctrl'

const queue: RequestQueueItem[] = []

export const queueRequests = async (req: AuthRequest<unknown>, res: AuthResponse<unknown>, next: NextFunction) => {
  queue.push({ req, res, next })

  if (queue.length === 1) {
    await processNextRequest()
  }
}

const processNextRequest = async () => {
  const request = queue.shift()
  if (request) {
    const { req, res, next } = request
    const { url } = req
    switch (true) {
      case url.includes('version'):
        await getStepsFromVersion(req, res, next)
        break
      case url.includes('steps'):
        await receiveSteps(req, res, next)
        break
      case url.includes('history'):
        await getDocumentHistory(req, res, next)
        break
      case url.includes('snapshot'):
        await saveSnapshot(req, res, next)
        break
    }
    if (queue.length > 0) {
      await processNextRequest()
    }
  }
}