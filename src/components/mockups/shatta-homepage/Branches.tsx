import React, { useState } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { MapPin, Phone, Clock, Search, Navigation, ChevronRight, Sparkles, CheckCircle2, ExternalLink, Calendar, ArrowRight, Car, Compass } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface Branch {
  id: string;
  name: string;
  region: 'Cairo & Giza' | 'Alexandria & Coast' | 'Delta Region' | 'Canal & Red Sea';
  type: 'Flagship Store' | 'Showroom' | 'Boutique';
  address: string;
  city: string;
  area: string;
  phone: string;
  hours: string;
  fridayHours: string;
  image: string;
  mapEmbedUrl?: string;
  services: string[];
  features: string[];
}

export function Branches() {
  const [selectedRegion, setSelectedRegion] = useState<string>('All');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [activeBranch, setActiveBranch] = useState<Branch | null>(null);

  const branches: Branch[] = [
    {
      id: 'heliopolis-flagship',
      name: 'Heliopolis Flagship Showroom',
      region: 'Cairo & Giza',
      type: 'Flagship Store',
      address: '45 El-Nozha Street, Near Triumph Square, Heliopolis',
      city: 'Cairo',
      area: 'Heliopolis',
      phone: '+20 2 2690 1234',
      hours: '10:00 AM - 10:00 PM',
      fridayHours: '2:00 PM - 10:00 PM',
      image: 'https://api.shatta.com/storage/4448/lehaf_098.jpg',
      services: ['Curtain Design Studio', 'Custom Furniture', 'Bridal Registry', 'VIP Consultation Lounge'],
      features: ['Valet Parking Available', 'Wheelchair Accessible', '3 Floors Exhibition']
    },
    {
      id: '5th-settlement',
      name: 'New Cairo - 5th Settlement',
      region: 'Cairo & Giza',
      type: 'Flagship Store',
      address: 'Sector 1, Downtown Mall, Road 90 South, 5th Settlement',
      city: 'Cairo',
      area: 'New Cairo',
      phone: '+20 2 2812 5678',
      hours: '10:00 AM - 11:00 PM',
      fridayHours: '2:00 PM - 11:00 PM',
      image: 'https://api.shatta.com/storage/3273/pouf-60_L.jpg',
      services: ['Full Home Fabrics', 'Interior Tailoring', 'Home Delivery & Installation', 'Bridal Consultation'],
      features: ['Free Mall Parking', 'Kids Play Area', 'Coffee Lounge']
    },
    {
      id: 'zamalek-boutique',
      name: 'Zamalek Heritage Boutique',
      region: 'Cairo & Giza',
      type: 'Boutique',
      address: '14 26th of July Street, Near Diwan, Zamalek',
      city: 'Cairo',
      area: 'Zamalek',
      phone: '+20 2 2736 9988',
      hours: '10:00 AM - 9:30 PM',
      fridayHours: '2:00 PM - 9:30 PM',
      image: 'https://api.shatta.com/storage/3282/pouf-15.jpg',
      services: ['Luxury Bedding', 'Curated Decor Accessories', 'Bespoke Pillows'],
      features: ['Historic Ambience', 'Personal Stylist']
    },
    {
      id: 'sheikh-zayed',
      name: 'Sheikh Zayed - Arkan Plaza',
      region: 'Cairo & Giza',
      type: 'Showroom',
      address: 'Arkan Plaza, Building 4, Ground Floor, Sheikh Zayed',
      city: 'Giza',
      area: 'Sheikh Zayed',
      phone: '+20 2 3851 4433',
      hours: '10:00 AM - 11:00 PM',
      fridayHours: '2:00 PM - 11:00 PM',
      image: 'https://api.shatta.com/storage/3265/pouf-91.jpg',
      services: ['Custom Upholstery', 'Curtain Fitting', 'Corporate Order Desk'],
      features: ['Plaza Parking', 'Outdoor Terrace']
    },
    {
      id: 'maadi-degla',
      name: 'Maadi Degla Store',
      region: 'Cairo & Giza',
      type: 'Showroom',
      address: '23 Road 199, Degla, Maadi',
      city: 'Cairo',
      area: 'Maadi',
      phone: '+20 2 2519 7722',
      hours: '10:00 AM - 10:00 PM',
      fridayHours: '2:00 PM - 10:00 PM',
      image: 'https://api.shatta.com/storage/3235/pouf-157_L.jpg',
      services: ['Bed & Bath Collection', 'Living Room Textiles', 'Custom Curtains'],
      features: ['Easy Street Parking', 'Multilingual Staff']
    },
    {
      id: 'alexandria-san-stefano',
      name: 'Alexandria - San Stefano Grand Plaza',
      region: 'Alexandria & Coast',
      type: 'Flagship Store',
      address: 'San Stefano Grand Plaza Mall, 2nd Level, El-Gaish Road',
      city: 'Alexandria',
      area: 'San Stefano',
      phone: '+20 3 584 9900',
      hours: '10:00 AM - 11:00 PM',
      fridayHours: '2:00 PM - 11:00 PM',
      image: 'https://api.shatta.com/storage/3208/pouf-216_L.jpg',
      services: ['Summer & Beach Fabrics', 'Luxury Bedding', 'Complete Home Styling'],
      features: ['Sea View Lounge', 'Underground Mall Parking']
    },
    {
      id: 'alexandria-fouad',
      name: 'Alexandria - Fouad Street',
      region: 'Alexandria & Coast',
      type: 'Showroom',
      address: '72 Fouad Street, Downtown, Alexandria',
      city: 'Alexandria',
      area: 'Fouad Street',
      phone: '+20 3 487 2211',
      hours: '10:00 AM - 10:00 PM',
      fridayHours: '2:00 PM - 10:00 PM',
      image: 'https://api.shatta.com/storage/3253/pouf-108.jpg',
      services: ['Bridal Fabrics', 'Classic Drapery', 'Mattress & Bedding'],
      features: ['Historic District Location', 'Expert Tailors On-site']
    },
    {
      id: 'mansoura-flagship',
      name: 'Mansoura City Center Showroom',
      region: 'Delta Region',
      type: 'Flagship Store',
      address: 'El-Gomhouria Street, Near Mansoura University Gate',
      city: 'Mansoura',
      area: 'Downtown',
      phone: '+20 50 231 8844',
      hours: '9:30 AM - 10:30 PM',
      fridayHours: '2:00 PM - 10:30 PM',
      image: 'https://api.shatta.com/storage/3274/pouf-60-(1).jpg',
      services: ['Bridal Trousseau Special', 'Custom Sofa Fabrics', 'Curtain Fitting'],
      features: ['Dedicated Bridal Floor', 'Free Local Measuring']
    },
    {
      id: 'tanta-geish',
      name: 'Tanta - El-Geish Avenue',
      region: 'Delta Region',
      type: 'Showroom',
      address: '55 El-Geish Avenue, Opposite Stadium, Tanta',
      city: 'Tanta',
      area: 'El-Geish',
      phone: '+20 40 334 1122',
      hours: '10:00 AM - 10:00 PM',
      fridayHours: '2:00 PM - 10:00 PM',
      image: 'https://api.shatta.com/storage/3236/pouf-157.jpg',
      services: ['Home Decor', 'Bed Linen', 'Upholstery Fabrics'],
      features: ['On-site Fabric Samples', 'Fast Delivery']
    },
    {
      id: 'hurghada-marina',
      name: 'Hurghada Red Sea Marina Store',
      region: 'Canal & Red Sea',
      type: 'Boutique',
      address: 'Hurghada Marina Boulevard, Unit B12, Hurghada',
      city: 'Hurghada',
      area: 'Marina',
      phone: '+20 65 344 7788',
      hours: '11:00 AM - 11:00 PM',
      fridayHours: '2:00 PM - 11:00 PM',
      image: 'https://api.shatta.com/storage/3245/pouf-146.jpg',
      services: ['Outdoor & Resort Fabrics', 'Beach Towels', 'Sun Lounger Cushions'],
      features: ['Resort Project Services', 'Express Shipping']
    }
  ];

  const regions = ['All', 'Cairo & Giza', 'Alexandria & Coast', 'Delta Region', 'Canal & Red Sea'];

  const filteredBranches = branches.filter((branch) => {
    const matchesRegion = selectedRegion === 'All' || branch.region === selectedRegion;
    const matchesSearch = 
      branch.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.city.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.area.toLowerCase().includes(searchQuery.toLowerCase()) ||
      branch.address.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesRegion && matchesSearch;
  });

  return (
    <div className="min-h-screen bg-[#FFFFFF] font-sans text-[#1A1A1A] overflow-x-hidden selection:bg-[#C4A35A] selection:text-white scroll-smooth">
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&family=Inter:wght@300;400;500;600&display=swap');
        .font-serif { font-family: 'Cormorant Garamond', serif; }
        .font-sans { font-family: 'Inter', sans-serif; }
      `}</style>

      <Header />

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8 md:py-12">
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-6">
          <a href="/preview/shatta-homepage/Homepage" className="hover:text-[#1A1A1A] transition-colors">Home</a>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#C4A35A] font-medium">Our Store Branches</span>
        </div>

        {/* Hero Section */}
        <div className="relative rounded-[2.5rem] overflow-hidden mb-12 bg-[#1A1A1A] text-white p-8 sm:p-12 md:p-16 shadow-2xl">
          <div className="absolute top-0 right-0 w-96 h-96 bg-[#C4A35A]/15 rounded-full blur-3xl pointer-events-none transform translate-x-1/3 -translate-y-1/3" />
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-[#C4A35A]/10 rounded-full blur-3xl pointer-events-none transform -translate-x-1/3 translate-y-1/3" />

          <div className="relative z-10 max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/10 backdrop-blur-md border border-white/15 text-[#C4A35A] text-xs font-semibold tracking-widest uppercase mb-6">
              <Sparkles className="w-3.5 h-3.5" />
              <span>25+ Luxury Showrooms Across Egypt</span>
            </div>

            <h1 className="font-serif text-4xl sm:text-5xl lg:text-6xl text-white font-bold leading-tight mb-6 drop-shadow-sm">
              Visit Our Store Branches
            </h1>
            <p className="text-white/80 text-sm md:text-base font-light leading-relaxed mb-8 max-w-2xl">
              Experience Shatta's heritage of fine craftsmanship in person. Explore our complete range of high-end home fabrics, Egyptian cotton bedding, bespoke drapery, and interior styling services.
            </p>

            <div className="flex flex-wrap items-center gap-6 text-xs text-white/70">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4A35A]" />
                <span>Expert Fabric Consultants</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4A35A]" />
                <span>Free In-Store Measuring & Design</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-[#C4A35A]" />
                <span>Custom Curtain Tailoring</span>
              </div>
            </div>
          </div>
        </div>

        {/* Filter & Search Bar */}
        <div className="bg-white border border-[#E8E0D4] rounded-[2rem] p-4 md:p-6 mb-10 shadow-sm shadow-black/5">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-6">
            
            {/* Search Input */}
            <div className="relative flex-1 min-w-[280px]">
              <Search className="w-5 h-5 text-[#1A1A1A]/40 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                placeholder="Search by branch name, area, or city..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full bg-gray-50/80 border border-[#E8E0D4] rounded-full pl-12 pr-4 py-3 text-sm text-[#1A1A1A] placeholder-[#1A1A1A]/40 focus:outline-none focus:border-[#C4A35A] focus:bg-white transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-gray-400 hover:text-black"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Region Selector Pills */}
            <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 hide-scrollbar">
              {regions.map((region) => (
                <button
                  key={region}
                  onClick={() => setSelectedRegion(region)}
                  className={`px-5 py-2.5 rounded-full text-xs font-semibold tracking-wide whitespace-nowrap transition-all ${
                    selectedRegion === region
                      ? 'bg-[#1A1A1A] text-white shadow-md'
                      : 'bg-gray-50 text-[#1A1A1A]/70 border border-[#E8E0D4] hover:border-[#C4A35A] hover:text-[#1A1A1A]'
                  }`}
                >
                  {region}
                </button>
              ))}
            </div>

          </div>

          <div className="mt-4 pt-4 border-t border-[#E8E0D4] flex items-center justify-between text-xs text-[#1A1A1A]/60">
            <span>Showing <strong className="text-[#1A1A1A]">{filteredBranches.length}</strong> branches in Egypt</span>
            {searchQuery || selectedRegion !== 'All' ? (
              <button 
                onClick={() => { setSelectedRegion('All'); setSearchQuery(''); }}
                className="text-[#C4A35A] font-medium underline hover:text-[#1A1A1A]"
              >
                Reset Filters
              </button>
            ) : null}
          </div>
        </div>

        {/* Branches Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {filteredBranches.map((branch) => (
            <motion.div
              key={branch.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="bg-white border border-[#E8E0D4] rounded-[2rem] overflow-hidden flex flex-col justify-between group hover:border-[#C4A35A] hover:shadow-xl hover:shadow-black/5 transition-all duration-500"
            >
              <div>
                {/* Branch Image */}
                <div className="relative h-56 overflow-hidden bg-gray-100">
                  <img
                    src={branch.image}
                    alt={branch.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent" />
                  
                  <div className="absolute top-4 left-4 flex gap-2">
                    <span className="bg-white/90 backdrop-blur-md text-[#1A1A1A] text-[10px] font-bold tracking-wider px-3 py-1 rounded-full shadow-sm uppercase">
                      {branch.type}
                    </span>
                  </div>

                  <div className="absolute bottom-4 left-4 right-4 text-white">
                    <span className="text-[10px] text-[#C4A35A] font-bold tracking-widest uppercase block mb-1">
                      {branch.area} &bull; {branch.city}
                    </span>
                    <h3 className="font-serif text-2xl text-white font-bold leading-tight drop-shadow-sm">
                      {branch.name}
                    </h3>
                  </div>
                </div>

                {/* Branch Content */}
                <div className="p-6 space-y-4">
                  {/* Address */}
                  <div className="flex items-start gap-3">
                    <MapPin className="w-5 h-5 text-[#C4A35A] shrink-0 mt-0.5" />
                    <p className="text-xs text-[#1A1A1A]/80 leading-relaxed font-medium">
                      {branch.address}
                    </p>
                  </div>

                  {/* Hours */}
                  <div className="flex items-start gap-3">
                    <Clock className="w-4 h-4 text-gray-400 shrink-0 mt-0.5" />
                    <div className="text-xs text-gray-600 space-y-0.5">
                      <div><strong className="text-[#1A1A1A]/80 font-medium">Sat - Thu:</strong> {branch.hours}</div>
                      <div><strong className="text-[#1A1A1A]/80 font-medium">Friday:</strong> {branch.fridayHours}</div>
                    </div>
                  </div>

                  {/* Phone */}
                  <div className="flex items-center gap-3">
                    <Phone className="w-4 h-4 text-gray-400 shrink-0" />
                    <a href={`tel:${branch.phone}`} className="text-xs text-[#1A1A1A] font-medium hover:text-[#C4A35A] transition-colors">
                      {branch.phone}
                    </a>
                  </div>

                  {/* Available Services */}
                  <div className="pt-2 border-t border-gray-100">
                    <span className="text-[10px] font-semibold text-gray-400 uppercase tracking-widest block mb-2">Available Services</span>
                    <div className="flex flex-wrap gap-1.5">
                      {branch.services.map((service) => (
                        <span key={service} className="bg-gray-50 border border-gray-200 text-[#1A1A1A]/80 text-[10px] px-2.5 py-1 rounded-md">
                          {service}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Buttons */}
              <div className="p-6 pt-0 flex gap-3">
                <button
                  onClick={() => setActiveBranch(branch)}
                  className="flex-1 bg-[#1A1A1A] hover:bg-[#C4A35A] text-white py-3 rounded-full text-xs font-semibold tracking-wider transition-all duration-300 flex items-center justify-center gap-2 shadow-sm"
                >
                  <Navigation className="w-3.5 h-3.5" />
                  <span>VIEW DETAILS & MAP</span>
                </button>
                <a
                  href={`tel:${branch.phone}`}
                  className="w-11 h-11 border border-[#E8E0D4] rounded-full flex items-center justify-center text-[#1A1A1A] hover:border-[#C4A35A] hover:text-[#C4A35A] transition-colors shrink-0"
                  aria-label="Call Branch"
                >
                  <Phone className="w-4 h-4" />
                </a>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Home Inspection & Consultation Banner */}
        <div className="bg-[#FAF8F5] border border-[#E8E0D4] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-center justify-between gap-8 mb-16">
          <div className="space-y-4 max-w-xl">
            <div className="inline-flex items-center gap-2 text-[#C4A35A] text-xs font-semibold uppercase tracking-widest">
              <Compass className="w-4 h-4" />
              <span>Shatta In-Home Consultation</span>
            </div>
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] font-bold">
              Can't Visit a Branch? We Come To You.
            </h2>
            <p className="text-gray-600 text-sm leading-relaxed">
              Book a complimentary home visit by our master curtain & fabric specialists. We bring fabric samples, measure your space precisely, and recommend custom solutions for your home.
            </p>
          </div>
          <div className="shrink-0 flex flex-col sm:flex-row gap-4 w-full md:w-auto">
            <a
              href="/preview/shatta-homepage/Contact"
              className="bg-[#1A1A1A] hover:bg-[#C4A35A] text-white px-8 py-4 rounded-full text-xs font-semibold tracking-widest text-center transition-all shadow-md flex items-center justify-center gap-2"
            >
              <span>BOOK HOME VISIT</span>
              <ArrowRight className="w-4 h-4" />
            </a>
          </div>
        </div>

        {/* Branch Modal Detail */}
        <AnimatePresence>
          {activeBranch && (
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="absolute inset-0 bg-black/60 backdrop-blur-sm"
                onClick={() => setActiveBranch(null)}
              />
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 20 }}
                className="relative bg-white border border-[#E8E0D4] rounded-[2.5rem] max-w-2xl w-full max-h-[90vh] overflow-y-auto z-10 shadow-2xl p-6 sm:p-8"
              >
                <button
                  onClick={() => setActiveBranch(null)}
                  className="absolute top-6 right-6 w-9 h-9 rounded-full bg-gray-100 hover:bg-black hover:text-white flex items-center justify-center text-gray-500 transition-colors"
                >
                  &times;
                </button>

                <div className="inline-block bg-[#C4A35A]/10 text-[#C4A35A] text-[10px] font-bold tracking-widest uppercase px-3 py-1 rounded-full mb-3">
                  {activeBranch.type} &bull; {activeBranch.city}
                </div>
                <h2 className="font-serif text-3xl font-bold text-[#1A1A1A] mb-2">{activeBranch.name}</h2>
                <p className="text-xs text-gray-500 mb-6 flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-[#C4A35A]" />
                  {activeBranch.address}
                </p>

                {/* Map View Placeholder Card */}
                <div className="w-full h-64 bg-gray-100 rounded-2xl overflow-hidden mb-6 relative border border-gray-200 flex items-center justify-center group">
                  <img src={activeBranch.image} alt={activeBranch.name} className="w-full h-full object-cover opacity-80" />
                  <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center p-6 text-center text-white">
                    <MapPin className="w-10 h-10 text-[#C4A35A] mb-2 animate-bounce" />
                    <span className="font-serif text-xl font-bold mb-1">{activeBranch.name}</span>
                    <span className="text-xs text-white/80 max-w-sm mb-4">{activeBranch.address}</span>
                    <a
                      href={`https://maps.google.com/?q=${encodeURIComponent(activeBranch.name + ' ' + activeBranch.address)}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-white text-[#1A1A1A] hover:bg-[#C4A35A] hover:text-white px-6 py-2.5 rounded-full text-xs font-semibold tracking-wider transition-all flex items-center gap-2 shadow-lg"
                    >
                      <span>OPEN IN GOOGLE MAPS</span>
                      <ExternalLink className="w-3.5 h-3.5" />
                    </a>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-6">
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Working Hours</span>
                    <p className="text-xs font-medium text-[#1A1A1A]">Sat - Thu: {activeBranch.hours}</p>
                    <p className="text-xs font-medium text-[#1A1A1A]">Friday: {activeBranch.fridayHours}</p>
                  </div>
                  <div className="bg-gray-50 p-4 rounded-xl border border-gray-100">
                    <span className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-1">Direct Contact</span>
                    <p className="text-xs font-medium text-[#1A1A1A]">{activeBranch.phone}</p>
                    <p className="text-[10px] text-gray-400 mt-1">Customer Service Hotline: 19888</p>
                  </div>
                </div>

                <div className="space-y-3 mb-6">
                  <span className="text-xs font-bold text-[#1A1A1A] uppercase tracking-wider block">Special Features & Amenities</span>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs text-gray-600">
                    {activeBranch.features.map((feature) => (
                      <div key={feature} className="flex items-center gap-2">
                        <CheckCircle2 className="w-4 h-4 text-[#C4A35A]" />
                        <span>{feature}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="flex gap-4">
                  <a
                    href={`tel:${activeBranch.phone}`}
                    className="flex-1 bg-[#1A1A1A] hover:bg-[#C4A35A] text-white py-3.5 rounded-full text-xs font-semibold tracking-wider text-center transition-all shadow-md"
                  >
                    CALL BRANCH NOW
                  </a>
                  <button
                    onClick={() => setActiveBranch(null)}
                    className="px-6 py-3.5 border border-gray-200 rounded-full text-xs font-medium text-gray-600 hover:bg-gray-50"
                  >
                    Close
                  </button>
                </div>
              </motion.div>
            </div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default Branches;
