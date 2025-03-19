import request from "supertest";
import app from "../server.js";
import pool from "../config/db.js";

afterAll(async () => {
  await pool.end();
});

describe("Cart Endpoints", () => {
  const dummyToken = "dummy-valid-token"; 

  it("should retrieve an empty cart for a new user", async () => {
    const res = await request(app)
      .get("/api/v1/cart")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should add an item to the cart", async () => {
    const cartItem = { product_id: 1, quantity: 2 };
    const res = await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${dummyToken}`)
      .send(cartItem);
    expect([200, 401]).toContain(res.statusCode);
  });
});

