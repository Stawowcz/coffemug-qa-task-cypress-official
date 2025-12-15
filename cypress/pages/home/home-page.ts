import { BasePage } from "@pages/base/base-page";

export class HomePage extends BasePage {
  private readonly registerLink = 'a[href="/register"]';
  public readonly loginLink = 'a[href="/login"]';
  public readonly logoutLink = 'a[href="/logout"]';
  public readonly accountLabel = ".account";

  private readonly searchInput = "#small-searchterms";
  private readonly searchButton =
    'form[action="/search"] input[type="submit"][value="Search"]';

  public readonly cartQty = ".cart-qty";
  private readonly cartLink = "#topcartlink";

  private readonly categoryNavigation = ".block-category-navigation";

  public goToPage(): void {
    super.goToPage();
  }

  public openRegisterPage(): void {
    this.safeClick(this.registerLink);
  }

  public openLoginPage(): void {
    this.safeClick(this.loginLink);
  }

  public clickLogout(): void {
    this.safeClick(this.logoutLink);
  }

  public searchFromHeader(keyword: string): void {
    this.safeType(this.searchInput, keyword);
    this.safeClick(this.searchButton);
  }

  public openCart(): void {
    this.safeClick(this.cartLink);
  }

  public getCartQty(): Cypress.Chainable<JQuery<HTMLElement>> {
    return cy.get(this.cartQty);
  }

  public getCategorySelector(categoryPath: string): string {
    return `${this.categoryNavigation} a[href='/${categoryPath}']`;
  }

  public openCategory(categoryPath: string): void {
    this.safeClick(this.getCategorySelector(categoryPath));
  }
}
