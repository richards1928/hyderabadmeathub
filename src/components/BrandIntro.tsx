import { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';

interface BrandIntroProps {
  onComplete: () => void;
}

const BrandIntro = ({ onComplete }: BrandIntroProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const textFillRef = useRef<HTMLDivElement>(null);
  const textGroupRef = useRef<SVGGElement>(null);
  const hyderabadRef = useRef<HTMLDivElement>(null);
  const glowRef = useRef<HTMLDivElement>(null);
  
  const [isVisible, setIsVisible] = useState(true);
  
  // Use a ref for onComplete to avoid re-triggering the useEffect if the parent re-renders
  const onCompleteRef = useRef(onComplete);
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  // Use a ref to ensure the timeline initialization is strictly idempotent
  const timelineStarted = useRef(false);

  useEffect(() => {
    if (timelineStarted.current) return;
    timelineStarted.current = true;

    const hasSeenIntro = sessionStorage.getItem('meathub-intro-v5');
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    if (hasSeenIntro) {
      setIsVisible(false);
      onCompleteRef.current();
      return;
    }

    window.scrollTo(0, 0);
    document.body.style.overflow = 'hidden';

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        onComplete: () => {
          sessionStorage.setItem('meathub-intro-v5', 'true');
          document.body.style.overflow = 'unset';
          setIsVisible(false);
          onCompleteRef.current();
        }
      });

      if (prefersReducedMotion) {
        if (textFillRef.current) gsap.set(textFillRef.current, { backgroundColor: '#f8f8f8' }); 
        tl.to(containerRef.current, { opacity: 1, duration: 0.1 })
          .to(hyderabadRef.current, { opacity: 1, duration: 0.5 })
          .to('#meathub-mask-text', { opacity: 1, duration: 0.5 }, "-=0.2")
          .to(containerRef.current, { opacity: 0, duration: 0.8, delay: 1 });
      } else {
        // Setup initial states
        gsap.set('#meathub-mask-text', { opacity: 0 });
        if (textFillRef.current) gsap.set(textFillRef.current, { opacity: 1, backgroundColor: '#f8f8f8' });
        if (hyderabadRef.current) gsap.set(hyderabadRef.current, { opacity: 0, y: 10 });
        if (glowRef.current) gsap.set(glowRef.current, { opacity: 0, scale: 0.8 });
        // Start the container as solid black to prevent any white flash from the App background
        if (containerRef.current) gsap.set(containerRef.current, { backgroundColor: '#050505' });
        
        // SCENE 1: 0.0s -> 1.5s
        // Cinematic HYDERABAD entrance with ambient red glow
        tl.fromTo(glowRef.current, {
          opacity: 0,
          scale: 0.5
        }, {
          opacity: 0.25,
          scale: 1,
          duration: 2.5,
          ease: 'power2.out'
        }, 0.0);

        tl.fromTo(hyderabadRef.current, { 
          opacity: 0, 
          y: 10, 
          scale: 0.95,
          letterSpacing: '0.1em'
        }, {
          opacity: 1, 
          y: 0, 
          scale: 1,
          letterSpacing: '0.4em',
          duration: 1.5, 
          ease: 'power3.out' 
        }, 0.2);

        // HYDERABAD fades out cinematically
        tl.to(hyderabadRef.current, {
          opacity: 0,
          scale: 1.05,
          duration: 1.0,
          ease: 'power2.inOut'
        }, 1.7);

        // SCENE 2: 2.2s -> 3.5s
        // MEATHUB appears dramatically
        tl.fromTo('#meathub-mask-text', 
          { opacity: 0, scale: 0.9 },
          { opacity: 1, scale: 1, duration: 1.5, ease: 'power3.out' },
          2.2
        );

        // SCENE 3: 3.5s -> 5.5s
        // The wow moment. MEATHUB scales dramatically.
        
        // Fade out the glow as the portal opens
        tl.to(glowRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        }, 3.0);

        // Make the container transparent just before the scale, so we reveal the Hero underneath
        tl.to(containerRef.current, {
          backgroundColor: 'transparent',
          duration: 0.1
        }, 3.4);

        // Fade out the solid white text fill so it becomes a transparent window to the hero
        tl.to(textFillRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        }, 3.5);

        // Scale the SVG hole massively so we fly through the word
        tl.to(textGroupRef.current, {
          scale: 150,
          duration: 2.0,
          ease: 'expo.inOut'
        }, 3.5);

        // SCENE 4: 5.0s -> 6.0s
        // Intro completely gone
        tl.to(containerRef.current, {
          opacity: 0,
          duration: 0.8,
          ease: 'power2.inOut'
        }, 4.7);
        
        // Total GSAP timeline ends roughly around 5.5s.
      }
    }, containerRef);

    return () => {
      ctx.revert();
      timelineStarted.current = false;
      document.body.style.overflow = 'unset';
    };
  }, []);

  if (!isVisible) return null;

  return (
    <div 
      ref={containerRef} 
      className="fixed inset-0 z-[100] flex items-center justify-center pointer-events-none overflow-hidden"
    >
      {/* Base Layer: Solid white that makes the text hole look white initially */}
      <div 
        ref={textFillRef} 
        className="absolute inset-0 bg-[#f8f8f8] w-full h-full z-10"
      />

      {/* SVG Mask Layer: Punches a hole through a black overlay */}
      <svg className="absolute inset-0 w-full h-full z-20" preserveAspectRatio="xMidYMid slice">
        <defs>
          <mask id="meathub-mask">
            {/* White background makes the black overlay opaque */}
            <rect width="100%" height="100%" fill="white" />
            
            {/* Black text creates a transparent hole through the overlay */}
            <g ref={textGroupRef} style={{ transformOrigin: '50% 50%' }}>
              <text
                id="meathub-mask-text"
                x="50%"
                y="50%"
                textAnchor="middle"
                dominantBaseline="central"
                fill="black"
                className="font-primary font-black tracking-tighter"
                style={{ fontSize: '18vw', opacity: 0 }}
              >
                MEATHUB
              </text>
            </g>
          </mask>
        </defs>
        
        {/* The solid black overlay that gets a hole punched in it */}
        <rect width="100%" height="100%" fill="#050505" mask="url(#meathub-mask)" />
      </svg>

      {/* Ambient Cinematic Red Glow */}
      <div 
        ref={glowRef}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[120vw] md:w-[60vw] md:h-[60vw] rounded-full bg-[#c52a2a] opacity-0 blur-[100px] pointer-events-none z-25 mix-blend-screen"
      />

      {/* Typography Layer: HYDERABAD */}
      <div className="absolute inset-0 flex flex-col items-center justify-center z-30">
        <div 
          ref={hyderabadRef} 
          className="text-[#c52a2a] font-bold text-xs md:text-sm lg:text-base tracking-[0.3em] uppercase opacity-0 translate-y-4"
          style={{ transform: 'translateY(-10vw)' }}
        >
          Hyderabad
        </div>
      </div>
    </div>
  );
};

export default BrandIntro;
