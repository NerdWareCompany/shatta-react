import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, ChevronRight, X, Plus, Minus, Lock, Truck } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Cart() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const [cartItems, setCartItems] = useState([
    { id: 1, name: 'Signature Sateen Duvet Cover', variant: 'Color: Pearl · Size: Queen', unitPrice: 3450, qty: 1, img: 'https://api.shatta.com/storage/3281/pouf-15_L-(2).jpg' },
    { id: 2, name: 'Plush Egyptian Towel Set', variant: 'Color: Sand', unitPrice: 1800, qty: 2, img: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg' },
    { id: 3, name: 'Velvet Accent Cushion', variant: 'Color: Terracotta', unitPrice: 850, qty: 1, img: 'https://api.shatta.com/storage/4437/lehaf_168_L.jpg' },
    { id: 4, name: 'Handwoven Jute Rug', variant: 'Size: 200x300cm', unitPrice: 5600, qty: 1, img: 'https://api.shatta.com/storage/277/CUSH1_475.jpg' },
  ]);

  const recommended = [
    { name: 'Ceramic Table Lamp', price: 'EGP 2,100', img: 'https://api.shatta.com/storage/3265/pouf-91.jpg' },
    { name: 'Hotel Collection Sheets', price: 'EGP 4,200', img: 'https://api.shatta.com/storage/3227/pouf-176_L.jpg' },
    { name: 'Marble Bathroom Set', price: 'EGP 1,450', img: 'https://api.shatta.com/storage/3236/pouf-157.jpg' },
  ];

  const updateQty = (id: number, delta: number) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = Math.max(1, item.qty + delta);
        return { ...item, qty: newQty };
      }
      return item;
    }));
  };

  const removeItem = (id: number) => {
    setCartItems(prev => prev.filter(item => item.id !== id));
  };

  const subtotal = cartItems.reduce((sum, item) => sum + (item.unitPrice * item.qty), 0);
  const tax = subtotal * 0.14; // 14% VAT roughly
  const total = subtotal + tax;

  const fadeUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const formatPrice = (num: number) => {
    return new Intl.NumberFormat('en-EG', { style: 'currency', currency: 'EGP', minimumFractionDigits: 0, maximumFractionDigits: 0 }).format(num).replace('EGP', 'EGP ');
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

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-8">
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Home</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#C4A35A] font-medium">Shopping Cart</span>
        </div>

        {/* Page Title */}
        <div className="mb-10">
          <h1 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-2">Your Cart</h1>
          <p className="text-[#1A1A1A]/60 text-sm font-medium">{cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-10 lg:gap-12">
          
          {/* LEFT: Cart Items */}
          <div className="flex-1">
            <motion.div 
              initial="hidden"
              animate="visible"
              variants={staggerContainer}
              className="flex flex-col gap-6"
            >
              <AnimatePresence>
                {cartItems.map((item) => (
                  <motion.div 
                    key={item.id}
                    layout
                    variants={fadeUp}
                    initial="hidden"
                    animate="visible"
                    exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.3 } }}
                    className="flex flex-col sm:flex-row gap-6 p-4 md:p-6 bg-white border border-[#E8E0D4] rounded-2xl md:rounded-3xl shadow-sm hover:shadow-md hover:border-[#C4A35A]/30 transition-all duration-300 relative group"
                  >
                    <button 
                      onClick={() => removeItem(item.id)}
                      className="absolute top-4 end-4 p-2 text-[#1A1A1A]/30 hover:text-[#800000] hover:bg-[#800000]/5 rounded-full transition-colors z-10"
                      aria-label="Remove item"
                    >
                      <X className="w-4 h-4" />
                    </button>
                    
                    <div className="w-full sm:w-[140px] aspect-square rounded-xl overflow-hidden bg-[#F9F9F9] flex-shrink-0">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" />
                    </div>
                    
                    <div className="flex-1 flex flex-col justify-center">
                      <div className="pe-8 mb-2">
                        <h3 className="font-serif text-xl md:text-2xl text-[#1A1A1A] mb-1">{item.name}</h3>
                        <p className="text-sm text-[#1A1A1A]/60 font-light">{item.variant}</p>
                      </div>
                      
                      <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
                        <div className="text-sm font-medium text-[#1A1A1A]/80">
                          {formatPrice(item.unitPrice)}
                        </div>
                        
                        <div className="flex items-center bg-[#F9F9F9] border border-[#E8E0D4] rounded-full p-1 shadow-inner shadow-black/5">
                          <button 
                            onClick={() => updateQty(item.id, -1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-[#1A1A1A]/70 transition-all"
                            disabled={item.qty <= 1}
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="w-8 text-center text-sm font-semibold">{item.qty}</span>
                          <button 
                            onClick={() => updateQty(item.id, 1)}
                            className="w-8 h-8 flex items-center justify-center rounded-full hover:bg-white hover:shadow-sm text-[#1A1A1A]/70 transition-all"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                        
                        <div className="text-lg font-semibold text-[#1A1A1A]">
                          {formatPrice(item.unitPrice * item.qty)}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {cartItems.length === 0 && (
                <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="py-16 text-center border border-dashed border-[#E8E0D4] rounded-3xl"
                >
                  <ShoppingCart className="w-12 h-12 text-[#1A1A1A]/20 mx-auto mb-4" />
                  <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Your cart is empty</h3>
                  <p className="text-[#1A1A1A]/60 font-light mb-6">Looks like you haven't added anything yet.</p>
                  <a href="/preview/shatta-homepage/Shop" className="inline-block bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-sm font-medium tracking-wider hover:bg-[#C4A35A] transition-colors">
                    CONTINUE SHOPPING
                  </a>
                </motion.div>
              )}
            </motion.div>

            {/* Recommended Products */}
            <div className="mt-20">
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6">You may also like</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {recommended.map((product, idx) => (
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.1, duration: 0.5 }}
                    key={idx} 
                    className="group cursor-pointer flex flex-col"
                  >
                    <div className="relative aspect-square overflow-hidden bg-[#FFFFFF] rounded-2xl mb-4 shadow-sm shadow-black/5 group-hover:shadow-lg transition-shadow p-1.5 border border-[#E8E0D4]/50">
                      <div className="w-full h-full rounded-xl overflow-hidden relative">
                        <div className="absolute top-2 end-2 z-20">
                          <button 
                            onClick={(e) => { e.preventDefault(); }}
                            className="bg-white/80 hover:bg-white backdrop-blur-md text-[#1A1A1A] hover:text-red-500 p-1.5 rounded-full shadow-sm transition-colors"
                            aria-label="Add to wishlist"
                          >
                            <Heart className="w-3 h-3" />
                          </button>
                        </div>
                        <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-out" />
                        <div className="absolute bottom-2 start-2 end-2 translate-y-0 opacity-100 transition-all duration-300 ease-out">
                          <button className="w-full bg-white/90 backdrop-blur-md hover:bg-[#C4A35A] hover:text-white text-[#1A1A1A] py-2 text-[10px] font-bold tracking-widest rounded-lg transition-colors shadow-sm">
                            ADD
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className="px-1">
                      <h4 className="font-serif text-base text-[#1A1A1A] leading-snug mb-1 group-hover:text-[#C4A35A] transition-colors line-clamp-1">{product.name}</h4>
                      <div className="text-xs text-[#1A1A1A]/70 font-medium">{product.price}</div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT: Order Summary */}
          <div className="w-full lg:w-[400px] xl:w-[450px] flex-shrink-0">
            <div className="sticky top-32">
              <div className="bg-[#F9F9F9] rounded-[2.5rem] p-8 md:p-10 shadow-xl shadow-black/5 border border-[#E8E0D4]/50 relative overflow-hidden">
                <div className="absolute top-0 end-0 w-[300px] h-[300px] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-[#C4A35A]/5 to-transparent opacity-50 blur-2xl pointer-events-none rounded-full rtl:-translate-x-0 rtl:translate-x-reverse translate-x-1/3 -translate-y-1/3"></div>
                
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-8 relative z-10">Order Summary</h3>
                
                <div className="space-y-4 mb-8 text-sm font-medium relative z-10">
                  <div className="flex justify-between items-center text-[#1A1A1A]/80">
                    <span>Subtotal</span>
                    <span>{formatPrice(subtotal)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#1A1A1A]/80">
                    <span>Estimated Tax (14%)</span>
                    <span>{formatPrice(tax)}</span>
                  </div>
                  <div className="flex justify-between items-center text-[#1A1A1A]/80">
                    <span>Shipping</span>
                    <span className="text-[#C4A35A]">Free</span>
                  </div>
                </div>

                <div className="mb-8 relative z-10">
                  <p className="text-xs font-medium text-[#1A1A1A]/60 mb-3">Discount Code</p>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      placeholder="Enter code" 
                      className="flex-1 bg-white border border-[#E8E0D4] rounded-full px-5 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/30 focus:outline-none focus:border-[#C4A35A] transition-colors shadow-inner shadow-black/5"
                    />
                    <button className="bg-[#1A1A1A] text-white px-6 py-3 rounded-full text-xs font-bold tracking-wider hover:bg-[#C4A35A] transition-colors">
                      APPLY
                    </button>
                  </div>
                </div>

                <div className="h-[1px] w-full bg-[#E8E0D4] mb-8 relative z-10"></div>

                <div className="flex justify-between items-end mb-8 relative z-10">
                  <span className="text-[#1A1A1A] font-medium">Total</span>
                  <span className="font-serif text-3xl font-bold text-[#1A1A1A]">{formatPrice(total)}</span>
                </div>

                <a href="/preview/shatta-homepage/Checkout" className="w-full block relative z-10">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-[#C4A35A] hover:bg-[#B39249] text-white py-4.5 rounded-full text-sm font-bold tracking-[0.15em] transition-colors shadow-lg shadow-[#C4A35A]/20 overflow-hidden group"
                    disabled={cartItems.length === 0}
                  >
                    <span className="absolute inset-0 w-full h-full bg-[#1A1A1A] origin-[left] rtl:origin-[right] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"></span>
                    <span className="relative z-10">PROCEED TO CHECKOUT</span>
                  </motion.button>
                </a>

                <div className="mt-8 flex justify-center gap-6 text-[#1A1A1A]/40 relative z-10">
                  <div className="flex flex-col items-center gap-2">
                    <Lock className="w-5 h-5" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">Secure Checkout</span>
                  </div>
                  <div className="flex flex-col items-center gap-2">
                    <Truck className="w-5 h-5" />
                    <span className="text-[10px] font-medium tracking-wider uppercase">Free Delivery</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Cart;
