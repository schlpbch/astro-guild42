import { test, expect } from "@playwright/test";

test.describe("Navigation", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/");
  });

  test("renders all nav links", async ({ page }) => {
    const nav = page.getByRole("navigation").first();
    await expect(nav.getByRole("link", { name: "Events" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Sponsors" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Patrons" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Topics" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "Communities" })).toBeVisible();
    await expect(nav.getByRole("link", { name: "About" })).toBeVisible();
  });

  test("nav links point to correct hrefs", async ({ page }) => {
    const nav = page.getByRole("navigation").first();
    await expect(nav.getByRole("link", { name: "Events" })).toHaveAttribute(
      "href",
      "/events/"
    );
    await expect(nav.getByRole("link", { name: "About" })).toHaveAttribute(
      "href",
      "/about/"
    );
  });

  test("logo links to home", async ({ page }) => {
    await expect(
      page.getByRole("link", { name: "Guild42", exact: true })
    ).toHaveAttribute("href", "/");
  });

  test("clicking Events navigates to events page", async ({ page }) => {
    await page.getByRole("navigation").first().getByRole("link", { name: "Events" }).click();
    await expect(page).toHaveURL("/events/");
    await expect(page).toHaveTitle(/Events/);
  });

  test("active nav link is highlighted on events page", async ({ page }) => {
    await page.goto("/events/");
    const eventsLink = page
      .getByRole("navigation")
      .first()
      .getByRole("link", { name: "Events" });
    await expect(eventsLink).toHaveClass(/active/);
  });

  test("search link navigates to search page", async ({ page }) => {
    await page.getByRole("link", { name: /search/i }).click();
    await expect(page).toHaveURL("/search/");
  });
});
