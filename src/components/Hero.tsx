import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { businessInfo } from '../data/business';

interface HeroProps {
  animateIn?: boolean;
}

const Hero = ({ animateIn = true }: HeroProps) => {
  const heroRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    if (!animateIn) return;
    
    const ctx = gsap.context(() => {
      const tl = gsap.timeline();
      
      tl.fromTo('.hero-anim', 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, stagger: 0.15, ease: 'power3.out' }
      );
    }, heroRef);
    
    return () => ctx.revert();
  }, [animateIn]);

  return (
    <section ref={heroRef} className="relative w-full h-screen flex items-center justify-center overflow-hidden bg-obsidian">
      {/* Background Image - ALWAYS VISIBLE for the portal transition */}
      <div className="absolute inset-0 z-0">
        <img 
          src="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=2670&auto=format&fit=crop" 
          alt="Fresh Premium Meat" 
          className="w-full h-full object-cover opacity-60 scale-105"
        />
        {/* Advanced gradient overlay: dark at top for nav, radial dark at bottom for text, clear in middle */}
        <div className="absolute inset-0 bg-gradient-to-b from-obsidian/90 via-obsidian/30 to-obsidian/95" />
      </div>

      <div className="relative z-10 text-center px-6 max-w-5xl mx-auto mt-24 md:mt-16">
        <div className="hero-anim opacity-0 mb-8 flex items-center justify-center gap-4 text-xs md:text-sm font-bold uppercase tracking-[0.25em] text-meathub-red">
          <span className="h-[2px] w-12 bg-meathub-red"></span> {businessInfo.name} <span className="h-[2px] w-12 bg-meathub-red"></span>
        </div>
        
        <h1 className="hero-anim opacity-0 text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-primary font-black text-alabaster tracking-tighter leading-[0.85] drop-shadow-2xl">
          GOOD FOOD <br />
          <span className="text-transparent bg-clip-text bg-gradient-to-br from-alabaster via-alabaster to-gray-400">STARTS FRESH.</span>
        </h1>
        
        <p className="hero-anim opacity-0 mt-8 text-lg md:text-2xl text-alabaster/80 max-w-2xl mx-auto font-medium leading-relaxed tracking-wide">
          {businessInfo.tagline}
        </p>
        
        <div className="hero-anim opacity-0 mt-12 flex flex-col sm:flex-row items-center justify-center gap-6">
          <a href="/#shop" className="group relative overflow-hidden bg-meathub-red text-white px-10 py-5 rounded-full font-bold tracking-[0.2em] text-xs md:text-sm uppercase transition-all shadow-[0_0_40px_rgba(197,42,42,0.3)] hover:shadow-[0_0_60px_rgba(197,42,42,0.5)] w-full sm:w-auto">
            <span className="relative z-10 flex items-center justify-center gap-2">Order Now <span className="group-hover:translate-x-1 transition-transform">→</span></span>
          </a>
          <a 
            href={`${businessInfo.whatsappBaseUrl}?text=${encodeURIComponent(businessInfo.whatsappMessages.order)}`}
            target="_blank" 
            rel="noopener noreferrer"
            className="group relative border-2 border-alabaster/30 text-alabaster px-10 py-5 rounded-full font-bold tracking-[0.2em] text-xs md:text-sm uppercase hover:bg-white hover:text-obsidian transition-colors w-full sm:w-auto"
          >
            WhatsApp Order
          </a>
        </div>
        
        <div className="hero-anim opacity-0 mt-16 flex flex-wrap justify-center items-center gap-8 text-xs md:text-sm text-alabaster/60 font-semibold tracking-widest uppercase">
          {businessInfo.promises.map((promise, idx) => (
            <span key={idx} className="flex items-center gap-3">
              <span className="text-meathub-red/80">✦</span> {promise}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;
