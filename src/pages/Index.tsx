
import React, { useState } from 'react';
import { Wine } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import CategoryFilter from '@/components/CategoryFilter';
import ProductsGrid from '@/components/ProductsGrid';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CartModal from '@/components/CartModal';
import Checkout from '@/pages/Checkout';
import Profile from '@/pages/Profile';
import { useCart } from '@/hooks/useCart';
import { products, categories } from '@/data/productsData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'profile'>('home');
  const { toast } = useToast();

  const {
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartItemCount,
    clearCart
  } = useCart(products);

  const handleAgeVerification = (isVerified: boolean) => {
    setIsAgeVerified(isVerified);
    setShowAgeModal(false);
    if (!isVerified) {
      toast({
        title: "Access Denied",
        description: "You must be 18 or older to access this app.",
        variant: "destructive"
      });
    } else {
      toast({
        title: "Welcome to QuickSip!",
        description: "Browse our selection of premium beverages.",
      });
    }
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      toast({
        title: "Cart Empty",
        description: "Add items to your cart before checking out.",
        variant: "destructive"
      });
      return;
    }
    setShowCart(false);
    setCurrentView('checkout');
  };

  const handleOrderComplete = () => {
    clearCart();
    setCurrentView('home');
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  if (!isAgeVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-50 to-orange-50 flex items-center justify-center">
        <AgeVerificationModal
          open={showAgeModal}
          onVerificationComplete={handleAgeVerification}
        />
        <div className="text-center p-8">
          <div className="w-24 h-24 bg-gradient-to-br from-red-600 to-red-800 rounded-full flex items-center justify-center mx-auto mb-6">
            <Wine className="h-12 w-12 text-white" />
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-red-600 to-red-800 bg-clip-text text-transparent mb-2">
            QuickSip Delivered
          </h1>
          <p className="text-gray-600 text-lg">Premium beverages delivered to your door</p>
        </div>
      </div>
    );
  }

  if (currentView === 'checkout') {
    return (
      <Checkout
        items={cartItems}
        onBack={() => setCurrentView('home')}
        onOrderComplete={handleOrderComplete}
      />
    );
  }

  if (currentView === 'profile') {
    return (
      <Profile onBack={() => setCurrentView('home')} />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={getCartItemCount()}
        onMenuClick={() => {}}
        onCartClick={() => setShowCart(true)}
        onProfileClick={() => setCurrentView('profile')}
      />

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <CategoriesSection
          categories={categories}
          onCategorySelect={setSelectedCategory}
        />

        <CategoryFilter
          categories={categories}
          selectedCategory={selectedCategory}
          onCategorySelect={setSelectedCategory}
        />

        <ProductsGrid
          products={filteredProducts}
          categories={categories}
          selectedCategory={selectedCategory}
          onAddToCart={addToCart}
        />
      </div>

      <CartModal
        open={showCart}
        onClose={() => setShowCart(false)}
        items={cartItems}
        onUpdateQuantity={updateCartQuantity}
        onRemoveItem={removeFromCart}
        onCheckout={handleCheckout}
      />
    </div>
  );
};

export default Index;
