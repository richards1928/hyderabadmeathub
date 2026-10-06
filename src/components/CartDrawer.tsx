import { useEffect } from 'react';
import { X, Plus, Minus, Trash2, ShoppingBag } from 'lucide-react';
import { useCartStore } from '../store/cartStore';
import { businessInfo } from '../data/business';

const CartDrawer = () => {
  const { items, isOpen, setIsOpen, updateQuantity, removeItem, getCartTotal } = useCartStore();

  // Prevent background scrolling when cart is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  const handleCheckout = () => {
    let message = `*MeatHub Order*\n\n`;
    items.forEach(item => {
      message += `*${item.name}*\n${item.weight} × ${item.quantity}\n₹${item.price * item.quantity}\n\n`;
    });
    message += `*Total: ₹${getCartTotal()}*`;
    
    const url = `${businessInfo.whatsappBaseUrl}?text=${encodeURIComponent(message)}`;
    window.open(url, '_blank');
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 bg-obsidian/60 backdrop-blur-sm z-[100] transition-opacity"
        onClick={() => setIsOpen(false)}
      />
      
      {/* Drawer */}
      <div className="fixed top-0 right-0 h-full w-full sm:w-[450px] bg-white z-[101] flex flex-col shadow-2xl transform transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)]">
        
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-100">
          <h2 className="text-2xl font-black font-primary text-obsidian uppercase tracking-tight flex items-center gap-3">
            <ShoppingBag size={24} />
            Your Cart
          </h2>
          <button 
            onClick={() => setIsOpen(false)}
            className="p-2 hover:bg-gray-100 rounded-full transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {items.length === 0 ? (
            <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-4">
              <ShoppingBag size={64} className="opacity-20" />
              <p className="text-lg font-medium font-primary">Your cart is empty</p>
              <button 
                onClick={() => setIsOpen(false)}
                className="mt-4 px-6 py-3 border border-obsidian text-obsidian hover:bg-obsidian hover:text-white transition-colors uppercase tracking-widest text-xs font-bold"
              >
                Continue Shopping
              </button>
            </div>
          ) : (
            <div className="space-y-6">
              {items.map((item) => (
                <div key={item.id} className="flex gap-4 border-b border-gray-50 pb-6">
                  {/* Product Image */}
                  <div className="w-24 h-24 bg-[#f8f8f8] shrink-0 overflow-hidden">
                    <img 
                      src={item.image} 
                      alt={item.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  {/* Product Details */}
                  <div className="flex-1 flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-start">
                        <h3 className="font-bold font-primary text-obsidian uppercase tracking-tight leading-tight pr-4">
                          {item.name}
                        </h3>
                        <button 
                          onClick={() => removeItem(item.id)}
                          className="text-gray-400 hover:text-meathub-red transition-colors"
                        >
                          <Trash2 size={16} />
                        </button>
                      </div>
                      <p className="text-xs font-semibold text-gray-500 uppercase tracking-widest mt-1">
                        {item.weight}
                      </p>
                    </div>
                    
                    <div className="flex items-center justify-between mt-4">
                      {/* Quantity Selector */}
                      <div className="flex items-center border border-gray-200">
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity - 1)}
                          className="p-2 hover:bg-gray-50 text-obsidian transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-8 text-center text-sm font-bold">{item.quantity}</span>
                        <button 
                          onClick={() => updateQuantity(item.id, item.quantity + 1)}
                          className="p-2 hover:bg-gray-50 text-obsidian transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      
                      {/* Price */}
                      <span className="font-black text-lg text-obsidian">
                        ₹{item.price * item.quantity}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Footer / Checkout */}
        {items.length > 0 && (
          <div className="p-6 bg-gray-50 border-t border-gray-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm font-bold uppercase tracking-widest text-gray-500">Subtotal</span>
              <span className="text-3xl font-black font-primary text-obsidian">₹{getCartTotal()}</span>
            </div>
            
            <button 
              onClick={handleCheckout}
              className="w-full bg-meathub-red text-white py-5 flex items-center justify-center font-bold tracking-[0.2em] uppercase text-sm hover:bg-red-700 transition-colors shadow-xl shadow-meathub-red/20 group"
            >
              Order via WhatsApp
              <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
            </button>
            <p className="text-center text-xs text-gray-400 mt-4 font-medium">
              Payment will be collected upon delivery.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
