import { Link } from 'react-router-dom';

const BuildYourOrderCTA = () => {
  return (
    <section className="bg-obsidian text-alabaster py-24 md:py-32 px-6 relative overflow-hidden">
      <div className="absolute inset-0 z-0">
        <div className="absolute inset-0 bg-gradient-to-r from-obsidian via-obsidian/80 to-transparent z-10"></div>
        <img 
          src="https://images.unsplash.com/photo-1603360946369-dc9bb6258143?q=80&w=2670&auto=format&fit=crop" 
          alt="Premium Meat" 
          className="w-full h-full object-cover opacity-30 object-right"
        />
      </div>
      
      <div className="container mx-auto max-w-7xl relative z-10 flex flex-col md:flex-row items-center justify-between gap-12">
        <div className="max-w-2xl">
          <div className="text-meathub-red font-bold uppercase tracking-[0.3em] text-xs mb-6 flex items-center gap-4">
            <span className="w-12 h-px bg-meathub-red"></span>
            MeatHub Signature Experience
          </div>
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-primary font-black tracking-tighter leading-[0.9] mb-8">
            BUILD <br className="hidden md:block"/> YOUR ORDER.
          </h2>
          <p className="text-alabaster/70 text-lg md:text-xl font-medium max-w-lg mb-12">
            Pick exactly what you need. We'll handle the rest. Enter our signature ordering experience designed for meat connoisseurs.
          </p>
          <Link 
            to="/build-your-order"
            className="group inline-flex items-center gap-4 bg-meathub-red text-white px-10 py-5 rounded-full font-bold tracking-[0.2em] text-sm uppercase transition-all shadow-[0_0_40px_rgba(197,42,42,0.3)] hover:shadow-[0_0_60px_rgba(197,42,42,0.5)] hover:bg-[#b02525]"
          >
            Start Building <span className="group-hover:translate-x-1 transition-transform">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default BuildYourOrderCTA;
