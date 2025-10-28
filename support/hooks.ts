import { Before, After, setDefaultTimeout } from "@cucumber/cucumber";
import { chromium, Browser, Page, BrowserContext } from "@playwright/test";

let browser: Browser;
export let page: Page;
let context: BrowserContext;

setDefaultTimeout(60 * 1000);

Before(async () => {
  browser = await chromium.launch({ headless: true }); //launch browser
  context = await browser.newContext();
  page = await context.newPage();
});

After(async () => {
  await browser.close();
});
