context("manage product tests (CRUD)", () => {
  beforeEach(() => {
    // CP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    cy.visit("");
  });

  // it("create a product", () => {

  //   // Import our test data
  //   cy.fixture("product").then(products => {
  //     for(let product of products){

  //       console.log("Here's our product")
  //       console.log(product)

  //     // CPSU01
  //     // SETUP: Check whether the `Product` is present in the list, if it's there, delete it.
  //     cy.deleteProducts(product);

  //     // ASSERT: `Product` isn't in list.
  //     cy.checkForProduct(product).should("eq", false)

  //     // CP02
  //     // Click on the `Add Product` button
  //     cy.get(".mat-flat-button, .mat-primary").click();

  //     // ASSERT: We're on the `Add Product` page
  //     cy.url().should("include", "/product-add");

  //     // CP03
  //     // Enter a `Name`, `Description` and `Price` for a Product (see `test-data.adoc` for Test Data)
  //     // `Product` details entered      
  //     cy.get('input[formcontrolname="prod_name"]').type(product.name);
  //     cy.get('input[formcontrolname="prod_desc"]').type(product.description);
  //     cy.get('input[formcontrolname="prod_price"]').type(product.price);

  //     cy.get('[type="submit"]').click();

  //     // CP04
  //     // Press the `Save` button.
  //     // ASSERT: The `View` product page opens.
  //     cy.url().should("include", "/product-details")

  //     // ASSERT: The product details are correct (`name`, `description`, `price`).
  //     cy.get("h2").should("contain", product.name);
  //     cy.get("mat-card-subtitle.mat-card-subtitle").should("contain", product.description);
  //     cy.get("dl dd:first").should("contain", product.price)

  //     // CP05
  //     // Press the `Products Page` button.
  //     // ASSERT: We're returned to the `Products Page`.
  //     cy.get("div.button-row a.mat-flat-button.mat-primary").click();

  //     // ASSERT: The new `Product` is listed.
  //     cy.get("td.cdk-column-prod_name:last").should("contain", product.name);
  //     cy.get("td.cdk-column-prod_price:last").should("contain", product.price);

  //     // CPTD01
  //     // TEARDOWN: Delete the `Product` that was created.
  //     cy.deleteProducts(product);
      
  //     // Check product is no longer present
  //     cy.checkForProduct(product).should("eq", false)

  //     }

  //   });
  // });

  // edit product test

  it("edit a product", () => {

    // cy.deleteAllProducts();

        // Import our test data
        cy.fixture("product").then(products => {
          for(let product of products){
    // EPSU01
    // SETUP: Check whether the `Product` is present in the list, if it's not, create it.

    cy.addProduct(product)
    

    // ASSERT: `Product` in list.
    // EP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    // EP02
    // Click on the `Product` name
    // ASSERT: We're on the `View Product` page
    // EP03
    // Click on the `Edit Product` button
    // ASSERT: We're on the `Edit Product Page`
    // EP04
    // Clear the `name`, `description` and `price` fields.
    // VERIFY: The fields are empty.
    // EP05
    // Enter new details from the `test-data-edit-product.json` file
    // New details are entered
    // EP06
    // Click on the `Save` button
    // ASSERT: We are taken to the `View Product` screen
    // ASSERT: The `name`, `description` and `price` of the product have been updated.
    // EP07
    // Click on the `Products Page` button
    // ASSERT: The `name` and `description` have been updated.
    // EPTD01
    // TEARDOWN: Delete the `Product` that was created.
    // ASSERT: `Product` is no longer listed.

          }
        });

  });

  // view product test
  it("view a product", () => {
    // VPSU01
    // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
    // ASSERT: `Product` in list.
    // VP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    // VERIFY: The `name` and `description` are correct.
    // VP02
    // Click on the `Product` name
    // ASSERT: We're on the `View Product` page
    // VERIFY: The `name`, `description` and `price` of the product are correct.
    // VPTD01
    // TEARDOWN: Delete the `Product` that was created.
    // ASSERT: `Product` is no longer listed.
  });

  // delete product test
  it("delete a product", () => {
    // VPSU01
    // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
    // ASSERT: `Product` in list.
    // VP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    // VERIFY: The `name` and `description` are correct.
    // VP02
    // Click on the `Product` name
    // ASSERT: We're on the `View Product` page
    // VERIFY: The `name`, `description` and `price` of the product are correct.
    // VPTD01
    // TEARDOWN: Delete the `Product` that was created.
    // ASSERT: `Product` is no longer listed.
  });
});
