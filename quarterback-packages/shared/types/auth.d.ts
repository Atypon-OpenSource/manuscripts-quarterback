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
import type { User as DBUser } from '@manuscripts/quarterback-db'

export { UserRole } from '../src/auth'

export type User = Omit<DBUser, 'password'>
export type UserWithColor = User & { color: string }

// POST login
export interface ILoginParams {
  email: string
  password: string
}
export interface ILoginResponse {
  user: User
  jwt: Jwt
}
export type Jwt = {
  expires: number
  token: string
}

// POST sign-up
export interface ISignUpParams {
  email: string
  password: string
  firstname: string
  lastname: string
}
