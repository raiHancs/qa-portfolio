/// <reference types="cypress" />

describe("Logout (UI)", () => {
  beforeEach(() => {
    cy.login(); // custom command if exists
  });

  it("should logout successfully", () => {
    cy.get("#logout").click();
    cy.url().should("include", "/login");
  });
});
