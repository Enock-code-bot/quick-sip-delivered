
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search, MapPin, Clock } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
    <div className="bg-gradient-to-br from-orange-500 via-red-500 to-pink-500 text-white relative overflow-hidden">
      <div className="absolute inset-0 bg-black/10"></div>
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-20 h-20 bg-white/10 rounded-full blur-xl"></div>
        <div className="absolute top-32 right-20 w-32 h-32 bg-white/5 rounded-full blur-2xl"></div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 bg-white/10 rounded-full blur-xl"></div>
      </div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 relative z-10">
        <div className="text-center">
          <h1 className="text-4xl md:text-6xl font-bold mb-4 fade-in-up">
            Premium Beverages
          </h1>
          <p className="text-xl md:text-2xl mb-2 opacity-90 slide-in-right">
            Delivered to your door in 30 minutes
          </p>
          
          <div className="flex items-center justify-center space-x-6 mb-8 text-sm opacity-80">
            <div className="flex items-center space-x-2">
              <MapPin className="h-4 w-4" />
              <span>Citywide Delivery</span>
            </div>
            <div className="flex items-center space-x-2">
              <Clock className="h-4 w-4" />
              <span>30 Min Guarantee</span>
            </div>
          </div>
          
          <div className="max-w-md mx-auto relative fade-in-up" style={{ animationDelay: '0.3s' }}>
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 h-5 w-5" />
            <Input
              type="text"
              placeholder="Search for wine, beer, spirits..."
              value={searchQuery}
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-12 py-4 text-lg bg-white/95 backdrop-blur-sm border-0 shadow-xl rounded-full focus:ring-2 focus:ring-white/50 text-gray-800 placeholder:text-gray-500"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
