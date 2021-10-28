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
import { User } from '$typings/user'

import { Observable } from '@manuscripts/quarterback-shared'
import { EditorViewProvider } from './EditorViewProvider'
import { generateUser } from './user'
import { YjsProvider } from './YjsProvider'

export interface UserProviderState {
  currentUser: User
  users: User[]
}

type AwarenessChange = {
  added: number[]
  updated: number[]
  removed: number[]
}
interface YjsState {
  cursor: any
  user: User
}

export class UserProvider {
  _observable = new Observable<'update'>()
  viewProvider: EditorViewProvider
  yjsProvider: YjsProvider

  currentUser: User
  usersMap: Map<number, User> = new Map()

  constructor(viewProvider: EditorViewProvider, yjsProvider: YjsProvider) {
    this.viewProvider = viewProvider
    this.yjsProvider = yjsProvider
    this.currentUser = this.generateGuestUser()
    yjsProvider.onInit(() => {
      this.updateYjsUser()
      yjsProvider.provider.awareness.on('update', this.updateUsers.bind(this))
    })
  }

  get state(): UserProviderState {
    return {
      currentUser: this.currentUser,
      users: Array.from(this.usersMap.values()),
    }
  }

  updateUsers({ added, updated, removed }: AwarenessChange) {
    const states = this.yjsProvider.provider.awareness.getStates() as Map<
      number,
      YjsState
    >
    added.concat(updated).forEach((clientID) => {
      const state = states.get(clientID)
      if (state) {
        this.usersMap.set(clientID, state.user)
      }
    })
    removed.forEach((clientID) => this.usersMap.delete(clientID))
    this._observable.emit('update', this.state)
  }

  updateYjsUser() {
    const clientID = this.yjsProvider.ydoc.clientID
    this.currentUser.clientID = clientID
    this.usersMap.set(clientID, this.currentUser)
    this.yjsProvider.setUser(this.currentUser)
    this._observable.emit('update', this.state)
  }

  generateGuestUser(name?: string) {
    const clientID = Math.floor(Math.random() * 1000000)
    const user = generateUser(clientID, name)
    this.currentUser = user
    this._observable.emit('update', this.state)
    return user
  }

  onUpdate(cb: (data: any) => void) {
    this._observable.on('update', cb)
  }

  offUpdate(cb: (data: any) => void) {
    this._observable.off('update', cb)
  }
}
