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
import type { User } from '@manuscripts/quarterback-types'
import type { Request, Response, NextFunction } from 'express'
import type { ParamsDictionary } from 'express-serve-static-core'
export { NextFunction }
export type IRequest<
  B = Record<string, any>,
  P extends ParamsDictionary = Record<string, any>
> = Request<P, Record<string, never>, B, Record<string, never>>

type AuthLocals = {
  user: User
}

export type AuthRequest<
  B = Record<string, any>,
  P extends ParamsDictionary = Record<string, any>
> = Request<P, Record<string, never>, B, Record<string, never>, AuthLocals>

export type AuthResponse<R = Record<string, never>> = Response<R, AuthLocals>

export type AnyRequest<B = Record<string, any>, Q extends ParamsDictionary = Record<string, any>> =
  | IRequest<B, Q>
  | AuthRequest<B, Q>
