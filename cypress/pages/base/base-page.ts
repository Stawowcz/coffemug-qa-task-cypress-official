export class BasePage {
  public goToPage(path: string = "/"): void {
    cy.visit(path);
  }

  protected safeClick(selector: string): void {
    cy.get(selector).should("be.visible").and("not.be.disabled").click();
  }

  protected safeClickByText(text: string): void {
    cy.contains(text).should("be.visible").and("not.be.disabled").click();
  }

  protected safeType(selector: string, text: string): void {
    cy.get(selector)
      .should("be.visible")
      .and("not.be.disabled")
      .clear()
      .type(text);
  }

  protected safeCheck(selector: string): void {
    cy.get(selector)
      .should("be.visible")
      .and("not.be.disabled")
      .check({ force: true });
  }

  protected safeSelect(selector: string, value: string): void {
    cy.get(selector)
      .should("be.visible")
      .and("not.be.disabled")
      .select(value, { force: true });
  }

  public expectUrlContains(partialUrl: string): void {
    cy.url().should("include", partialUrl);
  }
}
