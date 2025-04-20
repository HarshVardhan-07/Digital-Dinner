// src/App.js

import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import { AuthProvider } from "./context/AuthContext";
import { CartProvider } from "./context/CartContext";
import { routes } from "./routes/RouteConfig"; // Import routes config
import PrivateRoute from "./components/PrivateRoute";

import "./index.css"; // Use Tailwind

function App() {
  return (
    <AuthProvider>
      <CartProvider>
        <Router>
          <Navbar />
          <div className="p-4 max-w-7xl mx-auto">
            <Routes>
              {routes.map(({ path, element, isProtected }) => (
                <Route
                  key={path}
                  path={path}
                  element={
                    isProtected ? <PrivateRoute>{element}</PrivateRoute> : element
                  }
                />
              ))}
            </Routes>
          </div>
        </Router>
      </CartProvider>
    </AuthProvider>
  );
}

export default App;
