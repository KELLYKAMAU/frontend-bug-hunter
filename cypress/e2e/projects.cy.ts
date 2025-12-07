describe('Projects Management', () => {
  beforeEach(() => {
    cy.visit('/projects')
  })

  it('should display projects page', () => {
    cy.contains('Projects', { matchCase: false }).should('be.visible')
  })

  it('should show create project form', () => {
    cy.contains('Create New Project', { matchCase: false }).should('be.visible')
    cy.get('input[placeholder*="project name" i]').should('be.visible')
  })

  it('should create a new project', () => {
    const projectName = `Test Project ${Date.now()}`
    
    cy.get('input[placeholder*="project name" i]').type(projectName)
    cy.get('textarea[placeholder*="description" i]').type('This is a test project created by Cypress')
    
    // Submit form
    cy.contains('Create Project', { matchCase: false }).click()
    
    // Should show the new project in the list
    cy.wait(2000)
    cy.contains(projectName, { timeout: 5000 }).should('exist')
  })
})

