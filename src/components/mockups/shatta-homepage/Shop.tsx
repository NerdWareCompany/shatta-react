import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { QuickBuyModal } from './layout/QuickBuyModal';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, ChevronRight, ChevronDown, SlidersHorizontal, Check, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Shop() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<any>(null);
  
  // Filter States
  const [activeCategories, setActiveCategories] = useState<string[]>(['Duvets & Covers', 'Bedsheets']);
  const [selectedColor, setSelectedColor] = useState<string | null>('#F5F5DC');
  const [maxPrice, setMaxPrice] = useState<number>(4500);
  const [sortBy, setSortBy] = useState<string>('Newest');
  const [isSortOpen, setIsSortOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
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

  const products = [
    { name: 'Signature Sateen Duvet Cover', category: 'BEDDING', price: 3450, img: 'https://api.shatta.com/storage/3273/pouf-60_L.jpg', badge: 'NEW' },
    { name: 'Linen Blend Throw Blanket', category: 'THROWS', price: 1250, originalPrice: 1800, img: 'https://api.shatta.com/storage/3282/pouf-15.jpg', badge: 'SALE' },
    { name: 'Plush Egyptian Towel Set', category: 'BATH', price: 1800, img: 'https://api.shatta.com/storage/3235/pouf-157_L.jpg' },
    { name: 'Ceramic Table Lamp', category: 'DECOR', price: 2100, img: 'https://api.shatta.com/storage/4448/lehaf_098.jpg' },
    { name: 'Velvet Accent Cushion', category: 'DECOR', price: 850, img: 'https://api.shatta.com/storage/3235/pouf-157_L.jpg' },
    { name: 'Hotel Collection Sheets', category: 'BEDDING', price: 4200, originalPrice: 5000, img: 'https://api.shatta.com/storage/3265/pouf-91.jpg', badge: 'SALE' },
    { name: 'Marble Bathroom Set', category: 'BATH', price: 1450, img: 'https://api.shatta.com/storage/3253/pouf-108.jpg', badge: 'NEW' },
    { name: 'Handwoven Jute Rug', category: 'RUGS', price: 5600, img: 'https://api.shatta.com/storage/3208/pouf-216_L.jpg' },
    { name: 'Embroidered Linen Pillowcase', category: 'PILLOWS', price: 450, img: 'https://api.shatta.com/storage/292/CUSH1_480.jpg' },
    { name: 'Silk Sleep Mask', category: 'ACCESSORIES', price: 600, originalPrice: 850, img: 'https://api.shatta.com/storage/3245/pouf-146.jpg', badge: 'SALE' },
    { name: 'Quilted Comforter Set', category: 'BEDDING', price: 5200, img: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg' },
    { name: 'Waffle Knit Robe', category: 'BATH', price: 1950, img: 'https://api.shatta.com/storage/3236/pouf-157.jpg', badge: 'NEW' }
  ];

  const filteredProducts = products
    .filter(p => p.price <= maxPrice)
    .sort((a, b) => {
      if (sortBy === 'Price: Low to High') return a.price - b.price;
      if (sortBy === 'Price: High to Low') return b.price - a.price;
      return 0; // Newest / Default
    });

  const toggleCategory = (cat: string) => {
    setActiveCategories(prev => 
      prev.includes(cat) ? prev.filter(c => c !== cat) : [...prev, cat]
    );
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
        
        input[type="checkbox"] {
          appearance: none;
          background-color: transparent;
          margin: 0;
          font: inherit;
          color: currentColor;
          width: 1.15em;
          height: 1.15em;
          border: 1px solid #1A1A1A;
          border-eadius: 0.25em;
          display: grid;
          place-content: center;
          cursor: pointer;
        }

        input[type="checkbox"]::before {
          content: "";
          width: 0.65em;
          height: 0.65em;
          transform: scale(0);
          transition: 120ms transform ease-in-out;
          box-shadow: inset 1em 1em white;
          background-color: transform;
          transform-origin: center;
          clip-path: polygon(14% 44%, 0 65%, 50% 100%, 100% 16%, 80% 0%, 43% 62%);
        }

        input[type="checkbox"]:checked {
          background-color: #1A1A1A;
        }

        input[type="checkbox"]:checked::before {
          transform: scale(1);
        }
        
        /* Custom range slider styling */
        input[type=range] {
          -webkit-appearance: none;
          width: 100%;
          background: transparent;
        }

        input[type=range]::-webkit-slider-thumb {
          -webkit-appearance: none;
          height: 16px;
          width: 16px;
          border-eadius: 50%;
          background: #C4A35A;
          cursor: pointer;
          margin-top: -6px;
          border: 2px solid white;
          box-shadow: 0 1px 3px rgba(0,0,0,0.2);
        }

        input[type=range]::-webkit-slider-runnable-track {
          width: 100%;
          height: 4px;
          cursor: pointer;
          background: #E8E0D4;
          border-eadius: 2px;
        }
      `}</style>
      
      <Header />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-6">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-6">
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Home</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Bed & Bath</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#C4A35A] font-medium">Bedding</span>
        </div>

        {/* Category Hero Banner */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="relative w-full h-[250px] md:h-[350px] rounded-[2.5rem] overflow-hidden mb-10 shadow-lg shadow-black/5"
        >
          <img 
            src="https://api.shatta.com/storage/3248/pouf-139_L.jpg" 
            alt="Bedding & Bed Linen" 
            className="absolute inset-0 w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 to-black/20"></div>
          <div className="absolute inset-0 flex flex-col justify-center px-8 md:px-16">
            <h1 className="font-serif text-4xl md:text-6xl text-white mb-4 drop-shadow-md">Bedding & Bed Linen</h1>
            <p className="text-white/90 text-sm md:text-base font-light max-w-md leading-relaxed drop-shadow-sm">
              Transform your sanctuary with our premium collection of Egyptian cotton sheets, luxurious duvet covers, and perfectly crafted pillowcases.
            </p>
          </div>
        </motion.div>

        {/* Toolbar */}
        <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4 pb-4 border-b border-[#E8E0D4]">
          <div className="text-sm font-medium tracking-wide text-[#1A1A1A]/70">
            <span className="text-[#1A1A1A]">{filteredProducts.length}</span> Products
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <button className="flex-1 sm:flex-none md:hidden flex items-center justify-center gap-2 px-6 py-2.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium hover:border-[#C4A35A] transition-colors shadow-sm">
              <SlidersHorizontal className="w-4 h-4" />
              Filter
            </button>
            <div className="flex-1 sm:flex-none relative group z-10">
              <button 
                onClick={() => setIsSortOpen(!isSortOpen)}
                className="w-full flex items-center justify-between gap-3 px-6 py-2.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium hover:border-[#C4A35A] transition-colors shadow-sm min-w-[180px]"
              >
                <span>Sort by: <span className="font-light">{sortBy}</span></span>
                <ChevronDown className={`w-4 h-4 text-[#1A1A1A]/50 transition-transform ${isSortOpen ? 'rotate-180' : ''}`} />
              </button>
              {isSortOpen && (
                <div className="absolute top-full right-0 mt-2 w-full bg-white border border-[#E8E0D4] rounded-xl shadow-lg py-2">
                  {['Newest', 'Price: Low to High', 'Price: High to Low'].map((s) => (
                    <button 
                      key={s} 
                      onClick={() => { setSortBy(s); setIsSortOpen(false); }}
                      className={`w-full text-left px-6 py-2 text-sm hover:bg-gray-50 ${sortBy === s ? 'text-[#C4A35A] font-medium' : 'text-gray-600'}`}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row gap-10">
          
          {/* Sidebar Filters */}
          <div className="hidden lg:block w-[250px] flex-shrink-0">
            <div className="sticky top-32 space-y-8">
              
              {/* Active Filters */}
              {(activeCategories.length > 0 || selectedColor || maxPrice < 10000) && (
                <div className="pb-6 border-b border-[#E8E0D4]">
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-sm font-medium tracking-widest text-gray-500 uppercase">Active Filters</h3>
                    <button 
                      onClick={() => {
                        setActiveCategories([]);
                        setSelectedColor(null);
                        setMaxPrice(10000);
                      }} 
                      className="text-xs text-gray-400 hover:text-[#1A1A1A] underline transition-colors"
                    >
                      Clear All
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {activeCategories.map(cat => (
                      <button key={cat} onClick={() => toggleCategory(cat)} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors group">
                        {cat} <X className="w-3 h-3 text-gray-400 group-hover:text-[#1A1A1A]" />
                      </button>
                    ))}
                    {selectedColor && (
                      <button onClick={() => setSelectedColor(null)} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors group">
                        Color <X className="w-3 h-3 text-gray-400 group-hover:text-[#1A1A1A]" />
                      </button>
                    )}
                    {maxPrice < 10000 && (
                      <button onClick={() => setMaxPrice(10000)} className="flex items-center gap-1 bg-gray-50 border border-gray-200 px-3 py-1.5 rounded-full text-xs text-[#1A1A1A] hover:bg-gray-100 transition-colors group">
                        Up to EGP {maxPrice} <X className="w-3 h-3 text-gray-400 group-hover:text-[#1A1A1A]" />
                      </button>
                    )}
                  </div>
                </div>
              )}

              {/* Category */}
              <div>
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">Category</h3>
                <div className="space-y-3">
                  {['Duvets & Covers', 'Bedsheets', 'Pillowcases', 'Comforters', 'Throws & Blankets'].map((item, i) => (
                    <label key={i} className="flex items-center gap-3 cursor-pointer group">
                      <input 
                        type="checkbox" 
                        checked={activeCategories.includes(item)}
                        onChange={() => toggleCategory(item)}
                        className="form-checkbox" 
                      />
                      <span className="text-sm text-[#1A1A1A]/80 group-hover:text-[#C4A35A] transition-colors">{item}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Price */}
              <div className="pt-6 border-t border-[#E8E0D4]">
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">Price</h3>
                <div className="px-2 mb-6">
                  <input 
                    type="range" 
                    min="0" 
                    max="10000" 
                    step="500"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(parseInt(e.target.value))}
                    className="w-full" 
                  />
                </div>
                <div className="flex items-center justify-between gap-4">
                  <div className="bg-white border border-[#E8E0D4] rounded-xl px-4 py-2 text-sm text-[#1A1A1A]/70 w-full text-center">EGP 0</div>
                  <span className="text-[#1A1A1A]/30">-</span>
                  <div className="bg-white border border-[#E8E0D4] rounded-xl px-4 py-2 text-sm text-[#1A1A1A]/70 w-full text-center">EGP {maxPrice}</div>
                </div>
              </div>

              {/* Color */}
              <div className="pt-6 border-t border-[#E8E0D4]">
                <h3 className="font-serif text-xl text-[#1A1A1A] mb-4">Color</h3>
                <div className="flex flex-wrap gap-3">
                  {[
                    { bg: '#FFFFFF', border: 'border-[#E8E0D4]' },
                    { bg: '#F5F5DC', border: 'border-transparent' },
                    { bg: '#D2B48C', border: 'border-transparent' },
                    { bg: '#808080', border: 'border-transparent' },
                    { bg: '#1A1A1A', border: 'border-transparent' },
                    { bg: '#4682B4', border: 'border-transparent' },
                    { bg: '#556B2F', border: 'border-transparent' },
                    { bg: '#800000', border: 'border-transparent' },
                  ].map((color, i) => (
                    <button 
                      key={i} 
                      onClick={() => setSelectedColor(color.bg === selectedColor ? null : color.bg)}
                      className={`w-8 h-8 rounded-full border ${color.border} shadow-sm hover:scale-110 transition-transform flex items-center justify-center`}
                      style={{ backgroundColor: color.bg }}
                    >
                      {selectedColor === color.bg && <Check className={`w-4 h-4 ${color.bg === '#1A1A1A' || color.bg === '#800000' || color.bg === '#4682B4' || color.bg === '#556B2F' ? 'text-white' : 'text-[#1A1A1A]/50'}`} />}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Product Grid */}
          <div className="flex-1">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-6 gap-y-12"
            >
              <AnimatePresence>
                {filteredProducts.map((product, idx) => (
                  <motion.div
                    key={product.name}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.4, delay: idx * 0.05 }}
                    className="group cursor-pointer flex flex-col h-full"
                    onClick={() => {window.location.href='/preview/shatta-homepage/ProductDetail'}}
                  >
                    <div className="relative aspect-[4/5] overflow-hidden bg-[#FFFFFF] rounded-3xl mb-5 shadow-sm shadow-black/5 group-hover:shadow-2xl group-hover:shadow-black/10 transition-shadow duration-500 p-2">
                      <div className="w-full h-full rounded-2xl overflow-hidden relative">
                        {product.badge && (
                          <div className="absolute top-3 start-3 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[9px] font-bold tracking-widest px-3 py-1.5 rounded-full z-10 shadow-sm">
                            {product.badge}
                          </div>
                        )}
                        
                        <div className="absolute top-3 end-3 z-20">
                          <button 
                            onClick={(e) => { e.stopPropagation(); /* toggle wishlist logic */ }}
                            className="bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] hover:text-red-500 p-2 rounded-full shadow-sm transition-colors"
                            aria-label="Add to wishlist"
                          >
                            <Heart className="w-4 h-4" />
                          </button>
                        </div>
                        
                        <img 
                          src={product.img} 
                          alt={product.name} 
                          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" 
                        />
                        
                        <div className="absolute bottom-3 start-3 end-3 translate-y-0 opacity-100 focus-within:translate-y-0 focus-within:opacity-100 transition-all duration-500 ease-out z-10">
                          <button 
                            onClick={(e) => { e.stopPropagation(); setSelectedProduct(product); }}
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
                      <div className="flex items-center gap-2">
                        <div className="text-sm text-[#1A1A1A]/70 font-medium">EGP {product.price.toLocaleString()}</div>
                        {product.originalPrice && (
                          <s className="text-xs text-[#1A1A1A]/40">EGP {product.originalPrice.toLocaleString()}</s>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>

            {/* Pagination / Load More */}
            <div className="mt-16 flex justify-center">
              <button className="px-8 py-3.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium text-[#1A1A1A] hover:border-[#C4A35A] hover:text-[#C4A35A] shadow-sm hover:shadow-md transition-all duration-300">
                LOAD MORE PRODUCTS
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
      
      <QuickBuyModal 
        isOpen={!!selectedProduct} 
        onClose={() => setSelectedProduct(null)} 
        product={selectedProduct} 
      />
    </div>
  );
}

export default Shop;