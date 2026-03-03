import express, { type Request, type Response } from 'express';

const app = express();
const PORT = process.env.PORT || 3000;

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