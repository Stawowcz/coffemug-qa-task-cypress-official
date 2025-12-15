import { AppUrls } from "@constants/urls/app-urls";
import { BasePage } from "@pages/base/base-page";

export class ProductListingPage extends BasePage {
  private readonly advancedSearchCheckbox = "#As";
  private readonly keywordInput = "#Q";
  private readonly categorySelect = "#Cid";
  private readonly subcategoryCheckbox = "#Isc";
  private readonly manufacturerSelect = "#Mid";
  private readonly priceFromInput = "#Pf";
  private readonly priceToInput = "#Pt";
  private readonly searchDescriptionsCheckbox = "#Sid";
  private readonly searchButton = ".search-button";

  public readonly productItems = ".product-item";
  public readonly productTitles = ".product-title a";
  public readonly productPrices = ".prices";
  public readonly noResultsMessage = ".search-results .result";
  private readonly subCategoryGrid = ".sub-category-grid";
  public pageTitle = ".page-title h1";

  public goToPage(): void {
    super.goToPage(AppUrls.SEARCH);
  }

  public enableAdvancedSearch(): void {
    this.safeCheck(this.advancedSearchCheckbox);
  }

  public typeKeyword(keyword: string): void {
    this.safeType(this.keywordInput, keyword);
  }

  public enableSubcategories(): void {
    this.safeCheck(this.subcategoryCheckbox);
  }

  public selectCategory(category: string): void {
    this.safeSelect(this.categorySelect, category);
  }

  public selectManufacturer(manufacturer: string): void {
    this.safeSelect(this.manufacturerSelect, manufacturer);
  }

  public setPriceRange(min: number, max: number): void {
    this.safeType(this.priceFromInput, String(min));
    this.safeType(this.priceToInput, String(max));
  }

  public enableSearchInDescriptions(): void {
    this.safeCheck(this.searchDescriptionsCheckbox);
  }

  public clickSearch(): void {
    this.safeClick(this.searchButton);
  }

  public openProductByName(name: string): void {
    cy.contains(".product-title a", new RegExp(`^${name}$`))
      .should("be.visible")
      .click();
  }

  public getSubCategorySelector(subCategoryPath: string): string {
    return `${this.subCategoryGrid} h2.title a[href='/${subCategoryPath}']`;
  }

  public openSubCategory(subCategoryPath: string): void {
    this.safeClick(this.getSubCategorySelector(subCategoryPath));
  }
}
