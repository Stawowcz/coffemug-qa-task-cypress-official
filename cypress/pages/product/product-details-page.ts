import { BasePage } from "@pages/base/base-page";

export class ProductDetailsPage extends BasePage {
  private readonly addToCartButton = 'input[id^="add-to-cart-button"]';

  public readonly title = '.product-name h1[itemprop="name"]';
  public readonly productPrice = ".product-price";
  public readonly productQuantity = ".qty-input";
  public readonly successNotification = ".bar-notification.success";

  public addToCart(): void {
    this.safeClick(this.addToCartButton);
  }
}
