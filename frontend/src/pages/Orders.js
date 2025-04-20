import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

const Orders = () => {
  const { auth } = useAuth();
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    if (!auth?.phone) return;

    axios.get(`http://localhost:5000/api/orders/${auth.phone}`, {
      headers: {
        Authorization: `Bearer ${auth.token}`,
      },
    })
      .then(res => setOrders(res.data))
      .catch(err => console.error('Order fetch failed', err));
  }, [auth.phone, auth.token]);

  return (
    <div className="p-6 max-w-3xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Your Orders</h2>
      {orders.length === 0 ? (
        <p>No orders yet.</p>
      ) : (
        orders.map((order, i) => (
          <div key={i} className="bg-white p-4 mb-4 rounded shadow">
            <p className="font-bold">Order #{order.id}</p>
            <ul className="text-sm mt-1">
              {order.items.map((item, idx) => (
                <li key={idx}>• {item.name} × {item.qty}</li>
              ))}
            </ul>
            <p className="mt-2 font-semibold">Total: ₹{order.totalPrice}</p>
            <p className="text-xs text-gray-400">{new Date(order.createdAt).toLocaleString()}</p>
          </div>
        ))
      )}
    </div>
  );
};

export default Orders;
