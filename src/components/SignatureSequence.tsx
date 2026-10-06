import { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

gsap.registerPlugin(ScrollTrigger);

const sequenceData = [
  { text: 'FRESH.', image: 'https://images.unsplash.com/photo-1604503468506-a8da13d82791?q=80&w=2574&auto=format&fit=crop', alt: 'Fresh raw meat' },
  { text: 'CUT.', image: '/images/cinematic_cut.jpg', alt: 'Precision cutting' },
  { text: 'PACKED.', image: 'https://images.unsplash.com/photo-1628268909376-e8c44bb3153f?q=80&w=2670&auto=format&fit=crop', alt: 'Hygienic packaging' },
  { text: 'DELIVERED.', image: 'https://images.unsplash.com/photo-1555939594-58d7cb561ad1?q=80&w=2574&auto=format&fit=crop', alt: 'Delivered to you' },
];

const SignatureSequence = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const panels = gsap.utils.toArray('.signature-panel') as HTMLElement[];
      const texts = gsap.utils.toArray('.signature-text') as HTMLElement[];
      const images = gsap.utils.toArray('.signature-img') as HTMLImageElement[];
      
      // Pin the entire container
      ScrollTrigger.create({
        trigger: containerRef.current,
        start: 'top top',
        end: '+=400%',
        pin: true,
        scrub: 1,
      });

      // We have 4 panels. We fade them in sequentially.
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top top',
          end: '+=400%',
          scrub: 1,
        }
      });

      panels.forEach((panel, i) => {
        const text = texts[i];
        const img = images[i];

        // For the first panel, it's already visible. Just zoom out the image and fade in text.
        if (i === 0) {
          tl.to(text, { opacity: 1, y: 0, duration: 1 }, 0);
          tl.to(img, { scale: 1.05, duration: 2 }, 0);
          tl.to(panel, { opacity: 0, duration: 1 }, 2);
        } else {
          // Fade in panel, zoom in image, fade in text
          tl.to(panel, { opacity: 1, duration: 1 }, i * 2 - 0.5);
          tl.to(text, { opacity: 1, y: 0, duration: 1 }, i * 2);
          tl.fromTo(img, { scale: 1.15 }, { scale: 1.05, duration: 2 }, i * 2 - 0.5);
          
          // Fade out panel unless it's the last one
          if (i !== panels.length - 1) {
            tl.to(panel, { opacity: 0, duration: 1 }, (i + 1) * 2);
          }
        }
      });
      
    }, containerRef);
    
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full h-screen bg-obsidian overflow-hidden">
      {sequenceData.map((item, i) => (
        <div 
          key={i} 
          className={twMerge(
            clsx(
              "signature-panel absolute inset-0 w-full h-full flex items-center justify-center",
              i === 0 ? "opacity-100 z-10" : "opacity-0 z-20"
            )
          )}
          style={{ zIndex: i * 10 }}
        >
          {/* Background Image Layer */}
          <div className="absolute inset-0 w-full h-full">
            <img 
              src={item.image} 
              alt={item.alt} 
              className="signature-img w-full h-full object-cover origin-center opacity-70"
            />
            {/* Cinematic dark overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-obsidian via-obsidian/40 to-obsidian/80 mix-blend-multiply"></div>
          </div>

          {/* Typography Layer */}
          <div className="relative z-30 w-full px-6 flex flex-col items-center justify-center text-center">
            <h2 className="signature-text text-6xl md:text-8xl lg:text-[12rem] font-primary font-black text-alabaster tracking-[-0.05em] uppercase opacity-0 translate-y-16 drop-shadow-2xl">
              {item.text}
            </h2>
          </div>
        </div>
      ))}
      
      {/* Scroll indicator overlaid on top of all panels */}
      <div className="absolute bottom-12 left-1/2 -translate-x-1/2 z-50 flex flex-col items-center opacity-50">
        <span className="text-[10px] font-bold uppercase tracking-[0.3em] text-white mb-3">Scroll</span>
        <div className="w-[1px] h-12 bg-white/30 overflow-hidden relative">
          <div className="w-full h-full bg-white absolute top-0 left-0 animate-[shimmer_2s_infinite]"></div>
        </div>
      </div>
    </section>
  );
};

export default SignatureSequence;
