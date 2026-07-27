import React, { useState, useEffect, useRef } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Store, Truck, RefreshCw, Phone, Instagram, Facebook, ArrowRight, Star, Minus, Plus, ChevronDown } from 'lucide-react';
import { motion, useScroll, AnimatePresence } from 'framer-motion';

export function ProductDetail() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isStickyVisible, setIsStickyVisible] = useState(false);
  const atcButtonRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Product States
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState('beige');
  const [selectedSize, setSelectedSize] = useState('Queen');
  const [quantity, setQuantity] = useState(1);
  const [activeAccordion, setActiveAccordion] = useState<string | null>('Description');

  // Recommendation States
  const [fbtSelected, setFbtSelected] = useState<boolean[]>([true, false]);
  const [recentlyViewed, setRecentlyViewed] = useState<any[]>([]);

  useEffect(() => {
    // Mock recently viewed initialization
    const viewed = JSON.parse(localStorage.getItem('shatta_recently_viewed') || '[]');
    setRecentlyViewed(viewed);
    
    // Add current product to recently viewed
    const currentProd = {
      name: 'Nile Cotton Duvet Set',
      price: 'EGP 2,450',
      img: 'https://api.shatta.com/storage/351/CUSH1_220_L.jpg',
      category: 'BEDDING'
    };
    
    if (!viewed.find((p: any) => p.name === currentProd.name)) {
      const updated = [currentProd, ...viewed].slice(0, 5);
      localStorage.setItem('shatta_recently_viewed', JSON.stringify(updated));
    }
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // Show sticky bar when original ATC button is above viewport
        setIsStickyVisible(!entry.isIntersecting && entry.boundingClientRect.top < 0);
      },
      { root: null, rootMargin: '0px 0px -100px 0px', threshold: 0 }
    );
    if (atcButtonRef.current) observer.observe(atcButtonRef.current);
    return () => observer.disconnect();
  }, []);

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

  const images = [
    'https://api.shatta.com/storage/351/CUSH1_220_L.jpg',
    'https://api.shatta.com/storage/418/CUSH2_124.jpg',
    'https://api.shatta.com/storage/289/CUSH1_479.jpg',
    'https://api.shatta.com/storage/527/cush17-652-03.jpg'
  ];

  const colors = [
    { id: 'beige', name: 'Beige', hex: '#DED5C8' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'sage', name: 'Sage Green', hex: '#A3B19B' },
    { id: 'rose', name: 'Dusty Rose', hex: '#C7A4A4' },
  ];

  const sizes = ['Single', 'Double', 'Queen', 'King'];

  const crossSell = [
    { name: 'Plush Egyptian Towel Set', category: 'BATH', price: 'EGP 1,800', img: 'https://api.shatta.com/storage/4476/lehaf_140.webp' },
    { name: 'Velvet Accent Cushion', category: 'DECOR', price: 'EGP 850', img: 'https://api.shatta.com/storage/3277/pouf-57_L.jpg' },
    { name: 'Linen Blend Throw Blanket', category: 'LIVING', price: 'EGP 1,250', img: 'https://api.shatta.com/storage/3278/pouf-57.jpg' },
  ];

  const accordions = [
    { id: 'Description', title: 'Description', content: 'Crafted from 100% long-staple Egyptian cotton, our Nile Cotton Duvet Set brings the luxury of a five-star hotel right to your bedroom. Featuring a buttery smooth sateen weave, it grows softer with every wash while remaining exceptionally breathable.' },
    { id: 'Fabric & Care', title: 'Fabric & Care', content: '100% Egyptian Cotton. 400 Thread Count. Machine wash cold with like colors. Tumble dry low. Do not bleach. Warm iron if needed.' },
    { id: 'Delivery & Returns', title: 'Delivery & Returns', content: 'Free delivery on all orders over EGP 3,000. Standard delivery takes 3-5 business days. We offer a hassle-free 30-day return policy for unused items in their original packaging.' }
  ];

  const fbtProducts = [
    { name: 'Hotel Collection Sheets', price: 4200, img: 'https://api.shatta.com/storage/3265/pouf-91.jpg' },
    { name: 'Embroidered Linen Pillowcase', price: 450, img: 'https://api.shatta.com/storage/292/CUSH1_480.jpg' }
  ];

  const currentPrice = 2450;
  const fbtTotal = currentPrice + fbtSelected.reduce((acc, curr, idx) => curr ? acc + fbtProducts[idx].price : acc, 0);

  const toggleAccordion = (id: string) => {
    setActiveAccordion(activeAccordion === id ? null : id);
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs text-[#1A1A1A]/50 font-light mb-8 md:mb-12 tracking-wide">
          <span className="cursor-pointer hover:text-[#1A1A1A] transition-colors">Home</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-[#1A1A1A] transition-colors">Bed & Bath</span>
          <span className="mx-2">/</span>
          <span className="cursor-pointer hover:text-[#1A1A1A] transition-colors">Bedding</span>
          <span className="mx-2">/</span>
          <span className="text-[#C4A35A] font-medium">Nile Cotton Duvet Set</span>
        </div>

        {/* Product Section */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 mb-24">
          
          {/* LEFT: Image Gallery */}
          <div className="flex flex-col space-y-4">
            <div className="aspect-[4/5] w-full rounded-[2rem] overflow-hidden bg-white shadow-xl shadow-black/5 relative group">
              <AnimatePresence mode="wait">
                <motion.img 
                  key={activeImageIndex}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={images[activeImageIndex]} 
                  alt="Nile Cotton Duvet Set" 
                  className="w-full h-full object-cover transform scale-[1.01] group-hover:scale-105 transition-transform duration-[10s] ease-out"
                />
              </AnimatePresence>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              {images.map((img, idx) => (
                <button 
                  key={idx}
                  onClick={() => setActiveImageIndex(idx)}
                  className={`aspect-[4/5] rounded-xl overflow-hidden relative ${activeImageIndex === idx ? 'ring-2 ring-[#C4A35A] ring-offset-2 ring-offset-[#FFFFFF]' : 'hover:opacity-80 transition-opacity'} bg-white shadow-sm shadow-black/5`}
                >
                  <img src={img} alt={`Thumbnail ${idx + 1}`} className="w-full h-full object-cover" />
                  {activeImageIndex === idx && <div className="absolute inset-0 bg-white/10" />}
                </button>
              ))}
            </div>
          </div>

          {/* RIGHT: Product Info Panel */}
          <div className="flex flex-col">
            <motion.div initial="hidden" animate="visible" variants={staggerContainer} className="flex flex-col">
              
              <motion.div variants={fadeUp} className="text-[#C4A35A] text-xs font-semibold tracking-widest mb-4">
                BEDDING &middot; NEW ARRIVAL
              </motion.div>
              
              <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-tight mb-4">
                Nile Cotton Duvet Set
              </motion.h1>
              
              <motion.div variants={fadeUp} className="flex items-center gap-x-4 mb-6">
                <div className="flex items-center text-[#C4A35A]">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star key={star} className={`w-4 h-4 ${star === 5 ? 'fill-transparent' : 'fill-current'}`} strokeWidth={2} />
                  ))}
                </div>
                <span className="text-sm font-light text-[#1A1A1A]/70">4.8 <span className="mx-1">&middot;</span> <a href="#reviews" className="underline underline-offset-4 decoration-[#C4A35A]/30 hover:decoration-[#C4A35A] transition-all">126 reviews</a></span>
              </motion.div>

              <motion.div variants={fadeUp} className="flex items-center gap-x-4 mb-8">
                <span className="font-sans text-2xl font-medium text-[#1A1A1A]">EGP 2,450</span>
                <span className="text-[#1A1A1A]/40 line-through text-lg">EGP 2,900</span>
                <span className="bg-[#C4A35A]/10 text-[#C4A35A] text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full">SAVE 15%</span>
              </motion.div>

              <motion.p variants={fadeUp} className="text-[#1A1A1A]/70 font-light leading-relaxed mb-10 text-base">
                Experience unparalleled comfort with our signature Nile Cotton Duvet Set. Woven from 100% premium Egyptian long-staple cotton, this set offers a luminous sateen finish that is buttery soft to the touch and breathable enough for year-round luxury.
              </motion.p>

              {/* Color Selector */}
              <motion.div variants={fadeUp} className="mb-8">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium tracking-wide">Color: <span className="font-light text-[#1A1A1A]/70 ms-1">{colors.find(c => c.id === selectedColor)?.name}</span></span>
                </div>
                <div className="flex items-center gap-x-3">
                  {colors.map((color) => (
                    <button
                      key={color.id}
                      onClick={() => setSelectedColor(color.id)}
                      className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedColor === color.id ? 'ring-2 ring-[#C4A35A] ring-offset-4 ring-offset-[#FFFFFF]' : 'ring-1 ring-black/10 hover:ring-black/30 ring-offset-2 ring-offset-transparent'}`}
                    >
                      <span className="w-8 h-8 rounded-full border border-black/5 shadow-sm" style={{ backgroundColor: color.hex }} />
                    </button>
                  ))}
                </div>
              </motion.div>

              {/* Size Selector */}
              <motion.div variants={fadeUp} className="mb-10">
                <div className="flex items-center justify-between mb-3">
                  <span className="text-sm font-medium tracking-wide">Size</span>
                  <button className="text-xs text-[#1A1A1A]/50 underline underline-offset-4 hover:text-[#1A1A1A] transition-colors">Size Guide</button>
                </div>
                <div className="grid grid-cols-4 gap-3">
                  {sizes.map((size) => (
                    <button
                      key={size}
                      onClick={() => setSelectedSize(size)}
                      className={`py-3 px-2 rounded-full text-sm transition-all duration-300 ${selectedSize === size ? 'bg-[#1A1A1A] text-white border border-[#1A1A1A] shadow-md' : 'bg-transparent text-[#1A1A1A] border border-black/10 hover:border-black/30'}`}
                    >
                      {size}
                    </button>
                  ))}
                </div>
              </motion.div>

                <motion.div variants={fadeUp} className="flex flex-col sm:flex-row gap-4 mb-10" ref={atcButtonRef}>
                  <div className="flex items-center justify-between bg-white border border-black/10 rounded-full py-2 px-4 w-full sm:w-32 shadow-sm">
                    <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="font-medium text-sm w-6 text-center">{quantity}</span>
                    <button onClick={() => setQuantity(quantity + 1)} className="p-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                  
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 bg-[#C4A35A] text-white py-4 rounded-full text-sm font-semibold tracking-widest shadow-xl shadow-[#C4A35A]/20 hover:bg-[#B39249] transition-colors relative overflow-hidden group"
                  >
                    <span className="absolute inset-0 w-full h-full bg-black/10 origin-[left] rtl:origin-[right] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"></span>
                    <span className="relative z-10">ADD TO CART</span>
                  </motion.button>
                  
                  <motion.button 
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="w-14 h-[52px] sm:w-[52px] flex items-center justify-center rounded-full border border-black/10 bg-white hover:border-[#C4A35A] hover:text-[#C4A35A] transition-colors shadow-sm text-[#1A1A1A]"
                  >
                    <Heart className="w-5 h-5" />
                  </motion.button>
                </motion.div>

              {/* Frequently Bought Together */}
              <motion.div variants={fadeUp} className="mb-10 bg-gray-50 border border-gray-200 rounded-3xl p-6 shadow-sm">
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6">Frequently Bought Together</h3>
                
                {/* Visual Bundle Preview */}
                <div className="flex items-center gap-4 mb-8 overflow-x-auto hide-scrollbar pb-2">
                  <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
                    <img src={images[0]} alt="Current Item" className="w-full h-full object-cover" />
                  </div>
                  {fbtProducts.map((prod, idx) => fbtSelected[idx] && (
                    <React.Fragment key={idx}>
                      <Plus className="w-5 h-5 text-gray-400 shrink-0" />
                      <div className="w-24 h-24 shrink-0 rounded-2xl overflow-hidden shadow-sm bg-white border border-gray-100">
                        <img src={prod.img} alt={prod.name} className="w-full h-full object-cover" />
                      </div>
                    </React.Fragment>
                  ))}
                </div>

                <div className="flex flex-col gap-4 mb-6">
                  <div className="flex items-center justify-between">
                    <label className="flex items-center gap-3 cursor-pointer">
                      <input type="checkbox" checked disabled className="form-checkbox bg-[#1A1A1A] border-none text-white" />
                      <div className="flex items-center gap-3">
                        <img src={images[0]} alt="Nile Cotton Duvet Set" className="w-12 h-12 object-cover rounded-md" />
                        <span className="text-sm font-medium">This item: Nile Cotton Duvet Set</span>
                      </div>
                    </label>
                    <span className="text-sm font-semibold">EGP 2,450</span>
                  </div>
                  {fbtProducts.map((prod, idx) => (
                    <div key={idx} className="flex items-center justify-between pl-1">
                      <label className="flex items-center gap-3 cursor-pointer">
                        <input 
                          type="checkbox" 
                          checked={fbtSelected[idx]}
                          onChange={() => {
                            const newSelected = [...fbtSelected];
                            newSelected[idx] = !newSelected[idx];
                            setFbtSelected(newSelected);
                          }}
                          className="form-checkbox" 
                        />
                        <div className="flex items-center gap-3">
                          <img src={prod.img} alt={prod.name} className="w-12 h-12 object-cover rounded-md" />
                          <span className="text-sm text-gray-600 hover:text-[#C4A35A] transition-colors">{prod.name}</span>
                        </div>
                      </label>
                      <span className="text-sm">EGP {prod.price.toLocaleString()}</span>
                    </div>
                  ))}
                </div>
                <div className="flex flex-col sm:flex-row items-center justify-between pt-4 border-t border-gray-200 gap-4">
                  <div className="flex flex-col">
                    <span className="text-xs text-gray-500 uppercase tracking-widest">Total Price</span>
                    <span className="font-sans text-2xl font-semibold text-[#1A1A1A]">EGP {fbtTotal.toLocaleString()}</span>
                  </div>
                  <button className="w-full sm:w-auto bg-[#1A1A1A] text-white py-3 px-8 rounded-full text-sm font-medium hover:bg-[#C4A35A] transition-colors shadow-lg">
                    Add Selected To Cart
                  </button>
                </div>
              </motion.div>

              {/* Trust Row */}
              <motion.div variants={fadeUp} className="flex items-center justify-between py-6 border-y border-black/5 mb-10">
                <div className="flex items-center gap-3">
                  <Truck className="w-5 h-5 text-[#C4A35A]" strokeWidth={1.5} />
                  <span className="text-xs font-medium tracking-wide">Free delivery over EGP 3k</span>
                </div>
                <div className="flex items-center gap-3">
                  <RefreshCw className="w-5 h-5 text-[#C4A35A]" strokeWidth={1.5} />
                  <span className="text-xs font-medium tracking-wide">30-day returns</span>
                </div>
                <div className="flex items-center gap-3">
                  <Store className="w-5 h-5 text-[#C4A35A]" strokeWidth={1.5} />
                  <span className="text-xs font-medium tracking-wide">25+ branches</span>
                </div>
              </motion.div>



            </motion.div>
          </div>
        </div>

        {/* 4. Cross-sell Section */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4 text-center">Complete the Look</h2>
            <div className="w-12 h-[2px] bg-[#C4A35A] rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crossSell.map((product, idx) => (
              <motion.div variants={fadeUp} key={idx} className="group cursor-pointer flex flex-col bg-white p-2 rounded-[2rem] shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-500">
                <div className="relative aspect-[4/5] overflow-hidden bg-[#FFFFFF] rounded-3xl mb-4">
                  <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full z-10 shadow-sm">STYLE MATCH</div>
                  <div className="absolute top-3 end-3 z-20">
                    <button 
                      onClick={(e) => { e.preventDefault(); }}
                      className="bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] hover:text-red-500 p-2 rounded-full shadow-sm transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                  
                  <div className="absolute bottom-3 start-3 end-3 translate-y-0 opacity-100 transition-all duration-500 ease-out z-10">
                    <button className="w-full bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-[#C4A35A] text-white py-3 text-xs font-medium tracking-widest rounded-xl transition-colors shadow-lg">
                      QUICK ADD
                    </button>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="text-[#C4A35A] text-[9px] font-medium tracking-widest mb-1.5">{product.category}</div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] leading-snug mb-1 group-hover:text-[#C4A35A] transition-colors truncate">{product.name}</h3>
                  <div className="text-sm text-[#1A1A1A]/70 font-medium">{product.price}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.section>

        {/* You May Also Like */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="mb-24"
        >
          <motion.div variants={fadeUp} className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4 text-center">You May Also Like</h2>
            <div className="w-12 h-[2px] bg-[#C4A35A] rounded-full"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {crossSell.map((product, idx) => (
              <motion.div variants={fadeUp} key={`related-${idx}`} className="group cursor-pointer flex flex-col bg-white p-2 rounded-[2rem] shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-500 border border-transparent hover:border-[#E8E0D4]/50">
                <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-3xl mb-4">
                  <div className="absolute top-3 end-3 z-20">
                    <button 
                      onClick={(e) => { e.preventDefault(); }}
                      className="bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] hover:text-red-500 p-2 rounded-full shadow-sm transition-colors"
                      aria-label="Add to wishlist"
                    >
                      <Heart className="w-4 h-4" />
                    </button>
                  </div>
                  <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                  <div className="absolute inset-x-3 bottom-3 translate-y-0 opacity-100 transition-all duration-500 ease-out z-10">
                    <button className="w-full bg-white/90 backdrop-blur-md hover:bg-[#1A1A1A] text-[#1A1A1A] hover:text-white py-3 text-sm font-medium rounded-xl transition-colors shadow-lg">
                      Quick Add
                    </button>
                  </div>
                </div>
                <div className="px-3 pb-3">
                  <div className="text-[#C4A35A] text-[9px] font-medium tracking-widest mb-1.5">{product.category}</div>
                  <h3 className="font-serif text-lg text-[#1A1A1A] leading-snug mb-1 group-hover:text-[#C4A35A] transition-colors truncate">{product.name}</h3>
                  <div className="text-sm text-[#1A1A1A] font-semibold">{product.price}</div>
                </div>
              </motion.div>
            )).reverse()}
          </div>
        </motion.section>

        {/* Recently Viewed */}
        {recentlyViewed.length > 0 && (
          <motion.section 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={staggerContainer}
            className="mb-24 pt-12 border-t border-[#E8E0D4]"
          >
            <motion.div variants={fadeUp} className="flex flex-col items-center mb-12">
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4 text-center">Recently Viewed</h2>
              <div className="w-12 h-[2px] bg-[#C4A35A] rounded-full"></div>
            </motion.div>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4">
              {recentlyViewed.map((product, idx) => (
                <motion.div variants={fadeUp} key={`recent-${idx}`} className="group cursor-pointer flex flex-col">
                  <div className="relative aspect-[4/5] overflow-hidden bg-gray-50 rounded-2xl mb-3">
                    <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                  </div>
                  <div>
                    <h3 className="font-serif text-base text-[#1A1A1A] leading-snug mb-1 group-hover:text-[#C4A35A] transition-colors truncate">{product.name}</h3>
                    <div className="text-sm text-gray-500">{product.price}</div>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.section>
        )}

        {/* 5. Reviews Section */}
        <motion.section 
          id="reviews"
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={staggerContainer}
          className="bg-[#E8E0D4] rounded-[3rem] p-8 md:p-16 mb-24 shadow-xl shadow-black/5 relative overflow-hidden"
        >
          <div className="absolute top-0 end-0 w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent opacity-60 blur-3xl pointer-events-none rounded-full rtl:-translate-x-0 rtl:translate-x-reverse translate-x-1/3 -translate-y-1/3"></div>

          <div className="relative z-10 flex flex-col lg:flex-row gap-16">
            
            <motion.div variants={fadeUp} className="lg:w-1/3 flex flex-col">
              <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">Customer Reviews</h2>
              <div className="flex items-end gap-4 mb-8">
                <span className="font-serif text-6xl text-[#1A1A1A] leading-none">4.8</span>
                <div className="flex flex-col gap-1 pb-1">
                  <div className="flex text-[#C4A35A]">
                    {[1,2,3,4,5].map(i => <Star key={i} className="w-4 h-4 fill-current" />)}
                  </div>
                  <span className="text-sm font-light text-[#1A1A1A]/70">Based on 126 reviews</span>
                </div>
              </div>

              <div className="flex flex-col gap-3 mb-8">
                {[
                  { stars: 5, percent: 85 },
                  { stars: 4, percent: 10 },
                  { stars: 3, percent: 3 },
                  { stars: 2, percent: 1 },
                  { stars: 1, percent: 1 },
                ].map(row => (
                  <div key={row.stars} className="flex items-center gap-3 text-sm font-light">
                    <span className="w-3">{row.stars}</span>
                    <Star className="w-3 h-3 text-[#C4A35A] fill-current" />
                    <div className="flex-1 h-1.5 bg-white/40 rounded-full overflow-hidden">
                      <div className="h-full bg-[#1A1A1A] rounded-full" style={{ width: `${row.percent}%` }}></div>
                    </div>
                    <span className="w-8 text-end text-xs text-[#1A1A1A]/50">{row.percent}%</span>
                  </div>
                ))}
              </div>

              <button className="self-start border border-[#1A1A1A] text-[#1A1A1A] hover:bg-[#1A1A1A] hover:text-white transition-colors py-3 px-6 rounded-full text-xs font-semibold tracking-widest uppercase">
                WRITE A REVIEW
              </button>
            </motion.div>

            <div className="lg:w-2/3 grid gap-6">
              {[
                { name: 'Sarah M.', date: '1 month ago', text: 'Absolutely in love with this set. The quality of the Egyptian cotton is immediately noticeable. It feels exactly like the sheets in a luxury hotel.' },
                { name: 'Nour E.', date: '2 months ago', text: 'Beautiful packaging, incredibly soft material. I was worried it might be too warm for summer but it breathes perfectly. Highly recommend!' },
                { name: 'Youssef H.', date: '3 months ago', text: 'Worth every penny. The sateen finish gives it a subtle sheen that looks very premium on the bed. Washing it only made it softer.' }
              ].map((review, i) => (
                <motion.div variants={fadeUp} key={i} className="bg-white p-6 rounded-3xl shadow-sm border border-black/5">
                  <div className="flex items-start justify-between mb-4">
                    <div>
                      <div className="flex text-[#C4A35A] mb-1">
                        {[1,2,3,4,5].map(s => <Star key={s} className="w-3.5 h-3.5 fill-current" />)}
                      </div>
                      <span className="font-serif text-xl font-medium">{review.name}</span>
                    </div>
                    <span className="text-xs text-[#1A1A1A]/40 font-light">{review.date}</span>
                  </div>
                  <p className="text-[#1A1A1A]/70 font-light text-sm leading-relaxed">
                    "{review.text}"
                  </p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </main>

      {/* Sticky Add to Cart Bar */}
      <div className={`fixed bottom-0 left-0 right-0 z-40 bg-white border-t border-gray-100 shadow-[0_-10px_40px_rgba(0,0,0,0.05)] transition-transform duration-500 ease-[0.16,1,0.3,1] py-4 px-4 sm:px-6 md:px-8 pb-[max(1rem,env(safe-area-inset-bottom))] ${isStickyVisible ? 'translate-y-0' : 'translate-y-[100%]'}`}>
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4 md:gap-8">
          <div className="hidden md:flex items-center gap-4 flex-1">
            <div className="w-12 h-12 rounded-lg overflow-hidden shrink-0 bg-gray-50">
              <img src={images[0]} className="w-full h-full object-cover" alt="Nile Cotton Duvet Set" />
            </div>
            <div>
              <h3 className="font-serif text-lg leading-tight truncate max-w-xs">Nile Cotton Duvet Set</h3>
              <div className="flex items-center gap-2 text-sm">
                <span className="font-medium text-[#C4A35A]">EGP 2,450</span>
                <s className="text-gray-400">EGP 2,900</s>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-4 w-full md:w-auto shrink-0 justify-between md:justify-end">
            <div className="md:hidden flex flex-col justify-center">
              <span className="font-medium text-[#C4A35A]">EGP 2,450</span>
              <span className="text-xs text-gray-500">{colors.find(c => c.id === selectedColor)?.name} / {selectedSize}</span>
            </div>

            <div className="flex items-center gap-3 w-full md:w-auto">
              <div className="hidden md:flex items-center border border-gray-200 rounded-lg bg-gray-50">
                <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="px-3 py-2 text-gray-500 hover:text-black transition-colors">-</button>
                <span className="w-8 text-center text-sm font-medium">{quantity}</span>
                <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 text-gray-500 hover:text-black transition-colors">+</button>
              </div>
              <button className="flex-1 md:flex-none bg-[#1A1A1A] hover:bg-[#C4A35A] text-white px-8 py-3.5 md:py-3 font-medium tracking-widest rounded-xl transition-colors shadow-lg">
                ADD TO CART
              </button>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
}

export default ProductDetail;