/// <reference types="cypress" />

describe("Dashboard UI Tests", () => {
  beforeEach(() => {
    cy.login();
  });

  it("should load dashboard widgets", () => {
    cy.visit("/dashboard");

    cy.contains("Welcome").should("be.visible");
    cy.get(".card").should("have.length.at.least", 1);
  });

  it("should show user profile summary", () => {
    cy.get("#profileName").should("be.visible");
    cy.get("#profileEmail").should("be.visible");
  });
});
