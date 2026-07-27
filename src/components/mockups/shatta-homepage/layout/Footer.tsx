import React from 'react';
import { Instagram, Facebook } from 'lucide-react';
import { motion } from 'framer-motion';

export function Footer() {
  return (
    <footer className="bg-[#1A1A1A] text-white pt-24 border-t border-[#C4A35A]/30 rounded-t-[3rem] mt-[50px] relative z-10 shadow-[0_-20px_50px_rgba(0,0,0,0.1)]">
      <div className="max-w-7xl mx-auto px-8 pb-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-16">
        {/* Col 1 */}
        <div>
          <h2 className="font-serif text-3xl font-bold tracking-wide mb-1">SHATTA</h2>
          <p className="text-[#C4A35A] text-[10px] tracking-[0.2em] font-medium mb-8">ESTD.1988</p>
          <p className="text-white/60 text-sm font-light leading-relaxed mb-8 pe-4">
            Egyptian craftsmanship meeting modern luxury. Over three decades of curating the perfect home experience.
          </p>
          <div className="flex gap-x-4">
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C4A35A] hover:border-[#C4A35A] hover:scale-110 transition-all duration-300 shadow-lg">
              <Instagram className="w-4 h-4" />
            </a>
            <a href="#" className="w-10 h-10 rounded-full border border-white/20 flex items-center justify-center hover:bg-[#C4A35A] hover:border-[#C4A35A] hover:scale-110 transition-all duration-300 shadow-lg">
              <Facebook className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Col 2 */}
        <div>
          <h4 className="font-serif text-xl mb-6 text-[#C4A35A]">Quick Links</h4>
          <ul className="space-y-4">
            {[{label: 'About', href: '/preview/shatta-homepage/About'}, {label: 'Home Decor', href: '/preview/shatta-homepage/Shop'}, {label: 'Bed & Bath', href: '/preview/shatta-homepage/Shop'}, {label: 'Curtains', href: '/preview/shatta-homepage/Shop'}, {label: 'Beach', href: '/preview/shatta-homepage/Shop'}, {label: 'Bridal', href: '/preview/shatta-homepage/Shop'}, {label: 'Corporate', href: '/preview/shatta-homepage/Shop'}].map(link => (
              <li key={link.label} className="group">
                <a href={link.href} className="text-white/70 hover:text-[#C4A35A] text-sm font-light transition-colors flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300">-</span>
                  <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 3 */}
        <div>
          <h4 className="font-serif text-xl mb-6 text-[#C4A35A]">Help & Support</h4>
          <ul className="space-y-4">
            {[{label: 'Contact Us', href: '/preview/shatta-homepage/Contact'}, {label: 'Blog', href: '/preview/shatta-homepage/Blog'}, {label: 'Track Order', href: '#'}, {label: 'Returns Policy', href: '#'}, {label: 'Store Finder', href: '#'}, {label: 'Home Inspection', href: '#'}].map(link => (
              <li key={link.label} className="group">
                <a href={link.href} className="text-white/70 hover:text-[#C4A35A] text-sm font-light transition-colors flex items-center">
                  <span className="w-0 overflow-hidden group-hover:w-3 transition-all duration-300">-</span>
                  <span className="group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform duration-300">{link.label}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* Col 4 */}
        <div>
          <h4 className="font-serif text-xl mb-6 text-[#C4A35A]">Stay Inspired</h4>
          <p className="text-white/60 text-sm font-light mb-8 leading-relaxed">
            Subscribe to our newsletter for exclusive offers, new collection previews, and home styling tips.
          </p>
          <form className="flex flex-col gap-4">
            <input 
              type="email" 
              placeholder="Enter your email address" 
              className="bg-white/5 border border-white/10 rounded-full px-6 py-4 text-sm text-white placeholder-white/40 focus:outline-none focus:border-[#C4A35A] focus:bg-white/10 transition-all shadow-inner shadow-white/5"
            />
            <motion.button 
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="button"
              className="bg-[#C4A35A] hover:bg-[#D4B97A] text-white py-4 rounded-full text-xs font-medium tracking-[0.1em] transition-colors w-full shadow-lg shadow-[#C4A35A]/20"
            >
              SUBSCRIBE
            </motion.button>
          </form>
        </div>
      </div>

      <div className="border-t border-white/10 py-8 text-center px-6">
        <p className="text-[#C4A35A] text-xs font-light tracking-wider">
          &copy; 2025 Shatta Home. All rights reserved. Est. 1988 in Egypt.
        </p>
      </div>
    </footer>
  );
}
