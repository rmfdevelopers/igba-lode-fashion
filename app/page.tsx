'use client';

import React, { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import { 
  Scissors, 
  ShoppingBag, 
  Users, 
  Heart, 
  Phone, 
  Mail, 
  MapPin, 
  Loader2, 
  ArrowRight, 
  CheckCheck, 
  ImageOff, 
  Menu, 
  X, 
  Sparkles 
} from 'lucide-react';

// DESIGN DECISIONS:
// Layout Energy: editorial
// Depth Treatment: textured
// Divider Style: D-QUOTE
// Typography Personality: editorial

// --- SAFE IMAGE COMPONENT ---
function SafeImage({ src, alt, fill, width, height, className, priority, fallbackClassName }: {
  src: string; alt: string; fill?: boolean; width?: number; height?: number;
  className?: string; priority?: boolean; fallbackClassName?: string;
}) {
  const [error, setError] = useState(false);
  if (error) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-[#4A001F]/80 to-[#C5A880]/20 ${fallbackClassName ?? className ?? ''}`}>
        <ImageOff size={28} className="text-[#C5A880]/40" />
      </div>
    );
  }
  return (
    <Image 
      src={src} 
      alt={alt} 
      fill={fill}
      width={!fill ? (width ?? 800) : undefined}
      height={!fill ? (height ?? 600) : undefined}
      className={className} 
      priority={priority}
      onError={() => setError(true)} 
    />
  );
}

// --- TYPEWRITER HOOK ---
const useTypewriter = (text: string, speed = 65) => {
  const [display, setDisplay] = useState('');
  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      if (i < text.length) { 
        setDisplay(prev => prev + text.charAt(i)); 
        i++; 
      } else {
        clearInterval(timer);
      }
    }, speed);
    return () => clearInterval(timer);
  }, [text, speed]);
  return display;
};

// --- SCROLL REVEAL HOOK ---
const useScrollReveal = (threshold = 0.1) => {
  const ref = useRef<HTMLElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { 
        if (entry.isIntersecting) {
          setIsVisible(true); 
        }
      },
      { threshold }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, [threshold]);
  return { ref, isVisible };
};

