import { ShoppingCart } from 'lucide-react';
import { useCartStore } from '../store/cartStore';

const MobileCTA = () => {
  const { getItemCount, getCartTotal, setIsOpen } = useCartStore();
  const itemCount = getItemCount();
  const total = getCartTotal();

  if (itemCount === 0) return null;

  return (
    <div className="md:hidden fixed bottom-4 left-4 right-4 z-40">
      <div 
        onClick={() => setIsOpen(true)}
        className="bg-obsidian rounded-2xl shadow-2xl p-4 flex justify-between items-center border border-gray-800 cursor-pointer active:scale-[0.98] transition-transform"
      >
        <div className="flex flex-col">
          <span className="text-white font-bold font-primary text-lg">{itemCount} {itemCount === 1 ? 'Item' : 'Items'}</span>
          <span className="text-gray-400 text-xs font-semibold">₹{total} Total</span>
        </div>
        <button className="bg-meathub-red text-white px-6 py-3 rounded-xl font-bold tracking-widest text-sm uppercase flex items-center space-x-2">
          <span>View Cart</span>
          <ShoppingCart size={18} />
        </button>
      </div>
    </div>
  );
};

export default MobileCTA;
