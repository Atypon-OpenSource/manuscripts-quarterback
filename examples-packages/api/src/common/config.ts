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
if (process.env.NODE_ENV === undefined || process.env.NODE_ENV !== 'production') {
  await import('dotenv').then((exports) => {
    exports.config()
  })
}

function parseNodeEnv(NODE_ENV?: string): 'production' | 'dev' {
  if (NODE_ENV === 'production') {
    return 'production'
  }
  return 'dev'
}

export const config = {
  ENV: parseNodeEnv(process.env.NODE_ENV),
  PORT: parseInt(process.env.PORT || '') || 5070,
  LOG: {
    LEVEL: process.env.LOG_LEVEL || 'info',
  },
  JWT: {
    SECRET: process.env.JWT_SECRET || 'verylongrandomstring',
  },
  POSTGRES: {
    USER: process.env.POSTGRES_USER || 'pg-user',
    PASSWORD: process.env.POSTGRES_PASSWORD || 'my-pg-password',
    HOST: process.env.POSTGRES_HOST || 'localhost',
    PORT: parseInt(process.env.POSTGRES_PORT || '') || 5432,
    DB: process.env.POSTGRES_DB || 'my_postgres_db',
  },
  REDIS: {
    URL: process.env.REDIS_URL || '',
  },
}
