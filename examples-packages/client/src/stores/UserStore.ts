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
import { User, UserWithColor } from '@manuscripts/examples-track-types'
import * as commentApi from 'api/comment'
import { action, computed, makeObservable, observable, runInAction } from 'mobx'
import randomColor from 'randomcolor'

export class UserStore {
  @observable usersMap: Map<string, UserWithColor> = new Map()
  @observable userColorsMap: Map<string, string> = new Map()
  STORAGE_KEY = 'user-store'

  constructor() {
    makeObservable(this)
  }

  generateColor = () => {
    let color = randomColor({
        luminosity: 'dark',
      }),
      iters = 0
    while (this.userColorsMap.has(color) && iters < 100) {
      color = randomColor({
        luminosity: 'dark',
      })
      iters += 1
    }
    return color
  }

  @action addUser = (user: User) => {
    let found = this.usersMap.get(user.id)
    if (!found) {
      const color = this.generateColor()
      found = { ...user, color }
      this.usersMap.set(user.id, found)
      this.userColorsMap.set(color, user.id)
    }
    return found
  }

  @action reset = () => {
    this.usersMap = new Map()
  }
}
