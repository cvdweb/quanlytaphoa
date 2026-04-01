import express from 'express';
import * as salesController from '../controllers/salesController.js';

const router = express.Router();

router.get('/', salesController.getSales);
router.post('/', salesController.createSale);
router.get('/stats', salesController.getSalesStats);

export default router;