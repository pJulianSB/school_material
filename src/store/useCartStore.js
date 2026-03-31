import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export const useCartStore = create(
  persist(
    (set, get) => ({
      cartItems: [],
      totalPrice: 0,
      addToCart: (packageItem) => {
        const currentItems = get().cartItems;
        const alreadyExists = currentItems.some((item) => item.id === packageItem.id);
        if (!alreadyExists) {
          set({ cartItems: [...currentItems, packageItem] });
        } 
      },
      removeFromCart: (packageId) => {
        set({
          cartItems: get().cartItems.filter((item) => item.id !== packageId),
        });
      },
      clearCart: () => {
        set({ cartItems: [], totalPrice: 0 });
      },
      getTotalItems: () => get().cartItems.length,
      updateTotalPrice: (totalPrice) => { 
        set({ totalPrice: totalPrice });
      }
    }),
    {
      name: 'packages-cart',
    }
  )
);
