import React from 'react';
import { BrowserRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './pages/Home';
import About from './pages/About';
import FloorPlan from './pages/FloorPlan';
import SitePlan from './pages/SitePlan';
import PriceList from './pages/PriceList';
import Gallery from './pages/Gallery';
import BookNow from './pages/BookNow';
import AdminPanel from './components/AdminPanel';
import { Toaster } from 'react-hot-toast';
import ClickSpark from './components/ClickSpark';

// Scroll to top on route change
const ScrollToTop = () => {
  const { pathname } = useLocation();

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
};

// WhatsApp Button Component
const WhatsAppButton = () => {
  const [isHovered, setIsHovered] = React.useState(false);
  
  const phoneNumber = "918826943792";
  const message = encodeURIComponent("Hi, what services do you have?");
  // Standard wa.me link with encoded message
  const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;

  return (
    <a
      href={whatsappUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="fixed bottom-6 right-6 z-50 group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      aria-label="Chat on WhatsApp"
    >
      {/* Tooltip */}
      <div className={`absolute bottom-full right-0 mb-3 transition-all duration-300 ${
        isHovered ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-2 pointer-events-none'
      }`}>
        <div className="bg-gray-900 text-white text-sm px-3 py-1.5 rounded-lg whitespace-nowrap shadow-lg">
          Chat with us on WhatsApp
          <div className="absolute bottom-0 right-4 translate-y-1/2 rotate-45 w-2 h-2 bg-gray-900"></div>
        </div>
      </div>

      {/* Button */}
      <div className="relative">
        {/* Pulse animation */}
        <div className="absolute inset-0 rounded-full bg-[#25D366] animate-ping opacity-40"></div>
        
        {/* Main button */}
        <div className="relative bg-[#25D366] hover:bg-[#1ebe5d] text-white rounded-full w-14 h-14 flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl">
          <svg 
            viewBox="0 0 32 32" 
            className="w-7 h-7 fill-current"
          >
            <path d="M16.004 3.002a12.94 12.94 0 0 0-11.27 18.96L3 29l7.215-1.69A12.94 12.94 0 1 0 16.004 3.002zm0 2.31a10.63 10.63 0 1 1 0 21.26 10.52 10.52 0 0 1-5.705-1.66l-.41-.245-4.28.997.916-4.182-.266-.43A10.56 10.56 0 0 1 16.004 5.31zm-5.793 6.268c-.142 0-.367.052-.56.257-.195.208-.734.716-.734 1.747 0 1.028.75 2.02.855 2.156.105.137 1.465 2.236 3.55 3.04 1.659.655 1.996.525 2.355.494.36-.03 1.159-.474 1.324-.934.164-.46.164-.854.115-.934-.049-.08-.182-.128-.382-.224-.2-.097-1.159-.57-1.34-.635-.182-.064-.314-.097-.447.098-.133.196-.512.635-.628.765-.115.13-.23.147-.43.05-.2-.097-.844-.312-1.607-.995-.594-.53-.996-1.185-1.113-1.384-.115-.196-.012-.302.086-.398.088-.087.2-.23.3-.345.1-.115.133-.196.2-.328.066-.133.033-.246-.017-.345-.05-.098-.447-1.084-.613-1.484-.165-.398-.33-.343-.46-.343z" />
          </svg>
        </div>
      </div>

      {/* Optional badge */}
      <div className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center animate-bounce">
        !
      </div>
    </a>
  );
};

function App() {
  return (
    <Router>
      <ScrollToTop />
      <ClickSpark
        sparkColor='#C5A028'
        sparkSize={10}
        sparkRadius={15}
        sparkCount={8}
        duration={400}
      >
        <div className="min-h-screen bg-luxury-black text-luxury-white">
          <Navbar />
          <main>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/floor-plan" element={<FloorPlan />} />
              <Route path="/site-plan" element={<SitePlan />} />
              <Route path="/price-list" element={<PriceList />} />
              <Route path="/gallery" element={<Gallery />} />
              <Route path="/book-now" element={<BookNow />} />
              <Route path="/admin" element={<AdminPanel />} />
            </Routes>
          </main>
          <Footer />
          
          {/* WhatsApp Button */}
          <WhatsAppButton />
          
          <Toaster position="bottom-right" />
        </div>
      </ClickSpark>
    </Router>
  );
}

export default App;