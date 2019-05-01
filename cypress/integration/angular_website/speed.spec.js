context("Create Product", () => {
  beforeEach(() => {
    // API requests for setup
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // CPSU01
        // SETUP: Check whether the `Product` is present in the list, if it's there, delete it.
        cy.deleteProducts(product.name);
      }
    });

    // CP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    cy.visit("");
  });

  afterEach(() => {
    // API requests for teardown
    // CPTD01
    // TEARDOWN: Delete the `Product` that was created.
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        cy.deleteProducts(product.name);
      }
    });
  });

  it("create a product", () => {
    // Import our test data
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // ASSERT: `Product` isn't in list.
        cy.checkForProduct(product).should("eq", false);

        // CP02
        // Click on the `Add Product` button
        cy.get(".mat-flat-button, .mat-primary").click();

        // ASSERT: We're on the `Add Product` page
        cy.url().should("include", "/product-add");

        // CP03
        // Enter a `Name`, `Description` and `Price` for a Product (see `test-data.adoc` for Test Data)
        // `Product` details entered
        cy.get('input[formcontrolname="prod_name"]').type(product.name);
        cy.get('input[formcontrolname="prod_desc"]').type(product.description);
        cy.get('input[formcontrolname="prod_price"]').type(product.price);

        cy.get('[type="submit"]').click();

        // CP04
        // Press the `Save` button.
        // ASSERT: The `View` product page opens.
        cy.url().should("include", "/product-details");

        // ASSERT: The product details are correct (`name`, `description`, `price`).
        cy.get("h2").should("contain", product.name);
        cy.get("mat-card-subtitle.mat-card-subtitle").should(
          "contain",
          product.description
        );
        cy.get("dl dd:first").should("contain", product.price);

        // CP05
        // Press the `Products Page` button.
        // ASSERT: We're returned to the `Products Page`.
        cy.get("div.button-row a.mat-flat-button.mat-primary").click();

        // ASSERT: The new `Product` is listed.
        cy.get("td.cdk-column-prod_name:last").should("contain", product.name);
        cy.get("td.cdk-column-prod_price:last").should("contain", product.price);
      }
    });
  });
});

context("Edit Product", () => {
  beforeEach(() => {
    // API requests for setup
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // EPSU01
        // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
        cy.addProduct(product);
        // ASSERT: `Product` in list.
        cy.checkForProduct(product).should("eq", true);
      }
    });

    // CP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    cy.visit("");
  });

  afterEach(() => {
    // API requests for teardown
    // EPTD01
    // TEARDOWN: Delete the `Product` that was created.
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        cy.deleteProducts(product.editName);
        // ASSERT: `Product` not in list.
        cy.checkForProduct(product).should("eq", false);
      }
    });
  });

  // edit product test

  it("edit a product", () => {
    // Import our test data
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // EP01
        // Navigate to the `Products Page`
        // ASSERT: We're on the `Products Page` of the Website
        cy.url().should("include", "/products");

        // EP02
        // Click on the `Product` name
        cy.get("td:contains(" + product.name + ")").click();

        // ASSERT: We're on the `View Product` page
        cy.url().should("include", "/product-details");

        // EP03
        // Click on the `Edit Product` button
        cy.get('[href*="product-edit"]').click();
        // ASSERT: We're on the `Edit Product Page`
        cy.url().should("include", "/product-edit");

        // EP04
        // Clear the `name`, `description` and `price` fields.
        cy.get("[formcontrolname=prod_name]").clear();
        cy.get("[formcontrolname=prod_desc]").clear();
        cy.get("[formcontrolname=prod_price]").clear();

        // VERIFY: The fields are empty.
        cy.get("[formcontrolname=prod_name]").should("have.value", "");
        cy.get("[formcontrolname=prod_desc]").should("have.value", "");
        cy.get("[formcontrolname=prod_price]").should("have.value", "");

        // EP05
        // Enter new details from the `test-data-edit-product.json` file
        cy.get("[formcontrolname=prod_name]").type(product.editName);
        cy.get("[formcontrolname=prod_desc]").type(product.editDescription);
        cy.get("[formcontrolname=prod_price]").type(product.editPrice);

        // New details are entered

        // EP06
        // Click on the `Save` button
        cy.get("[type=submit]").click();

        // ASSERT: We are taken to the `View Product` screen
        // cy.url().should("include", "/product-details");

        // ASSERT: The `name`, `description` and `price` of the product have been updated.
        cy.get("mat-card-title > h2").should("have.text", product.editName);
        cy.get("div mat-card-subtitle").should(
          "have.text",
          product.editDescription
        );
        cy.get("dd:first-of-type").should("have.text", product.editPrice);

        // EP07
        // Click on the `Products Page` button
        cy.get('[href*="products"]').click();

        cy.url().should("include", "/products");

        // ASSERT: The `name` and `description` have been updated.
        cy.get("td:contains(" + product.editName + ")").should("be.visible");
        cy.get("td:contains(" + product.editPrice + ")").should("be.visible");
      }
    });
  });
});

