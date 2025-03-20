import request from "supertest";
import app from "../server.js";

let validToken = "";

beforeAll(async () => {
  const uniqueEmail = `testuser_orders_${Date.now()}@example.com`;
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({ username: "testuser_orders", email: uniqueEmail, password: "test1234" });
  validToken = res.body.token;
});

describe("Orders Endpoints", () => {
  it("should retrieve order history", async () => {
    const res = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${validToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should retrieve a specific order by id", async () => {
    const res = await request(app)
      .get("/api/v1/orders/1")
      .set("Authorization", `Bearer ${validToken}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});



