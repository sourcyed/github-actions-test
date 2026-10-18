import request from "supertest";
import { afterAll, beforeEach, describe, expect, it } from "vitest";
import { app } from "../src/app";
import { pool } from "../src/db/pool";

beforeEach(async () => {
	await pool.query("DELETE FROM categories");
	await pool.query(`
      INSERT INTO categories (name) VALUES
        ('Groceries'),
        ('Transportation')`);
});

afterAll(async () => {
	await pool.end();
});

describe("GET /api/categories", () => {
	it("returns categories with names", async () => {
		const res = await request(app).get("/api/categories");

		expect(res.status).toBe(200);
		expect(res.body).toHaveLength(2);
		expect(
			res.body.find((e: { name: string }) => e.name === "Groceries"),
		).not.toBeNull();
		expect(
			res.body.find((e: { name: string }) => e.name === "Transportation"),
		).not.toBeNull();
	});
});

describe("POST /api/categories", () => {
	it("creates a category and returns 201 with the created row", async () => {
		const res = await request(app)
			.post("/api/categories")
			.send({ name: "Sports" });

		expect(res.status).toBe(201);
		expect(res.body).toMatchObject({ name: "Sports" });
		expect(res.body.id).toBeDefined();
	});

	it("returns 400 when a required field is missing", async () => {
		const res = await request(app)
			.post("/api/categories")
			.send({ randomField: "ndo" });
		expect(res.status).toBe(400);
	});
});

describe("DELETE /api/categories/:id", () => {
	it("deletes an existing category and returns 204", async () => {
		const list = await request(app).get("/api/categories");
		const id = list.body[0].id;

		const res = await request(app).delete(`/api/categories/${id}`);
		expect(res.status).toBe(204);
	});

	it("returns 404 for a missing id", async () => {
		const res = await request(app).delete(
			"/api/categories/00000000-0000-0000-0000-000000000000",
		);
		expect(res.status).toBe(404);
	});
});
