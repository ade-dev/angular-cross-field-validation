describe('Cross-field validation app e2e test', () => {

  const formSelector = [
    { pageUrl: 'reactive-form', cySelector: 'reactive' },
    { pageUrl: 'template-driven-form', cySelector: 'templateDriven' }
  ];

  formSelector.forEach((form) => {

    context(`${form.pageUrl} tests`, () => {
      beforeEach(() => {
        cy.visit(`/${form.pageUrl}`);
      });

      context('Heading and navigation tests', () => {
        it("Should display correct heading'", () => {
          cy.get('[data-cy="pageHeading"]').should('contain.text', `Angular - ${form.cySelector === "reactive" ? "Reactive" : "Template-driven"} form input value cross-validation`);
        });

        it('Should follow links', () => {
          cy.contains('Reactive form').click();
          cy.location('pathname').should('eq', '/reactive-form');
          cy.visit('/');
          cy.contains('Template-driven form').click();
          cy.location('pathname').should('eq', '/template-driven-form');
        });
      });

      context('Initial form validity status', () => {
        it('Should be invalid on initial page load', () => {
          cy.get(`[data-cy=${form.cySelector}Status]`).should('contain.text', 'Form Status: INVALID');
        });
      });

      context('Email input tests', () => {
        it('Should render "Email is required" error when Email has no value', () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#email').type("abc").clear().blur();
          cy.get('[data-cy="emailIsRequiredError"]')
            .should("be.visible")
            .and("contain", "Email is required");
        });

        it("Should render 'Please enter a valid email' error when Email is invalid", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#email').type("abc").blur();
          cy.get('[data-cy="emailIsInvalidError"]')
            .should("be.visible")
            .and("contain", "Please enter a valid email");
        });

        it("Should clear 'Invalid email' error when Email is valid", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#email').clear().type("a@bc.com").blur();
          cy.get('[data-cy="emailIsInvalidError"]').should("not.exist");
        });

        it("Should render 'Email entries do not match' error if email entries do not match", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#email').clear().type("x@yz.com");
          cy.get(`[data-cy=${form.cySelector}]`).find('#confirmEmail').type("ax@yz.com").blur();
          cy.get('[data-cy="emailsNoMatch"]')
            .should("be.visible")
            .and("contain", "Email entries do not match");
        });

        it("Should clear 'Email do not match' error if 'email' and 'confirmEmail' values are a match", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#confirmEmail').clear().type("x@yz.com").blur();
          cy.get('[data-cy="emailsNoMatch"]').should("not.exist");
        });
      });

      context('Password input tests', () => {
        it('Should render "Password is required" error when password has no value', () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#password').type("abc").clear().blur();
          cy.get('[data-cy="passwordIsRequiredError"]')
            .should("be.visible")
            .and("contain", "Password is required");
        });

        it("Should clear 'Password is required' error when password has a value", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#password').type("ade").blur();
          cy.get('[data-cy="passwordIsRequiredError"]').should("not.exist");
        });

        it("Should render 'Password entries do not match' error if password entries do not match", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#confirmPassword').type("wole").blur();
          cy.get('[data-cy="passwordsNoMatch"]')
            .should("be.visible")
            .and("contain", "Password entries do not match");
        });

        it("Should clear 'Password do not match' error if 'password' and 'confirmEmail' values are a match", () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#confirmEmail').clear().type("ade").blur();
          cy.get('[data-cy="passwordsNoMatch"]').should("not.exist");
        });
      });

      context('Form validity status', () => {
        it('Should have a status of valid if all entries are valid', () => {
          cy.get(`[data-cy=${form.cySelector}]`).find('#email').type("ade@c.com");
          cy.get(`[data-cy=${form.cySelector}]`).find('#confirmEmail').type("ade@c.com");
          cy.get(`[data-cy=${form.cySelector}]`).find('#password').type("ade");
          cy.get(`[data-cy=${form.cySelector}]`).find('#confirmPassword').type("ade").blur();
          cy.get(`[data-cy=${form.cySelector}Status]`).should('contain.text', 'Form Status: VALID');
        });
      });
    });
  });
});
