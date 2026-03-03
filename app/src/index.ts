import express, { type Request, type Response } from 'express';
import client from "prom-client";

const app = express();
const PORT = process.env.PORT || 3000;

const register = new client.Registry();

client.collectDefaultMetrics({ register });

app.get('/metrics', async (_req, res: Response) => {
  res.set('Content-Type', register.contentType);
  res.end(await register.metrics());
});

app.get('/health', (req: Request, res: Response) => {
    res.json({status: 'ok'});
});

app.get('/', (req: Request, res: Response) => {
  res.json({ message: 'Hello from Platform Engineer!' });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}

export = app;