import { Given, When, Then, Before, After } from "@cucumber/cucumber";
import { setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page } from "@playwright/test";
import { ServiceNswPage } from "../../pages/serviceNswPage";
import { RevenueNswCalculatorsPage } from "../../pages/revenueNswCalculatorsPage";
import { page } from "../../support/hooks";

let serviceNswPage: ServiceNswPage;
let revenuePage: RevenueNswCalculatorsPage;

Given("I open the Service NSW motor vehicle stamp duty page", async () => {
  serviceNswPage = new ServiceNswPage(page);
  await serviceNswPage.open();
});

When("I click the {string} button", async (buttonName: string) => {
  revenuePage = new RevenueNswCalculatorsPage(page);
  if (buttonName === "Check online") {
    await serviceNswPage.clickCheckOnline();
  } else if (buttonName === "Calculate") {
    await revenuePage.calculateButton.click();
  }
});

Then("the Revenue NSW calculator page should be displayed", async () => {
  await revenuePage.verifyCalculatorPage();
});

When("I select {string} for passenger vehicle", async (answer: string) => {
  if (answer.toLowerCase() === "yes") {
    await revenuePage.passengerYesRadio.check();
  } else {
    await revenuePage.passengerNoRadio.check();
  }
});

When("I enter {string} as the vehicle price", async (price: string) => {
  await revenuePage.purchasePriceOrValue.fill(price);
});

Then(
  "I should see the popup window showing duty payable {string}",
  async (expectedText: string) => {
    await revenuePage.verifyPopupContainsStampDuty(expectedText);
  }
);

Then(
  "I should see the popup window showing purchase price or value {string}",
  async (expectedText: string) => {
    await revenuePage.verifyPopupContainsPurchasePrice(expectedText);
  }
);

Then(
  "I should see the popup window passenger vehicle? {string}",
  async (expectedText: string) => {
    await revenuePage.verifyPopupContainsPassengerVehicle(expectedText);
  }
);
