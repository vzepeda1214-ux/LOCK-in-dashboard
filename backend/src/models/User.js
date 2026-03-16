const db = require('../config/database');
const bcrypt = require('bcryptjs');

const User = {
  async create({ email, username, password }) {
    const password_hash = await bcrypt.hash(password, 10);
    const result = await db.query(
      `INSERT INTO users (email, username, password_hash) 
       VALUES ($1, $2, $3) RETURNING id, email, username, created_at`,
      [email, username, password_hash]
    );
    return result.rows[0];
  },

  async findByEmail(email) {
    const result = await db.query(
      'SELECT * FROM users WHERE email = $1',
      [email]
    );
    return result.rows[0];
  },

  async findById(id) {
    const result = await db.query(
      'SELECT id, email, username, created_at FROM users WHERE id = $1',
      [id]
    );
    return result.rows[0];
  }
};

module.exports = User;