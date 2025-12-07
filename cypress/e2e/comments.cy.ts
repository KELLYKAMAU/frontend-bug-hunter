describe('Comments Management', () => {
  beforeEach(() => {
    cy.visit('/comments')
  })

  it('should display comments page', () => {
    cy.contains('Comments', { matchCase: false }).should('be.visible')
  })

  it('should show add comment form', () => {
    cy.contains('Add a Comment', { matchCase: false }).should('be.visible')
    cy.get('textarea[placeholder*="comment" i]').should('be.visible')
  })

  it('should create a new comment', () => {
    cy.wait(1000) // Wait for bugs to load
    
    // Select bug if dropdown exists
    cy.get('select').first().then(($select) => {
      if ($select.find('option').length > 1) {
        cy.wrap($select).select(1)
      }
    })
    
    cy.get('textarea[placeholder*="comment" i]').type('This is a test comment from Cypress')
    cy.contains('Post Comment', { matchCase: false }).click()
    
    cy.wait(2000)
    cy.contains('test comment from Cypress', { timeout: 5000 }).should('exist')
  })
})

