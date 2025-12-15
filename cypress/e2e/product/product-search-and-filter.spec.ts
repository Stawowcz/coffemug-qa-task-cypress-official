/// <reference types="cypress" />

import { HomePage } from "@pages/home/home-page";
import { ProductListingPage } from "@pages/product/product-listing-page";
import { ProductDetailsPage } from "@pages/product/product-details-page";

import { Categories } from "@constants/navigation/categories";
import { Subcategories } from "@constants/navigation/subcategories";
import { AppUrls } from "@constants/urls/app-urls";
import { SearchMessages } from "@constants/texts/messages/search-messages";
import { GlobalUiTexts } from "@constants/texts/ui-texts/global-ui-texts";

import { ProductData } from "@data/product-data";
import { SearchData } from "@data/search-data";

import { CartUtils } from "@utils/cart-utils";
import { loginWithSession } from "cypress/support/auth-session";

describe("Product Searching and Filtering", () => {
  const homePage = new HomePage();
  const productListingPage = new ProductListingPage();
  const productDetailsPage = new ProductDetailsPage();

  beforeEach(() => {
    loginWithSession();

    cy.visit("/");

    CartUtils.ensureEmptyCart();
  });

  it("searches for electronics and applies filters when no results are found", () => {
    homePage.searchFromHeader(Categories.ELECTRONICS.title);

    cy.get("body").then(($body) => {
      const noResults = $body
        .find(productListingPage.noResultsMessage)
        .text()
        .includes(SearchMessages.NO_RESULTS_FOUND);

      if (noResults) {
        productListingPage.enableAdvancedSearch();
        productListingPage.typeKeyword(SearchData.CAMERA);
        productListingPage.selectCategory(Categories.ELECTRONICS.title);
        productListingPage.enableSubcategories();
        productListingPage.selectManufacturer(GlobalUiTexts.MANUFACTURER_ALL);
        productListingPage.setPriceRange(
          SearchData.PRICE_FROM,
          SearchData.PRICE_TO,
        );
        productListingPage.enableSearchInDescriptions();
        productListingPage.clickSearch();

        productListingPage.expectUrlContains(AppUrls.SEARCH);

        cy.get(productListingPage.productItems)
          .should("exist")
          .and(($items) => expect($items.length).to.be.greaterThan(0));

        cy.get(productListingPage.productTitles).each(($el) => {
          expect($el.text().toLowerCase()).to.match(/cam|camera|photo/);
        });

        cy.get(productListingPage.productPrices).each(($price) => {
          const value = parseFloat($price.text().replace(/[^0-9.]/g, ""));

          if (!Number.isNaN(value)) {
            expect(value).to.be.within(
              SearchData.PRICE_FROM,
              SearchData.PRICE_TO,
            );
          }
        });

        return;
      }

      cy.get(productListingPage.productItems)
        .should("exist")
        .and(($items) => expect($items.length).to.be.greaterThan(0));

      cy.get(productListingPage.productTitles).each(($el) => {
        expect($el.text().toLowerCase()).to.contain(
          Categories.ELECTRONICS.title,
        );
      });
    });
  });

  it("opens product via category and subcategory navigation", () => {
    homePage.goToPage();

    homePage.openCategory(Categories.COMPUTERS.slug);
    homePage.expectUrlContains(Categories.COMPUTERS.path);

    productListingPage.openSubCategory(Subcategories.DESKTOPS.slug);
    productListingPage.expectUrlContains(Subcategories.DESKTOPS.path);

    cy.get(productListingPage.pageTitle).should(
      "have.text",
      Subcategories.DESKTOPS.title,
    );

    cy.get(productListingPage.productItems)
      .should("exist")
      .and("have.length.greaterThan", 0);

    productListingPage.openProductByName(
      ProductData.BUILD_YOUR_OWN_COMPUTER.name,
    );

    cy.get(productDetailsPage.title).should(
      "contain.text",
      ProductData.BUILD_YOUR_OWN_COMPUTER.name,
    );

    productDetailsPage.expectUrlContains(
      ProductData.BUILD_YOUR_OWN_COMPUTER.path,
    );

    cy.get(productDetailsPage.productPrice).should(
      "contain.text",
      ProductData.BUILD_YOUR_OWN_COMPUTER.price,
    );

    cy.get(productDetailsPage.productQuantity).should(
      "have.value",
      ProductData.BUILD_YOUR_OWN_COMPUTER.quantity,
    );
  });
});
