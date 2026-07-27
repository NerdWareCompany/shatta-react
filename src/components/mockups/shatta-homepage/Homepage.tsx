import React, { useState, useEffect, useRef } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { QuickBuyModal } from './layout/QuickBuyModal';
import { Search, Heart, User, ShoppingCart, Store, Truck, RefreshCw, Phone, Instagram, Facebook, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, AnimatePresence, useInView } from 'framer-motion';

const NumberCounter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });

  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeProgress * (to - from) + from);
        node.textContent = current.toString();
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
};

export function Homepage() {
  const [timeLeft, setTimeLeft] = useState({
    hours: 2,
    minutes: 14,
    seconds: 36,
  });

  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
        if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        if (prev.hours > 0) return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        return prev;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatNumber = (num: number) => num.toString().padStart(2, '0');

  const categories = [
    { name: 'Bedroom', img: 'https://api.shatta.com/storage/3253/pouf-108.jpg' },
    { name: 'Bathroom', img: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg' },
    { name: 'Curtains', img: 'https://api.shatta.com/storage/4452/lehaf_100-(1).jpg' },
    { name: 'Beach', img: 'https://api.shatta.com/storage/4367/lehaf_205-(1).jpg' },
    { name: 'Rugs', img: 'https://api.shatta.com/storage/298/CUSH1_495.jpg' },
    { name: 'Kitchen', img: 'https://api.shatta.com/storage/298/CUSH1_495.jpg' },
    { name: 'Decor', img: 'https://api.shatta.com/storage/3277/pouf-57_L.jpg' },
    { name: 'Bridal', img: 'https://api.shatta.com/storage/3228/pouf-176.jpg' },
  ];

  const newArrivals = [
    { name: 'Signature Sateen Duvet Cover', category: 'BEDROOM', price: 'EGP 3,450', img: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg' },
    { name: 'Linen Blend Throw Blanket', category: 'LIVING', price: 'EGP 1,250', img: 'https://api.shatta.com/storage/3235/pouf-157_L.jpg' },
    { name: 'Plush Egyptian Towel Set', category: 'BATH', price: 'EGP 1,800', img: 'https://api.shatta.com/storage/3252/pouf-108_L.jpg' },
    { name: 'Ceramic Table Lamp', category: 'DECOR', price: 'EGP 2,100', img: 'https://api.shatta.com/storage/4483/lehaf_109_L.webp' },
    { name: 'Velvet Accent Cushion', category: 'DECOR', price: 'EGP 850', img: 'https://api.shatta.com/storage/3231/pouf-173_L.jpg' },
    { name: 'Hotel Collection Sheets', category: 'BEDROOM', price: 'EGP 4,200', img: 'https://api.shatta.com/storage/3256/pouf-104_L-(1).jpg' },
    { name: 'Marble Bathroom Set', category: 'BATH', price: 'EGP 1,450', img: 'https://api.shatta.com/storage/3245/pouf-146.jpg' },
    { name: 'Handwoven Jute Rug', category: 'RUGS', price: 'EGP 5,600', img: 'https://api.shatta.com/storage/4455/lehaf_104_L.jpg' },
  ];

  const bestSellers = [
    { name: 'Classic Silk Pillowcase', category: 'BEDROOM', price: 'EGP 1,150', img: 'https://api.shatta.com/storage/3253/pouf-108.jpg' },
    { name: 'Woven Storage Basket', category: 'DECOR', price: 'EGP 650', img: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg' },
    { name: 'Aromatherapy Diffuser', category: 'LIVING', price: 'EGP 1,400', img: 'https://api.shatta.com/storage/4452/lehaf_100-(1).jpg' },
    { name: 'Organic Cotton Robe', category: 'BATH', price: 'EGP 2,300', img: 'https://api.shatta.com/storage/4367/lehaf_205-(1).jpg' },
    { name: 'Linen Throw Pillow', category: 'DECOR', price: 'EGP 750', img: 'https://api.shatta.com/storage/298/CUSH1_495.jpg' },
    { name: 'Egyptian Cotton Towel', category: 'BATH', price: 'EGP 450', img: 'https://api.shatta.com/storage/3277/pouf-57_L.jpg' },
    { name: 'Wooden Soap Dispenser', category: 'BATH', price: 'EGP 350', img: 'https://api.shatta.com/storage/3228/pouf-176.jpg' },
    { name: 'Wool Area Rug', category: 'RUGS', price: 'EGP 6,200', img: 'https://api.shatta.com/storage/3235/pouf-157_L.jpg' },
  ];

  const trendingProducts = [
    { name: 'Modern Floor Lamp', category: 'DECOR', price: 'EGP 4,100', img: 'https://api.shatta.com/storage/3252/pouf-108_L.jpg' },
    { name: 'Boho Wall Hanging', category: 'DECOR', price: 'EGP 950', img: 'https://api.shatta.com/storage/4483/lehaf_109_L.webp' },
    { name: 'Luxury Bath Mat', category: 'BATH', price: 'EGP 500', img: 'https://api.shatta.com/storage/3231/pouf-173_L.jpg' },
    { name: 'Bamboo Serving Tray', category: 'KITCHEN', price: 'EGP 800', img: 'https://api.shatta.com/storage/3256/pouf-104_L-(1).jpg' },
    { name: 'Scented Candle Set', category: 'DECOR', price: 'EGP 600', img: 'https://api.shatta.com/storage/3245/pouf-146.jpg' },
    { name: 'Waffle Knit Blanket', category: 'LIVING', price: 'EGP 1,800', img: 'https://api.shatta.com/storage/4455/lehaf_104_L.jpg' },
    { name: 'Ceramic Vase', category: 'DECOR', price: 'EGP 1,200', img: 'https://api.shatta.com/storage/298/CUSH1_495.jpg' },
    { name: 'Cotton Table Runner', category: 'KITCHEN', price: 'EGP 400', img: 'https://api.shatta.com/storage/3253/pouf-108.jpg' },
  ];

  const [activeTab, setActiveTab] = useState('New Arrivals');
  const collectionsData: Record<string, any[]> = {
    'New Arrivals': newArrivals,
    'Best Sellers': bestSellers,
    'Trending': trendingProducts
  };
  const activeProducts = collectionsData[activeTab];

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };

  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#C4A35A] selection:text-white scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
        
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .hide-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>

      <Header />

      {/* 3. Hero Section */}
      <section className="px-4 md:px-6 pt-2 pb-6">
        <div className="relative w-full h-[75vh] md:h-[88vh] bg-[#FFFFFF] overflow-hidden group rounded-[2.5rem] shadow-2xl shadow-black/10">
          <motion.div style={{ y: heroY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <img
              src="/images/shatta-hero.jpg"
              alt="Luxury Egyptian Bedroom"
              className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-105 transition-transform duration-[15s] ease-out"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent"></div>

          <motion.div
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 lg:px-28 max-w-4xl"
          >
            <motion.span variants={fadeUp} className="text-[#C4A35A] text-sm font-medium tracking-[0.2em] mb-4">NEW COLLECTION — SUMMER 2025</motion.span>
            <motion.h2 variants={fadeUp} className="text-white font-serif text-5xl md:text-7xl lg:text-8xl leading-[1.1] mb-6 drop-shadow-lg">
              Where Home<br />Becomes Art
            </motion.h2>
            <motion.p variants={fadeUp} className="text-white/90 text-lg md:text-xl font-light mb-10 max-w-lg drop-shadow-md">
              Premium home furnishings, crafted for Egyptian living since 1988.
            </motion.p>
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4">
              <a href="/preview/shatta-homepage/Shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden group bg-[#C4A35A] text-white px-8 py-4 text-sm font-medium tracking-[0.1em] rounded-full shadow-lg shadow-[#C4A35A]/20"
                >
                  <span className="absolute inset-0 w-full h-full bg-[#B39249] origin-[left] rtl:origin-[right] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"></span>
                  <span className="relative z-10">SHOP NOW</span>
                </motion.button>
              </a>

              <a href="/preview/shatta-homepage/Shop">
                <motion.button
                  whileHover={{ scale: 1.03 }}
                  whileTap={{ scale: 0.97 }}
                  className="relative overflow-hidden group bg-white/10 backdrop-blur-md border border-white/30 text-white px-8 py-4 text-sm font-medium tracking-[0.1em] rounded-full shadow-lg shadow-black/10"
                >
                  <span className="absolute inset-0 w-full h-full bg-white origin-[left] rtl:origin-[right] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"></span>
                  <span className="relative z-10 group-hover:text-[#1A1A1A] transition-colors duration-500">EXPLORE COLLECTIONS</span>
                </motion.button>
              </a>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* 4. Category Icon Row */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-12 px-6"
      >
        <div className="max-w-7xl mx-auto">
          <div className="flex overflow-x-auto hide-scrollbar gap-x-6 md:justify-between pb-6 px-2">
            {categories.map((cat) => (
              <a href="/preview/shatta-homepage/Shop" key={cat.name}>
                <motion.div variants={fadeUp} className="flex flex-col items-center group cursor-pointer min-w-[85px]">
                  <div className="w-[85px] h-[85px] rounded-full overflow-hidden bg-white shadow-md shadow-black/5 border border-transparent group-hover:border-[#C4A35A]/50 group-hover:shadow-xl group-hover:shadow-[#C4A35A]/20 transition-all duration-500 p-1 mb-4">
                    <div className="w-full h-full rounded-full overflow-hidden relative">
                      <img src={cat.img} alt={cat.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                      <div className="absolute inset-0 bg-[#C4A35A]/0 group-hover:bg-[#C4A35A]/10 transition-colors duration-500"></div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium tracking-widest text-[#1A1A1A] uppercase group-hover:text-[#C4A35A] transition-colors">{cat.name}</span>
                </motion.div>
              </a>
            ))}
          </div>
        </div>
      </motion.section>

      {/* 5. Featured Collection Banner */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-4 md:px-8 py-10"
      >
        <div className="bg-[#E8E0D4] rounded-[3rem] flex flex-col md:flex-row overflow-hidden shadow-xl shadow-black/5 relative">
          <div className="absolute top-0 end-0 w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C4A35A]/20 to-transparent opacity-50 blur-3xl pointer-events-none rounded-full rtl:-translate-x-0 rtl:translate-x-reverse translate-x-1/3 -translate-y-1/3"></div>

          <div className="w-full md:w-[55%] h-[400px] md:h-auto overflow-hidden relative rounded-e-[3rem] md:rounded-r-[4rem] z-10">
            <img
              src="/images/shatta-collection.jpg"
              alt="The Summer Linen Edit"
              className="w-full h-full object-cover hover:scale-105 transition-transform duration-[10s] ease-out scale-[1.02]"
            />
          </div>
          <div className="w-full md:w-[45%] p-12 md:p-16 lg:p-24 flex flex-col justify-center relative z-20">
            <span className="text-[#C4A35A] text-sm font-medium tracking-[0.2em] mb-4">FEATURED COLLECTION</span>
            <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.1] mb-6">
              The Summer<br />Linen Edit
            </h2>
            <p className="text-[#1A1A1A]/70 text-base leading-relaxed mb-10 font-light">
              Ultra-soft Egyptian cotton, woven for warmth and breathability. Crafted to outlast seasons with timeless elegance and unmatched comfort.
            </p>
            <a href="/preview/shatta-homepage/Shop" className="inline-flex items-center w-fit text-[#1A1A1A] text-sm font-medium tracking-[0.1em] group relative overflow-hidden pb-2">
              <span className="group-hover:text-[#C4A35A] transition-colors duration-300">SHOP THE COLLECTION</span>
              <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 group-hover:text-[#C4A35A] transition-all duration-300" />
              <span className="absolute bottom-0 start-0 w-full h-[1px] bg-[#1A1A1A] group-hover:bg-[#C4A35A] transition-colors"></span>
              <span className="absolute bottom-0 start-0 w-full h-[2px] bg-[#C4A35A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-[left] rtl:origin-[right] rounded-full"></span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* 6. Flash Sale Strip */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-50px" }}
        variants={fadeUp}
        className="px-4 md:px-8 py-10"
      >
        <div className="bg-[#1A1A1A] rounded-[2.5rem] w-full py-10 px-8 md:px-12 text-white overflow-hidden relative shadow-2xl shadow-black/20">
          <div className="absolute inset-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

          <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-8 relative z-10">
            <div className="flex items-center gap-x-4">
              <motion.span
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                className="text-[#C4A35A] text-3xl"
              >⚡</motion.span>
              <h3 className="font-serif text-3xl md:text-4xl font-medium tracking-wide">Summer Flash Sale</h3>
            </div>

            <div className="flex items-center gap-x-3 md:space-x-5 bg-white/5 backdrop-blur-md px-6 md:px-8 py-4 rounded-3xl border border-white/10 shadow-inner shadow-white/5">
              <div className="flex flex-col items-center min-w-[50px]">
                <motion.span
                  key={timeLeft.hours}
                  initial={{ scale: 0.8, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-sans font-semibold text-2xl md:text-3xl"
                >
                  {formatNumber(timeLeft.hours)}
                </motion.span>
                <span className="text-[10px] text-[#C4A35A] font-medium tracking-[0.2em] mt-1">HRS</span>
              </div>
              <span className="text-white/20 text-3xl font-light pb-4">:</span>
              <div className="flex flex-col items-center min-w-[50px]">
                <motion.span
                  key={timeLeft.minutes}
                  initial={{ scale: 0.8, opacity: 0, y: -10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-sans font-semibold text-2xl md:text-3xl"
                >
                  {formatNumber(timeLeft.minutes)}
                </motion.span>
                <span className="text-[10px] text-[#C4A35A] font-medium tracking-[0.2em] mt-1">MIN</span>
              </div>
              <span className="text-white/20 text-3xl font-light pb-4">:</span>
              <div className="flex flex-col items-center min-w-[50px]">
                <motion.span
                  key={timeLeft.seconds}
                  initial={{ scale: 0.8, opacity: 0, y: 10 }}
                  animate={{ scale: 1, opacity: 1, y: 0 }}
                  transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  className="font-sans font-semibold text-2xl md:text-3xl"
                >
                  {formatNumber(timeLeft.seconds)}
                </motion.span>
                <span className="text-[10px] text-[#C4A35A] font-medium tracking-[0.2em] mt-1">SEC</span>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row items-center gap-6">
              <span className="font-bold text-xl tracking-wider text-center text-[#C4A35A]">UP TO 40% OFF</span>
              <a href="/preview/shatta-homepage/Shop">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white hover:bg-[#FFFFFF] text-[#1A1A1A] px-8 py-4 text-sm font-medium tracking-[0.1em] rounded-full shadow-lg shadow-white/10 transition-colors"
                >
                  SHOP SALE
                </motion.button>
              </a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 7. Collection Tabs Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-white py-24 px-0 md:px-12 rounded-[3rem] mt-10 shadow-[0_-10px_40px_rgba(0,0,0,0.02)] mx-0 md:mx-8 mb-10 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-10 px-6">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8 text-center">Curated Collections</h2>

            {/* Tabs Navigation */}
            <div className="flex overflow-x-auto hide-scrollbar w-full md:w-auto pb-4 gap-6 md:gap-10 border-b border-black/5 snap-x snap-mandatory px-4 md:px-0">
              {Object.keys(collectionsData).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`snap-center shrink-0 pb-4 text-sm md:text-base font-medium tracking-[0.1em] uppercase transition-all relative ${activeTab === tab ? 'text-[#C4A35A]' : 'text-[#1A1A1A]/50 hover:text-[#1A1A1A]'
                    }`}
                >
                  {tab}
                  {activeTab === tab && (
                    <motion.div
                      layoutId="activeTabIndicator"
                      className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#C4A35A]"
                    />
                  )}
                </button>
              ))}
            </div>
          </motion.div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="flex overflow-x-auto md:grid md:grid-cols-4 gap-6 md:gap-x-8 md:gap-y-12 snap-x snap-mandatory px-6 md:px-0 pb-8 hide-scrollbar"
            >
              {activeProducts.map((product, idx) => (
                <a href="/preview/shatta-homepage/ProductDetail" key={`${activeTab}-${idx}`} className="snap-center shrink-0 w-[280px] md:w-auto">
                  <div className="group cursor-pointer flex flex-col h-full">
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#FFFFFF] rounded-3xl mb-5 shadow-sm shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-shadow duration-500 p-2">
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        {idx < 2 && activeTab === 'New Arrivals' && (
                          <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full z-10 shadow-sm">NEW</div>
                        )}
                        {idx === 0 && activeTab === 'Trending' && (
                          <div className="absolute top-3 start-3 bg-[#C4A35A]/90 backdrop-blur-md text-white text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full z-10 shadow-sm">HOT</div>
                        )}
                        <div className="absolute top-3 end-3 z-20">
                          <button
                            onClick={(e) => { e.preventDefault(); /* toggle wishlist logic */ }}
                            className="bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] hover:text-red-500 p-2 rounded-full shadow-sm transition-colors"
                            aria-label="Add to wishlist"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>

                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" />

                        <div className="absolute bottom-3 start-3 end-3 translate-y-0 opacity-100 focus-within:translate-y-0 focus-within:opacity-100 transition-all duration-500 ease-out z-10">
                          <button
                            onClick={(e) => { e.preventDefault(); setSelectedProduct(product); }}
                            className="w-full bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-[#C4A35A] text-white py-3 text-xs font-medium tracking-widest rounded-xl transition-colors shadow-lg"
                          >
                            QUICK ADD
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="px-2">
                      <div className="text-[#C4A35A] text-[10px] font-medium tracking-widest mb-2">{product.category}</div>
                      <h3 className="font-serif text-xl text-[#1A1A1A] leading-snug mb-2 group-hover:text-[#C4A35A] transition-colors">{product.name}</h3>
                      <div className="text-sm text-[#1A1A1A]/70 font-medium">{product.price}</div>
                    </div>
                  </div>
                </a>
              ))}
            </motion.div>
          </AnimatePresence>

          <div className="flex justify-center mt-4">
            <a href="/preview/shatta-homepage/Shop" className="inline-flex items-center text-[#1A1A1A] text-sm font-medium tracking-[0.1em] group relative overflow-hidden pb-2">
              <span className="group-hover:text-[#C4A35A] transition-colors duration-300">VIEW ALL {activeTab.toUpperCase()}</span>
              <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 group-hover:text-[#C4A35A] transition-all duration-300" />
              <span className="absolute bottom-0 start-0 w-full h-[1px] bg-[#1A1A1A] group-hover:bg-[#C4A35A] transition-colors"></span>
              <span className="absolute bottom-0 start-0 w-full h-[2px] bg-[#C4A35A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-[left] rtl:origin-[right] rounded-full"></span>
            </a>
          </div>
        </div>
      </motion.section>

      {/* 8. "Since 1988" Heritage Strip */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-4 md:px-8 py-10"
      >
        <div className="flex flex-col lg:flex-row w-full bg-[#1A1A1A] rounded-[3rem] overflow-hidden shadow-2xl shadow-black/10">
          <div className="w-full lg:w-1/2 text-white p-12 md:p-20 flex flex-col justify-center relative">
            <div className="absolute inset-0 opacity-[0.02] pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
            <motion.div variants={fadeUp} className="relative z-10">
              <h2 className="font-serif text-4xl lg:text-5xl xl:text-6xl leading-[1.1] mb-10">
                35 Years of<br />Egyptian Craftsmanship
              </h2>
              <div className="flex flex-wrap gap-4 mb-10">
                <div className="px-5 py-2.5 border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-medium tracking-wider rounded-full flex items-center gap-2 shadow-inner shadow-white/5">
                  <span className="text-[#C4A35A]"><NumberCounter to={25} />+</span> Branches
                </div>
                <div className="px-5 py-2.5 border border-white/20 bg-white/5 backdrop-blur-sm text-white text-sm font-medium tracking-wider rounded-full flex items-center gap-2 shadow-inner shadow-white/5">
                  <span className="text-[#C4A35A]"><NumberCounter to={500} />K+</span> Customers
                </div>
                <div className="px-5 py-2.5 border border-[#C4A35A]/30 bg-[#C4A35A]/10 backdrop-blur-sm text-[#C4A35A] text-sm font-medium tracking-wider rounded-full flex items-center gap-2">
                  Est. 1988
                </div>
              </div>
              <p className="font-light text-white/70 text-lg leading-relaxed max-w-lg">
                From our first store in Cairo to over 25 branches nationwide, SHATTA has been the trusted name in transforming houses into beautiful homes. We combine heritage weaving techniques with contemporary design to deliver uncompromising quality.
              </p>
            </motion.div>
          </div>
          <div className="w-full lg:w-1/2 h-[500px] lg:h-auto overflow-hidden p-4 lg:p-6 lg:pl-0">
            <img
              src="https://api.shatta.com/storage/535/cush17-542-03.jpg"
              alt="Shatta Home Interior"
              className="w-full h-full object-cover rounded-[2rem] lg:rounded-[2.5rem] hover:scale-105 transition-transform duration-[15s] ease-out grayscale-[20%]"
            />
          </div>
        </div>
      </motion.section>

      {/* 9. Room Inspiration Grid */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-[#FFFFFF] py-24 px-4 md:px-8 mt-10"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-16">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-6 text-center">Room Inspiration</h2>
            <div className="w-12 h-[2px] bg-[#C4A35A] rounded-full"></div>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Card 1 (Tall) */}
            <motion.a href="/preview/shatta-homepage/Shop" variants={fadeUp} className="relative group overflow-hidden h-[400px] md:h-full cursor-pointer rounded-[2.5rem] shadow-lg shadow-black/5 block">
              <img src="https://api.shatta.com/storage/3257/pouf-104-(1).jpg" alt="The Bedroom Edit" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out" />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
              <div className="absolute bottom-0 start-0 p-10 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                <h3 className="font-serif text-4xl text-white mb-4">The Bedroom Edit</h3>
                <span className="flex items-center text-[#C4A35A] text-sm font-medium tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                  EXPLORE <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
                </span>
              </div>
            </motion.a>

            <div className="flex flex-col gap-6">
              {/* Card 2 (Top) */}
              <motion.a href="/preview/shatta-homepage/Shop" variants={fadeUp} className="relative group overflow-hidden h-[300px] md:h-[338px] cursor-pointer rounded-[2.5rem] shadow-lg shadow-black/5 block">
                <img src="https://api.shatta.com/storage/3200/pouf-232_L-(1).jpg" alt="Bathroom Essentials" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 start-0 p-8 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-serif text-3xl text-white mb-3">Bathroom Essentials</h3>
                  <span className="flex items-center text-[#C4A35A] text-sm font-medium tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                    EXPLORE <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
                  </span>
                </div>
              </motion.a>

              {/* Card 3 (Bottom) */}
              <motion.a href="/preview/shatta-homepage/Shop" variants={fadeUp} className="relative group overflow-hidden h-[300px] md:h-[338px] cursor-pointer rounded-[2.5rem] shadow-lg shadow-black/5 block">
                <img src="https://api.shatta.com/storage/513/cush17-742-01.jpg" alt="Beach Collection" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[10s] ease-out" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80"></div>
                <div className="absolute bottom-0 start-0 p-8 w-full transform group-hover:-translate-y-2 transition-transform duration-500">
                  <h3 className="font-serif text-3xl text-white mb-3">Beach Collection</h3>
                  <span className="flex items-center text-[#C4A35A] text-sm font-medium tracking-[0.2em] group-hover:text-white transition-colors duration-300">
                    EXPLORE <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 transition-transform" />
                  </span>
                </div>
              </motion.a>
            </div>
          </div>
        </div>
      </motion.section>

      {/* 10. Trust Signals Strip */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-[#E8E0D4] py-20 px-6 rounded-[3rem] mx-4 md:mx-8 mb-20 shadow-xl shadow-black/5"
      >
        <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          {[
            { icon: Store, title: '25+ Branches', desc: 'Find a store near you' },
            { icon: Truck, title: 'Free Delivery', desc: 'On orders over EGP 3,000' },
            { icon: RefreshCw, title: 'Easy Returns', desc: '30-day return policy' },
            { icon: Phone, title: 'Expert Service', desc: 'Home inspection available' }
          ].map((item, i) => (
            <motion.div variants={fadeUp} key={i} className="flex flex-col items-center text-center group cursor-default">
              <div className="w-16 h-16 rounded-full bg-white flex items-center justify-center mb-6 shadow-md shadow-black/5 group-hover:shadow-xl group-hover:scale-110 transition-all duration-500">
                <item.icon className="w-7 h-7 text-[#C4A35A]" strokeWidth={1.5} />
              </div>
              <h4 className="font-serif text-2xl text-[#1A1A1A] mb-3">{item.title}</h4>
              <p className="text-[#1A1A1A]/70 text-sm font-light">{item.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* 11. Instagram / Lifestyle Feed */}
      <motion.section
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="bg-white py-20 pb-32"
      >
        <motion.div variants={fadeUp} className="text-center mb-12 px-6">
          <h2 className="font-serif text-4xl text-[#C4A35A] mb-3 hover:text-[#1A1A1A] transition-colors cursor-pointer inline-block">@shatta_home</h2>
          <p className="text-[#1A1A1A]/70 text-sm tracking-wide">Follow us on Instagram</p>
        </motion.div>

        <div className="grid grid-cols-2 md:grid-cols-4 px-4 md:px-8 gap-4 pb-8">
          {[
            'https://api.shatta.com/storage/531/cush17-599-02.jpg',
            'https://api.shatta.com/storage/4740/MDF_1009_L.webp',
            'https://api.shatta.com/storage/537/cush17-521-02.jpg',
            'https://api.shatta.com/storage/517/cush17-730-02.jpg'
          ].map((img, i) => (
            <motion.div variants={fadeUp} key={i} className="aspect-square group relative cursor-pointer overflow-hidden rounded-3xl shadow-lg shadow-black/5">
              <img src={img} alt="Instagram" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s] ease-out" />
              <div className="absolute inset-0 bg-[#1A1A1A]/40 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-all duration-500 flex items-center justify-center">
                <Instagram className="w-10 h-10 text-white scale-50 group-hover:scale-100 transition-transform duration-500 delay-100" />
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      <Footer />

      <QuickBuyModal
        isOpen={!!selectedProduct}
        onClose={() => setSelectedProduct(null)}
        product={selectedProduct}
      />
    </div>
  );
}

export default Homepage;
