import { test, expect } from "@playwright/test";

test.describe("Static pages", () => {
  test("about page loads", async ({ page }) => {
    await page.goto("/about/");
    await expect(page).toHaveTitle(/About/);
    await expect(page.getByRole("heading", { level: 1 })).toBeVisible();
  });

  test("sponsors page loads", async ({ page }) => {
    await page.goto("/sponsors/");
    await expect(page).toHaveTitle(/Sponsors/);
  });

  test("patrons page loads", async ({ page }) => {
    await page.goto("/patrons/");
    await expect(page).toHaveTitle(/Patrons/);
  });

  test("topics page loads", async ({ page }) => {
    await page.goto("/topics/");
    await expect(page).toHaveTitle(/Topics/);
  });

  test("communities page loads", async ({ page }) => {
    await page.goto("/communities/");
    await expect(page).toHaveTitle(/Communities/);
  });

  test("contact page has a form", async ({ page }) => {
    await page.goto("/contact/");
    await expect(page).toHaveTitle(/Contact/);
    await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
    await expect(page.getByRole("textbox", { name: "Email" })).toBeVisible();
  });

  test("membership page has a form", async ({ page }) => {
    await page.goto("/membership/");
    await expect(page).toHaveTitle(/Membership/);
    await expect(page.getByRole("textbox", { name: "Name" })).toBeVisible();
  });

  test("404 page is shown for unknown routes", async ({ page }) => {
    const response = await page.goto("/this-does-not-exist/");
    expect(response?.status()).toBe(404);
    await expect(page.getByRole("main")).toBeVisible();
  });

  test("RSS feed returns XML", async ({ page }) => {
    const response = await page.goto("/rss.xml");
    expect(response?.status()).toBe(200);
    const contentType = response?.headers()["content-type"] ?? "";
    expect(contentType).toMatch(/xml/);
  });
});

test.describe("Topics", () => {
  test("topics page lists topics", async ({ page }) => {
    await page.goto("/topics/");
    const links = page.getByRole("main").getByRole("link");
    await expect(links.first()).toBeVisible();
  });

  test("clicking a topic navigates to topic events", async ({ page }) => {
    await page.goto("/topics/");
    const firstLink = page.getByRole("main").getByRole("link").first();
    await firstLink.click();
    await expect(page).toHaveURL(/\/topics\//);
  });
});
