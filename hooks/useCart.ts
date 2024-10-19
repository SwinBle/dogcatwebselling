import { useState, useCallback } from 'react';

export const useCart = (initialItems = []) => {
  const [cartItems, setCartItems] = useState(initialItems);

  const addToCart = useCallback((product) => {
    if (product.stock > 0) {
      setCartItems(prevItems => {
        const existingItem = prevItems.find(item => item.id === product.id);
        if (existingItem) {
          return prevItems.map(item =>
            item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
          );
        } else {
          return [...prevItems, { ...product, quantity: 1 }];
        }
      });
    }
  }, []);

  const removeFromCart = useCallback((productId) => {
    setCartItems(prevItems => prevItems.filter(item => item.id !== productId));
  }, []);

  return { cartItems, addToCart, removeFromCart };
};
