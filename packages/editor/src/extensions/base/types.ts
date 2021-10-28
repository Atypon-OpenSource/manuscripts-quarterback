import type { baseExtension } from './extension'

export type BaseExtension = ReturnType<ReturnType<typeof baseExtension>>

export interface ActiveNodesMarksState {
  activeNodes: string[]
  activeMarks: string[]
}
