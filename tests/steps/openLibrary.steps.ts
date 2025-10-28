import { Given, Then } from "@cucumber/cucumber";
import { expect } from "@playwright/test";
import {
  request as playwrightRequest,
  APIRequestContext,
} from "@playwright/test";

let apiContext: APIRequestContext;
let response: any;
let responseBody: any;

Given("I send a GET request to {string}", async (url: string) => {
  apiContext = await playwrightRequest.newContext();
  response = await apiContext.get(url);
  responseBody = await response.json();
});

Then("the response status code should be {int}", async (status: number) => {
  expect(response.status()).toBe(status);
});

Then(
  "the {string} should be {string}",
  async (field: string, expectedValue: string) => {
    expect(responseBody[field]).toBe(expectedValue);
  }
);

Then(
  "the {string} should contain {string}",
  async (field: string, expectedValue: string) => {
    expect(responseBody[field]).toContain(expectedValue);
  }
);
