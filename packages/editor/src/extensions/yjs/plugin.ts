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
// import { ySyncPluginKey } from 'y-prosemirror'
import type { QuarterBackSchema } from '$schema'
import { Plugin, PluginKey } from 'prosemirror-state'

import type { EditorViewProvider } from '$context/Providers'

import type { YjsState } from './types'
// import { getAction, setAction, YjsAction } from './actions'
import { YjsStatus } from './types'

// import { User } from '$lib/typings/user'

export const yjsPluginKey = new PluginKey<YjsState, QuarterBackSchema>('yjs')

export const yjsPlugin = (viewStore: EditorViewProvider) => {
  return new Plugin<YjsState, QuarterBackSchema>({
    key: yjsPluginKey,
    state: {
      init(config, state) {
        return {
          status: YjsStatus.enabled,
        }
      },

      apply(tr, value, oldState, newState): YjsState {
        return value
      },
    },
  })
}
