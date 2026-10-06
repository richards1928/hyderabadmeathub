import { useState, useEffect } from 'react';
import Navigation from '../components/Navigation';
import Hero from '../components/Hero';
import SignatureSequence from '../components/SignatureSequence';
import BuildYourOrderCTA from '../components/BuildYourOrderCTA';
import CategorySelector from '../components/CategorySelector';
import ProductShowcase from '../components/ProductShowcase';
import MeatHubStandard from '../components/MeatHubStandard';
import BrandIntro from '../components/BrandIntro';
import Footer from '../components/Footer';
import MobileCTA from '../components/MobileCTA';

const Home = () => {
  const [animateIn, setAnimateIn] = useState(false);

  useEffect(() => {
    // Scroll to top when Home mounts just in case
    window.scrollTo(0, 0);
  }, []);

  return (
    <>
      {!animateIn && <BrandIntro onComplete={() => setAnimateIn(true)} />}
      <Navigation animateIn={animateIn} />
      <main>
        <Hero animateIn={animateIn} />
        <SignatureSequence />
        <BuildYourOrderCTA />
        <CategorySelector />
        <ProductShowcase />
        <MeatHubStandard />
      </main>
      <Footer />
      <MobileCTA />
    </>
  );
};

export default Home;
