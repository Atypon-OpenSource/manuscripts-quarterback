import { keymap } from 'prosemirror-keymap'
import { history } from 'prosemirror-history'
import { baseKeymap } from 'prosemirror-commands'
import { Plugin } from 'prosemirror-state'
import { dropCursor } from 'prosemirror-dropcursor'
import { gapCursor } from 'prosemirror-gapcursor'
import { menuBar } from 'prosemirror-menu'

import { buildMenuItems, buildKeymap, buildInputRules } from 'prosemirror-example-setup'
import type { Options } from 'prosemirror-example-setup'

// From https://github.com/ProseMirror/prosemirror-example-setup/blob/master/src/index.js
// with option to omit history plugins to comply with Yjs
export function exampleSetup(options: Options) {
  const plugins = [
    buildInputRules(options.schema),
    keymap(buildKeymap(options.schema, options.mapKeys)),
    keymap(baseKeymap),
    dropCursor(),
    gapCursor()
  ]
  if (options.menuBar !== false)
    plugins.push(
      menuBar({
        floating: options.floatingMenu !== false,
        content: options.menuContent || buildMenuItems(options.schema).fullMenu
      })
    )
  if (options.history !== false) plugins.push(history())

  return plugins.concat(
    new Plugin({
      props: {
        attributes: { class: 'ProseMirror-example-setup-style' }
      }
    })
  )
}
