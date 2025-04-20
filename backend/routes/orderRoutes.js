import express from 'express';
import { createOrder, getOrdersByPhone } from '../controllers/orderController.js';
import auth from '../middleware/authMiddleware.js';


const router = express.Router();

router.post('/order', auth,  createOrder);
router.get('/orders/:phone', auth, getOrdersByPhone);

export default router;
