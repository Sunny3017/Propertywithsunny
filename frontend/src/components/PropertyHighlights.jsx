import React from 'react';
import { motion } from 'framer-motion';
import { CheckCircle, MapPin, Layers, Layout, Award, Shield, Sparkles } from 'lucide-react';
import SplashCursor from './SplashCursor';
import villa1 from '../assets/villas-pic/WhatsApp Image 2026-04-08 at 4.29.29 PM.jpeg';
import villa2 from '../assets/villas-pic/WhatsApp Image 2026-04-08 at 4.29.29 PM (1).jpeg';
import villa3 from '../assets/villas-pic/WhatsApp Image 2026-04-08 at 4.29.29 PM (2).jpeg';
import villa4 from '../assets/villas-pic/WhatsApp Image 2026-04-08 at 4.29.30 PM.jpeg';

const highlights = [
  { icon: <MapPin size={24} />, title: "Prime Connectivity", description: "2 min from Gaur City, 5 min from NH-24, and 10 min from Sector 62." },
  { icon: <Layers size={24} />, title: "Gated Township", description: "A secure community with 1000+ families already residing." },
  { icon: <Layout size={24} />, title: "Spacious 3BHK", description: "Plot sizes 75-110 Sq. Yards with modern duplex style design." },
  { icon: <CheckCircle size={24} />, title: "High ROI Potential", description: "Excellent investment opportunity in a rapidly developing area." },
];

const PropertyHighlights = () => {
  return (
    <section className="relative py-28 bg-[#0A0A0A] overflow-hidden">
      {/* Fluid Cursor Effect Background */}
      <SplashCursor />
      
      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_right,_rgba(197,160,40,0.08),_transparent_60%)]"></div>
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A028]/30 to-transparent"></div>
      
      {/* Gold Accent Lines */}
      <div className="absolute top-20 left-10 w-20 h-px bg-[#C5A028]/20 rotate-90 hidden lg:block"></div>
      <div className="absolute bottom-20 right-10 w-32 h-px bg-[#C5A028]/20 hidden lg:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="flex flex-col lg:flex-row items-center justify-between gap-20">
          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full lg:w-1/2 space-y-8"
          >
            {/* Premium Badge */}
            <div className="inline-flex items-center gap-2">
              <div className="w-8 h-px bg-[#C5A028]"></div>
              <span className="text-[#C5A028] font-light tracking-[0.3em] text-[11px] uppercase">Signature Collection</span>
            </div>

            <div className="space-y-5">
              <h2 className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.15]">
                Where <span className="font-medium italic text-[#C5A028]">Luxury</span>
                <br />
                Finds Its Address
              </h2>
              <p className="text-white/50 text-base leading-relaxed max-w-lg font-light tracking-wide">
                Sector 16B, Noida Extension — Experience independent living with our premium villas. 
                Designed for comfort, privacy, and a modern lifestyle near Gaur City Mall.
              </p>
            </div>

            {/* Premium Stats */}
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-serif font-light text-[#C5A028]">3 BHK</div>
                <div className="text-white/40 text-[10px] tracking-wider uppercase mt-1">Luxury Villas</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-3xl font-serif font-light text-[#C5A028]">75-110</div>
                <div className="text-white/40 text-[10px] tracking-wider uppercase mt-1">Sq. Yards Plot</div>
              </div>
              <div className="w-px h-10 bg-white/10"></div>
              <div>
                <div className="text-3xl font-serif font-light text-[#C5A028]">1000+</div>
                <div className="text-white/40 text-[10px] tracking-wider uppercase mt-1">Happy Families</div>
              </div>
            </div>

            {/* Highlights Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 pt-6">
              {highlights.map((item, index) => (
                <motion.div 
                  key={index} 
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1, duration: 0.5 }}
                  className="group flex items-start space-x-4 p-4 rounded-lg hover:bg-white/5 transition-all duration-500"
                >
                  <div className="text-[#C5A028] mt-0.5 group-hover:scale-110 transition-transform duration-300">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-white font-medium text-base tracking-wide mb-1">{item.title}</h4>
                    <p className="text-white/35 text-sm leading-relaxed font-light">{item.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Additional Trust Badge */}
            <div className="flex items-center gap-4 pt-4">
              <div className="flex items-center gap-2">
                <Award size={14} className="text-[#C5A028]" />
                <span className="text-white/40 text-[10px] tracking-wider">Trustworthy</span>
              </div>
              <div className="w-px h-3 bg-white/20"></div>
              <div className="flex items-center gap-2">
                <Shield size={14} className="text-[#C5A028]" />
                <span className="text-white/40 text-[10px] tracking-wider">Freehold Property</span>
              </div>
            </div>
          </motion.div>

          {/* Right Image Gallery - Premium Masonry Layout */}
          <motion.div 
            initial={{ opacity: 0, x: 60 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.3 }}
            transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="w-full lg:w-1/2"
          >
            <div className="grid grid-cols-2 gap-5 h-[520px]">
              {/* Left Column */}
              <div className="flex flex-col gap-5 h-full">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="h-[55%] rounded-sm overflow-hidden relative group"
                >
                  <img 
                    src={villa1} 
                    alt="Luxury Villa 1" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 left-3 text-white/70 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Luxury Living</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="h-[43%] rounded-sm overflow-hidden relative group"
                >
                  <img 
                    src={villa2} 
                    alt="Luxury Villa 2" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 left-3 text-white/70 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Premium Design</div>
                </motion.div>
              </div>

              {/* Right Column */}
              <div className="flex flex-col gap-5 h-full pt-10">
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="h-[48%] rounded-sm overflow-hidden relative group"
                >
                  <img 
                    src={villa3} 
                    alt="Luxury Villa 3" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 left-3 text-white/70 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Elegant Exterior</div>
                </motion.div>
                <motion.div 
                  whileHover={{ scale: 1.02 }}
                  transition={{ duration: 0.4 }}
                  className="h-[50%] rounded-sm overflow-hidden relative group"
                >
                  <img 
                    src={villa4} 
                    alt="Luxury Villa 4" 
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="absolute bottom-3 left-3 text-white/70 text-[10px] tracking-wider uppercase opacity-0 group-hover:opacity-100 transition-opacity duration-500">Exclusive Facade</div>
                </motion.div>
              </div>
            </div>

            {/* Gold Accent Frame */}
            <div className="absolute -bottom-4 -right-4 w-24 h-24 border-r border-b border-[#C5A028]/30 hidden lg:block"></div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default PropertyHighlights;