import React, { createContext, useContext, useState, useEffect } from 'react';
import { CartItem, Product, CustomBowl } from '../types';

interface CartContextType {
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, instructions?: string) => void;
  addCustomBowlToCart: (customBowl: CustomBowl, quantity?: number) => void;
  removeFromCart: (cartItemId: string) => void;
  updateQuantity: (cartItemId: string, newQty: number) => void;
  clearCart: () => void;
  cartCount: number;
  subtotal: number;
  discount: number;
  promoCode: string;
  appliedPromo: { code: string; discountPercent: number; flatDiscount: number } | null;
  applyPromoCode: (code: string) => { success: boolean; message: string };
  removePromoCode: () => void;
  total: number;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isCheckoutOpen: boolean;
  setIsCheckoutOpen: (open: boolean) => void;
  studentMode: boolean;
  setStudentMode: (enabled: boolean) => void;
  quickViewProduct: Product | null;
  setQuickViewProduct: (product: Product | null) => void;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export const CartProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [cart, setCart] = useState<CartItem[]>(() => {
    try {
      const saved = localStorage.getItem('bowl_broth_cart');
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  const [appliedPromo, setAppliedPromo] = useState<{
    code: string;
    discountPercent: number;
    flatDiscount: number;
  } | null>(() => {
    try {
      const saved = localStorage.getItem('bowl_broth_promo');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  const [studentMode, setStudentMode] = useState<boolean>(() => {
    try {
      return localStorage.getItem('bowl_broth_student_mode') === 'true';
    } catch {
      return false;
    }
  });

  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);

  useEffect(() => {
    try {
      localStorage.setItem('bowl_broth_cart', JSON.stringify(cart));
    } catch (e) {
      console.error(e);
    }
  }, [cart]);

  useEffect(() => {
    try {
      localStorage.setItem('bowl_broth_student_mode', String(studentMode));
    } catch (e) {
      console.error(e);
    }
  }, [studentMode]);

  useEffect(() => {
    try {
      if (appliedPromo) {
        localStorage.setItem('bowl_broth_promo', JSON.stringify(appliedPromo));
      } else {
        localStorage.removeItem('bowl_broth_promo');
      }
    } catch (e) {
      console.error(e);
    }
  }, [appliedPromo]);

  const addToCart = (product: Product, quantity = 1, instructions = '') => {
    setCart((prev) => {
      const existingIndex = prev.findIndex(
        (item) => item.product?.id === product.id && !item.customBowl
      );
      if (existingIndex > -1) {
        const next = [...prev];
        next[existingIndex] = {
          ...next[existingIndex],
          quantity: next[existingIndex].quantity + quantity,
        };
        return next;
      }
      return [
        ...prev,
        {
          cartItemId: `item_${product.id}_${Date.now()}`,
          product,
          quantity,
          specialInstructions: instructions,
        },
      ];
    });
    setIsCartOpen(true);
  };

  const addCustomBowlToCart = (customBowl: CustomBowl, quantity = 1) => {
    setCart((prev) => [
      ...prev,
      {
        cartItemId: `custom_${customBowl.id}_${Date.now()}`,
        customBowl,
        quantity,
      },
    ]);
    setIsCartOpen(true);
  };

  const removeFromCart = (cartItemId: string) => {
    setCart((prev) => prev.filter((item) => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId: string, newQty: number) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart((prev) =>
      prev.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item
      )
    );
  };

  const clearCart = () => {
    setCart([]);
    setAppliedPromo(null);
  };

  const cartCount = cart.reduce((total, item) => total + item.quantity, 0);

  const subtotal = cart.reduce((total, item) => {
    if (item.product) {
      return total + item.product.price * item.quantity;
    }
    if (item.customBowl) {
      return total + item.customBowl.totalPrice * item.quantity;
    }
    return total;
  }, 0);

  // Calculate discount
  let discount = 0;
  if (appliedPromo) {
    if (appliedPromo.flatDiscount > 0) {
      discount += appliedPromo.flatDiscount;
    }
    if (appliedPromo.discountPercent > 0) {
      discount += Math.round((subtotal * appliedPromo.discountPercent) / 100);
    }
  } else if (studentMode && subtotal > 200) {
    // Automatic 15% student perk if student mode enabled and no other code applied
    discount = Math.round(subtotal * 0.15);
  }

  // Ensure discount doesn't exceed subtotal
  discount = Math.min(discount, subtotal);
  const total = Math.max(0, subtotal - discount);

  const applyPromoCode = (code: string): { success: boolean; message: string } => {
    const clean = code.trim().toUpperCase();
    if (clean === 'CAMPUSFUEL') {
      setAppliedPromo({ code: clean, discountPercent: 0, flatDiscount: 149 });
      return { success: true, message: '🎉 CAMPUSFUEL Applied: Flat ₹149 OFF your order!' };
    }
    if (clean === 'SQUADRAMEN') {
      setAppliedPromo({ code: clean, discountPercent: 25, flatDiscount: 0 });
      return { success: true, message: '🔥 SQUADRAMEN Applied: 25% OFF group feast!' };
    }
    if (clean === 'MIDNIGHTNOODS') {
      setAppliedPromo({ code: clean, discountPercent: 0, flatDiscount: 60 });
      return { success: true, message: '🌙 MIDNIGHTNOODS Applied: Free noodle refill perk (₹60 value)!' };
    }
    if (clean === 'STUDENT50' || clean === 'COLLEGE50') {
      setAppliedPromo({ code: clean, discountPercent: 20, flatDiscount: 0 });
      return { success: true, message: '🎓 Student Pass: 20% Student Special applied!' };
    }
    return { success: false, message: 'Invalid promo code. Try CAMPUSFUEL, SQUADRAMEN or COLLEGE50' };
  };

  const removePromoCode = () => {
    setAppliedPromo(null);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        addCustomBowlToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartCount,
        subtotal,
        discount,
        promoCode: appliedPromo?.code || '',
        appliedPromo,
        applyPromoCode,
        removePromoCode,
        total,
        isCartOpen,
        setIsCartOpen,
        isCheckoutOpen,
        setIsCheckoutOpen,
        studentMode,
        setStudentMode,
        quickViewProduct,
        setQuickViewProduct,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};
