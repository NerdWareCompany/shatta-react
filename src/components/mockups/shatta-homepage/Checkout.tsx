import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Lock, Check, ChevronRight, CreditCard, Banknote, ShieldCheck, Search, Heart, User, ShoppingCart, Instagram, Facebook } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Checkout() {
  const [deliveryMethod, setDeliveryMethod] = useState('standard');
  const [paymentMethod, setPaymentMethod] = useState('card');
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const orderItems = [
    { name: 'Signature Sateen Duvet Cover', variant: 'King / Ivory', qty: 1, price: 'EGP 3,450', img: 'https://api.shatta.com/storage/3249/pouf-139.jpg' },
    { name: 'Plush Egyptian Towel Set', variant: 'Set of 4 / White', qty: 2, price: 'EGP 3,600', img: 'https://api.shatta.com/storage/3244/pouf-146_L.jpg' },
    { name: 'Ceramic Table Lamp', variant: 'Beige', qty: 1, price: 'EGP 2,100', img: 'https://api.shatta.com/storage/3221/pouf-177_L.jpg' }
  ];

  const subtotal = 9150;
  const shipping = deliveryMethod === 'standard' ? 0 : 100;
  const total = subtotal + shipping;

  const InputField = ({ label, type = "text", placeholder = "", className = "", required = false }: any) => (
    <div className={`relative ${className}`}>
      <label className="text-[10px] font-medium text-[#1A1A1A]/50 absolute top-2.5 start-4 tracking-widest uppercase pointer-events-none">{label}</label>
      <input 
        type={type} 
        placeholder={placeholder}
        required={required}
        className="w-full bg-white border border-[#E8E0D4] rounded-xl pt-7 pb-2.5 px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm placeholder:text-[#1A1A1A]/30"
      />
    </div>
  );

  const SelectField = ({ label, className = "", options = [] }: any) => (
    <div className={`relative ${className}`}>
      <label className="text-[10px] font-medium text-[#1A1A1A]/50 absolute top-2.5 start-4 tracking-widest uppercase z-10 pointer-events-none">{label}</label>
      <select defaultValue="" className="w-full bg-white border border-[#E8E0D4] rounded-xl pt-7 pb-2.5 px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm appearance-none relative z-0">
        <option value="" disabled className="text-[#1A1A1A]/30">Select...</option>
        {options.map((opt: string) => <option key={opt}>{opt}</option>)}
      </select>
      <div className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <ChevronRight className="w-4 h-4 text-[#1A1A1A]/40 rotate-90" />
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#1A1A1A] selection:bg-[#C4A35A] selection:text-white">
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

      <main className="max-w-6xl mx-auto px-4 md:px-8 py-8 lg:py-12 flex flex-col lg:flex-row gap-12 lg:gap-20">
        
        {/* LEFT COLUMN - Form */}
        <div className="flex-1 w-full lg:w-3/5">
          
          {/* Step Indicator */}
          <div className="flex items-center justify-center sm:justify-start gap-3 mb-10 overflow-x-auto pb-2 hide-scrollbar">
            <div className="flex items-center gap-2 px-4 py-2 bg-[#E8E0D4]/50 rounded-full text-xs font-medium text-[#1A1A1A]/60 flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#1A1A1A]/20 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
              Information
            </div>
            <div className="w-6 h-[1px] bg-[#E8E0D4] flex-shrink-0"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#E8E0D4]/50 rounded-full text-xs font-medium text-[#1A1A1A]/60 flex-shrink-0">
              <div className="w-4 h-4 rounded-full bg-[#1A1A1A]/20 flex items-center justify-center"><Check className="w-3 h-3 text-white" /></div>
              Shipping
            </div>
            <div className="w-6 h-[1px] bg-[#E8E0D4] flex-shrink-0"></div>
            <div className="flex items-center gap-2 px-4 py-2 bg-[#C4A35A]/10 border border-[#C4A35A]/30 rounded-full text-xs font-medium text-[#C4A35A] flex-shrink-0 shadow-sm shadow-[#C4A35A]/10">
              <div className="w-4 h-4 rounded-full bg-[#C4A35A] flex items-center justify-center text-white text-[10px]">3</div>
              Payment
            </div>
          </div>

          <div className="space-y-10">
            {/* Contact */}
            <section>
              <h2 className="font-serif text-2xl text-[#1A1A1A] mb-5">Contact</h2>
              <div className="bg-white rounded-2xl p-1">
                <InputField label="Email Address" type="email" placeholder="you@example.com" />
              </div>
            </section>

            {/* Shipping Address */}
            <section>
              <h2 className="font-serif text-2xl text-[#1A1A1A] mb-5">Shipping Address</h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <InputField label="First Name" />
                <InputField label="Last Name" />
                <InputField label="Address" className="sm:col-span-2" placeholder="Street address or P.O. Box" />
                <InputField label="Apartment, suite, etc." className="sm:col-span-2" placeholder="Optional" />
                <InputField label="City" />
                <SelectField label="Governorate" options={['Cairo', 'Giza', 'Alexandria', 'Dakahlia', 'Red Sea', 'South Sinai']} />
                <InputField label="Postal Code" />
                <InputField label="Phone" type="tel" />
              </div>
            </section>

            {/* Delivery Method */}
            <section>
              <h2 className="font-serif text-2xl text-[#1A1A1A] mb-5">Delivery Method</h2>
              <div className="flex flex-col gap-3">
                <div 
                  onClick={() => setDeliveryMethod('standard')}
                  className={`cursor-pointer rounded-2xl border p-5 flex items-center justify-between transition-all duration-300 ${deliveryMethod === 'standard' ? 'border-[#C4A35A] bg-[#C4A35A]/5 shadow-md shadow-[#C4A35A]/10' : 'border-[#E8E0D4] bg-white hover:border-[#1A1A1A]/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${deliveryMethod === 'standard' ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-[#1A1A1A]/30'}`}>
                      {deliveryMethod === 'standard' && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">Standard Delivery</div>
                      <div className="text-xs text-[#1A1A1A]/60 mt-0.5">3-5 business days</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-[#1A1A1A]">Free</div>
                </div>

                <div 
                  onClick={() => setDeliveryMethod('express')}
                  className={`cursor-pointer rounded-2xl border p-5 flex items-center justify-between transition-all duration-300 ${deliveryMethod === 'express' ? 'border-[#C4A35A] bg-[#C4A35A]/5 shadow-md shadow-[#C4A35A]/10' : 'border-[#E8E0D4] bg-white hover:border-[#1A1A1A]/30'}`}
                >
                  <div className="flex items-center gap-4">
                    <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${deliveryMethod === 'express' ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-[#1A1A1A]/30'}`}>
                      {deliveryMethod === 'express' && <Check className="w-3 h-3 text-white" />}
                    </div>
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">Express Delivery</div>
                      <div className="text-xs text-[#1A1A1A]/60 mt-0.5">1-2 business days</div>
                    </div>
                  </div>
                  <div className="text-sm font-medium text-[#1A1A1A]">EGP 100</div>
                </div>
              </div>
            </section>

            {/* Payment */}
            <section>
              <div className="flex items-center justify-between mb-5">
                <h2 className="font-serif text-2xl text-[#1A1A1A]">Payment</h2>
                <span className="text-[10px] text-[#1A1A1A]/50 tracking-widest uppercase flex items-center gap-1"><Lock className="w-3 h-3" /> Secure</span>
              </div>
              
              <div className="border border-[#E8E0D4] rounded-2xl overflow-hidden bg-white shadow-sm shadow-black/5">
                
                {/* Credit Card */}
                <div 
                  onClick={() => setPaymentMethod('card')}
                  className={`cursor-pointer p-5 border-b border-[#E8E0D4] transition-colors duration-300 ${paymentMethod === 'card' ? 'bg-[#C4A35A]/5' : 'hover:bg-[#E8E0D4]/20'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'card' ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-[#1A1A1A]/30'}`}>
                        {paymentMethod === 'card' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="text-sm font-medium text-[#1A1A1A] flex items-center gap-2">
                        Credit / Debit Card
                      </div>
                    </div>
                    <div className="flex gap-1">
                      <div className="w-10 h-6 bg-[#E8E0D4] rounded flex items-center justify-center"><CreditCard className="w-4 h-4 text-[#1A1A1A]/50" /></div>
                    </div>
                  </div>
                </div>

                <AnimatePresence initial={false}>
                  {paymentMethod === 'card' && (
                    <motion.div 
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                      className="overflow-hidden bg-[#C4A35A]/5 px-5 pb-6 border-b border-[#E8E0D4]"
                    >
                      <div className="pt-2 space-y-4">
                        <InputField label="Card Number" placeholder="0000 0000 0000 0000" />
                        <div className="grid grid-cols-2 gap-4">
                          <InputField label="Expiration Date" placeholder="MM / YY" />
                          <InputField label="Security Code" placeholder="CVC" />
                        </div>
                        <InputField label="Name on Card" />
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>

                {/* Cash on Delivery */}
                <div 
                  onClick={() => setPaymentMethod('cod')}
                  className={`cursor-pointer p-5 border-b border-[#E8E0D4] transition-colors duration-300 ${paymentMethod === 'cod' ? 'bg-[#C4A35A]/5' : 'hover:bg-[#E8E0D4]/20'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'cod' ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-[#1A1A1A]/30'}`}>
                        {paymentMethod === 'cod' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="text-sm font-medium text-[#1A1A1A]">Cash on Delivery</div>
                    </div>
                    <Banknote className="w-6 h-6 text-[#1A1A1A]/40" />
                  </div>
                </div>

                {/* Fawry */}
                <div 
                  onClick={() => setPaymentMethod('fawry')}
                  className={`cursor-pointer p-5 transition-colors duration-300 ${paymentMethod === 'fawry' ? 'bg-[#C4A35A]/5' : 'hover:bg-[#E8E0D4]/20'}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className={`w-5 h-5 rounded-full border flex items-center justify-center transition-colors duration-300 ${paymentMethod === 'fawry' ? 'border-[#C4A35A] bg-[#C4A35A]' : 'border-[#1A1A1A]/30'}`}>
                        {paymentMethod === 'fawry' && <Check className="w-3 h-3 text-white" />}
                      </div>
                      <div className="text-sm font-medium text-[#1A1A1A]">Fawry Pay</div>
                    </div>
                  </div>
                </div>

              </div>
            </section>

            {/* Place Order CTA */}
            <div className="pt-6 pb-4">
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                className="w-full bg-[#C4A35A] hover:bg-[#B39249] text-white py-5 rounded-full text-sm font-medium tracking-[0.1em] shadow-xl shadow-[#C4A35A]/20 transition-all flex items-center justify-center gap-2 group"
              >
                PLACE ORDER <Lock className="w-4 h-4 opacity-70 group-hover:opacity-100 transition-opacity" />
              </motion.button>
              <p className="text-center text-[10px] text-[#1A1A1A]/40 mt-5 tracking-wide">
                By placing your order, you agree to our Terms of Service and Privacy Policy.
              </p>
            </div>

          </div>
        </div>

        {/* RIGHT COLUMN - Order Summary */}
        <div className="w-full lg:w-2/5">
          <div className="bg-[#E8E0D4]/30 border border-[#E8E0D4] rounded-[2.5rem] p-6 lg:p-8 sticky top-28 shadow-sm">
            <h2 className="font-serif text-2xl text-[#1A1A1A] mb-8">Order Summary</h2>
            
            {/* Items */}
            <div className="space-y-5 mb-8">
              {orderItems.map((item, idx) => (
                <div key={idx} className="flex gap-4">
                  <div className="relative flex-shrink-0">
                    <div className="w-20 h-20 rounded-2xl overflow-hidden border border-[#E8E0D4] bg-white shadow-sm shadow-black/5">
                      <img src={item.img} alt={item.name} className="w-full h-full object-cover" />
                    </div>
                    <span className="absolute -top-2 -end-2 w-6 h-6 bg-[#1A1A1A] text-white text-[10px] font-medium flex items-center justify-center rounded-full shadow-md">
                      {item.qty}
                    </span>
                  </div>
                  <div className="flex-1 flex flex-col justify-center">
                    <h4 className="text-sm font-medium text-[#1A1A1A] line-clamp-1">{item.name}</h4>
                    <p className="text-[11px] text-[#1A1A1A]/60 mt-1">{item.variant}</p>
                    <p className="text-sm font-medium text-[#1A1A1A] mt-2">{item.price}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="border-t border-[#E8E0D4] py-8 space-y-4">
              <div className="flex gap-2">
                <input 
                  type="text" 
                  placeholder="Discount code or gift card" 
                  className="flex-1 bg-white border border-[#E8E0D4] rounded-xl px-4 py-3.5 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm placeholder:text-[#1A1A1A]/30"
                />
                <motion.button 
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="px-6 py-3.5 bg-[#1A1A1A] hover:bg-[#333] text-white rounded-xl text-sm font-medium transition-colors shadow-md shadow-black/10"
                >
                  Apply
                </motion.button>
              </div>
            </div>

            <div className="border-t border-[#E8E0D4] py-8 space-y-4">
              <div className="flex justify-between text-sm">
                <span className="text-[#1A1A1A]/70">Subtotal</span>
                <span className="font-medium text-[#1A1A1A]">EGP {subtotal.toLocaleString()}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#1A1A1A]/70">Shipping</span>
                <span className="font-medium text-[#1A1A1A]">{shipping === 0 ? 'Free' : `EGP ${shipping}`}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-[#1A1A1A]/70">Taxes</span>
                <span className="font-medium text-[#1A1A1A]">Calculated at checkout</span>
              </div>
            </div>

            <div className="border-t border-[#1A1A1A]/10 pt-8 flex justify-between items-center">
              <span className="text-lg font-medium text-[#1A1A1A]">Total</span>
              <div className="text-end">
                <span className="text-[10px] text-[#1A1A1A]/50 me-2">EGP</span>
                <span className="font-serif text-3xl md:text-4xl font-medium text-[#1A1A1A]">{total.toLocaleString()}</span>
              </div>
            </div>

          </div>
        </div>

      </main>

      <Footer />
    </div>
  );
}

export default Checkout;
