import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { type Product } from '../data/products';

export interface CartItem {
  id: string; // Composite ID: productId-variant
  productId: string;
  name: string;
  price: number;
  weight: string;
  quantity: number;
  image: string;
}

interface CartStore {
  items: CartItem[];
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  addItem: (product: Product, weight: string) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  getCartTotal: () => number;
  getItemCount: () => number;
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      isOpen: false,
      setIsOpen: (isOpen) => set({ isOpen }),
      
      addItem: (product, weight) => {
        set((state) => {
          const id = `${product.id}-${weight}`;
          const existingItem = state.items.find(item => item.id === id);
          
          if (existingItem) {
            return {
              items: state.items.map(item => 
                item.id === id 
                  ? { ...item, quantity: item.quantity + 1 }
                  : item
              )
            };
          }
          
          return {
            items: [...state.items, {
              id,
              productId: product.id,
              name: product.name,
              price: product.price,
              weight,
              quantity: 1,
              image: product.image
            }]
          };
        });
        get().setIsOpen(true);
      },
      
      removeItem: (id) => {
        set((state) => ({
          items: state.items.filter(item => item.id !== id)
        }));
      },
      
      updateQuantity: (id, quantity) => {
        set((state) => ({
          items: state.items.map(item => 
            item.id === id 
              ? { ...item, quantity: Math.max(1, quantity) }
              : item
          )
        }));
      },
      
      clearCart: () => set({ items: [] }),
      
      getCartTotal: () => {
        return get().items.reduce((total, item) => total + (item.price * item.quantity), 0);
      },
      
      getItemCount: () => {
        return get().items.reduce((count, item) => count + item.quantity, 0);
      }
    }),
    {
      name: 'meathub-cart',
      partialize: (state) => ({ items: state.items })
    }
  )
);
