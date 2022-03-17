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
import {
  setAction,
  TrackChangesAction,
  trackChangesPluginKey,
} from '@manuscripts/track-changes-plugin'

const TEST_TEXT = 'asdf qwer'
const TEST_USER = {
  id: 'test-user-id',
  clientID: 1234,
  name: 'Test user',
  color: 'red',
}

describe('Track changes', () => {
  before(() => {
    cy.visit('/manuscripts/test1')
    cy.get('button[aria-label="toggle-track-debug"]').click()
    cy.get('#editor').wait(100)
    cy.resetDoc().wait(1)
  })

  it('Should mark typed text as inserted', () => {
    cy.insertText(TEST_TEXT)
    cy.get('ins.pending').should('have.text', TEST_TEXT)
    cy.get('[data-test="change-item"]').should('have.length', 1)
    cy.get('[data-test="change-item"]').find('[aria-label="accept-btn"]').click()
    cy.get('ins.accepted').should('have.text', TEST_TEXT)
    cy.resetDoc().wait(1)
    cy.get('ins').should('have.length', 0)
    cy.get('[data-test="change-item"]').should('have.length', 0)
  })

  it('Should mark typed text as deleted', () => {
    cy.insertText(TEST_TEXT, undefined, true)
    cy.get('ins.pending').should('have.length', 0)
    cy.get('del.pending').should('have.length', 0)
    cy.get('#editor').focus().wait(1).type('{backspace}{backspace}{backspace}{backspace}')
    cy.get('del.pending').should('have.length', 1)
    cy.get('[data-test="change-item"]').should('have.length', 1)
    cy.get('[data-test="change-item"]').find('[aria-label="accept-btn"]').click()
    cy.get('del.pending').should('have.length', 0)
    cy.get('del.accepted').should('have.text', 'qwer')
    cy.resetDoc().wait(1)
    cy.get('[data-test="change-item"]').should('have.length', 0)
  })

  it('Should fix marks inserted with incomplete track attributes', () => {
    cy.window().should('have.property', 'editorView')
    cy.window().should('have.property', 'commands')
    cy.window().then((window) => {
      const { editorView: view, commands } = window
      commands.setUser(TEST_USER)(view.state, view.dispatch)
      const trackState = trackChangesPluginKey.getState(view.state)
      expect(trackState.currentUser).to.equal(TEST_USER)
    })
    cy.window().then((window) => {
      const { editorView: view } = window
      const tr = view.state.tr
      tr.insertText(TEST_TEXT)
      tr.addMark(
        2,
        6,
        view.state.schema.marks.tracked_insert.create({
          dataTracked: {},
          pending_bg: 'yellow',
        })
      )
      setAction(tr, TrackChangesAction.skipTrack, true)
      view.dispatch(tr)
    })
    cy.window().then((window) => {
      const { editorView: view } = window
      view.dispatch(view.state.tr)

      const node = view.state.doc.nodeAt(2)
      expect(node?.text).to.eql('asdf')
      const attrs = node.marks[0]?.attrs
      expect(attrs?.dataTracked?.id).to.have.lengthOf(36)
      expect(attrs?.dataTracked?.userID).to.equal(TEST_USER.id)
      expect(attrs?.dataTracked?.userName).to.equal(TEST_USER.name)
      expect(attrs?.dataTracked?.time).to.be.within(Date.now() - 1000 * 60, Date.now() + 1000 * 60)
      expect(attrs?.pending_bg).to.have.equal('yellow')
    })
    cy.get('ins.pending').should('have.text', 'asdf')
    cy.get('del.pending').should('have.length', 0)

    // TODO test duplicate IDs, merging of changes by two users(?)
  })
})
