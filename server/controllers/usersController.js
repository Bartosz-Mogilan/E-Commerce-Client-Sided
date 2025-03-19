import pool from "../config/db.js";

// Get all users
export const getAllUsers = async (req, res) => {
  try {
    const result = await pool.query("SELECT id, username, email, created_at FROM users WHERE id = $1", [req.user.id]);
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error retrieving users:", error);
    res.status(500).json({ error: "Error retrieving users" });
  }
};

// Get a specific user by ID
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

// Update a user's details
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



