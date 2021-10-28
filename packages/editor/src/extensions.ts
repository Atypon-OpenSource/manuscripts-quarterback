import type { ExtensionProvider } from './context/ExtensionProvider'

import type { baseExtensionName } from './extensions/base'
import type { trackChangesExtensionName } from './extensions/track-changes'
// import type { yjsExtensionName } from './extensions/yjs'

import type { BaseExtension } from './extensions/base'
import type { TrackChangesExtension } from './extensions/track-changes'
// import type { YjsExtension } from './extensions/yjs'

export type Extensions = {
  [baseExtensionName]: BaseExtension
  [trackChangesExtensionName]: TrackChangesExtension
  // [yjsExtensionName]: YjsExtension
}

export function pickExtension<E extends keyof Extensions>(extStore: ExtensionProvider, name: E) {
  return extStore.getExtension(name) as Extensions[E]
}
