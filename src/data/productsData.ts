
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

export const products: Product[] = [
  {
    id: '1',
    name: 'Cabernet Sauvignon Reserve',
    price: 45.99,
    alcoholPercent: 13.5,
    brand: 'Napa Valley Winery',
    category: 'wine',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '2', 
    name: 'Premium Whiskey',
    price: 89.99,
    alcoholPercent: 40,
    brand: 'Highland Distillery',
    category: 'liquor',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '3',
    name: 'Craft IPA',
    price: 12.99,
    alcoholPercent: 6.2,
    brand: 'Local Brewery',
    category: 'beer',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '4',
    name: 'Sparkling Water',
    price: 3.99,
    brand: 'Pure Springs',
    category: 'soft-drinks',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '5',
    name: 'Pinot Grigio',
    price: 28.99,
    alcoholPercent: 12,
    brand: 'Italian Vineyards',
    category: 'wine',
    imageUrl: '/placeholder.svg'
  },
  {
    id: '6',
    name: 'Premium Vodka',
    price: 65.99,
    alcoholPercent: 40,
    brand: 'Crystal Clear',
    category: 'liquor',
    imageUrl: '/placeholder.svg'
  }
];

export const categories: Category[] = [
  { id: 'wine', title: 'Wine', icon: '🍷', description: 'Red, White & Rosé' },
  { id: 'liquor', title: 'Liquor', icon: '🥃', description: 'Whiskey, Vodka & More' },
  { id: 'beer', title: 'Beer', icon: '🍺', description: 'Craft & Premium' },
  { id: 'soft-drinks', title: 'Soft Drinks', icon: '🥤', description: 'Refreshing Beverages' }
];
