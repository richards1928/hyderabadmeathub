import { useEffect } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Lenis from 'lenis';
import CartDrawer from './components/CartDrawer';
import Navigation from './components/Navigation';
import Footer from './components/Footer';
import MobileCTA from './components/MobileCTA';
import Home from './pages/Home';
import PrivacyPolicy from './pages/PrivacyPolicy';
import Terms from './pages/Terms';
import NotFound from './pages/NotFound';

import BuildYourOrder from './pages/BuildYourOrder';

// Layout wrapper for pages other than Home to include Navigation/Footer
const PageLayout = ({ children }: { children: React.ReactNode }) => (
  <>
    <Navigation animateIn={true} />
    <main className="min-h-screen">
      {children}
    </main>
    <Footer />
    <MobileCTA />
  </>
);

function App() {
  useEffect(() => {
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    return () => {
      lenis.destroy();
    };
  }, []);

  return (
    <BrowserRouter>
      <div className="bg-alabaster min-h-screen text-obsidian flex flex-col">
        <CartDrawer />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/build-your-order" element={<BuildYourOrder />} />
          <Route path="/privacy-policy" element={<PageLayout><PrivacyPolicy /></PageLayout>} />
          <Route path="/terms" element={<PageLayout><Terms /></PageLayout>} />
          <Route path="*" element={<PageLayout><NotFound /></PageLayout>} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
