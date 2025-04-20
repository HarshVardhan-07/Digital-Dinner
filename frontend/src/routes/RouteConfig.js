import React from 'react';
import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Cart from "../pages/Cart";
import Orders from "../pages/Orders";
import Order from "../pages/Order";
import MenuItemDetail from "../pages/MenuItemDetail";
import PrivateRoute from "../components/PrivateRoute";

export const routes = [
  // Public routes
  {
    path: "/",
    element: <Home />,
    isProtected: false
  },
  {
    path: "/login",
    element: <Login />,
    isProtected: false
  },
  {
    path: "/register",
    element: <Register />,
    isProtected: false
  },
  {
    path: "/menu/:id",
    element: <MenuItemDetail />,
    isProtected: false
  },
  {
    path: "/cart",
    element: <Cart />,
    isProtected: false
  },
  
// Protected routes
  {
    path: "/order",
    element: <PrivateRoute><Order /></PrivateRoute>,
  },
  {
    path: "/orders",
    element: <PrivateRoute><Orders /></PrivateRoute>,
  }
];
