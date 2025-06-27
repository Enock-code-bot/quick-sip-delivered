
import React from 'react';
import { Input } from '@/components/ui/input';
import { Search } from 'lucide-react';

interface HeroSectionProps {
  searchQuery: string;
  onSearchChange: (query: string) => void;
}

const HeroSection = ({ searchQuery, onSearchChange }: HeroSectionProps) => {
  return (
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
              onChange={(e) => onSearchChange(e.target.value)}
              className="pl-10 py-3 text-lg bg-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
