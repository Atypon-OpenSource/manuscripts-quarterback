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
import pkg, { Logger } from 'winston'
const { format, createLogger, transports } = pkg

import { config } from './config'

let logFormat
// Add colors in local environment
if (config.ENV === 'production') {
  logFormat = format.combine(format.json())
} else {
  logFormat = format.combine(format.colorize(), format.simple())
}

export const log: Logger = createLogger({
  level: config.LOG.LEVEL,
  format: logFormat,
  transports: [new transports.Console()],
  exitOnError: false,
})

export const logStream = {
  write: (message: string) => {
    log.info(message)
  },
}
