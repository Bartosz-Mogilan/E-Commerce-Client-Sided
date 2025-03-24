import request from "supertest";
import app from "../server.js";


describe("Products Endpoints", () => {
  it("should fetch all products", async () => {
    const res = await request(app).get("/api/v1/products");
    expect(res.statusCode).toBe(200);
    expect(Array.isArray(res.body)).toBe(true);
  });

  it("should create a new product (requires auth)", async () => {
    const uniqueEmail = `testuser_products_${Date.now()}@example.com`;
    const regRes = await request(app)
      .post("/api/v1/auth/register")
      .send({ username: "testuser_products", email: uniqueEmail, password: "test1234" });
    const validToken = regRes.body.token;
    
    const productData = {
      name: "Test Tech Product",
      description: "This is a test product created during integration testing.",
      price: 99.99,
      stock: 10,
      category: "Tech",
      imageUrl: "https://res.cloudinary.com/deamdwd4t/image/upload/v1742307075/black-01-solobuds_dbkbu7.jpg"
    };

    const res = await request(app)
      .post("/api/v1/products")
      .set("Authorization", `Bearer ${validToken}`)
      .send(productData);
    expect(res.statusCode).toBe(200);
    expect(res.body).toHaveProperty("id");
  });
});









