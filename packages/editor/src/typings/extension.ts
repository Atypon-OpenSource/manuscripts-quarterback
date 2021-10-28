import type { Plugin } from 'prosemirror-state'
import type { EditorProviders } from '$context'
import type { Commands } from './editor'

export type CreateExtension = (ctx: EditorProviders) => Extension
export interface Extension {
  name: string
  commands?: Commands
  keymaps?: any[]
  plugins?: Plugin[]
  store?: Record<string, any>
  onDestroy?: () => void
}
