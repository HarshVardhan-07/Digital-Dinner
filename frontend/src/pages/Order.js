import React, { useState } from 'react';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Order = () => {
  const { cart, clearCart } = useCart();
  const { auth } = useAuth();
  const navigate = useNavigate();
  const [message, setMessage] = useState('');

  const totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  const placeOrder = async () => {
    try {
      await axios.post('http://localhost:5000/api/order', {
        items: cart,
        totalPrice
      }, {
        headers: {
          Authorization: `Bearer ${auth.token}`
        }
      });
      clearCart();
      setMessage('Order placed successfully!');
      setTimeout(() => navigate('/orders'), 1500);
    } catch {
      setMessage('Order failed.');
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Place Your Order</h2>
      <ul className="mb-4">
        {cart.map(item => (
          <li key={item._id}>{item.name} × {item.qty}</li>
        ))}
      </ul>
      <p className="font-bold mb-4">Total: ₹{totalPrice}</p>
      <button onClick={placeOrder} className="bg-blue-600 text-white py-2 px-4 rounded">
        Confirm Order
      </button>
      {message && <p className="mt-4 text-center">{message}</p>}
    </div>
  );
};

export default Order;
