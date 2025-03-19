// tests/users.test.js
import request from "supertest";
import app from "../server.js";
import pool from "../config/db.js";

afterAll(async () => {
  await pool.end();
});

describe("Users Endpoints", () => {
  const dummyToken = "dummy-valid-token"; 

  it("should get the current user details", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a specific user by id", async () => {
    const res = await request(app)
      .get("/api/v1/users/1")
      .set("Authorization", `Bearer ${dummyToken}`);
    expect([200, 404, 403]).toContain(res.statusCode);
  });
});

