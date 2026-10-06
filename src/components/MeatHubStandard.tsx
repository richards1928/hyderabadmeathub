import { ShieldCheck, Truck, Clock, Droplets } from 'lucide-react';
import { businessInfo } from '../data/business';

// Map features to icons based on their titles
const getIconForFeature = (title: string) => {
  const lowercaseTitle = title.toLowerCase();
  if (lowercaseTitle.includes('delivery') && lowercaseTitle.includes('doorstep')) return Truck;
  if (lowercaseTitle.includes('quick') || lowercaseTitle.includes('time') || lowercaseTitle.includes('fast')) return Clock;
  if (lowercaseTitle.includes('quality') || lowercaseTitle.includes('assured')) return ShieldCheck;
  return Droplets; // fallback for premium cuts / cleanly prepared
};

const StandardFeature = ({ title, description }: { title: string, description: string }) => {
  const Icon = getIconForFeature(title);
  
  return (
    <div className="flex flex-col items-start p-8 bg-white border border-gray-100 rounded-2xl hover:shadow-lg transition-shadow">
      <div className="bg-alabaster p-4 rounded-full mb-6 text-meathub-red">
        <Icon size={32} />
      </div>
      <h3 className="text-xl font-bold font-primary text-obsidian mb-3">{title}</h3>
      <p className="text-gray-600 font-medium leading-relaxed">{description}</p>
    </div>
  );
};

const MeatHubStandard = () => {
  return (
    <section id="about" className="w-full py-24 bg-alabaster">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <div className="text-xs font-bold uppercase tracking-[0.2em] text-meathub-red mb-4">Why {businessInfo.name}</div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-primary font-black tracking-tighter text-obsidian mb-6">
            THE EVERYDAY GOOD STUFF, <span className="text-meathub-red">DONE RIGHT.</span>
          </h2>
          <p className="text-lg md:text-xl text-gray-600 font-medium">
            We are your neighbourhood fresh meat partner, bringing carefully sourced and hygienically prepared chicken straight to homes across {businessInfo.deliveryAreas}.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-24">
          {businessInfo.features.map((feature, idx) => (
            <StandardFeature 
              key={idx}
              title={feature.title}
              description={feature.description}
            />
          ))}
        </div>

        {/* B2B Section */}
        <div id="bulk" className="bg-obsidian text-white rounded-[2rem] p-8 md:p-12 lg:p-16 flex flex-col lg:flex-row items-center justify-between gap-12 shadow-2xl relative overflow-hidden">
          {/* Subtle Background pattern/gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-obsidian via-obsidian to-meathub-red/20 pointer-events-none"></div>
          
          <div className="relative z-10 lg:w-2/3">
            <div className="text-xs font-bold uppercase tracking-[0.2em] text-meathub-red mb-3">For Businesses</div>
            <h3 className="text-4xl md:text-5xl font-primary font-black tracking-tighter mb-4">{businessInfo.b2b.title}</h3>
            <p className="text-gray-400 font-medium text-lg max-w-xl leading-relaxed mb-8">
              {businessInfo.b2b.description}
            </p>
            <div className="flex flex-wrap gap-3">
              {businessInfo.b2b.categories.map((cat, idx) => (
                <span key={idx} className="bg-white/10 backdrop-blur border border-white/20 px-4 py-2 rounded-full text-sm font-semibold tracking-wide">
                  {cat}
                </span>
              ))}
            </div>
          </div>
          
          <div className="relative z-10 lg:w-1/3 flex justify-center lg:justify-end w-full">
            <a 
              href={`${businessInfo.whatsappBaseUrl}?text=${encodeURIComponent(businessInfo.whatsappMessages.bulk)}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="w-full text-center sm:w-auto bg-meathub-red hover:bg-red-700 text-white px-8 py-5 rounded-full font-bold tracking-widest text-sm uppercase transition-colors shadow-lg"
            >
              Contact For Bulk Orders
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MeatHubStandard;
