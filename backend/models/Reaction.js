const pool = require('../config/db');

class Reaction {
  static async create({ userId, postId, commentId, type }) {
    const [result] = await pool.query(
      'INSERT INTO reactions (user_id, post_id, comment_id, type) VALUES (?, ?, ?, ?)',
      [userId, postId, commentId || null, type]
    );
    return result.insertId;
  }

  static async findByPost(postId) {
    const [rows] = await pool.query(
      `SELECT type, COUNT(*) as count 
       FROM reactions 
       WHERE post_id = ? AND comment_id IS NULL 
       GROUP BY type`,
      [postId]
    );
    return rows;
  }

  static async findByComment(commentId) {
    const [rows] = await pool.query(
      `SELECT type, COUNT(*) as count 
       FROM reactions 
       WHERE comment_id = ? 
       GROUP BY type`,
      [commentId]
    );
    return rows;
  }

  static async findByUserAndPost(userId, postId) {
    const [rows] = await pool.query(
      'SELECT * FROM reactions WHERE user_id = ? AND post_id = ? AND comment_id IS NULL',
      [userId, postId]
    );
    return rows[0];
  }

  static async findByUserAndComment(userId, commentId) {
    const [rows] = await pool.query(
      'SELECT * FROM reactions WHERE user_id = ? AND comment_id = ?',
      [userId, commentId]
    );
    return rows[0];
  }

  static async remove({ userId, postId, commentId }) {
    await pool.query(
      'DELETE FROM reactions WHERE user_id = ? AND post_id = ? AND comment_id = ?',
      [userId, postId, commentId || null]
    );
  }

  static async countByPost(postId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM reactions WHERE post_id = ? AND comment_id IS NULL',
      [postId]
    );
    return rows[0].count;
  }

  static async countByComment(commentId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM reactions WHERE comment_id = ?',
      [commentId]
    );
    return rows[0].count;
  }
}

module.exports = Reaction;