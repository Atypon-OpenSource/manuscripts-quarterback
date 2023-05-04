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
import cors from 'cors'
import express from 'express'
import morgan from 'morgan'

import { config } from './common/config'
import { logStream, CustomError } from './common'
import { errorHandler } from './middlewares'
import routes from './routes'
import apiMetrics from 'prometheus-api-metrics'
import {configurePromClientRegistry} from "./PromClientRegistryConfig";

const app = express()

const corsOptions: cors.CorsOptions = {
  origin: function (origin, callback) {
    if (!config.CORS.ENABLED || (origin && config.CORS.WHITELIST.indexOf(origin) !== -1)) {
      callback(null, true)
    } else {
      callback(new CustomError('Not allowed by CORS', 403))
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
}

app.use(cors(corsOptions))
app.use(express.urlencoded({ extended: true }))
app.use(express.json({ limit: '10mb' }))
app.use(apiMetrics())

configurePromClientRegistry()

// By adding this route before morgan prevents it being logged which in production setting
// is annoying and pollutes the logs with gazillion "GET /health" lines
app.get('/health', (req: any, res: any) => {
  res.sendStatus(200)
})

app.use(morgan('short', { stream: logStream }))

app.use('', routes)
app.use(errorHandler)

export { app }
