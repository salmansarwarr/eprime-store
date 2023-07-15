import express from 'express';
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products.js';
import auth from '../middleware/auth.js';

const router = express.Router();

router.get('/', getProducts);
router.get('/:id', getProduct);
router.post('/create', auth, createProduct);
router.delete('/delete/:id', auth, deleteProduct);
router.put('/update/:id', auth, updateProduct)

export default router;