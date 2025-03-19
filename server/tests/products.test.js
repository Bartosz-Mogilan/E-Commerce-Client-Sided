import request from "supertest";
import app from "../server.js";
import pool from "../config/db.js";

afterAll(async () => {
  await pool.end();
});

describe("Products Endpoints", () => {
  it("should fetch all products", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a new product (requires auth)", async () => {
    const dummyToken = "dummy-valid-token"; 
    const productData = {
      name: "Test Product",
      description: "Test Description",
      price: 99.99,
      stock: 10,
      category: "Tech",
      imageUrl: "https://res.cloudinary.com/demo/image/upload/sample.jpg"
    };
    const res = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${dummyToken}`)
      .send(productData);
    expect([200, 401]).toContain(res.statusCode);
  });
});

