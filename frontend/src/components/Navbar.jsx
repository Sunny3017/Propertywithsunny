import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import logo from '../assets/logo1.png';
import GooeyNav from './GooeyNav';
import Magnet from './Magnet';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'About', path: '/about' },
    { name: 'Site Plan', path: '/site-plan' },
    { name: 'Price List', path: '/price-list' },
    { name: 'Gallery', path: '/gallery' },
  ];

  const gooeyItems = useMemo(() => 
    navLinks.map(link => ({ label: link.name, href: link.path })), 
  [navLinks]);

  const initialActiveIndex = useMemo(() => {
    const index = navLinks.findIndex(link => link.path === location.pathname);
    return index !== -1 ? index : 0;
  }, [location.pathname, navLinks]);

  return (
    <nav className={`fixed w-full z-50 transition-all duration-500 ${scrolled ? 'bg-luxury-black/95 backdrop-blur-xl py-2 border-b border-white/10 shadow-2xl' : 'bg-transparent py-6'}`}>
      <div className="max-w-[1600px] mx-auto px-6 sm:px-10 lg:px-16 xl:px-24">
        <div className="flex justify-between items-center relative h-20">
          
          {/* Logo - Left */}
          <div className="flex-shrink-0 z-10 flex items-center h-full">
            <Link to="/" className="group inline-block">
              <img 
                src={logo} 
                alt="PropertyWithSunny Logo" 
                className={`transition-all duration-500 object-contain group-hover:scale-105 ${scrolled ? 'h-16' : 'h-24'}`} 
              />
            </Link>
          </div>

          
          <div className="hidden lg:flex items-center absolute left-1/2 -translate-x-1/2 h-full">
            <GooeyNav 
              items={gooeyItems} 
              particleCount={12} 
              particleDistances={[60, 5]} 
              particleR={80} 
              initialActiveIndex={initialActiveIndex} 
              animationTime={500} 
              timeVariance={200} 
              colors={[1, 2, 3, 1, 2]} 
            />
          </div>

          {/* Book Now - Right */}
          <div className="hidden md:flex items-center z-10">
            <Magnet padding={50} magnetStrength={8}>
              <Link to="/book-now" className="btn-primary !py-3 !px-10 text-[12px] uppercase tracking-widest font-bold hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all duration-500 block">
                Book Now
              </Link>
            </Magnet>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center z-10">
            <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 hover:text-primary transition-colors">
              {isOpen ? <X size={32} /> : <Menu size={32} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Nav */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-luxury-gray border-b border-white/10 overflow-hidden"
          >
            <div className="px-4 pt-2 pb-6 space-y-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
                  className="block px-3 py-4 text-base font-medium text-white/80 hover:text-primary border-b border-white/5"
                >
                  {link.name}
                </Link>
              ))}
              <Link
                to="/book-now"
                onClick={() => setIsOpen(false)}
                className="block w-full text-center mt-6 btn-primary"
              >
                Book Now
              </Link>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;
