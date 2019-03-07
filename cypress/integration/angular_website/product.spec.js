context('manage product tests (CRUD)', () => {

    beforeEach(() => {

      // open web page with base URL
        cy.visit('')
      })

    it("creates a new product", () => {

        // Add a `fixture` function around our test steps
        cy.fixture('product').then((product) => {  
          
            // Given the product doesn't exist
            cy.deleteProducts(product);

            // click on add product button
            cy.get('.mat-flat-button, .mat-primary').click();

            // check that we're now on the add product page
            cy.url().should('include', '/product-add');

            // fill out the name field with our test data
            cy.get('#mat-input-0').type(product.name);

            // fill out the description field with our test data
            cy.get('#mat-input-1').type(product.description);

            // fill out the price field with our test data
            cy.get('#mat-input-2').type(product.price);

            // click on the save button
            cy.get('[type="submit"]').click();

            // Check that the product is created
            cy.get('h2').should('contain',product.name);

        })

    })  

    // edit product test

    // view product test

    // delete product test

})