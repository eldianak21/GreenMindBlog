const pool = require('../config/db');

class Post {
  static async create({ userId, title, content, excerpt, slug, featuredImage, readTime }) {
    const [result] = await pool.query(
      'INSERT INTO posts (user_id, title, content, excerpt, slug, featured_image, read_time, status) VALUES (?, ?, ?, ?, ?, ?, ?, "published")',
      [userId, title, content, excerpt, slug, featuredImage, readTime]
    );
    return result.insertId;
  }

  static async findById(id) {
    const [rows] = await pool.query(
      `SELECT p.*, u.name as author_name, u.profile_picture as author_image 
       FROM posts p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async findBySlug(slug) {
    const [rows] = await pool.query(
      `SELECT p.*, u.name as author_name, u.profile_picture as author_image 
       FROM posts p 
       JOIN users u ON p.user_id = u.id 
       WHERE p.slug = ?`,
      [slug]
    );
    return rows[0];
  }

  static async findAll({ page = 1, limit = 10, category = null, userId = null, search = null }) {
    const offset = (page - 1) * limit;
    let query = `
      SELECT p.*, u.name as author_name, u.profile_picture as author_image 
      FROM posts p 
      JOIN users u ON p.user_id = u.id 
      WHERE p.status = 'published'
    `;
    const params = [];

    if (category) {
      query += ` JOIN post_categories pc ON p.id = pc.post_id 
                 JOIN categories c ON pc.category_id = c.id 
                 WHERE c.slug = ?`;
      params.push(category);
    }

    if (userId) {
      query += ` AND p.user_id = ?`;
      params.push(userId);
    }

    if (search) {
      query += ` AND (p.title LIKE ? OR p.content LIKE ? OR p.excerpt LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    query += ` ORDER BY p.created_at DESC LIMIT ? OFFSET ?`;
    params.push(limit, offset);

    const [rows] = await pool.query(query, params);
    return rows;
  }

  static async count({ category = null, userId = null, search = null }) {
    let query = `SELECT COUNT(*) as total FROM posts WHERE status = 'published'`;
    const params = [];

    if (category) {
      query += ` JOIN post_categories pc ON posts.id = pc.post_id 
                 JOIN categories c ON pc.category_id = c.id 
                 WHERE c.slug = ?`;
      params.push(category);
    }

    if (userId) {
      query += ` AND user_id = ?`;
      params.push(userId);
    }

    if (search) {
      query += ` AND (title LIKE ? OR content LIKE ? OR excerpt LIKE ?)`;
      params.push(`%${search}%`, `%${search}%`, `%${search}%`);
    }

    const [rows] = await pool.query(query, params);
    return rows[0].total;
  }

  static async update(id, { title, content, excerpt, slug, featuredImage, readTime, status }) {
    await pool.query(
      'UPDATE posts SET title = ?, content = ?, excerpt = ?, slug = ?, featured_image = ?, read_time = ?, status = ? WHERE id = ?',
      [title, content, excerpt, slug, featuredImage, readTime, status, id]
    );
  }

  static async delete(id) {
    await pool.query('DELETE FROM posts WHERE id = ?', [id]);
  }

  static async addCategory(postId, categoryId) {
    await pool.query('INSERT INTO post_categories (post_id, category_id) VALUES (?, ?)', [postId, categoryId]);
  }

  static async removeCategories(postId) {
    await pool.query('DELETE FROM post_categories WHERE post_id = ?', [postId]);
  }

  static async getCategories(postId) {
    const [rows] = await pool.query(
      'SELECT c.* FROM categories c JOIN post_categories pc ON c.id = pc.category_id WHERE pc.post_id = ?',
      [postId]
    );
    return rows;
  }

  static async recordView(postId, userId, ipAddress) {
    await pool.query(
      'INSERT INTO post_views (post_id, user_id, ip_address) VALUES (?, ?, ?)',
      [postId, userId, ipAddress]
    );
  }

  static async getPopularPosts(limit = 5) {
    const [rows] = await pool.query(
      `SELECT p.*, COUNT(pv.id) as view_count 
       FROM posts p 
       LEFT JOIN post_views pv ON p.id = pv.post_id 
       GROUP BY p.id 
       ORDER BY view_count DESC 
       LIMIT ?`,
      [limit]
    );
    return rows;
  }
}

module.exports = Post;