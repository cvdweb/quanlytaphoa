import { getDb } from '../models/db.js';

export async function getSales(req, res) {
  try {
    const db = getDb();
    const { from, to } = req.query;
    
    let sales = db.data.sales;
    
    if (from || to) {
      const fromDate = from ? new Date(from) : new Date(0);
      const toDate = to ? new Date(to) : new Date();
      
      sales = sales.filter(s => {
        const saleDate = new Date(s.date);
        return saleDate >= fromDate && saleDate <= toDate;
      });
    }
    
    res.json(sales);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createSale(req, res) {
  try {
    const db = getDb();
    const { productId, quantity, totalAmount } = req.body;
    
    const sale = {
      id: Date.now(),
      productId,
      quantity,
      totalAmount,
      date: new Date(),
      createdAt: new Date()
    };
    
    db.data.sales.push(sale);
    await db.write();
    
    res.status(201).json(sale);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function getSalesStats(req, res) {
  try {
    const db = getDb();
    const { from, to } = req.query;
    
    let sales = db.data.sales;
    
    if (from || to) {
      const fromDate = from ? new Date(from) : new Date(0);
      const toDate = to ? new Date(to) : new Date();
      
      sales = sales.filter(s => {
        const saleDate = new Date(s.date);
        return saleDate >= fromDate && saleDate <= toDate;
      });
    }
    
    const totalRevenue = sales.reduce((sum, s) => sum + s.totalAmount, 0);
    const totalOrders = sales.length;
    
    res.json({ totalRevenue, totalOrders, sales });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}