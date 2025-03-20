import request from "supertest";
import app from "../server.js";

let validToken = "";

beforeAll(async () => {
  const uniqueEmail = `testuser_cart_${Date.now()}@example.com`;
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({ username: "testuser_cart", email: uniqueEmail, password: "test1234" });
  validToken = res.body.token;
});

describe("Cart Endpoints", () => {
  it("should retrieve an empty cart for a new user", async () => {
    const res = await request(app)
      .get("/api/v1/cart")
      .set("Authorization", `Bearer ${validToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should add an item to the cart", async () => {
    const cartItem = { product_id: 1, quantity: 2 };
    const res = await request(app)
      .post("/api/v1/cart")
      .set("Authorization", `Bearer ${validToken}`)
      .send(cartItem);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });
});






