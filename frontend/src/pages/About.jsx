import React from 'react';
import { motion } from 'framer-motion';
import SEO from '../components/SEO';

const About = () => {
  return (
    <div className="bg-luxury-black min-h-screen">
      <SEO 
        title="About Sunny - Real Estate Agent" 
        description="Meet Sunny, a trusted real estate agent specializing in premium villas and luxury properties in Green Villa-I and across Delhi NCR." 
        url="/about"
      />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-10 bg-black/50"></div>
        <img 
          src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&q=80&w=2000" 
          alt="About Sunny" 
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="relative z-20 text-center space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-sm"
          >
            About Me
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white"
          >
            Meet <span className="text-primary italic">Sunny</span>
          </motion.h1>
        </div>
      </section>

      {/* Content Section */}
      <section className="py-24 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col lg:flex-row items-center gap-16">

          {/* Left Content */}
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 space-y-8"
          >
            <h2 className="text-4xl font-serif font-bold text-white leading-tight">
              Turning Dreams Into <br />
              <span className="text-primary italic">Luxury Homes</span>
            </h2>

            <p className="text-white/60 text-lg leading-relaxed">
              I am Sunny, a dedicated real estate agent currently working with premium residential projects like <span className="text-primary font-medium">Green Villa-I</span>. My focus is on helping clients find the perfect luxury villas and investment opportunities in Delhi NCR.
            </p>

            <p className="text-white/60 text-lg leading-relaxed">
              With deep market knowledge and a client-first approach, I ensure smooth and transparent deals. Whether you're buying your dream home or looking for a profitable investment, I guide you at every step with honesty and expertise.
            </p>

            <p className="text-white/60 text-lg leading-relaxed">
              The projects I represent are developed by trusted builders and companies known for quality construction and modern design. My goal is to connect you with the best properties that match your lifestyle and vision.
            </p>
          </motion.div>

          {/* Right Image */}
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="w-full lg:w-1/2 relative"
          >
            <div className="aspect-[4/5] rounded-2xl overflow-hidden border border-white/10">
              <img 
                src="https://images.unsplash.com/photo-1577415124269-fc1140a69e91?auto=format&fit=crop&q=80&w=1000" 
                alt="Luxury Property" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="absolute -bottom-10 -left-10 w-64 h-64 bg-primary/10 rounded-2xl backdrop-blur-3xl -z-10"></div>
          </motion.div>

        </div>
      </section>
    </div>
  );
};

export default About;