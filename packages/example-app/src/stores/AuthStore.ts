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
import { IJwt, ILoginParams, IUser } from '@manuscripts/quarterback-shared'
import { action, computed, observable } from 'mobx'

import * as authApi from '../api/auth'
import { hydrate, persist } from './persist'

interface Persisted {
  user?: IUser
  jwt?: IJwt
}

export class AuthStore {
  @observable user?: IUser = undefined
  @observable jwt?: IJwt = undefined
  resetAllStores: () => void
  STORAGE_KEY = 'auth-store'

  constructor(resetFn: () => void) {
    this.resetAllStores = resetFn
    const data = hydrate<Persisted>('session', this.STORAGE_KEY)
    if (data) {
      const { user, jwt } = data
      this.user = user
      this.jwt = jwt
    }
    this.persist()
  }

  persist = () => {
    persist<Persisted>('session', this.STORAGE_KEY, {
      user: this.user,
      jwt: this.jwt,
    })
  }

  @computed get isLoggedIn() {
    return this.user && this.user.email
  }

  @action login = async (params: ILoginParams) => {
    const resp = Promise.resolve(true)
    try {
      // resp = await authApi.login(params)
      // this.user = resp.user
      // this.jwt = resp.jwt
      this.persist()
    } catch (err) {
      console.error(err)
    }
    return resp
  }

  @action logout = () => {
    // this.resetAllStores()
    this.reset()
  }

  @action reset = () => {
    this.user = undefined
    this.jwt = undefined
    this.persist()
  }
}
