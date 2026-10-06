import { useEffect, useState, useRef } from 'react';
import { Menu, ShoppingCart, X } from 'lucide-react';
import gsap from 'gsap';
import { businessInfo } from '../data/business';
import { useCartStore } from '../store/cartStore';

interface NavigationProps {
  animateIn?: boolean;
}

const Navigation = ({ animateIn = true }: NavigationProps) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { getItemCount, setIsOpen } = useCartStore();
  const navRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    if (!animateIn) return;
    
    gsap.fromTo(navRef.current,
      { y: -50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: 'power3.out', delay: 0.5 }
    );
  }, [animateIn]);

  return (
    <>
      <nav
        ref={navRef}
        className={`opacity-0 fixed top-0 left-0 w-full z-50 transition-colors duration-300 ${
          isScrolled ? 'bg-alabaster shadow-sm py-4' : 'bg-transparent py-6'
        }`}
      >
        <div className="container mx-auto px-6 lg:px-12 flex justify-between items-center">
          {/* Logo */}
          <a href="/" className="text-2xl font-primary font-black tracking-tighter">
            {businessInfo.name.split(' ')[0]}
            <span className="text-meathub-red uppercase">{businessInfo.name.split(' ').slice(1).join(' ')}</span>
          </a>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center space-x-8">
            <a href="/#shop" className="text-sm font-semibold tracking-wide hover:text-meathub-red transition-colors">PRODUCTS</a>
            <a href="/#about" className="text-sm font-semibold tracking-wide hover:text-meathub-red transition-colors">ABOUT US</a>
            <a href="/#bulk" className="text-sm font-semibold tracking-wide hover:text-meathub-red transition-colors">BULK SUPPLY</a>
            <a href="/#contact" className="text-sm font-semibold tracking-wide hover:text-meathub-red transition-colors">CONTACT</a>
            <button 
              onClick={() => setIsOpen(true)}
              className="flex items-center space-x-2 bg-obsidian text-alabaster px-5 py-2.5 rounded-full hover:bg-meathub-red transition-colors shadow-md"
            >
              <ShoppingCart size={18} />
              <span className="text-sm font-semibold">CART ({getItemCount()})</span>
            </button>
          </div>

          {/* Mobile Toggle */}
          <button 
            className="md:hidden z-50 relative p-2 bg-white/80 backdrop-blur rounded-full shadow-sm"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div 
        className={`fixed inset-0 bg-alabaster z-40 flex flex-col justify-center items-center space-y-8 transition-transform duration-500 ease-[cubic-bezier(0.76,0,0.24,1)] ${
          isMobileMenuOpen ? 'translate-y-0' : '-translate-y-full'
        }`}
      >
        <a href="/#shop" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-primary font-black tracking-tight hover:text-meathub-red">PRODUCTS</a>
        <a href="/#about" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-primary font-black tracking-tight hover:text-meathub-red">ABOUT US</a>
        <a href="/#bulk" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-primary font-black tracking-tight hover:text-meathub-red">BULK SUPPLY</a>
        <a href="/#contact" onClick={() => setIsMobileMenuOpen(false)} className="text-4xl font-primary font-black tracking-tight hover:text-meathub-red">CONTACT</a>
      </div>
    </>
  );
};

export default Navigation;
