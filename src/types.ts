export type ProductCategory = 'ramen' | 'sides' | 'chilli-oil' | 'sauces' | 'accessories' | 'bundles';

export interface Product {
  id: string;
  name: string;
  japaneseName?: string;
  category: ProductCategory;
  description: string;
  price: number;
  originalPrice?: number;
  spiceLevel: 0 | 1 | 2 | 3 | 4; // 0: None, 1: Mild, 2: Medium, 3: Hot, 4: Fire
  image: string;
  tags: string[];
  isVegetarian?: boolean;
  isPopular?: boolean;
  isNew?: boolean;
  brothType?: string;
  allergens?: string[];
  calories?: number;
}

export interface BrothOption {
  id: string;
  name: string;
  icon: string;
  description: string;
  basePrice: number;
  color: string;
}

export interface NoodleOption {
  id: string;
  name: string;
  description: string;
  texture: string;
}

export interface ToppingOption {
  id: string;
  name: string;
  icon: string;
  price: number;
  category: 'protein' | 'veggie' | 'crunch';
}

export interface ExtraOption {
  id: string;
  name: string;
  icon: string;
  price: number;
}

export interface CustomBowl {
  id: string;
  broth: BrothOption;
  noodles: NoodleOption;
  toppings: ToppingOption[];
  spiceLevel: 'MILD' | 'MEDIUM' | 'HOT' | 'FIRE';
  extras: ExtraOption[];
  totalPrice: number;
  bowlName?: string;
}

export interface CartItem {
  cartItemId: string;
  product?: Product;
  customBowl?: CustomBowl;
  quantity: number;
  specialInstructions?: string;
}

export interface CampusEvent {
  id: string;
  collegeName: string;
  city: string;
  eventName: string;
  date: string;
  status: 'Upcoming' | 'Happening Today' | 'Completed';
  venue: string;
  expectedTurnout: string;
  badgeColor: string;
}

export interface CampusChallenge {
  id: string;
  collegeName: string;
  campusName: string;
  votes: number;
  slurpsLogged: number;
  rank: number;
}

export interface StudentDeal {
  id: string;
  title: string;
  code: string;
  discount: string;
  description: string;
  requirement: string;
  badge: string;
}

export interface SocialPost {
  id: string;
  username: string;
  userHandle: string;
  avatar: string;
  image: string;
  caption: string;
  likes: number;
  college?: string;
  tag: string;
}
