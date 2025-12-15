import { AppUrls } from "@constants/urls/app-urls";
import { BasePage } from "@pages/base/base-page";

export class CartPage extends BasePage {
  public readonly cartItemRow = ".cart-item-row";
  public readonly productName = ".product-name";
  public readonly unitPrice = ".product-unit-price";
  public readonly qtyInput = ".qty-input";
  public readonly subtotal = ".product-subtotal";
  private updateCartButton = 'input[name="updatecart"]';
  private readonly couponField = 'input[name="discountcouponcode"]';
  private readonly applyCouponButton = 'input[name="applydiscountcouponcode"]';
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
}
