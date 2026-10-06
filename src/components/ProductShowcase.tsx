import React, { useState } from 'react';
import { ShoppingCart } from 'lucide-react';
import { products, type Product } from '../data/products';
import { useCartStore } from '../store/cartStore';

const ProductCard: React.FC<Product> = (product) => {
  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight);
  const { addItem } = useCartStore();

  const handleAddToCart = () => {
    addItem(product, selectedWeight);
  };

  return (
    <div className="group flex flex-col bg-white overflow-hidden border border-gray-200 transition-all duration-300 hover:border-obsidian/40">
      <div className="relative aspect-[4/5] overflow-hidden bg-[#f8f8f8] flex items-center justify-center">
        {product.isComingSoon ? (
          <span className="absolute top-4 left-4 bg-obsidian text-white text-[10px] font-bold px-3 py-1 z-10 uppercase tracking-[0.2em]">
            Coming Soon
          </span>
        ) : null}
        <img 
          src={product.image} 
          alt={product.name} 
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[1.5s] ease-out mix-blend-multiply"
        />
      </div>
      
      <div className="p-6 md:p-8 flex flex-col flex-grow">
        <div className="flex flex-col items-start mb-6">
          <h3 className="text-xl md:text-2xl font-bold font-primary text-obsidian leading-tight mb-2 uppercase tracking-tight">{product.name}</h3>
          <p className="text-xs text-obsidian/60 font-medium uppercase tracking-widest">{product.description}</p>
        </div>
        
        {!product.isComingSoon && (
          <div className="mb-6">
            <select 
              aria-label={`Choose weight for ${product.name}`}
              className="w-full border-b-2 border-gray-200 bg-transparent px-0 py-2 text-sm font-semibold text-obsidian outline-none focus:border-obsidian transition-colors uppercase tracking-widest cursor-pointer"
              value={selectedWeight}
              onChange={(e) => setSelectedWeight(e.target.value)}
            >
              {product.weightOptions.map((weight) => (
                <option key={weight} value={weight}>{weight}</option>
              ))}
            </select>
          </div>
        )}
        
        <div className="mt-auto flex items-center justify-between pt-2">
          {!product.isComingSoon ? (
            <>
              <div className="flex flex-col">
                <span className="text-2xl font-black text-obsidian tracking-tighter">₹{product.price}</span>
              </div>
              <button 
                onClick={handleAddToCart}
                className="bg-transparent border border-obsidian text-obsidian p-3 hover:bg-obsidian hover:text-white transition-colors flex items-center justify-center"
              >
                <ShoppingCart size={20} strokeWidth={1.5} />
                <span className="sr-only">Add {product.name} to cart</span>
              </button>
            </>
          ) : (
            <div className="w-full text-center py-2 text-xs font-bold text-gray-400 uppercase tracking-widest">
              Currently Unavailable
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const ProductShowcase = () => {
  return (
    <section id="shop" className="w-full py-24 bg-alabaster">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="flex flex-col md:flex-row justify-between items-end mb-12">
          <div className="max-w-2xl">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-meathub-red mb-2">Our Selection</div>
            <h2 className="text-4xl md:text-5xl font-primary font-black tracking-tighter text-obsidian mb-4">
              FRESH CUTS, YOUR WAY.
            </h2>
            <p className="text-lg text-gray-600 font-medium">
              Hand-picked, premium cuts favored by our customers across Hyderabad.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          {products.map((product) => (
            <ProductCard key={product.id} {...product} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ProductShowcase;
