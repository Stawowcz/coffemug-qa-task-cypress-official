// This file is loaded automatically before test files.
import "./commands";

// You can add global configuration or hooks here.
Cypress.on("uncaught:exception", () => false);
