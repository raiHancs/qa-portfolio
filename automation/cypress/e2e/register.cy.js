/// <reference types="cypress" />

describe("User Registration (UI)", () => {
  it("should register a new user successfully", () => {
    cy.visit("/register");

    const email = `user_${Date.now()}@test.com`;

    cy.get("#username").type("testuser");
    cy.get("#email").type(email);
    cy.get("#password").type("Password123!");
    cy.get("#confirmPassword").type("Password123!");

    cy.get("button[type='submit']").click();

    cy.contains("Registration successful").should("be.visible");
  });
});
