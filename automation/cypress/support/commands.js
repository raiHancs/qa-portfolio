// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })


/// <reference types="cypress" />

// ----------------------
// Register Command
// ----------------------
Cypress.Commands.add("register", (user = {}) => {
  const payload = {
    username: user.username || "testuser",
    email: user.email || `user_${Date.now()}@test.com`,
    password: user.password || "Password123!"
  };

  return cy.request({
    method: "POST",
    url: "/auth/register",
    body: payload,
    failOnStatusCode: false
  }).then(res => {
    expect([200, 201, 409]).to.include(res.status);
    return res.body;
  });
});


// ----------------------
// Login Command
// ----------------------
Cypress.Commands.add("login", (email, password) => {
  return cy.request({
    method: "POST",
    url: "/auth/login",
    body: {
      email: email || Cypress.env("TEST_EMAIL"),
      password: password || Cypress.env("TEST_PASSWORD")
    }
  }).then(res => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property("token");

    Cypress.env("token", res.body.token);

    return res.body.token;
  });
});


// ----------------------
// Logout Command
// ----------------------
Cypress.Commands.add("logout", () => {
  const token = Cypress.env("token");

  return cy.request({
    method: "POST",
    url: "/auth/logout",
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => {
    expect([200, 204]).to.include(res.status);
  });
});


// ----------------------
// Fetch Profile
// ----------------------
Cypress.Commands.add("fetchProfile", () => {
  const token = Cypress.env("token");

  return cy.request({
    method: "GET",
    url: "/profile",
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => {
    expect(res.status).to.eq(200);
    expect(res.body).to.have.property("email");
    return res.body;
  });
});


// ----------------------
// Update Profile
// ----------------------
Cypress.Commands.add("updateProfile", (updateData) => {
  const token = Cypress.env("token");

  return cy.request({
    method: "PUT",
    url: "/profile",
    headers: { Authorization: `Bearer ${token}` },
    body: updateData
  }).then(res => {
    expect([200, 204]).to.include(res.status);
  });
});


// ----------------------
// CRUD Commands
// ----------------------
Cypress.Commands.add("createItem", (data) => {
  const token = Cypress.env("token");

  return cy.request({
    method: "POST",
    url: "/items",
    headers: { Authorization: `Bearer ${token}` },
    body: data
  }).then(res => {
    expect(res.status).to.eq(201);
    return res.body.id;
  });
});

Cypress.Commands.add("readItem", (id) => {
  const token = Cypress.env("token");

  return cy.request({
    method: "GET",
    url: `/items/${id}`,
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => {
    expect(res.status).to.eq(200);
    return res.body;
  });
});

Cypress.Commands.add("updateItem", (id, data) => {
  const token = Cypress.env("token");

  return cy.request({
    method: "PUT",
    url: `/items/${id}`,
    headers: { Authorization: `Bearer ${token}` },
    body: data
  }).then(res => {
    expect([200, 204]).to.include(res.status);
  });
});

Cypress.Commands.add("deleteItem", (id) => {
  const token = Cypress.env("token");

  return cy.request({
    method: "DELETE",
    url: `/items/${id}`,
    headers: { Authorization: `Bearer ${token}` }
  }).then(res => {
    expect([200, 204]).to.include(res.status);
  });
});
