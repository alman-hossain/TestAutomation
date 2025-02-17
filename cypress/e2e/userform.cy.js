describe('Test User Form', () => {
    it('Home Page', () => {
        cy.visit('https://magento.softwaretestingboard.com/')
    })

    it('New Account Page', () => {
        cy.get('header[class="page-header"] li:nth-child(3) a:nth-child(1)').click()
    })

    it('Input Form Mandatory Validation', () => {
        cy.get('button[title=\'Create an Account\'] span').click()
        cy.get('#firstname-error').should("have.text", "This is a required field.")
        cy.get('#lastname-error').should("have.text", "This is a required field.")
        cy.get('#email_address-error').should("have.text", "This is a required field.")
        cy.get('#password-error').should("have.text", "This is a required field.")
        cy.get('#password-confirmation-error').should("have.text", "This is a required field.")
    })

    it('Input Form Validation', () => {
        cy.get('#email_address').type("abc")
        cy.get('#password').type("1234546")
        cy.get('#password-confirmation').type("123456")
        cy.get('button[title=\'Create an Account\'] span').click()
        cy.get('#email_address-error').should("have.text", "Please enter a valid email address (Ex: johndoe@domain.com).")
        cy.get('#password-error').should("have.text", "Minimum length of this field must be equal or greater than 8 symbols. Leading and trailing spaces will be ignored.")
        cy.get('#password-confirmation-error').should("have.text", "Please enter the same value again.")
        cy.get('#password').clear().get('#password-strength-meter').invoke('text').should('match', /No Password/);
        cy.get('#password').clear().type('1234').get('#password-strength-meter').invoke('text').should('match', /Weak/);
        cy.get('#password').clear().type('Selcome1').get('#password-strength-meter').invoke('text').should('match', /Medium/);
        cy.get('#password').clear().type('Qw2121#$1').get('#password-strength-meter').invoke('text').should('match', /Strong/);
        cy.get('#password').clear().type('Str0ngP@ssw0rd!').get('#password-strength-meter').invoke('text').should('match', /Very Strong/);
    })

    it('Create Duplicate Account', () => {
        cy.get('header[class="page-header"] li:nth-child(3) a:nth-child(1)').click()
        cy.get('#firstname').clear().type('alman')
        cy.get('#lastname').clear().type('yen')
        cy.get('#email_address').clear().type('alman11.hossain@bjitgroup.com')
        cy.get('#password').clear().type('Welcome1@')
        cy.get('#password-confirmation').clear().type('Welcome1@')
        cy.get('button[title=\'Create an Account\'] span').click()
        cy.get('.message-error > div').should("have.text", "There is already an account with this email address. If you are sure that it is your email address, click here to get your password and access your account." )
    })

  })
