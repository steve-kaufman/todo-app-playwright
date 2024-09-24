import { test, expect } from "@playwright/test";

const url = "http://localhost:5173";

test.beforeEach(async ({ page }) => {
  await page.goto(url);
});

test("has title", async ({ page }) => {
  // Expect a title "to contain" a substring.
  await expect(page).toHaveTitle(/Todo App/);
});

test("has page header", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Todo App" })).toBeVisible();
});

test("has todos header", async ({ page }) => {
  await expect(page.getByRole("heading", { name: "Todos" })).toBeVisible();
});

test.describe("todos", () => {
  test("can add item", async ({ page }) => {
    await page.getByTestId("add-todo-btn").click();
    await page.getByLabel("Name").fill("Test Item");
    await page.getByLabel("Description").fill("Description of Test Item");
    await page.getByRole("button", { name: "Create" }).click();

    await expect(
      page.getByRole("heading", { name: "Test Item" })
    ).toBeVisible();
    await expect(page.getByText("Description of Test Item")).toBeVisible();
  });
});
