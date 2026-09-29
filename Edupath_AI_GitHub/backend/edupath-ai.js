const express = require('express');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Serve static frontend files
app.use(express.static(path.join(__dirname, '../frontend')));

// API Routes
app.use('/api/pathways', require('./routes/pathways'));
app.use('/api/institutions', require('./routes/institutions'));
app.use('/api/scholarships', require('./routes/scholarships'));
app.use('/api/simulator', require('./routes/simulator'));
app.use('/api/matrix', require('./routes/matrix'));
app.use('/api/profile', require('./routes/profile'));
app.use('/api/videos', require('./routes/videos'));

// Health check endpoint
app.get('/api/health', (req, res) => {
  res.status(200).json({
    status: 'ok',
    system: 'EduPath AI Decision Engine Server',
    timestamp: new Date().toISOString()
  });
});

// Fallback to index.html for single page navigation
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/index.html'));
});

// Start Server
app.listen(PORT, () => {
  console.log(`🚀 EduPath AI Server running on port ${PORT}`);
  console.log(`🌐 Application URL: http://localhost:${PORT}`);
});
