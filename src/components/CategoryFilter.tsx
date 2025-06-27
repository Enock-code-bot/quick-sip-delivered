
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
      <div className="flex flex-wrap gap-2">
        <Button
          variant={selectedCategory === 'all' ? 'default' : 'outline'}
          onClick={() => onCategorySelect('all')}
          className={selectedCategory === 'all' ? 'bg-red-600 hover:bg-red-700' : ''}
        >
          All Categories
        </Button>
        {categories.map((category) => (
          <Button
            key={category.id}
            variant={selectedCategory === category.id ? 'default' : 'outline'}
            onClick={() => onCategorySelect(category.id)}
            className={selectedCategory === category.id ? 'bg-red-600 hover:bg-red-700' : ''}
          >
            {category.icon} {category.title}
          </Button>
        ))}
      </div>
    </section>
  );
};

export default CategoryFilter;
