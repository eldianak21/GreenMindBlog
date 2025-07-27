const pool = require('../config/db');

class User {
  static async create({ name, email, password }) {
    const [result] = await pool.query(
      'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
      [name, email, password]
    );
    return result.insertId;
  }

  static async findByEmail(email) {
    const [rows] = await pool.query('SELECT * FROM users WHERE email = ?', [email]);
    return rows[0];
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM users WHERE id = ?', [id]);
    return rows[0];
  }

  static async updateVerification(id, isVerified) {
    await pool.query('UPDATE users SET is_verified = ? WHERE id = ?', [isVerified, id]);
  }

  static async updateVerificationCode(id, code) {
    await pool.query('UPDATE users SET verification_code = ? WHERE id = ?', [code, id]);
  }

  static async updateResetToken(id, token, expires) {
    await pool.query(
      'UPDATE users SET reset_token = ?, reset_token_expires = ? WHERE id = ?',
      [token, expires, id]
    );
  }

  static async findByResetToken(token) {
    const [rows] = await pool.query(
      'SELECT * FROM users WHERE reset_token = ? AND reset_token_expires > NOW()',
      [token]
    );
    return rows[0];
  }

  static async updatePassword(id, password) {
    await pool.query('UPDATE users SET password = ?, reset_token = NULL, reset_token_expires = NULL WHERE id = ?', [password, id]);
  }

  static async updateProfile(id, { name, bio, profile_picture }) {
    await pool.query(
      'UPDATE users SET name = ?, bio = ?, profile_picture = ? WHERE id = ?',
      [name, bio, profile_picture, id]
    );
  }

  static async searchUsers(query) {
    const [rows] = await pool.query(
      'SELECT id, name, email, profile_picture FROM users WHERE name LIKE ? OR email LIKE ? LIMIT 10',
      [`%${query}%`, `%${query}%`]
    );
    return rows;
  }
}

module.exports = User;