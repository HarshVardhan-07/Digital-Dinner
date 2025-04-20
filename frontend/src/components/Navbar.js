import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useCart } from '../context/CartContext';

const Navbar = () => {
  const { auth, logout } = useAuth();
  const { cart } = useCart();

  return (
    <nav className="bg-gray-800 text-white p-4 flex justify-between">
      <div className="flex gap-4">
        <Link to="/" className="hover:underline">Menu</Link>
        <Link to="/cart" className="hover:underline">Cart ({cart.length})</Link>
        {auth?.token && (
          <>
            <Link to="/orders" className="hover:underline">My Orders</Link> 
          </>
        )}
      </div>
      <div>
        {auth?.token ? (
          <button onClick={logout} className="hover:underline">Logout</button>
        ) : (
          <>
            <Link to="/login" className="hover:underline mr-4">Login</Link>
            <Link to="/register" className="hover:underline">Register</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
