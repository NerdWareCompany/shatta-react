import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Minus, Plus } from 'lucide-react';

export function QuickBuyModal({ 
  isOpen, 
  onClose, 
  product 
}: { 
  isOpen: boolean; 
  onClose: () => void;
  product: any;
}) {
  const [quantity, setQuantity] = useState(1);
  const [selectedColor, setSelectedColor] = useState('beige');
  const [selectedSize, setSelectedSize] = useState('Queen');
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [activeImageIndex, setActiveImageIndex] = useState(0);

  // FBT State
  const [fbtSelected, setFbtSelected] = useState<boolean[]>([true, false]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Reset states on open
      setQuantity(1);
      setActiveImageIndex(0);
      setIsSuccess(false);
      setFbtSelected([true, false]);
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => { document.body.style.overflow = 'unset'; };
  }, [isOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [onClose]);

  if (!product) return null;

  const colors = [
    { id: 'beige', name: 'Beige', hex: '#DED5C8' },
    { id: 'white', name: 'White', hex: '#FFFFFF' },
    { id: 'sage', name: 'Sage Green', hex: '#A3B19B' },
    { id: 'rose', name: 'Dusty Rose', hex: '#C7A4A4' },
  ];

  const sizes = ['Single', 'Double', 'Queen', 'King'];

  const fbtProducts = [
    { name: 'Hotel Collection Sheets', price: 4200, img: 'https://api.shatta.com/storage/3265/pouf-91.jpg' },
    { name: 'Embroidered Linen Pillowcase', price: 450, img: 'https://api.shatta.com/storage/292/CUSH1_480.jpg' }
  ];

  const images = [
    product.img,
    'https://api.shatta.com/storage/3273/pouf-60_L.jpg',
    'https://api.shatta.com/storage/3282/pouf-15.jpg',
    'https://api.shatta.com/storage/4448/lehaf_098.jpg'
  ];

  const handleAddToCart = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
      setTimeout(() => {
        setIsSuccess(false);
        onClose();
        // Here we would typically trigger the cart drawer open
      }, 1500);
    }, 800);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div 
          className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 font-sans"
          role="dialog"
          aria-modal="true"
          aria-labelledby="modal-title"
        >
          {/* Overlay */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
            onClick={onClose}
          />

          {/* Modal Container */}
          <motion.div 
            initial={{ y: "100%", opacity: 0, scale: 1 }}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            exit={{ y: "100%", opacity: 0, scale: 1 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-5xl bg-white rounded-t-[2rem] sm:rounded-3xl shadow-2xl overflow-hidden max-h-[90vh] sm:max-h-[85vh] flex flex-col"
          >
            {/* Mobile swipe indicator */}
            <div className="w-full flex justify-center pt-3 pb-1 sm:hidden">
              <div className="w-12 h-1.5 bg-gray-300 rounded-full"></div>
            </div>

            <button 
              onClick={onClose}
              aria-label="Close modal"
              className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors bg-white/80 backdrop-blur-md rounded-full shadow-sm"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex-1 overflow-y-auto no-scrollbar">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 p-6 sm:p-8 lg:p-10">
                {/* Product Image Gallery */}
                <div className="flex flex-col gap-4">
                  <div className="aspect-[4/5] rounded-2xl overflow-hidden bg-gray-50 relative group">
                    <AnimatePresence mode="wait">
                      <motion.img 
                        key={activeImageIndex}
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        src={images[activeImageIndex]} 
                        alt={`${product.name} - View ${activeImageIndex + 1}`} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-crosshair"
                      />
                    </AnimatePresence>
                    {product.badge && (
                      <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-bold tracking-widest px-3 py-1.5 rounded-full shadow-sm">
                        {product.badge}
                      </div>
                    )}
                  </div>
                  {/* Thumbnails */}
                  <div className="grid grid-cols-4 gap-3">
                    {images.map((img, idx) => (
                      <button 
                        key={idx}
                        onClick={() => setActiveImageIndex(idx)}
                        className={`aspect-[4/5] rounded-xl overflow-hidden relative ${activeImageIndex === idx ? 'ring-2 ring-[#C4A35A] ring-offset-2' : 'hover:opacity-80'} bg-gray-50 transition-all`}
                      >
                        <img src={img} alt="" className="w-full h-full object-cover" />
                        {activeImageIndex === idx && <div className="absolute inset-0 bg-white/10" />}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Product Info */}
                <div className="flex flex-col">
                  <div className="text-[#C4A35A] text-[10px] font-medium tracking-[0.2em] mb-2">{product.category || 'HOME'}</div>
                  <h2 id="modal-title" className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-3 leading-tight">{product.name}</h2>
                  
                  <div className="flex items-center gap-3 mb-6 pb-6 border-b border-black/5">
                    <span className="text-2xl font-medium text-[#C4A35A]">EGP {product.price?.toLocaleString()}</span>
                    {product.originalPrice && (
                      <s className="text-lg text-[#1A1A1A]/40">EGP {product.originalPrice?.toLocaleString()}</s>
                    )}
                  </div>

                  <div className="text-sm text-gray-600 leading-relaxed mb-8">
                    Crafted from 100% long-staple Egyptian cotton, bringing the luxury of a five-star hotel right to your bedroom. Featuring a buttery smooth sateen weave.
                  </div>

                  {/* Variant Selectors */}
                  <div className="space-y-6 mb-8">
                    {/* Colors */}
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-[#1A1A1A]/50 uppercase mb-3">Color: <span className="text-[#1A1A1A] font-medium ml-1 capitalize">{colors.find(c => c.id === selectedColor)?.name}</span></div>
                      <div className="flex items-center gap-x-3">
                        {colors.map((color) => (
                          <button
                            key={color.id}
                            aria-label={`Select color ${color.name}`}
                            onClick={() => setSelectedColor(color.id)}
                            className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${selectedColor === color.id ? 'ring-2 ring-[#C4A35A] ring-offset-2' : 'ring-1 ring-black/10 hover:ring-black/30'}`}
                          >
                            <span className="w-8 h-8 rounded-full border border-black/5 shadow-sm" style={{ backgroundColor: color.hex }} />
                          </button>
                        ))}
                      </div>
                    </div>

                    {/* Sizes */}
                    <div>
                      <div className="text-xs font-semibold tracking-widest text-[#1A1A1A]/50 uppercase mb-3">Size</div>
                      <div className="flex flex-wrap gap-3">
                        {sizes.map((size) => (
                          <button
                            key={size}
                            onClick={() => setSelectedSize(size)}
                            className={`py-2.5 px-5 rounded-xl text-sm transition-all duration-300 ${selectedSize === size ? 'bg-[#1A1A1A] text-white shadow-md' : 'bg-transparent text-[#1A1A1A] border border-black/10 hover:border-black/30 hover:bg-gray-50'}`}
                          >
                            {size}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* Frequently Bought Together (Upsell inside Quick View) */}
                  <div className="mb-8 bg-gray-50/80 rounded-2xl p-5 border border-black/5">
                    <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">Frequently Bought Together</h3>
                    <div className="flex flex-col gap-3">
                      <div className="flex items-center justify-between">
                        <label className="flex items-center gap-3 cursor-pointer flex-1">
                          <input type="checkbox" checked disabled className="form-checkbox bg-[#1A1A1A] border-none text-white rounded focus:ring-[#C4A35A]" />
                          <div className="flex items-center gap-3 flex-1">
                            <img src={images[0]} alt="Current item" className="w-10 h-10 object-cover rounded shadow-sm" />
                            <span className="text-sm font-medium line-clamp-1">This item: {product.name}</span>
                          </div>
                        </label>
                      </div>
                      {fbtProducts.map((prod, idx) => (
                        <div key={idx} className="flex items-center justify-between pl-1">
                          <label className="flex items-center gap-3 cursor-pointer flex-1">
                            <input 
                              type="checkbox" 
                              checked={fbtSelected[idx]}
                              onChange={() => {
                                const newSelected = [...fbtSelected];
                                newSelected[idx] = !newSelected[idx];
                                setFbtSelected(newSelected);
                              }}
                              className="form-checkbox rounded text-[#C4A35A] focus:ring-[#C4A35A]" 
                            />
                            <div className="flex items-center gap-3 flex-1">
                              <img src={prod.img} alt={prod.name} className="w-10 h-10 object-cover rounded shadow-sm" />
                              <span className="text-sm text-gray-600 hover:text-[#C4A35A] transition-colors line-clamp-1">{prod.name}</span>
                            </div>
                          </label>
                          <span className="text-sm font-medium ml-2">EGP {prod.price.toLocaleString()}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Quantity & Add to Cart Sticky Footer for Mobile */}
                  <div className="mt-auto pt-6 border-t border-black/5 flex flex-col sm:flex-row gap-4 sticky bottom-0 bg-white pb-4 sm:pb-0 z-20">
                    <div className="flex items-center justify-between sm:justify-start border border-black/10 rounded-xl bg-gray-50 w-full sm:w-32 h-14 px-2">
                      <button onClick={() => setQuantity(Math.max(1, quantity - 1))} className="p-3 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                        <Minus className="w-4 h-4" />
                      </button>
                      <span className="font-medium text-sm text-center">{quantity}</span>
                      <button onClick={() => setQuantity(quantity + 1)} className="p-3 text-[#1A1A1A]/50 hover:text-[#1A1A1A] transition-colors">
                        <Plus className="w-4 h-4" />
                      </button>
                    </div>

                    <motion.button 
                      whileHover={!isLoading && !isSuccess ? { scale: 1.02 } : {}}
                      whileTap={!isLoading && !isSuccess ? { scale: 0.98 } : {}}
                      onClick={handleAddToCart}
                      disabled={isLoading || isSuccess}
                      className={`flex-1 h-14 text-sm font-semibold tracking-widest rounded-xl transition-all relative overflow-hidden flex items-center justify-center shadow-lg
                        ${isSuccess ? 'bg-green-600 text-white' : 'bg-[#1A1A1A] hover:bg-[#C4A35A] text-white'}`}
                    >
                      {isLoading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      ) : isSuccess ? (
                        <span className="flex items-center gap-2">ADDED TO CART</span>
                      ) : (
                        <span>ADD TO CART</span>
                      )}
                    </motion.button>
                  </div>
                  
                  <div className="text-center mt-6">
                    <a href="/preview/shatta-homepage/ProductDetail" className="text-xs text-[#1A1A1A]/50 underline hover:text-[#1A1A1A] transition-colors uppercase tracking-widest font-medium">View full details</a>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}

