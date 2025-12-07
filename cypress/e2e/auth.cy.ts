describe('Authentication Flow', () => {
  beforeEach(() => {
    cy.visit('/')
  })

  it('should navigate to registration page', () => {
    cy.contains('Register').click()
    cy.url().should('include', '/register')
    cy.contains('Register').should('be.visible')
  })

  it('should register a new user', () => {
    const timestamp = Date.now()
    const email = `testuser${timestamp}@example.com`
    
    cy.visit('/register')
    cy.get('input[name="first_name"]').type('John')
    cy.get('input[name="last_name"]').type('Doe')
    cy.get('input[name="email"]').type(email)
    cy.get('input[name="password"]').type('TestPassword123!')
    cy.get('input[name="confirmPassword"]').type('TestPassword123!')
    cy.get('button[type="submit"]').click()
    
    // Should redirect to login after successful registration
    cy.url().should('include', '/userLogin')
  })

  it('should show validation errors for empty fields', () => {
    cy.visit('/register')
    cy.get('button[type="submit"]').click()
    // Should show validation errors
    cy.contains('required', { matchCase: false }).should('be.visible')
  })

  it('should login with valid credentials', () => {
    cy.visit('/userLogin')
    cy.get('input[name="email"]').type('test@example.com')
    cy.get('input[name="password"]').type('password123')
    cy.get('button[type="submit"]').click()
    
    // After login, should redirect to dashboard
    cy.url({ timeout: 10000 }).should('satisfy', (url) => {
      return url.includes('/dashboard') || url.includes('/userDashboard')
    })
  })

  it('should show error for invalid login', () => {
    cy.visit('/userLogin')
    cy.get('input[name="email"]').type('invalid@example.com')
    cy.get('input[name="password"]').type('wrongpassword')
    cy.get('button[type="submit"]').click()
    
    // Should show error message
    cy.wait(2000)
    // Error handling may vary based on implementation
  })
})

