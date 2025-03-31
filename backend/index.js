const express = require('express');
const cors = require('cors');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Import routes
const extractRouter = require('./routes/extract');
app.use('/api/extract', extractRouter);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
}).on('error', (err) => {
  console.error('Server failed to start:', err);
  if (err.code === 'EADDRINUSE') {
    console.error(`Port ${port} is already in use`);
  }
});
