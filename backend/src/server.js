const express = require('express');
const cors = require('cors');
require('dotenv').config();
const db = require('./config/database');
const authRoutes = require('./routes/auth');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/health', async (req, res) => {
  try {
    const result = await db.query('SELECT NOW()');
    res.json({ status: 'ok', time: result.rows[0].now });
  } catch (err) {
    res.status(500).json({ status: 'error', message: err.message });
  }
});

app.use('/api/auth', authRoutes);

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log('Server running on port ' + PORT);
});

process.on('uncaughtException', (err) => {
  console.error('UNCAUGHT ERROR:', err);
});