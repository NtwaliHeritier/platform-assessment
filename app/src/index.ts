import express, { type Request, type Response } from 'express';
import client from 'prom-client';
import pinoHttp from 'pino-http';
import { logger } from './logger';

const app = express();
const PORT = process.env.PORT || 3000;

const register = new client.Registry();

// Collect default metrics
client.collectDefaultMetrics({ register });

// HTTP request counter
const httpRequestCounter = new client.Counter({
  name: 'http_requests_total',
  help: 'Total number of HTTP requests',
  labelNames: ['method', 'route', 'status_code'],
});
register.registerMetric(httpRequestCounter);

// Attach structured logging middleware
app.use(
  pinoHttp({
    logger,
    enabled: process.env.NODE_ENV !== 'test',
  })
);

// Metrics middleware
app.use((req: Request, res: Response, next) => {
  res.on('finish', () => {
    httpRequestCounter
      .labels(req.method, req.path, res.statusCode.toString())
      .inc();
  });
  next();
});

// Routes
app.get('/health', (req: Request, res: Response) => {
  req.log.info({ route: '/health' }, 'Health check called');
  res.json({ status: 'ok' });
});

app.get('/', (req: Request, res: Response) => {
  req.log.info({ route: '/' }, 'Root endpoint hit');
  res.json({ message: 'Hello from Platform Engineer!' });
});

app.get('/metrics', async (_req, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

// Start server (not during tests)
if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    logger.info(`Server running on http://localhost:${PORT}`);
  });
}

export = app;