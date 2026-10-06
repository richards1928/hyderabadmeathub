import { useEffect } from 'react';
import { businessInfo } from '../data/business';

const Terms = () => {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="pt-32 pb-24 px-6 max-w-4xl mx-auto">
      <div className="text-xs font-bold uppercase tracking-[0.2em] text-meathub-red mb-4">Legal Information</div>
      <h1 className="text-4xl md:text-5xl font-primary font-black text-obsidian tracking-tighter mb-12">
        TERMS & CONDITIONS
      </h1>

      <div className="prose prose-lg text-obsidian/80 max-w-none">
        <p className="mb-6">Last updated: {new Date().toLocaleDateString()}</p>
        
        <p className="mb-8 font-medium">
          Welcome to {businessInfo.name}. By accessing our website and placing orders, you agree to these Terms & Conditions.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">1. Ordering via WhatsApp</h2>
        <p className="mb-6">
          Our website serves as a digital catalog. All orders are processed and confirmed via WhatsApp. Submitting a cart via our website opens a WhatsApp conversation with your pre-filled request. The order is not confirmed until a representative from {businessInfo.name} explicitly confirms it within the chat.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">2. Product Availability & Pricing</h2>
        <p className="mb-6">
          All products and pricing are subject to availability and market conditions. While we strive to ensure that all details on our website are accurate, errors may occur. In the event of a pricing or availability error, we will inform you via WhatsApp before confirming your order.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">3. Delivery</h2>
        <p className="mb-6">
          Delivery terms, times, and applicable fees will be communicated and agreed upon during the WhatsApp order confirmation process.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">4. Product Quality</h2>
        <p className="mb-6">
          We pride ourselves on delivering fresh, high-quality meat. If you have any concerns regarding the quality of your order upon delivery, please contact us immediately via WhatsApp or phone.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">5. Cancellations</h2>
        <p className="mb-6">
          As our products are perishable, order cancellations or changes must be communicated and acknowledged via WhatsApp before the order is dispatched.
        </p>

        <h2 className="text-2xl font-primary font-bold text-obsidian mt-12 mb-4">6. Contact Information</h2>
        <p className="mb-6">
          For any inquiries or issues, please reach out to us:
          <br /><br />
          <strong>{businessInfo.name}</strong><br />
          Phone: {businessInfo.phone}
        </p>
      </div>
    </div>
  );
};

export default Terms;
