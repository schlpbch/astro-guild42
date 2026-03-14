import { test, expect } from "@playwright/test";

test.describe("Events list", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/events/");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Events/);
  });

  test("shows Events heading", async ({ page }) => {
    await expect(page.getByRole("heading", { name: "Events", level: 1 })).toBeVisible();
  });

  test("lists event cards", async ({ page }) => {
    const items = page.getByRole("listitem");
    await expect(items.first()).toBeVisible();
  });

  test("event cards have links", async ({ page }) => {
    const firstEventLink = page.getByRole("list").getByRole("link").first();
    await expect(firstEventLink).toBeVisible();
    await expect(firstEventLink).toHaveAttribute("href", /\/events\//);
  });

  test("shows pagination controls", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "Pagination" })).toBeVisible();
  });

  test("Next page link works", async ({ page }) => {
    await page.getByRole("link", { name: "Next" }).click();
    await expect(page).toHaveURL(/\/events\/2\//);
  });

  test("breadcrumb shows Events", async ({ page }) => {
    await expect(page.getByRole("navigation", { name: "breadcrumb" })).toContainText("Events");
  });
});

test.describe("Event detail", () => {
  test("event page loads from list", async ({ page }) => {
    await page.goto("/events/");
    const firstLink = page.getByRole("list").getByRole("link").first();
    const href = await firstLink.getAttribute("href");
    await firstLink.click();
    await expect(page).toHaveURL(href!);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("event page has heading", async ({ page }) => {
    await page.goto("/events/");
    await page.getByRole("list").getByRole("link").first().click();
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("event page has breadcrumb", async ({ page }) => {
    await page.goto("/events/");
    await page.getByRole("list").getByRole("link").first().click();
    await expect(page.getByRole("navigation", { name: "breadcrumb" })).toBeVisible();
  });
});
