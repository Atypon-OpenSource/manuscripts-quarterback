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
    exports.config({
      // For some reason CORS_SAME_ORIGIN is not parsed otherwise
      override: true,
    })
  })
}

function parseNodeEnv(NODE_ENV?: string): 'production' | 'dev' {
  if (NODE_ENV === 'production') {
    return 'production'
  }
  return 'dev'
}

function parseInteger(env?: string) {
  try {
    return parseInt(env || '')
  } catch (err) {}
  return undefined
}

function parseStringArray(env?: string): string[] | undefined {
  try {
    const parsed = JSON.parse(env || '')
    if (Array.isArray(parsed) && parsed.every((s) => typeof s === 'string')) {
      return parsed
    }
    console.error('config.ts: Provided environment variable was not a string array!', parsed)
  } catch (err) {}
  return undefined
}

export const config = {
  ENV: parseNodeEnv(process.env.NODE_ENV),
  PORT: parseInteger(process.env.PORT) || 5500,
  API_KEY: process.env.API_KEY || 'something-random',
  CORS: {
    ENABLED: parseInteger(process.env.CORS_ENABLED) === 1,
    WHITELIST: parseStringArray(process.env.CORS_WHITELIST) || [],
  },
  LOG: {
    LEVEL: process.env.LOG_LEVEL || 'info',
  },
}
