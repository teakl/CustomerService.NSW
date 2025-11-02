@stampDuty
Feature: Check Motor Vehicle Stamp Duty

  Scenario Outline: Verify duty calculation for a passenger vehicle
    Given I open the Service NSW motor vehicle stamp duty page
    When I click the "Check online" button
    Then the Revenue NSW calculator page should be displayed
    When I select "<passengerOption>" for passenger vehicle
    And I enter "<vehiclePrice>" as the vehicle price
    And I click the "Calculate" button
    Then I should see the popup window passenger vehicle? "<expectedVehicleType>"
    And I should see the popup window showing purchase price or value "<expectedPurchase>"
    And I should see the popup window showing duty payable "<expectedDuty>"

  Examples:
    | passengerOption  | vehiclePrice | expectedVehicleType| expectedPurchase| expectedDuty | 
    | Yes              | 1            | Yes                | $1.00           | $3.00        | 
    | No               | 1            | No                 | $1.00           | $3.00        | 
    | Yes              | 44999        | Yes                | $44,999         | $1,350.00    | 
    | No               | 44999        | No                 | $44,999         | $1,350.00    | 
    | Yes              | 45000        | Yes                | $45,000         | $1,350.00    | 
    | No               | 45000        | No                 | $45,000         | $1,350.00    | 
    | Yes              | 45001        | Yes                | $45,001         | $1,355.00    | 
    | No               | 45001        | No                 | $45,001         | $1,353.00    | 
    | Yes              | 46000        | Yes                | $46,000         | $1,400.00    | 
    | No               | 46000        | No                 | $46,000         | $1,380.00    | 