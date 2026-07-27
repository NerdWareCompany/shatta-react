import React, { useState, useEffect, useRef } from 'react';
import { Search, X, XCircle } from 'lucide-react';

export function PredictiveSearch({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      setTimeout(() => inputRef.current?.focus(), 100);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  // Mock search results
  useEffect(() => {
    if (searchTerm.length > 0) {
      setIsLoading(true);
      const timer = setTimeout(() => {
        setIsLoading(false);
      }, 500);
      return () => clearTimeout(timer);
    } else {
      setIsLoading(false);
      return undefined;
    }
  }, [searchTerm]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex flex-col">
      {/* Overlay */}
      <div 
        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-300"
        onClick={onClose}
      />
      
      {/* Search Panel */}
      <div className="absolute inset-x-0 top-0 bg-white shadow-2xl animate-in slide-in-from-top duration-500 max-h-screen flex flex-col">
        <div className="max-w-5xl mx-auto w-full px-6 flex flex-col flex-1 min-h-0">
          
          {/* Header Input */}
          <div className="flex items-center border-b border-gray-100 py-4 md:py-6 shrink-0">
            <div className="flex-1 flex items-center relative">
              <Search className="w-6 h-6 text-gray-400 absolute left-0 pointer-events-none" />
              <input
                ref={inputRef}
                type="search"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search for products, collections, pages..."
                className="w-full pl-10 pr-10 py-3 text-lg md:text-2xl font-serif text-[#1A1A1A] bg-transparent border-none outline-none focus:ring-0 placeholder:text-gray-300"
              />
              {searchTerm && (
                <button 
                  onClick={() => {
                    setSearchTerm('');
                    inputRef.current?.focus();
                  }}
                  className="absolute right-0 p-2 text-gray-400 hover:text-black transition-colors"
                >
                  <XCircle className="w-5 h-5" />
                </button>
              )}
            </div>
            
            <button 
              onClick={onClose}
              className="ml-4 p-2 -mr-2 text-gray-500 hover:text-black transition-colors rounded-full hover:bg-gray-50"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Results Area */}
          <div className="py-8 overflow-y-auto hide-scrollbar flex-1">
            {isLoading ? (
              <div className="flex justify-center py-12">
                <svg className="animate-spin h-8 w-8 text-[#C4A35A]" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
              </div>
            ) : searchTerm.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {/* Mock Products */}
                <div className="md:col-span-2">
                  <h3 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4 pb-2 border-b border-gray-100">Products</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {[1, 2, 3, 4].map((i) => (
                      <a key={i} href="#" className="flex items-center gap-4 p-2 rounded-xl hover:bg-gray-50 transition-colors group">
                        <div className="w-16 h-16 shrink-0 bg-gray-100 rounded-lg overflow-hidden">
                          <img src={`https://images.unsplash.com/photo-1524758631624-e2822e304c36?auto=format&fit=crop&q=80&w=200`} alt="Product" className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                        </div>
                        <div>
                          <h4 className="text-sm font-medium text-[#1A1A1A] group-hover:text-[#C4A35A] transition-colors">Classic Velvet Sofa</h4>
                          <p className="text-xs text-gray-500 mt-1">EGP 24,500</p>
                        </div>
                      </a>
                    ))}
                  </div>
                </div>

                {/* Mock Collections & Pages */}
                <div className="space-y-6">
                  <div>
                    <h3 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-3">Collections</h3>
                    <ul className="space-y-1">
                      <li><a href="#" className="block text-sm text-[#1A1A1A] hover:text-[#C4A35A] py-1 transition-colors">Living Room Sets</a></li>
                      <li><a href="#" className="block text-sm text-[#1A1A1A] hover:text-[#C4A35A] py-1 transition-colors">Velvet Sofas</a></li>
                      <li><a href="#" className="block text-sm text-[#1A1A1A] hover:text-[#C4A35A] py-1 transition-colors">Modern Decor</a></li>
                    </ul>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-3">Pages</h3>
                    <ul className="space-y-1">
                      <li><a href="#" className="block text-sm text-[#1A1A1A] hover:text-[#C4A35A] py-1 transition-colors">Sofa Buying Guide</a></li>
                      <li><a href="#" className="block text-sm text-[#1A1A1A] hover:text-[#C4A35A] py-1 transition-colors">Return Policy</a></li>
                    </ul>
                  </div>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-sm font-medium tracking-widest text-gray-500 uppercase mb-4">Popular Searches</h3>
                <div className="flex flex-wrap gap-2">
                  {['Sofa', 'Bed', 'Dining Table', 'Lighting', 'Rugs'].map((term) => (
                    <button 
                      key={term}
                      onClick={() => setSearchTerm(term)}
                      className="px-4 py-2 bg-gray-50 hover:bg-gray-100 text-[#1A1A1A] text-sm rounded-full transition-colors"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            )}
          </div>
          
          {searchTerm && !isLoading && (
            <div className="pb-8 pt-4 border-t border-gray-100 text-center shrink-0">
              <button className="text-sm font-medium text-[#1A1A1A] hover:text-[#C4A35A] underline transition-colors">
                Search for "{searchTerm}"
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
