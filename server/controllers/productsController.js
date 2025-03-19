import pool from "../config/db.js";

// Get all products
export const getAllProducts = async (req, res) => {
  const { category, limit, offset } = req.query;
  try {
    let result;
    if (category) {
      result = await pool.query(
        "SELECT * FROM products WHERE category = $1 LIMIT $2 OFFSET $3",
        [category, limit || 10, offset || 0]
      );
    } else {
      result = await pool.query(
        "SELECT * FROM products LIMIT $1 OFFSET $2",
        [limit || 10, offset || 0]
      );
    }
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving products:", error);
    res.status(500).json({ error: "Error retrieving products" });
  }
};

// Get a product by its ID
export const getProductById = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  try {
    const result = await pool.query("SELECT * FROM products WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const product = result.rows[0];
    product.price = parseFloat(product.price);
    res.status(200).json(product);
  } catch (error) {
    console.error("Error retrieving product:", error);
    res.status(500).json({ error: "Error retrieving product" });
  }
};

// Create a new product
export const createProduct = async (req, res) => {
  const { name, description, price, stock, category, imageUrl } = req.body;
  if (!name || !description || !price || !stock || !category) {
    return res.status(400).json({ error: "All fields are required" });
  }
  try {
    const result = await pool.query(
      "INSERT INTO products (name, description, price, stock, category, imageUrl) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *",
      [name, description, price, stock, category, imageUrl || null]
    );
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({ error: "Error creating product" });
  }
};

// Update an existing product
export const updateProduct = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  const { name, description, price, stock, category, imageUrl } = req.body;
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  try {
    const result = await pool.query(
      "UPDATE products SET name = $1, description = $2, price = $3, stock = $4, category = $5, imageUrl = $6, updated_at = CURRENT_TIMESTAMP WHERE id = $7 RETURNING *",
      [name, description, price, stock, category, imageUrl || null, id]
    );
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    const updatedProduct = result.rows[0];
    updatedProduct.price = parseFloat(updatedProduct.price);
    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ error: "Error updating product" });
  }
};

// Delete a product
export const deleteProduct = async (req, res) => {
  const id = parseInt(req.params.id, 10);
  if (isNaN(id)) {
    return res.status(400).json({ error: "Invalid product ID" });
  }
  try {
    const result = await pool.query("DELETE FROM products WHERE id = $1 RETURNING *", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "Product not found" });
    }
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res.status(500).json({ error: "Error deleting product" });
  }
};

