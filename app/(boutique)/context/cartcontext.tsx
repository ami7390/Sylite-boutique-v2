"use client";

import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

export interface CartItem {
  id: string | number;
  name: string;
  price: number;
  quantity: number;
  image?: string;
  size?: string;
  color?: string;
}

interface CartContextValue {
  cartItems: CartItem[];
  addToCart: (product: Omit<CartItem, "quantity"> & { quantity?: number }) => void;
  updateQuantity: (id: CartItem["id"], quantity: number) => void;
  removeFromCart: (id: CartItem["id"]) => void;
  clearCart: () => void;
}

const CartContext = createContext<CartContextValue | null>(null);
const STORAGE_KEY = "sylite-cart";

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [hydrated, setHydrated] = useState(false);

  useEffect(() => {
    try {
      const savedCart = window.localStorage.getItem(STORAGE_KEY);
      if (savedCart) setCartItems(JSON.parse(savedCart) as CartItem[]);
    } catch {
      window.localStorage.removeItem(STORAGE_KEY);
    } finally {
      setHydrated(true);
    }
  }, []);

  useEffect(() => {
    if (hydrated) window.localStorage.setItem(STORAGE_KEY, JSON.stringify(cartItems));
  }, [cartItems, hydrated]);

  const addToCart = useCallback((product: Omit<CartItem, "quantity"> & { quantity?: number }) => {
    const requestedQuantity = Math.max(1, product.quantity ?? 1);
    setCartItems((current) => {
      const existing = current.find((item) => String(item.id) === String(product.id));
      if (!existing) return [...current, { ...product, quantity: requestedQuantity }];
      return current.map((item) =>
        String(item.id) === String(product.id)
          ? { ...item, quantity: item.quantity + requestedQuantity }
          : item
      );
    });
  }, []);

  const updateQuantity = useCallback((id: CartItem["id"], quantity: number) => {
    if (quantity < 1) {
      setCartItems((current) => current.filter((item) => String(item.id) !== String(id)));
      return;
    }
    setCartItems((current) => current.map((item) => String(item.id) === String(id) ? { ...item, quantity } : item));
  }, []);

  const removeFromCart = useCallback((id: CartItem["id"]) => {
    setCartItems((current) => current.filter((item) => String(item.id) !== String(id)));
  }, []);

  const clearCart = useCallback(() => setCartItems([]), []);
  const value = useMemo(() => ({ cartItems, addToCart, updateQuantity, removeFromCart, clearCart }), [cartItems, addToCart, updateQuantity, removeFromCart, clearCart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart doit être utilisé dans CartProvider");
  return context;
}
