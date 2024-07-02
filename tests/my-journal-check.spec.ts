import { test, expect } from "@playwright/test";

test("My journal crud", async ({ page }) => {
  await page.goto("/");
  await page.getByRole("link", { name: "My Journal" }).click();
  await expect(page.getByText("Note: This uses local storage")).toBeVisible();
  await page.getByLabel("Dismiss warning").click();
  await page.getByLabel("Morning Reflection:").click();
  await page.getByLabel("Morning Reflection:").fill("test morning");
  await page.getByLabel("Evening Review:").click();
  await page.getByLabel("Evening Review:").fill("test review");
  await page.getByLabel("Gratitude:").click();
  await page.getByLabel("Gratitude:").fill("test grat");
  await page.getByLabel("Self-improvement:").click();
  await page.getByLabel("Self-improvement:").fill("test improv");
  await page.getByLabel("Perspective:").click();
  await page.getByLabel("Perspective:").fill("test pre");
  await page.getByLabel("Memento Mori:").click();
  await page.getByLabel("Memento Mori:").fill("test more");
  await page.getByLabel("Premeditatio Malorum:").click();
  await page.getByLabel("Premeditatio Malorum:").fill("mal");
  await page.getByLabel("Voluntary Discomfort:").click();
  await page.getByLabel("Voluntary Discomfort:").fill("ds");
  await page.getByLabel("Nature of the Universe:").click();
  await page.getByLabel("Nature of the Universe:").fill("sed");
  await page.getByLabel("Emotional Awareness:").click();
  await page.getByLabel("Emotional Awareness:").fill("sed");
  await page.getByRole("button", { name: "Submit" }).click();
  await page.getByRole("button", { name: "Show Entries" }).click();
  await expect(page.getByText("test morning")).toBeVisible();
  await page.getByRole("button", { name: "Delete" }).click();
  await page
    .getByRole("dialog")
    .getByRole("button", { name: "Delete" })
    .click();
  await expect(page.getByText("No entries found. Start")).toBeVisible();
});
