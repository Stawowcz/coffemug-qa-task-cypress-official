import { LoginPage } from "@pages/auth/login-page";

export const loginWithSession = () => {
  const email = Cypress.env("loginEmail");
  const password = Cypress.env("loginPassword");
  const loginPage = new LoginPage();

  cy.session(["login", email], () => {
    loginPage.goToPage();
    loginPage.login(email, password);
    cy.get(".account").should("be.visible");
  });
};
