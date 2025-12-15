import { BasePage } from "@pages/base/base-page";
import { RegisterData } from "@typing/user-data";
import { AppUrls } from "@constants/urls/app-urls";

export class RegisterPage extends BasePage {
  private readonly registerLink = 'a[href="/register"]';
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
  public readonly accountLabel = ".account";
  public readonly firstNameError = 'span[data-valmsg-for="FirstName"]';
  public readonly lastNameError = 'span[data-valmsg-for="LastName"]';
  public readonly emailError = 'span[data-valmsg-for="Email"]';
  public readonly passwordError = 'span[data-valmsg-for="Password"]';
  public readonly confirmPasswordError =
    'span[data-valmsg-for="ConfirmPassword"]';

  public goToPage(): void {
    super.goToPage(AppUrls.REGISTER);
  }

  public openRegisterPage(): void {
    this.safeClick(this.registerLink);
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
      this.safeClick(this.genderMale);
    }

    this.safeType(this.firstNameInput, data.firstName);
    this.safeType(this.lastNameInput, data.lastName);
    this.safeType(this.emailInput, data.email);
    this.safeType(this.passwordInput, data.password);
    this.safeType(this.confirmPasswordInput, data.confirmPassword);
    this.safeClick(this.registerButton);
  }
}
