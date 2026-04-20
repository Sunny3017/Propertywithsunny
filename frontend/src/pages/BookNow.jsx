import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, Phone, MessageSquare, CheckCircle2 } from 'lucide-react';
import SEO from '../components/SEO';
import api from '../services/api';
import { toast } from 'react-hot-toast';
import Ballpit from '../components/Ballpit';

class EB extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false };
  }
  static getDerivedStateFromError() {
    return { hasError: true };
  }
  componentDidCatch() {}
  render() {
    if (this.state.hasError) return null;
    return this.props.children;
  }
}

const BookNow = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    propertyType: 'Villa',
    message: ''
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      await api.post('/leads', formData);
      setSubmitted(true);
      toast.success('Your interest has been recorded!');
    } catch (error) {
      toast.error(error.response?.data?.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  if (submitted) {
    return (
      <div className="relative min-h-screen pt-32 pb-20 flex items-center justify-center px-4 overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <EB>
            <Ballpit
              className="w-full h-full pointer-events-none"
              count={100}
              gravity={0.01}
              friction={0.9975}
              wallBounce={0.95}
              followCursor={false}
            />
          </EB>
        </div>
        <SEO 
          title="Thank You" 
          description="Your inquiry has been received. Our luxury consultants will contact you shortly." 
          url="/book-now"
        />
        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          className="luxury-card max-w-lg w-full p-12 text-center backdrop-blur-md bg-white/10"
        >
          <div className="w-20 h-20 bg-primary/20 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 size={48} className="text-primary" />
          </div>
          <h2 className="text-3xl font-serif font-bold text-white mb-4">Thank You!</h2>
          <p className="text-white/60 mb-8 leading-relaxed">
            Your request has been received. One of our luxury consultants will contact you shortly to guide you through your journey.
          </p>
          <button 
            onClick={() => setSubmitted(false)}
            className="btn-primary w-full"
          >
            Send Another Inquiry
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="relative min-h-screen pt-32 pb-20 px-4 overflow-hidden">
      <div className="absolute inset-0 pointer-events-none">
        <EB>
          <Ballpit
            className="w-full h-full pointer-events-none"
            count={100}
            gravity={0.01}
            friction={0.9975}
            wallBounce={0.95}
            followCursor={false}
          />
        </EB>
      </div>
      <SEO 
        title="Book Now" 
        description="Reserve your place in luxury. Inquire about our exclusive villas, plots, and flats today." 
        url="/book-now"
      />
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-16">
        {/* Contact Info */}
        <div className="w-full lg:w-1/2 space-y-12">
          <div>
            <span className="text-primary font-medium tracking-[0.2em] uppercase text-xs">Reserve Your Place</span>
            <h1 className="text-5xl md:text-7xl font-serif font-bold text-white mt-4 leading-tight">
              Begin Your <br />
              <span className="text-primary italic">Luxury Journey</span>
            </h1>
            <p className="text-white/50 mt-6 text-lg leading-relaxed">
              Step into a world of elegance. Provide your details, and let us help you find the perfect sanctuary that matches your lifestyle.
            </p>
          </div>

          <div className="space-y-8">
            <div className="flex items-center space-x-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                <Phone size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">Call Us Directly</p>
                <p className="text-white text-xl font-serif font-semibold">+91 88269 43792</p>
              </div>
            </div>

            <div className="flex items-center space-x-6 group">
              <div className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-primary group-hover:bg-primary/20 group-hover:border-primary/30 transition-all">
                <MessageSquare size={24} />
              </div>
              <div>
                <p className="text-white/40 text-xs uppercase tracking-widest mb-1">WhatsApp Chat</p>
                <a 
                  href={`https://wa.me/918826943792?text=${encodeURIComponent("Hi, I want to inquire about a property. What services do you provide?")}`}
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="text-primary text-xl font-serif font-semibold hover:underline"
                >
                  Start a Conversation
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="w-full lg:w-1/2">
          <motion.div 
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            className="luxury-card p-10 lg:p-12 backdrop-blur-md bg-white/10"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Full Name</label>
                  <input 
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary/50 focus:outline-none transition-colors"
                    placeholder="Enter your name"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-xs uppercase tracking-widest text-white/40">Phone Number</label>
                  <input 
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    required
                    className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary/50 focus:outline-none transition-colors"
                    placeholder="+91 98765 43210"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Email Address</label>
                <input 
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="your@email.com"
                />
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Property Type</label>
                <select 
                  name="propertyType"
                  value={formData.propertyType}
                  onChange={handleChange}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary/50 focus:outline-none transition-colors appearance-none"
                >
                  <option value="Villa" className="bg-luxury-black">Luxury Villa</option>
                  <option value="Plot" className="bg-luxury-black">Premium Plot</option>
                  <option value="Flat" className="bg-luxury-black">Luxury Flat / Penthouse</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-xs uppercase tracking-widest text-white/40">Your Message (Optional)</label>
                <textarea 
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="4"
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-4 text-white focus:border-primary/50 focus:outline-none transition-colors"
                  placeholder="Tell us about your requirements..."
                ></textarea>
              </div>

              <button 
                type="submit" 
                disabled={loading}
                className="btn-primary w-full flex items-center justify-center space-x-2 py-5"
              >
                {loading ? (
                  <div className="w-6 h-6 border-2 border-luxury-black/30 border-t-luxury-black rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Submit Inquiry</span>
                    <Send size={18} />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default BookNow;
