import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, ChevronRight, MapPin, Phone, Mail } from 'lucide-react';
import { motion } from 'framer-motion';

export function Contact() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    console.log('Form submitted:', formData);
  };

  const InputField = ({ label, name, type = "text", placeholder = "", required = false, className = "" }: any) => (
    <div className={`relative ${className}`}>
      <label className="text-[10px] font-medium text-[#1A1A1A]/50 absolute top-2.5 start-4 tracking-widest uppercase pointer-events-none">{label}</label>
      <input 
        type={type} 
        name={name}
        placeholder={placeholder}
        required={required}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="w-full bg-white border border-[#E8E0D4] rounded-xl pt-7 pb-2.5 px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm placeholder:text-[#1A1A1A]/30"
      />
    </div>
  );

  const SelectField = ({ label, name, options = [], className = "" }: any) => (
    <div className={`relative ${className}`}>
      <label className="text-[10px] font-medium text-[#1A1A1A]/50 absolute top-2.5 start-4 tracking-widest uppercase z-10 pointer-events-none">{label}</label>
      <select 
        name={name}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="w-full bg-white border border-[#E8E0D4] rounded-xl pt-7 pb-2.5 px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm appearance-none relative z-0"
      >
        <option value="" disabled className="text-[#1A1A1A]/30">Select...</option>
        {options.map((opt: string) => <option key={opt} value={opt}>{opt}</option>)}
      </select>
      <div className="absolute end-4 top-1/2 -translate-y-1/2 pointer-events-none z-10">
        <ChevronRight className="w-4 h-4 text-[#1A1A1A]/40 rotate-90" />
      </div>
    </div>
  );

  const TextareaField = ({ label, name, placeholder = "", required = false, rows = 4, className = "" }: any) => (
    <div className={`relative ${className}`}>
      <label className="text-[10px] font-medium text-[#1A1A1A]/50 absolute top-2.5 start-4 tracking-widest uppercase pointer-events-none">{label}</label>
      <textarea 
        name={name}
        placeholder={placeholder}
        required={required}
        rows={rows}
        value={formData[name as keyof typeof formData]}
        onChange={handleChange}
        className="w-full bg-white border border-[#E8E0D4] rounded-xl pt-7 pb-2.5 px-4 text-sm text-[#1A1A1A] focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm placeholder:text-[#1A1A1A]/30 resize-none"
      />
    </div>
  );

  const fadeUp: any = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

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

      <main className="max-w-[1200px] mx-auto px-4 md:px-8 py-10 md:py-16">
        
        {/* Breadcrumb */}
        <motion.div 
          initial={{ opacity: 0, y: -10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-8 md:mb-12"
        >
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Home</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#C4A35A] font-medium">Contact Us</span>
        </motion.div>

        {/* Page Title */}
        <motion.div 
          initial="hidden"
          animate="visible"
          variants={staggerContainer}
          className="mb-12 md:mb-16"
        >
          <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-4">Get In Touch</motion.h1>
          <motion.p variants={fadeUp} className="text-[#1A1A1A]/60 text-base font-light max-w-xl leading-relaxed">
            We are here to help. Whether you have a question about our products, need design advice, or require assistance with your order.
          </motion.p>
        </motion.div>

        <div className="flex flex-col lg:flex-row gap-12 lg:gap-16 mb-20">
          
          {/* LEFT COLUMN - Form */}
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="flex-1"
          >
            <div className="bg-[#F9F9F9] border border-[#E8E0D4] rounded-3xl p-6 md:p-10 shadow-sm">
              <h2 className="font-serif text-2xl md:text-3xl text-[#1A1A1A] mb-8">Send us a message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Full Name" name="name" placeholder="Jane Doe" required />
                  <InputField label="Email Address" name="email" type="email" placeholder="jane@example.com" required />
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <InputField label="Phone Number" name="phone" type="tel" placeholder="+20 100 000 0000" />
                  <SelectField 
                    label="Subject" 
                    name="subject" 
                    options={['Order Inquiry', 'Product Information', 'Interior Design Services', 'Returns & Exchanges', 'Corporate Sales', 'Other']} 
                  />
                </div>
                
                <TextareaField 
                  label="Your Message" 
                  name="message" 
                  placeholder="How can we help you today?" 
                  required 
                  rows={5}
                />
                
                <div className="pt-4">
                  <motion.button 
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    type="submit"
                    className="w-full sm:w-auto bg-[#C4A35A] hover:bg-[#B39249] text-white px-10 py-4 rounded-full text-sm font-medium tracking-[0.1em] shadow-xl shadow-[#C4A35A]/20 transition-colors"
                  >
                    SEND MESSAGE
                  </motion.button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* RIGHT COLUMN - Info Cards */}
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="w-full lg:w-[400px] flex flex-col gap-6"
          >
            <motion.div variants={fadeUp} className="bg-white border border-[#E8E0D4] rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-[#C4A35A]/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C4A35A]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C4A35A]/20 transition-all duration-300">
                <MapPin className="w-5 h-5 text-[#C4A35A]" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">Visit a Showroom</h3>
              <p className="text-sm text-[#1A1A1A]/70 font-light leading-relaxed mb-4">
                Experience our collections in person at one of our 25+ branches across Egypt.
              </p>
              <a href="#" className="inline-flex items-center text-[#1A1A1A] text-sm font-medium tracking-wide hover:text-[#C4A35A] transition-colors">
                FIND A STORE <ChevronRight className="w-4 h-4 ms-1" />
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-[#E8E0D4] rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-[#C4A35A]/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C4A35A]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C4A35A]/20 transition-all duration-300">
                <Phone className="w-5 h-5 text-[#C4A35A]" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">Call Us</h3>
              <p className="text-sm text-[#1A1A1A]/70 font-light mb-4">
                Available daily from 10:00 AM to 10:00 PM
              </p>
              <a href="tel:+201000000000" className="text-lg font-medium text-[#1A1A1A] hover:text-[#C4A35A] transition-colors">
                19888
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="bg-white border border-[#E8E0D4] rounded-3xl p-8 shadow-sm hover:shadow-md hover:border-[#C4A35A]/30 transition-all duration-300 group">
              <div className="w-12 h-12 bg-[#C4A35A]/10 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#C4A35A]/20 transition-all duration-300">
                <Mail className="w-5 h-5 text-[#C4A35A]" />
              </div>
              <h3 className="font-serif text-xl text-[#1A1A1A] mb-3">Email Us</h3>
              <p className="text-sm text-[#1A1A1A]/70 font-light mb-4">
                We'll respond as quickly as possible within 24 hours.
              </p>
              <a href="mailto:hello@shattahome.com" className="text-base font-medium text-[#1A1A1A] hover:text-[#C4A35A] transition-colors">
                hello@shattahome.com
              </a>
            </motion.div>

            <motion.div variants={fadeUp} className="flex gap-4 pt-2 px-2">
              <a href="#" className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center hover:bg-[#C4A35A] hover:border-[#C4A35A] hover:text-white text-[#1A1A1A] transition-all duration-300">
                <Instagram className="w-4 h-4" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center hover:bg-[#C4A35A] hover:border-[#C4A35A] hover:text-white text-[#1A1A1A] transition-all duration-300">
                <Facebook className="w-4 h-4" />
              </a>
            </motion.div>

          </motion.div>
        </div>

        {/* Full Width Map Placeholder */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8 }}
          className="w-full bg-[#E8E0D4] rounded-[2.5rem] h-[300px] md:h-[400px] relative overflow-hidden shadow-inner shadow-black/5 flex items-center justify-center group cursor-pointer"
        >
          {/* Subtle noise/texture overlay for the stone background to make it feel a bit more physical */}
          <div className="absolute inset-0 opacity-[0.4] mix-blend-overlay pointer-events-none" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.8%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>
          
          <div className="flex flex-col items-center justify-center text-center z-10 transform group-hover:scale-105 transition-transform duration-500">
            <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center mb-4 shadow-lg shadow-black/5 group-hover:bg-[#C4A35A] transition-colors duration-500 group-hover:text-white">
              <MapPin className="w-6 h-6 text-[#1A1A1A] group-hover:text-white transition-colors duration-500" />
            </div>
            <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Cairo, Egypt</h3>
            <p className="text-sm font-medium tracking-wide text-[#1A1A1A]/70 uppercase">25+ Branches Nationwide</p>
          </div>
        </motion.div>

      </main>

      <Footer />
    </div>
  );
}

export default Contact;
