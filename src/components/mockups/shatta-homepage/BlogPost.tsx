import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, ChevronRight, Link as LinkIcon } from 'lucide-react';
import { motion } from 'framer-motion';

export function BlogPost() {
  const [isScrolled, setIsScrolled] = useState(false);

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

  const relatedArticles = [
    { title: 'The Ultimate Guide to Thread Counts', category: 'BEDDING', date: 'May 12, 2025', img: 'https://api.shatta.com/storage/3278/pouf-57.jpg' },
    { title: 'Choosing the Right Towel for Your Bathroom', category: 'BATH', date: 'April 28, 2025', img: 'https://api.shatta.com/storage/3285/pouf-10_L-(1).jpg' },
    { title: 'Layering Textures: A Winter Bedroom Refresh', category: 'HOME DECOR', date: 'March 15, 2025', img: 'https://api.shatta.com/storage/3281/pouf-15_L-(2).jpg' }
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

      <main className="pt-6 pb-20">
        <div className="max-w-[1000px] mx-auto px-4 md:px-8">
          {/* Breadcrumb */}
          <div className="flex items-center justify-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-10">
            <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Home</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Journal</span>
            <ChevronRight className="w-3 h-3 mx-2" />
            <span className="text-[#C4A35A] font-medium text-center">5 Ways to Style Egyptian Cotton Bedding This Season</span>
          </div>

          {/* Article Header */}
          <motion.div 
            initial="hidden" 
            animate="visible" 
            variants={staggerContainer}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <motion.div variants={fadeUp} className="inline-block px-4 py-1.5 rounded-full bg-[#C4A35A]/10 text-[#C4A35A] text-[10px] font-bold tracking-widest mb-6">
              HOME STYLING
            </motion.div>
            <motion.h1 variants={fadeUp} className="font-serif text-4xl md:text-5xl lg:text-6xl text-[#1A1A1A] leading-[1.1] mb-6">
              5 Ways to Style Egyptian Cotton Bedding This Season
            </motion.h1>
            <motion.p variants={fadeUp} className="text-lg md:text-xl text-[#1A1A1A]/60 font-light leading-relaxed mb-8">
              Transform your bedroom into a luxurious sanctuary with these simple layering techniques and seasonal color palettes.
            </motion.p>
            
            <motion.div variants={fadeUp} className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm">
              <img src="https://api.shatta.com/storage/537/cush17-521-02.jpg" alt="Author" className="w-12 h-12 rounded-full object-cover border border-[#E8E0D4] shadow-sm" />
              <div className="text-center sm:text-left">
                <div className="font-medium text-[#1A1A1A]">Nadia Hassan</div>
                <div className="text-[#1A1A1A]/50 font-light text-xs">June 14, 2025 &middot; 4 min read</div>
              </div>
            </motion.div>
          </motion.div>
        </div>

        {/* Hero Image */}
        <motion.div 
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="max-w-[1200px] mx-auto px-4 md:px-8 mb-16"
        >
          <div className="w-full aspect-[16/9] md:aspect-[21/9] rounded-3xl overflow-hidden shadow-xl shadow-black/5">
            <img src="https://api.shatta.com/storage/3277/pouf-57_L.jpg" alt="Luxurious Egyptian Cotton Bedding" className="w-full h-full object-cover hover:scale-105 transition-transform duration-[15s] ease-out" />
          </div>
        </motion.div>

        {/* Article Body */}
        <div className="max-w-2xl mx-auto px-4 md:px-8">
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            viewport={{ once: true, margin: "-50px" }} 
            variants={staggerContainer}
            className="font-light text-[#1A1A1A]/80 leading-relaxed text-base md:text-lg"
          >
            <motion.p variants={fadeUp} className="mb-6">
              There is nothing quite like the feeling of sliding into a freshly made bed outfitted with premium Egyptian cotton. Renowned globally for its extraordinary softness, durability, and breathability, Egyptian cotton has been the gold standard in luxury bedding for decades. But as the seasons shift, so too should our approach to styling these exquisite linens.
            </motion.p>

            <motion.p variants={fadeUp} className="mb-10">
              Whether you are looking to create a cozy, layered look for the cooler months or a crisp, airy aesthetic for summer, mastering the art of the made bed can dramatically alter the ambiance of your entire bedroom. Here are five expert ways to style your Egyptian cotton bedding this season, ensuring your sleep space is as beautiful as it is comfortable.
            </motion.p>

            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mt-12 mb-6">1. Master the Art of Layering</motion.h2>
            
            <motion.p variants={fadeUp} className="mb-6">
              The secret to a boutique hotel-quality bed lies in thoughtful layering. Start with a crisp, taut fitted sheet, followed by a flat sheet placed with the finished hem facing down. This ensures that when you fold the sheet back over your duvet, the decorative edge is proudly displayed.
            </motion.p>

            {/* Pull Quote */}
            <motion.div variants={fadeUp} className="my-12 py-8 px-8 bg-[#C4A35A]/5 border-s-4 border-[#C4A35A] rounded-e-2xl rounded-s-sm shadow-sm">
              <p className="font-serif text-2xl md:text-3xl italic text-[#1A1A1A] m-0 leading-tight">
                "A truly luxurious bed invites you in before you even touch the sheets. It's about visual softness as much as tactile comfort."
              </p>
            </motion.div>

            <motion.p variants={fadeUp} className="mb-10">
              Add a lightweight quilted blanket or coverlet for texture, and top it off with a plush duvet folded halfway down the bed. This "double turn-down" method instantly adds volume and invites you to dive in.
            </motion.p>

            <motion.h2 variants={fadeUp} className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mt-12 mb-6">2. Introduce Earthy Textures</motion.h2>

            <motion.p variants={fadeUp} className="mb-8">
              While Egyptian cotton provides a smooth, luminous base, contrasting it with rougher, earthy textures creates a compelling visual dynamic. Think chunky knit throws casually draped across the foot of the bed, or linen accent pillows mixed with your standard cotton shams.
            </motion.p>

            {/* Inline Image */}
            <motion.div variants={fadeUp} className="my-10 rounded-2xl overflow-hidden shadow-lg shadow-black/5">
              <img src="https://api.shatta.com/storage/3245/pouf-146.jpg" alt="Textured Pillows" className="w-full h-auto object-cover" />
            </motion.div>

            <motion.p variants={fadeUp} className="mb-6">
              These textured accents break up the uniformity of a solid sheet set and add a touch of relaxed, lived-in charm to an otherwise formal setup. A woven jute rug placed slightly under the bed frame can further ground the room and complement the bedding's softness.
            </motion.p>

            <motion.p variants={fadeUp} className="mb-10">
              By combining the unparalleled luxury of Egyptian cotton with thoughtful styling techniques, you can curate a bedroom that feels like a personal retreat—one that you'll look forward to returning to every single night.
            </motion.p>
          </motion.div>

          {/* Social Share */}
          <div className="flex flex-col sm:flex-row items-center justify-center sm:justify-start gap-4 py-8 border-t border-b border-[#E8E0D4] mt-12 mb-12">
            <span className="text-sm font-medium tracking-widest text-[#1A1A1A]/50 uppercase">SHARE ARTICLE</span>
            <div className="flex gap-3">
              <button className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C4A35A] hover:border-[#C4A35A] transition-all shadow-sm">
                <Facebook className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C4A35A] hover:border-[#C4A35A] transition-all shadow-sm">
                <Instagram className="w-4 h-4" />
              </button>
              <button className="w-10 h-10 rounded-full border border-[#E8E0D4] flex items-center justify-center text-[#1A1A1A]/70 hover:text-[#C4A35A] hover:border-[#C4A35A] transition-all shadow-sm">
                <LinkIcon className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Author Bio */}
          <div className="bg-[#E8E0D4]/30 rounded-3xl p-8 flex flex-col sm:flex-row items-center sm:items-start gap-6 mb-20 shadow-sm border border-[#E8E0D4]">
            <img src="https://api.shatta.com/storage/527/cush17-652-03.jpg" alt="Author" className="w-20 h-20 rounded-full object-cover border-2 border-white shadow-md flex-shrink-0" />
            <div className="text-center sm:text-left">
              <div className="text-[10px] font-bold tracking-widest text-[#C4A35A] uppercase mb-1">WRITTEN BY</div>
              <h3 className="font-serif text-2xl text-[#1A1A1A] mb-2">Nadia Hassan</h3>
              <p className="text-sm text-[#1A1A1A]/70 font-light leading-relaxed">
                Nadia is the Lead Interior Stylist at Shatta Home. With over a decade of experience in residential design, she specializes in creating spaces that balance opulent comfort with practical everyday living.
              </p>
            </div>
          </div>
        </div>

        {/* You May Also Like */}
        <div className="max-w-[1200px] mx-auto px-4 md:px-8 mt-24">
          <div className="flex flex-col items-center mb-12">
            <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-4">You May Also Like</h2>
            <div className="w-12 h-[2px] bg-[#C4A35A] rounded-full"></div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
            {relatedArticles.map((article, idx) => (
              <motion.div 
                key={idx}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: idx * 0.1 }}
                className="group cursor-pointer flex flex-col"
              >
                <div className="relative aspect-[4/3] overflow-hidden rounded-3xl mb-6 shadow-sm shadow-black/5">
                  <img src={article.img} alt={article.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-[0.16,1,0.3,1]" />
                </div>
                <div className="px-2">
                  <div className="flex items-center gap-3 text-[10px] font-medium tracking-widest text-[#C4A35A] uppercase mb-3">
                    <span>{article.category}</span>
                    <span className="w-1 h-1 rounded-full bg-[#E8E0D4]"></span>
                    <span className="text-[#1A1A1A]/40">{article.date}</span>
                  </div>
                  <h3 className="font-serif text-2xl text-[#1A1A1A] leading-snug group-hover:text-[#C4A35A] transition-colors">
                    {article.title}
                  </h3>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

export default BlogPost;