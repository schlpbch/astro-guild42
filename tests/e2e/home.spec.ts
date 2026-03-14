import { test, expect } from "@playwright/test";

test.describe("Home page", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("has correct title", async ({ page }) => {
    await expect(page).toHaveTitle(/Guild42/);
  });

  test("shows the Guild42 logo", async ({ page }) => {
    await expect(page.getByRole("img", { name: "Guild42" })).toBeVisible();
  });

  test("shows Upcoming Events section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Upcoming Events" })
    ).toBeVisible();
  });

  test("shows Past Events section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Past Events" })
    ).toBeVisible();
  });

  test("shows Our Sponsors section", async ({ page }) => {
    await expect(
      page.getByRole("heading", { name: "Our Sponsors" })
    ).toBeVisible();
  });

  test("upcoming events have links", async ({ page }) => {
    const upcomingSection = page.locator("text=Upcoming Events").locator("..");
    const eventLinks = upcomingSection.getByRole("link");
    await expect(eventLinks.first()).toBeVisible();
  });

  test("All Events link is present", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: /All Events/i })
    ).toBeVisible();
  });

  test("All Events link navigates to events page", async ({ page }) => {
    await page.getByRole("link", { name: /All Events/i }).click();
    await expect(page).toHaveURL("/events/");
  });

  test("footer shows copyright", async ({ page }) => {
    await expect(page.locator("footer")).toContainText("©");
  });

  test("footer has Contact and RSS links", async ({ page }) => {
    const footer = page.locator("footer");
    await expect(footer.getByRole("link", { name: "Contact" })).toBeVisible();
    await expect(footer.getByRole("link", { name: "RSS Feed", exact: true })).toBeVisible();
  });

  test("code window is rendered", async ({ page }) => {
    await expect(page.locator("code")).toBeVisible();
  });
});
