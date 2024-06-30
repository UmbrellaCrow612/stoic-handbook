import { test } from "@playwright/test";

test("Daily quote sanity check", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Daily Quotes" }).click();
  await page.getByRole("button", { name: "Fetch New Quote" }).click();
});
