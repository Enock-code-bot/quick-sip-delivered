
import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Search, Wine, Beer } from 'lucide-react';
import Header from '@/components/Header';
import CategoryCard from '@/components/CategoryCard';
import ProductCard from '@/components/ProductCard';
import AgeVerificationModal from '@/components/AgeVerificationModal';
import CartModal from '@/components/CartModal';
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

const Index = () => {
  const [isAgeVerified, setIsAgeVerified] = useState(false);
  const [showAgeModal, setShowAgeModal] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const { toast } = useToast();

  // Sample products data
  const products: Product[] = [
    {
      id: '1',
      name: 'Cabernet Sauvignon Reserve',
      price: 45.99,
      alcoholPercent: 13.5,
      brand: 'Napa Valley Winery',
      category: 'wine',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '2', 
      name: 'Premium Whiskey',
      price: 89.99,
      alcoholPercent: 40,
      brand: 'Highland Distillery',
      category: 'liquor',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '3',
      name: 'Craft IPA',
      price: 12.99,
      alcoholPercent: 6.2,
      brand: 'Local Brewery',
      category: 'beer',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '4',
      name: 'Sparkling Water',
      price: 3.99,
      brand: 'Pure Springs',
      category: 'soft-drinks',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '5',
      name: 'Pinot Grigio',
      price: 28.99,
      alcoholPercent: 12,
      brand: 'Italian Vineyards',
      category: 'wine',
      imageUrl: '/placeholder.svg'
    },
    {
      id: '6',
      name: 'Premium Vodka',
      price: 65.99,
      alcoholPercent: 40,
      brand: 'Crystal Clear',
      category: 'liquor',
      imageUrl: '/placeholder.svg'
    }
  ];

  const categories = [
    { id: 'wine', title: 'Wine', icon: '🍷', description: 'Red, White & Rosé' },
    { id: 'liquor', title: 'Liquor', icon: '🥃', description: 'Whiskey, Vodka & More' },
    { id: 'beer', title: 'Beer', icon: '🍺', description: 'Craft & Premium' },
    { id: 'soft-drinks', title: 'Soft Drinks', icon: '🥤', description: 'Refreshing Beverages' }
  ];

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

  const handleCheckout = () => {
    setShowCart(false);
    toast({
      title: "Checkout",
      description: "Checkout functionality would be implemented here.",
    });
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

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        cartItemCount={cartItems.reduce((sum, item) => sum + item.quantity, 0)}
        onMenuClick={() => {}}
        onCartClick={() => setShowCart(true)}
        onProfileClick={() => {}}
      />

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-4">
              Premium Beverages
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-90">
              Delivered to your door in 30 minutes
            </p>
            <div className="max-w-md mx-auto relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
              <Input
                type="text"
                placeholder="Search for wine, beer, spirits..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 py-3 text-lg bg-white"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Categories */}
        <section className="mb-12">
          <h2 className="text-2xl font-bold mb-6">Shop by Category</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {categories.map((category) => (
              <CategoryCard
                key={category.id}
                title={category.title}
                icon={category.icon}
                description={category.description}
                imageUrl="/placeholder.svg"
                onClick={() => setSelectedCategory(category.id)}
              />
            ))}
          </div>
        </section>

        {/* Category Filter */}
        <section className="mb-8">
          <div className="flex flex-wrap gap-2">
            <Button
              variant={selectedCategory === 'all' ? 'default' : 'outline'}
              onClick={() => setSelectedCategory('all')}
              className={selectedCategory === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
            >
              All Categories
            </Button>
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? 'default' : 'outline'}
                onClick={() => setSelectedCategory(category.id)}
                className={selectedCategory === category.id ? 'bg-red-600 hover:bg-red-700' : ''}
              >
                {category.icon} {category.title}
              </Button>
            ))}
          </div>
        </section>

        {/* Products Grid */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            {selectedCategory === 'all' ? 'All Products' : 
             categories.find(c => c.id === selectedCategory)?.title || 'Products'}
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredProducts.map((product) => (
              <ProductCard
                key={product.id}
                id={product.id}
                name={product.name}
                price={product.price}
                alcoholPercent={product.alcoholPercent}
                imageUrl={product.imageUrl}
                brand={product.brand}
                onAddToCart={addToCart}
              />
            ))}
          </div>
          
          {filteredProducts.length === 0 && (
            <div className="text-center py-12">
              <Beer className="h-16 w-16 mx-auto text-gray-300 mb-4" />
              <p className="text-gray-500 text-lg">No products found</p>
              <p className="text-gray-400">Try adjusting your search or category filter</p>
            </div>
          )}
        </section>
      </div>

      {/* Cart Modal */}
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
