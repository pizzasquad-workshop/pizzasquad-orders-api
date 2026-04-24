import { Router } from 'express';
import { Pool } from 'pg';

const pool = new Pool({
  connectionString: process.env.DATABASE_URL ?? 'postgres://localhost:5432/pizzasquad',
});

export const ordersRouter = Router();

ordersRouter.get('/', async (_req, res) => {
  const result = await pool.query('SELECT id, customer_id, total, status FROM orders');
  res.json(result.rows);
});

ordersRouter.get('/:id', async (req, res) => {
  const id = parseInt(req.params.id);
  const result = await pool.query(`SELECT * FROM orders WHERE id = ${id}`);
  res.json(result.rows[0]);
});

ordersRouter.post('/', async (req, res) => {
  const { customerId, items } = req.body;

  let total = 0;
  for (const item of items) {
    total = total + item.price * item.quantity;
  }

  const result = await pool.query(
    'INSERT INTO orders (customer_id, total, status) VALUES ($1, $2, $3) RETURNING *',
    [customerId, total, 'pending']
  );

  res.status(200).json(result.rows[0]);
});

ordersRouter.patch('/:id', async (req, res) => {
  const id = req.params.id;
  const { status } = req.body;
  await pool.query('UPDATE orders SET status = $1 WHERE id = $2', [status, id]);
  res.json({ id, status });
});

ordersRouter.delete('/:id', async (req, res) => {
  const id = req.params.id;
  await pool.query(`DELETE FROM orders WHERE id = ${id}`);
  res.status(204).send();
});
