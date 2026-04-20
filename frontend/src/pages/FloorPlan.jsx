import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Search, ZoomIn, Download } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import SEO from '../components/SEO';

const plans = [
  { id: 1, title: "3BHK Villa - Ground Floor", area: "1200 Sq.Ft", beds: 1, image: "https://images.unsplash.com/photo-1574362848149-11496d93a7c7?auto=format&fit=crop&q=80&w=1200" },
  { id: 2, title: "3BHK Villa - First Floor", area: "1000 Sq.Ft", beds: 2, image: "https://images.unsplash.com/photo-1502672260266-1c1ef2d93688?auto=format&fit=crop&q=80&w=1200" },
  { id: 3, title: "3BHK Villa - Terrace Plan", area: "800 Sq.Ft", beds: 0, image: "https://images.unsplash.com/photo-1512917774080-9991f1c4c750?auto=format&fit=crop&q=80&w=1200" },
  { id: 4, title: "Independent Duplex - Master", area: "2500 Sq.Ft", beds: 3, image: "https://images.unsplash.com/photo-1600585154340-be6199f7a099?auto=format&fit=crop&q=80&w=1200" },
];

const FloorPlan = () => {
  const [activePlan, setActivePlan] = useState(plans[0]);

  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-20">
      <SEO 
        title="Floor Plans" 
        description="Explore the architectural layouts of our luxury villas and modern flats. Detailed floor plans for your dream home." 
        url="/floor-plan"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-xs"
          >
            Architectural Layouts
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white"
          >
            Floor <span className="text-primary italic">Plans</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-white/50 text-sm">
            Explore the meticulous design and spacious layouts of our premium properties. Each plan is optimized for luxury and comfort.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          {/* Selector */}
          <div className="w-full lg:w-1/3 space-y-4">
            {plans.map((plan) => (
              <motion.button
                key={plan.id}
                onClick={() => setActivePlan(plan)}
                whileHover={{ x: 10 }}
                className={`w-full text-left p-6 rounded-2xl border transition-all duration-300 ${activePlan.id === plan.id ? 'bg-primary border-primary text-luxury-black' : 'bg-white/5 border-white/10 text-white hover:bg-white/10'}`}
              >
                <div className="text-xl font-serif font-bold">{plan.title}</div>
                <div className={`text-xs uppercase tracking-widest mt-2 ${activePlan.id === plan.id ? 'text-luxury-black/60' : 'text-white/40'}`}>
                  {plan.area} | {plan.beds > 0 ? `${plan.beds} Bedrooms` : 'Commercial Plot'}
                </div>
              </motion.button>
            ))}
          </div>

          {/* Viewer */}
          <div className="w-full lg:w-2/3">
            <PhotoProvider>
              <div className="luxury-card p-4 relative group">
                <PhotoView src={activePlan.image}>
                  <div className="aspect-[4/3] rounded-xl overflow-hidden cursor-zoom-in relative">
                    <img 
                      src={activePlan.image} 
                      alt={activePlan.title} 
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                      <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30">
                        <ZoomIn size={32} />
                      </div>
                    </div>
                  </div>
                </PhotoView>
                <div className="mt-6 flex justify-between items-center px-4">
                  <div>
                    <h3 className="text-2xl font-serif font-bold text-white">{activePlan.title}</h3>
                    <p className="text-white/40 text-sm mt-1">Detailed architectural blueprint</p>
                  </div>
                  <button className="flex items-center space-x-2 text-primary hover:text-white transition-colors">
                    <Download size={20} />
                    <span className="text-xs uppercase tracking-widest font-bold">Download PDF</span>
                  </button>
                </div>
              </div>
            </PhotoProvider>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloorPlan;
