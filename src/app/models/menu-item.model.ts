export interface MenuItem {
  name: string;
  description: string;
  price: number;
  singlePrice?: number;
  halfTrayPrice?: number;
  fullTrayPrice?: number;
  piecePrice?: number;
  priceDisplay?: string;
  isVegetarian?: boolean;
  isPopular?: boolean;
  isHalal?: boolean;
  tags?: string[];
}

export interface MenuCategory {
  name: string;
  icon: string;
  type: 'veg' | 'non-veg' | 'all';
  items: MenuItem[];
}

export interface MenuData {
  categories: MenuCategory[];
}

export interface TeamMember {
  name: string;
  role: string;
  bio: string;
  image?: string;
}

export interface Testimonial {
  name: string;
  rating: number;
  text: string;
  date: string;
}
