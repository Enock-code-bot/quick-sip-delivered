import React, { useState } from 'react';
import { Wine } from 'lucide-react';
import Header from '@/components/Header';
import HeroSection from '@/components/HeroSection';
import CategoriesSection from '@/components/CategoriesSection';
import CategoryFilter from '@/components/CategoryFilter';
import ProductsGrid from '@/components/ProductsGrid';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import AuthModal from '@/components/AuthModal';
import CartModal from '@/components/CartModal';
import LoadingSpinner from '@/components/LoadingSpinner';
import OrderTracking from '@/components/OrderTracking';
import Checkout from '@/pages/Checkout';
import Profile from '@/pages/Profile';
import { useCart } from '@/hooks/useCart';
import { products, categories } from '@/data/productsData';
import { useToast } from '@/hooks/use-toast';

const Index = () => {
  const [user, setUser] = useState<any>(null);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCart, setShowCart] = useState(false);
  const [currentView, setCurrentView] = useState<'home' | 'checkout' | 'profile'>('home');
  const [isLoading, setIsLoading] = useState(false);
  const [activeOrder, setActiveOrder] = useState<any>(null);
  const { toast } = useToast();

  const {
    cartItems,
    addToCart,
    updateCartQuantity,
    removeFromCart,
    getCartItemCount,
    clearCart
  } = useCart(products);

  React.useEffect(() => {
    setShowAuthModal(true);
  }, []);

  const handleAuthComplete = (userData: any) => {
    setUser(userData);
    setShowAuthModal(false);
    setShowAgeModal(true);
  };

  const handleAgeVerification = (isVerified: boolean) => {
    setIsAgeVerified(isVerified);
    setShowAgeModal(false);
    if (!isVerified) {
      toast({
        title: "Access Denied",
        description: "You must be 18 or older to access this app.",
        variant: "destructive"
      });
      setUser(null);
      setShowAuthModal(true);
    } else {
      toast({
        title: "Welcome to Click n Sip!",
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
    // Simulate order tracking
    const orderId = Math.random().toString(36).substr(2, 9).toUpperCase();
    setActiveOrder({
      id: orderId,
      status: 'preparing',
      estimatedTime: '25-30 minutes'
    });
    
    clearCart();
    setCurrentView('home');
    
    toast({
      title: "Order Placed Successfully!",
      description: `Order #${orderId} is being prepared. Track your order below.`,
    });

    // Simulate order status updates
    setTimeout(() => {
      setActiveOrder((prev: any) => prev ? { ...prev, status: 'ready' } : null);
    }, 5000);
    
    setTimeout(() => {
      setActiveOrder((prev: any) => prev ? { ...prev, status: 'out-for-delivery' } : null);
    }, 10000);
    
    setTimeout(() => {
      setActiveOrder((prev: any) => prev ? { ...prev, status: 'delivered' } : null);
    }, 15000);
  };

  const filteredProducts = products.filter(product => {
    const matchesCategory = selectedCategory === 'all' || product.category === selectedCategory;
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         product.brand.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Check if user is admin (simple demo - in real app this would be from backend)
  const isAdmin = user?.email === 'admin@clicknsip.com';

  if (isLoading) {
    return <LoadingSpinner message="Loading Click n Sip..." fullScreen />;
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <AuthModal
          open={showAuthModal}
          onClose={() => {}}
          onAuthComplete={handleAuthComplete}
        />
        <div className="text-center p-8 fade-in-up">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl float-animation">
            <Wine className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Click n Sip
          </h1>
          <p className="text-gray-600 text-xl mb-2">Premium Beverage Delivery</p>
          <p className="text-gray-500">Delivered to your door in 30 minutes</p>
          <div className="flex items-center justify-center space-x-8 mt-8 text-sm text-gray-400">
            <span>🚚 Fast Delivery</span>
            <span>🏆 Premium Quality</span>
            <span>📱 Easy Ordering</span>
          </div>
        </div>
      </div>
    );
  }

  if (!isAgeVerified) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50 flex items-center justify-center">
        <AgeVerificationModal
          open={showAgeModal}
          onVerificationComplete={handleAgeVerification}
        />
        <div className="text-center p-8 fade-in-up">
          <div className="w-32 h-32 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center mx-auto mb-8 shadow-2xl float-animation">
            <Wine className="h-16 w-16 text-white" />
          </div>
          <h1 className="text-5xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent mb-4">
            Click n Sip
          </h1>
          <p className="text-gray-600 text-xl">Premium Beverage Delivery</p>
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
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-orange-50">
      <Header
        cartItemCount={getCartItemCount()}
        onMenuClick={() => {}}
        onCartClick={() => setShowCart(true)}
        onProfileClick={() => setCurrentView('profile')}
        showAdminAccess={isAdmin}
      />

      <HeroSection
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Active Order Tracking */}
        {activeOrder && (
          <div className="mb-8">
            <OrderTracking
              orderId={activeOrder.id}
              status={activeOrder.status}
              estimatedTime={activeOrder.estimatedTime}
            />
          </div>
        )}

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
