import React, { createContext, useContext, useState, useEffect } from 'react';
import type { Product, ProductVariant, CartItem } from '../types';

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (product: Product, variant: ProductVariant, quantity: number, purchaseType: 'one-time' | 'subscription') => void;
  removeFromCart: (productId: string, variantId: string, purchaseType: 'one-time' | 'subscription') => void;
  updateQuantity: (productId: string, variantId: string, purchaseType: 'one-time' | 'subscription', quantity: number) => void;
  clearCart: () => void;
  cartSubtotal: number;
  cartCount: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  toggleCart: () => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Load cart from localStorage on mount
  useEffect(() => {
    try {
      const storedCart = localStorage.getItem('body_cafe_cart');
      if (storedCart) {
        setCartItems(JSON.parse(storedCart));
      }
    } catch (e) {
      console.error('Failed to load cart from localStorage:', e);
    }
  }, []);

  // Save cart to localStorage on changes
  useEffect(() => {
    try {
      localStorage.setItem('body_cafe_cart', JSON.stringify(cartItems));
    } catch (e) {
      console.error('Failed to save cart to localStorage:', e);
    }
  }, [cartItems]);

  const addToCart = (
    product: Product,
    variant: ProductVariant,
    quantity: number,
    purchaseType: 'one-time' | 'subscription'
  ) => {
    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) =>
          item.product.id === product.id &&
          item.variant.id === variant.id &&
          item.purchaseType === purchaseType
      );

      if (existingItemIndex > -1) {
        // Update quantity
        const newItems = [...prevItems];
        newItems[existingItemIndex].quantity += quantity;
        return newItems;
      } else {
        // Add new item
        return [...prevItems, { product, variant, quantity, purchaseType }];
      }
    });
    // Open drawer automatically when adding to cart (Apple/Aesop premium UX)
    setIsCartOpen(true);
  };

  const removeFromCart = (
    productId: string,
    variantId: string,
    purchaseType: 'one-time' | 'subscription'
  ) => {
    setCartItems((prevItems) =>
      prevItems.filter(
        (item) =>
          !(
            item.product.id === productId &&
            item.variant.id === variantId &&
            item.purchaseType === purchaseType
          )
      )
    );
  };

  const updateQuantity = (
    productId: string,
    variantId: string,
    purchaseType: 'one-time' | 'subscription',
    quantity: number
  ) => {
    if (quantity <= 0) {
      removeFromCart(productId, variantId, purchaseType);
      return;
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.product.id === productId &&
        item.variant.id === variantId &&
        item.purchaseType === purchaseType
          ? { ...item, quantity }
          : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const toggleCart = () => {
    setIsCartOpen((prev) => !prev);
  };

  // Calculations
  const cartSubtotal = cartItems.reduce((acc, item) => {
    const price =
      item.purchaseType === 'subscription'
        ? item.variant.subscriptionPrice
        : item.variant.price;
    return acc + price * item.quantity;
  }, 0);

  const cartCount = cartItems.reduce((acc, item) => acc + item.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartCount,
        isCartOpen,
        setIsCartOpen,
        toggleCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (context === undefined) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
