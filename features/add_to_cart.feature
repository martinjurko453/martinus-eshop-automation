Feature: Add item to basket on Martinus e-shop

  Background:
    Given user opens Martinus Home Page

  @TC001 @positive
  Scenario: Successful adding item to basket
    When user searches for an existing item by search bar
    And user adds the item to the basket
    Then basket contains the searched item

  @TC002 @negative
  Scenario: Searching for non-existing item
    When user searches for a non-existing item by search bar
    Then system displays message that no results were found