context("View A Product", () => {
  beforeEach(() => {
    // API requests for setup
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // VPSU01
        // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
        cy.addProduct(product);
        // ASSERT: `Product` in list.
        cy.checkForProduct(product).should("eq", true);
      }
    });

    // CP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    cy.visit("");
  });

  afterEach(() => {
    // API requests for teardown
    // VPTD01
    // TEARDOWN: Delete the `Product` that was created.
    // ASSERT: `Product` is no longer listed.
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        cy.deleteProducts(product.name);
        // ASSERT: `Product` not in list.
        cy.checkForProduct(product).should("eq", false);
      }
    });
  });

  // view product test
  it("view a product", () => {
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // VP01
        // Navigate to the `Products Page`
        // ASSERT: We're on the `Products Page` of the Website
        cy.url().should("include", "/products");

        // VERIFY: The `name` and `description` are correct.
        cy.get("td:contains(" + product.name + ")").should("be.visible");
        cy.get("td:contains(" + product.price + ")").should("be.visible");

        // VP02
        // Click on the `Product` name
        cy.get("td:contains(" + product.name + ")").click();

        // ASSERT: We're on the `View Product` page
        cy.url().should("include", "/product-details");

        // VERIFY: The `name`, `description` and `price` of the product are correct.
        cy.get("mat-card-title > h2").should("have.text", product.name);
        cy.get("div mat-card-subtitle").should(
          "have.text",
          product.description
        );
        cy.get("dd:first-of-type").should("have.text", product.price);

        // Click on the `Products Page` button
        cy.get('[href*="products"]').click();
        
      }
    });
  });
});

context("Delete A Product", () => {
  beforeEach(() => {
    // API requests for setup
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // VPSU01
        // SETUP: Check whether the `Product` is present in the list, if it's not, create it.
        cy.addProduct(product);
        // ASSERT: `Product` in list.
        cy.checkForProduct(product).should("eq", true);
      }
    });

    // CP01
    // Navigate to the `Products Page`
    // ASSERT: We're on the `Products Page` of the Website
    cy.visit("");
  });

  // delete product test
  it("delete a product", () => {
    cy.fixture("two-products").then(products => {
      for (let product of products) {
        // DP01
 // Navigate to the `Products Page`
 // ASSERT: We're on the `Products Page` of the Website
        cy.url().should("include", "/products");

        // DP02
 // Click on the `Product` name
        cy.get("td:contains(" + product.name + ")").click();

        // ASSERT: We're on the `View Product` page
        cy.url().should("include", "/product-details");

        // DP03
        // Click on the `Delete Product` button
        cy.get('a.mat-flat-button.mat-warn').click();
        
        // ASSERT: We're returned to the `Products Page`
        cy.url().should("include", "/products");

        // ASSERT: `Product` is no longer listed.
        cy.get("td:contains(" + product.name + ")").should("not.exist");
      }
    });
  });
});
