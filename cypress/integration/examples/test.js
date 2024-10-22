describe("Google Search Test", () => {
  before(() => {
    // This runs once before all tests in the block
    cy.log("Starting the Google Search Test");
  });

  beforeEach(() => {
    // This runs before each test in the block
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
    cy.log("Visited the main page");
  });

  it("Visits the page, searches for 'ca', adds all matching products to the cart, and clicks the cart icon", () => {
    // Search for products with the term "ca"
    cy.get(".search-keyword")
      .type("ca")
      .then(() => {
        // Wait for the filtered results to appear
        cy.wait(1000).then(() => {
          // Store the product selector in a variable and give it an alias
          cy.get(".products .product").as("products");

          // Select all products that match the search term and add them to the cart
          cy.get("@products").each((product) => {
            // Check if the current product contains the text "Carrot"
            if (product.text().includes("Carrot")) {
              // Find the "ADD TO CART" button within the product and click it
              cy.wrap(product).contains("ADD TO CART").click();
            }
          });

          // Store the cart icon in an alias
          cy.get('img[alt="Cart"]').as("cartIcon");

          // Click the cart icon
          cy.get("@cartIcon").click();
        });
      });
  });

  afterEach(() => {
    // This runs after each test in the block
    cy.log("Test completed");
  });

  after(() => {
    // This runs once after all tests in the block
    cy.log("All tests completed successfully.");
  });
});
