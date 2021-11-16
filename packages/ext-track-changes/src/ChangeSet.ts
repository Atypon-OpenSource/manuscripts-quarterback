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
export enum CHANGE_OPERATION {
  insert = 'insert',
  delete = 'delete',
  update = 'update',
}
export enum CHANGE_STATUS {
  accepted = 'accepted',
  rejected = 'rejected',
  pending = 'pending',
}
export interface TrackedAttrs {
  id: string
  userID: string
  userName: string
  operation: CHANGE_OPERATION
  status: CHANGE_STATUS
  time: number
}
export type TextChange = {
  id: string
  type: 'text-change'
  from: number
  to: number
  attrs: TrackedAttrs
  incompleteAttrs: boolean
}
export type NodeChange = {
  id: string
  type: 'node-change'
  from: number
  nodeType: string
  attrs: TrackedAttrs
  incompleteAttrs: boolean
}
export type IncompleteTextChange = Omit<TextChange, 'attrs'> & {
  attrs: Partial<TrackedAttrs>
}
export type IncompleteNodeChange = Omit<NodeChange, 'attrs'> & {
  attrs: Partial<TrackedAttrs>
}
export type TrackedChange = TextChange | NodeChange
export type PartialTrackedChange =
  | TextChange
  | NodeChange
  | IncompleteTextChange
  | IncompleteNodeChange

export class ChangeSet {
  _changes: PartialTrackedChange[]

  constructor(changes: PartialTrackedChange[] = []) {
    this._changes = changes
  }

  get changes(): TrackedChange[] {
    return this._changes.filter((c) => !c.incompleteAttrs) as TrackedChange[]
  }

  get pending() {
    return this.changes.filter((c) => c.attrs.status === CHANGE_STATUS.pending)
  }

  get accepted() {
    return this.changes.filter((c) => c.attrs.status === CHANGE_STATUS.accepted)
  }

  get rejected() {
    return this.changes.filter((c) => c.attrs.status === CHANGE_STATUS.rejected)
  }

  get textChanges() {
    return this.changes.filter((c) => c.type === 'text-change')
  }

  get nodeChanges() {
    return this.changes.filter((c) => c.type === 'node-change')
  }

  get isEmpty() {
    return this._changes.length === 0
  }

  get(id: string) {
    return this._changes.find((c) => c.id === id)
  }

  getIn(ids: string[]) {
    return ids
      .map((id) => this._changes.find((c) => c.id === id))
      .filter((c) => c !== undefined) as TrackedChange[]
  }

  getNotIn(ids: string[]) {
    return this._changes.filter((c) => ids.includes(c.id))
  }

  push(change: PartialTrackedChange) {
    this._changes.push(change)
  }

  static isIncompleteChange(
    change: PartialTrackedChange
  ): change is IncompleteTextChange | IncompleteNodeChange {
    return change.incompleteAttrs
  }

  static isTextChange(change: TrackedChange): change is TextChange {
    return change.type === 'text-change'
  }

  static isNodeChange(change: TrackedChange): change is NodeChange {
    return change.type === 'node-change'
  }
}
