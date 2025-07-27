const pool = require('../config/db');

class SEO {
  static async trackKeyword(postId, keyword) {
    const [result] = await pool.query(
      'INSERT INTO seo_data (post_id, keyword) VALUES (?, ?)',
      [postId, keyword]
    );
    return result.insertId;
  }

  static async updateRanking(id, currentRank, bestRank, searchVolume, difficulty) {
    await pool.query(
      'UPDATE seo_data SET current_rank = ?, best_rank = ?, search_volume = ?, difficulty = ? WHERE id = ?',
      [currentRank, bestRank, searchVolume, difficulty, id]
    );
  }

  static async getKeywords(postId) {
    const [rows] = await pool.query(
      'SELECT * FROM seo_data WHERE post_id = ? ORDER BY current_rank ASC',
      [postId]
    );
    return rows;
  }

  static async getTopPerformingKeywords(limit = 5) {
    const [rows] = await pool.query(
      `SELECT keyword, current_rank, best_rank, search_volume 
       FROM seo_data 
       WHERE current_rank <= 10 
       ORDER BY search_volume DESC 
       LIMIT ?`,
      [limit]
    );
    return rows;
  }

  static async getKeywordOpportunities(limit = 5) {
    const [rows] = await pool.query(
      `SELECT keyword, current_rank, best_rank, search_volume, difficulty 
       FROM seo_data 
       WHERE current_rank > 10 AND current_rank <= 30 AND difficulty <= 50 
       ORDER BY search_volume DESC 
       LIMIT ?`,
      [limit]
    );
    return rows;
  }
}

module.exports = SEO;