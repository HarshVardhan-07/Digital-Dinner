import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';

const MenuItemDetail = () => {
  const { id } = useParams();
  const [menuItem, setMenuItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/menu/${id}`)
      .then(res => {
        setMenuItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setError('Failed to load item.');
        setLoading(false);
      });
  }, [id]);

  if (loading) return <div className="text-center mt-10 text-gray-500">Loading...</div>;
  if (error) return <div className="text-center mt-10 text-red-500">{error}</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg transition-all duration-300 hover:shadow-xl">
      <div className="overflow-hidden rounded-lg shadow-lg">
        <img
          src={menuItem.imageUrl}
          alt={menuItem.name}
          className="w-full h-80 object-cover transition-transform duration-300 hover:scale-105"
        />
      </div>
      
      <div className="mt-6 space-y-4">
        <h1 className="text-3xl font-extrabold text-gray-800 hover:text-blue-600 transition-colors duration-300">
          {menuItem.name}
        </h1>
        <p className="text-gray-600">{menuItem.description}</p>
        <div className="flex items-center justify-between">
          <p className="text-lg font-semibold text-green-600">₹{menuItem.price}</p>
          <p className={`text-sm font-medium ${menuItem.available ? 'text-green-600' : 'text-red-500'}`}>
            {menuItem.available ? 'Available' : 'Not Available'}
          </p>
        </div>
        <p className="text-sm text-gray-500 mt-2">Category: {menuItem.category}</p>
      </div>
    </div>
  );
};

export default MenuItemDetail;
