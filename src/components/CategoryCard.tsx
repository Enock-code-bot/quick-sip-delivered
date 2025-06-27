
import React from 'react';
import { Card } from '@/components/ui/card';

interface CategoryCardProps {
  title: string;
  icon: string;
  description: string;
  imageUrl: string;
  onClick: () => void;
}

const CategoryCard = ({ title, icon, description, imageUrl, onClick }: CategoryCardProps) => {
  return (
    <Card 
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-xl overflow-hidden group bg-gradient-to-br from-white to-gray-50 border-2 border-transparent hover:border-orange-200"
      onClick={onClick}
    >
      <div className="relative h-32 bg-gradient-to-br from-orange-100 to-red-100 group-hover:from-orange-200 group-hover:to-red-200 transition-all duration-300">
        <div className="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent" />
        <div className="absolute top-4 left-4 text-4xl drop-shadow-lg group-hover:scale-110 transition-transform duration-300">
          {icon}
        </div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-bold text-lg drop-shadow-md">{title}</h3>
          <p className="text-sm opacity-90 drop-shadow-sm">{description}</p>
        </div>
        <div className="absolute top-2 right-2 w-3 h-3 bg-gradient-to-r from-orange-400 to-red-400 rounded-full shadow-lg"></div>
      </div>
    </Card>
  );
};

export default CategoryCard;
