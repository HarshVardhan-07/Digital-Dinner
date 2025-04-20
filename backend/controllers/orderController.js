import Order from '../models/Order.js';

// POST /api/order (JWT Protected)
export const createOrder = async (req, res) => {
  const { items, totalPrice } = req.body;
  const { phone, userId, name } = req.user; // Assuming user info is in the JWT

  // Validate input data
  if (!items || !totalPrice || !Array.isArray(items) || items.length === 0) {
    return res.status(400).json({ error: 'Missing or invalid order fields' });
  }

  if (!phone || !userId || !name) {
    return res.status(400).json({ error: 'User information is incomplete' });
  }

  try {
    // Create a new order
    const order = await Order.create({
      userId,
      name,
      phone,
      items,
      totalPrice,
    });

    // Return the created order
    res.status(201).json(order);
  } catch (err) {
    console.error('Error creating order:', err);
    res.status(500).json({ error: 'Failed to create order' });
  }
};

// GET /api/orders/:phone
export const getOrdersByPhone = async (req, res) => {
  const { phone } = req.params;

  // Ensure the user can only fetch their own orders
  if (phone !== req.user.phone) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  try {
    const orders = await Order.findAll({ where: { phone } });

    if (orders.length === 0) {
      return res.status(404).json({ message: 'No orders found' });
    }

    res.status(200).json(orders);
  } catch (err) {
    console.error('Error fetching orders:', err);
    res.status(500).json({ error: 'Failed to fetch orders' });
  }
};