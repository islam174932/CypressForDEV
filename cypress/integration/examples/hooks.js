describe("Hooks", () => {
    before(() => {
      // This runs once before all tests in the block
      cy.log("Starting the Google Search Test");
    });
  
    beforeEach(() => {
      // This runs before each test in the block
      cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
      cy.log("Visited the Automation Practice page");
    });
  
    it("Visits the page and interacts with checkboxes", () => {
      // Interact with checkboxes
      cy.get("#checkBoxOption1").check().should("be.checked");
      cy.get("#checkBoxOption2").check().should("be.checked");
      cy.get("#checkBoxOption3").check().should("be.checked");
      cy.wait(3000);
      cy.get("#checkBoxOption1").uncheck().should("not.be.checked");
      cy.get("#checkBoxOption2").uncheck().should("not.be.checked");
      cy.get("#checkBoxOption3").uncheck().should("not.be.checked");
      cy.wait(3000);
  
      cy.get('input[type="checkbox"]').check().should("be.checked");
      cy.wait(3000);
      cy.get('input[type="checkbox"]').uncheck().should("not.be.checked");
    });
  
    it("Handles dropdown selection", () => {
      // Select different options from the dropdown and validate them
      cy.get("#dropdown-class-example")
        .select("option1")
        .should("have.value", "option1");
      cy.wait(1000); // Adding some wait for visibility (optional)
      cy.get("#dropdown-class-example").select("").should("have.value", ""); // Simulate unselecting
  
      // Select Option 2 and unselect
      cy.get("#dropdown-class-example")
        .select("option2")
        .should("have.value", "option2");
      cy.wait(1000);
      cy.get("#dropdown-class-example").select("").should("have.value", "");
  
      // Select Option 3 and unselect
      cy.get("#dropdown-class-example")
        .select("option3")
        .should("have.value", "option3");
      cy.wait(1000);
      cy.get("#dropdown-class-example").select("").should("have.value", "");
    });
  
    it("Sets the input value to 'EG'", () => {
      // Set the input value and select an autocomplete option
      cy.get("#autocomplete").type("EG").should("have.value", "EG");
      cy.wait(3000);
      cy.contains("div.ui-menu-item-wrapper", "Egypt").click();
    });
  
    it("Checks if the input element is visible", () => {
      // Check if the input element is visible
      cy.get("#displayed-text").should("be.visible");
      cy.wait(3000);
      cy.get("#hide-textbox").click();
      cy.get("#displayed-text").should("not.be.visible");
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
  