export default function Home() {
  // Brand Content
  const brand = {
    name: "Igba Lode Fashion",
    tagline: "Everyday Luxury for the Classy Woman",
    description: "Premium, stylish ready-to-wear fashion and wholesale collections curated in Lagos for contemporary women who command grace and elegance.",
    industry: "fashion",
    region: "nigeria",
    currency: "₦"
  };

  const navLinks = [
    { name: "Home", href: "#home" },
    { name: "About", href: "#about" },
    { name: "Process", href: "#process" },
    { name: "Collection", href: "#products" },
    { name: "Contact", href: "#contact" }
  ];

  const features = [
    { 
      title: "Bespoke Finishing", 
      description: "Meticulously finished seams and hems crafted to international luxury standards.", 
      icon: Scissors 
    },
    { 
      title: "Everyday Silhouette", 
      description: "Designed for maximum elegance without compromising on real-world comfort and movement.", 
      icon: Sparkles 
    },
    { 
      title: "Bespoke Wholesale", 
      description: "Scalable production packages tailored specifically for global and local boutique owners.", 
      icon: ShoppingBag 
    }
  ];

  const products = [
    {
      name: "The Feyintola Silk Boubou",
      description: "An exquisite silk boubou flowing with effortless grace and intricate neckline detailing.",
      price: "₦55,000",
      image: "https://images.unsplash.com/photo-1733322987267-f691d5be2bc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwyfHxtaW5pbWFsaXN0JTIwbHV4dXJ5JTIwZmFzaGlvbiUyMGJvdXRpcXVlJTIwZGlzcGxheSUyMExhZ29zfGVufDF8MHx8fDE3ODIzMDIwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Everyday Luxury Kaftan",
      description: "Tailored perfection designed for premium comfort and unmatched daytime elegance.",
      price: "₦35,000",
      image: "https://images.unsplash.com/photo-1610951561645-2977be45df4f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHxlbGVnYW50JTIwd29tZW4lMjBtb2Rlcm4lMjBrYWZ0YW4lMjBkcmVzcyUyMHN0dWRpb3xlbnwxfDB8fHwxNzgyMzAyMDg4fDA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Aso-Oke Fusion Coord Set",
      description: "A sophisticated combination of modern silhouettes and heritage hand-woven structural accents.",
      price: "₦85,000",
      image: "https://images.unsplash.com/photo-1733322987002-2d20ff6a527a?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxtaW5pbWFsaXN0JTIwbHV4dXJ5JTIwZmFzaGlvbiUyMGJvdXRpcXVlJTIwZGlzcGxheSUyMExhZ29zfGVufDF8MHx8fDE3ODIzMDIwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
    },
    {
      name: "Premium Wholesale Starter Bundle",
      description: "Curated package of 10 hot-selling ready-to-wear pieces for boutique partners.",
      price: "₦250,000",
      image: "https://images.unsplash.com/photo-1701119527218-ceed8ec844e4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxzdGFjayUyMG9mJTIwY29sb3JmdWwlMjBsdXh1cnklMjBib3V0aXF1ZSUyMHJlYWR5JTIwdG8lMjB3ZWFyJTIwZHJlc3Nlc3xlbnwxfDB8fHwxNzgyMzAyMDg5fDA&ixlib=rb-4.1.0&q=80&w=1080"
    }
  ];

  const steps = [
    { step: "01", name: "Curation", detail: "Careful selection of high-grade silks and handwoven accents." },
    { step: "02", name: "Precision Tailoring", detail: "Perfecting drape and fit under Folashade's direct supervision." },
    { step: "03", name: "Delivery", detail: "Express worldwide dispatch directly from our Lagos headquarters." }
  ];

  const testimonials = [
    { name: "Yetunde Adebayo", text: "The silk boubou feels like a dream. Unbelievable luxury feel at prices that make retail buying so practical!", role: "Lagos Entrepreneur" },
    { name: "Chioma Nze", text: "Folashade's taste is incredible. My boutique's wholesale orders sell out within a week of arriving.", role: "Boutique Owner, Port Harcourt" },
    { name: "Amina Bello", text: "Absolutely beautiful finishings. You can feel the standard of care and premium African heritage in every stitch.", role: "Connoisseur" }
  ];

  const contact = {
    whatsapp: "https://wa.me/2348149162662",
    instagram: "https://instagram.com/igba_lodefashion",
    email: "contact@igbalodefashion.com",
    address: "Lagos boutique Showroom, Lagos, Nigeria"
  };

  // State Management
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [form, setForm] = useState({ name: '', email: '', phone: '', message: '' });
  const [sent, setSent] = useState(false);
  const [loading, setLoading] = useState(false);

  // Typewriter effect execution for Hero title
  const typedText = useTypewriter("Elegance woven into every thread", 55);

  // Scroll detection
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Universal form logic
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => { 
      setLoading(false); 
      setSent(true); 
    }, 1500);
  };

  // Section visibility configurations
  const featuresReveal = useScrollReveal(0.15);
  const aboutReveal = useScrollReveal(0.15);
  const processReveal = useScrollReveal(0.15);
  const productsReveal = useScrollReveal(0.1);
  const testimonialsReveal = useScrollReveal(0.15);
  const contactReveal = useScrollReveal(0.15);

  return (
    <div className="relative min-h-screen selection:bg-[#C5A880] selection:text-[#4A001F]">
      
      {/* --- HEADER --- */}
      <header className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled ? 'bg-[#4A001F]/95 backdrop-blur-xl border-b border-[#C5A880]/15 shadow-xl py-4' : 'bg-transparent py-6'
      }`}>
        <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
          
          {/* Logo System (L1 Styled Initial Box / Brand Monogram) */}
          <a href="#home" className="flex items-center gap-3 group">
            <div className="w-10 h-10 border-2 border-[#C5A880] flex items-center justify-center bg-[#4A001F] transition-all duration-300 group-hover:scale-105">
              <span className="font-heading font-black text-lg text-[#C5A880] tracking-wider">IL</span>
            </div>
            <span className="font-heading font-bold text-xl text-[#FAF5F5] uppercase tracking-[0.2em] group-hover:text-[#C5A880] transition-colors">
              Igba Lode
            </span>
          </a>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-10">
            {navLinks.map((link) => (
              <a 
                key={link.name} 
                href={link.href} 
                className="font-sans text-xs uppercase tracking-[0.25em] text-[#FAF5F5]/70 hover:text-[#C5A880] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Nav CTA */}
          <div className="hidden md:block">
            <a 
              href="#products" 
              className="bg-[#C5A880] text-[#4A001F] font-bold text-xs uppercase tracking-widest px-6 py-3 rounded-full hover:bg-[#FAF5F5] hover:scale-105 transition-all duration-300"
            >
              Order Now
            </a>
          </div>

          {/* Mobile Hamburguer */}
          <button 
            onClick={() => setMobileMenuOpen(true)}
            className="md:hidden text-[#FAF5F5] hover:text-[#C5A880] transition-colors"
          >
            <Menu size={24} />
          </button>
        </div>
      </header>

      {/* --- MOBILE SIDEBAR --- */}
      <div className={`fixed inset-0 z-50 transition-all duration-500 ease-in-out ${
        mobileMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
      }`}>
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setMobileMenuOpen(false)} />
        <div className={`absolute right-0 top-0 h-full w-[80%] max-w-sm bg-[#4A001F] p-8 border-l border-[#C5A880]/20 flex flex-col justify-between transition-transform duration-500 ${
          mobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}>
          <div>
            <div className="flex items-center justify-between mb-12">
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center">
                  <span className="font-heading font-black text-[#C5A880] text-sm">IL</span>
                </div>
                <span className="font-heading font-black text-[#FAF5F5] tracking-widest uppercase text-sm">Igba Lode</span>
              </div>
              <button onClick={() => setMobileMenuOpen(false)} className="text-[#FAF5F5] hover:text-[#C5A880]">
                <X size={24} />
              </button>
            </div>
            
            <nav className="flex flex-col gap-6">
              {navLinks.map((link) => (
                <a 
                  key={link.name} 
                  href={link.href} 
                  onClick={() => setMobileMenuOpen(false)}
                  className="font-heading text-2xl font-bold text-[#FAF5F5] hover:text-[#C5A880] transition-colors"
                >
                  {link.name}
                </a>
              ))}
            </nav>
          </div>

          <div className="space-y-6">
            <a 
              href="#products" 
              onClick={() => setMobileMenuOpen(false)}
              className="block text-center bg-[#C5A880] text-[#4A001F] font-bold py-3.5 rounded-full uppercase tracking-wider text-sm hover:brightness-110"
            >
              Explore Collection
            </a>
            <p className="text-xs text-[#FAF5F5]/40 text-center">Sharp delivery, nationwide.</p>
          </div>
        </div>
      </div>

      {/* --- HERO SECTION (HR-D: Oversized typewriter + raw minimal) --- */}
      <section id="home" className="min-h-screen flex flex-col justify-center bg-[#4A001F] px-6 overflow-hidden relative pt-24">
        
        {/* Dynamic Texture */}
        <div className="absolute inset-0 opacity-15 grayscale mix-blend-overlay pointer-events-none">
          <SafeImage 
            src="https://images.unsplash.com/photo-1767049603596-79204ada5273?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHwxfHxoaWdoJTIwZmFzaGlvbiUyMGVkaXRvcmlhbCUyMHBvcnRyYWl0JTIwZWxlZ2FudCUyMGJsYWNrJTIwd29tYW58ZW58MXwwfHx8MTc4MjMwMjA4Nnww&ixlib=rb-4.1.0&q=80&w=1080" 
            alt="High Fashion Portrait" 
            fill 
            className="object-cover" 
          />
        </div>
        
        {/* Fine horizontal line layout decor */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10" />

        <div className="relative z-10 max-w-6xl mx-auto w-full pt-12">
          
          <div className="w-fit mb-4 border border-[#C5A880]/30 px-3 py-1 bg-black/10">
            <span className="font-sans text-[10px] uppercase tracking-[0.4em] text-[#C5A880]">Lagos Editorial</span>
          </div>

          <h1 className="font-heading text-[11vw] md:text-[6.5vw] font-black text-[#FAF5F5] leading-none tracking-tighter uppercase italic">
            {typedText}<span className="text-[#C5A880] animate-pulse">_</span>
          </h1>

          <div className="mt-12 flex flex-col md:flex-row items-start md:items-end justify-between gap-12 border-t border-[#C5A880]/20 pt-10">
            <p className="text-[#FAF5F5]/60 text-lg max-w-md leading-relaxed">
              {brand.description}
            </p>
            <div className="flex flex-col sm:flex-row gap-4 w-full md:w-auto">
              <a 
                href="#products" 
                className="bg-[#C5A880] text-[#4A001F] px-10 py-4 font-black text-center text-sm uppercase tracking-wider
                  shadow-[6px_6px_0px_rgba(250,245,245,0.1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[3px_3px_0px_rgba(250,245,245,0.1)] transition-all duration-200"
              >
                Explore Collection
              </a>
              <a 
                href="#about" 
                className="border border-[#C5A880]/40 text-[#C5A880] px-8 py-4 font-bold text-center text-sm uppercase tracking-wider hover:bg-[#C5A880]/10 transition-all"
              >
                Our Story
              </a>
            </div>
          </div>
        </div>

        {/* Floating elements indicating editorial layout */}
        <div className="absolute right-10 top-20 w-32 h-32 border border-[#C5A880]/10 rounded-full animate-float hidden lg:block" />
      </section>

      {/* --- SECTION DIVIDER: D-QUOTE --- */}
      <div className="py-20 px-8 text-center bg-[#FAF5F5]/3 border-y border-[#C5A880]/15 relative overflow-hidden">
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,var(--accent)/5,transparent_70%)]" />
        <p className="relative font-heading text-2xl md:text-4xl font-black text-[#FAF5F5] max-w-4xl mx-auto leading-tight italic">
          &ldquo;Everyday Luxury for the Classy Woman&rdquo;
        </p>
        <p className="relative text-[#C5A880] mt-4 text-[10px] tracking-[0.5em] uppercase">Igba Lode Fashion</p>
      </div>

      {/* --- FEATURES SECTION (F-BENTO: Asymmetric bento grid) --- */}
      <section 
        id="features" 
        ref={featuresReveal.ref}
        className="py-28 px-6 bg-[#FAF5F5] text-[#4A001F]"
      >
        <div className="max-w-6xl mx-auto">
          <div className="mb-14">
            <span className="text-[#C5A880] font-sans text-xs uppercase tracking-[0.4em] font-bold">Why Igba Lode?</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#4A001F]">The hallmarks of contemporary African luxury</h2>
          </div>

          <div className={`grid grid-cols-1 md:grid-cols-3 gap-6 transition-all duration-1000 ${
            featuresReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
          }`}>
            
            {/* Bento Big Block */}
            <div className="md:col-span-2 bg-[#4A001F] text-[#FAF5F5] rounded-3xl p-8 border border-[#C5A880]/20 hover:border-[#C5A880]/40 transition-all duration-500 flex flex-col justify-between group min-h-[300px] relative overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/10 rounded-full blur-[80px]" />
              
              <div className="w-14 h-14 rounded-2xl bg-[#C5A880]/20 flex items-center justify-center group-hover:scale-110 transition-transform duration-300 relative z-10 border border-[#C5A880]/30">
                <Scissors className="text-[#C5A880]" size={28} />
              </div>
              
              <div className="relative z-10 mt-12">
                <h3 className="font-heading text-3xl font-black text-[#FAF5F5]">{features[0].title}</h3>
                <p className="text-[#FAF5F5]/70 mt-3 max-w-xl text-base">{features[0].description}</p>
              </div>
            </div>

            {/* Bento Small Block 1 */}
            <div className="bg-[#FAF5F5] rounded-3xl p-8 border-2 border-[#4A001F]/10 hover:border-[#C5A880] transition-all duration-300 flex flex-col justify-between min-h-[300px]">
              <div className="w-12 h-12 rounded-xl bg-[#4A001F]/5 flex items-center justify-center border border-[#4A001F]/10">
                <Sparkles className="text-[#4A001F]" size={24} />
              </div>
              <div>
                <h3 className="font-heading text-2xl font-bold text-[#4A001F]">{features[1].title}</h3>
                <p className="text-[#4A001F]/75 text-sm mt-3 leading-relaxed">{features[1].description}</p>
              </div>
            </div>

            {/* Bento Small Block 2 */}
            <div className="md:col-span-3 bg-[#C5A880]/15 rounded-3xl p-8 border border-[#C5A880]/30 hover:bg-[#C5A880]/20 transition-all duration-300 flex flex-col md:flex-row justify-between items-start md:items-center gap-6">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-xl bg-[#C5A880]/20 flex items-center justify-center border border-[#C5A880]/40 shrink-0">
                  <ShoppingBag className="text-[#4A001F]" size={24} />
                </div>
                <div>
                  <h3 className="font-heading text-2xl font-bold text-[#4A001F]">{features[2].title}</h3>
                  <p className="text-[#4A001F]/70 text-sm mt-1">{features[2].description}</p>
                </div>
              </div>
              <a href="#contact" className="bg-[#4A001F] text-[#FAF5F5] px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider hover:bg-[#C5A880] hover:text-[#4A001F] transition-all self-end md:self-auto shrink-0">
                Inquire Wholesale
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* --- ABOUT SECTION (Split Layout with Stats Counter) --- */}
      <section 
        id="about" 
        ref={aboutReveal.ref}
        className="py-28 px-6 bg-[#4A001F] text-[#FAF5F5] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-[1fr_1.1fr] gap-16 items-center">
            
            {/* Left Column: Visual Stack */}
            <div className={`relative transition-all duration-1000 ${
              aboutReveal.isVisible ? 'opacity-100 -translate-x-0' : 'opacity-0 -translate-x-12'
            }`}>
              <div className="aspect-[4/5] relative rounded-[2rem] overflow-hidden border border-[#C5A880]/30 shadow-2xl z-10">
                <SafeImage 
                  src="https://images.unsplash.com/photo-1751276651319-d311a9d0b8af?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w4ODY1NzJ8MHwxfHNlYXJjaHw0fHxtaW5pbWFsaXN0JTIwbHV4dXJ5JTIwZmFzaGlvbiUyMGJvdXRpcXVlJTIwZGlzcGxheSUyMExhZ29zfGVufDF8MHx8fDE3ODIzMDIwODZ8MA&ixlib=rb-4.1.0&q=80&w=1080" 
                  alt="Founder showcase" 
                  fill 
                  className="object-cover" 
                />
              </div>
              <div className="absolute -bottom-6 -left-6 w-1/2 h-1/2 bg-[#C5A880]/10 rounded-[2rem] -z-10 blur-xl" />
              <div className="absolute -top-6 -right-6 w-1/2 h-1/2 bg-[#C5A880]/15 rounded-[2rem] -z-10 blur-2xl" />
            </div>

            {/* Right Column: Editorial Bio & Stats */}
            <div className={`transition-all duration-1000 delay-300 ${
              aboutReveal.isVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'
            }`}>
              <span className="text-[#C5A880] font-sans text-xs uppercase tracking-[0.4em]">The Creative Mind</span>
              <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-2 mb-6">Folashade's Legacy</h2>
              
              <p className="text-[#FAF5F5]/70 text-lg leading-relaxed mb-8">
                Founded by designer Oloruntogbe Folashade Feyintola, Igba Lode Fashion was born out of a desire to provide classy women with high-quality, effortless outfits. From retail statements to premium wholesale bundles, each piece tells a story of cultural legacy blended with modern fashion-forward silhouettes.
              </p>

              {/* Stats Grid */}
              <div className="grid grid-cols-3 gap-4 border-t border-[#C5A880]/20 pt-8 mt-10">
                {[
                  { number: "23k+", label: "Global Followers", icon: Users },
                  { number: "100%", label: "Ethical Sourcing", icon: Heart },
                  { number: "1500+", label: "Women Empowered", icon: Sparkles }
                ].map((stat, i) => (
                  <div key={i} className="text-left">
                    <div className="text-[#C5A880] mb-1">
                      <stat.icon size={18} />
                    </div>
                    <p className="font-heading text-2xl md:text-3xl font-black text-[#FAF5F5]">{stat.number}</p>
                    <p className="text-[#FAF5F5]/40 text-[10px] uppercase tracking-wider mt-1">{stat.label}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* --- PROCESS SECTION (Custom tailored timeline representing design process) --- */}
      <section 
        id="process" 
        ref={processReveal.ref}
        className="py-28 px-6 bg-[#FAF5F5] text-[#4A001F] border-t border-[#C5A880]/15"
      >
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-[#C5A880] font-sans text-xs uppercase tracking-[0.4em] font-bold">The Making of Luxury</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#4A001F]">Founder Folashade's Tailored Process</h2>
          </div>

          <div className="relative">
            {/* Timeline Line Decor */}
            <div className="absolute left-6 md:left-1/2 top-0 bottom-0 w-px bg-gradient-to-b from-[#4A001F]/40 via-[#C5A880] to-transparent" />

            <div className="space-y-16">
              {steps.map((step, i) => (
                <div 
                  key={i} 
                  className={`flex flex-col md:flex-row gap-8 items-start relative transition-all duration-700 ${
                    processReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-8'
                  }`}
                  style={{ transitionDelay: `${i * 150}ms` }}
                >
                  {/* Step Bubble */}
                  <div className="w-12 h-12 rounded-full bg-[#4A001F] text-[#FAF5F5] border border-[#C5A880]/40 flex items-center justify-center shrink-0 relative z-10 md:absolute md:left-1/2 md:-ml-6 shadow-xl">
                    <span className="font-sans font-black text-xs text-[#C5A880]">
                      {step.step}
                    </span>
                  </div>

                  {/* Left Side Content (Alternating layout on desktop) */}
                  <div className={`flex-1 md:w-1/2 ${i % 2 === 0 ? 'md:text-right md:pr-14' : 'md:order-last md:pl-14'}`}>
                    <h3 className="font-heading text-2xl font-bold text-[#4A001F]">{step.name}</h3>
                    <p className="text-[#4A001F]/60 mt-2 text-base leading-relaxed">{step.detail}</p>
                  </div>

                  {/* Spacer for empty space on the opposite side on desktop */}
                  <div className="hidden md:block flex-1 md:w-1/2" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* --- PRODUCTS SECTION (P-STAGGER: Alternating editorial rows) --- */}
      <section 
        id="products" 
        ref={productsReveal.ref}
        className="py-28 px-6 bg-[#4A001F] overflow-hidden"
      >
        <div className="max-w-6xl mx-auto space-y-32">
          
          <div className="text-center max-w-2xl mx-auto">
            <span className="text-[#C5A880] font-sans text-xs uppercase tracking-[0.4em]">The Signature Collection</span>
            <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-2">Timeless, effortless designs</h2>
            <p className="text-[#FAF5F5]/50 mt-4">Sharp delivery, nationwide. Explore modern West African statements crafted from premium materials.</p>
          </div>

          {products.map((p, i) => (
            <div 
              key={i} 
              className={`flex flex-col ${i % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-12 md:gap-20 transition-all duration-1000 ${
                productsReveal.isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-12'
              }`}
            >
              {/* Product Image Panel */}
              <div className="w-full md:w-1/2 relative">
                <div className="aspect-[4/5] relative rounded-[2.5rem] overflow-hidden shadow-2xl group border border-[#C5A880]/15">
                  <SafeImage 
                    src={p.image} 
                    alt={p.name} 
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700" 
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                </div>
                {/* Visual Accent Layer */}
                <div className={`absolute -bottom-6 ${i % 2 === 0 ? '-right-6' : '-left-6'} w-1/2 h-1/2 bg-[#C5A880]/5 rounded-[2.5rem] -z-10 blur-2xl`} />
              </div>

              {/* Product Content Panel */}
              <div className={`w-full md:w-1/2 ${i % 2 === 0 ? 'text-left' : 'md:text-right'}`}>
                <span className="font-sans text-[#C5A880] text-xs font-bold tracking-[0.25em] uppercase mb-4 block">
                  Signature piece 0{i + 1}
                </span>
                <h3 className="font-heading text-3xl md:text-4xl font-black text-[#FAF5F5] leading-tight">{p.name}</h3>
                <p className="text-[#FAF5F5]/65 mt-5 text-lg leading-relaxed">{p.description}</p>
                
                <div className={`mt-8 flex flex-col gap-6 ${i % 2 === 0 ? 'items-start' : 'md:items-end'}`}>
                  <span className="text-3xl font-heading font-black text-[#C5A880]">{p.price}</span>
                  <a 
                    href="#contact" 
                    className="inline-flex items-center gap-3 bg-[#C5A880] text-[#4A001F] px-8 py-3.5 rounded-full font-black text-sm uppercase tracking-wider hover:bg-[#FAF5F5] transition-all"
                  >
                    Order Now <ArrowRight size={16} />
                  </a>
                </div>
              </div>
            </div>
          ))}

        </div>
      </section>

      {/* --- TESTIMONIALS (T-SLIDER: Auto-scroll horizontal strip) --- */}
      <section 
        id="testimonials" 
        ref={testimonialsReveal.ref}
        className="py-28 bg-[#FAF5F5] text-[#4A001F] overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-6 mb-14">
          <span className="text-[#C5A880] font-sans text-xs uppercase tracking-[0.4em] font-bold">What the Classy Say</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-2 text-[#4A001F]">Global Praises</h2>
        </div>

        <div className="w-full overflow-hidden">
          <div className="flex w-[200%] gap-6 animate-slide-left hover:[animation-play-state:paused]">
            {[...testimonials, ...testimonials].map((t, i) => (
              <div 
                key={i} 
                className="w-80 md:w-[380px] shrink-0 bg-[#4A001F] text-[#FAF5F5] border border-[#C5A880]/20 rounded-3xl p-8 shadow-xl"
              >
                <div className="flex gap-1.5 mb-5">
                  {[1, 2, 3, 4, 5].map(n => (
                    <div key={n} className="w-2 h-2 rounded-full bg-[#C5A880]" />
                  ))}
                </div>
                
                <p className="text-[#FAF5F5]/80 leading-relaxed italic mb-8 min-h-[100px]">
                  &ldquo;{t.text}&rdquo;
                </p>

                <div className="flex items-center gap-4 border-t border-[#C5A880]/15 pt-5">
                  <div className="w-10 h-10 rounded-full bg-[#C5A880]/20 flex items-center justify-center text-[#C5A880] font-bold text-sm border border-[#C5A880]/30 shrink-0">
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-heading font-bold text-[#FAF5F5] text-sm leading-none">{t.name}</p>
                    <p className="text-[#C5A880] text-xs mt-1.5 font-sans tracking-wide">{t.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* --- CONTACT SECTION (C3: Minimal Centered Layout) --- */}
      <section 
        id="contact" 
        ref={contactReveal.ref}
        className="py-28 px-6 bg-[#4A001F] border-t border-[#C5A880]/15"
      >
        <div className="max-w-2xl mx-auto text-center">
          <span className="text-[#C5A880] font-sans text-xs uppercase tracking-[0.4em]">Step Into Everyday Luxury</span>
          <h2 className="font-heading text-4xl md:text-5xl font-black tracking-tight mt-2 mb-4">Request Custom Styling</h2>
          <p className="text-[#FAF5F5]/60 mb-12 text-base max-w-md mx-auto">
            Ready to order your bespoke sizing or premium boutique wholesale bundles? Send Folashade's studio team a direct message below.
          </p>

          <div className="text-left">
            {sent ? (
              <div className="flex flex-col items-center justify-center p-12 text-center animate-scaleIn bg-[#3a0018] rounded-3xl border border-[#C5A880]/20 shadow-2xl relative overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-[#C5A880]/10 to-transparent opacity-50" />
                <div className="w-20 h-20 rounded-full bg-[#C5A880]/20 flex items-center justify-center mb-6 border border-[#C5A880]/40 relative z-10">
                  <CheckCheck size={32} className="text-[#C5A880]" />
                </div>
                <h3 className="font-heading text-2xl font-black text-[#FAF5F5] mb-2 relative z-10">Message Received</h3>
                <p className="text-[#FAF5F5]/60 max-w-sm text-sm relative z-10">Our studio concierge will respond with pricing, custom drapes, and wholesale schedules shortly.</p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4 bg-[#3a0018]/50 p-8 sm:p-10 rounded-[2rem] border border-[#C5A880]/15 shadow-2xl relative overflow-hidden">
                <div className="absolute top-0 right-0 w-64 h-64 bg-[#C5A880]/5 blur-[80px] rounded-full pointer-events-none" />
                
                <div className="relative z-10 space-y-4">
                  {(['name', 'email', 'phone'] as const).map(field => (
                    <div key={field} className="relative">
                      <input
                        type={field === 'email' ? 'email' : 'text'}
                        placeholder={field.charAt(0).toUpperCase() + field.slice(1) + (field !== 'phone' ? ' *' : '')}
                        value={form[field]}
                        onChange={e => setForm(prev => ({ ...prev, [field]: e.target.value }))}
                        required={field !== 'phone'}
                        className="w-full bg-[#4A001F]/40 border border-[#C5A880]/20 rounded-xl px-5 py-4 text-[#FAF5F5] placeholder-[#FAF5F5]/40 text-sm outline-none transition-all duration-300 focus:bg-[#4A001F]/70 focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                      />
                    </div>
                  ))}
                  <div className="relative">
                    <textarea 
                      rows={4} 
                      placeholder="Your inquiry details (Wholesale or custom sizing requirement)... *"
                      value={form.message}
                      onChange={e => setForm(prev => ({ ...prev, message: e.target.value }))}
                      required
                      className="w-full bg-[#4A001F]/40 border border-[#C5A880]/20 rounded-xl px-5 py-4 text-[#FAF5F5] placeholder-[#FAF5F5]/40 text-sm outline-none resize-none transition-all duration-300 focus:bg-[#4A001F]/70 focus:border-[#C5A880] focus:ring-1 focus:ring-[#C5A880]"
                    />
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading}
                  className="w-full mt-8 bg-[#C5A880] text-[#4A001F] py-4 rounded-xl font-bold text-sm uppercase tracking-widest hover:brightness-110 transition-all duration-300 disabled:opacity-60 flex justify-center items-center gap-3"
                >
                  {loading ? (
                    <span className="flex items-center gap-2">
                      <Loader2 className="animate-spin" size={18} /> Processing Request...
                    </span>
                  ) : (
                    <>
                      Send Inquiry <ArrowRight size={16} />
                    </>
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </section>

      {/* --- FOOTER (F1 Layout) --- */}
      <footer className="bg-[#3a0018] text-[#FAF5F5] border-t border-[#C5A880]/15 py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            
            {/* Col 1: Brand Info */}
            <div className="space-y-4 md:col-span-2">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 border border-[#C5A880] flex items-center justify-center">
                  <span className="font-heading font-black text-[#C5A880] text-sm">IL</span>
                </div>
                <span className="font-heading font-bold text-lg tracking-widest uppercase">Igba Lode</span>
              </div>
              <p className="text-[#FAF5F5]/50 text-sm leading-relaxed max-w-sm">
                Everyday luxury curated by Oloruntogbe Folashade Feyintola. Timeless silhouettes designed with cultural pride and modern grace.
              </p>
              <p className="text-xs text-[#C5A880] font-sans tracking-widest uppercase pt-2">Lagos, Nigeria</p>
            </div>

            {/* Col 2: Navigation Links */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-[#C5A880] mb-4">Explore</h4>
              <ul className="space-y-2.5">
                {navLinks.map((link) => (
                  <li key={link.name}>
                    <a href={link.href} className="text-[#FAF5F5]/60 hover:text-[#C5A880] text-xs tracking-wider transition-colors">
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Col 3: Direct Connects */}
            <div>
              <h4 className="font-heading font-bold text-sm uppercase tracking-widest text-[#C5A880] mb-4">Studio Connect</h4>
              <ul className="space-y-3">
                {contact.whatsapp && (
                  <li>
                    <a 
                      href={contact.whatsapp} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-xs text-[#FAF5F5]/60 hover:text-[#C5A880] transition-colors"
                    >
                      <Phone size={14} /> WhatsApp Concierge
                    </a>
                  </li>
                )}
                {contact.instagram && (
                  <li>
                    <a 
                      href={contact.instagram} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="flex items-center gap-2 text-xs text-[#FAF5F5]/60 hover:text-[#C5A880] transition-colors"
                    >
                      Instagram Studio
                    </a>
                  </li>
                )}
                <li>
                  <span className="text-xs text-[#FAF5F5]/40 block pt-1">
                    Sharp delivery, nationwide.
                  </span>
                </li>
              </ul>
            </div>

          </div>

          <div className="border-t border-[#C5A880]/10 mt-16 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-[#FAF5F5]/40 text-[10px] uppercase tracking-widest text-center sm:text-left">
              &copy; {new Date().getFullYear()} Igba Lode Fashion. All Rights Reserved.
            </p>
            <p className="text-[#FAF5F5]/30 text-[10px] uppercase tracking-widest">
              Lagos Contemporary Heritage
            </p>
          </div>
        </div>
      </footer>

    </div>
  );
}