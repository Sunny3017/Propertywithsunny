import React from 'react';
import { motion } from 'framer-motion';
import { Home, Waves, Trees, ShieldCheck, Car, Dumbbell, Coffee, Wifi, Sparkles, Crown, Wind, Droplets } from 'lucide-react';
import LightRays from './LightRays';

const amenities = [
  { icon: <ShieldCheck size={28} />, title: "Gated Township", description: "24/7 security with CCTV surveillance for a safe living environment." },
  { icon: <Home size={28} />, title: "Clubhouse & Gym", description: "Modern fitness center and social spaces for the community." },
  { icon: <Waves size={28} />, title: "Swimming Pool", description: "Relax and rejuvenate in our premium indoor swimming pool." },
  { icon: <Trees size={28} />, title: "Temple & Parks", description: "Spiritual and green spaces within the township for peace." },
  { icon: <Car size={28} />, title: "IGL Gas Pipeline", description: "Direct gas connection for a seamless cooking experience." },
  { icon: <Coffee size={28} />, title: "Shopping Arcade", description: "In-house shops for all your daily needs and convenience." },
  { icon: <Wifi size={28} />, title: "Underground Wiring", description: "Modern underground drainage and electrical wiring systems." },
  { icon: <Dumbbell size={28} />, title: "24x7 Supply", description: "Uninterrupted water and electricity supply for every villa." },
];

const Amenities = () => {
  return (
    <section className="relative py-28 bg-[#050505] overflow-hidden">
      {/* Light Rays Background Effect */}
      <div className="absolute inset-0 z-0 opacity-80">
        <LightRays 
          raysOrigin="top-center" 
          raysColor="#C5A028" 
          raysSpeed={1.2} 
          lightSpread={0.4} 
          rayLength={10} 
          followMouse={true} 
          mouseInfluence={1} 
          noiseAmount={0.5} 
          distortion={0} 
          pulsating={true} 
          fadeDistance={4} 
          saturation={1.5} 
        />
      </div>

      {/* Premium Background Elements */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_rgba(197,160,40,0.06),_transparent_70%)]"></div>
      <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A028]/20 to-transparent"></div>
      
      {/* Decorative Gold Lines */}
      <div className="absolute top-40 right-10 w-40 h-px bg-[#C5A028]/10 rotate-45 hidden xl:block"></div>
      <div className="absolute bottom-40 left-10 w-24 h-px bg-[#C5A028]/10 -rotate-12 hidden xl:block"></div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header - Premium Style */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="inline-flex items-center justify-center gap-3 mb-6"
          >
            <div className="w-10 h-px bg-[#C5A028]/50"></div>
            <span className="text-[#C5A028] font-light tracking-[0.3em] text-[11px] uppercase">World-Class Living</span>
            <div className="w-10 h-px bg-[#C5A028]/50"></div>
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-6xl lg:text-7xl font-serif font-light text-white leading-[1.2]"
          >
            Curated <span className="font-medium italic text-[#C5A028]">Amenities</span>
            <br />
            <span className="text-2xl md:text-3xl font-light text-white/40 mt-4 block">for the Discerning Few</span>
          </motion.h2>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-2xl mx-auto text-white/40 mt-6 text-sm leading-relaxed font-light tracking-wide"
          >
            Every detail is meticulously crafted to offer you an unparalleled living experience, 
            combining modern technology with timeless luxury.
          </motion.p>
        </div>

        {/* Amenities Grid - Premium Card Design */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-transparent rounded-2xl overflow-hidden">
          {amenities.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.1 }}
              transition={{ delay: index * 0.05, duration: 0.5 }}
              className="group relative bg-transparent p-8 transition-all duration-500 hover:bg-white/5"
            >
              {/* Hover Border Effect */}
              <div className="absolute inset-0 border border-transparent group-hover:border-[#C5A028]/30 rounded-2xl transition-all duration-500 pointer-events-none"></div>
              
              {/* Gold Accent Line on Hover */}
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-0 h-px bg-[#C5A028] group-hover:w-12 transition-all duration-500"></div>
              
              <div className="flex flex-col items-center text-center relative z-10">
                {/* Icon Container */}
                <div className="relative mb-6">
                  <div className="absolute inset-0 bg-[#C5A028]/10 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                  <div className="relative text-[#C5A028] transform group-hover:scale-110 group-hover:-translate-y-1 transition-all duration-500">
                    {item.icon}
                  </div>
                </div>
                
                {/* Title */}
                <h3 className="text-lg font-serif font-medium text-white mb-3 tracking-wide group-hover:text-[#C5A028] transition-colors duration-300">
                  {item.title}
                </h3>
                
                {/* Description */}
                <p className="text-white/35 text-sm leading-relaxed font-light">
                  {item.description}
                </p>
                
                {/* Decorative Dot */}
                <div className="mt-4 w-1 h-1 rounded-full bg-[#C5A028]/0 group-hover:bg-[#C5A028]/50 transition-all duration-300"></div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Premium Footer Note */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="text-center mt-16 pt-8 border-t border-white/5"
        >
          <div className="flex items-center justify-center gap-2 text-white/25 text-[10px] tracking-wider uppercase">
            <Sparkles size={12} className="text-[#C5A028]/50" />
            <span>Plus 15+ additional premium amenities</span>
            <Sparkles size={12} className="text-[#C5A028]/50" />
          </div>
        </motion.div>
      </div>

      {/* Bottom Gold Line */}
      <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-[#C5A028]/20 to-transparent"></div>
    </section>
  );
};

export default Amenities;