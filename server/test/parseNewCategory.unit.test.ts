import { describe, expect, it } from "vitest";
import { parseNewCategory } from "../src/routes/category";

describe("parseNewCategory", () => {
	it("returns the parsed catregory when body is valid", () => {
		const result = parseNewCategory({
			name: "Groceries",
		});
		expect(result).toEqual({
			name: "Groceries",
		});
	});

	it("returns null when name is not a string", () => {
		const result = parseNewCategory({
			name: 555,
		});
		expect(result).toBeNull();
	});

	it("returns null when name is missing", () => {
		const result = parseNewCategory({
			differentField: "Groceries",
		});
		expect(result).toBeNull();
	});
});
