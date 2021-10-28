import { trackChangesPlugin } from './plugin'
import * as commands from './commands'

import type { Extension } from '$typings/extension'
import type { EditorProviders } from '$context/Providers'
import type { TrackChangesOptions } from './types'

export const trackChangesExtensionName = 'track-changes' as const

export const trackChangesExtension = (opts?: TrackChangesOptions) => (ctx: EditorProviders) => {
  if (opts?.disabled) {
    return {
      name: trackChangesExtensionName,
      commands: { ...commands },
      keymaps: [],
      plugins: [],
      store: {}
    }
  }
  const plugins = [
    trackChangesPlugin(ctx.viewProvider, ctx.userProvider),
  ]
  return {
    name: trackChangesExtensionName,
    commands: { ...commands },
    keymaps: [],
    plugins,
    store: {}
  }
}
