const db = require('../config/database');

const sessionsController = {
  async create(req, res) {
    try {
      const { subject, duration_minutes, session_number, session_type } = req.body;
      const result = await db.query(
        `INSERT INTO study_sessions 
         (user_id, subject, duration_minutes, session_number, session_type, ended_at)
         VALUES ($1, $2, $3, $4, $5, NOW())
         RETURNING *`,
        [req.user.id, subject, duration_minutes, session_number, session_type]
      );
      res.status(201).json(result.rows[0]);
    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getAll(req, res) {
    try {
      const result = await db.query(
        `SELECT * FROM study_sessions 
         WHERE user_id = $1 
         ORDER BY ended_at DESC LIMIT 50`,
        [req.user.id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getToday(req, res) {
    try {
      const result = await db.query(
        `SELECT COALESCE(SUM(duration_minutes), 0) as total_minutes,
                COUNT(*) as total_sessions
         FROM study_sessions
         WHERE user_id = $1 
         AND session_type = 'pomodoro'
         AND ended_at >= CURRENT_DATE`,
        [req.user.id]
      );
      res.json(result.rows[0]);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  },

  async getWeekly(req, res) {
    try {
      const result = await db.query(
        `SELECT 
           DATE(ended_at) as date,
           SUM(duration_minutes) as total_minutes
         FROM study_sessions
         WHERE user_id = $1
         AND session_type = 'pomodoro'
         AND ended_at >= NOW() - INTERVAL '7 days'
         GROUP BY DATE(ended_at)
         ORDER BY date ASC`,
        [req.user.id]
      );
      res.json(result.rows);
    } catch (err) {
      res.status(500).json({ error: 'Server error' });
    }
  }
};

module.exports = sessionsController;