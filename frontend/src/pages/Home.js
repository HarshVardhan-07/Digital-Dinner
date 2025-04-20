import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MenuItemCard from '../components/MenuItemCard';

// Error Component
const ErrorMessage = ({ message }) => (
  <div className="text-center py-6 text-red-600">
    <p>{message}</p>
  </div>
);

// Loading Component
const Loading = () => (
  <div className="text-center py-6 text-gray-500">
    <div className="spinner-border animate-spin inline-block w-8 h-8 border-4 rounded-full border-t-transparent border-blue-500" />
    <p>Loading...</p>
  </div>
);

// Category Filter Component
const CategoryFilter = ({ selectedCategory, onCategoryChange }) => (
  <div className="mb-6">
    <label htmlFor="category" className="block text-gray-700 font-semibold mb-2">
      Filter by Category:
    </label>
    <select
      id="category"
      value={selectedCategory}
      onChange={onCategoryChange}
      className="w-full max-w-xs p-2 border rounded bg-white shadow focus:ring-2 focus:ring-blue-500"
    >
      <option value="">All Categories</option>
      <option value="Appetizers">Appetizers</option>
      <option value="Main Course">Main Course</option>
      <option value="Desserts">Desserts</option>
      <option value="Drinks">Drinks</option>
    </select>
  </div>
);

const Home = () => {
  const [menu, setMenu] = useState([]);
  const [filteredMenu, setFilteredMenu] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/api/menu')
      .then(res => {
        setMenu(res.data);
        setFilteredMenu(res.data);
        setLoading(false);
      })
      .catch(err => {
        setError('Failed to load menu items');
        setLoading(false);
      });
  }, []);

  const handleCategoryChange = (e) => {
    const category = e.target.value;
    setSelectedCategory(category);
    if (category === '') {
      setFilteredMenu(menu);
    } else {
      const filtered = menu.filter(item => item.category === category);
      setFilteredMenu(filtered);
    }
  };

  // Grouping menu items by category
  const groupedMenu = filteredMenu.reduce((acc, item) => {
    if (!acc[item.category]) {
      acc[item.category] = [];
    }
    acc[item.category].push(item);
    return acc;
  }, {});

  if (loading) {
    return <Loading />;
  }

  if (error) {
    return <ErrorMessage message={error} />;
  }

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-800">Menu</h2>

      {/* Category Filter */}
      <CategoryFilter selectedCategory={selectedCategory} onCategoryChange={handleCategoryChange} />

      {/* Menu Grid */}
      <div className="space-y-6">
        {Object.keys(groupedMenu).length > 0 ? (
          Object.keys(groupedMenu).map(category => (
            <div key={category}>
              <h3 className="text-xl font-bold mb-4 text-gray-800">{category}</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {groupedMenu[category].map(item => (
                  <MenuItemCard key={item._id} item={item} />
                ))}
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-600">No items available in this category.</p>
        )}
      </div>
    </div>
  );
};

export default Home;
