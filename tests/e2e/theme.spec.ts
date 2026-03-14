import { test, expect } from "@playwright/test";

test.describe("Theme toggle", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("page loads in light mode by default", async ({ page }) => {
    const html = page.locator("html");
    // Default is light — data-theme is either unset or "light"
    const theme = await html.getAttribute("data-theme");
    expect(theme === null || theme === "light").toBeTruthy();
  });

  test("toggle button is visible", async ({ page }) => {
    await expect(page.getByRole("button", { name: /light|dark/i })).toBeVisible();
  });

  test("clicking toggle switches to dark mode", async ({ page }) => {
    await page.getByRole("button", { name: /light|dark/i }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });

  test("clicking toggle twice returns to light mode", async ({ page }) => {
    const btn = page.getByRole("button", { name: /light|dark/i });
    await btn.click();
    await btn.click();
    const html = page.locator("html");
    const theme = await html.getAttribute("data-theme");
    expect(theme === null || theme === "light").toBeTruthy();
  });

  test("dark mode persists across navigation", async ({ page }) => {
    await page.getByRole("button", { name: /light|dark/i }).click();
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
    await page.goto("/events/");
    await expect(page.locator("html")).toHaveAttribute("data-theme", "dark");
  });
});
