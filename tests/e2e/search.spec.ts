import { test, expect } from "@playwright/test";

test.describe("Search", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/search/");
    await page.waitForLoadState("networkidle");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Search/);
  });

  test("search input is visible", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: "Search" })).toBeVisible();
  });

  test("search input has placeholder text", async ({ page }) => {
    await expect(page.getByRole("textbox", { name: "Search" })).toHaveAttribute(
      "placeholder",
      "Search for anything..."
    );
  });

  test("shows results after typing 2+ characters", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).pressSequentially("rust");
    await expect(page.getByText(/Found \d+ results? for/)).toBeVisible();
  });

  test("results contain event links", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).pressSequentially("rust");
    await expect(page.getByRole("list").getByRole("link").first()).toBeVisible();
  });

  test("no results message for nonsense query", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).pressSequentially("xyzxyzxyz");
    await expect(page.getByText(/Found 0 results/)).toBeVisible();
  });

  test("single character does not trigger search", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).pressSequentially("r");
    await expect(page.getByText(/Found \d+ results? for/)).not.toBeVisible();
  });

  test("updates URL with search query", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).pressSequentially("python");
    await expect(page).toHaveURL(/\?q=python/);
  });

  test("clicking a result navigates to event page", async ({ page }) => {
    await page.getByRole("textbox", { name: "Search" }).pressSequentially("rust");
    await page.getByRole("list").getByRole("link").first().click();
    await expect(page).toHaveURL(/\/events\//);
  });
});
