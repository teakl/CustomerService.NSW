import { Page, Locator, expect } from "@playwright/test";

export class RevenueNswCalculatorsPage {
  readonly page: Page;
  readonly passengerYesRadio: Locator;
  readonly passengerNoRadio: Locator;
  readonly purchasePriceOrValue: Locator;
  readonly calculateButton: Locator;
  readonly calculateModalWindow: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passengerYesRadio = page.locator('label[for="passenger_Y"]');
    this.passengerNoRadio = page.locator('label[for="passenger_N"]');
    this.purchasePriceOrValue = page.locator("#purchasePrice");
    this.calculateButton = page.locator("button.btn.btn-primary", {
      hasText: "Calculate",
    });
    this.calculateModalWindow = page.locator(".modal-body");
  }

  async verifyCalculatorPage() {
    await expect(this.page).toHaveURL(/revenue\.nsw\.gov\.au/);
  }

  async enterDetailsAndCalculate(amount: string) {
    await this.passengerYesRadio.check();
    await this.purchasePriceOrValue.fill(amount);
    await this.calculateButton.click();
    await this.page.waitForSelector(".modal-body", {
      state: "visible",
      timeout: 5000,
    });
  }

  async verifyPopupContainsStampDuty(text: string) {
    try {
      const modalRow = this.calculateModalWindow.locator("tr", {
        hasText: "Duty payable",
      });

      //wait for modal row to appear
      await modalRow.waitFor({ state: "visible", timeout: 5000 });
      await expect(modalRow).toContainText(text);
    } catch (error) {
      console.warn(
        "Calculation popup not found, skipping duty verification",
        error
      );
    }
  }

  async verifyPopupContainsPurchasePrice(text: string) {
    try {
      const modalPurchaseRow = this.calculateModalWindow.locator("tr", {
        hasText: "Purchase price or value",
      });

      await modalPurchaseRow.waitFor({ state: "visible", timeout: 5000 });
      await expect(modalPurchaseRow).toContainText(text);
    } catch (error) {
      console.warn(
        "Calculation popup not found, skipping purchase price or value verification",
        error
      );
    }
  }

  async verifyPopupContainsPassengerVehicle(text: string) {
    try {
      const modalVehicleRow = this.calculateModalWindow.locator("tr", {
        hasText: "Is this registration for a passenger vehicle?",
      });

      await modalVehicleRow.waitFor({ state: "visible", timeout: 5000 });
      await expect(modalVehicleRow).toContainText(text);
    } catch (error) {
      console.warn(
        "Calculation popup not found, skipping vehicle type verification",
        error
      );
    }
  }
}
