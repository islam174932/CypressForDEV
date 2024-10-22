class AutomationPracticePage {
  visit() {
    const baseUrl = Cypress.env("baseUrl"); // Access the baseUrl from the environment variables
    cy.visit(baseUrl);
  }
  checkCheckbox(optionIndex) {
    cy.get(`#checkBoxOption${optionIndex}`).check().should("be.checked");
  }

  uncheckCheckbox(optionIndex) {
    cy.get(`#checkBoxOption${optionIndex}`).uncheck().should("not.be.checked");
  }

  selectDropdown(optionValue) {
    cy.get("#dropdown-class-example")
      .select(optionValue)
      .should("have.value", optionValue);
  }

  unselectDropdown() {
    cy.get("#dropdown-class-example").select("").should("have.value", "");
  }

  setInputValue(value) {
    cy.get("#autocomplete").type(value).should("have.value", value);
  }

  selectAutocompleteOption(optionText) {
    cy.contains("div.ui-menu-item-wrapper", optionText).click();
  }

  checkInputVisibility() {
    cy.get("#displayed-text").should("be.visible");
  }

  hideInput() {
    cy.get("#hide-textbox").click();
  }
}

export default new AutomationPracticePage();
