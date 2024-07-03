import { test, expect } from "@playwright/test";

test("Challenges crud", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "Challenges" }).click();
  await page.getByLabel("Dismiss warning").click();
  await page.getByRole("button", { name: "Create" }).click();
  await page.getByPlaceholder("Enter a title (max 25").click();
  await page.getByPlaceholder("Enter a title (max 25").fill("test");
  await page.getByPlaceholder("Enter a description (max 100").click();
  await page.getByPlaceholder("Enter a description (max 100").fill("tedst");
  await page
    .getByLabel("Create a Challenge")
    .getByRole("button", { name: "Create" })
    .click();
  await expect(page.getByRole("button", { name: "test" })).toBeVisible();
  await page.getByRole("button", { name: "test" }).click();
  await page.getByRole("button", { name: "Start" }).click();
  await page.getByRole("button", { name: "test" }).click();
  await page.getByRole("button", { name: "Mark as Done" }).click();
  await page.getByRole("button", { name: "test" }).click();
  await page.getByRole("button", { name: "Reset" }).click();
  await page.getByRole("button", { name: "test" }).click();
  await page.getByRole("button", { name: "Delete" }).click();
});
