import { businessInfo } from '../data/business';
import { products } from '../data/products';

const Footer = () => {
  // Extract unique categories for footer links
  const categories = Array.from(new Set(products.map(p => p.category)));

  return (
    <footer id="contact" className="bg-obsidian text-white pt-20 pb-10">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          {/* Brand */}
          <div className="col-span-1 md:col-span-2 lg:col-span-1">
            <div className="text-3xl font-primary font-black tracking-tighter mb-6">
              {businessInfo.name.split(' ')[0]}
              <span className="text-meathub-red uppercase">{businessInfo.name.split(' ').slice(1).join(' ')}</span>
            </div>
            <p className="text-gray-400 font-medium leading-relaxed max-w-sm">
              {businessInfo.tagline}
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="text-lg font-bold font-primary mb-6 uppercase tracking-wider">Shop</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              {categories.map((cat, idx) => (
                <li key={idx}>
                  <a href="/#shop" className="hover:text-meathub-red transition-colors capitalize">
                    {cat.toLowerCase()}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* About / B2B */}
          <div>
            <h4 className="text-lg font-bold font-primary mb-6 uppercase tracking-wider">Explore</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li><a href="/#about" className="hover:text-meathub-red transition-colors">About Us</a></li>
              <li><a href="/#bulk" className="hover:text-meathub-red transition-colors">Bulk Supply</a></li>
              <li><a href="/#products" className="hover:text-meathub-red transition-colors">Products</a></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="text-lg font-bold font-primary mb-6 uppercase tracking-wider">Contact</h4>
            <ul className="space-y-4 text-gray-400 font-medium">
              <li>Call: {businessInfo.phone}</li>
              <li>
                <a 
                  href={`${businessInfo.whatsappBaseUrl}?text=${encodeURIComponent(businessInfo.whatsappMessages.order)}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="hover:text-meathub-red transition-colors"
                >
                  WhatsApp Order
                </a>
              </li>
              <li>
                <span className="text-sm">Delivering to: {businessInfo.deliveryAreas}</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm text-gray-500 font-medium">
          <p>&copy; {new Date().getFullYear()} {businessInfo.name}. All rights reserved.</p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <a href="/privacy-policy" className="hover:text-meathub-red transition-colors">Privacy Policy</a>
            <a href="/terms" className="hover:text-meathub-red transition-colors">Terms & Conditions</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
