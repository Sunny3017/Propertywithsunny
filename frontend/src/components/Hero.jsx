import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const Hero = () => {
  // Array of background images for the carousel
  const backgroundImages = [
    {
      url: "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&q=90&w=2000",
      alt: "Luxury Villa with Pool"
    },
    {
      url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?auto=format&fit=crop&q=90&w=2000",
      alt: "Modern Luxury Mansion"
    },
    {
      url: "https://images.unsplash.com/photo-1723110994499-df46435aa4b3?q=80&w=1179&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      alt: "Premium Estate with Garden"
    },
    {
      url: "https://images.unsplash.com/photo-1600210492493-0946911123ea?auto=format&fit=crop&q=90&w=2000",
      alt: "Luxury Living Room"
    },
    {
      url: "https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?auto=format&fit=crop&q=90&w=2000",
      alt: "Elegant Property Exterior"
    },
    {
      url: "https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?auto=format&fit=crop&q=90&w=2000",
      alt: "Dream Home Landscape"
    }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Auto-slide every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % backgroundImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [backgroundImages.length]);

  return (
    <section className="relative h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image Carousel - Auto sliding only, no controls */}
      <div className="absolute inset-0">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentIndex}
            initial={{ opacity: 0, scale: 1.05 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.05 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
            className="absolute inset-0"
          >
            <img 
              src={backgroundImages[currentIndex].url} 
              alt={backgroundImages[currentIndex].alt} 
              className="w-full h-full object-cover"
            />
          </motion.div>
        </AnimatePresence>
        
        {/* Gradient Overlay - Premium look */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/70 z-10"></div>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_transparent_40%,_rgba(0,0,0,0.5)_100%)] z-10"></div>
      </div>

      {/* Subtle Gold Accent Line */}
      <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-[#C5A028]/60 to-transparent z-20"></div>

      {/* Main Hero Content - Moved lower */}
      <div className="relative z-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mt-32 md:mt-40">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: [0.25, 0.1, 0.25, 1] }}
          className="space-y-6"
        >
          {/* Premium Tagline */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.6 }}
            className="flex justify-center"
          >
            <span className="inline-block text-[#C5A028]/80 tracking-[0.2em] text-xs uppercase font-light">
              Where Dreams Find A Home
            </span>
          </motion.div>
          
          {/* Main Heading */}
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-serif font-light text-white leading-[1.15] tracking-tight">
            Discover Your
            <br />
            <span className="font-medium italic bg-gradient-to-r from-[#C5A028] via-[#E8D08E] to-[#C5A028] bg-clip-text text-transparent">
              Green Haven
            </span>
          </h1>
          
          {/* Description */}
          <p className="max-w-2xl mx-auto text-base md:text-lg text-white/70 font-light leading-relaxed tracking-wide">
            Sector 16B, Noida Extension — Where timeless architecture meets tranquil landscapes.
            <br className="hidden sm:block" />
            Residences of distinction from <span className="text-[#C5A028] font-medium">₹84 Lakhs</span>.
          </p>
          
          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-5 pt-6">
            <Link 
              to="/gallery" 
              className="group relative px-8 py-3.5 bg-[#C5A028] overflow-hidden rounded-sm transition-all duration-500 hover:bg-[#D4AF37] shadow-xl"
            >
              <span className="relative z-10 flex items-center space-x-2 text-black font-medium tracking-wide text-sm uppercase">
                <span>Explore Villas</span>
                <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-300" />
              </span>
            </Link>
            
            <Link 
              to="/book-now" 
              className="px-8 py-3.5 border border-white/30 rounded-sm backdrop-blur-sm transition-all duration-500 hover:bg-white/10 hover:border-[#C5A028]"
            >
              <span className="text-white font-light tracking-wide text-sm uppercase">
                Schedule Visit
              </span>
            </Link>
          </div>
          
          {/* Trust indicators */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5, duration: 0.8 }}
            className="flex justify-center items-center gap-6 pt-10"
          >
            <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase">
              <span className="w-6 h-[1px] bg-[#C5A028]/50"></span>
              <span>3BHK DUPLEX VILLA</span>
            </div>
            <div className="text-white/20 text-xs">✦</div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase">
              <span>1000+</span>
              <span>Families</span>
            </div>
            <div className="text-white/20 text-xs">✦</div>
            <div className="flex items-center gap-2 text-white/40 text-[10px] tracking-wider uppercase">
              <span>HIGH</span>
              <span>ROI</span>
            </div>
          </motion.div>
        </motion.div>
      </div>

      {/* Refined Scroll Indicator */}
      <motion.div 
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex flex-col items-center gap-2"
      >
        <span className="text-[8px] text-white/30 tracking-[0.3em] uppercase font-light">Scroll</span>
        <div className="w-px h-10 bg-gradient-to-b from-white/40 to-transparent relative">
          <motion.div 
            animate={{ y: [0, 28] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="absolute top-0 left-0 w-full h-1.5 bg-[#C5A028]"
          />
        </div>
      </motion.div>
      
      {/* Gold corner accents */}
      <div className="absolute bottom-6 right-6 w-12 h-12 z-20 pointer-events-none">
        <div className="absolute bottom-0 right-0 w-6 h-[1px] bg-[#C5A028]/40"></div>
        <div className="absolute bottom-0 right-0 h-6 w-[1px] bg-[#C5A028]/40"></div>
      </div>
    </section>
  );
};

export default Hero;