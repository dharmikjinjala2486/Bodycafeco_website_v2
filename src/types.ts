export interface ProductVariant {
  id: string;
  name: string; // e.g. "30 Servings", "60 Servings", "Single Bottle", "3-Pack"
  price: number;
  subscriptionPrice: number;
  isDefault?: boolean;
}

export interface ProductIngredient {
  name: string;
  amount: string;
  dailyValue?: string;
  purpose: string; // e.g. "Cognitive Function", "Cellular Energy"
  description: string; // Science detail
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  tagline: string;
  subtitle: string;
  price: number; // default price
  subscriptionPrice: number; // default subscription price
  accentColor: string; // tailwind brand color key e.g. "creatine"
  accentHex: string; // actual hex code e.g. "#005F73"
  pantone: string; // e.g. "Pantone 7708C"
  description: string;
  benefits: string[];
  ingredients: ProductIngredient[];
  sourcingStory: string;
  rating: number;
  reviewsCount: number;
  usageInstructions: string;
  category: 'daily' | 'cognitive' | 'essential';
  categoryLabel: string;
  variants: ProductVariant[];
  images: string[];
  highlights: { label: string; value: string }[];
}

export interface CartItem {
  product: Product;
  variant: ProductVariant;
  quantity: number;
  purchaseType: 'one-time' | 'subscription';
}

export interface Review {
  id: string;
  productId?: string;
  productName?: string;
  author: string;
  rating: number;
  title: string;
  content: string;
  date: string;
  verified: boolean;
}

export interface FAQ {
  id: string;
  question: string;
  answer: string;
  category: 'general' | 'science' | 'shipping';
}

export interface Article {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  category: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  featured?: boolean;
}
