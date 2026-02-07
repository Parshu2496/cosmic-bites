import pizzaImg from "@/assets/pizza.jpg";
import burgerImg from "@/assets/burger.jpg";
import saladImg from "@/assets/salad.jpg";
import dessertImg from "@/assets/dessert.jpg";
import sushiImg from "@/assets/sushi.jpg";
import curryImg from "@/assets/curry.jpg";
import pastaImg from "@/assets/pasta.jpg";
import restaurant1Img from "@/assets/restaurant1.jpg";
import restaurant2Img from "@/assets/restaurant2.jpg";
import restaurant3Img from "@/assets/restaurant3.jpg";

export interface Category {
  id: string;
  name: string;
  emoji: string;
}

export interface Restaurant {
  id: string;
  name: string;
  image: string;
  rating: number;
  cuisine: string;
  deliveryTime: string;
  deliveryFee: string;
  featured?: boolean;
}

export interface MenuItem {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  category: string;
  veg?: boolean;
}

export interface CartItemData {
  item: MenuItem;
  quantity: number;
}

export interface Order {
  id: string;
  restaurant: string;
  items: string[];
  total: number;
  status: "delivered" | "in-progress" | "cancelled";
  date: string;
}

export const categories: Category[] = [
  { id: "pizza", name: "Pizza", emoji: "🍕" },
  { id: "burger", name: "Burgers", emoji: "🍔" },
  { id: "sushi", name: "Sushi", emoji: "🍣" },
  { id: "salad", name: "Salads", emoji: "🥗" },
  { id: "dessert", name: "Desserts", emoji: "🍰" },
  { id: "curry", name: "Curry", emoji: "🍛" },
  { id: "pasta", name: "Pasta", emoji: "🍝" },
];

export const restaurants: Restaurant[] = [
  {
    id: "1",
    name: "The Burger Joint",
    image: restaurant1Img,
    rating: 4.5,
    cuisine: "American · Burgers",
    deliveryTime: "25-35 min",
    deliveryFee: "Free",
    featured: true,
  },
  {
    id: "2",
    name: "Bella Italia",
    image: restaurant2Img,
    rating: 4.8,
    cuisine: "Italian · Pizza · Pasta",
    deliveryTime: "30-40 min",
    deliveryFee: "$2.99",
  },
  {
    id: "3",
    name: "Tokyo Express",
    image: restaurant3Img,
    rating: 4.3,
    cuisine: "Japanese · Sushi",
    deliveryTime: "20-30 min",
    deliveryFee: "Free",
    featured: true,
  },
  {
    id: "4",
    name: "Green Bowl",
    image: saladImg,
    rating: 4.6,
    cuisine: "Healthy · Salads · Bowls",
    deliveryTime: "15-25 min",
    deliveryFee: "$1.99",
  },
  {
    id: "5",
    name: "Spice Route",
    image: curryImg,
    rating: 4.7,
    cuisine: "Indian · Curry",
    deliveryTime: "30-45 min",
    deliveryFee: "Free",
  },
  {
    id: "6",
    name: "Sweet Surrender",
    image: dessertImg,
    rating: 4.4,
    cuisine: "Desserts · Bakery",
    deliveryTime: "20-30 min",
    deliveryFee: "$2.49",
  },
];

export const menuItems: Record<string, MenuItem[]> = {
  "1": [
    { id: "m1", name: "Classic Smash Burger", description: "Double patty, cheddar, pickles, secret sauce", price: 12.99, image: burgerImg, category: "Burgers" },
    { id: "m2", name: "Bacon BBQ Burger", description: "Crispy bacon, BBQ glaze, onion rings", price: 14.99, image: burgerImg, category: "Burgers" },
    { id: "m3", name: "Truffle Fries", description: "Hand-cut fries, truffle oil, parmesan", price: 7.99, image: saladImg, category: "Sides" },
    { id: "m4", name: "Caesar Salad", description: "Romaine, croutons, parmesan, caesar dressing", price: 9.99, image: saladImg, category: "Salads", veg: true },
    { id: "m5", name: "Chocolate Shake", description: "Rich chocolate milkshake with whipped cream", price: 6.99, image: dessertImg, category: "Drinks" },
    { id: "m6", name: "Mushroom Swiss Burger", description: "Sautéed mushrooms, swiss cheese, herb aioli", price: 13.99, image: burgerImg, category: "Burgers", veg: true },
  ],
  "2": [
    { id: "m7", name: "Margherita Pizza", description: "San Marzano tomatoes, fresh mozzarella, basil", price: 15.99, image: pizzaImg, category: "Pizza", veg: true },
    { id: "m8", name: "Pepperoni Pizza", description: "Classic pepperoni, mozzarella, tomato sauce", price: 17.99, image: pizzaImg, category: "Pizza" },
    { id: "m9", name: "Pesto Pasta", description: "Fresh basil pesto, pine nuts, parmesan", price: 13.99, image: pastaImg, category: "Pasta", veg: true },
    { id: "m10", name: "Tiramisu", description: "Classic Italian coffee-flavored dessert", price: 8.99, image: dessertImg, category: "Desserts" },
  ],
  "3": [
    { id: "m11", name: "Salmon Nigiri", description: "Fresh Atlantic salmon, seasoned rice", price: 12.99, image: sushiImg, category: "Sushi" },
    { id: "m12", name: "Dragon Roll", description: "Eel, avocado, cucumber, spicy mayo", price: 16.99, image: sushiImg, category: "Sushi" },
    { id: "m13", name: "Miso Soup", description: "Traditional miso with tofu and seaweed", price: 4.99, image: saladImg, category: "Soups", veg: true },
    { id: "m14", name: "Edamame", description: "Steamed soybeans with sea salt", price: 5.99, image: saladImg, category: "Sides", veg: true },
  ],
};

// Default menu for restaurants without specific menus
export const defaultMenu: MenuItem[] = [
  { id: "d1", name: "Signature Dish", description: "Chef's special creation of the day", price: 16.99, image: curryImg, category: "Mains" },
  { id: "d2", name: "House Salad", description: "Fresh seasonal greens with vinaigrette", price: 8.99, image: saladImg, category: "Starters", veg: true },
  { id: "d3", name: "Dessert of the Day", description: "Ask your server for today's selection", price: 9.99, image: dessertImg, category: "Desserts" },
];

export const pastOrders: Order[] = [
  { id: "ORD-001", restaurant: "The Burger Joint", items: ["Classic Smash Burger", "Truffle Fries"], total: 20.98, status: "delivered", date: "Feb 5, 2026" },
  { id: "ORD-002", restaurant: "Bella Italia", items: ["Margherita Pizza", "Tiramisu"], total: 24.98, status: "delivered", date: "Feb 3, 2026" },
  { id: "ORD-003", restaurant: "Tokyo Express", items: ["Dragon Roll", "Miso Soup"], total: 21.98, status: "in-progress", date: "Feb 7, 2026" },
  { id: "ORD-004", restaurant: "Green Bowl", items: ["House Salad"], total: 8.99, status: "cancelled", date: "Jan 28, 2026" },
];
