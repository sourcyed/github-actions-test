import { expect, test } from "@playwright/test";

test("a user can add, edit, and delete an categories", async ({ page }) => {
	// Unique description so we can find exactly our own row later.
	const categoryName = `Subscriptions ${Date.now()}`;

	await page.goto("/");
	await page.getByRole("button", { name: "Categories" }).click();

	// --- ADD ---
	await page.getByPlaceholder("Category name").fill(categoryName);
	await page.getByRole("button", { name: "Add" }).click();

	const row = page.getByRole("listitem").filter({ hasText: categoryName });
	await expect(row).toBeVisible();

	// --- DELETE ---
	await row.getByRole("button", { name: "Delete" }).click();
	await expect(page.getByText(categoryName)).toBeHidden();
});
