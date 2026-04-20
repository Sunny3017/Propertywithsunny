import React from 'react';
import Hero from '../components/Hero';
import Amenities from '../components/Amenities';
import PropertyHighlights from '../components/PropertyHighlights';
import Testimonials from '../components/Testimonials';
import SEO from '../components/SEO';
import { motion } from 'framer-motion';

const Home = () => {
  const schema = {
    "@context": "https://schema.org",
    "@type": "RealEstateAgent",
    "name": "Green Villa 1 | PropertyWithSunny",
    "image": "https://propertywithsunny.com/logo1.png",
    "url": "https://propertywithsunny.com",
    "telephone": "+918826943792",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sector 16, Greater Noida West (Noida Extension)",
      "addressLocality": "Greater Noida West",
      "addressRegion": "Uttar Pradesh",
      "addressCountry": "India"
    },
    "sameAs": [
      "https://facebook.com/propertywithsunny",
      "https://instagram.com/propertywithsunny",
      "https://linkedin.com/company/propertywithsunny"
    ]
  };

  return (
    <div className="bg-luxury-black">
      <SEO 
        title="Home" 
        description="Discover luxury villas, premium plots, and modern flats with PropertyWithSunny. Your destination for exclusive real estate." 
        url="/"
        schema={schema}
      />
      <Hero />
      <PropertyHighlights />
      <Amenities />
      <Testimonials />
      
      {/* Map Section */}
      <section className="h-[500px] w-full bg-luxury-gray relative overflow-hidden">
        <iframe 
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3502.457050575407!2d77.44791997554198!3d28.616060875673718!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390cefb131cdeb25%3A0x52e4daabe3df56f8!2sGreen%20Villa-%201!5e0!3m2!1sen!2sin!4v1775653620204!5m2!1sen!2sin" 
          width="100%" 
          height="100%" 
          style={{ border: 0, filter: 'grayscale(1) invert(0.9) contrast(1.2)' }} 
          allowFullScreen="" 
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
        <div className="absolute inset-0 pointer-events-none border-y border-white/10 shadow-[inset_0_0_100px_rgba(0,0,0,0.5)]"></div>
      </section>
    </div>
  );
};

export default Home;
