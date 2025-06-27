
import React from 'react';
import { Beer } from 'lucide-react';
import ProductCard from '@/components/ProductCard';

interface Product {
  id: string;
  name: string;
  price: number;
  alcoholPercent?: number;
  brand: string;
  category: string;
  imageUrl: string;
}

interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface ProductsGridProps {
  products: Product[];
  categories: Category[];
  selectedCategory: string;
  onAddToCart: (productId: string) => void;
}

const ProductsGrid = ({ products, categories, selectedCategory, onAddToCart }: ProductsGridProps) => {
  const getSectionTitle = () => {
    if (selectedCategory === 'all') return 'All Products';
    return categories.find(c => c.id === selectedCategory)?.title || 'Products';
  };

  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">{getSectionTitle()}</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {products.map((product) => (
          <ProductCard
            key={product.id}
            id={product.id}
            name={product.name}
            price={product.price}
            alcoholPercent={product.alcoholPercent}
            imageUrl={product.imageUrl}
            brand={product.brand}
            onAddToCart={onAddToCart}
          />
        ))}
      </div>
      
      {products.length === 0 && (
        <div className="text-center py-12">
          <Beer className="h-16 w-16 mx-auto text-gray-300 mb-4" />
          <p className="text-gray-500 text-lg">No products found</p>
          <p className="text-gray-400">Try adjusting your search or category filter</p>
        </div>
      )}
    </section>
  );
};

export default ProductsGrid;
