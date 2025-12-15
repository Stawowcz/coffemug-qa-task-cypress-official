/// <reference types="cypress" />

import { HomePage } from "@pages/home/home-page";
import { ProductListingPage } from "@pages/product/product-listing-page";
import { ProductDetailsPage } from "@pages/product/product-details-page";
import { CartPage } from "@pages/cart/cart-page";

import { CartMessages } from "@constants/texts/messages/cart-messages";

import { ProductData } from "@data/product-data";

import { CartUtils } from "@utils/cart-utils";
import { loginWithSession } from "cypress/support/auth-session";

describe("Add to Cart - Smartphone Scenario", () => {
  const homePage = new HomePage();
  const productListingPage = new ProductListingPage();
  const productDetailsPage = new ProductDetailsPage();
  const cartPage = new CartPage();

  beforeEach(() => {
    loginWithSession();

    cy.visit("/");

    CartUtils.ensureEmptyCart();
  });

  it("should add a smartphone to the shopping cart and verify it was added", () => {
    homePage.searchFromHeader(ProductData.SMARTPHONE.name);

    cy.get(productListingPage.productItems)
      .should("exist")
      .and("have.length.greaterThan", 0);

    productListingPage.openProductByName(ProductData.SMARTPHONE.name);
    productDetailsPage.addToCart();

    cy.get(productDetailsPage.successNotification)
      .should("be.visible")
      .and("contain.text", CartMessages.ADD_TO_CART_SUCCESS);

    cy.get(homePage.cartQty)
      .should("be.visible")
      .and("have.text", CartUtils.cartQtyText(1));

    homePage.openCart();

    cy.get(cartPage.cartItemRow).should("exist");
    cy.get(cartPage.productName).should(
      "have.text",
      ProductData.SMARTPHONE.name,
    );

    cy.get(cartPage.cartItemRow).within(() => {
      cy.get(cartPage.unitPrice).should(
        "have.text",
        ProductData.SMARTPHONE.price,
      );
      cy.get(cartPage.qtyInput).should(
        "have.value",
        ProductData.SMARTPHONE.quantity,
      );
      cy.get(cartPage.subtotal).should(
        "have.text",
        ProductData.SMARTPHONE.subtotal,
      );
    });
  });

  it("should update product quantity in the cart and recalculate totals", () => {
    homePage.searchFromHeader(ProductData.SMARTPHONE.name);
    productListingPage.openProductByName(ProductData.SMARTPHONE.name);

    productDetailsPage.addToCart();
    homePage.openCart();

    cartPage.updateQuantity(2);
    cartPage.clickUpdateCart();

    cy.get(cartPage.qtyInput).should("have.value", "2");
    cy.get(cartPage.subtotal).should(
      "not.contain",
      ProductData.SMARTPHONE.subtotal,
    );
  });
});
