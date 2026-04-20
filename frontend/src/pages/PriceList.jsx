import React from 'react';
import { motion } from 'framer-motion';
import { Check, Download, Info } from 'lucide-react';
import SEO from '../components/SEO';
import { Link } from 'react-router-dom';
import brochurePdf from '../assets/green villa brochure final for approval (1).pdf';

const prices = [
  { 
    type: 'Duplex Villa', 
    config: '70 Sq. Yards | 3 BHK', 
    area: '70 Sq. Yards', 
    price: '₹85 Lakhs*', 
    status: 'Ready to Move',
    features: ['Negotiable', 'Attached Washrooms', 'Balcony & Terrace']
  },
  { 
    type: 'Duplex Villa', 
    config: '75 Sq. Yards | 3 BHK', 
    area: '75 Sq. Yards', 
    price: '₹90 Lakhs*', 
    status: 'Ready to Move',
    features: ['Negotiable', 'Spacious Design', 'Modern Architecture']
  },
  { 
    type: 'Duplex Villa', 
    config: '80 Sq. Yards | 3 BHK', 
    area: '80 Sq. Yards', 
    price: '₹1 Crore*', 
    status: 'Limited Units',
    features: ['Negotiable', 'Premium Location', 'Luxury Finishing']
  },
  { 
    type: 'Duplex Villa', 
    config: '100 Sq. Yards | 4 BHK', 
    area: '100 Sq. Yards', 
    price: '₹1.25 Crore*', 
    status: 'Premium Choice',
    features: ['Negotiable', 'Private Terrace', 'High ROI']
  },
  { 
    type: 'Duplex Villa', 
    config: '110 Sq. Yards | 4 BHK', 
    area: '110 Sq. Yards', 
    price: '₹1.40 Crore*', 
    status: 'Luxury Living',
    features: ['Negotiable', 'Corner Plot', 'Largest Layout']
  },
];

const PriceList = () => {
  return (
    <div className="bg-luxury-black min-h-screen pt-32 pb-20">
      <SEO 
        title="Price List" 
        description="View our transparent pricing for luxury duplex villas. All prices negotiable. Investment opportunities in the heart of the city." 
        url="/price-list"
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16 space-y-4">
          <motion.span 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-primary font-medium tracking-[0.3em] uppercase text-xs"
          >
            Investment Portfolio
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-5xl md:text-7xl font-serif font-bold text-white"
          >
            Price <span className="text-primary italic">List</span>
          </motion.h1>
          <p className="max-w-2xl mx-auto text-white/50 text-sm">
            Discover the value of premium living. Our transparent pricing ensures you make an informed investment in your future sanctuary.
          </p>
        </div>

        {/* Negotiable Banner */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8 bg-primary/10 border border-primary/30 rounded-xl p-4 text-center"
        >
          <p className="text-primary font-medium text-sm uppercase tracking-wider">
            ✨ All Prices are Negotiable | Contact us for best deals ✨
          </p>
        </motion.div>

        <div className="overflow-x-auto luxury-card border-none">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-white/40 font-medium">Property Type</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-white/40 font-medium">Configuration</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-white/40 font-medium">Super Area</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-white/40 font-medium">Starting Price</th>
                <th className="px-8 py-6 text-xs uppercase tracking-widest text-white/40 font-medium text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {prices.map((item, index) => (
                <motion.tr 
                  key={index}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className="hover:bg-white/5 transition-colors group"
                >
                  <td className="px-8 py-8">
                    <div className="text-white font-serif font-bold text-lg">{item.type}</div>
                    <div className="flex items-center space-x-2 mt-2">
                      <span className="text-[10px] bg-primary/10 text-primary px-2 py-0.5 rounded border border-primary/20 uppercase tracking-tighter">
                        {item.status}
                      </span>
                      <span className="text-[10px] bg-green-500/10 text-green-400 px-2 py-0.5 rounded border border-green-500/20 uppercase tracking-tighter">
                        Negotiable
                      </span>
                    </div>
                   </td>
                  <td className="px-8 py-8">
                    <div className="text-white/70 text-sm">{item.config}</div>
                    <div className="flex flex-wrap gap-2 mt-3">
                      {item.features.slice(0, 2).map((f, i) => (
                        <div key={i} className="flex items-center text-[10px] text-white/30 italic">
                          <Check size={10} className="mr-1 text-primary" /> {f}
                        </div>
                      ))}
                    </div>
                   </td>
                  <td className="px-8 py-8 text-white/60 font-medium">{item.area}</td>
                  <td className="px-8 py-8">
                    <div className="text-primary font-serif font-bold text-xl">{item.price}</div>
                    <div className="text-[10px] text-white/20 mt-1">*Excluding taxes & fees</div>
                   </td>
                  <td className="px-8 py-8 text-right">
                    <Link to="/book-now" className="btn-primary !py-2 !px-6 text-xs whitespace-nowrap">
                      Inquire Now
                    </Link>
                   </td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="mt-12 flex flex-col md:flex-row justify-between items-center gap-6 p-8 bg-white/5 rounded-2xl border border-white/10">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center text-primary">
              <Info size={24} />
            </div>
            <div>
              <p className="text-white font-medium">Detailed Price Breakdown</p>
              <p className="text-white/40 text-xs">Download the complete cost sheet including all hidden charges.</p>
            </div>
          </div>
          <a 
            href={brochurePdf} 
            target="_blank" 
            rel="noopener noreferrer" 
            className="flex items-center space-x-2 text-primary hover:text-white transition-colors group"
          >
            <Download size={20} className="group-hover:translate-y-0.5 transition-transform" />
            <span className="font-bold uppercase tracking-widest text-xs">Download Brochure</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default PriceList;