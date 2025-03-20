import request from "supertest";
import app from "../server.js";

describe("Authentication Endpoints", () => {
  const testUser = {
    username: "testuser_auth",
    email: `testuser_auth_${Date.now()}@example.com`,
    password: "test1234"
  };

  let token = "";

  it("should register a new user", async () => {
    const res = await request(app)
      .post("/api/v1/auth/register")
      .send(testUser);
    expect(res.statusCode).toBe(201);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
    console.log("Registered token:", token);
  });

  it("should login with valid credentials", async () => {
    const res = await request(app)
      .post("/api/v1/auth/login")
      .send({ email: testUser.email, password: testUser.password });
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("token");
    token = res.body.token;
  });

  it("should logout successfully", async () => {
    const res = await request(app)
      .get("/api/v1/auth/logout")
      .set("Authorization", `Bearer ${token}`);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("message", "Logout successful");
  });
});









