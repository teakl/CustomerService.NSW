Feature: Check Motor Vehicle Stamp Duty

  Scenario Outline: Verify duty calculation for a passenger vehicle
    Given I open the Service NSW motor vehicle stamp duty page
    When I click the "Check online" button
    Then the Revenue NSW calculator page should be displayed
    When I select "<passengerOption>" for passenger vehicle
    And I enter "<vehiclePrice>" as the vehicle price
    And I click the "Calculate" button
    Then I should see the popup window showing "Duty payable <expectedDuty>"

  Examples:
    | passengerOption  | vehiclePrice | expectedDuty | 
    | Yes              | 1            | $3.00        | 
    | No               | 1            | $3.00        | 
    | Yes              | 10000        | $300.00      | 
    | No               | 10000        | $300.00      | 
    | Yes              | 44999        | $1,350.00    | 
    | No               | 44999        | $1,350.00    | 
    | Yes              | 45000        | $1,350.00    | 
    | No               | 45000        | $1,350.00    | 
    | Yes              | 46000        | $1,400.00    | 
    | No               | 46000        | $1,380.00    | 
    | Yes              | 60000        | $2,100.00    | 
    | No               | 60000        | $1,800.00    | 
    | Yes              | 100000       | $4,100.00    | 
    | No               | 100000       | $3,000.00    |