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
import { schema } from '@manuscripts/quarterback-schema'
import { prosemirrorJSONToYDoc, yDocToProsemirrorJSON } from 'y-prosemirror'
import { Awareness } from 'y-protocols/awareness'
import { WebsocketProvider } from 'y-websocket'
import * as Y from 'yjs'
import { applyUpdate, Doc, encodeStateAsUpdate } from 'yjs'

import type { YjsEnabled } from './types'

export type YjsStore = ReturnType<typeof createYjsStore>

export interface User {
  id: string
  name: string
}

export const createYjsStore = (opts: YjsEnabled) => {
  const { disabled, document, user, ws_url } = opts
  const ydoc = new Y.Doc()
  const permanentUserData = new Y.PermanentUserData(ydoc)
  permanentUserData.setUserMapping(ydoc, ydoc.clientID, user.name)
  ydoc.gc = false
  const provider = new WebsocketProvider(ws_url, document.id, ydoc)
  const yXmlFragment = ydoc.getXmlFragment('pm-doc')

  return {
    ydoc,
    permanentUserData,
    awareness: provider.awareness,
    yXmlFragment,

    setOptions(newProps: YjsEnabled) {},

    setUser(user: User) {
      permanentUserData.setUserMapping(ydoc, ydoc.clientID, user.name)
      provider.awareness.setLocalStateField('user', user)
    },
  }
}
