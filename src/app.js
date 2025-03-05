const express = require('express');
const { requestCounter } = require('./otel');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.originalUrl}`);
  next();
});

app.get('/', (req, res) => {
  // Get the "style" parameter from the request query string
  const style = req.query.style || 'default';

  // Log the request with the extracted parameter
//  console.log(`Processing request with style: ${style}`);

  // Increment the metric with the dimension (label) "style"
  requestCounter.add(1, { style });

  res.send(`Received request with style: ${style}`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});