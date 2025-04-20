import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext'; // Import the CartContext

const MenuItemCard = ({ item }) => {
  const { addItem } = useCart(); // Get addItem function from CartContext

  const handleAddToCart = () => {
    addItem(item); // Add the item to the cart
  };

  return (
    <div className="bg-white p-4 rounded-lg shadow-md hover:shadow-xl transition-all duration-300">
      <Link to={`/menu/${item._id}`}>
        {/* Image */}
        <div className="w-full h-56 mb-4 relative overflow-hidden rounded-lg">
          <img
            src={item.imageUrl || '/path/to/default/image.jpg'} // Ensure image URL is correct or fallback to default image
            alt={item.name}
            className="w-full h-full object-cover transform transition-transform duration-500 hover:scale-105"
          />
        </div>
        {/* Item Info */}
        <h3 className="text-xl font-semibold text-blue-600 hover:text-blue-800 transition-colors duration-300 mb-2">
          {item.name}
        </h3>
      </Link>
      <p className="text-gray-700 mb-2">{item.description}</p>
      <p className="text-sm text-gray-500 mb-2">Category: {item.category}</p>
      <p className="text-lg font-semibold text-blue-600 mb-4">₹{item.price}</p>

      <button
        onClick={handleAddToCart}
        className="w-full bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700 transition-colors duration-200"
      >
        Add to Cart
      </button>
    </div>
  );
};

export default MenuItemCard;
