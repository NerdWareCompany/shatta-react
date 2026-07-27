import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, LogOut, Package, MapPin, Settings, Plus, Edit2, Trash2, Eye, ChevronRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Account() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] } },
    exit: { opacity: 0, y: -20, transition: { duration: 0.3 } }
  };

  const tabs = [
    { id: 'orders', label: 'Order History', icon: Package },
    { id: 'addresses', label: 'Addresses', icon: MapPin },
    { id: 'details', label: 'Account Details', icon: Settings },
    { id: 'wishlist', label: 'Wishlist', icon: Heart }
  ];

  const orders = [
    {
      id: 'ORD-8934-21',
      date: 'May 12, 2025',
      status: 'Delivered',
      total: 'EGP 8,450',
      items: [
        'https://api.shatta.com/storage/259/CUSH1_433.jpg',
        'https://api.shatta.com/storage/4480/lehaf_138.webp'
      ]
    },
    {
      id: 'ORD-7521-09',
      date: 'April 28, 2025',
      status: 'Shipped',
      total: 'EGP 2,100',
      items: [
        'https://api.shatta.com/storage/351/CUSH1_220_L.jpg'
      ]
    },
    {
      id: 'ORD-6241-88',
      date: 'March 05, 2025',
      status: 'Processing',
      total: 'EGP 12,300',
      items: [
        'https://api.shatta.com/storage/525/cush17-696-02.jpg',
        'https://api.shatta.com/storage/533/cush17-559-01.jpg',
        'https://api.shatta.com/storage/394/CUSH1_459.jpg'
      ]
    }
  ];

  const wishlist = [
    { name: 'Signature Sateen Duvet Cover', category: 'BEDROOM', price: 'EGP 3,450', img: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg' },
    { name: 'Hotel Collection Sheets', category: 'BEDROOM', price: 'EGP 4,200', img: 'https://api.shatta.com/storage/3245/pouf-146.jpg' },
    { name: 'Plush Egyptian Towel Set', category: 'BATH', price: 'EGP 1,800', img: 'https://api.shatta.com/storage/3264/pouf-91_L.jpg' },
    { name: 'Ceramic Table Lamp', category: 'DECOR', price: 'EGP 2,100', img: 'https://api.shatta.com/storage/4472/lehaf_164.webp' }
  ];

  const renderStatusPill = (status: string) => {
    switch (status) {
      case 'Delivered':
        return <span className="px-3 py-1 bg-green-100 text-green-800 text-[10px] font-bold tracking-widest rounded-full uppercase">Delivered</span>;
      case 'Shipped':
        return <span className="px-3 py-1 bg-blue-100 text-blue-800 text-[10px] font-bold tracking-widest rounded-full uppercase">Shipped</span>;
      case 'Processing':
        return <span className="px-3 py-1 bg-[#C4A35A]/10 text-[#C4A35A] text-[10px] font-bold tracking-widest rounded-full uppercase">Processing</span>;
      default:
        return null;
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

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 md:py-16">
        
        {/* Page Title Area */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 border-b border-[#E8E0D4] pb-8 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-2">Welcome back, Sarah</h2>
            <p className="text-[#1A1A1A]/60 font-light text-sm">Manage your orders, addresses, and profile details.</p>
          </div>
          <button className="flex items-center text-[#1A1A1A]/60 hover:text-[#C4A35A] transition-colors text-sm font-medium tracking-wide group w-fit">
            <LogOut className="w-4 h-4 me-2 group-hover:-translate-x-1 rtl:group-hover:translate-x-1 transition-transform" />
            LOG OUT
          </button>
        </div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20">
          
          {/* LEFT Sidebar */}
          <div className="w-full lg:w-64 flex-shrink-0">
            <nav className="flex lg:flex-col overflow-x-auto lg:overflow-visible hide-scrollbar gap-2 pb-4 lg:pb-0">
              {tabs.map((tab) => {
                const Icon = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap min-w-max lg:min-w-0 ${
                      isActive 
                        ? 'bg-[#C4A35A]/5 text-[#C4A35A] font-medium' 
                        : 'text-[#1A1A1A]/70 hover:bg-[#F9F9F9] hover:text-[#1A1A1A]'
                    } relative overflow-hidden group`}
                  >
                    {isActive && (
                      <span className="absolute start-0 top-0 bottom-0 w-1 bg-[#C4A35A] rounded-e-full hidden lg:block" />
                    )}
                    <Icon className={`w-5 h-5 ${isActive ? 'text-[#C4A35A]' : 'text-[#1A1A1A]/50 group-hover:text-[#1A1A1A]/70'}`} />
                    <span className="text-sm tracking-wide">{tab.label}</span>
                  </button>
                );
              })}
            </nav>
          </div>

          {/* RIGHT Content Area */}
          <div className="flex-1 min-h-[400px]">
            <AnimatePresence mode="wait">
              
              {/* Order History View */}
              {activeTab === 'orders' && (
                <motion.div
                  key="orders"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl mb-6">Recent Orders</h3>
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white border border-[#E8E0D4] rounded-2xl p-6 shadow-sm hover:shadow-md transition-shadow">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 pb-6 border-b border-[#E8E0D4] gap-4">
                        <div>
                          <div className="text-xs text-[#1A1A1A]/50 font-medium tracking-widest mb-1">ORDER NUMBER</div>
                          <div className="font-medium">{order.id}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#1A1A1A]/50 font-medium tracking-widest mb-1">DATE</div>
                          <div className="text-sm">{order.date}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#1A1A1A]/50 font-medium tracking-widest mb-1">TOTAL</div>
                          <div className="font-medium text-[#C4A35A]">{order.total}</div>
                        </div>
                        <div className="flex items-center">
                          {renderStatusPill(order.status)}
                        </div>
                      </div>
                      
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex -space-x-3 rtl:space-x-reverse overflow-hidden">
                          {order.items.map((img, i) => (
                            <img key={i} src={img} alt="Product" className="inline-block h-16 w-16 rounded-xl object-cover ring-2 ring-white border border-[#E8E0D4]" />
                          ))}
                        </div>
                        <button className="flex items-center justify-center px-6 py-2.5 border border-[#1A1A1A] text-[#1A1A1A] rounded-full text-xs font-semibold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors w-full sm:w-auto">
                          VIEW DETAILS
                        </button>
                      </div>
                    </div>
                  ))}
                </motion.div>
              )}

              {/* Addresses View */}
              {activeTab === 'addresses' && (
                <motion.div
                  key="addresses"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl mb-6">Saved Addresses</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    {/* Home Address */}
                    <div className="bg-white border border-[#E8E0D4] rounded-2xl p-6 shadow-sm flex flex-col h-full relative group">
                      <div className="absolute top-6 end-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-[#1A1A1A]/50 hover:text-[#C4A35A] transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1.5 text-[#1A1A1A]/50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="text-[10px] font-bold tracking-widest text-[#C4A35A] mb-4 bg-[#C4A35A]/10 px-3 py-1 rounded-full w-fit">HOME (DEFAULT)</div>
                      <div className="font-medium mb-1">Sarah Mahmoud</div>
                      <div className="text-sm text-[#1A1A1A]/70 leading-relaxed flex-1">
                        12 El Zamalek Street, Apt 4B<br />
                        Zamalek, Cairo<br />
                        Egypt, 11211<br />
                        +20 10 1234 5678
                      </div>
                    </div>

                    {/* Work Address */}
                    <div className="bg-white border border-[#E8E0D4] rounded-2xl p-6 shadow-sm flex flex-col h-full relative group">
                      <div className="absolute top-6 end-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="p-1.5 text-[#1A1A1A]/50 hover:text-[#C4A35A] transition-colors"><Edit2 className="w-4 h-4" /></button>
                        <button className="p-1.5 text-[#1A1A1A]/50 hover:text-red-500 transition-colors"><Trash2 className="w-4 h-4" /></button>
                      </div>
                      <div className="text-[10px] font-bold tracking-widest text-[#1A1A1A]/50 mb-4 bg-gray-100 px-3 py-1 rounded-full w-fit">WORK</div>
                      <div className="font-medium mb-1">Sarah Mahmoud</div>
                      <div className="text-sm text-[#1A1A1A]/70 leading-relaxed flex-1">
                        Smart Village, Building B4<br />
                        6th of October, Giza<br />
                        Egypt, 12577<br />
                        +20 10 1234 5678
                      </div>
                    </div>

                    {/* Add New */}
                    <button className="border-2 border-dashed border-[#E8E0D4] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] text-[#1A1A1A]/50 hover:text-[#C4A35A] hover:border-[#C4A35A] transition-colors group bg-gray-50/50 hover:bg-[#C4A35A]/5">
                      <div className="w-12 h-12 rounded-full bg-white border border-[#E8E0D4] flex items-center justify-center mb-4 group-hover:border-[#C4A35A] group-hover:shadow-md transition-all">
                        <Plus className="w-6 h-6" />
                      </div>
                      <span className="font-medium tracking-wide text-sm">Add New Address</span>
                    </button>
                  </div>
                </motion.div>
              )}

              {/* Account Details View */}
              {activeTab === 'details' && (
                <motion.div
                  key="details"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-10"
                >
                  <div>
                    <h3 className="font-serif text-2xl mb-6">Profile Information</h3>
                    <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 md:p-8 shadow-sm">
                      <form className="space-y-6">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                          <div className="space-y-2">
                            <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70">FIRST NAME</label>
                            <input type="text" defaultValue="Sarah" className="w-full bg-[#FFFFFF] border border-[#E8E0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all" />
                          </div>
                          <div className="space-y-2">
                            <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70">LAST NAME</label>
                            <input type="text" defaultValue="Mahmoud" className="w-full bg-[#FFFFFF] border border-[#E8E0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70">EMAIL ADDRESS</label>
                          <input type="email" defaultValue="sarah.mahmoud@example.com" className="w-full bg-[#FFFFFF] border border-[#E8E0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all" />
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70">PHONE NUMBER</label>
                          <input type="tel" defaultValue="+20 10 1234 5678" className="w-full bg-[#FFFFFF] border border-[#E8E0D4] rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all" />
                        </div>
                        <div className="pt-4">
                          <button type="button" className="bg-[#C4A35A] text-white px-8 py-3.5 rounded-full text-xs font-medium tracking-widest hover:bg-[#B39249] shadow-lg shadow-[#C4A35A]/20 transition-colors">
                            SAVE CHANGES
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>

                  <div>
                    <h3 className="font-serif text-2xl mb-6">Change Password</h3>
                    <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 md:p-8 shadow-sm">
                      <form className="space-y-6">
                        <div className="space-y-2 relative">
                          <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70">CURRENT PASSWORD</label>
                          <div className="relative">
                            <input type="password" placeholder="••••••••" className="w-full bg-[#FFFFFF] border border-[#E8E0D4] rounded-xl px-4 py-3 pe-10 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all" />
                            <Eye className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 cursor-pointer hover:text-[#1A1A1A]" />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70">NEW PASSWORD</label>
                          <div className="relative">
                            <input type="password" placeholder="••••••••" className="w-full bg-[#FFFFFF] border border-[#E8E0D4] rounded-xl px-4 py-3 pe-10 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all" />
                            <Eye className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-[#1A1A1A]/40 cursor-pointer hover:text-[#1A1A1A]" />
                          </div>
                        </div>
                        <div className="pt-4">
                          <button type="button" className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-xs font-medium tracking-widest hover:bg-black shadow-lg shadow-black/10 transition-colors">
                            UPDATE PASSWORD
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </motion.div>
              )}

              {/* Wishlist View */}
              {activeTab === 'wishlist' && (
                <motion.div
                  key="wishlist"
                  variants={fadeUp}
                  initial="hidden"
                  animate="visible"
                  exit="exit"
                  className="space-y-6"
                >
                  <h3 className="font-serif text-2xl mb-6">Your Wishlist</h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {wishlist.map((product, idx) => (
                      <motion.div key={idx} className="group cursor-pointer flex flex-col bg-white p-2 rounded-[2rem] shadow-sm shadow-black/5 hover:shadow-xl hover:shadow-black/10 transition-shadow duration-500 border border-[#E8E0D4]">
                        <div className="relative aspect-[4/5] overflow-hidden bg-[#FFFFFF] rounded-3xl mb-4">
                          <div className="absolute top-3 end-3 z-20">
                            <div className="w-8 h-8 rounded-full bg-white/90 backdrop-blur-md flex items-center justify-center shadow-sm">
                              <Heart className="w-4 h-4 text-[#C4A35A] fill-current" />
                            </div>
                          </div>
                          <img src={product.img} alt={product.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                          
                          <div className="absolute bottom-3 start-3 end-3 translate-y-0 opacity-100 transition-all duration-500 ease-out z-10">
                            <button className="w-full bg-[#1A1A1A]/80 backdrop-blur-md hover:bg-[#C4A35A] text-white py-3 text-xs font-medium tracking-widest rounded-xl transition-colors shadow-lg">
                              ADD TO CART
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
                </motion.div>
              )}
            </AnimatePresence>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}

export default Account;
