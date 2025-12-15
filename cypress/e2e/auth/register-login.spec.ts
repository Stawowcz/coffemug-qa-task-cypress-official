/// <reference types="cypress" />
import { LoginPage } from "@pages/auth/login-page";
import { HomePage } from "@pages/home/home-page";
import { RegisterMessages } from "@constants/texts/messages/register-messages";
import { GlobalUiTexts } from "@constants/texts/ui-texts/global-ui-texts";
import { RegisterPage } from "@pages/auth/register-page";
import { RegisterValidations } from "@constants/texts/validation/register-validations";
import { UserDataGenerator } from "@data/user-generator-data";

describe("User Registration and Login", () => {
  const loginPage = new LoginPage();
  const registerPage = new RegisterPage();
  const homePage = new HomePage();

  beforeEach(() => {
    homePage.goToPage();
  });

  it("should register a new user successfully", () => {
    const registerData = UserDataGenerator.generateRegisterData({});
    homePage.openRegisterPage();

    registerPage.fillRegistrationForm(registerData);

    cy.get(registerPage.resultMessage).should(
      "contain.text",
      RegisterMessages.REGISTRATION_SUCCESS,
    );

    registerPage.clickContinue();

    cy.get(homePage.accountLabel).should("contain.text", registerData.email);
  });

  it("should log in successfully with valid credentials", () => {
    const email = Cypress.env("loginEmail");
    const password = Cypress.env("loginPassword");

    homePage.openLoginPage();
    loginPage.login(email, password);

    cy.get(homePage.accountLabel).should("contain.text", email);
    cy.get(homePage.logoutLink).should("have.text", GlobalUiTexts.LOGOUT);
  });

  it("should keep user logged in after page refresh", () => {
    const email = Cypress.env("loginEmail");
    const password = Cypress.env("loginPassword");

    homePage.openLoginPage();
    loginPage.login(email, password);

    cy.get(homePage.accountLabel).should("contain.text", email);
    cy.get(homePage.logoutLink).should("have.text", GlobalUiTexts.LOGOUT);
    cy.reload();

    cy.get(homePage.accountLabel).should("contain.text", email);
    cy.get(homePage.logoutLink).should("have.text", GlobalUiTexts.LOGOUT);
  });

  it("should log out the user successfully", () => {
    const email = Cypress.env("loginEmail");
    const password = Cypress.env("loginPassword");

    homePage.openLoginPage();
    loginPage.login(email, password);

    cy.get(homePage.accountLabel).should("contain.text", email);
    cy.get(homePage.logoutLink).should("be.visible");

    homePage.clickLogout();

    cy.get(homePage.loginLink).should("be.visible");
    cy.get(homePage.logoutLink).should("not.exist");
  });
});

describe("User Registration - Field Validation", () => {
  const registerPage = new RegisterPage();

  beforeEach(() => {
    registerPage.goToPage();
  });

  it("should show required field errors when clicking Register without data", () => {
    registerPage.clickRegister();

    cy.get(registerPage.firstNameError).should(
      "contain.text",
      RegisterValidations.FIRST_NAME_REQUIRED,
    );
    cy.get(registerPage.lastNameError).should(
      "contain.text",
      RegisterValidations.LAST_NAME_REQUIRED,
    );
    cy.get(registerPage.emailError).should(
      "contain.text",
      RegisterValidations.EMAIL_REQUIRED,
    );
    cy.get(registerPage.passwordError).should(
      "contain.text",
      RegisterValidations.PASSWORD_REQUIRED,
    );
    cy.get(registerPage.confirmPasswordError).should(
      "contain.text",
      RegisterValidations.CONFIRM_PASSWORD_REQUIRED,
    );
  });

  it("should show validation messages for invalid email and password rules", () => {
    const wrongEmail = UserDataGenerator.generateRegisterData({
      email: "wrongemail",
    });
    registerPage.typeEmail(wrongEmail.email);
    registerPage.clickPassword();
    cy.get(registerPage.emailError).should(
      "contain.text",
      RegisterValidations.WRONG_EMAIL,
    );

    const shortPassword = UserDataGenerator.generateRegisterData({
      password: "123",
      confirmPassword: "123",
    });
    registerPage.typePassword(shortPassword.password);
    registerPage.typeConfirmPassword(shortPassword.confirmPassword);
    registerPage.clickFirstName();
    cy.get(registerPage.passwordError).should(
      "contain.text",
      RegisterValidations.SHORT_PASSWORD,
    );

    const mismatchPasswords = UserDataGenerator.generateRegisterData({
      password: "Test123",
      confirmPassword: "Different123",
    });
    registerPage.typePassword(mismatchPasswords.password);
    registerPage.typeConfirmPassword(mismatchPasswords.confirmPassword);
    registerPage.clickLastName();
    cy.get(registerPage.confirmPasswordError).should(
      "contain.text",
      RegisterValidations.PASSWORD_MISMATCH,
    );
  });
});
