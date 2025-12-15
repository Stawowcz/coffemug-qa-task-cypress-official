import { LoginPage } from "@pages/auth/login-page";

export const loginWithSession = (): void => {
  const email = Cypress.env("loginEmail") as string;
  const password = Cypress.env("loginPassword") as string;

  const loginPage = new LoginPage();

  cy.session(["login", email, password], () => {
    loginPage.goToPage();
    loginPage.login(email, password);

    cy.get(".account").should("be.visible");
  });
};
