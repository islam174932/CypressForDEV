describe("Fills out Infos", () => {
  let userData;

  before(() => {
    // Load the fixture data from Userdata.json
    cy.fixture("userData").then((data) => {
      userData = data;
    });
  });

  it("Fills and submits the form with the name input field", () => {
    // Refine the selector to specifically target the first input with name="name"
    cy.get('input[type="text"]')
      .eq(0)
      .clear() // Clear the input field if necessary
      .type(userData.name); // Type the name from the fixture data
    cy.wait(3000);
    cy.get('input[name="email"]').first().type(userData.email);
    cy.get('input[placeholder="Password"]').first().type(userData.password);
    cy.get("#exampleCheck1").check();
    cy.get("#exampleFormControlSelect1").select(1); // Selects the second option (index starts at 0)
    cy.get('input[name="bday"]').type(userData.dates); // Set the date as 'October 2, 2023'
    cy.get(".btn").click();
    cy.get("#inlineRadio3")
      .should("be.disabled")
      .then(() => cy.log("The Entrepreneur radio button is disabled"));
  });
  it('should click "Add" button for each product in the UserData file', () => {
    // Load user data and product names from the JSON file
    cy.fixture("UserData").then((data) => {
      const productData = data.products; // Get product names
      // Get user data

      // Visit the Shop page directly
      cy.visit("https://rahulshettyacademy.com/angularpractice/shop");

      // Ensure the product cards are visible
      cy.get("app-card-list").should("be.visible");
      //cy.pause(); to pause my test
      // Get the number of product cards
      cy.get("app-card")
        .its("length")
        .then((itemCount) => {
          for (let i = 0; i < itemCount; i++) {
            // Check the title of each product card
            cy.get("app-card")
              .eq(i)
              .find(".card-title a")
              .invoke("text")
              .then((title) => {
                // Loop through each product in the userData.products array
                for (let j = 0; j < productData.length; j++) {
                  if (title.trim() === productData[j]) {
                    // If the title matches, click the "Add" button
                    cy.get("app-card")
                      .eq(i)
                      .find("button.btn-info")
                      .should("be.visible")
                      .click();
                  }
                }
              });
            cy.wait(500); // Optional wait after each product check
          }
        });
    });
  });
});
