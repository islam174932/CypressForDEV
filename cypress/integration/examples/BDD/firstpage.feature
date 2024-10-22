Feature: firstpage

  Scenario: Search for 'ca' and add matching products to the cart
    Given I visit the main page
    When I search for "ca"
    Then I should add all matching products to the cart
    Then I click the cart icon
