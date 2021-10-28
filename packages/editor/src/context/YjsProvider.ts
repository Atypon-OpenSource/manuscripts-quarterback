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
import { yDocToProsemirrorJSON } from 'y-prosemirror'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'

import { User } from '$typings/user'
import { YjsEnabled } from '$typings/yjs'

import { Observable } from '@manuscripts/quarterback-shared'
import { EditorViewProvider } from './EditorViewProvider'

export class YjsProvider {
  _observable = new Observable<'init'>()
  viewProvider: EditorViewProvider

  _ydoc?: Y.Doc
  _permanentUserData?: Y.PermanentUserData
  _provider?: WebsocketProvider
  _yXmlFragment?: Y.XmlFragment

  constructor(viewProvider: EditorViewProvider) {
    this.viewProvider = viewProvider
  }

  get ydoc() {
    if (!this._ydoc) {
      throw Error('YjsProvider ydoc accessed without initialization!')
    }
    return this._ydoc
  }

  get provider() {
    if (!this._provider) {
      throw Error('YjsProvider provider accessed without initialization!')
    }
    return this._provider
  }

  get yXmlFragment() {
    if (!this._yXmlFragment) {
      throw Error('YjsProvider yXmlFragment accessed without initialization!')
    }
    return this._yXmlFragment
  }

  get permanentUserData() {
    if (!this._permanentUserData) {
      throw Error(
        'YjsProvider permanentUserData accessed without initialization!'
      )
    }
    return this._permanentUserData
  }

  init(opts: YjsEnabled) {
    const { user, document, ws_url } = opts
    this._ydoc = new Y.Doc()
    this._permanentUserData = new Y.PermanentUserData(this._ydoc)
    this._permanentUserData.setUserMapping(
      this._ydoc,
      this._ydoc.clientID,
      user.name
    )
    this._ydoc.gc = false
    this._provider = new WebsocketProvider(ws_url, document.id, this._ydoc)
    this._yXmlFragment = this._ydoc.getXmlFragment('pm-doc')
    this._observable.emit('init')
    return new Promise((resolve, reject) => {
      this._provider?.on('synced', () => {
        resolve(yDocToProsemirrorJSON(this.ydoc, 'pm-doc'))
      })
      this._provider!.on('disconnect', () => reject(undefined))
    })
  }

  setUser(user: User) {
    this.permanentUserData.setUserMapping(
      this.ydoc,
      this.ydoc.clientID,
      user.name
    )
    this.provider.awareness.setLocalStateField('user', user)
  }

  onInit(cb: (data: any) => void) {
    this._observable.on('init', cb)
  }

  offInit(cb: (data: any) => void) {
    this._observable.off('init', cb)
  }
}
