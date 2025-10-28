@api
Feature: OpenLibrary API Author

  Scenario: Verify author names
    Given I send a GET request to "https://openlibrary.org/authors/OL1A.json"
    Then the response status code should be 200
    And the "personal_name" should be "Sachi Rautroy"
    And the "alternate_names" should contain "Yugashrashta Sachi Routray"