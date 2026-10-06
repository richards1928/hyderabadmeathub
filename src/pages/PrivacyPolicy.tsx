import { useEffect } from 'react';
import { businessInfo } from '../data/business';

const PrivacyPolicy = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-meathub-red mb-4">Legal Information</div>
      <h1 className="text-4xl md:text-5xl font-primary font-black text-obsidian tracking-tighter mb-12">
        PRIVACY POLICY
      </h1>

      <div className="prose prose-lg text-obsidian/80 max-w-none">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p className="mb-8 font-medium">
          Welcome to {businessInfo.name}. This Privacy Policy explains how we collect, use, and protect your information when you use our website and services.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">1. Information We Collect</h2>
        <p className="mb-6">
          When you place an order with us via WhatsApp, we collect information necessary to fulfill your order, which may include your name, phone number, delivery address, and order details.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">2. Website Usage and Local Storage</h2>
        <p className="mb-6">
          Our website uses local browser storage (such as localStorage) solely for essential functions, specifically to remember the items you have added to your shopping cart. We do not use non-essential tracking cookies.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">3. How We Use Your Information</h2>
        <p className="mb-6">
          We use the information we collect to:
        </p>
        <ul className="list-disc pl-6 mb-6 space-y-2">
          <li>Process and deliver your orders</li>
          <li>Communicate with you regarding your orders via WhatsApp</li>
          <li>Improve our services and product offerings</li>
        </ul>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">4. WhatsApp Interactions</h2>
        <p className="mb-6">
          By choosing to order via WhatsApp, you acknowledge that your interactions will also be governed by WhatsApp's own privacy policies and terms of service.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">5. Data Retention</h2>
        <p className="mb-6">
          We retain your personal information only for as long as necessary to fulfill the purposes for which we collected it, including for the purposes of satisfying any legal, accounting, or reporting requirements.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">6. Contact Us</h2>
        <p className="mb-6">
          If you have any questions about this Privacy Policy, please contact us at:
          <br /><br />
          <strong>{businessInfo.name}</strong><br />
          Phone: {businessInfo.phone}
        </p>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
