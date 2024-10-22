require("cypress-xpath");
import "cypress-iframe";
require("cypress-iframe");

describe("Vissit the main", () => {
  it("Visits the page", () => {
    // Visit the updated URL
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
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
    // Visit the webpage
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

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
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.get("#autocomplete").type("EG").should("have.value", "EG");
    cy.wait(3000);
    cy.contains("div.ui-menu-item-wrapper", "Egypt").click();
  });
  it("Checks if the input element is visible", () => {
    // Visit the webpage that contains the input element
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Check if the input element is visible
    cy.get("#displayed-text").should("be.visible");
    cy.wait(3000);
    cy.get("#hide-textbox").click();
    cy.get("#displayed-text").should("not.be.visible");
  });
  it("should click the alert button, verify the alert message, accept the alert, and confirm the confirmation", () => {
    // Visit the webpage that contains the alert and confirm buttons
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Wait for the alert button to be visible before clicking
    cy.get("#alertbtn", { timeout: 10000 }).should("be.visible").click();

    // Wait longer to ensure the alert is displayed (adjust the time as needed)
    cy.wait(5000); // Wait for 5 seconds

    // Handle the alert and assert the message
    cy.on("window:alert", (text) => {
      // Assert the expected alert message
      expect(text).to.eq(
        "Hello , share this practice page and share your knowledge"
      );
      return true; // Automatically accept the alert
    });

    // Wait for the confirmation button to be visible and click it
    cy.get("#confirmbtn", { timeout: 10000 }).should("be.visible").click();

    // Wait longer to ensure the confirm dialog is displayed (adjust the time as needed)
    cy.wait(5000); // Wait for 5 seconds

    // Handle the confirm dialog and accept it
    cy.on("window:confirm", (text) => {
      return true; // Automatically confirm the dialog
    });
  });

  // cypress/integration/tabHandling.js

  it("should open the link in the same tab and then return to the main page", () => {
    // Define the main page URL
    const mainPageUrl = "https://rahulshettyacademy.com/AutomationPractice/";

    // Visit the initial page
    cy.visit(mainPageUrl);

    // Click the link that is meant to open in a new tab
    cy.get("#opentab")
      .invoke("attr", "href")
      .then((url) => {
        // Navigate to the URL in the same tab
        cy.visit(url);

        // Optionally, you can add a wait here if you need to ensure the page has loaded
        cy.wait(3000); // Wait for 3 seconds (optional)

        // Go back to the main page by visiting the original URL
        cy.visit(mainPageUrl);
      });
  });

  it("should simulate opening a new tab by visiting the URL", () => {
    // Visit the initial page
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Get the href attribute of the link
    cy.get("#opentab").invoke("removeAttr", "target").click();
  });
  it("should interact with the specific product table", () => {
    // Visit the page containing the tables
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Select the specific product table by ID
    cy.get("fieldset > #product");

    // Example: Check if the table has any rows
    cy.get("#product tbody tr").should("have.length.greaterThan", 0); // Ensure it has rows

    // Example: Logging the content of each row
    cy.get("#product tbody tr").each(($row) => {
      const cells = $row.find("td");
      const instructor = cells.eq(0).text(); // First cell
      const course = cells.eq(1).text(); // Second cell
      const price = cells.eq(2).text(); // Third cell

      // Log the data (optional)
      cy.log(`Instructor: ${instructor}, Course: ${course}, Price: ${price}`);
    });
  });

  it('should click the button, hover over it, and then click on the "Top" link', () => {
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");
    cy.wait(4000);
    cy.get("#mousehover").should("be.visible").trigger("mouseover");
    cy.wait(4000);
    cy.get(".mouse-hover-content").invoke("show");
    cy.wait(4000);
    cy.get(".mouse-hover-content").should("be.visible");
    cy.wait(4000);
    cy.get("a[href='#top']").click();
    cy.wait(4000);
  });
  it("should capture the new window URL and visit it directly", () => {
    cy.visit("https://www.qaclickacademy.com/");
    cy.wait(4000); // Replace with your actual starting URL
    cy.get(".navbar-nav > :nth-child(4) > a").click();
  });
  it.skip("should interact with elements inside the courses iframe", () => {
    // Visit the main page
    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    cy.visit("https://rahulshettyacademy.com/AutomationPractice/");

    // Ensure the iframe has loaded
    cy.frameLoaded("#courses-iframe"); // Targeting the iframe by ID
    cy.wait(4000); // Optional: Wait for any loading animations or transitions

    // Interact with the element inside the iframe
    cy.iframe()
      .find('ul.navigation a[href="mentorship"]')
      .eq(0) // Ensure to click on the first matching element
      .should("be.visible")
      .click();
  });
  it("should visit the Selenium Practise page", () => {
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");
    cy.get('a[role="button"][tabindex="0"]').contains("3").click();
    cy.wait(3000); // Click the anchor with the role 'button' and tabindex '0' that contains '3'
    cy.get(".react-date-picker__calendar-button", { timeout: 10000 }).click();
    cy.get(".react-calendar__navigation__label__labelText").click();
    cy.wait(3000);
    // Click on the April month button
    cy.contains("button", "April")
      .should("be.visible") // Ensure the button is visible
      .click(); // Click to open April's calendar

    cy.get("button.react-calendar__tile") // Select all buttons with the specified class
      .contains("19") // Ensure it contains the text '17'
      .should("be.visible") // Ensure the button is visible
      .click(); // Click the button
  });
  it("should click on today's date", () => {
    // Visit the offers page
    cy.visit("https://rahulshettyacademy.com/seleniumPractise/#/offers");

    // Get today's date
    const today = new Date();
    const currentDay = today.getDate(); // Get the current day (1-31)
    const currentMonth = today.toLocaleString("default", { month: "long" }); // Get the full name of the current month
    const currentYear = today.getFullYear(); // Get the current year

    // Assuming there's a button to open the calendar (adjust the selector as necessary)
    cy.get(".react-date-picker__calendar-button", { timeout: 10000 }).click(); // Replace with the actual selector for the calendar button
    // Click to open the calendar

    // Ensure the correct month and year are displayed in the calendar
    cy.get(".react-calendar__navigation__label__labelText") // Selector for the month label
      .contains(`${currentMonth} ${currentYear}`) // Check that it displays the current month and year
      .should("be.visible"); // Ensure it is visible

    // Click the button for today's date
    cy.get("button.react-calendar__tile") // Adjust this selector if necessary
      .contains(currentDay.toString())
      .should("be.visible")
      .click();
  });
});
