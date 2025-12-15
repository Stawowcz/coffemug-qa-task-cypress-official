import { HomePage } from "@pages/home/home-page";
import { CartPage } from "@pages/cart/cart-page";

const homePage = new HomePage();
const cartPage = new CartPage();

export class CartUtils {
  static ensureEmptyCart(): void {
    cy.get(homePage.cartQty)
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const qty = Number(text.replace(/[()]/g, ""));

        if (qty > 0) {
          homePage.openCart();
          cartPage.updateQuantity(0);
          cartPage.clickUpdateCart();
        }
      });
  }
}
