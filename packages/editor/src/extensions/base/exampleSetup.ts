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
import { baseKeymap } from 'prosemirror-commands'
import { dropCursor } from 'prosemirror-dropcursor'
import type { Options } from 'prosemirror-example-setup'
import { buildInputRules, buildKeymap, buildMenuItems } from 'prosemirror-example-setup'
import { gapCursor } from 'prosemirror-gapcursor'
import { history } from 'prosemirror-history'
import { keymap } from 'prosemirror-keymap'
import { menuBar } from 'prosemirror-menu'
import { Plugin } from 'prosemirror-state'

// From https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/index.js
// with option to omit history plugins to comply with Yjs
export function exampleSetup(options: Options) {
  const plugins = [
    buildInputRules(options.schema),
    keymap(buildKeymap(options.schema, options.mapKeys)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor(),
  ]
  if (options.menuBar !== false) {
    plugins.push(
      menuBar({
        floating: options.floatingMenu !== false,
        content: options.menuContent || buildMenuItems(options.schema).fullMenu,
      })
    )
  }
  if (options.history !== false) {
    plugins.push(history())
  }

  return plugins.concat(
    new Plugin({
      props: {
        attributes: { class: 'ProseMirror-example-setup-style' },
      },
    })
  )
}
