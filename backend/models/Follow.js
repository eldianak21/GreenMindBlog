const pool = require('../config/db');

class Follow {
  static async create(followerId, followingId) {
    const [result] = await pool.query(
      'INSERT INTO followers (follower_id, following_id) VALUES (?, ?)',
      [followerId, followingId]
    );
    return result.insertId;
  }

  static async delete(followerId, followingId) {
    await pool.query(
      'DELETE FROM followers WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
  }

  static async isFollowing(followerId, followingId) {
    const [rows] = await pool.query(
      'SELECT * FROM followers WHERE follower_id = ? AND following_id = ?',
      [followerId, followingId]
    );
    return rows.length > 0;
  }

  static async getFollowers(userId) {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.profile_picture 
       FROM users u 
       JOIN followers f ON u.id = f.follower_id 
       WHERE f.following_id = ?`,
      [userId]
    );
    return rows;
  }

  static async getFollowing(userId) {
    const [rows] = await pool.query(
      `SELECT u.id, u.name, u.email, u.profile_picture 
       FROM users u 
       JOIN followers f ON u.id = f.following_id 
       WHERE f.follower_id = ?`,
      [userId]
    );
    return rows;
  }

  static async countFollowers(userId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM followers WHERE following_id = ?',
      [userId]
    );
    return rows[0].count;
  }

  static async countFollowing(userId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM followers WHERE follower_id = ?',
      [userId]
    );
    return rows[0].count;
  }
}

module.exports = Follow;