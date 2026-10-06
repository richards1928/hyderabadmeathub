import { useState } from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { products } from '../data/products';

// Premium category placeholders (clearly replaceable visual assets)
const categoryImages: Record<string, string> = {
  'CHICKEN': 'https://images.unsplash.com/photo-1587593810167-a84920ea0781?q=80&w=2670&auto=format&fit=crop',
  'EGGS': 'https://images.unsplash.com/photo-1587486913049-53fc88980cfc?q=80&w=2000&auto=format&fit=crop',
  'MUTTON': '/images/category_mutton.jpg',
  'FISH': '/images/category_fish.jpg'
};

const CategorySelector = () => {
  // Extract unique categories directly from products data
  const uniqueCategories = Array.from(new Set(products.map(p => p.category)));
  
  // Find a representative image and description for each category
  const categories = uniqueCategories.map(categoryName => {
    return {
      id: categoryName.toLowerCase().replace(/\s+/g, '-'),
      name: categoryName,
      image: categoryImages[categoryName.toUpperCase()] || 'https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=2670&auto=format&fit=crop',
      description: `Explore our premium selection of ${categoryName.toLowerCase()} products.`
    };
  });

  const [activeCategory, setActiveCategory] = useState(categories[0]);

  return (
    <section className="relative w-full min-h-screen bg-alabaster flex flex-col md:flex-row overflow-hidden border-b border-gray-200">
      {/* Visual Side */}
      <div className="w-full md:w-1/2 h-[50vh] md:h-screen relative overflow-hidden bg-obsidian">
        {categories.map((category) => (
          <div
            key={category.id}
            className={twMerge(
              clsx(
                "absolute inset-0 transition-opacity duration-1000 ease-in-out",
                activeCategory.id === category.id ? "opacity-100 z-10" : "opacity-0 z-0"
              )
            )}
          >
            <img 
              src={category.image} 
              alt={category.name} 
              className="w-full h-full object-cover transform scale-105 transition-transform duration-[10s] hover:scale-100 opacity-90"
            />
            {/* Subtle Gradient for text readability on mobile */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian/60 to-transparent md:hidden"></div>
          </div>
        ))}
      </div>

      {/* Typography / Selector Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 md:p-16 lg:p-24 bg-alabaster z-20">
        <div className="w-full max-w-lg space-y-4 md:space-y-8">
          <h3 className="text-sm font-semibold tracking-widest text-obsidian/50 mb-8 uppercase">Explore Categories</h3>
          
          <div className="flex flex-col space-y-4 md:space-y-6">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setActiveCategory(category)}
                onMouseEnter={() => setActiveCategory(category)}
                className="group flex flex-col items-start text-left focus:outline-none"
              >
                <h2 className={twMerge(
                  clsx(
                    "text-4xl md:text-5xl lg:text-7xl font-primary font-black tracking-tighter transition-colors duration-500 uppercase",
                    activeCategory.id === category.id ? "text-meathub-red" : "text-obsidian hover:text-obsidian/70"
                  )
                )}>
                  {category.name}
                </h2>
                
                <div className={twMerge(
                  clsx(
                    "overflow-hidden transition-all duration-500 ease-in-out",
                    activeCategory.id === category.id ? "max-h-20 opacity-100 mt-2" : "max-h-0 opacity-0 mt-0"
                  )
                )}>
                  <p className="text-obsidian/80 font-medium text-lg">
                    {category.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
          
          <div className="pt-8">
            <a href="/#shop" className="inline-flex items-center space-x-2 text-sm font-bold tracking-widest uppercase hover:text-meathub-red transition-colors border-b-2 border-obsidian hover:border-meathub-red pb-1">
              <span>View Full Menu</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CategorySelector;
