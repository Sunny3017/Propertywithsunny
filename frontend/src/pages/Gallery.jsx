import React from 'react';
import { motion } from 'framer-motion';
import { Hammer } from 'lucide-react';
import SEO from '../components/SEO';
import Antigravity from '../components/AntigravityInner';

const Gallery = () => {
  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-20 relative overflow-hidden flex items-center justify-center">
      <SEO 
        title="Gallery" 
        description="Our gallery is currently under construction. We are preparing a visual experience that matches our luxury standards." 
        url="/gallery"
      />

      {/* Antigravity Background Layer */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50">
        <Antigravity 
          count={500} 
          magnetRadius={12} 
          ringRadius={15} 
          waveSpeed={0.5} 
          waveAmplitude={2} 
          particleSize={1.5} 
          lerpSpeed={0.08} 
          color="#C5A028" 
          autoAnimate={false} 
          particleVariance={2} 
          rotationSpeed={0.02} 
          depthFactor={1.5} 
          pulseSpeed={3} 
          particleShape="capsule" 
          fieldStrength={25} 
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="luxury-card p-12 md:p-20 max-w-2xl mx-auto border border-primary/20 bg-primary/5 backdrop-blur-sm"
        >
          <div className="w-20 h-20 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-8 text-primary border border-primary/30">
            <Hammer size={40} className="animate-pulse" />
          </div>
          
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-xs block mb-4"
          >
            Visual Experience
          </motion.span>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl md:text-6xl font-serif font-bold text-white mb-6"
          >
            Page Under <span className="text-primary italic">Construction</span>
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4 }}
            className="text-white/50 text-lg leading-relaxed mb-8"
          >
            We are currently curating an exclusive collection of high-definition visuals for our luxury developments. 
            This gallery will be available soon with a new immersive experience.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="inline-block"
          >
            <div className="h-[1px] w-24 bg-primary/50 mx-auto mb-4"></div>
            <p className="text-primary/70 font-serif italic text-sm tracking-widest uppercase">Coming Soon</p>
          </motion.div>
        </motion.div>
      </div>
    </div>
  );
};

export default Gallery;
