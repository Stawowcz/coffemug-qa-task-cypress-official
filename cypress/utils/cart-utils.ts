import { CartPage } from "@pages/cart/cart-page";
import { HomePage } from "@pages/home/home-page";

const homePage = new HomePage();
const cartPage = new CartPage();

export class CartUtils {
  public static cartQtyText(qty: number): string {
    return `(${qty})`;
  }

  public static ensureEmptyCart(): void {
    homePage
      .getCartQty()
      .should("be.visible")
      .invoke("text")
      .then((text) => {
        const qty = Number(text.replace(/[()]/g, ""));

        if (qty > 0) {
          homePage.openCart();
          cartPage.setAllQuantities(0);
          cartPage.clickUpdateCart();

          cy.get(cartPage.cartItemRow).should("not.exist");
          homePage
            .getCartQty()
            .should("be.visible")
            .and("have.text", CartUtils.cartQtyText(0));
        }
      });
  }
}
