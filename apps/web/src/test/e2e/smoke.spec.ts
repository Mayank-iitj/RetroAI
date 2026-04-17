import { test, expect } from "@playwright/test";

test("homepage renders and links to dashboard", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByText("Retro AI Companion")).toBeVisible();
  await expect(page.getByRole("link", { name: "Launch Console" })).toBeVisible();
});
