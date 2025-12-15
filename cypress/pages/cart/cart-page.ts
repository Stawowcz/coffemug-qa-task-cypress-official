import { BasePage } from "@pages/base/base-page";

import { AppUrls } from "@constants/urls/app-urls";

export class CartPage extends BasePage {
  private readonly updateCartButton = 'input[name="updatecart"]';
  private readonly couponField = 'input[name="discountcouponcode"]';
  private readonly applyCouponButton = 'input[name="applydiscountcouponcode"]';

  public readonly cartItemRow = ".cart-item-row";
  public readonly productName = ".product-name";
  public readonly unitPrice = ".product-unit-price";
  public readonly qtyInput = ".qty-input";
  public readonly subtotal = ".product-subtotal";
  public readonly couponValidationMessage = ".message";

  public goToPage(): void {
    super.goToPage(AppUrls.CART);
  }

  public updateQuantity(qty: number): void {
    this.safeType(this.qtyInput, String(qty));
  }

  public enterCouponCode(code: string): void {
    this.safeType(this.couponField, code);
  }

  public clickApplyCoupon(): void {
    this.safeClick(this.applyCouponButton);
  }

  public applyCoupon(code: string): void {
    this.enterCouponCode(code);
    this.clickApplyCoupon();
  }

  public clickUpdateCart(): void {
    this.safeClick(this.updateCartButton);
  }

  public setAllQuantities(qty: number): void {
    cy.get(this.qtyInput).each(($input) => {
      cy.wrap($input).clear().type(String(qty));
    });
  }
}
