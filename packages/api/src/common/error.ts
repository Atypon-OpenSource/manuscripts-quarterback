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
export interface IError extends Error {
  statusCode?: number
}

export class CustomError extends Error implements IError {
  statusCode: number

  constructor(message: string, errorCode = 500) {
    super(message)
    this.name = this.constructor.name
    this.statusCode = errorCode
    Error.captureStackTrace(this, this.constructor)
  }
}

export class ValidationError extends Error implements IError {
  readonly statusCode: number = 400

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}

export class DBError extends Error implements IError {
  readonly statusCode: number = 500

  constructor(message: string) {
    super(message)
    this.name = this.constructor.name
    Error.captureStackTrace(this, this.constructor)
  }
}
