import { HomePage } from "@pages/home/home-page";
import { ProductListingPage } from "@pages/product/product-listing-page";
import { ProductDetailsPage } from "@pages/product/product-details-page";
import { CartPage } from "@pages/cart/cart-page";

import { ProductData } from "@data/product-data";
import { CouponData } from "@data/coupon-data";

import { CartUtils } from "@utils/cart-utils";
import { loginWithSession } from "cypress/support/auth-session";

describe("Cart - Coupon / Discount", () => {
  const homePage = new HomePage();
  const productListingPage = new ProductListingPage();
  const productDetailsPage = new ProductDetailsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    loginWithSession();

    cy.visit("/");

    CartUtils.ensureEmptyCart();
  });

  it("should show validation message for invalid coupon code", () => {
    homePage.searchFromHeader(ProductData.SMARTPHONE.name);
    productListingPage.openProductByName(ProductData.SMARTPHONE.name);

    productDetailsPage.addToCart();
    homePage.openCart();

    cartPage.applyCoupon(CouponData.INVALID.code);

    cy.get(cartPage.couponValidationMessage).should(
      "contain.text",
      CouponData.INVALID.message,
    );
  });
});
