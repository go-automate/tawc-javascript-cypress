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
// Cypress.Commands.add("login", (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This is will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

// Cypress will send HTTP requests to check to see if the product is alread present in the list. If it is, delete it.
Cypress.Commands.add("deleteProducts", testProduct => {

  /**
   * Command - captures the response body and passes it to our parsing and deleting functions
   */
  cy.request("http://localhost:3000/api/v1/products").then(response => {
    checkForProducts(response.body);
  });

  /**
   * parses the array for any products that match the test data
   * @param {Array} body - an array of objects (products)
   */
  function checkForProducts(body) {
    for (var product of body) {
      if (product.prod_name === testProduct.name) {
        deleteAProduct(product);
      }
    }
  }

  /**
   * Deletes a product
   * @param {Object} product object
   */
  function deleteAProduct(product) {
    // Send a DELETE request to create the computer
    cy.request("DELETE", "http://localhost:3000/api/v1/products/" + product._id)
      // Check that this was accepted by the server (200 ok)
      .should(response => {
        expect(response.status).to.eq(200);
      });
  }
});


// Check if a product is present in the list
Cypress.Commands.add("checkForProduct", testProduct => {

  cy.request("http://localhost:3000/api/v1/products").then(response => {
    for (var product of response.body) {
      if (product.prod_name === testProduct.name) {
        return true;
      }
      return false;
    }
  });

});


// Cypress will send HTTP requests to check to see if the product is alread present in the list. If it isn't, create it.
Cypress.Commands.add("addProduct", testProduct => {

  /**
   * Command - captures the response body and passes it to our parsing and deleting functions
   */
  cy.request("http://localhost:3000/api/v1/products").then(response => {
    checkForProducts(response.body);
  });

  /**
   * parses the array for any products that match the test data
   * @param {Array} body - an array of objects (products)
   */
  function checkForProducts(body) {
    var check = 0;
    for (var product of body) {
      if (product.prod_name === testProduct.name) {
        check = check + 1
      }
    }
    if (check === 0){
      addAProduct(testProduct)
    }
  }

  /**
   * Adds a product
   * @param {Object} product object
   */
  function addAProduct(product) {

    var apiProduct = { prod_name : product.name, prod_desc : product.description, prod_price : product.price }

    var requestBody = JSON.stringify(apiProduct)

    cy.request({
      method: 'POST',
      url: 'http://localhost:3000/api/v1/products',
      body: requestBody,
      headers: { 'Content-Type' : 'application/json; charset=utf-8' },
    }).should(response => {
      expect(response.status).to.eq(200);
  })
}

})

Cypress.Commands.add("deleteAllProducts", () => {

  /**
   * Command - captures the response body and passes it to our parsing and deleting functions
   */
  cy.request("http://localhost:3000/api/v1/products").then(response => {
    checkForProducts(response.body);
  });

  /**
   * parses the array for any products that match the test data
   * @param {Array} body - an array of objects (products)
   */
  function checkForProducts(body) {
    for (var product of body) {
        deleteAProduct(product);
    }
  }

  /**
   * Deletes a product
   * @param {Object} product object
   */
  function deleteAProduct(product) {
    // Send a DELETE request to create the computer
    cy.request("DELETE", "http://localhost:3000/api/v1/products/" + product._id)
      // Check that this was accepted by the server (200 ok)
      .should(response => {
        expect(response.status).to.eq(200);
      });
  }
});

