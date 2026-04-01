import { Low, JSONFile } from 'lowdb';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const dbPath = path.join(__dirname, '../../data/db.json');

let db;

export async function initDb() {
  const adapter = new JSONFile(dbPath);
  db = new Low(adapter);
  await db.read();
  
  db.data ||= { products: [], sales: [] };
  await db.write();
}

export function getDb() {
  return db;
}