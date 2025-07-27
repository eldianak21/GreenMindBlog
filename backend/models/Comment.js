const pool = require('../config/db');

class Comment {
  static async create({ userId, postId, parentId, content }) {
    const [result] = await pool.query(
      'INSERT INTO comments (user_id, post_id, parent_id, content) VALUES (?, ?, ?, ?)',
      [userId, postId, parentId || null, content]
    );
    return result.insertId;
  }

  static async findByPost(postId) {
    const [rows] = await pool.query(
      `SELECT c.*, u.name as user_name, u.profile_picture as user_image 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.post_id = ? AND c.parent_id IS NULL 
       ORDER BY c.created_at DESC`,
      [postId]
    );
    return rows;
  }

  static async findReplies(parentId) {
    const [rows] = await pool.query(
      `SELECT c.*, u.name as user_name, u.profile_picture as user_image 
       FROM comments c 
       JOIN users u ON c.user_id = u.id 
       WHERE c.parent_id = ? 
       ORDER BY c.created_at ASC`,
      [parentId]
    );
    return rows;
  }

  static async findById(id) {
    const [rows] = await pool.query('SELECT * FROM comments WHERE id = ?', [id]);
    return rows[0];
  }

  static async update(id, content) {
    await pool.query('UPDATE comments SET content = ? WHERE id = ?', [content, id]);
  }

  static async delete(id) {
    await pool.query('DELETE FROM comments WHERE id = ?', [id]);
  }

  static async countByPost(postId) {
    const [rows] = await pool.query('SELECT COUNT(*) as count FROM comments WHERE post_id = ?', [postId]);
    return rows[0].count;
  }
}

module.exports = Comment;