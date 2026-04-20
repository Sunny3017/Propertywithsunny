import React from 'react';
import { motion } from 'framer-motion';
import ScrollStack, { ScrollStackItem } from './ScrollStackItem';

const testimonials = [
  {
    id: 1,
    initials: "JD",
    name: "John Doe",
    role: "CEO, Global Tech",
    content: "The attention to detail and the sheer luxury of the properties provided by PropertyWithSunny is unmatched. We found our dream home in the heart of Dubai, and the experience was seamless."
  },
  {
    id: 2,
    initials: "AS",
    name: "Anita Sharma",
    role: "Home Owner",
    content: "Building my dream home with Sunny was the best decision. The transparency and quality of work are truly commendable. Highly recommended for premium properties."
  },
  {
    id: 3,
    initials: "RK",
    name: "Rajesh Kumar",
    role: "Investor",
    content: "Excellent ROI and prime locations. PropertyWithSunny understands the market better than anyone else. Great experience from site visit to possession."
  }
];

const Testimonials = () => {
  return (
    <section className="py-24 bg-luxury-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center mb-12">
        <motion.span 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="text-primary font-medium tracking-[0.2em] uppercase text-xs"
        >
          Client Testimonials
        </motion.span>
        <motion.h2 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-4xl md:text-5xl font-serif font-bold text-white mt-4"
        >
          What Our <span className="text-primary italic">Clients Say</span>
        </motion.h2>
      </div>

      <div className="w-[90%] md:w-[80%] mx-auto relative">
        <ScrollStack 
          useWindowScroll={true} 
          itemDistance={100}
          itemStackDistance={15}
          baseScale={0.9}
          itemScale={0.04}
          stackPosition="25%"
          scaleEndPosition="10%"
          blurAmount={0}
          className="relative"
        >
          {testimonials.map((item, index) => (
            <ScrollStackItem key={item.id} itemClassName="luxury-card !h-auto !p-10 border border-white/5 bg-luxury-gray/60 backdrop-blur-xl shadow-2xl">
              <div className="relative">
                <div className="text-primary text-6xl font-serif absolute -top-6 -left-4 opacity-20">"</div>
                <p className="text-white/80 text-lg md:text-xl leading-relaxed mb-10 italic relative z-10">
                  {item.content}
                </p>
                <div className="flex items-center space-x-5">
                  <div className="w-14 h-14 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold text-lg border border-primary/30">
                    {item.initials}
                  </div>
                  <div className="text-left">
                    <h4 className="text-white font-serif font-semibold text-lg">{item.name}</h4>
                    <p className="text-white/40 text-sm tracking-wider uppercase">{item.role}</p>
                  </div>
                </div>
              </div>
            </ScrollStackItem>
          ))}
        </ScrollStack>
      </div>
    </section>
  );
};

export default Testimonials;

