import { BasePage } from "@pages/base/base-page";

import { AppUrls } from "@constants/urls/app-urls";

import { RegisterData } from "@typing/user-data";

export class RegisterPage extends BasePage {
  private readonly genderMale = "#gender-male";
  private readonly genderFemale = "#gender-female";
  private readonly firstNameInput = "#FirstName";
  private readonly lastNameInput = "#LastName";
  private readonly emailInput = "#Email";
  private readonly passwordInput = "#Password";
  private readonly confirmPasswordInput = "#ConfirmPassword";
  private readonly registerButton = "#register-button";
  private readonly continueButton = ".register-continue-button";

  public readonly resultMessage = ".result";

  public readonly firstNameError = 'span[data-valmsg-for="FirstName"]';
  public readonly lastNameError = 'span[data-valmsg-for="LastName"]';
  public readonly emailError = 'span[data-valmsg-for="Email"]';
  public readonly passwordError = 'span[data-valmsg-for="Password"]';
  public readonly confirmPasswordError =
    'span[data-valmsg-for="ConfirmPassword"]';

  public goToPage(): void {
    super.goToPage(AppUrls.REGISTER);
  }

  public selectGenderMale(): void {
    this.safeClick(this.genderMale);
  }

  public selectGenderFemale(): void {
    this.safeClick(this.genderFemale);
  }

  public typeFirstName(firstName: string): void {
    this.safeType(this.firstNameInput, firstName);
  }

  public typeLastName(lastName: string): void {
    this.safeType(this.lastNameInput, lastName);
  }

  public typeEmail(email: string): void {
    this.safeType(this.emailInput, email);
  }

  public typePassword(password: string): void {
    this.safeType(this.passwordInput, password);
  }

  public typeConfirmPassword(password: string): void {
    this.safeType(this.confirmPasswordInput, password);
  }

  public clickRegister(): void {
    this.safeClick(this.registerButton);
  }

  public clickContinue(): void {
    this.safeClick(this.continueButton);
  }

  public clickFirstName(): void {
    this.safeClick(this.firstNameInput);
  }

  public clickLastName(): void {
    this.safeClick(this.lastNameInput);
  }

  public clickPassword(): void {
    this.safeClick(this.passwordInput);
  }

  public fillRegistrationForm(data: RegisterData): void {
    if (data.gender === "male") {
      this.selectGenderMale();
    } else {
      this.selectGenderFemale();
    }

    this.typeFirstName(data.firstName);
    this.typeLastName(data.lastName);
    this.typeEmail(data.email);
    this.typePassword(data.password);
    this.typeConfirmPassword(data.confirmPassword);

    this.clickRegister();
  }
}
