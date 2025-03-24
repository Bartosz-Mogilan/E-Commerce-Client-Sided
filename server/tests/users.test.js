import request from "supertest";
import app from "../server.js";


let validToken = "";

beforeAll(async () => {
  const uniqueEmail = `testuser_users_${Date.now()}@example.com`;
  const res = await request(app)
    .post("/api/v1/auth/register")
    .send({ username: "testuser_users", email: uniqueEmail, password: "test1234" });
  validToken = res.body.token;
  console.log("Registered token:", validToken);
});

describe("Users Endpoints", () => {
  it("should get all users", async () => {
    const res = await request(app)
      .get("/api/v1/users")
      .set("Authorization", `Bearer ${validToken}`);
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should get a specific user by id", async () => {
    const res = await request(app)
      .get("/api/v1/users/1")
      .set("Authorization", `Bearer ${validToken}`);
    expect([200, 404, 403]).toContain(res.statusCode);
  });
});



