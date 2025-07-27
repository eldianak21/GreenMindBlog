const pool = require('../config/db');

class Analytics {
  static async record(type, userId = null, postId = null, data = null) {
    const [result] = await pool.query(
      'INSERT INTO analytics (type, user_id, post_id, data) VALUES (?, ?, ?, ?)',
      [type, userId, postId, JSON.stringify(data)]
    );
    return result.insertId;
  }

  static async getPageViews(postId) {
    const [rows] = await pool.query(
      'SELECT COUNT(*) as count FROM analytics WHERE type = "pageview" AND post_id = ?',
      [postId]
    );
    return rows[0].count;
  }

  static async getPostEngagement(postId) {
    const [rows] = await pool.query(
      `SELECT 
        COUNT(DISTINCT CASE WHEN type = 'pageview' THEN user_id END) as unique_views,
        COUNT(CASE WHEN type = 'pageview' THEN 1 END) as total_views,
        COUNT(DISTINCT CASE WHEN type = 'event' AND data->>"$.event" = 'comment' THEN user_id END) as commenters,
        COUNT(DISTINCT CASE WHEN type = 'event' AND data->>"$.event" = 'like' THEN user_id END) as likers
       FROM analytics 
       WHERE post_id = ?`,
      [postId]
    );
    return rows[0];
  }

  static async getUserActivity(userId) {
    const [rows] = await pool.query(
      `SELECT 
        COUNT(CASE WHEN type = 'pageview' THEN 1 END) as pages_viewed,
        COUNT(CASE WHEN type = 'event' AND data->>"$.event" = 'comment' THEN 1 END) as comments_made,
        COUNT(CASE WHEN type = 'event' AND data->>"$.event" = 'like' THEN 1 END) as likes_given
       FROM analytics 
       WHERE user_id = ?`,
      [userId]
    );
    return rows[0];
  }

  static async getPopularPosts(limit = 5) {
    const [rows] = await pool.query(
      `SELECT 
        p.id, p.title, p.slug, 
        COUNT(a.id) as view_count,
        u.name as author_name
       FROM analytics a
       JOIN posts p ON a.post_id = p.id
       JOIN users u ON p.user_id = u.id
       WHERE a.type = 'pageview'
       GROUP BY p.id
       ORDER BY view_count DESC
       LIMIT ?`,
      [limit]
    );
    return rows;
  }
}

module.exports = Analytics;