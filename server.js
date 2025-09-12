// server.js
const express = require('express');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Allow frontend (GitHub Pages) to fetch data
app.use(cors());
app.use(express.json());

// API: /api/report?uid=...&district=...&mandal=...
app.get('/api/report', (req, res) => {
  const { uid = 'P-Unknown', district = 'Unknown', mandal = '' } = req.query;

  const now = new Date();
  const isoDate = now.toISOString().split('T')[0];

  // Mock data (తర్వాత నిజమైన DB connect చేస్తాం)
  const data = {
    uid,
    district,
    mandal,
    generatedAt: now.toISOString(),
    summary: { present: 2, absent: 1 },
    rows: [
      { name: 'Raja', status: 'Present', time: '09:02 AM', date: isoDate },
      { name: 'Sita', status: 'Absent', time: '-', date: isoDate },
      { name: 'Krishna', status: 'Present', time: '09:05 AM', date: isoDate }
    ]
  };

  res.json(data);
});

// health check
app.get('/', (req, res) => {
  res.send('ManaReports API running ✅');
});

app.listen(PORT,
