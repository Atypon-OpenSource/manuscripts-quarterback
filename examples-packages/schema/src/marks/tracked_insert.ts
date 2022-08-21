/*!
 * © 2019 Atypon Systems LLC
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
import { Mark, MarkSpec } from 'prosemirror-model'
import { TrackedAttrs } from '@manuscripts/track-changes-plugin'

export const tracked_insert: MarkSpec = {
  excludes: 'tracked_insert tracked_delete',
  attrs: {
    dataTracked: { default: null },
  },
  parseDOM: [{ tag: 'ins' }],
  toDOM: (el: Mark) => {
    const dataTracked: TrackedAttrs | undefined = el.attrs.dataTracked
    const { status = 'pending' } = dataTracked || {}
    const attrs = {
      class: `inserted ${status}`,
    }
    return ['ins', attrs]
  },
}
