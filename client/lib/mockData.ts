export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  image: string;
  stock: number;
  rating: number;
  description: string;
  retailerId: string;
  wholesalerId: string;
  location: string;
}

export interface Retailer {
  id: string;
  name: string;
  location: string;
  rating: number;
  distance: number;
}

export const categories = [
  "Groceries",
  "Fresh Produce",
  "Dairy & Eggs",
  "Meat & Fish",
  "Bakery",
  "Beverages",
  "Snacks",
  "Personal Care",
];

export const products: Product[] = [
  {
    id: "1",
    name: "Fresh Apples",
    category: "Fresh Produce",
    price: 45,
    image:
      "https://images.unsplash.com/photo-1560806887-1195c9046526?w=400&h=400&fit=crop",
    stock: 50,
    rating: 4.5,
    description: "Fresh red apples, locally sourced and organic",
    retailerId: "r1",
    wholesalerId: "w1",
    location: "Downtown Market",
  },
  {
    id: "2",
    name: "Whole Wheat Bread",
    category: "Bakery",
    price: 60,
    image:
      "https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=400&h=400&fit=crop",
    stock: 30,
    rating: 4.3,
    description: "Fresh whole wheat bread baked daily",
    retailerId: "r1",
    wholesalerId: "w1",
    location: "Downtown Market",
  },
  {
    id: "3",
    name: "Organic Carrots",
    category: "Fresh Produce",
    price: 35,
    image:
      "https://images.unsplash.com/photo-1599599810694-f3ee39c9cc6a?w=400&h=400&fit=crop",
    stock: 100,
    rating: 4.7,
    description: "Organic carrots rich in beta-carotene",
    retailerId: "r2",
    wholesalerId: "w1",
    location: "Central Market",
  },
  {
    id: "4",
    name: "Fresh Milk",
    category: "Dairy & Eggs",
    price: 55,
    image:
      "https://images.unsplash.com/photo-1550583724-b2692b25e150?w=400&h=400&fit=crop",
    stock: 45,
    rating: 4.6,
    description: "Fresh pasteurized whole milk",
    retailerId: "r2",
    wholesalerId: "w2",
    location: "Central Market",
  },
  {
    id: "5",
    name: "Brown Eggs",
    category: "Dairy & Eggs",
    price: 70,
    image:
      "https://images.unsplash.com/photo-1587017308227-c6f4f1d912d5?w=400&h=400&fit=crop",
    stock: 60,
    rating: 4.8,
    description: "Farm fresh brown eggs",
    retailerId: "r1",
    wholesalerId: "w2",
    location: "Downtown Market",
  },
  {
    id: "6",
    name: "Grapes Bundle",
    category: "Fresh Produce",
    price: 120,
    image:
      "https://images.unsplash.com/photo-1537182666827-8ad913e6d338?w=400&h=400&fit=crop",
    stock: 25,
    rating: 4.4,
    description: "Fresh purple grapes",
    retailerId: "r2",
    wholesalerId: "w1",
    location: "Central Market",
  },
  {
    id: "7",
    name: "Basmati Rice",
    category: "Groceries",
    price: 180,
    image:
      "https://images.unsplash.com/photo-1586080876207-e7201a7e9e0e?w=400&h=400&fit=crop",
    stock: 150,
    rating: 4.5,
    description: "Premium basmati rice 1kg",
    retailerId: "r3",
    wholesalerId: "w2",
    location: "South Market",
  },
  {
    id: "8",
    name: "Tomatoes (1kg)",
    category: "Fresh Produce",
    price: 40,
    image:
      "https://images.unsplash.com/photo-1592841519622-a8faf69e5e8a?w=400&h=400&fit=crop",
    stock: 80,
    rating: 4.3,
    description: "Fresh ripe tomatoes",
    retailerId: "r1",
    wholesalerId: "w1",
    location: "Downtown Market",
  },
  {
    id: "9",
    name: "Olive Oil",
    category: "Groceries",
    price: 350,
    image:
      "https://images.unsplash.com/photo-1474014905666-d122b08fb4ba?w=400&h=400&fit=crop",
    stock: 20,
    rating: 4.7,
    description: "Extra virgin olive oil 500ml",
    retailerId: "r3",
    wholesalerId: "w2",
    location: "South Market",
  },
  {
    id: "10",
    name: "Greek Yogurt",
    category: "Dairy & Eggs",
    price: 95,
    image:
      "https://images.unsplash.com/photo-1488257749514-1fbc92d37c78?w=400&h=400&fit=crop",
    stock: 35,
    rating: 4.6,
    description: "Creamy Greek yogurt 500g",
    retailerId: "r2",
    wholesalerId: "w2",
    location: "Central Market",
  },
  {
    id: "11",
    name: "Almonds",
    category: "Snacks",
    price: 280,
    image:
      "https://images.unsplash.com/photo-1585707676036-6b51c94a4a3e?w=400&h=400&fit=crop",
    stock: 40,
    rating: 4.8,
    description: "Roasted almonds 250g",
    retailerId: "r3",
    wholesalerId: "w1",
    location: "South Market",
  },
  {
    id: "12",
    name: "Orange Juice",
    category: "Beverages",
    price: 85,
    image:
      "https://images.unsplash.com/photo-1600271886742-f049cd451bba?w=400&h=400&fit=crop",
    stock: 55,
    rating: 4.4,
    description: "Fresh orange juice 1L",
    retailerId: "r1",
    wholesalerId: "w1",
    location: "Downtown Market",
  },
];

export const retailers: Retailer[] = [
  {
    id: "r1",
    name: "Downtown Mart",
    location: "Downtown Market",
    rating: 4.5,
    distance: 0.5,
  },
  {
    id: "r2",
    name: "Central Store",
    location: "Central Market",
    rating: 4.6,
    distance: 1.2,
  },
  {
    id: "r3",
    name: "South Bazaar",
    location: "South Market",
    rating: 4.4,
    distance: 2.1,
  },
];

export const wholesalers = [
  { id: "w1", name: "Fresh Wholesale Co." },
  { id: "w2", name: "Premium Distributors" },
];
