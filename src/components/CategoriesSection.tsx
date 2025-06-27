
import React from 'react';
import CategoryCard from '@/components/CategoryCard';

interface Category {
  id: string;
  title: string;
  icon: string;
  description: string;
}

interface CategoriesSectionProps {
  categories: Category[];
  onCategorySelect: (categoryId: string) => void;
}

const CategoriesSection = ({ categories, onCategorySelect }: CategoriesSectionProps) => {
  return (
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
            onClick={() => onCategorySelect(category.id)}
          />
        ))}
      </div>
    </section>
  );
};

export default CategoriesSection;
