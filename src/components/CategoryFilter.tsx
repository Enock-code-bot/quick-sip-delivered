
import React from 'react';
import { Button } from '@/components/ui/button';

interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface CategoryFilterProps {
  categories: Category[];
  selectedCategory: string;
  onCategorySelect: (categoryId: string) => void;
}

const CategoryFilter = ({ categories, selectedCategory, onCategorySelect }: CategoryFilterProps) => {
  return (
    <section className="mb-8">
      <div className="flex flex-wrap gap-3">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => onCategorySelect('all')}
          className={`${
            selectedCategory === 'all' 
              ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg' 
              : 'border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300'
          } font-medium px-6 py-2 rounded-full transition-all duration-300`}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => onCategorySelect(category.id)}
            className={`${
              selectedCategory === category.id 
                ? 'bg-gradient-to-r from-orange-500 to-red-500 hover:from-orange-600 hover:to-red-600 text-white shadow-lg' 
                : 'border-2 border-orange-200 hover:bg-orange-50 hover:border-orange-300'
            } font-medium px-6 py-2 rounded-full transition-all duration-300`}
          >
            <span className="mr-2">{category.icon}</span>
            {category.title}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
