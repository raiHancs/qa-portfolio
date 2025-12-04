/// <reference types="cypress" />

describe("Authentication API Test Suite", () => {
  let token;
  let email = `api_user_${Date.now()}@test.com`;

  it("Register API", () => {
    cy.request({
      method: "POST",
      url: "/auth/register",
      body: {
        username: "apiuser",
        email,
        password: "Password123!"
      },
      failOnStatusCode: false
    }).then(res => {
      expect([200, 201, 409]).to.include(res.status);
    });
  });

  it("Login API", () => {
    cy.request({
      method: "POST",
      url: "/auth/login",
      body: {
        email,
        password: "Password123!"
      }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("token");

      token = res.body.token;
    });
  });

  it("Profile Fetch API", () => {
    cy.request({
      method: "GET",
      url: "/profile",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect(res.status).to.eq(200);
      expect(res.body).to.have.property("email");
      expect(res.body).to.have.property("username");
    });
  });

  it("Profile Update API", () => {
    cy.request({
      method: "PUT",
      url: "/profile",
      headers: { Authorization: `Bearer ${token}` },
      body: {
        username: "updatedName"
      }
    }).then(res => {
      expect([200, 204]).to.include(res.status);
    });
  });

  it("Logout API", () => {
    cy.request({
      method: "POST",
      url: "/auth/logout",
      headers: { Authorization: `Bearer ${token}` }
    }).then(res => {
      expect([200, 204]).to.include(res.status);
    });
  });
});
