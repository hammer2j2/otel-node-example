const { MeterProvider, PeriodicExportingMetricReader } = require('@opentelemetry/sdk-metrics');
const { OTLPMetricExporter } = require('@opentelemetry/exporter-metrics-otlp-http');
const { HttpInstrumentation } = require('@opentelemetry/instrumentation-http');
const { ExpressInstrumentation } = require('@opentelemetry/instrumentation-express');

// Create a MeterProvider to manage custom and standard metrics
const meterProvider = new MeterProvider({
  reader: new PeriodicExportingMetricReader({
    exporter: new OTLPMetricExporter({ url: 'http://192.168.15.13:4318/v1/metrics' }), // Update with your exporter URL
    exportIntervalMillis: 1000,
  }),
});

// Standard HTTP metrics (auto-instrumentation)
const httpInstrumentation = new HttpInstrumentation();
const expressInstrumentation = new ExpressInstrumentation();

// Register automatic HTTP and Express instrumentation
httpInstrumentation.enable();
expressInstrumentation.enable();

// Get a Meter instance from the MeterProvider
const meter = meterProvider.getMeter('my-app-meter');

// Register custom metric for counting requests with a 'style' parameter
const requestCounter = meter.createCounter('numRequests', {
  description: 'Counts the number of requests with the "style" parameter',
  labelKeys: ['style'],
});

// Ensure the metrics start exporting with the configured reader
console.log('Metrics SDK initialized');

// Exporting metric data every second via the reader should happen automatically
module.exports = { meter, requestCounter };