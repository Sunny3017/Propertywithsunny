import React from 'react';
import { motion } from 'framer-motion';
import { Map, MapPin, Navigation, Maximize, ZoomIn, Shield, Home, Zap, Droplets, ShoppingCart, TrendingUp } from 'lucide-react';
import { PhotoProvider, PhotoView } from 'react-photo-view';
import 'react-photo-view/dist/react-photo-view.css';
import SEO from '../components/SEO';
import sitePlanImg from '../assets/siteplan.PNG';
import brochurePdf from '../assets/green villa brochure final for approval (1).pdf';

const SitePlan = () => {
  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-20">
      <SEO 
        title="Green Villa 1 Site Plan | 3 BHK Luxury Villas Greater Noida West" 
        description="Explore the masterplan of Green Villa 1 in Sector 16, Greater Noida West. A premium gated township spread across 15 acres with 1000+ families already living." 
        url="/site-plan"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header Section */}
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-xs"
          >
            Green Villa 1 - Sector 16, Greater Noida West
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white leading-tight"
          >
            Smart Township <span className="text-primary italic">Layout</span>
          </motion.h1>
          <p className="max-w-3xl mx-auto text-white/60 text-base leading-relaxed">
            Green Villa 1 offers a well-planned gated township with modern amenities, located in Sector 16, Greater Noida West (near SKS School). 
            Spread across approx. 15 acres, this premium residential project is already home to 1000+ families.
          </p>
        </div>

        {/* Quick Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {[
            { icon: <Maximize size={24} />, title: "15 Acres", sub: "Total Township Area" },
            { icon: <Home size={24} />, title: "1000+ Families", sub: "Already Living" },
            { icon: <Navigation size={24} />, title: "Sector 16", sub: "Prime Location" },
            { icon: <TrendingUp size={24} />, title: "High Demand", sub: "Appreciation Potential" },
          ].map((item, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="luxury-card p-6 flex items-center space-x-4 border border-white/5 hover:border-primary/30 transition-all"
            >
              <div className="text-primary p-3 bg-primary/10 rounded-xl">{item.icon}</div>
              <div>
                <div className="text-white font-bold text-lg">{item.title}</div>
                <div className="text-white/40 text-[10px] uppercase tracking-widest font-medium">{item.sub}</div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Site Plan Image Section */}
        <PhotoProvider>
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="luxury-card p-4 md:p-8 relative group mb-16 overflow-hidden"
          >
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-2xl font-serif font-bold text-white">🗺️ Master Layout Plan</h2>
              <span className="text-primary text-[10px] uppercase tracking-widest font-bold bg-primary/10 px-3 py-1 rounded-full">Click to Enlarge</span>
            </div>
            
            <PhotoView src={sitePlanImg}>
              <div className="aspect-[16/9] rounded-xl overflow-hidden cursor-zoom-in relative border border-white/10">
                <img 
                  src={sitePlanImg} 
                  alt="Green Villa 1 Site Plan Master Layout" 
                  className="w-full h-full object-contain bg-[#1a1a1a]"
                />
                <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
                  <div className="w-16 h-16 rounded-full bg-primary/20 backdrop-blur-md flex items-center justify-center text-primary border border-primary/30 scale-90 group-hover:scale-100 transition-transform">
                    <ZoomIn size={32} />
                  </div>
                </div>
              </div>
            </PhotoView>
          </motion.div>
        </PhotoProvider>

        {/* Content Details Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Location Advantages */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-8 border border-white/5 space-y-6"
          >
            <div className="flex items-center space-x-3 text-primary">
              <MapPin size={24} />
              <h3 className="text-xl font-serif font-bold text-white">Location Advantage</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Prime location in Greater Noida West (Noida Extension)',
                'Close to schools (SKS School), markets, and hospitals',
                'Smooth connectivity to Noida, Delhi & Ghaziabad',
                'Peaceful and pollution-free environment',
                '👉 Best choice for home buyers and investors'
              ].map((text, i) => (
                <li key={i} className="flex items-start space-x-3 text-white/70 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Infrastructure Details */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-8 border border-white/5 space-y-6"
          >
            <div className="flex items-center space-x-3 text-primary">
              <Navigation size={24} />
              <h3 className="text-xl font-serif font-bold text-white">Smart Township Layout</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Wide internal roads for easy movement',
                'Proper drainage system infrastructure',
                'Underground electricity wiring system',
                'Dedicated residential zones for privacy',
                'In-campus commercial shops for daily needs',
                '👉 Perfect blend of comfort and planning'
              ].map((text, i) => (
                <li key={i} className="flex items-start space-x-3 text-white/70 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Why Invest / Amenities */}
          <motion.div 
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="luxury-card p-8 border border-white/5 space-y-6"
          >
            <div className="flex items-center space-x-3 text-primary">
              <TrendingUp size={24} />
              <h3 className="text-xl font-serif font-bold text-white">Why Invest Here?</h3>
            </div>
            <ul className="space-y-4">
              {[
                'Already developed and liveable township',
                'High demand area in Noida Extension',
                '1000+ families already living securely',
                'Great appreciation potential for investors',
                'Safe and secure gated society (Gated Township)',
                '👉 Best investment opportunity in Real Estate'
              ].map((text, i) => (
                <li key={i} className="flex items-start space-x-3 text-white/70 text-sm leading-relaxed">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 flex-shrink-0"></div>
                  <span>{text}</span>
                </li>
              ))}
            </ul>
          </motion.div>
        </div>

        {/* Price and Contact CTA */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 text-center luxury-card p-10 border border-primary/20 bg-primary/5"
        >
          <h3 className="text-3xl font-serif font-bold text-white mb-4">Affordable Luxury Starting from ₹79 Lakhs</h3>
          <p className="text-white/60 mb-8 max-w-2xl mx-auto">
            Premium range from ₹97 Lakhs to ₹1.4 Crore. Perfect option for those searching for luxury villas in Noida Extension.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            {/* <button className="btn-primary px-10 py-4 uppercase tracking-widest font-bold text-sm w-full sm:w-auto">
              Get Detailed Price List
            </button> */}
            <a 
              href={brochurePdf} 
              target="_blank" 
              rel="noopener noreferrer"
              className="px-10 py-4 border border-white/10 text-white hover:bg-white/5 transition-all uppercase tracking-widest font-bold text-sm w-full sm:w-auto text-center flex items-center justify-center gap-2"
            >
              Download Brochure
            </a>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SitePlan;
