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
import { skipTracking } from '@manuscripts/track-changes-plugin'

Cypress.Commands.add('resetDoc', () => {
  return cy.window().then(async (window) => {
    const { editorView: view } = window
    const tr = view.state.tr
    const doc = view.state.schema.nodes.manuscript.createAndFill()
    tr.replaceWith(0, view.state.doc.nodeSize - 2, doc)
    skipTracking(tr)
    view.dispatch(tr)
  })
})

Cypress.Commands.add('insertText', (text: string, pos?: number, skipTrack = false) => {
  return cy.window().then(async (window) => {
    const { editorView: view } = window
    const tr = view.state.tr
    tr.insertText(text, pos)
    skipTrack && skipTracking(tr)
    view.dispatch(tr)
  })
})
