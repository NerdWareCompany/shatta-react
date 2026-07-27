import React, { useState, useEffect, useRef } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, Palette, Landmark, Leaf, Users, ArrowRight } from 'lucide-react';
import { motion, useScroll, useTransform, useInView } from 'framer-motion';

const NumberCounter = ({ from = 0, to, duration = 2 }: { from?: number, to: number, duration?: number }) => {
  const nodeRef = useRef<HTMLSpanElement>(null);
  const inView = useInView(nodeRef, { once: true, margin: "-50px" });
  
  useEffect(() => {
    if (inView && nodeRef.current) {
      const node = nodeRef.current;
      let startTime: number;
      const step = (timestamp: number) => {
        if (!startTime) startTime = timestamp;
        const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);
        const easeProgress = progress === 1 ? 1 : 1 - Math.pow(2, -10 * progress);
        const current = Math.floor(easeProgress * (to - from) + from);
        node.textContent = current.toString();
        if (progress < 1) {
          requestAnimationFrame(step);
        }
      };
      requestAnimationFrame(step);
    }
  }, [inView, from, to, duration]);

  return <span ref={nodeRef}>{from}</span>;
};

export function About() {
  const [isScrolled, setIsScrolled] = useState(false);
  const { scrollY } = useScroll();
  const heroY = useTransform(scrollY, [0, 1000], [0, 250]);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const fadeUp: any = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: [0.16, 1, 0.3, 1] } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const values = [
    { icon: Palette, title: 'Craftsmanship', desc: 'Meticulous attention to detail passed down through generations of artisans.' },
    { icon: Landmark, title: 'Heritage', desc: 'Rooted deeply in the rich textile history and traditions of Egypt since 1988.' },
    { icon: Leaf, title: 'Sustainability', desc: 'Committed to ethical sourcing and sustainable practices for a better tomorrow.' },
    { icon: Users, title: 'Community', desc: 'Building homes and supporting the families that weave our success story.' }
  ];

  const team = [
    { name: 'Omar El-Sayed', role: 'Master Weaver', img: 'https://api.shatta.com/storage/264/CUSH1_446_L.jpg' },
    { name: 'Nour Youssef', role: 'Head of Design', img: 'https://api.shatta.com/storage/3208/pouf-216_L.jpg' },
    { name: 'Amina Hassan', role: 'Textile Engineer', img: 'https://api.shatta.com/storage/3221/pouf-177_L.jpg' },
    { name: 'Tarek Mahmoud', role: 'Quality Director', img: 'https://api.shatta.com/storage/3260/pouf-95_L.jpg' }
  ];

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

      {/* Hero Section */}
      <section className="px-4 md:px-6 pt-2 pb-6">
        <div className="relative w-full h-[60vh] md:h-[75vh] bg-[#FFFFFF] overflow-hidden group rounded-[2.5rem] shadow-2xl shadow-black/10">
          <motion.div style={{ y: heroY }} className="absolute inset-[-10%] w-[120%] h-[120%]">
            <img 
              src="/images/about.webp" 
              alt="Craftsmanship" 
              className="w-full h-full object-cover transform scale-[1.02] group-hover:scale-105 transition-transform duration-[15s] ease-out"
            />
          </motion.div>
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
          
          <motion.div 
            initial="hidden"
            animate="visible"
            variants={staggerContainer}
            className="absolute inset-0 flex flex-col justify-end pb-20 px-10 md:px-20 lg:px-28 max-w-5xl"
          >
            <motion.span variants={fadeUp} className="text-[#C4A35A] text-sm font-medium tracking-[0.2em] mb-4">OUR HERITAGE</motion.span>
            <motion.h2 variants={fadeUp} className="text-white font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.1] mb-6 drop-shadow-lg">
              Since 1988, We've Been<br />Weaving Egyptian Homes
            </motion.h2>
          </motion.div>
        </div>
      </section>

      {/* Our Story */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <div className="flex flex-col lg:flex-row gap-16 lg:gap-24 items-center">
          <motion.div variants={fadeUp} className="w-full lg:w-1/2">
            <div className="relative aspect-[4/5] overflow-hidden rounded-[2.5rem] shadow-xl shadow-black/10 group">
              <img 
                src="https://api.shatta.com/storage/525/cush17-696-02.jpg" 
                alt="Our Story" 
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-[15s] ease-out"
              />
              <div className="absolute -bottom-6 -end-6 w-32 h-32 bg-[#E8E0D4] rounded-full -z-10 blur-2xl opacity-60"></div>
            </div>
          </motion.div>
          
          <motion.div variants={fadeUp} className="w-full lg:w-1/2 flex flex-col justify-center">
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-8 leading-[1.1]">
              A Legacy of <br /><span className="text-[#C4A35A] italic">Modern Luxury</span>
            </h2>
            <div className="space-y-6 text-[#1A1A1A]/70 font-light leading-relaxed text-base md:text-lg">
              <p>
                Founded in 1988, SHATTA began as a small boutique in the heart of Cairo, driven by a singular vision: to bring the unparalleled quality of true Egyptian craftsmanship to the modern home. For over three decades, we have remained true to our roots while continuously evolving our aesthetics.
              </p>
              <p>
                As a family-owned business spanning three generations, we believe that the soul of a home resides in its details. From the finest long-staple cotton cultivated along the Nile to the meticulous weaving techniques preserved by our artisans, every piece tells a story of dedication and excellence.
              </p>
              <p>
                Today, with over 25 branches across Egypt, SHATTA is more than a brand. It is a promise of enduring elegance, transforming everyday spaces into sanctuaries of comfort and refined style.
              </p>
            </div>
            
            <div className="mt-10 pt-10 border-t border-[#E8E0D4]">
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Youssef Shatta</h3>
              <p className="text-sm tracking-widest text-[#C4A35A] uppercase font-medium">Founder & Chairman</p>
            </div>
          </motion.div>
        </div>
      </motion.section>

      {/* Our Values */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-24 px-4 md:px-8 bg-[#FAFAFA]"
      >
        <div className="max-w-7xl mx-auto">
          <motion.div variants={fadeUp} className="text-center mb-16">
            <span className="text-[#C4A35A] text-sm font-medium tracking-[0.2em] uppercase mb-4 block">WHAT DEFINES US</span>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-6">Our Core Values</h2>
            <div className="w-12 h-[2px] bg-[#C4A35A] rounded-full mx-auto"></div>
          </motion.div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((val, idx) => (
              <motion.div variants={fadeUp} key={idx} className="bg-white p-10 rounded-[2rem] shadow-sm hover:shadow-xl hover:shadow-black/5 transition-all duration-300 group border border-transparent hover:border-[#E8E0D4]">
                <div className="w-14 h-14 rounded-full bg-[#E8E0D4]/30 flex items-center justify-center mb-6 group-hover:bg-[#C4A35A]/10 transition-colors duration-300">
                  <val.icon className="w-6 h-6 text-[#C4A35A]" />
                </div>
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-4">{val.title}</h3>
                <p className="text-[#1A1A1A]/60 font-light leading-relaxed text-sm">
                  {val.desc}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* By The Numbers Stat Strip */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-4 md:px-8 py-16 md:py-24"
      >
        <div className="max-w-7xl mx-auto bg-[#E8E0D4] rounded-[3rem] p-12 md:p-20 relative overflow-hidden shadow-xl shadow-black/5">
          <div className="absolute top-0 start-0 w-full h-full bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-white/40 to-transparent opacity-60 pointer-events-none"></div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-10 md:gap-6 relative z-10 text-center">
            <div className="flex flex-col items-center">
              <div className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-3 flex items-center">
                <NumberCounter to={35} />+
              </div>
              <p className="text-sm tracking-widest text-[#1A1A1A]/70 uppercase font-medium">Years</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-3 flex items-center">
                <NumberCounter to={25} />+
              </div>
              <p className="text-sm tracking-widest text-[#1A1A1A]/70 uppercase font-medium">Branches</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-3 flex items-center">
                <NumberCounter to={1} />M+
              </div>
              <p className="text-sm tracking-widest text-[#1A1A1A]/70 uppercase font-medium">Happy Homes</p>
            </div>
            <div className="flex flex-col items-center">
              <div className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-3 flex items-center">
                <NumberCounter to={500} />+
              </div>
              <p className="text-sm tracking-widest text-[#1A1A1A]/70 uppercase font-medium">Artisans</p>
            </div>
          </div>
        </div>
      </motion.section>

      {/* Meet the Team / Our Craftsmen */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={staggerContainer}
        className="py-16 md:py-24 px-4 md:px-8 max-w-7xl mx-auto"
      >
        <motion.div variants={fadeUp} className="flex flex-col md:flex-row justify-between items-end mb-16 gap-6">
          <div>
            <h2 className="font-serif text-4xl md:text-5xl text-[#1A1A1A] mb-4">Our Craftsmen</h2>
            <p className="text-[#1A1A1A]/60 font-light max-w-md">Meet the dedicated hands and brilliant minds that bring the SHATTA vision to life every single day.</p>
          </div>
          <a href="#" className="inline-flex items-center text-[#1A1A1A] text-sm font-medium tracking-[0.1em] group relative overflow-hidden pb-2 shrink-0">
            <span className="group-hover:text-[#C4A35A] transition-colors duration-300">JOIN OUR TEAM</span>
            <ArrowRight className="ms-2 w-4 h-4 group-hover:translate-x-2 rtl:group-hover:-translate-x-2 group-hover:text-[#C4A35A] transition-all duration-300" />
            <span className="absolute bottom-0 start-0 w-full h-[1px] bg-[#1A1A1A] group-hover:bg-[#C4A35A] transition-colors"></span>
          </a>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, idx) => (
            <motion.div variants={fadeUp} key={idx} className="group cursor-pointer">
              <div className="relative aspect-[3/4] overflow-hidden rounded-[2rem] shadow-sm mb-6">
                <img 
                  src={member.img} 
                  alt={member.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-[10s] ease-out grayscale-[20%] group-hover:grayscale-0"
                />
                <div className="absolute inset-0 bg-black/10 group-hover:bg-transparent transition-colors duration-500"></div>
              </div>
              <div className="text-center">
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-1">{member.name}</h3>
                <p className="text-[11px] font-medium tracking-widest text-[#C4A35A] uppercase">{member.role}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </motion.section>

      {/* Closing CTA Band */}
      <motion.section 
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={fadeUp}
        className="px-4 md:px-8 py-16 md:py-24"
      >
        <div className="max-w-5xl mx-auto text-center border-t border-[#E8E0D4] pt-20">
          <h2 className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] mb-8 leading-tight">
            Ready to bring Egyptian <br className="hidden md:block"/> elegance into your home?
          </h2>
          <motion.button 
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="relative overflow-hidden group bg-[#C4A35A] text-white px-10 py-5 text-sm font-medium tracking-[0.1em] rounded-full shadow-xl shadow-[#C4A35A]/20"
          >
            <span className="absolute inset-0 w-full h-full bg-[#B39249] origin-[left] rtl:origin-[right] scale-x-0 group-hover:scale-x-100 transition-transform duration-500 ease-out rounded-full"></span>
            <span className="relative z-10">EXPLORE COLLECTIONS</span>
          </motion.button>
        </div>
      </motion.section>

      <Footer />
    </div>
  );
}

export default About;