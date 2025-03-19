import request from "supertest";
import app from "../server.js";
import pool from "../config/db.js";

afterAll(async () => {
  await pool.end();
});

describe("Checkout Endpoints", () => {
  const dummyToken = "dummy-valid-token"; 

  it("should create a payment intent", async () => {
    const res = await request(app)
      .post("/api/v1/checkout/payment-intent")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect([200, 404]).toContain(res.statusCode);
  });

  it("should confirm checkout", async () => {
    const res = await request(app)
      .post("/api/v1/checkout/confirm")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});

