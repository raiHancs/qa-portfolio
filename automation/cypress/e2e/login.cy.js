/// <reference types="cypress" />

describe("User Login (UI)", () => {
  it("should login successfully", () => {
    cy.visit("/login");

    cy.get("#email").type(Cypress.env("TEST_EMAIL") || "test@example.com");
    cy.get("#password").type(Cypress.env("TEST_PASSWORD") || "Password123!");

    cy.get("button[type='submit']").click();

    cy.url().should("include", "/dashboard");
  });
});
