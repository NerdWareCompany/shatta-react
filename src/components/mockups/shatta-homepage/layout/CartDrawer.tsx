import React, { useEffect } from 'react';
import { X, Trash2, Plus, Minus, Lock } from 'lucide-react';

export function CartDrawer({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex justify-end">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Drawer Panel */}
      <div className="relative w-full max-w-[420px] bg-white shadow-2xl flex flex-col animate-in slide-in-from-right duration-500">
        
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-5 border-b border-gray-100 shrink-0">
          <h2 className="font-serif text-2xl text-[#1A1A1A] m-0 flex items-center gap-2">
            Your Cart
            <span className="text-sm font-sans bg-gray-100 text-gray-600 px-2 py-0.5 rounded-full">2</span>
          </h2>
          <button 
            onClick={onClose}
            className="p-2 -mr-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Free Shipping Bar */}
        <div className="shrink-0 px-6 py-4 border-b border-gray-100 bg-gray-50">
          <div className="text-sm text-center text-gray-600 mb-2">
            Only <span className="font-bold text-[#1A1A1A]">EGP 500</span> away from <span className="font-bold">FREE Shipping</span>
          </div>
          <div className="w-full h-1.5 rounded-full overflow-hidden bg-[#E8E0D4]">
            <div className="h-full bg-[#1A1A1A] transition-all duration-500 ease-out" style={{ width: '80%' }}></div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto px-6 py-6 hide-scrollbar">
          <div className="flex flex-col gap-6">
            
            {/* Mock Item 1 */}
            <div className="flex gap-4">
              <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50">
                <img src="https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <a href="#" className="text-base font-serif text-[#1A1A1A] hover:text-[#C4A35A] transition-colors line-clamp-2 leading-tight">
                    Classic Velvet Sofa
                  </a>
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mb-2 truncate">Navy Blue / 3 Seater</div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg h-9 bg-gray-50">
                    <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 h-full flex items-center justify-center text-sm font-medium">1</span>
                    <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-sm font-medium text-[#1A1A1A]">EGP 24,500</div>
                </div>
              </div>
            </div>

            {/* Mock Item 2 */}
            <div className="flex gap-4">
              <div className="w-24 h-24 shrink-0 rounded-lg overflow-hidden bg-gray-50">
                <img src="https://images.unsplash.com/photo-1505693314120-0d443867891c?auto=format&fit=crop&q=80&w=200" alt="Product" className="w-full h-full object-cover" />
              </div>
              <div className="flex-1 flex flex-col min-w-0">
                <div className="flex justify-between items-start gap-2 mb-1">
                  <a href="#" className="text-base font-serif text-[#1A1A1A] hover:text-[#C4A35A] transition-colors line-clamp-2 leading-tight">
                    Modern Lounge Chair
                  </a>
                  <button className="text-gray-400 hover:text-red-500 transition-colors p-1 -mr-1">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
                <div className="text-xs text-gray-500 mb-2 truncate">Beige</div>
                <div className="mt-auto flex items-center justify-between">
                  <div className="flex items-center border border-gray-200 rounded-lg h-9 bg-gray-50">
                    <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Minus className="w-3 h-3" /></button>
                    <span className="w-8 h-full flex items-center justify-center text-sm font-medium">1</span>
                    <button className="w-8 h-full flex items-center justify-center text-gray-500 hover:text-black transition-colors"><Plus className="w-3 h-3" /></button>
                  </div>
                  <div className="text-sm font-medium text-[#1A1A1A]">
                    <div className="flex flex-col items-end">
                      <s className="text-gray-400 text-xs">EGP 9,500</s>
                      <span className="text-red-600">EGP 8,000</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>

          {/* Upsells */}
          <div className="mt-8 pt-6 border-t border-gray-100">
            <h3 className="font-serif text-lg text-[#1A1A1A] mb-4">Frequently Bought Together</h3>
            <div className="flex overflow-x-auto gap-4 pb-4 hide-scrollbar">
              {[1, 2, 3].map((i) => (
                <div key={i} className="flex-none w-32 flex flex-col group">
                  <a href="#" className="block aspect-square rounded-xl overflow-hidden bg-gray-50 mb-3 relative">
                    <img src={`https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&q=80&w=200`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    <button className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-white/90 backdrop-blur shadow text-[#1A1A1A] hover:bg-[#C4A35A] hover:text-white transition-colors flex items-center justify-center">
                      <Plus className="w-4 h-4" />
                    </button>
                  </a>
                  <a href="#" className="text-xs font-medium text-[#1A1A1A] group-hover:text-[#C4A35A] transition-colors line-clamp-1 mb-1">Decorative Pillow</a>
                  <div className="text-xs text-gray-500 font-medium">EGP 850</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="shrink-0 p-6 border-t border-gray-100 bg-gray-50 mt-auto">
          <div className="flex items-center justify-between mb-4">
            <span className="text-gray-600">Subtotal</span>
            <span className="text-lg font-medium text-[#1A1A1A]">EGP 32,500</span>
          </div>
          <p className="text-xs text-gray-500 mb-6 text-center">Taxes and shipping calculated at checkout.</p>
          <a href="/preview/shatta-homepage/Checkout" className="w-full inline-flex items-center justify-center px-8 py-4 bg-[#1A1A1A] hover:bg-[#C4A35A] text-white text-sm font-medium tracking-widest rounded-xl transition-all shadow-lg hover:shadow-xl group relative overflow-hidden">
            <span className="relative z-10 flex items-center justify-center gap-2">
              <Lock className="w-4 h-4" />
              CHECKOUT
            </span>
          </a>
          <a href="/preview/shatta-homepage/Cart" className="block text-center mt-4 text-sm text-gray-500 underline hover:text-black transition-colors">View Cart</a>
        </div>

      </div>
    </div>
  );
}
