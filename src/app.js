const express = require('express');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to log incoming requests
app.use((req, res, next) => {
  const timestamp = new Date().toISOString();
  console.log(`[${timestamp}] ${req.method} ${req.url}`);
  next();
});

app.get('/', (req, res) => {
  res.send('Hello, Splunk OpenTelemetry!');
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});