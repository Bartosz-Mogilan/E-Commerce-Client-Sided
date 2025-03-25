import pool from "../config/db.js";

/**
 * @swagger
 * tags:
 *   name: Products
 *   description: API for product management
 */

/**
 * @swagger
 * /api/v1/products:
 *   get:
 *     summary: Retrieve a list of products
 *     description: Retrieve a list of products. Optionally filter by category, with pagination support.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: category
 *         schema:
 *           type: string
 *         description: Filter products by category.
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: Maximum number of products to return.
 *       - in: query
 *         name: offset
 *         schema:
 *           type: integer
 *         description: Number of products to skip.
 *     responses:
 *       200:
 *         description: A list of products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *       500:
 *         description: Error retrieving products.
 */
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

/**
 * @swagger
 * /api/v1/products/{id}:
 *   get:
 *     summary: Retrieve a single product by ID
 *     description: Retrieve a product's details by its unique ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid product ID.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error retrieving product.
 */
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

/**
 * @swagger
 * /api/v1/products:
 *   post:
 *     summary: Create a new product
 *     description: Add a new product to the database.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - description
 *               - price
 *               - stock
 *               - category
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product created successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Missing required fields.
 *       500:
 *         description: Error creating product.
 */
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

/**
 * @swagger
 * /api/v1/products/{id}:
 *   put:
 *     summary: Update an existing product
 *     description: Update the details of an existing product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               description:
 *                 type: string
 *               price:
 *                 type: number
 *               stock:
 *                 type: integer
 *               category:
 *                 type: string
 *               imageUrl:
 *                 type: string
 *     responses:
 *       200:
 *         description: Product updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *       400:
 *         description: Invalid product ID.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error updating product.
 */
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

/**
 * @swagger
 * /api/v1/products/{id}:
 *   delete:
 *     summary: Delete a product
 *     description: Remove a product from the database.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The product ID.
 *     responses:
 *       200:
 *         description: Product deleted successfully.
 *       400:
 *         description: Invalid product ID.
 *       404:
 *         description: Product not found.
 *       500:
 *         description: Error deleting product.
 */
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

