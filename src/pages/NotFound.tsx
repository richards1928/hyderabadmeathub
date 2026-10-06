import { useEffect } from 'react';

const NotFound = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-obsidian text-alabaster px-6 text-center">
      <h1 className="text-[8rem] md:text-[12rem] font-primary font-black tracking-tighter leading-none mb-4 opacity-10">
        404
      </h1>
      <h2 className="text-3xl md:text-5xl font-primary font-black tracking-tighter mb-8">
        NOTHING FRESH HERE.
      </h2>
      <a 
        href="/"
        className="bg-meathub-red text-white px-8 py-4 rounded-full font-bold tracking-widest text-sm uppercase transition-all shadow-[0_0_40px_rgba(197,42,42,0.3)] hover:shadow-[0_0_60px_rgba(197,42,42,0.5)]"
      >
        Back to MeatHub
      </a>
    </div>
  );
};

export default NotFound;
