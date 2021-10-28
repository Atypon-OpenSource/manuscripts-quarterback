import { schema } from '@manuscripts/quarterback-schema'

import { activeNodesMarksPlugin } from './activeNodesMarksPlugin'
import { exampleSetup } from './exampleSetup'

import type { Extension } from '$typings/extension'
import type { EditorProviders } from '$context'

export const baseExtensionName = 'base' as const

export const baseExtension = () => (ctx: EditorProviders) => {
  const plugins = exampleSetup({ schema, history: false }).concat([activeNodesMarksPlugin()])
  return {
    name: baseExtensionName,
    commands: {},
    keymaps: [],
    plugins
  }
}
