import React, { useState, useEffect } from 'react';
import { Header } from './layout/Header';
import { Footer } from './layout/Footer';
import { Search, Heart, User, ShoppingCart, Instagram, Facebook, ChevronRight, ArrowRight } from 'lucide-react';
import { motion } from 'framer-motion';

export function Blog() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeCategory, setActiveCategory] = useState('All');

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const categories = ['All', 'Styling Tips', 'Behind the Scenes', 'Guides', 'Trends'];

  const featuredArticle = {
    title: "The Art of Layering Textures in Your Living Room",
    excerpt: "Discover how to combine linen, velvet, and cotton to create a space that feels rich, inviting, and effortlessly chic. Our lead designer shares the secret formulas to perfect layering.",
    category: "Styling Tips",
    date: "May 12, 2025",
    author: "Nour El Din",
    authorAvatar: "https://api.shatta.com/storage/202/MDF_996.jpg",
    img: "https://api.shatta.com/storage/381/CUSH1_453_L.jpg"
  };

  const articles = [
    {
      title: "Choosing the Right Thread Count for Egyptian Summer",
      excerpt: "Why higher isn't always better when the temperature rises. A guide to finding your perfect summer sheets.",
      category: "Guides",
      date: "May 8, 2025",
      author: "Laila Hassan",
      authorAvatar: "https://api.shatta.com/storage/499/cush17-808-01.jpg",
      img: "https://api.shatta.com/storage/4371/lehaf_203.jpg"
    },
    {
      title: "Behind the Loom: Our New Bridal Collection",
      excerpt: "Step inside our workshop to see how the upcoming Bridal series marries traditional motifs with modern palettes.",
      category: "Behind the Scenes",
      date: "May 3, 2025",
      author: "Youssef Amin",
      authorAvatar: "https://api.shatta.com/storage/4616/lehaf_214.webp",
      img: "https://api.shatta.com/storage/363/CUSH1_366_L.jpg"
    },
    {
      title: "5 Bathroom Updates That Feel Like a Spa Renovation",
      excerpt: "You don't need a demolition crew to transform your morning routine. Start with these simple, luxurious upgrades.",
      category: "Styling Tips",
      date: "Apr 28, 2025",
      author: "Nour El Din",
      authorAvatar: "https://api.shatta.com/storage/3252/pouf-108_L.jpg",
      img: "https://api.shatta.com/storage/3264/pouf-91_L.jpg"
    },
    {
      title: "Earthy Tones: The Color Trend Dominating 2025",
      excerpt: "From terracotta to sage, see how grounding colors are making a massive comeback in modern Egyptian homes.",
      category: "Trends",
      date: "Apr 22, 2025",
      author: "Sara Mansour",
      authorAvatar: "https://api.shatta.com/storage/3205/pouf-219.jpg",
      img: "https://api.shatta.com/storage/3268/pouf-78_L.jpg"
    },
    {
      title: "How to Care for Your Luxury Sateen Bedding",
      excerpt: "Protect your investment with these expert washing, drying, and storage techniques.",
      category: "Guides",
      date: "Apr 15, 2025",
      author: "Laila Hassan",
      authorAvatar: "https://api.shatta.com/storage/3204/pouf-219_L.jpg",
      img: "https://api.shatta.com/storage/3248/pouf-139_L.jpg"
    },
    {
      title: "Bringing the Coast Indoors: Beach House Aesthetics",
      excerpt: "Capture the breezy, relaxed energy of the North Coast in your city apartment.",
      category: "Trends",
      date: "Apr 10, 2025",
      author: "Youssef Amin",
      authorAvatar: "https://api.shatta.com/storage/375/CUSH1_452_L.jpg",
      img: "https://api.shatta.com/storage/265/CUSH1_446.jpg"
    }
  ];

  const filteredArticles = activeCategory === 'All' 
    ? articles 
    : articles.filter(article => article.category === activeCategory);

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

      <main className="max-w-[1440px] mx-auto px-4 md:px-6 lg:px-8 py-8">
        
        {/* Breadcrumb */}
        <div className="flex items-center text-xs font-light tracking-wide text-[#1A1A1A]/50 mb-10">
          <span className="hover:text-[#1A1A1A] cursor-pointer transition-colors">Home</span>
          <ChevronRight className="w-3 h-3 mx-2" />
          <span className="text-[#C4A35A] font-medium">Journal</span>
        </div>

        {/* Page Header */}
        <div className="flex flex-col items-center mb-16 text-center">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="font-serif text-5xl md:text-6xl text-[#1A1A1A] mb-4"
          >
            The Shatta Journal
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="text-[#1A1A1A]/70 max-w-lg mb-10 font-light"
          >
            Inspirations, styling tips, and stories from behind the loom. Cultivate a beautiful home with our expert guides.
          </motion.p>
          
          {/* Category Filter Pill Row */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="flex flex-wrap justify-center gap-3"
          >
            {categories.map((category) => (
              <button
                key={category}
                onClick={() => setActiveCategory(category)}
                className={`px-6 py-2.5 rounded-full text-sm font-medium transition-all duration-300 shadow-sm ${
                  activeCategory === category 
                  ? 'bg-[#C4A35A] text-white border border-[#C4A35A] shadow-[#C4A35A]/20' 
                  : 'bg-white text-[#1A1A1A]/70 border border-[#E8E0D4] hover:border-[#C4A35A] hover:text-[#C4A35A]'
                }`}
              >
                {category}
              </button>
            ))}
          </motion.div>
        </div>

        {/* Featured Article */}
        {(activeCategory === 'All' || activeCategory === featuredArticle.category) && (
          <motion.a 
            href="/preview/shatta-homepage/BlogPost"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="block mb-16 md:mb-24 rounded-[2.5rem] bg-white border border-[#E8E0D4] overflow-hidden shadow-xl shadow-black/5 group cursor-pointer"
          >
            <div className="flex flex-col lg:flex-row">
              <div className="w-full lg:w-3/5 h-[400px] lg:h-[500px] overflow-hidden relative">
                <img 
                  src={featuredArticle.img} 
                  alt={featuredArticle.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[15s] ease-out" 
                />
              </div>
              <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center">
                <div className="inline-block px-4 py-1.5 rounded-full bg-[#E8E0D4]/50 text-[#C4A35A] text-[10px] font-medium tracking-widest w-fit mb-6">
                  {featuredArticle.category.toUpperCase()}
                </div>
                <h2 className="font-serif text-3xl md:text-4xl text-[#1A1A1A] mb-5 leading-snug group-hover:text-[#C4A35A] transition-colors">
                  {featuredArticle.title}
                </h2>
                <p className="text-[#1A1A1A]/70 font-light leading-relaxed mb-8">
                  {featuredArticle.excerpt}
                </p>
                
                <div className="mt-auto pt-8 border-t border-[#E8E0D4] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={featuredArticle.authorAvatar} alt={featuredArticle.author} className="w-10 h-10 rounded-full object-cover border border-[#E8E0D4]" />
                    <div>
                      <div className="text-sm font-medium text-[#1A1A1A]">{featuredArticle.author}</div>
                      <div className="text-xs text-[#1A1A1A]/50">{featuredArticle.date}</div>
                    </div>
                  </div>
                  <div className="w-10 h-10 rounded-full bg-[#E8E0D4]/50 flex items-center justify-center group-hover:bg-[#C4A35A] group-hover:text-white transition-colors duration-300">
                    <ArrowRight className="w-5 h-5" />
                  </div>
                </div>
              </div>
            </div>
          </motion.a>
        )}

        {/* Article Grid */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={staggerContainer}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10 mb-24"
        >
          {filteredArticles.map((article, idx) => (
            <motion.a href="/preview/shatta-homepage/BlogPost" variants={fadeUp} key={idx} className="group cursor-pointer flex flex-col h-full block">
              <div className="relative aspect-[4/3] overflow-hidden bg-[#E8E0D4]/30 rounded-[2rem] mb-6 shadow-sm shadow-black/5">
                <img 
                  src={article.img} 
                  alt={article.title} 
                  className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-[10s] ease-out" 
                />
                <div className="absolute top-4 start-4 bg-white/90 backdrop-blur-md px-4 py-1.5 rounded-full z-10 shadow-sm text-[10px] font-medium text-[#C4A35A] tracking-widest">
                  {article.category.toUpperCase()}
                </div>
              </div>
              <div className="flex flex-col flex-1 px-2">
                <h3 className="font-serif text-2xl text-[#1A1A1A] mb-3 leading-snug group-hover:text-[#C4A35A] transition-colors">
                  {article.title}
                </h3>
                <p className="text-[#1A1A1A]/70 font-light text-sm leading-relaxed mb-6 line-clamp-2">
                  {article.excerpt}
                </p>
                
                <div className="mt-auto pt-5 border-t border-[#E8E0D4] flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <img src={article.authorAvatar} alt={article.author} className="w-8 h-8 rounded-full object-cover" />
                    <div>
                      <div className="text-xs font-medium text-[#1A1A1A]">{article.author}</div>
                      <div className="text-[10px] text-[#1A1A1A]/50">{article.date}</div>
                    </div>
                  </div>
                  <span className="text-[11px] font-medium tracking-widest text-[#1A1A1A]/40 group-hover:text-[#C4A35A] transition-colors">
                    READ MORE
                  </span>
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* Load More Button (Optional showing logic) */}
        {filteredArticles.length > 0 && (
          <div className="flex justify-center mb-24">
            <button className="px-8 py-3.5 bg-white border border-[#E8E0D4] rounded-full text-sm font-medium text-[#1A1A1A] hover:border-[#C4A35A] hover:text-[#C4A35A] shadow-sm hover:shadow-md transition-all duration-300">
              LOAD MORE ARTICLES
            </button>
          </div>
        )}

        {/* Newsletter Signup Band */}
        <motion.section 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="bg-[#E8E0D4] rounded-[3rem] px-6 py-16 md:py-24 text-center shadow-inner relative overflow-hidden"
        >
          {/* Decorative background blur */}
          <div className="absolute top-1/2 start-1/2 rtl:translate-x-0 rtl:-translate-x-reverse -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,_rgba(255,255,255,0.4)_0%,_transparent_70%)] pointer-events-none rounded-full blur-3xl"></div>
          
          <div className="relative z-10 max-w-2xl mx-auto">
            <h2 className="font-serif text-3xl md:text-5xl text-[#1A1A1A] mb-4">Stay Inspired</h2>
            <p className="text-[#1A1A1A]/70 text-base font-light mb-10 max-w-lg mx-auto">
              Subscribe to the Shatta Journal for exclusive home styling tips, new collection previews, and design guides delivered straight to your inbox.
            </p>
            <form className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="flex-1 bg-white border border-white/50 rounded-full px-6 py-4 text-sm text-[#1A1A1A] placeholder:text-[#1A1A1A]/40 focus:outline-none focus:border-[#C4A35A] focus:ring-1 focus:ring-[#C4A35A] transition-all shadow-sm"
              />
              <motion.button 
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="button"
                className="bg-[#C4A35A] hover:bg-[#D4B97A] text-white py-4 px-8 rounded-full text-xs font-medium tracking-[0.1em] transition-colors shadow-lg shadow-[#C4A35A]/20 whitespace-nowrap"
              >
                SUBSCRIBE
              </motion.button>
            </form>
          </div>
        </motion.section>
      </main>

      <Footer />
    </div>
  );
}

export default Blog;
