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
import { app } from './app'
import { config } from './common/config'
import { log } from './common/logger'
import { YjsServer } from './yjs/YjsServer'

const server = app.listen(config.PORT, () => {
  log.info(`Collab server started at port: ${config.PORT}`)
})

const yjsServer = new YjsServer()
yjsServer.start(server)

process.on('exit', () => {
  yjsServer.destroy()
  log.info('Shutting down server')
})
