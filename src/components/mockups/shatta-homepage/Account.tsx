import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, LogOut, Package, MapPin, Settings, Plus, Edit2, Trash2, Eye, ChevronRight, Download, FileText, Printer, X, Camera, Upload, Check } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { OrderDetails, type OrderDetailsData } from './OrderDetails';

export interface AddressItem {
  id: string;
  title: string;
  isDefault?: boolean;
  name: string;
  street: string;
  city: string;
  state: string;
  country: string;
  postalCode?: string;
  phone: string;
}

export function Account() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState('orders');
  const [selectedOrder, setSelectedOrder] = useState<OrderDetailsData | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<OrderDetailsData | null>(null);

  // Profile Picture State
  const [profileImage, setProfileImage] = useState<string>("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400");
  const [isUploadingImage, setIsUploadingImage] = useState(false);
  const [imageSaveSuccess, setImageSaveSuccess] = useState(false);

  // Saved Addresses State & Modal
  const [savedAddresses, setSavedAddresses] = useState<AddressItem[]>([
    {
      id: 'addr-1',
      title: 'HOME',
      isDefault: true,
      name: 'Sarah Mahmoud',
      street: '12 El Zamalek Street, Apt 4B',
      city: 'Zamalek, Cairo',
      state: 'Cairo',
      country: 'Egypt',
      postalCode: '11211',
      phone: '+20 10 1234 5678'
    },
    {
      id: 'addr-2',
      title: 'WORK',
      isDefault: false,
      name: 'Sarah Mahmoud',
      street: 'Smart Village, Building B4',
      city: '6th of October',
      state: 'Giza',
      country: 'Egypt',
      postalCode: '12577',
      phone: '+20 10 1234 5678'
    }
  ]);

  const [showAddressModal, setShowAddressModal] = useState(false);
  const [editingAddressId, setEditingAddressId] = useState<string | null>(null);
  const [addressFormData, setAddressFormData] = useState({
    title: 'HOME',
    name: 'Sarah Mahmoud',
    street: '',
    city: '',
    state: '',
    country: 'Egypt',
    postalCode: '',
    phone: '+20 10 1234 5678',
    isDefault: false
  });

  const handleOpenNewAddressModal = () => {
    setEditingAddressId(null);
    setAddressFormData({
      title: 'HOME',
      name: 'Sarah Mahmoud',
      street: '',
      city: '',
      state: '',
      country: 'Egypt',
      postalCode: '',
      phone: '+20 10 1234 5678',
      isDefault: savedAddresses.length === 0
    });
    setShowAddressModal(true);
  };

  const handleEditAddress = (addr: AddressItem) => {
    setEditingAddressId(addr.id);
    setAddressFormData({
      title: addr.title,
      name: addr.name,
      street: addr.street,
      city: addr.city,
      state: addr.state,
      country: addr.country,
      postalCode: addr.postalCode || '',
      phone: addr.phone,
      isDefault: !!addr.isDefault
    });
    setShowAddressModal(true);
  };

  const handleDeleteAddress = (id: string) => {
    setSavedAddresses(savedAddresses.filter(a => a.id !== id));
  };

  const handleSaveAddress = (e: React.FormEvent) => {
    e.preventDefault();
    let updated = [...savedAddresses];

    if (addressFormData.isDefault) {
      updated = updated.map(a => ({ ...a, isDefault: false }));
    }

    if (editingAddressId) {
      updated = updated.map(a => a.id === editingAddressId ? { ...a, ...addressFormData } : a);
    } else {
      const newAddr: AddressItem = {
        id: `addr-${Date.now()}`,
        ...addressFormData
      };
      updated.push(newAddr);
    }

    setSavedAddresses(updated);
    setShowAddressModal(false);
  };

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

  const orders: OrderDetailsData[] = [
    {
      id: 'ORD-8934-21',
      date: 'May 12, 2025',
      time: '14:32 PM',
      status: 'Delivered',
      estimatedDelivery: 'May 15, 2025 by 5:00 PM',
      trackingNumber: 'ARX-982341908-EG',
      carrier: 'Aramex Express Logistics',
      paymentMethod: 'Credit Card (Visa)',
      cardLast4: '4242',
      items: [
        {
          id: 'prod-1',
          name: 'Signature Royal Sateen Cushion Cover',
          category: 'LIVING ROOM',
          color: 'Gold & Ivory',
          size: '50x50 cm',
          price: 'EGP 4,250',
          priceNum: 4250,
          quantity: 1,
          image: 'https://api.shatta.com/storage/259/CUSH1_433.jpg'
        },
        {
          id: 'prod-2',
          name: 'Egyptian Cotton Luxury Duvet Set',
          category: 'BEDROOM',
          color: 'Pure White',
          size: 'King (240x220 cm)',
          price: 'EGP 4,200',
          priceNum: 4200,
          quantity: 1,
          image: 'https://api.shatta.com/storage/4480/lehaf_138.webp'
        }
      ],
      shippingAddress: {
        name: 'Sarah Mahmoud',
        street: '12 El Zamalek Street, Apt 4B',
        city: 'Zamalek, Cairo',
        state: 'Cairo',
        country: 'Egypt',
        phone: '+20 10 1234 5678'
      },
      subtotal: 8450,
      shippingFee: 0,
      discount: 450,
      tax: 450,
      total: 8450
    },
    {
      id: 'ORD-7521-09',
      date: 'April 28, 2025',
      time: '11:15 AM',
      status: 'Shipped',
      estimatedDelivery: 'May 02, 2025 by 3:00 PM',
      trackingNumber: 'ARX-771203499-EG',
      carrier: 'Aramex Express',
      paymentMethod: 'Cash on Delivery (COD)',
      items: [
        {
          id: 'prod-3',
          name: 'Velvet Embroidered Decorative Pillow',
          category: 'LIVING ROOM',
          color: 'Emerald Green',
          size: '45x45 cm',
          price: 'EGP 2,100',
          priceNum: 2100,
          quantity: 1,
          image: 'https://api.shatta.com/storage/351/CUSH1_220_L.jpg'
        }
      ],
      shippingAddress: {
        name: 'Sarah Mahmoud',
        street: '12 El Zamalek Street, Apt 4B',
        city: 'Zamalek, Cairo',
        state: 'Cairo',
        country: 'Egypt',
        phone: '+20 10 1234 5678'
      },
      subtotal: 2100,
      shippingFee: 150,
      discount: 0,
      tax: 210,
      total: 2250
    },
    {
      id: 'ORD-6241-88',
      date: 'March 05, 2025',
      time: '09:45 AM',
      status: 'Processing',
      estimatedDelivery: 'March 10, 2025',
      paymentMethod: 'Credit Card (Mastercard)',
      cardLast4: '8812',
      items: [
        {
          id: 'prod-4',
          name: 'Handcrafted Heritage Tapestry Cushion',
          category: 'DECOR',
          color: 'Terracotta / Gold',
          size: '50x50 cm',
          price: 'EGP 4,100',
          priceNum: 4100,
          quantity: 1,
          image: 'https://api.shatta.com/storage/525/cush17-696-02.jpg'
        },
        {
          id: 'prod-5',
          name: 'Silk Blend Accent Pillow Cover',
          category: 'LIVING ROOM',
          color: 'Champagne Gold',
          price: 'EGP 4,100',
          priceNum: 4100,
          quantity: 1,
          image: 'https://api.shatta.com/storage/533/cush17-559-01.jpg'
        },
        {
          id: 'prod-6',
          name: 'Luxury Jacquard Cushion',
          category: 'LIVING ROOM',
          color: 'Beige Pattern',
          price: 'EGP 4,100',
          priceNum: 4100,
          quantity: 1,
          image: 'https://api.shatta.com/storage/394/CUSH1_459.jpg'
        }
      ],
      shippingAddress: {
        name: 'Sarah Mahmoud',
        street: '12 El Zamalek Street, Apt 4B',
        city: 'Zamalek, Cairo',
        state: 'Cairo',
        country: 'Egypt',
        phone: '+20 10 1234 5678'
      },
      subtotal: 12300,
      shippingFee: 0,
      discount: 1000,
      tax: 1230,
      total: 12300
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

  // If viewing a specific order details screen
  if (selectedOrder) {
    return <OrderDetails orderData={selectedOrder} onBack={() => setSelectedOrder(null)} />;
  }

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
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 whitespace-nowrap min-w-max lg:min-w-0 ${isActive
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
                          <div className="font-medium text-[#C4A35A]">EGP {order.total.toLocaleString()}</div>
                        </div>
                        <div className="flex items-center">
                          {renderStatusPill(order.status)}
                        </div>
                      </div>

                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-6">
                        <div className="flex -space-x-3 rtl:space-x-reverse overflow-hidden">
                          {order.items.map((item, i) => (
                            <img key={i} src={item.image} alt={item.name} className="inline-block h-16 w-16 rounded-xl object-cover ring-2 ring-white border border-[#E8E0D4]" />
                          ))}
                        </div>

                        {/* Action Buttons: DOWNLOAD INVOICE beside VIEW DETAILS */}
                        <div className="flex items-center gap-3 flex-wrap sm:flex-nowrap w-full sm:w-auto">
                          <button
                            onClick={() => setInvoiceModalOrder(order)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 bg-[#1A1A1A] hover:bg-[#C4A35A] text-white rounded-full text-xs font-semibold tracking-widest transition-all shadow-sm shadow-[#C4A35A]/20"
                          >
                            <Download className="w-3.5 h-3.5" />
                            <span>DOWNLOAD INVOICE</span>
                          </button>
                          <button
                            onClick={() => setSelectedOrder(order)}
                            className="flex-1 sm:flex-none flex items-center justify-center gap-2 px-5 py-2.5 border border-[#1A1A1A] text-[#1A1A1A] rounded-full text-xs font-semibold tracking-widest hover:bg-[#1A1A1A] hover:text-white transition-colors"
                          >
                            <span>VIEW DETAILS</span>
                          </button>
                        </div>
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
                    {savedAddresses.map((addr) => (
                      <div key={addr.id} className="bg-white border border-[#E8E0D4] rounded-2xl p-6 shadow-sm flex flex-col h-full relative group">
                        <div className="absolute top-6 end-6 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                          <button
                            onClick={() => handleEditAddress(addr)}
                            title="Edit Address"
                            className="p-1.5 text-[#1A1A1A]/50 hover:text-[#C4A35A] transition-colors"
                          >
                            <Edit2 className="w-4 h-4" />
                          </button>
                          <button
                            onClick={() => handleDeleteAddress(addr.id)}
                            title="Delete Address"
                            className="p-1.5 text-[#1A1A1A]/50 hover:text-red-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </div>
                        <div className={`text-[10px] font-bold tracking-widest mb-4 px-3 py-1 rounded-full w-fit ${addr.isDefault
                          ? 'text-[#C4A35A] bg-[#C4A35A]/10'
                          : 'text-[#1A1A1A]/50 bg-gray-100'
                          }`}>
                          {addr.title} {addr.isDefault ? '(DEFAULT)' : ''}
                        </div>
                        <div className="font-medium mb-1">{addr.name}</div>
                        <div className="text-sm text-[#1A1A1A]/70 leading-relaxed flex-1">
                          {addr.street}<br />
                          {addr.city}, {addr.state}<br />
                          {addr.country}{addr.postalCode ? `, ${addr.postalCode}` : ''}<br />
                          {addr.phone}
                        </div>
                      </div>
                    ))}

                    {/* Add New Button */}
                    <button
                      onClick={handleOpenNewAddressModal}
                      className="border-2 border-dashed border-[#E8E0D4] rounded-2xl p-6 flex flex-col items-center justify-center min-h-[220px] text-[#1A1A1A]/50 hover:text-[#C4A35A] hover:border-[#C4A35A] transition-colors group bg-gray-50/50 hover:bg-[#C4A35A]/5"
                    >
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
                  {/* Section 1: Profile Picture */}
                  <div>
                    <h3 className="font-serif text-2xl mb-6">Profile Picture</h3>
                    <div className="bg-white border border-[#E8E0D4] rounded-3xl p-6 md:p-8 shadow-sm">
                      <div className="flex flex-col sm:flex-row items-center gap-6">
                        <div className="relative group">
                          <div className="w-24 h-24 rounded-full overflow-hidden border-2 border-[#C4A35A] ring-4 ring-[#C4A35A]/10 shadow-md flex-shrink-0">
                            <img src={profileImage} alt="Profile Avatar" className="w-full h-full object-cover" />
                          </div>
                          <label className="absolute bottom-0 end-0 bg-[#1A1A1A] hover:bg-[#C4A35A] text-white p-2 rounded-full shadow-md cursor-pointer transition-transform hover:scale-110">
                            <Camera className="w-4 h-4" />
                            <input
                              type="file"
                              accept="image/*"
                              className="hidden"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) {
                                  setIsUploadingImage(true);
                                  const reader = new FileReader();
                                  reader.onload = (evt) => {
                                    setProfileImage(evt.target?.result as string);
                                    setIsUploadingImage(false);
                                    setImageSaveSuccess(true);
                                    setTimeout(() => setImageSaveSuccess(false), 3000);
                                  };
                                  reader.readAsDataURL(file);
                                }
                              }}
                            />
                          </label>
                        </div>

                        <div className="flex-1 text-center sm:text-start space-y-3">
                          <div className="flex flex-wrap items-center justify-center sm:justify-start gap-3">
                            <label className="bg-[#1A1A1A] text-white px-5 py-2.5 rounded-full text-xs font-semibold tracking-widest hover:bg-[#C4A35A] shadow-md shadow-[#C4A35A]/20 transition-all cursor-pointer inline-flex items-center gap-2">
                              <Upload className="w-3.5 h-3.5" />
                              <span>{isUploadingImage ? 'UPLOADING...' : 'UPLOAD NEW PHOTO'}</span>
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) => {
                                  const file = e.target.files?.[0];
                                  if (file) {
                                    setIsUploadingImage(true);
                                    const reader = new FileReader();
                                    reader.onload = (evt) => {
                                      setProfileImage(evt.target?.result as string);
                                      setIsUploadingImage(false);
                                      setImageSaveSuccess(true);
                                      setTimeout(() => setImageSaveSuccess(false), 3000);
                                    };
                                    reader.readAsDataURL(file);
                                  }
                                }}
                              />
                            </label>

                            <button
                              type="button"
                              onClick={() => {
                                setProfileImage("https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&q=80&w=400");
                                setImageSaveSuccess(false);
                              }}
                              className="border border-[#E8E0D4] hover:border-red-300 text-[#1A1A1A]/70 hover:text-red-600 px-5 py-2.5 rounded-full text-xs font-medium tracking-wide transition-colors"
                            >
                              Remove / Reset
                            </button>
                          </div>

                          <p className="text-xs text-[#1A1A1A]/50 font-light">
                            Recommended format: Square JPG, PNG, or WEBP (Max 5MB).
                          </p>

                          {imageSaveSuccess && (
                            <div className="inline-flex items-center gap-1.5 text-xs text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full border border-emerald-200 animate-fade-in">
                              <Check className="w-3.5 h-3.5" />
                              <span>Profile picture updated successfully!</span>
                            </div>
                          )}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Section 2: Profile Information */}
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
                          <button type="button" className="bg-[#1A1A1A] text-white px-8 py-3.5 rounded-full text-xs font-medium tracking-widest hover:bg-[#C4A35A] shadow-lg shadow-[#C4A35A]/20 transition-colors">
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

      {/* DIRECT INVOICE MODAL FROM ACCOUNT PAGE */}
      <AnimatePresence>
        {invoiceModalOrder && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-3xl w-full p-6 sm:p-10 shadow-2xl relative my-8"
              id="printable-invoice"
            >
              <button
                onClick={() => setInvoiceModalOrder(null)}
                className="absolute top-6 end-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors print:hidden"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="border border-[#E8E0D4] rounded-2xl p-8 bg-[#FFFFFF]">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center pb-8 border-b border-[#E8E0D4] gap-6">
                  <div>
                    <div className="font-serif text-3xl font-bold tracking-wider text-[#1A1A1A] uppercase mb-1">
                      SHATTA
                    </div>
                    <div className="text-xs text-[#C4A35A] font-semibold tracking-widest uppercase">
                      Luxury Home & Living
                    </div>
                    <div className="text-xs text-[#1A1A1A]/50 mt-2 leading-relaxed">
                      Tax Registration: 492-109-883<br />
                      Cairo Festival City, New Cairo, Egypt
                    </div>
                  </div>

                  <div className="text-start sm:text-end">
                    <div className="inline-block bg-[#C4A35A]/10 text-[#C4A35A] px-3 py-1 rounded-full text-xs font-bold tracking-widest uppercase mb-2">
                      TAX INVOICE
                    </div>
                    <div className="text-sm font-semibold text-[#1A1A1A]">Invoice #{invoiceModalOrder.id}</div>
                    <div className="text-xs text-[#1A1A1A]/60">Date: {invoiceModalOrder.date}</div>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 py-6 border-b border-[#E8E0D4] text-xs">
                  <div>
                    <div className="text-[#1A1A1A]/50 font-bold tracking-widest uppercase mb-1">Billed To</div>
                    <div className="font-semibold text-sm text-[#1A1A1A]">{invoiceModalOrder.shippingAddress.name}</div>
                    <div className="text-[#1A1A1A]/70 mt-1">{invoiceModalOrder.shippingAddress.street}</div>
                    <div className="text-[#1A1A1A]/70">{invoiceModalOrder.shippingAddress.city}, {invoiceModalOrder.shippingAddress.country}</div>
                    <div className="text-[#1A1A1A]/70 mt-1 font-mono">{invoiceModalOrder.shippingAddress.phone}</div>
                  </div>

                  <div className="sm:text-end">
                    <div className="text-[#1A1A1A]/50 font-bold tracking-widest uppercase mb-1">Payment Method</div>
                    <div className="font-semibold text-[#1A1A1A]">{invoiceModalOrder.paymentMethod}</div>
                    <div className="text-[#1A1A1A]/70">Status: <strong className="text-emerald-600">PAID IN FULL</strong></div>
                  </div>
                </div>

                <div className="py-6 overflow-x-auto">
                  <table className="w-full text-left text-xs">
                    <thead>
                      <tr className="border-b border-[#E8E0D4] text-[#1A1A1A]/50 font-bold tracking-widest uppercase">
                        <th className="pb-3">Item Description</th>
                        <th className="pb-3 text-center">Qty</th>
                        <th className="pb-3 text-end">Unit Price</th>
                        <th className="pb-3 text-end">Total</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#E8E0D4]/60">
                      {invoiceModalOrder.items.map((item) => (
                        <tr key={item.id}>
                          <td className="py-3.5 pr-4">
                            <div className="font-semibold text-sm text-[#1A1A1A]">{item.name}</div>
                            <div className="text-[11px] text-[#1A1A1A]/50">{item.category} • {item.color}</div>
                          </td>
                          <td className="py-3.5 text-center font-medium">{item.quantity}</td>
                          <td className="py-3.5 text-end font-medium">{item.price}</td>
                          <td className="py-3.5 text-end font-semibold text-[#1A1A1A]">EGP {(item.priceNum * item.quantity).toLocaleString()}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="pt-4 border-t border-[#E8E0D4] flex flex-col sm:flex-row justify-between items-start sm:items-end gap-6 text-xs">
                  <div className="text-[#1A1A1A]/50 space-y-1">
                    <div>Thank you for choosing Shatta Luxury Home.</div>
                    <div>For inquiries, contact support@shatta.com</div>
                  </div>

                  <div className="w-full sm:w-64 space-y-2 text-sm">
                    <div className="flex justify-between text-[#1A1A1A]/70">
                      <span>Subtotal:</span>
                      <span>EGP {invoiceModalOrder.subtotal.toLocaleString()}</span>
                    </div>
                    {invoiceModalOrder.discount > 0 && (
                      <div className="flex justify-between text-emerald-600">
                        <span>Discount:</span>
                        <span>-EGP {invoiceModalOrder.discount.toLocaleString()}</span>
                      </div>
                    )}
                    <div className="flex justify-between text-[#1A1A1A]/70">
                      <span>VAT (14% Included):</span>
                      <span>EGP {invoiceModalOrder.tax.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between pt-2 border-t border-[#E8E0D4] font-bold text-base text-[#C4A35A]">
                      <span>Grand Total:</span>
                      <span>EGP {invoiceModalOrder.total.toLocaleString()}</span>
                    </div>
                  </div>
                </div>
              </div>

              <div className="mt-6 flex items-center justify-end gap-3 print:hidden">
                <button
                  onClick={() => setInvoiceModalOrder(null)}
                  className="px-5 py-2.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50"
                >
                  Close
                </button>
                <button
                  onClick={() => window.print()}
                  className="flex items-center gap-2 px-6 py-2.5 bg-[#C4A35A] hover:bg-[#B39249] text-white rounded-full text-xs font-semibold tracking-widest shadow-md"
                >
                  <Printer className="w-4 h-4" />
                  <span>PRINT / SAVE AS PDF</span>
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* ADD / EDIT ADDRESS MODAL */}
      <AnimatePresence>
        {showAddressModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 shadow-2xl relative my-8"
            >
              <button
                onClick={() => setShowAddressModal(false)}
                className="absolute top-6 end-6 p-2 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-600 transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-6 pb-3 border-b border-[#E8E0D4]">
                {editingAddressId ? 'Edit Address' : 'Add New Address'}
              </h3>

              <form onSubmit={handleSaveAddress} className="space-y-4">
                <div>
                  <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-2 block">ADDRESS LABEL</label>
                  <div className="flex gap-2">
                    {['HOME', 'WORK', 'OTHER'].map((label) => (
                      <button
                        key={label}
                        type="button"
                        onClick={() => setAddressFormData({ ...addressFormData, title: label })}
                        className={`px-4 py-2 rounded-xl text-xs font-semibold tracking-wider border transition-all ${addressFormData.title === label
                          ? 'bg-[#C4A35A] text-white border-[#C4A35A] shadow-sm'
                          : 'border-[#E8E0D4] text-[#1A1A1A]/70 hover:border-[#1A1A1A]'
                          }`}
                      >
                        {label}
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">FULL NAME</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g. Sarah Mahmoud"
                    value={addressFormData.name}
                    onChange={(e) => setAddressFormData({ ...addressFormData, name: e.target.value })}
                    className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">PHONE NUMBER</label>
                  <input
                    type="tel"
                    required
                    placeholder="+20 10 1234 5678"
                    value={addressFormData.phone}
                    onChange={(e) => setAddressFormData({ ...addressFormData, phone: e.target.value })}
                    className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                  />
                </div>

                <div>
                  <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">STREET ADDRESS & BUILDING / APT</label>
                  <input
                    type="text"
                    required
                    placeholder="12 El Zamalek Street, Apt 4B"
                    value={addressFormData.street}
                    onChange={(e) => setAddressFormData({ ...addressFormData, street: e.target.value })}
                    className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">CITY / DISTRICT</label>
                    <input
                      type="text"
                      required
                      placeholder="Zamalek, Cairo"
                      value={addressFormData.city}
                      onChange={(e) => setAddressFormData({ ...addressFormData, city: e.target.value })}
                      className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">GOVERNORATE</label>
                    <input
                      type="text"
                      required
                      placeholder="Cairo"
                      value={addressFormData.state}
                      onChange={(e) => setAddressFormData({ ...addressFormData, state: e.target.value })}
                      className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                    />
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">COUNTRY</label>
                    <input
                      type="text"
                      required
                      placeholder="Egypt"
                      value={addressFormData.country}
                      onChange={(e) => setAddressFormData({ ...addressFormData, country: e.target.value })}
                      className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                    />
                  </div>

                  <div>
                    <label className="text-xs font-medium tracking-widest text-[#1A1A1A]/70 mb-1 block">POSTAL CODE</label>
                    <input
                      type="text"
                      placeholder="11211"
                      value={addressFormData.postalCode}
                      onChange={(e) => setAddressFormData({ ...addressFormData, postalCode: e.target.value })}
                      className="w-full bg-white border border-[#E8E0D4] rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-2 pt-2">
                  <input
                    type="checkbox"
                    id="isDefaultCheckbox"
                    checked={addressFormData.isDefault}
                    onChange={(e) => setAddressFormData({ ...addressFormData, isDefault: e.target.checked })}
                    className="w-4 h-4 accent-[#C4A35A] rounded border-[#E8E0D4]"
                  />
                  <label htmlFor="isDefaultCheckbox" className="text-xs text-[#1A1A1A]/80 cursor-pointer">
                    Set as default shipping address
                  </label>
                </div>

                <div className="flex items-center justify-end gap-3 pt-6 border-t border-[#E8E0D4]">
                  <button
                    type="button"
                    onClick={() => setShowAddressModal(false)}
                    className="px-5 py-2.5 border border-gray-300 rounded-full text-xs font-semibold text-gray-700 hover:bg-gray-50"
                  >
                    Cancel
                  </button>

                  <button
                    type="submit"
                    className="px-6 py-2.5 bg-[#1A1A1A] hover:bg-[#C4A35A] text-white rounded-full text-xs font-semibold tracking-widest shadow-md shadow-[#C4A35A]/20 transition-all"
                  >
                    {editingAddressId ? 'UPDATE ADDRESS' : 'SAVE ADDRESS'}
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      <Footer />
    </div>
  );
}

export default Account;
