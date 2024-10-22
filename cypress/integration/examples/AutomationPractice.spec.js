import AutomationPracticePage from "../pageObjects/AutomationPracticePage";

describe("Google Search Test", () => {
  before(() => {
    cy.log("Starting the Google Search Test");
  });

  beforeEach(() => {
    AutomationPracticePage.visit();
    cy.log("Visited the Automation Practice page");
  });

  it("Visits the page and interacts with checkboxes", () => {
    // Interact with checkboxes
    for (let i = 1; i <= 3; i++) {
      AutomationPracticePage.checkCheckbox(i);
    }
    cy.wait(3000);
    for (let i = 1; i <= 3; i++) {
      AutomationPracticePage.uncheckCheckbox(i);
    }
    cy.wait(3000);
    cy.get('input[type="checkbox"]').check().should("be.checked");
    cy.wait(3000);
    cy.get('input[type="checkbox"]').uncheck().should("not.be.checked");
  });

  it("Handles dropdown selection", () => {
    ["option1", "option2", "option3"].forEach((option) => {
      AutomationPracticePage.selectDropdown(option);
      cy.wait(1000);
      AutomationPracticePage.selectDropdown("");
    });
  });

  it("Sets the input value to 'EG'", () => {
    AutomationPracticePage.typeAutocomplete("EG");
    cy.wait(3000);
    AutomationPracticePage.selectAutocompleteOption("Egypt");
  });

  it("Checks if the input element is visible", () => {
    AutomationPracticePage.checkInputVisibility();
    cy.wait(3000);
    AutomationPracticePage.hideInput();
  });

  afterEach(() => {
    cy.log("Test completed");
  });

  after(() => {
    cy.log("All tests completed successfully.");
  });
});
