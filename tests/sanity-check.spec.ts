import { test, expect } from "@playwright/test";

test("Sanity check", async ({ page }) => {
  await page.goto("/");
  await expect(
    page.getByRole("link", { name: "Stoic Handbook" })
  ).toBeVisible();
  await expect(
    page.getByRole("link", { name: "GitHub GitHub (opens in a new" })
  ).toBeVisible();
});
