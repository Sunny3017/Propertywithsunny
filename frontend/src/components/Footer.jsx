import React from "react";
import { Link } from "react-router-dom";
import { Twitter, Linkedin, MapPin, Phone, Mail, Facebook, Instagram } from "lucide-react";
import logo from '../assets/logo1.png';

const Footer = () => {
  return (
    <footer className="bg-black border-t border-white/10 pt-20 pb-10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">

          {/* Brand */}
          <div className="space-y-6">
            <Link
              to="/"
              className="inline-block group"
            >
              <img src={logo} alt="PropertyWithSunny Logo" className="h-32 w-auto object-contain transition-transform group-hover:scale-105" />
            </Link>

            <p className="text-white/60 text-sm leading-relaxed">
              Redefining luxury living with exclusive properties. Experience
              premium lifestyle with modern architecture and elegance.
            </p>

            {/* Social Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-white/40 hover:text-yellow-500 transition">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-yellow-500 transition">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-yellow-500 transition">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-white/40 hover:text-yellow-500 transition">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Quick Links */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-semibold text-white">
              Quick Links
            </h3>
            <ul className="space-y-4">
              <li><Link to="/" className="text-white/60 hover:text-yellow-500 text-sm">Home</Link></li>
              <li><Link to="/about" className="text-white/60 hover:text-yellow-500 text-sm">About Us</Link></li>
              <li><Link to="/floor-plan" className="text-white/60 hover:text-yellow-500 text-sm">Floor Plan</Link></li>
              <li><Link to="/gallery" className="text-white/60 hover:text-yellow-500 text-sm">Gallery</Link></li>
            </ul>
          </div>

          {/* Properties */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-semibold text-white">
              Properties
            </h3>
            <ul className="space-y-4">
              <li><Link to="/price-list" className="text-white/60 hover:text-yellow-500 text-sm">Villas</Link></li>
              <li><Link to="/price-list" className="text-white/60 hover:text-yellow-500 text-sm">Plots</Link></li>
              <li><Link to="/price-list" className="text-white/60 hover:text-yellow-500 text-sm">Luxury Flats</Link></li>
              <li><Link to="/site-plan" className="text-white/60 hover:text-yellow-500 text-sm">Site Plan</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div className="space-y-6">
            <h3 className="text-lg font-serif font-semibold text-white">
              Contact Info
            </h3>

            <ul className="space-y-4">

              <li className="flex items-start space-x-3">
                <MapPin className="text-yellow-500 mt-1" size={18} />
                <span className="text-white/60 text-sm">
                  Sector 16B, Noida Extension (Greater Noida West)
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Phone className="text-yellow-500" size={18} />
                <span className="text-white/60 text-sm">
                  +91 88269 43792
                </span>
              </li>

              <li className="flex items-center space-x-3">
                <Mail className="text-yellow-500" size={18} />
                <span className="text-white/60 text-sm">
                  info@propertywithsunny.com
                </span>
              </li>

            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="mt-20 pt-8 border-t border-white/10 text-center">
          <p className="text-white/40 text-xs">
            © {new Date().getFullYear()} PropertyWithSunny. All Rights Reserved.
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;