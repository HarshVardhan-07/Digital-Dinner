import React from 'react';
import { useCart } from '../context/CartContext';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, removeItem } = useCart();
  const navigate = useNavigate();

  const total = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map(item => (
              <li key={item._id} className="flex justify-between bg-white p-4 rounded shadow">
                <span>{item.name} × {item.qty}</span>
                <span>₹{item.price * item.qty}</span>
                <button onClick={() => removeItem(item._id)} className="text-red-600">Remove</button>
              </li>
            ))}
          </ul>
          <div className="mt-4 font-bold text-lg">Total: ₹{total}</div>
          <button onClick={() => navigate('/order')}
            className="mt-4 bg-green-600 text-white py-2 px-4 rounded hover:bg-green-700">
            Proceed to Order
          </button>
        </>
      )}
    </div>
  );
};

export default Cart;
