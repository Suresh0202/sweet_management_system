import { createContext, useState, useContext, ReactNode } from 'react';
import { Sweet } from '../types/sweet';

export interface CartItem {
  sweet: Sweet;
  quantity: number;
}

interface CartContextType {
  cartItems: CartItem[];
  addToCart: (sweet: Sweet, quantity: number) => void;
  removeFromCart: (sweetId: number) => void;
  updateQuantity: (sweetId: number, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getCartCount: () => number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);

  const addToCart = (sweet: Sweet, quantity: number) => {
    setCartItems((prevItems) => {
      const existingItem = prevItems.find((item) => item.sweet.id === sweet.id);
      if (existingItem) {
        return prevItems.map((item) =>
          item.sweet.id === sweet.id
            ? { ...item, quantity: item.quantity + quantity }
            : item
        );
      }
      return [...prevItems, { sweet, quantity }];
    });
  };

  const removeFromCart = (sweetId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.sweet.id !== sweetId));
  };

  const updateQuantity = (sweetId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(sweetId);
      return;
    }
    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.sweet.id === sweetId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  const getCartTotal = (): number => {
    return cartItems.reduce((total, item) => {
      return total + item.sweet.price * item.quantity;
    }, 0);
  };

  const getCartCount = (): number => {
    return cartItems.reduce((count, item) => count + item.quantity, 0);
  };

  return (
    <CartContext.Provider
      value={{
        cartItems,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        getCartTotal,
        getCartCount,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within CartProvider');
  }
  return context;
};
