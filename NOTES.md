## NOTES

This document describes key decisions, assumptions, known limitations, and one thing intentionally not implemented for this Cypress + TypeScript E2E task against **Demo Web Shop** (https://demowebshop.tricentis.com).


---

## Key decisions

### 1) Page Object Model (POM) + “safe” helpers
- Tests use **Page Object Model** classes (e.g. `HomePage`, `ProductListingPage`, `ProductDetailsPage`, `CartPage`).
- Common Cypress interactions are wrapped in `BasePage` helpers (`safeClick`, `safeType`, `safeCheck`, `safeSelect`) to reduce flakiness and avoid repeating `should("be.visible")` / retry patterns in every test.

### 2) Product Listing Page (PLP) as a shared abstraction
- The demo shop uses similar “listing” layouts for:
  - `/search?...`
  - category pages like `/desktops`
- Because selectors and behaviors overlap (product tiles, titles, prices, filters), the project uses a **single listing page object** (`ProductListingPage`) instead of duplicating the same methods in separate “SearchPage” and “CategoryPage” objects.

### 3) Avoiding unstable ordering
- Product ordering can change (sorting, paging, server-side changes).
- Tests prefer **selecting by product name** (e.g. `openProductByName(name)`) over clicking the “first” product to keep them deterministic.

### 4) Handling “0 results” edge case in search
- Search scenario explicitly checks for the “No products were found…” message.
- If there are no results, tests switch to advanced search and apply filters (category + price range + “search in descriptions”) and then verify results.

### 5) Authentication optimization via `cy.session`
- For suites that require a logged-in state, tests use a reusable helper (e.g. `loginWithSession()`).
- This reduces repeated UI logins, speeds up execution, and stabilizes tests.
- Registration tests deliberately do **not** use `cy.session`, because they validate the full registration/login/logout flow end-to-end.

### 6) Cart state cleanup via a utility
- Some flows depend on the cart being empty before the test starts.
- A utility (`CartUtils.ensureEmptyCart()`) normalizes state using the **existing UI flow** (open cart → set quantity to 0 → update).
- This prevents “test pollution” between runs and avoids false failures.

### 7) Test data centralized in `data/` and `constants/`
- Product names, slugs, prices, coupon messages, search inputs etc. are stored in dedicated modules to avoid hardcoding in tests.
- “Navigation definitions” (categories/subcategories + paths/titles) are treated as **constants** because they describe app navigation, not dynamic test data.

---

## Assumptions

- The demo environment is publicly available and stable enough for E2E practice.
- Credentials used for login are valid and provided through `cypress.env.json` (not committed).
- The UI layout and key CSS classes used by selectors are stable (e.g. `.product-item`, `.product-title a`, `.cart-qty`).
- Cart quantity in the header is displayed in parentheses, e.g. `(0)`, `(1)`.
- The discount/coupon feature is available and shows a validation message for invalid codes.

---

## Known limitations

- **Selector specificity for coupon validation message**: the demo shop uses a generic `.message` class, so the selector is not as strict as ideal. If the page later introduces multiple messages, this may need refinement (e.g. scoping within the coupon section).
- **Cart cleanup via UI** adds a small time cost (open cart + update). For a real project, a faster backend reset (API) would be preferred if available.
- **Limited assertions around totals recalculation**: cart mutation test checks subtotal changes and quantity updates; it does not fully recompute and validate tax/shipping/grand total, because these totals can vary with demo shop configuration and are not the focus of this task.
- **Filters coverage** is based on what is present on the demo shop. Some categories do not expose rich filters; therefore, the search scenario uses the available advanced search + price range.

---

## One thing intentionally NOT implemented

### Dedicated “Remove item” action and valid coupon discount flow

I intentionally did not implement:

- a separate **Remove item** flow (e.g., remove checkbox/button), and  
- a **valid coupon** scenario that applies a real discount,

because:

- **Demo Web Shop UI limitation:** the cart does not provide a dedicated “Remove” control. The only supported way to remove an item is to set quantity to `0` and click **Update cart**. Because of that, I covered cart mutations via **quantity updates** (and used quantity `0` during cart cleanup), which effectively removes items while keeping tests deterministic.

- **Valid coupon not available / not reliable:** the demo site does not expose a stable, documented **valid** promo code. Relying on unknown or temporary coupons would make the test flaky and environment-dependent. Instead, I implemented **invalid coupon validation**, which is deterministic and verifies correct error handling.

If this were a real project, I would add a valid coupon test only when a stable, controlled test coupon exists (or is guaranteed by the test environment), and then validate:

- discounted totals,  
- clear UI feedback,  
- coupon persistence across refresh.

---
