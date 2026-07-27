import React, { useState, useEffect } from 'react';
import { Search, Heart, User, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { CartDrawer } from './CartDrawer';
import { PredictiveSearch } from './PredictiveSearch';

export function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeAccordion, setActiveAccordion] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const toggleLanguage = () => {
    const html = document.documentElement;
    if (html.dir === 'rtl') {
      html.dir = 'ltr';
      html.lang = 'en';
    } else {
      html.dir = 'rtl';
      html.lang = 'ar';
    }
  };

  return (
    <>
      {/* 1. Announcement Bar */}
      <div className="bg-[#C4A35A] text-white text-xs font-light py-2.5 px-6 flex justify-between items-center tracking-wide">
        <div className="flex items-center gap-2 text-xs">
          <a href="/preview/shatta-homepage/Login" className="hover:text-white/80 font-medium transition-colors">Login</a>
          <span className="opacity-60">|</span>
          <a href="/preview/shatta-homepage/Register" className="hover:text-white/80 font-medium transition-colors">Register</a>
        </div>
        <div className="text-center flex-1 hidden sm:block">
          Free Shipping on Orders Over EGP 3,000 &middot; 25+ Branches Across Egypt &middot; Est. 1988
        </div>
        <div onClick={toggleLanguage} className="cursor-pointer hover:text-white/80 transition-colors">
          EN | عربي
        </div>
      </div>

      {/* 2. Header / Nav */}
      <header className={`sticky z-50 transition-all duration-700 ease-[0.16,1,0.3,1] ${isScrolled ? 'top-4 px-4 md:px-8' : 'top-0 px-0'}`}>
        <div className={`transition-all duration-700 ease-[0.16,1,0.3,1] w-full ${isScrolled ? 'bg-white/90 backdrop-blur-lg shadow-xl shadow-black/5 rounded-[2rem] border border-white/50' : 'bg-white border-b border-[#E8E0D4]'}`}>
          <div className={`px-6 flex items-center justify-between transition-all duration-700 ${isScrolled ? 'py-3' : 'py-4'}`}>
            {/* Left */}
            <div className="flex-1 flex items-center gap-4">
              <button 
                type="button" 
                className="md:hidden text-[#1A1A1A] hover:text-[#C4A35A] transition-colors"
                onClick={() => setIsMobileMenuOpen(true)}
              >
                <Menu className="w-6 h-6" />
              </button>
              
              <div 
                className="hidden sm:flex items-center text-[#1A1A1A]/60 hover:text-[#1A1A1A] transition-colors cursor-pointer group"
                onClick={() => setIsSearchOpen(true)}
              >
                <Search className="w-4 h-4 me-2" />
                <span className="text-sm font-light hidden sm:inline-block">Search products...</span>
              </div>
            </div>

            {/* Center */}
            <a href="/preview/shatta-homepage/Homepage" className="flex-1 flex flex-col items-center justify-center cursor-pointer transform hover:scale-105 transition-transform duration-500">
              <h1 className="font-serif font-bold text-3xl md:text-4xl tracking-wide text-[#1A1A1A] leading-none">SHATTA</h1>
              <span className={`text-[9px] font-medium tracking-[0.2em] text-[#C4A35A] mt-1 transition-opacity duration-300 ${isScrolled ? 'opacity-0 h-0 overflow-hidden' : 'opacity-100'}`}>ESTD.1988</span>
            </a>

            {/* Right */}
            <div className="flex-1 flex justify-end items-center gap-x-4 md:space-x-6 text-[#1A1A1A]">
              <a href="/preview/shatta-homepage/Account"><User className="w-5 h-5 cursor-pointer hover:text-[#C4A35A] transition-colors hidden sm:block" /></a>
              <Heart className="w-5 h-5 cursor-pointer hover:text-[#C4A35A] transition-colors" />
              <button 
                onClick={(e) => { e.preventDefault(); setIsCartOpen(true); }}
                className="relative cursor-pointer group"
              >
                <ShoppingCart className="w-5 h-5 group-hover:text-[#C4A35A] transition-colors" />
                <span className="absolute -top-1.5 -end-2 bg-[#C4A35A] text-white text-[10px] w-4 h-4 rounded-full flex items-center justify-center font-medium shadow-sm">3</span>
              </button>
            </div>
          </div>

          {/* Nav Links */}
          <nav className={`relative hidden md:block overflow-hidden transition-all duration-700 ${isScrolled ? 'h-0 opacity-0' : 'h-10 opacity-100'}`}>
            <ul className="flex justify-center gap-x-8 text-xs font-light tracking-[0.1em] text-[#1A1A1A]">
              {['HOME DECOR', 'BED & BATH', 'CURTAINS', 'BEACH', 'BRIDAL', 'CORPORATE', 'BRANCHES'].map((item) => (
                <li key={item} className={`cursor-pointer pb-2 relative group ${item === 'HOME DECOR' ? 'position-static' : ''}`}>
                  <a href="/preview/shatta-homepage/Shop" className="group-hover:text-[#C4A35A] transition-colors duration-300 flex items-center py-1">
                    {item}
                    {item === 'HOME DECOR' && <ChevronDown className="w-3 h-3 ml-1" />}
                  </a>
                  <span className="absolute bottom-0 start-0 w-full h-[2px] bg-[#C4A35A] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 origin-[left] rtl:origin-[right] rounded-full"></span>
                  
                  {item === 'HOME DECOR' && (
                    <div className="absolute left-0 w-full bg-white shadow-2xl border-t border-[#E8E0D4] pt-8 pb-12 px-8 mt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform translate-y-4 group-hover:translate-y-0 z-50 text-left">
                      <div className="max-w-7xl mx-auto flex gap-12">
                        {/* Links Columns */}
                        <div className="flex-1 flex gap-8">
                          <div className="flex-1">
                            <a href="/preview/shatta-homepage/Shop" className="font-serif text-lg text-[#1A1A1A] mb-4 block hover:text-[#C4A35A]">Living Room</a>
                            <ul className="space-y-3 normal-case tracking-normal text-sm text-gray-500">
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Sofas & Sectionals</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Coffee Tables</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">TV Units</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Rugs & Carpets</a></li>
                            </ul>
                          </div>
                          <div className="flex-1">
                            <a href="/preview/shatta-homepage/Shop" className="font-serif text-lg text-[#1A1A1A] mb-4 block hover:text-[#C4A35A]">Bedroom</a>
                            <ul className="space-y-3 normal-case tracking-normal text-sm text-gray-500">
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Beds & Headboards</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Nightstands</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Dressers</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="hover:text-[#1A1A1A] transition-colors">Wardrobes</a></li>
                            </ul>
                          </div>
                        </div>

                        {/* Promo Banner */}
                        <div className="w-72 shrink-0">
                          <a href="/preview/shatta-homepage/Shop" className="block group/promo relative overflow-hidden rounded-xl">
                            <img src="https://api.shatta.com/storage/4448/lehaf_098.jpg" alt="Promo" className="w-full h-[240px] object-cover group-hover/promo:scale-105 transition-transform duration-700" />
                            <div className="absolute inset-0 bg-black/20 group-hover/promo:bg-black/30 transition-colors"></div>
                            <div className="absolute inset-0 flex items-center justify-center">
                              <span className="text-white font-serif text-xl tracking-wide normal-case">New Collection</span>
                            </div>
                          </a>
                        </div>

                        {/* Featured Collection */}
                        <div className="w-64 shrink-0">
                          <h4 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">Featured</h4>
                          <div className="space-y-4">
                            {[
                              { title: 'Velvet Accent Cushion', price: 'EGP 850', img: 'https://api.shatta.com/storage/3235/pouf-157_L.jpg' },
                              { title: 'Ceramic Table Lamp', price: 'EGP 2,100', img: 'https://api.shatta.com/storage/4448/lehaf_098.jpg' }
                            ].map((prod) => (
                              <a key={prod.title} href="/preview/shatta-homepage/ProductDetail" className="flex gap-4 group/prod normal-case tracking-normal">
                                <div className="w-16 h-16 shrink-0 bg-gray-50 rounded-lg overflow-hidden">
                                  <img src={prod.img} alt={prod.title} className="w-full h-full object-cover group-hover/prod:scale-105 transition-transform duration-500" />
                                </div>
                                <div className="flex-1 min-w-0 flex flex-col justify-center text-left">
                                  <span className="text-sm text-[#1A1A1A] font-medium truncate group-hover/prod:text-[#C4A35A] transition-colors">{prod.title}</span>
                                  <span className="text-xs text-gray-500 mt-1">{prod.price}</span>
                                </div>
                              </a>
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Mobile Menu Drawer */}
      <div className={`fixed inset-0 z-[100] ${isMobileMenuOpen ? '' : 'pointer-events-none'}`}>
        <div 
          className={`absolute inset-0 bg-black/50 backdrop-blur-sm transition-opacity duration-300 ${isMobileMenuOpen ? 'opacity-100' : 'opacity-0'}`}
          onClick={() => setIsMobileMenuOpen(false)}
        ></div>
        <div className={`absolute inset-y-0 left-0 w-[85%] max-w-[320px] bg-white shadow-2xl flex flex-col transform transition-transform duration-500 ease-[0.16,1,0.3,1] ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'}`}>
          
          <div className="flex items-center justify-between p-6 border-b border-gray-100 shrink-0">
            <span className="font-serif font-bold text-xl tracking-wide text-[#1A1A1A]">MENU</span>
            <button 
              type="button" 
              className="p-2 -mr-2 text-gray-400 hover:text-black transition-colors rounded-full hover:bg-gray-50"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto hide-scrollbar py-4">
            <ul className="flex flex-col">
              {['HOME DECOR', 'BED & BATH', 'CURTAINS', 'BEACH', 'BRIDAL', 'CORPORATE', 'BRANCHES'].map((item) => (
                <li key={item} className="border-b border-gray-50 last:border-0">
                  {item === 'HOME DECOR' ? (
                    <details 
                      className="group/accordion" 
                      open={activeAccordion === item}
                      onClick={(e) => {
                        e.preventDefault();
                        setActiveAccordion(activeAccordion === item ? null : item);
                      }}
                    >
                      <summary className="flex items-center justify-between px-6 py-4 text-[#1A1A1A] font-medium cursor-pointer list-none">
                        {item}
                        <span className={`w-8 h-8 rounded-full bg-gray-50 flex items-center justify-center text-gray-400 transition-transform duration-300 ${activeAccordion === item ? 'rotate-180' : ''}`}>
                          <ChevronDown className="w-4 h-4" />
                        </span>
                      </summary>
                      <div className={`px-6 pb-4 ${activeAccordion === item ? 'block' : 'hidden'}`}>
                        <ul className="space-y-4 pt-2 border-l-2 border-gray-100 ml-2 pl-4">
                          <li>
                            <a href="/preview/shatta-homepage/Shop" className="text-gray-600 block font-medium">Living Room</a>
                            <ul className="space-y-3 mt-3 pl-4">
                              <li><a href="/preview/shatta-homepage/Shop" className="text-sm text-gray-500">Sofas & Sectionals</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="text-sm text-gray-500">Coffee Tables</a></li>
                            </ul>
                          </li>
                          <li>
                            <a href="/preview/shatta-homepage/Shop" className="text-gray-600 block font-medium">Bedroom</a>
                            <ul className="space-y-3 mt-3 pl-4">
                              <li><a href="/preview/shatta-homepage/Shop" className="text-sm text-gray-500">Beds & Headboards</a></li>
                              <li><a href="/preview/shatta-homepage/Shop" className="text-sm text-gray-500">Nightstands</a></li>
                            </ul>
                          </li>
                        </ul>

                        <div className="mt-6 space-y-6">
                          <a href="/preview/shatta-homepage/Shop" className="block relative rounded-xl overflow-hidden">
                            <img src="https://api.shatta.com/storage/4448/lehaf_098.jpg" alt="Promo" className="w-full h-32 object-cover" />
                            <div className="absolute inset-0 bg-black/20 flex items-center justify-center">
                              <span className="text-white font-serif tracking-wide">New Collection</span>
                            </div>
                          </a>
                        </div>
                      </div>
                    </details>
                  ) : (
                    <a href="/preview/shatta-homepage/Shop" className="flex items-center justify-between px-6 py-4 text-[#1A1A1A] font-medium">
                      {item}
                    </a>
                  )}
                </li>
              ))}
            </ul>
          </div>

          <div className="shrink-0 p-6 border-t border-gray-100 bg-gray-50 flex flex-col gap-3">
            <button 
              type="button" 
              className="w-full flex items-center justify-center gap-2 bg-white border border-gray-200 rounded-xl py-3 text-sm font-medium text-[#1A1A1A]"
              onClick={() => {
                setIsMobileMenuOpen(false);
                setIsSearchOpen(true);
              }}
            >
              <Search className="w-4 h-4" /> Search Products
            </button>
            <div className="flex items-center justify-between pt-2 text-xs border-t border-gray-200/60">
              <div className="flex items-center gap-2">
                <a href="/preview/shatta-homepage/Login" className="font-semibold text-[#1A1A1A] hover:text-[#C4A35A]">Login</a>
                <span className="text-gray-300">|</span>
                <a href="/preview/shatta-homepage/Register" className="font-semibold text-[#1A1A1A] hover:text-[#C4A35A]">Register</a>
              </div>
              <div className="flex items-center gap-4">
                <a href="/preview/shatta-homepage/Account" className="text-gray-500 hover:text-[#1A1A1A]"><User className="w-5 h-5" /></a>
                <button type="button" className="text-gray-500 hover:text-[#1A1A1A]"><Heart className="w-5 h-5" /></button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <CartDrawer isOpen={isCartOpen} onClose={() => setIsCartOpen(false)} />
      <PredictiveSearch isOpen={isSearchOpen} onClose={() => setIsSearchOpen(false)} />
    </>
  );
}
