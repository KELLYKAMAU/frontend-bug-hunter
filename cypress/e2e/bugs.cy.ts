describe('Bugs Management', () => {
  beforeEach(() => {
    // Assuming login is required - adjust based on your auth setup
    cy.visit('/userLogin')
    // Login if needed - adjust selectors based on your login form
    // cy.get('input[name="email"]').type('test@example.com')
    // cy.get('input[name="password"]').type('password')
    // cy.get('button[type="submit"]').click()
  })

  it('should display bugs list', () => {
    cy.visit('/bugs')
    cy.contains('Bugs', { matchCase: false }).should('be.visible')
  })

  it('should create a new bug', () => {
    cy.visit('/bugs')
    
    // Wait for projects to load if needed
    cy.wait(1000)
    
    cy.contains('Report a Bug', { matchCase: false }).should('be.visible')
    cy.get('input[placeholder*="title" i]').type('Cypress Test Bug')
    cy.get('textarea[placeholder*="Describe" i]').type('This is a test bug created by Cypress')
    
    // Select severity if dropdown exists
    cy.get('select').first().select('medium')
    
    // Select project if dropdown exists
    cy.get('select').last().then(($select) => {
      if ($select.find('option').length > 1) {
        cy.wrap($select).select(1)
      }
    })
    
    cy.contains('Submit Bug', { matchCase: false }).click()
    
    // Should show success or redirect
    cy.wait(2000)
    cy.contains('Cypress Test Bug', { timeout: 5000 }).should('exist')
  })

  it('should display bug details in table', () => {
    cy.visit('/bugs')
    cy.wait(2000)
    
    // Check if bugs table exists
    cy.get('table').should('exist')
    // Check for table headers
    cy.contains('Title').should('be.visible')
    cy.contains('Status').should('be.visible')
  })
})

