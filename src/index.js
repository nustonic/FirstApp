import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import AppRouter from './AppRouter';
import CartProvider from './CartContext';
// import { CartProvider } from './CartContext';  // Correct import statement


const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <CartProvider >
    <AppRouter />
    </CartProvider>
  </React.StrictMode>
);
