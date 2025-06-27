
import { useState } from 'react';
import { useToast } from '@/hooks/use-toast';

interface CartItem {
  id: string;
  name: string;
  price: number;
  quantity: number;
  brand: string;
}

interface Product {
  id: string;
  name: string;
  price: number;
  alcoholPercent?: number;
  brand: string;
  category: string;
  imageUrl: string;
}

export const useCart = (products: Product[]) => {
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const { toast } = useToast();

  const addToCart = (productId: string) => {
    const product = products.find(p => p.id === productId);
    if (!product) return;

    const existingItem = cartItems.find(item => item.id === productId);
    if (existingItem) {
      setCartItems(items =>
        items.map(item =>
          item.id === productId
            ? { ...item, quantity: item.quantity + 1 }
            : item
        )
      );
    } else {
      setCartItems(items => [...items, {
        id: product.id,
        name: product.name,
        price: product.price,
        quantity: 1,
        brand: product.brand
      }]);
    }

    toast({
      title: "Added to Cart",
      description: `${product.name} has been added to your cart.`,
    });
  };

  const updateCartQuantity = (id: string, quantity: number) => {
    if (quantity === 0) {
      removeFromCart(id);
      return;
    }
    setCartItems(items =>
      items.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeFromCart = (id: string) => {
    setCartItems(items => items.filter(item => item.id !== id));
    toast({
      title: "Item Removed",
      description: "Item has been removed from your cart.",
    });
  };

  const getCartItemCount = () => {
    return cartItems.reduce((sum, item) => sum + item.quantity, 0);
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return {
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartItemCount,
    clearCart
  };
};
