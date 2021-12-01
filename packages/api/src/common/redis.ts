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
import Redis from 'ioredis'

import { config } from './config'

export const createRedisClient = () =>
  new Redis(config.REDIS.URL, {
    // Heroku specific hack. Since it uses self-signed certificates or something alike
    // this must be specified when ran inside Heroku (aka. production)
    // Locally it be must unset (not even set true) because it then sets other options
    // that break something else.
    ...(config.ENV === 'production' && {
      tls: {
        rejectUnauthorized: false,
      },
    }),
  })
