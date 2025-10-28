import { Page, Locator } from "@playwright/test";

export class ServiceNswPage {
  readonly page: Page;
  readonly checkOnlineButton: Locator;

  constructor(page: Page) {
    this.page = page;
    this.checkOnlineButton = page.getByRole("button", { name: "Check online" });
  }

  async open() {
    await this.page.goto(
      "https://www.service.nsw.gov.au/transaction/check-motor-vehicle-stamp-duty"
    );
  }

  async clickCheckOnline() {
    await this.checkOnlineButton.click();
  }
}
