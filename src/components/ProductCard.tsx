
import React from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';

interface ProductCardProps {
  id: string;
  name: string;
  price: number;
  alcoholPercent?: number;
  imageUrl: string;
  brand: string;
  onAddToCart: (productId: string) => void;
}

const ProductCard = ({ id, name, price, alcoholPercent, imageUrl, brand, onAddToCart }: ProductCardProps) => {
  return (
    <Card className="overflow-hidden transition-all duration-300 hover:shadow-lg">
      <div className="relative h-48 bg-gradient-to-br from-gray-50 to-gray-100">
        <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
        {alcoholPercent && (
          <div className="absolute top-2 right-2 bg-red-600 text-white px-2 py-1 rounded-full text-xs font-medium">
            {alcoholPercent}% ABV
          </div>
        )}
      </div>
      <div className="p-4">
        <div className="mb-2">
          <p className="text-sm text-gray-600 font-medium">{brand}</p>
          <h3 className="font-semibold text-gray-900 line-clamp-2">{name}</h3>
        </div>
        <div className="flex items-center justify-between">
          <span className="text-lg font-bold text-red-600">${price.toFixed(2)}</span>
          <Button
            size="sm"
            onClick={() => onAddToCart(id)}
            className="bg-red-600 hover:bg-red-700 text-white"
          >
            <Plus className="h-4 w-4 mr-1" />
            Add
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default ProductCard;
