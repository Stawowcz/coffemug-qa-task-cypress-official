import { BasePage } from "@pages/base/base-page";

import { AppUrls } from "@constants/urls/app-urls";

export class LoginPage extends BasePage {
  private readonly emailInput = "#Email";
  private readonly passwordInput = "#Password";
  private readonly loginButton = 'input[value="Log in"]';

  public goToPage(): void {
    super.goToPage(AppUrls.LOGIN);
  }

  public login(email: string, password: string): void {
    this.safeType(this.emailInput, email);
    this.safeType(this.passwordInput, password);
    this.safeClick(this.loginButton);
  }
}
