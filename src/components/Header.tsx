
import React from 'react';
import { ShoppingCart, User, Menu, Wine } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface HeaderProps {
  cartItemCount: number;
  onMenuClick: () => void;
  onCartClick: () => void;
  onProfileClick: () => void;
}

const Header = ({ cartItemCount, onMenuClick, onCartClick, onProfileClick }: HeaderProps) => {
  return (
    <header className="bg-white shadow-lg border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center">
            <Button variant="ghost" size="sm" onClick={onMenuClick} className="md:hidden">
              <Menu className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-3 ml-2 md:ml-0">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-500 rounded-full flex items-center justify-center shadow-lg float-animation">
                <Wine className="h-6 w-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-orange-500 to-red-500 bg-clip-text text-transparent">
                  Click n Sip
                </h1>
                <p className="text-xs text-gray-500 -mt-1">Premium Delivery</p>
              </div>
            </div>
          </div>

          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="sm"
              onClick={onCartClick}
              className="relative hover:bg-orange-50 transition-colors"
            >
              <ShoppingCart className="h-5 w-5 text-gray-700" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs rounded-full h-5 w-5 flex items-center justify-center shadow-lg animate-pulse">
                  {cartItemCount}
                </span>
              )}
            </Button>
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={onProfileClick}
              className="hover:bg-orange-50 transition-colors"
            >
              <User className="h-5 w-5 text-gray-700" />
            </Button>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
