const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-grpc');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

const httpInstrumentation = new HttpInstrumentation();
const expressInstrumentation = new ExpressInstrumentation();

// Create OTLP exporter (gRPC)
const metricExporter = new OTLPMetricExporter({
  url: 'http://localhost:4317', // Adjust if your OTel agent is running elsewhere
});

// Register automatic HTTP and Express instrumentation
httpInstrumentation.enable();
expressInstrumentation.enable();

// Use PeriodicExportingMetricReader (Required for OpenTelemetry SDK 2.0)
const metricReader = new PeriodicExportingMetricReader({
  exporter: metricExporter,
  exportIntervalMillis: 1000, // Export metrics every second
});

// Create MeterProvider with the metric reader using the constructor
const meterProvider = new MeterProvider({
  readers: [metricReader],
});

const meter = meterProvider.getMeter('example-meter');

// Create a metric (Counter)
const styleCounter = meter.createCounter('numRequests', {
  description: 'Counts the number of requests with the "style" parameter',
  labelKeys: ['style'],
});

// Export meter and metrics
module.exports = { meter, styleCounter };