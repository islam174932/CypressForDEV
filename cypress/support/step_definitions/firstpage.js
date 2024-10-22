import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

// Step definition for visiting the main page
Given("I visit the main page", () => {
  cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/");
});

When("I search for {string}", (searchTerm) => {
  cy.get(".search-keyword").type(searchTerm);
  cy.wait(1000); // Adjust wait time as necessary
});

Then("I should add all matching products to the cart", () => {
  cy.get(".products .product").each((product) => {
    // Use the search term to check for matching products
    const productName = product.find("h4.product-name").text().trim();
    if (productName.toLowerCase().includes("ca")) {
      // Adjusted to be case-insensitive
      cy.wrap(product).contains("ADD TO CART").click();
    }
  });
});

Then("I click the cart icon", () => {
  cy.get('img[alt="Cart"]').click();
});
