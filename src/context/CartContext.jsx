import React, { createContext, useContext, useEffect, useRef, useState } from 'react';

const CartContext = createContext();

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const userEmailRef = useRef(localStorage.getItem('user_email') || 'guest');

  const getUserEmail = () => localStorage.getItem('user_email') || 'guest';

  const loadCartForUser = (email) => {
    const savedCart = localStorage.getItem(`cart_${email}`);
    if (savedCart) {
      try {
        setCart(JSON.parse(savedCart));
      } catch (error) {
        console.error('Error loading cart:', error);
        setCart([]);
      }
    } else {
      setCart([]);
    }
  };

  // Initial load
  useEffect(() => {
    loadCartForUser(userEmailRef.current);
  }, []);

  // Persist cart for current user on change
  useEffect(() => {
    const email = getUserEmail();
    localStorage.setItem(`cart_${email}`, JSON.stringify(cart));
  }, [cart]);

  // React to user changes (same-tab custom event + cross-tab storage event)
  useEffect(() => {
    const handleUserChange = () => {
      const newEmail = getUserEmail();
      if (newEmail !== userEmailRef.current) {
        userEmailRef.current = newEmail;
        loadCartForUser(newEmail);
      }
    };

    const onStorage = (e) => {
      if (e.key === 'user_email') handleUserChange();
    };

    window.addEventListener('storage', onStorage);
    window.addEventListener('user_email_changed', handleUserChange);

    // Fallback polling for same-tab updates if custom event wasn't dispatched
    const interval = setInterval(handleUserChange, 2000);

    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('user_email_changed', handleUserChange);
      clearInterval(interval);
    };
  }, []);

  const addToCart = (item) => {
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (cartItem) => cartItem.productId === item.productId && cartItem.size === item.size
      );
      if (existingItemIndex > -1) {
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += item.quantity;
        return updatedCart;
      }
      return [...prevCart, { ...item, id: Date.now() }];
    });
  };

  const removeFromCart = (itemId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== itemId));
  };

  const updateQuantity = (itemId, newQuantity) => {
    if (newQuantity < 1) {
      removeFromCart(itemId);
      return;
    }
    setCart((prevCart) =>
      prevCart.map((item) => (item.id === itemId ? { ...item, quantity: newQuantity } : item))
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  const getCartTotal = () => {
    return cart.reduce((total, item) => {
      const price =
        typeof item.product.price === 'number'
          ? item.product.price
          : parseInt(String(item.product.price).replace(/[^0-9]/g, '')) || 0;
      return total + price * item.quantity;
    }, 0);
  };

  const getCartCount = () => cart.reduce((count, item) => count + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{ cart, addToCart, removeFromCart, updateQuantity, clearCart, getCartTotal, getCartCount }}
    >
      {children}
    </CartContext.Provider>
  );
};
