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
import pkg from 'jsonwebtoken'
const { sign, verify } = pkg

import { Maybe, User } from '@manuscripts/quarterback-types'

import { IJwtPayload } from '$typings/auth'

import { config } from './config'

const SECRET = config.JWT.SECRET

const ALGORITHM = 'HS512'
const EXPIRATION_IN_MILLIS = 86400000 * 14 // 2 weeks

// TODO use exp intead of custom expires property
export const jwtService = {
  createSessionToken(user: User, expires: number) {
    const payload = {
      expires,
      user,
    }
    return sign(payload, SECRET, { algorithm: ALGORITHM, expiresIn: expires })
  },
  decryptSessionToken(jwtToken: string): Maybe<IJwtPayload> {
    try {
      const decrypted = verify(jwtToken, SECRET) as IJwtPayload
      if (decrypted && decrypted.expires > Date.now()) {
        return { ok: true, data: decrypted }
      }
      return { ok: false, err: 'Jwt token has expired', code: 401 }
    } catch (err: any) {
      if (err && err.name === 'TokenExpiredError') {
        return { ok: false, err: 'Jwt token has expired', code: 401 }
      } else {
        return { ok: false, err: 'Jwt token is invalid', code: 401 }
      }
    }
  },
  createSessionExpiration() {
    return Date.now() + EXPIRATION_IN_MILLIS
  },
}
