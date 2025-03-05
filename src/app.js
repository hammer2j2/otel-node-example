const express = require('express');
const { styleCounter } = require('./otel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
      const timestamp = new Date().toISOString();
      console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
      next();
    });


app.get('/', (req, res) => {
  const style = req.query.style || 'default';
  // Increment the request counter
  styleCounter.add(1, { style });
  res.send(`Received request with style: ${style}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});