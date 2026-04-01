import app from './app.js';
import { initDb } from './models/db.js';

const PORT = process.env.PORT || 3001;

async function start() {
  try {
    await initDb();
    console.log('Database initialized');
    
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  } catch (error) {
    console.error('Failed to start server:', error);
    process.exit(1);
  }
}

start();