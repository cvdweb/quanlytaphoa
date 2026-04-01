import express from 'express';
import cors from 'cors';
import productsRouter from './routes/products.js';
import salesRouter from './routes/sales.js';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/products', productsRouter);
app.use('/api/sales', salesRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', timestamp: new Date() });
});

export default app;