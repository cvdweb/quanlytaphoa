import { getDb } from '../models/db.js';

export async function getAllProducts(req, res) {
  try {
    const db = getDb();
    res.json(db.data.products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
}

export async function createProduct(req, res) {
  try {
    const db = getDb();
    const { name, unit, price, quantity } = req.body;
    
    const product = {
      id: Date.now(),
      name,
      unit,
      price,
      quantity,
      createdAt: new Date()
    };
    
    db.data.products.push(product);
    await db.write();
    
    res.status(201).json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function updateProduct(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;
    const { name, unit, price, quantity } = req.body;
    
    const product = db.data.products.find(p => p.id == id);
    if (!product) return res.status(404).json({ error: 'Product not found' });
    
    Object.assign(product, { name, unit, price, quantity, updatedAt: new Date() });
    await db.write();
    
    res.json(product);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}

export async function deleteProduct(req, res) {
  try {
    const db = getDb();
    const { id } = req.params;
    
    const index = db.data.products.findIndex(p => p.id == id);
    if (index === -1) return res.status(404).json({ error: 'Product not found' });
    
    const deleted = db.data.products.splice(index, 1);
    await db.write();
    
    res.json(deleted[0]);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
}