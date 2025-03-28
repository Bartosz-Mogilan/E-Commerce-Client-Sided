import pool from "../config/db.js";

/**
 * @swagger
 * tags:
 *   name: Users
 *   description: API for user management
 */

/**
 * @swagger
 * /api/v1/users:
 *   get:
 *     summary: Retrieve all users
 *     description: Retrieve a list of all users.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: A list of users.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: integer
 *                   username:
 *                     type: string
 *                   email:
 *                     type: string
 *                   created_at:
 *                     type: string
 *       500:
 *         description: Error retrieving users.
 */
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, email, created_at FROM users");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

/**
 * @swagger
 * /api/v1/users/{id}:
 *   get:
 *     summary: Retrieve a specific user by ID
 *     description: Get user details by user ID. Only the authenticated user can view their details.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     responses:
 *       200:
 *         description: User details.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *                 created_at:
 *                   type: string
 *       403:
 *         description: Not authorized.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error retrieving user.
 */
export const getUserById = async (req, res) => {
  const { id } = req.params;
  try {
    const result = await pool.query("SELECT id, username, email, created_at FROM users WHERE id = $1", [id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    if (parseInt(id, 10) !== req.user.id) {
      return res.status(403).json({ error: "Not authorized" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error retrieving user:", error);
    res.status(500).json({ error: "Error retrieving user" });
  }
};

/**
 * @swagger
 * /api/v1/users/{id}:
 *   put:
 *     summary: Update a user's details
 *     description: Update the username and email of the authenticated user.
 *     tags: [Users]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: The user ID.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - username
 *               - email
 *             properties:
 *               username:
 *                 type: string
 *               email:
 *                 type: string
 *     responses:
 *       200:
 *         description: User updated successfully.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: integer
 *                 username:
 *                   type: string
 *                 email:
 *                   type: string
 *       400:
 *         description: Missing required fields or duplicate email.
 *       403:
 *         description: Not authorized or invalid user ID.
 *       404:
 *         description: User not found.
 *       500:
 *         description: Error updating user.
 */
export const updateUser = async (req, res) => {
  const { id } = req.params;
  const { username, email } = req.body;
  if (!username || !email) {
    return res.status(400).json({ error: "Username and email are required" });
  }
  const userId = parseInt(id, 10);
  if (isNaN(userId) || userId !== req.user.id) {
    return res.status(403).json({ error: "Not authorized or invalid user ID" });
  }
  try {
    const duplicateEmail = await pool.query("SELECT id FROM users WHERE email = $1 AND id != $2", [email, userId]);
    if (duplicateEmail.rows.length > 0) {
      return res.status(400).json({ error: "Email already in use" });
    }
    const result = await pool.query("UPDATE users SET username = $1, email = $2 WHERE id = $3 RETURNING id, username, email", [username, email, id]);
    if (result.rows.length === 0) {
      return res.status(404).json({ error: "User not found" });
    }
    res.status(200).json(result.rows[0]);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ error: "Error updating user" });
  }
};


