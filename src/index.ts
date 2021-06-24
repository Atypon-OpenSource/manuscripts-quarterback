/*!
 * The contents of this file are subject to the Common Public Attribution License Version 1.0 (the “License”); you may not use this file except in compliance with the License. You may obtain a copy of the License at https://mpapp-public.gitlab.io/manuscripts-frontend/LICENSE. The License is based on the Mozilla Public License Version 1.1 but Sections 14 and 15 have been added to cover use of software over a computer network and provide for limited attribution for the Original Developer. In addition, Exhibit A has been modified to be consistent with Exhibit B.
 *
 * Software distributed under the License is distributed on an “AS IS” basis, WITHOUT WARRANTY OF ANY KIND, either express or implied. See the License for the specific language governing rights and limitations under the License.
 *
 * The Original Code is manuscripts-frontend.
 *
 * The Original Developer is the Initial Developer. The Initial Developer of the Original Code is Atypon Systems LLC.
 *
 * All portions of the code written by Atypon Systems LLC are Copyright (c) 2019 Atypon Systems LLC. All Rights Reserved.
 */

import errorHandler from 'errorhandler'
import express from 'express'
import { getReasonPhrase, getStatusCode } from 'http-status-codes'

import { getOk, View } from './views'

interface Config {
  port: number
  nodeEnv: 'development' | 'test' | 'production'
}

const wrapView =
  (view: View) =>
  (
    req: Express.Request,
    res: Record<string, any>,
    next: (err?: Error) => void
  ) => {
    return (
      view(req)
        .then((json) => {
          res.json(json)
        })
        /* eslint-disable-next-line promise/no-callback-in-promise */
        .catch(next)
    )
  }

export default (config: Config) => {
  const app = express()

  app.use(express.json())

  app.get('/', wrapView(getOk))

  /**
   * Error Handler.
   */
  if (['development', 'test'].includes(config.nodeEnv)) {
    // only use in development
    app.use(errorHandler())
  } else {
    app.use(
      (
        err: Error,
        _: Express.Request,
        res: Record<string, any>,
        next: (err?: Error) => void
      ) => {
        // eslint-disable-next-line no-console
        console.error(err)

        const statusCode = getStatusCode(err.message)

        if (statusCode) {
          res.status(statusCode)
          res.json({
            ok: false,
            message: getReasonPhrase(err.message),
          })
        } else if (err) {
          res.status(500).send({
            ok: false,
            message: 'Internal Server Error',
          })
        } else {
          next()
        }
      }
    )
  }

  // catch 404 (route level)
  app.use((_, res) => {
    res.status(404).json({
      ok: false,
      message: 'URL route not defined',
    })
  })

  return app
}
