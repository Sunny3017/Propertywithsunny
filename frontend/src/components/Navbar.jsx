import React, { useState, useEffect, useMemo } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, Phone, Crown, ChevronDown } from 'lucide-react';
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

          {/* Center Navigation - GooeyNav (Exactly as before for large screens) */}
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

          {/* Book Now - Right (Exactly as before for large screens) */}
          <div className="hidden md:flex items-center z-10">
            <Magnet padding={50} magnetStrength={8}>
              <Link to="/book-now" className="btn-primary !py-3 !px-10 text-[12px] uppercase tracking-widest font-bold hover:shadow-[0_0_30px_rgba(197,160,89,0.3)] transition-all duration-500 block">
                Book Now
              </Link>
            </Magnet>
          </div>

          {/* Mobile Menu Button - Premium Style (Only visible on mobile) */}
          <div className="lg:hidden flex items-center z-10">
            <button 
              onClick={() => setIsOpen(!isOpen)} 
              className="relative w-11 h-11 flex items-center justify-center rounded-full border border-white/20 bg-white/5 backdrop-blur-sm hover:border-[#C5A028]/50 hover:bg-white/10 transition-all duration-300"
            >
              {isOpen ? <X size="20" className="text-[#C5A028]" /> : <Menu size="20" className="text-white" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation Menu - Premium Design (Only for mobile) */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
            className="lg:hidden bg-luxury-gray border-t border-[#C5A028]/20 overflow-hidden shadow-2xl"
          >
            <div className="px-6 pt-6 pb-8 space-y-1">
              {/* Premium Header for Mobile */}
              <div className="flex items-center justify-between pb-4 mb-2 border-b border-white/10">
                <span className="text-[#C5A028] text-[10px] tracking-[0.3em] uppercase font-light">Menu</span>
                <div className="flex items-center gap-2">
                  <div className="w-px h-3 bg-white/20"></div>
                  <Phone size="10" className="text-[#C5A028]/60" />
                  <span className="text-white/40 text-[9px] tracking-wide">+91 88269 43792</span>
                </div>
              </div>
              
              {/* Navigation Links */}
              {navLinks.map((link, idx) => (
                <motion.div
                  key={link.name}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                >
                  <Link
                    to={link.path}
                    onClick={() => setIsOpen(false)}
                    className={`flex items-center justify-between px-4 py-4 rounded-sm transition-all duration-300 ${
                      location.pathname === link.path 
                        ? 'bg-[#C5A028]/10 text-[#C5A028] border-l-2 border-[#C5A028]' 
                        : 'text-white/70 hover:text-white hover:bg-white/5'
                    }`}
                  >
                    <span className="font-light tracking-wide text-sm uppercase">{link.name}</span>
                    {location.pathname === link.path && <ChevronDown size="14" className="rotate-[-90deg]" />}
                  </Link>
                </motion.div>
              ))}
              
              {/* Mobile Book Now Button - Premium */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="pt-6 mt-4"
              >
                <Link
                  to="/book-now"
                  onClick={() => setIsOpen(false)}
                  className="flex items-center justify-center gap-3 w-full py-4 bg-gradient-to-r from-[#C5A028] to-[#D4AF37] rounded-sm text-black font-bold text-sm uppercase tracking-wider transition-all duration-300 hover:shadow-[0_0_30px_rgba(197,160,40,0.3)]"
                >
                  <Crown size="16" />
                  Book Site Visit
                </Link>
              </motion.div>
              
              {/* Premium Footer Text */}
              <div className="text-center pt-6">
                <span className="text-white/20 text-[7px] tracking-[0.2em] uppercase">Green Haven — Sector 16B, Noida Extension</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

export default Navbar;