// filepath: /Users/mitchhan/git/node/otel/src/app.js
// const { NodeTracerProvider } = require('@opentelemetry/sdk-trace-node');
// const { SimpleSpanProcessor } = require('@opentelemetry/sdk-trace-base');
// const { ConsoleSpanExporter } = require('@opentelemetry/sdk-trace-base');
// const { OTLPTraceExporter } = require('@opentelemetry/exporter-trace-otlp-http');
const express = require('express');
const { start } = require('@splunk/otel');

// // Set up OpenTelemetry
// const provider = new NodeTracerProvider();
// provider.addSpanProcessor(new SimpleSpanProcessor(new ConsoleSpanExporter()));
// provider.addSpanProcessor(new SimpleSpanProcessor(new OTLPTraceExporter({
//   url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT,
//   headers: {
//     'Content-Type': 'application/json'
//   }
// })));

// provider.register();

// Initialize OpenTelemetry with Splunk
start({
  serviceName: 'service1-example-nodejs',
//   metrics: { runtimeMetricsEnabled: true },
//   profiling: { memoryProfilingEnabled: true }
});

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