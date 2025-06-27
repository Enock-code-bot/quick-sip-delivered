
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
      className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-lg overflow-hidden group"
      onClick={onClick}
    >
      <div className="relative h-32 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent" />
        <div className="absolute top-4 left-4 text-3xl">{icon}</div>
        <div className="absolute bottom-4 left-4 text-white">
          <h3 className="font-semibold text-lg">{title}</h3>
          <p className="text-sm opacity-90">{description}</p>
        </div>
      </div>
    </Card>
  );
};

export default CategoryCard;
