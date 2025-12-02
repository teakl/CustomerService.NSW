import { Page, Locator, expect } from "@playwright/test";

export class RevenueNswCalculatorsPage {
  readonly page: Page;
  readonly passengerYesRadio: Locator;
  readonly passengerNoRadio: Locator;
  readonly purchasePriceOrValue: Locator;
  readonly calculateButton: Locator;
  readonly calculateModalWindow: Locator;
  readonly revenuPanelBody: Locator;
  readonly motorVehicleRegHeader: Locator;
  readonly passengerVehicleValidation: Locator;
  readonly purchasePriceValidation: Locator;

  constructor(page: Page) {
    this.page = page;
    this.passengerYesRadio = page.locator('label[for="passenger_Y"]');
    this.passengerNoRadio = page.locator('label[for="passenger_N"]');
    this.purchasePriceOrValue = page.locator("#purchasePrice");
    this.calculateButton = page.locator("button.btn.btn-primary", {
      hasText: "Calculate",
    });
    this.calculateModalWindow = page.locator(".modal-body");
    // this.revenuPanelBody = page.locator(
    //   ".panel-collapse.readmore.collapse.show"
    // );
    this.revenuPanelBody = page.locator("#collapseTwo .panel-body");
    this.motorVehicleRegHeader = page.locator("h2");
    this.passengerVehicleValidation = page.locator("#passenger_div .error");
    this.purchasePriceValidation = page.locator("#purchaseprice_div .error");
  }

  async verifyCalculatorPage() {
    await expect(this.page).toHaveURL(/revenue\.nsw\.gov\.au/);
    await expect(this.motorVehicleRegHeader).toHaveText(
      "Motor vehicle registration duty calculator"
    );
    await expect(this.revenuPanelBody).toBeVisible();
  }

  async enterDetailsAndCalculate(amount: string) {
    await this.passengerYesRadio.check();
    await this.purchasePriceOrValue.fill(amount);
    await this.calculateButton.click();
    await expect(this.calculateModalWindow).toBeVisible({ timeout: 5000 });
  }

  async verifyPopupContainsStampDuty(text: string) {
    const modalRow = this.calculateModalWindow.locator("tr", {
      hasText: "Duty payable",
    });

    await modalRow.waitFor({ state: "visible", timeout: 5000 });
    await expect(modalRow).toContainText(text);
  }

  async verifyPopupContainsPurchasePrice(text: string) {
    const modalPurchaseRow = this.calculateModalWindow.locator("tr", {
      hasText: "Purchase price or value",
    });

    await modalPurchaseRow.waitFor({ state: "visible", timeout: 5000 });
    await expect(modalPurchaseRow).toContainText(text);
  }

  async verifyPopupContainsPassengerVehicle(text: string) {
    const modalVehicleRow = this.calculateModalWindow.locator("tr", {
      hasText: "Is this registration for a passenger vehicle?",
    });

    await modalVehicleRow.waitFor({ state: "visible", timeout: 5000 });
    await expect(modalVehicleRow).toContainText(text);
  }

  async verifyPassengerVehicleError(text: string) {
    if (text && text.trim() !== "") {
      await expect(this.passengerVehicleValidation).toBeVisible();
      await expect(this.passengerVehicleValidation).toHaveText(text);
    } else {
      await expect(this.passengerVehicleValidation).toBeHidden(); // check it is not visible
    }
  }

  async verifyPurchasePriceError(text: string) {
    // await expect(this.purchasePriceValidation).toHaveText("field is required");
    if (text && text.trim() !== "") {
      await expect(this.purchasePriceValidation).toBeVisible();
      await expect(this.purchasePriceValidation).toHaveText(text);
    } else {
      await expect(this.purchasePriceValidation).toBeHidden(); // check it is not visible
    }
  }
}
