import request from "supertest";
import app from "../server.js";
import pool from "../config/db.js";

afterAll(async () => {
  await pool.end();
});

describe("Orders Endpoints", () => {
  const dummyToken = "dummy-valid-token"; 

  it("should retrieve order history", async () => {
    const res = await request(app)
      .get("/api/v1/orders")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should retrieve a specific order by id", async () => {
    const res = await request(app)
      .get("/api/v1/orders/1")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect([200, 404]).toContain(res.statusCode);
  });
});

