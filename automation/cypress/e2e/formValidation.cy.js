/// <reference types="cypress" />

describe("Form Validation Tests", () => {
  it("should show validation error for empty form", () => {
    cy.visit("/register");

    cy.get("button[type='submit']").click();

    cy.contains("Email is required").should("be.visible");
    cy.contains("Password is required").should("be.visible");
  });

  it("should show invalid email message", () => {
    cy.get("#email").type("wrongemail");
    cy.get("button[type='submit']").click();

    cy.contains("Enter a valid email").should("be.visible");
  });

  it("should show password mismatch error", () => {
    cy.get("#password").type("aaa");
    cy.get("#confirmPassword").type("bbb");

    cy.get("button[type='submit']").click();

    cy.contains("Passwords do not match").should("be.visible");
  });
});
