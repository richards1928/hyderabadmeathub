import { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { useCartStore } from '../store/cartStore';
import { products, type Product } from '../data/products';
import { businessInfo } from '../data/business';
import { X, Minus, Plus, ShoppingCart } from 'lucide-react';
import { Link } from 'react-router-dom';

const BuildYourOrder = () => {
  const categories = Array.from(new Set(products.map(p => p.category)));
  const [activeCategory, setActiveCategory] = useState(categories[0]);
  const { items, addItem, removeItem, updateQuantity, getCartTotal, getItemCount } = useCartStore();
  const [isMobileSummaryOpen, setIsMobileSummaryOpen] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Entrance animation
  useEffect(() => {
    window.scrollTo(0, 0);
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && containerRef.current) {
      gsap.fromTo(
        containerRef.current.querySelectorAll('.stagger-enter'),
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 0.8, stagger: 0.1, ease: 'power3.out' }
      );
    }
  }, []);

  const handleCheckout = () => {
    if (items.length === 0) return;
    let message = businessInfo.whatsappMessages.order + "\n\n";
    items.forEach(item => {
      message += `${item.name} (${item.weight}) × ${item.quantity} = ₹${item.price * item.quantity}\n`;
    });
    message += `\n*Total: ₹${getCartTotal()}*`;
    
    window.open(`${businessInfo.whatsappBaseUrl}?text=${encodeURIComponent(message)}`, '_blank');
  };

  const activeProducts = products.filter(p => p.category === activeCategory);

  return (
    <div ref={containerRef} className="min-h-screen bg-alabaster flex flex-col md:flex-row overflow-hidden relative">
      {/* Navigation (Back to home) */}
      <div className="absolute top-0 left-0 w-full p-6 flex justify-between items-center z-50 pointer-events-none">
        <Link to="/" className="pointer-events-auto text-xl font-primary font-black tracking-tighter text-obsidian hover:text-meathub-red transition-colors">
          {businessInfo.name.split(' ')[0]}
          <span className="text-meathub-red uppercase">{businessInfo.name.split(' ').slice(1).join(' ')}</span>
        </Link>
        <Link to="/" className="pointer-events-auto flex items-center justify-center w-10 h-10 rounded-full bg-obsidian text-alabaster hover:bg-meathub-red transition-colors">
          <X size={20} />
        </Link>
      </div>

      {/* LEFT: Builder Area */}
      <div className="flex-1 h-screen overflow-y-auto pb-32 md:pb-0 scrollbar-hide pt-24 px-6 md:px-12 lg:px-20">
        
        <div className="stagger-enter max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-primary font-black text-obsidian tracking-tighter mb-4 leading-none">
            BUILD <br className="hidden md:block"/>
            YOUR ORDER.
          </h1>
          <p className="text-obsidian/60 font-medium tracking-wide text-sm md:text-base uppercase mb-16">
            Pick what you need. We'll handle the rest.
          </p>

          {/* Categories */}
          <div className="flex flex-wrap gap-6 mb-16 border-b border-gray-200 pb-6">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`text-xl md:text-3xl font-primary font-black tracking-tighter uppercase transition-colors duration-300 ${
                  activeCategory === cat ? 'text-meathub-red' : 'text-obsidian/30 hover:text-obsidian/60'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Products List */}
          <div className="space-y-24 pb-24">
            {activeProducts.map((product) => (
              <ProductEditor key={product.id} product={product} onAdd={addItem} />
            ))}
          </div>
        </div>
      </div>

      {/* RIGHT: Desktop Order Summary */}
      <div className="hidden md:flex w-[400px] lg:w-[480px] bg-obsidian text-alabaster flex-col h-screen border-l border-gray-800 relative z-20 shadow-2xl">
        <OrderSummary 
          items={items}
          total={getCartTotal()}
          onCheckout={handleCheckout}
          updateQuantity={updateQuantity}
          removeItem={removeItem}
        />
      </div>

      {/* MOBILE: Sticky Bottom Bar */}
      <div className="md:hidden fixed bottom-0 left-0 w-full z-40">
        <div 
          className="bg-obsidian text-alabaster px-6 py-4 flex justify-between items-center cursor-pointer shadow-[0_-10px_40px_rgba(0,0,0,0.2)]"
          onClick={() => setIsMobileSummaryOpen(true)}
        >
          <div className="font-bold tracking-widest text-sm uppercase">
            Your Order <span className="text-meathub-red mx-2">•</span> {getItemCount()} Items
          </div>
          <div className="font-primary font-black text-xl">
            ₹{getCartTotal()}
          </div>
        </div>

        {/* Mobile Expandable Sheet */}
        <div className={`fixed inset-0 bg-obsidian text-alabaster z-50 flex flex-col transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileSummaryOpen ? 'translate-y-0' : 'translate-y-full'
        }`}>
          <div className="flex justify-between items-center p-6 border-b border-gray-800">
            <h2 className="font-primary font-black text-2xl tracking-tighter">YOUR ORDER</h2>
            <button onClick={() => setIsMobileSummaryOpen(false)} className="p-2 hover:text-meathub-red transition-colors">
              <X size={24} />
            </button>
          </div>
          <OrderSummary 
            items={items}
            total={getCartTotal()}
            onCheckout={handleCheckout}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            isMobile
            closeSheet={() => setIsMobileSummaryOpen(false)}
          />
        </div>
      </div>

    </div>
  );
};

// ==========================================
// SUBCOMPONENTS
// ==========================================

const ProductEditor = ({ product, onAdd }: { product: Product, onAdd: any }) => {
  const [selectedWeight, setSelectedWeight] = useState(product.defaultWeight || (product.weightOptions?.[0] ?? ''));
  const [quantity, setQuantity] = useState(1);
  const imageRef = useRef<HTMLImageElement>(null);
  
  const handleAdd = () => {
    if (product.isComingSoon) return;
    
    // Animate image traveling to the order summary
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!prefersReducedMotion && imageRef.current) {
      const clone = imageRef.current.cloneNode(true) as HTMLImageElement;
      const rect = imageRef.current.getBoundingClientRect();
      
      clone.style.position = 'fixed';
      clone.style.top = `${rect.top}px`;
      clone.style.left = `${rect.left}px`;
      clone.style.width = `${rect.width}px`;
      clone.style.height = `${rect.height}px`;
      clone.style.zIndex = '9999';
      clone.style.borderRadius = '0px';
      clone.style.objectFit = 'cover';
      document.body.appendChild(clone);
      
      // Calculate destination (rough estimate towards the right/bottom)
      const isMobile = window.innerWidth < 768;
      const destX = isMobile ? window.innerWidth / 2 : window.innerWidth - 200;
      const destY = isMobile ? window.innerHeight - 50 : window.innerHeight / 2;
      
      gsap.to(clone, {
        x: destX - rect.left - rect.width/2,
        y: destY - rect.top - rect.height/2,
        scale: 0.1,
        opacity: 0,
        duration: 0.6,
        ease: 'power3.in',
        onComplete: () => {
          clone.remove();
        }
      });
    }

    // Add to cart store multiple times if quantity > 1, or just let store handle it
    // Store addItem only adds 1 at a time if it's new, but we can do a loop or just add
    for(let i=0; i<quantity; i++) {
      onAdd(product, selectedWeight);
    }
    
    // Reset quantity
    setQuantity(1);
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8 lg:gap-12 group stagger-enter">
      <div className="w-full lg:w-1/2 relative overflow-hidden bg-gray-100 aspect-[4/3] lg:aspect-[3/4]">
        <img 
          ref={imageRef}
          src={product.image} 
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
        />
        {product.isComingSoon && (
          <div className="absolute inset-0 bg-obsidian/60 flex items-center justify-center backdrop-blur-sm">
            <span className="bg-meathub-red text-white px-6 py-3 font-bold tracking-widest text-xs uppercase">
              Coming Soon
            </span>
          </div>
        )}
      </div>
      
      <div className="w-full lg:w-1/2 flex flex-col justify-center">
        <h2 className="text-3xl md:text-5xl font-primary font-black tracking-tighter text-obsidian mb-2 uppercase">
          {product.name}
        </h2>
        <p className="text-obsidian/60 font-medium tracking-wide mb-8">
          {product.description}
        </p>

        {!product.isComingSoon ? (
          <>
            <div className="mb-8">
              <div className="text-xs font-bold uppercase tracking-widest text-obsidian/40 mb-4">Select Weight</div>
              <div className="flex flex-wrap gap-3">
                {product.weightOptions.map((w) => (
                  <button
                    key={w}
                    onClick={() => setSelectedWeight(w)}
                    className={`px-6 py-3 text-sm font-bold tracking-wider uppercase transition-all border-2 ${
                      selectedWeight === w 
                        ? 'border-obsidian bg-obsidian text-alabaster' 
                        : 'border-gray-200 text-obsidian hover:border-obsidian'
                    }`}
                  >
                    {w}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex items-center gap-8 mb-10">
              <div className="flex items-center gap-4 border-2 border-gray-200 p-2">
                <button 
                  onClick={() => setQuantity(Math.max(1, quantity - 1))}
                  className="p-2 text-obsidian hover:bg-gray-100 transition-colors"
                >
                  <Minus size={16} />
                </button>
                <span className="w-8 text-center font-bold text-lg">{quantity}</span>
                <button 
                  onClick={() => setQuantity(quantity + 1)}
                  className="p-2 text-obsidian hover:bg-gray-100 transition-colors"
                >
                  <Plus size={16} />
                </button>
              </div>
              <div className="text-3xl font-primary font-black tracking-tighter text-meathub-red">
                ₹{product.price * quantity}
              </div>
            </div>

            <button 
              onClick={handleAdd}
              className="w-full sm:w-auto bg-meathub-red text-white px-10 py-5 font-bold tracking-[0.2em] text-sm uppercase transition-all shadow-[0_0_30px_rgba(197,42,42,0.2)] hover:shadow-[0_0_50px_rgba(197,42,42,0.4)] hover:bg-[#b02525]"
            >
              Add To Order
            </button>
          </>
        ) : (
          <div className="text-obsidian/40 font-bold tracking-widest uppercase mt-4">
            Currently Unavailable
          </div>
        )}
      </div>
    </div>
  );
};

const OrderSummary = ({ items, total, onCheckout, updateQuantity, removeItem, isMobile, closeSheet }: any) => {
  if (items.length === 0) {
    return (
      <div className="flex flex-col h-full p-8 md:p-12">
        {!isMobile && <h2 className="font-primary font-black text-3xl tracking-tighter mb-12">YOUR ORDER</h2>}
        <div className="flex-1 flex flex-col items-center justify-center text-center opacity-50">
          <ShoppingCart size={48} className="mb-6 opacity-20" />
          <p className="font-bold tracking-widest uppercase mb-4 text-sm">Your order is empty</p>
          <p className="text-sm max-w-[200px] mb-8">Start building your order from the left.</p>
          {isMobile && closeSheet && (
            <button 
              onClick={closeSheet}
              className="border border-white/20 px-8 py-4 font-bold tracking-widest text-xs uppercase hover:bg-white hover:text-obsidian transition-colors"
            >
              Explore Products →
            </button>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col h-full">
      {!isMobile && (
        <div className="p-8 md:p-12 pb-6 border-b border-gray-800 shrink-0">
          <h2 className="font-primary font-black text-3xl tracking-tighter">YOUR ORDER</h2>
        </div>
      )}
      
      <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6 scrollbar-hide">
        {items.map((item: any) => (
          <div key={item.id} className="flex gap-4">
            <img src={item.image} alt={item.name} className="w-20 h-20 object-cover bg-gray-900" />
            <div className="flex-1 flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-1">
                  <h3 className="font-bold uppercase tracking-wider text-sm leading-tight pr-4">{item.name}</h3>
                  <button onClick={() => removeItem(item.id)} className="text-gray-500 hover:text-meathub-red">
                    <X size={16} />
                  </button>
                </div>
                <div className="text-xs text-gray-400 font-medium tracking-wider">{item.weight}</div>
              </div>
              
              <div className="flex justify-between items-end mt-4">
                <div className="flex items-center gap-3 bg-gray-900/50 p-1">
                  <button onClick={() => updateQuantity(item.id, item.quantity - 1)} className="p-1 text-gray-400 hover:text-white">
                    <Minus size={12} />
                  </button>
                  <span className="text-xs font-bold w-4 text-center">{item.quantity}</span>
                  <button onClick={() => updateQuantity(item.id, item.quantity + 1)} className="p-1 text-gray-400 hover:text-white">
                    <Plus size={12} />
                  </button>
                </div>
                <div className="font-primary font-black tracking-tighter text-lg">
                  ₹{item.price * item.quantity}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="p-6 md:p-8 bg-black shrink-0 border-t border-gray-800">
        <div className="flex justify-between items-end mb-8">
          <span className="text-xs font-bold tracking-widest uppercase text-gray-400">Total</span>
          <span className="font-primary font-black text-4xl tracking-tighter text-white">₹{total}</span>
        </div>
        
        <button 
          onClick={onCheckout}
          className="w-full bg-meathub-red text-white py-5 font-bold tracking-[0.2em] text-sm uppercase transition-all shadow-[0_0_30px_rgba(197,42,42,0.2)] hover:shadow-[0_0_50px_rgba(197,42,42,0.4)] flex justify-center items-center gap-2"
        >
          Order on WhatsApp <span className="text-lg leading-none">→</span>
        </button>
        {isMobile && closeSheet && (
          <button 
            onClick={closeSheet}
            className="w-full text-center mt-6 text-xs font-bold tracking-widest uppercase text-gray-400 hover:text-white transition-colors"
          >
            Keep Shopping
          </button>
        )}
      </div>
    </div>
  );
};

export default BuildYourOrder;
