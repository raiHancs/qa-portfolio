/// <reference types="cypress" />

describe("CRUD API Automation Suite", () => {
  let token;
  let createdId;

  before(() => {
    cy.request("POST", "/auth/login", {
      email: Cypress.env("TEST_EMAIL") || "test@example.com",
      password: Cypress.env("TEST_PASSWORD") || "Password123!"
    }).then(res => {
      token = res.body.token;
    });
  });

  it("CREATE item", () => {
    cy.request({
      method: "POST",
      url: "/items",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        name: "Test Item",
        price: 500
      }
    }).then(res => {
      expect(res.status).to.eq(201);
      createdId = res.body.id;
    });
  });

  it("READ item", () => {
    cy.request({
      method: "GET",
      url: `/items/${createdId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("name");
    });
  });

  it("UPDATE item", () => {
    cy.request({
      method: "PUT",
      url: `/items/${createdId}`,
      headers: { Authorization: `Bearer ${token}` },
      body: { price: 999 }
    }).then(res => {
      expect([200, 204]).to.include(res.status);
    });
  });

  it("DELETE item", () => {
    cy.request({
      method: "DELETE",
      url: `/items/${createdId}`,
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect([200, 204]).to.include(res.status);
    });
  });

  // ---- EXTRA ---- Profile Fetch & Update ----

  it("Profile Fetch", () => {
    cy.request({
      method: "GET",
      url: "/profile",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("email");
    });
  });

  it("Profile Update", () => {
    cy.request({
      method: "PUT",
      url: "/profile",
      headers: { Authorization: `Bearer ${token}` },
      body: { username: "CRUD_Profile_Updated" }
    }).then(res => {
      expect([200, 204]).to.include(res.status);
    });
  });
});
