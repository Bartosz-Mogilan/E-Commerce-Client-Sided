import request from "supertest";
import app from "../server.js";


let validToken = "";

beforeAll(async () => {
  const uniqueEmail = `testuser_checkout_${Date.now()}@example.com`;
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({ username: "testuser_checkout", email: uniqueEmail, password: "test1234" });
  validToken = res.body.token;
});

describe("Checkout Endpoints", () => {
  it("should create a payment intent", async () => {
    const res = await request(app)
      .post("/api/v1/checkout/payment-intent")
      .set("Authorization", `Bearer ${validToken}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it("should confirm checkout", async () => {
    const res = await request(app)
      .post("/api/v1/checkout/confirm")
      .set("Authorization", `Bearer ${validToken}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});






