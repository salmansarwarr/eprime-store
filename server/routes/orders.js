import express from 'express';
import { createOrder, deleteOrder, getOrders } from '../controllers/orders.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.post('/', createOrder);
router.get('/', auth, getOrders);
router.delete('/:id', auth, deleteOrder);

export default router;