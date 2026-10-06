export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  weightOptions: string[];
  defaultWeight: string;
  description: string;
  image: string;
  isComingSoon?: boolean;
}

export const products: Product[] = [
  {
    id: 'chicken-curry-cut',
    name: 'Chicken Curry Cut',
    category: 'CHICKEN',
    price: 125,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Skinless · curry-ready',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 'chicken-leg-pieces',
    name: 'Chicken Leg Pieces',
    category: 'CHICKEN',
    price: 135,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Juicy cuts · 4 pieces',
    image: '/images/product_leg_pieces.jpg'
  },
  {
    id: 'chicken-wings',
    name: 'Chicken Wings',
    category: 'CHICKEN',
    price: 125,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Party pack · 8 pieces',
    image: 'https://images.unsplash.com/photo-1608039755401-742074f0548d?q=80&w=2670&auto=format&fit=crop'
  },
  {
    id: 'chicken-breast',
    name: 'Chicken Breast',
    category: 'CHICKEN',
    price: 120,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Lean & tender · boneless',
    image: 'https://images.unsplash.com/photo-1606502973842-f64bc2785fe5?q=80&w=2564&auto=format&fit=crop'
  },
  {
    id: 'farm-eggs',
    name: 'Farm Eggs',
    category: 'EGGS',
    price: 72,
    weightOptions: ['6 eggs'],
    defaultWeight: '6 eggs',
    description: 'Country fresh · 6 eggs',
    image: 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=2000&auto=format&fit=crop'
  },
  {
    id: 'chicken-biryani-cut',
    name: 'Chicken Biryani Cut',
    category: 'CHICKEN',
    price: 125,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Royal cuts · curry ready',
    image: '/images/product_biryani_cut.jpg'
  },
  {
    id: 'chicken-boneless',
    name: 'Chicken Boneless',
    category: 'CHICKEN',
    price: 125,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Premium · no bones',
    image: 'https://images.unsplash.com/photo-1610057099443-fde8c4d50f91?q=80&w=2574&auto=format&fit=crop'
  },
  {
    id: 'chicken-thigh-pieces',
    name: 'Chicken Thigh Pieces',
    category: 'CHICKEN',
    price: 125,
    weightOptions: ['500g', '750g', '1kg', '1.5kg', '2kg', 'Bulk'],
    defaultWeight: '500g',
    description: 'Tender · juicy dark meat',
    image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=2574&auto=format&fit=crop'
  },
  // Coming Soon Items
  {
    id: 'chicken-drumsticks',
    name: 'Chicken Drumsticks',
    category: 'CHICKEN',
    price: 0,
    weightOptions: [],
    defaultWeight: '',
    description: 'Launching soon in Hyderabad',
    image: '/images/product_drumsticks.jpg',
    isComingSoon: true
  },
  {
    id: 'chicken-mince',
    name: 'Chicken Mince',
    category: 'CHICKEN',
    price: 0,
    weightOptions: [],
    defaultWeight: '',
    description: 'Launching soon in Hyderabad',
    image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop',
    isComingSoon: true
  },
  {
    id: 'chicken-tikka-cut',
    name: 'Chicken Tikka Cut',
    category: 'CHICKEN',
    price: 0,
    weightOptions: [],
    defaultWeight: '',
    description: 'Launching soon in Hyderabad',
    image: '/images/product_tikka_cut.jpg',
    isComingSoon: true
  },
  {
    id: 'whole-chicken',
    name: 'Whole Chicken',
    category: 'CHICKEN',
    price: 0,
    weightOptions: [],
    defaultWeight: '',
    description: 'Launching soon in Hyderabad',
    image: 'https://images.unsplash.com/photo-1598514982205-f36b96d1e8d4?q=80&w=2670&auto=format&fit=crop',
    isComingSoon: true
  },
  {
    id: 'mutton-cuts',
    name: 'Mutton Cuts',
    category: 'MUTTON',
    price: 0,
    weightOptions: [],
    defaultWeight: '',
    description: 'Launching soon in Hyderabad',
    image: '/images/product_mutton_cuts.jpg',
    isComingSoon: true
  },
  {
    id: 'fresh-fish',
    name: 'Fresh Fish',
    category: 'FISH',
    price: 0,
    weightOptions: [],
    defaultWeight: '',
    description: 'Launching soon in Hyderabad',
    image: 'https://images.unsplash.com/photo-1615141982883-c7ad0e69fd62?q=80&w=2574&auto=format&fit=crop',
    isComingSoon: true
  }
];
