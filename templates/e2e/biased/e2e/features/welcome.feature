Feature: visit the welcome page

  As someone on the internet
  I want to visit the welcome page
  So that I can learn about the biased framework

  Scenario: After opening the app, I should see the welcome page
    Given I am on the welcome page
    Then I should see the welcome message
    And I should see the Get Started button
    And I should see the Install the CLI button
    And I should see the Read the Strategy button
