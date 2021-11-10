const TEST_TEXT = 'asdf qwer'
const TEST_USER = {
  id: 'test-user-id',
  clientID: 1234,
  name: 'Test user',
  color: 'red',
}

describe('Track changes', () => {
  it('Should mark typed text as inserted', () => {
    cy.visit('/')
    cy.get('#example-editor').focus().type(TEST_TEXT)
    cy.get('ins.pending').should('have.text', TEST_TEXT)
    cy.get('[data-test="change-item"]').should('have.length', 1)
    cy.get('[data-test="change-item"]')
      .find('[aria-label="accept-btn"]')
      .click()
    cy.get('ins.accepted').should('have.text', TEST_TEXT)
    cy.get('#example-editor').focus().clear()
    cy.get('ins').should('have.length', 0)
    cy.get('[data-test="change-item"]').should('have.length', 0)
  })

  it('Should mark typed text as deleted', () => {
    cy.visit('/')
    cy.get('button[aria-label="toggle-track-changes"]').click()
    cy.get('#example-editor').focus().type(TEST_TEXT)
    cy.get('ins.pending').should('have.length', 0)
    cy.get('del.pending').should('have.length', 0)
    cy.get('button[aria-label="toggle-track-changes"]').click()
    cy.get('#example-editor')
      .focus()
      .type('{backspace}{backspace}{backspace}{backspace}')
    cy.get('del.pending').should('have.length', 1)
    cy.get('[data-test="change-item"]').should('have.length', 1)
    cy.get('[data-test="change-item"]')
      .find('[aria-label="accept-btn"]')
      .click()
    cy.get('del.pending').should('have.length', 0)
    cy.get('del.accepted').should('have.text', 'qwer')
    cy.get('#example-editor').focus().clear()
    cy.get('del.pending').should('have.text', TEST_TEXT)
  })

  it('Should fix marks inserted with incomplete track attributes', () => {
    cy.visit('/')
    // cy.window().should('have.property', 'appReady', true)
    cy.window().should('have.property', 'editorView')
    cy.window().should('have.property', 'commands')
    cy.window().then((window) => {
      const { editorView: view, commands } = window
      commands.setUser(TEST_USER)(view.state, view.dispatch)
      const trackPlugin = view.state.plugins.find(
        (p) => p.key === 'track-changes$'
      )
      const trackState = trackPlugin.spec.key.getState(view.state)
      expect(trackState.currentUser).to.equal(TEST_USER)
    })
    cy.get('button[aria-label="toggle-track-changes"]').click()
    cy.window().then((window) => {
      const { editorView: view } = window
      const tr = view.state.tr
      tr.insertText(TEST_TEXT)
      tr.addMark(
        1,
        5,
        view.state.schema.marks.tracked_insert.create({
          dataTracked: {},
          pending_bg: 'yellow',
        })
      )
      view.dispatch(tr)
    })
    cy.get('button[aria-label="toggle-track-changes"]').click()
    cy.window().then((window) => {
      const { editorView: view } = window
      view.dispatch(view.state.tr)

      const node = view.state.doc.nodeAt(1)
      expect(node?.text).to.eql('asdf')
      const attrs = node.marks[0]?.attrs
      expect(attrs?.dataTracked?.id).to.have.lengthOf(36)
      expect(attrs?.dataTracked?.userID).to.equal(TEST_USER.id)
      expect(attrs?.dataTracked?.userName).to.equal(TEST_USER.name)
      expect(attrs?.dataTracked?.time).to.be.within(
        Date.now() - 1000 * 60,
        Date.now() + 1000 * 60
      )
      expect(attrs?.pending_bg).to.have.equal('yellow')
    })
    cy.get('ins.pending').should('have.text', 'asdf')
    cy.get('del.pending').should('have.length', 0)

    // TODO test duplicate IDs, merging of changes by two users(?)
  })
})
