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
import { QuarterBackSchema } from '@manuscripts/quarterback-schema'
import { Observable } from '@manuscripts/quarterback-shared'
import { EditorState } from 'prosemirror-state'
import { EditorView } from 'prosemirror-view'

import { Command, JSONEditorState } from '$typings/editor'

export class EditorViewProvider {
  _view?: EditorView<QuarterBackSchema>
  _state?: EditorState<QuarterBackSchema>
  _observable = new Observable<'updateState'>()

  get view(): EditorView<QuarterBackSchema> {
    if (!this._view) {
      throw Error('EditorViewProvider view accessed before initialization')
    }
    return this._view
  }

  get state(): EditorState<QuarterBackSchema> {
    if (!this._state) {
      throw Error('EditorViewProvider state accessed before initialization')
    }
    return this._state
  }

  init(view: EditorView<QuarterBackSchema>) {
    this._view = view
  }

  execCommand(cmd: Command) {
    cmd(this.view.state, this.view.dispatch)
    this.focus()
  }

  focus() {
    if (!this._view || this._view.hasFocus()) {
      return false
    }
    this._view.focus()
    this._view.dispatch(this._view.state.tr.scrollIntoView())
    return true
  }

  docToJSON() {
    return this.view.state.doc.toJSON()
  }

  stateToJSON() {
    const state = this.view.state.toJSON()
    return { ...state, plugins: [] } as unknown as JSONEditorState
  }

  hydrateDocFromJSON(doc: Record<string, any>) {
    const state = EditorState.create({
      doc: this.view.state.schema.nodeFromJSON(doc),
      plugins: this.view.state.plugins,
    })
    this.updateState(state, true)
  }

  hydrateStateFromJSON(rawValue: { doc: Record<string, any>, selection: Record<string, any> }) {
    const state = EditorState.fromJSON(
      {
        schema: this.view.state.schema,
        plugins: this.view.state.plugins,
      },
      rawValue
    )
    this.updateState(state, true)
  }

  updateState(newState: EditorState, replaced = false) {
    this.view.updateState(newState)
    this._state = newState
    // Fire an empty transaction to trigger PluginStateProvider to update
    replaced && this.view.dispatch(this.view.state.tr)
    this._observable.emit('updateState', newState)
    return newState
  }

  onUpdateState(cb: (data: EditorState) => void) {
    this._observable.on('updateState', cb)
  }

  offUpdateState(cb: (data: EditorState) => void) {
    this._observable.off('updateState', cb)
  }
}
