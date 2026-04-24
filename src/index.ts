import express from 'express';
import { ordersRouter } from './routes/orders.js';

const app = express();
app.use(express.json());

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'pizzasquad-orders-api' });
});

app.use('/orders', ordersRouter);

const port = Number(process.env.PORT ?? 3000);
app.listen(port, () => {
  console.log(`pizzasquad-orders-api listening on :${port}`);
});
