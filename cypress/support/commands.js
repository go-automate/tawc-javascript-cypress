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
Cypress.Commands.add("deleteProducts", (product) => {

            var responseBody;
            
            // Store the response array of products
            cy.request('http://localhost:3000/api/v1/products')
                .then((response) => {
                    responseBody = response.body;
                })
            
                // loop through the array of objects
            responseBody.array.forEach(browserProduct => {
                if(browserProduct.prod_name == product.name){
                     // Send a DELETE request to create the computer
                     cy.request('DELETE', 'http://localhost:3000/api/v1/products/' + browserProduct._id)
                     // Check that this was accepted by the server (200 ok)
                     .should((response) => {
                         expect(response.status).to.eq(200)
                      })
                }
                
            });
                
    })