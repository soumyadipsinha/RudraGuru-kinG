import { Link, useLocation, useNavigate } from "react-router-dom";
import { products as catalog } from "../lib/products";
import { useEffect, useRef, useState } from "react";
import { MessageSquare, PhoneCall, ShoppingBag, Sparkles, Gem, ShieldCheck, Stars, ArrowRight, ArrowLeft, Video, Clock3, FileText, Star } from "lucide-react";
import { ASTROLOGERS } from "../data/astrologers";
// Images are served from Vite public folder

// Shared gradient heading classes
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";


interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

// helper: zodiac signs
const ZODIAC = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces",
];

// Map zodiac names to public assets (handles two filenames with typos in assets)
const ZODIAC_SVG_MAP: Record<string, string> = {
  Aries: "/assets/areies.svg", // asset filename: areies.svg
  Taurus: "/assets/tauras.svg", // asset filename: tauras.svg
  Gemini: "/assets/gemini.svg",
  Cancer: "/assets/cancer.svg",
  Leo: "/assets/leo.svg",
  Virgo: "/assets/virgo.svg",
  Libra: "/assets/libra.svg",
  Scorpio: "/assets/scorpio.svg",
  Sagittarius: "/assets/sagittarius.svg",
  Capricorn: "/assets/capricorn.svg",
  Aquarius: "/assets/aquarius.svg",
  Pisces: "/assets/pisces.svg",
};

const getZodiacAsset = (sign: string) => ZODIAC_SVG_MAP[sign] || `/assets/${sign.toLowerCase()}.svg`;

// Perfect Banner Carousel Component
const BannerCarousel = () => {
  const [currentBanner, setCurrentBanner] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  
  const banners = [
    { src: "/assets/banner1.jpg", alt: "Banner 1" },
    { src: "/assets/banner2.jpg", alt: "Banner 2" }
  ];

  const nextBanner = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentBanner((prev) => (prev + 1) % banners.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const prevBanner = () => {
    if (isTransitioning) return;
    setIsTransitioning(true);
    setCurrentBanner((prev) => (prev - 1 + banners.length) % banners.length);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  const goToBanner = (index: number) => {
    if (isTransitioning || index === currentBanner) return;
    setIsTransitioning(true);
    setCurrentBanner(index);
    setTimeout(() => setIsTransitioning(false), 500);
  };

  // Auto-advance banners every 4 seconds (only when not hovered)
  useEffect(() => {
    if (isHovered) return;
    
    const interval = setInterval(() => {
      nextBanner();
    }, 4000);
    
    return () => clearInterval(interval);
  }, [isHovered, isTransitioning]);

  return (
    <div 
      className="relative w-full overflow-hidden shadow-2xl group"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Banner Container */}
      <div className="relative w-full h-96 md:h-[30rem] lg:h-[34rem]">
        {banners.map((banner, index) => (
          <div
            key={index}
            className={`absolute inset-0 w-full h-full transition-all duration-500 ease-in-out ${
              index === currentBanner 
                ? 'opacity-100 scale-100' 
                : 'opacity-0 scale-105'
            }`}
          >
            <img 
              src={banner.src} 
              alt={banner.alt} 
              className="w-full h-full object-cover object-center"
            />
            {/* Overlay for better text readability */}
            <div className="absolute inset-0 bg-black/20"></div>
          </div>
        ))}
      </div>
      
      {/* Manual Controls */}
      <button
        aria-label="Previous banner"
        onClick={prevBanner}
        disabled={isTransitioning}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowLeft className="w-6 h-6 text-gray-700" />
      </button>
      
      <button
        aria-label="Next banner"
        onClick={nextBanner}
        disabled={isTransitioning}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 h-12 w-12 bg-white/90 hover:bg-white rounded-full flex items-center justify-center shadow-lg transition-all duration-300 hover:scale-110 opacity-0 group-hover:opacity-100 disabled:opacity-50 disabled:cursor-not-allowed"
      >
        <ArrowRight className="w-6 h-6 text-gray-700" />
      </button>

      {/* Banner Indicators */}
      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-3 z-20">
        {banners.map((_, index) => (
          <button
            key={index}
            onClick={() => goToBanner(index)}
            disabled={isTransitioning}
            className={`w-3 h-3 rounded-full transition-all duration-300 hover:scale-125 disabled:cursor-not-allowed ${
              index === currentBanner 
                ? 'bg-white shadow-lg scale-125' 
                : 'bg-white/60 hover:bg-white/80'
            }`}
            aria-label={`Go to banner ${index + 1}`}
          />
        ))}
      </div>

    </div>
  );
};

export default function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const gemstonesRef = useRef<HTMLDivElement>(null);
  const rudrakshaRef = useRef<HTMLDivElement>(null);
  const braceletsRef = useRef<HTMLDivElement>(null);
  const [previewItem, setPreviewItem] = useState<{ name: string; image: string } | null>(null);
  
  // Resolve a catalog product id for a given preview item name
  const resolveProductId = (name: string | undefined | null) => {
    if (!name) return undefined;
    const n = name.toLowerCase();
    // Common keyword mappings from Home preview names → product names
    const keyword =
      n.includes('yellow sapphire') ? 'yellow sapphire' :
      n.includes('blue sapphire') ? 'blue sapphire' :
      n.includes('ruby') ? 'ruby' :
      n.includes("emerald") ? 'emerald' :
      n.includes('red coral') ? 'red coral' :
      n.includes("hessonite") ? 'hessonite' :
      n.includes("cat's eye") || n.includes('cat eye') ? "cat's eye" :
      n.includes('opal') ? 'opal' :
      n.includes('5 mukhi') ? '5 mukhi' :
      n.includes('7 chakra') ? '7 chakra' :
      n.includes('lava') ? 'lava' :
      n.includes('agate') ? 'agate' :
      n.includes('obsidian') ? 'obsidian' :
      n.includes('turquoise') ? 'turquoise' :
      n.includes('opalite') ? 'opalite' :
      undefined;

    if (!keyword) return undefined;
    const match = catalog.find(p => p.name.toLowerCase().includes(keyword));
    return match?.id;
  };

  const renderStars = (rating: number, idSeed: string) => {
    const fullStars = Math.floor(rating);
    const hasHalf = rating - fullStars >= 0.5;
    const total = 5;
    const emptyStars = total - fullStars - (hasHalf ? 1 : 0);
    const clipId = `starClip-${idSeed}`;

    const StarSVG = (
      <svg viewBox="0 0 24 24" width="16" height="16" className="inline-block">
        <path fill="currentColor" d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" />
      </svg>
    );

    const FullStar = () => (
      <span className="text-yellow-500" aria-hidden>
        {StarSVG}
      </span>
    );

    const EmptyStar = () => (
      <span className="text-yellow-300" aria-hidden>
        {StarSVG}
      </span>
    );

    const HalfStar = () => (
      <span className="relative inline-block" aria-hidden>
        <svg viewBox="0 0 24 24" width="16" height="16" className="block">
          <defs>
            <clipPath id={clipId}>
              <rect x="0" y="0" width="12" height="24" />
            </clipPath>
          </defs>
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" className="text-yellow-300" />
          <path d="M12 17.27L18.18 21l-1.64-7.03L22 9.24l-7.19-.61L12 2 9.19 8.63 2 9.24l5.46 4.73L5.82 21z" fill="currentColor" className="text-yellow-500" clipPath={`url(#${clipId})`} />
        </svg>
      </span>
    );

    return (
      <div className="flex items-center gap-0.5" aria-label={`${rating} out of 5 stars`} title={`${rating} out of 5 stars`}>
        {Array.from({ length: fullStars }).map((_, i) => (
          <FullStar key={`full-${idSeed}-${i}`} />
        ))}
        {hasHalf && <HalfStar />}
        {Array.from({ length: emptyStars }).map((_, i) => (
          <EmptyStar key={`empty-${idSeed}-${i}`} />
        ))}
      </div>
    );
  };

  useEffect(() => {
    const handleWheel = (e: WheelEvent, container: HTMLDivElement) => {
      if (container && container.contains(e.target as Node)) {
        e.preventDefault();
        container.scrollLeft += e.deltaY;
      }
    };

    const enableDragScroll = (container: HTMLDivElement) => {
      let isDragging = false;
      let startX = 0;
      let startScrollLeft = 0;

      const onMouseDown = (e: MouseEvent) => {
        isDragging = true;
        startX = e.pageX - container.offsetLeft;
        startScrollLeft = container.scrollLeft;
        container.classList.add('cursor-grabbing');
      };

      const onMouseLeave = () => {
        isDragging = false;
        container.classList.remove('cursor-grabbing');
      };

      const onMouseUp = () => {
        isDragging = false;
        container.classList.remove('cursor-grabbing');
      };

      const onMouseMove = (e: MouseEvent) => {
        if (!isDragging) return;
        e.preventDefault();
        const x = e.pageX - container.offsetLeft;
        const walk = (x - startX) * 1; // drag speed multiplier
        container.scrollLeft = startScrollLeft - walk;
      };

      container.addEventListener('mousedown', onMouseDown);
      container.addEventListener('mouseleave', onMouseLeave);
      container.addEventListener('mouseup', onMouseUp);
      container.addEventListener('mousemove', onMouseMove);

      return () => {
        container.removeEventListener('mousedown', onMouseDown);
        container.removeEventListener('mouseleave', onMouseLeave);
        container.removeEventListener('mouseup', onMouseUp);
        container.removeEventListener('mousemove', onMouseMove);
      };
    };

    const gemstonesContainer = gemstonesRef.current;
    const rudrakshaContainer = rudrakshaRef.current;
    const braceletsContainer = braceletsRef.current;

    let cleanupDragFns: Array<() => void> = [];
    if (gemstonesContainer) {
      gemstonesContainer.addEventListener('wheel', (e) => handleWheel(e, gemstonesContainer), { passive: false });
      cleanupDragFns.push(enableDragScroll(gemstonesContainer));
    }
    if (rudrakshaContainer) {
      rudrakshaContainer.addEventListener('wheel', (e) => handleWheel(e, rudrakshaContainer), { passive: false });
      cleanupDragFns.push(enableDragScroll(rudrakshaContainer));
    }
    if (braceletsContainer) {
      braceletsContainer.addEventListener('wheel', (e) => handleWheel(e, braceletsContainer), { passive: false });
      cleanupDragFns.push(enableDragScroll(braceletsContainer));
    }

    return () => {
      if (gemstonesContainer) {
        gemstonesContainer.removeEventListener('wheel', (e) => handleWheel(e, gemstonesContainer));
      }
      if (rudrakshaContainer) {
        rudrakshaContainer.removeEventListener('wheel', (e) => handleWheel(e, rudrakshaContainer));
      }
      if (braceletsContainer) {
        braceletsContainer.removeEventListener('wheel', (e) => handleWheel(e, braceletsContainer));
      }
      cleanupDragFns.forEach((fn) => fn && fn());
    };
  }, []);

  // Open preview from URL (?preview=Item%20Name)
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const previewName = params.get('preview');
    if (!previewName) return;

    // Known items across sections (keep in sync with render lists)
    const gemstones = [
      { name: "Blue Sapphire", image: "/assets/blueSapphire.jpg" },
      { name: "Yellow Sapphire", image: "/assets/sapphire-yellow.png" },
      { name: "Emerald", image: "/assets/emerald.webp" },
      { name: "Ruby", image: "/assets/ruby.png" },
      { name: "Diamond", image: "/assets/heera.png" },
      { name: "Red Coral", image: "/assets/redCoral.png" },
      { name: "Cat's Eye", image: "/assets/catEye.png" },
      { name: "Hessonite", image: "/assets/hessonite.png" },
      { name: "Opal", image: "/assets/opal.png" },
      { name: "Turquoise", image: "/assets/turquoise.png" },
    ];
    const rudrakshas = [
      { name: "5 Mukhi Rudraksha", image: "/assets/5mukhi.webp" },
      { name: "10 Mukhi Rudraksha", image: "/assets/10mukh2.jpg" },
      { name: "Gauri Shankar", image: "/assets/GouriShankar2.jpg" },
      { name: "Rudraksha Mala", image: "/assets/5mukhisilverrudrakhshamala.webp" },
      { name: "Crystal Rudraksha", image: "/assets/rudrakhsacrystal.webp" },
      { name: "Mini Crystal Tree", image: "/assets/Rudraksha Mini Crystal Tree.jpg" },
      { name: "Original 5 Mukhi", image: "/assets/Original 5 Mukhi Rudraksha Mala 108+1 Beads (Lab Certified) Wood Necklace.jpg" },
    ];
    const bracelets = [
      { name: "7 Chakra Bracelet", image: "/assets/7chakra.webp" },
      { name: "Lava Stone Bracelet", image: "/assets/7chakralava.webp" },
      { name: "Agate Bracelet", image: "/assets/7charaagate.webp" },
      { name: "Pirate Bracelet", image: "/assets/piratebracelate.jpg" },
      { name: "Premium Bracelet", image: "/assets/bracelate1.jpg" },
    ];
    const all = [...gemstones, ...rudrakshas, ...bracelets];
    const found = all.find(x => x.name.toLowerCase() === previewName.toLowerCase());
    if (found) {
      setPreviewItem(found);
    }
  }, [location.search]);

  // Auto-scroll functionality
  useEffect(() => {
    const autoScroll = (container: HTMLDivElement, speed: number) => {
      if (!container) return;
      
      const scroll = () => {
        container.scrollLeft += speed;
        if (container.scrollLeft >= container.scrollWidth - container.clientWidth) {
          container.scrollLeft = 0;
        }
      };
      
      return setInterval(scroll, 50);
    };

    const gemstonesContainer = gemstonesRef.current;
    const rudrakshaContainer = rudrakshaRef.current;
    const braceletsContainer = braceletsRef.current;

    let gemstonesInterval: number | null = null;
    let rudrakshaInterval: number | null = null;
    let braceletsInterval: number | null = null;

    // Start auto-scroll after a delay
    const startAutoScroll = () => {
      if (gemstonesContainer) {
        gemstonesInterval = autoScroll(gemstonesContainer, 1) || null;
      }
      if (rudrakshaContainer) {
        rudrakshaInterval = autoScroll(rudrakshaContainer, 1) || null;
      }
      if (braceletsContainer) {
        braceletsInterval = autoScroll(braceletsContainer, 1) || null;
      }
    };

    const timeoutId = setTimeout(startAutoScroll, 2000);

    return () => {
      clearTimeout(timeoutId);
      if (gemstonesInterval) clearInterval(gemstonesInterval);
      if (rudrakshaInterval) clearInterval(rudrakshaInterval);
      if (braceletsInterval) clearInterval(braceletsInterval);
    };
  }, []);

  return (
    <main className="bg-transparent">
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        .product-scroll {
          scroll-behavior: smooth;
        }
        @keyframes autoScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .auto-scroll {
          animation: autoScroll 30s linear infinite;
        }
        .auto-scroll:hover {
          animation-play-state: paused;
        }
        .scroll-container {
          scroll-behavior: smooth;
        }
        @keyframes progress {
          0% { width: 0%; }
          100% { width: 100%; }
        }
      `}</style>
      {/* Banner Carousel Section - Full Width */}
      <div className="w-full pt-4 pb-8">
        <BannerCarousel />
      </div>

      {/* Why Astrology - Long Form Content */}
      
      {/* Quick Actions under banner */}
      <Section className="pb-8">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4">
            {[
              { 
                label: "Chat with Astrologer", 
                to: "/chat", 
                icon: <MessageSquare className="w-8 h-8" />,
                description: "Get instant guidance from expert astrologers",
                color: "from-blue-500 to-blue-600"
              },
              { 
                label: "Talk to Astrologer", 
                to: "/chat", 
                icon: <PhoneCall className="w-8 h-8" />,
                description: "Voice call consultation with experienced astrologers",
                color: "from-green-500 to-green-600"
              },
              { 
                label: "Astromall Shop", 
                to: "/store", 
                icon: <ShoppingBag className="w-8 h-8" />,
                description: "Premium Rudraksha beads and certified gemstones",
                color: "from-purple-500 to-purple-600"
              },
              { 
                label: "Book A Puja", 
                to: "/puja-booking", 
                icon: <Sparkles className="w-8 h-8" />,
                description: "Sacred rituals and spiritual ceremonies",
                color: "from-orange-500 to-orange-600"
              },
            ].map((x) => (
              <Link
                key={x.label}
                to={x.to}
                className="group relative overflow-hidden rounded-xl bg-white p-4 shadow hover:shadow-md transition-all duration-300 border border-gray-100"
              >
                <div className="flex items-center gap-3">
                  <div className={`h-10 w-10 flex items-center justify-center rounded-lg bg-gradient-to-r ${x.color} text-white shadow-sm group-hover:scale-105 transition-transform duration-200`}>
                    {x.icon}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h3 className="text-sm font-semibold text-brown-900 truncate group-hover:text-brown-700 transition-colors">
                      {x.label}
                    </h3>
                    <p className="hidden lg:block text-xs text-brown-600 mt-0.5 group-hover:text-brown-500 transition-colors line-clamp-2">
                      {x.description}
                    </p>
                  </div>
                  <div className="hidden sm:block opacity-60 group-hover:opacity-100 transition-opacity duration-200">
                    <ArrowRight className="w-5 h-5 text-brown-400" />
                  </div>
                </div>
                {/* Hover effect background */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-r from-yellow-50/50 to-amber-50/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 rounded-xl"></div>
              </Link>
            ))}
          </div>
        </div>
      </Section>

      {/* Link to Puja Booking page CTA */}
      <Section className="py-16">
        <div className="rounded-2xl p-8 text-center bg-white/90 backdrop-blur-sm shadow-deep">
          <h3 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Book a Puja with Pandit Ji</h3>
          <p className="mt-2 text-brown-800">Explore all puja options and schedule with our experts.</p>
          <div className="mt-5">
            <Link to="/puja-booking" className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400">
              Go to Puja Booking
            </Link>
          </div>
        </div>
      </Section>

      {/* Hero */}
      <Section className="pt-0 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img src="/assets/HeroLogo.png" alt="Astrology" className="w-full max-w-[400px] md:max-w-[550px] h-auto md:h-[320px] object-contain" />
          </div>
          <div className="order-1 md:order-2 text-center md:text-left">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold leading-tight ${gradHead}`}>
              Connect with Expert Astrologers
            </h1>
            <p className="mt-5 text-brown-800">
              RUDRAGURU is a company dedicated to providing Astrology sessions or guidance,
              high-quality Rudraksha beads and certified gemstones to our customers. We believe
              in the power of these beads and gemstones to bring about positive changes in people's lives.
            </p>
            <div className="mt-7 flex flex-col sm:flex-row flex-wrap gap-3 justify-center md:justify-start">
              <Link
                to="/services"
                className="inline-flex items-center justify-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
              >
                Explore Services
              </Link>
              <Link
                to="/store"
                className="inline-flex items-center justify-center rounded-xl bg-transparent border-2 border-yellow-400 px-6 py-3 text-gray-700 font-semibold shadow hover:bg-gray-50 transition"
              >
                Shop Astro Products
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center justify-center rounded-xl border border-gray-300 px-6 py-3 text-gray-700 font-semibold hover:bg-gray-50 transition"
              >
                Start Chat • 3 min FREE • ₹11/5 min after
              </Link>
            </div>
          </div>
        </div>
      </Section>

      {/* Our Services */}
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${gradHead}`}>Our Services</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              title: "What We Offer",
              text: "Premium, Rudraksha beads & certified gemstones.",
              icon: <Gem className="w-6 h-6" />,
            },
            {
              title: "Our Assurance",
              text: "Authentic, ethically sourced, and lab‑certified gemstones.",
              icon: <ShieldCheck className="w-6 h-6" />,
            },
            {
              title: "Our Vision",
              text: "Helping individuals harness gemstones and Rudraksha for health, success, and spiritual growth.",
              icon: <Stars className="w-6 h-6" />,
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105 animate-shadow-float"
            >
              <div className="absolute -top-5 -left-5 h-12 w-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
                {c.icon}
              </div>
              <h3 className="font-semibold text-gray-700 mb-2 text-lg">{c.title}</h3>
              <p className="text-brown-800">{c.text}</p>
              <div className="mt-4 h-1 w-20 bg-gradient-to-r from-yellow-400 to-brown-400 rounded-full"></div>
            </div>
          ))}
        </div>
      </Section>

      {/* Why Choose Our Platform (bigger tiles with icons and hover) */}
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center ${gradHead}`}>
          Why Choose Our Platform?
        </h2>
        <p className=" text-brown-800 mt-3">
          We provide a comprehensive and trusted astrology consultation experience.
        </p>
        <div className="mt-12 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {[
            { title: "Instant Chat", text: "Get quick answers on our secure chat platform.", icon: <MessageSquare className="w-6 h-6" /> },
            { title: "Voice Calls", text: "Detailed conversations over crystal clear calls.", icon: <PhoneCall className="w-6 h-6" /> },
            { title: "Video Sessions", text: "Face‑to‑face consultations for deeper readings.", icon: <Video className="w-6 h-6" /> },
            { title: "Verified Experts", text: "All astrologers and Gemologists verified and certified.", icon: <ShieldCheck className="w-6 h-6" /> },
            { title: "24×7 Available", text: "Round‑the‑clock guidance, anywhere.", icon: <Clock3 className="w-6 h-6" /> },
            { title: "Personalized Reports", text: "Detailed birth charts, kundli, and reports.", icon: <FileText className="w-6 h-6" /> },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl p-7 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:-translate-y-2 hover:scale-105"
              style={{ boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.3), 0 10px 10px -5px rgba(0, 0, 0, 0.1), 0 0 0 1px rgba(0, 0, 0, 0.05)' }}
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-gray-700 mb-2 text-xl">{c.title}</h3>
                  <p className="text-brown-800">{c.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

        {/* Astrologer Cards */}
       <Section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl sm:text-4xl font-bold ${gradHead}`}>Chat with Expert Astrologers</h2>
          <Link to="/chat" className="text-yellow-700 font-semibold hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASTROLOGERS.slice(0,3).map((a) => (
            <div key={a.id} className="rounded-2xl p-5 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105 animate-shadow-deep">
              <div className="flex items-center gap-4">
                <Link to={`/chat?astro=${a.id}`} className="shrink-0">
                  <img src={a.img} alt={a.name} className="h-16 w-16 rounded-full object-cover border-2 border-yellow-500" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Link to={`/chat?astro=${a.id}`} className="font-semibold text-brown-900 hover:underline">{a.name}</Link>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="text-gray-700">{a.rating ? a.rating.toFixed(1) : "—"}</span></div>
                  </div>
                  <p className="text-sm text-brown-700">{a.skills[0]}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-3">
                <Link to={`/chat?astro=${a.id}`} className="flex-1 rounded-md bg-yellow-500 py-2 text-center text-brown-900 font-semibold hover:bg-yellow-400 transition">Chat • 3 min FREE</Link>
                <Link to={`/calling?astro=${a.id}`} className="flex-1 rounded-md border border-gray-300 py-2 text-center text-gray-700 font-semibold hover:bg-gray-50 transition">Call</Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Choose Your Sign */}
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold  ${gradHead}`}>Choose Your Sign</h2>
        <p className="mb-8 text-sm text-brown-700">
          Signs follow the standard Western zodiac order used widely across references.
        </p>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 md:gap-5">
          {ZODIAC.map((sign) => (
            <Link
              key={sign}
              to={`/horoscope/${sign.toLowerCase()}`}
              className="group rounded-2xl p-4 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105 animate-shadow-pulse"
            >
              <div className="h-20 w-20 mx-auto rounded-2xl bg-yellow-50 border border-yellow-200 flex items-center justify-center shadow-sm">
                <img src={getZodiacAsset(sign)} alt={sign} className="h-14 w-14 object-contain"/>
              </div>
              <p className="mt-3 text-center font-semibold text-brown-900 group-hover:text-gray-700">{sign}</p>
            </Link>
          ))}
        </div>
        
      </Section>

      {/* Product Showcase - Horizontal Scrolling Sections */}
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${gradHead}`}>
          Premium Astro Products
        </h2>
        
        {/* Gemstones Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-brown-900 mb-6 flex items-center gap-3">
            <Gem className="w-6 h-6 text-yellow-600" />
            Certified Gemstones
          </h3>
          <div className="relative overflow-hidden">
            <div 
              ref={gemstonesRef}
              className="flex gap-6 scroll-container overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { name: "Blue Sapphire", image: "/assets/blueSapphire.jpg" },
                { name: "Yellow Sapphire", image: "/assets/sapphire-yellow.png" },
                { name: "Emerald", image: "/assets/emerald.webp" },
                { name: "Ruby", image: "/assets/ruby.png" },
                { name: "Diamond", image: "/assets/heera.png" },
                { name: "Red Coral", image: "/assets/redCoral.png" },
                { name: "Cat's Eye", image: "/assets/catEye.png" },
                { name: "Hessonite", image: "/assets/hessonite.png" },
                { name: "Opal", image: "/assets/opal.png" },
                { name: "Turquoise", image: "/assets/turquoise.png" },
                // Duplicate for seamless loop
                { name: "Blue Sapphire", image: "/assets/blueSapphire.jpg" },
                { name: "Yellow Sapphire", image: "/assets/sapphire-yellow.png" },
                { name: "Emerald", image: "/assets/emerald.webp" },
                { name: "Ruby", image: "/assets/ruby.png" },
                { name: "Diamond", image: "/assets/heera.png" },
                { name: "Red Coral", image: "/assets/redCoral.png" },
                { name: "Cat's Eye", image: "/assets/catEye.png" },
                { name: "Hessonite", image: "/assets/hessonite.png" },
                { name: "Opal", image: "/assets/opal.png" },
                { name: "Turquoise", image: "/assets/turquoise.png" }
              ].map((gem, index) => (
                <div key={index} className="flex-shrink-0 w-40">
                  <button type="button" onClick={() => { setPreviewItem(gem); navigate(`?preview=${encodeURIComponent(gem.name)}`); }} className="w-full text-left group rounded-2xl p-4 bg-white/95 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer">
                    <div className="relative mb-4 flex items-center justify-center">
                      <img
                        src={gem.image}
                        alt={gem.name}
                        className="w-28 h-28 object-cover rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto"
                      />
                      <div className="absolute w-28 h-28 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="font-bold text-brown-900 text-center text-sm group-hover:text-yellow-700 transition-colors duration-300">{gem.name}</h4>
                  </button>
                </div>
              ))}
            </div>
            {/* Scroll Controls */}
            <button
              aria-label="Scroll left"
              type="button"
              onClick={() => {
                if (gemstonesRef.current) {
                  gemstonesRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                }
              }}
              className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ArrowLeft className="w-5 h-5 text-gray-700" />
            </button>
            <button
              aria-label="Scroll right"
              type="button"
              onClick={() => {
                if (gemstonesRef.current) {
                  gemstonesRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                }
              }}
              className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
            >
              <ArrowRight className="w-5 h-5 text-gray-700" />
            </button>
          </div>
        </div>

        {/* Rudraksha Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-brown-900 mb-6 flex items-center gap-3">
            <Sparkles className="w-4 h-4 text-yellow-600" />
            Sacred Rudraksha Beads
          </h3>
          <div className="relative overflow-hidden">
            <div 
              ref={rudrakshaRef}
              className="flex gap-6 scroll-container overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { name: "5 Mukhi Rudraksha", image: "/assets/5mukhi.webp" },
                { name: "10 Mukhi Rudraksha", image: "/assets/10mukh2.jpg" },
                { name: "Gauri Shankar", image: "/assets/GouriShankar2.jpg" },
                { name: "Rudraksha Mala", image: "/assets/5mukhisilverrudrakhshamala.webp" },
                { name: "Crystal Rudraksha", image: "/assets/rudrakhsacrystal.webp" },
                { name: "Mini Crystal Tree", image: "/assets/Rudraksha Mini Crystal Tree.jpg" },
                { name: "Original 5 Mukhi", image: "/assets/Original 5 Mukhi Rudraksha Mala 108+1 Beads (Lab Certified) Wood Necklace.jpg" },
                // Duplicate for seamless loop
                { name: "5 Mukhi Rudraksha", image: "/assets/5mukhi.webp" },
                { name: "10 Mukhi Rudraksha", image: "/assets/10mukh2.jpg" },
                { name: "Gauri Shankar", image: "/assets/GouriShankar2.jpg" },
                { name: "Rudraksha Mala", image: "/assets/5mukhisilverrudrakhshamala.webp" },
                { name: "Crystal Rudraksha", image: "/assets/rudrakhsacrystal.webp" },
                { name: "Mini Crystal Tree", image: "/assets/Rudraksha Mini Crystal Tree.jpg" },
                { name: "Original 5 Mukhi", image: "/assets/Original 5 Mukhi Rudraksha Mala 108+1 Beads (Lab Certified) Wood Necklace.jpg" }
              ].map((rudraksha, index) => (
                <div key={index} className="flex-shrink-0 w-40">
                  <button type="button" onClick={() => { setPreviewItem(rudraksha); navigate(`?preview=${encodeURIComponent(rudraksha.name)}`); }} className="w-full text-left group rounded-2xl p-4 bg-white/95 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer">
                    <div className="relative mb-4 flex items-center justify-center">
                      <img
                        src={rudraksha.image}
                        alt={rudraksha.name}
                        className="w-28 h-28 object-cover rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto"
                      />
                      <div className="absolute w-28 h-28 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="font-bold text-brown-900 text-center text-sm group-hover:text-yellow-700 transition-colors duration-300">{rudraksha.name}</h4>
                  </button>
                </div>
              ))}
            </div>
             {/* Scroll Controls */}
             <button
               aria-label="Scroll left"
               type="button"
               onClick={() => {
                 if (rudrakshaRef.current) {
                   rudrakshaRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                 }
               }}
               className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
             >
               <ArrowLeft className="w-5 h-5 text-gray-700" />
             </button>
             <button
               aria-label="Scroll right"
               type="button"
               onClick={() => {
                 if (rudrakshaRef.current) {
                   rudrakshaRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                 }
               }}
               className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
             >
               <ArrowRight className="w-5 h-5 text-gray-700" />
             </button>
          </div>
        </div>

        {/* Bracelets Section */}
        <div className="mb-12">
          <h3 className="text-2xl font-bold text-brown-900 mb-6 flex items-center gap-3">
            <ShieldCheck className="w-6 h-6 text-yellow-600" />
            Spiritual Bracelets
          </h3>
          <div className="relative overflow-hidden">
            <div 
              ref={braceletsRef}
              className="flex gap-6 scroll-container overflow-x-auto scrollbar-hide"
              style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
              {[
                { name: "7 Chakra Bracelet", image: "/assets/7chakra.webp" },
                { name: "Lava Stone Bracelet", image: "/assets/7chakralava.webp" },
                { name: "Agate Bracelet", image: "/assets/7charaagate.webp" },
                { name: "Pirate Bracelet", image: "/assets/piratebracelate.jpg" },
                { name: "Premium Bracelet", image: "/assets/bracelate1.jpg" },
                // Duplicate for seamless loop
               
              
            
                { name: "Pirate Bracelet", image: "/assets/piratebracelate.jpg" },
                { name: "Premium Bracelet", image: "/assets/bracelate1.jpg" }
              ].map((bracelet, index) => (
                <div key={index} className="flex-shrink-0 w-40">
                  <button type="button" onClick={() => { setPreviewItem(bracelet); navigate(`?preview=${encodeURIComponent(bracelet.name)}`); }} className="w-full text-left group rounded-2xl p-4 bg-white/95 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-500 hover:scale-110 hover:-translate-y-2 cursor-pointer">
                    <div className="relative mb-4 flex items-center justify-center">
                      <img
                        src={bracelet.image}
                        alt={bracelet.name}
                        className="w-28 h-28 object-cover rounded-full shadow-lg group-hover:shadow-xl transition-all duration-300 mx-auto"
                      />
                      <div className="absolute w-28 h-28 rounded-full bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                    </div>
                    <h4 className="font-bold text-brown-900 text-center text-sm group-hover:text-yellow-700 transition-colors duration-300">{bracelet.name}</h4>
                  </button>
                </div>
              ))}
            </div>
             {/* Scroll Controls */}
             <button
               aria-label="Scroll left"
               type="button"
               onClick={() => {
                 if (braceletsRef.current) {
                   braceletsRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                 }
               }}
               className="absolute left-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
             >
               <ArrowLeft className="w-5 h-5 text-gray-700" />
             </button>
             <button
               aria-label="Scroll right"
               type="button"
               onClick={() => {
                 if (braceletsRef.current) {
                   braceletsRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                 }
               }}
               className="absolute right-2 top-1/2 -translate-y-1/2 z-20 h-10 w-10 flex items-center justify-center rounded-full bg-white/90 hover:bg-white shadow-lg hover:shadow-xl transition-all duration-200 hover:scale-110"
             >
               <ArrowRight className="w-5 h-5 text-gray-700" />
             </button>
          </div>
        </div>
      </Section>

      {/* Quick Preview Modal */}
      {previewItem && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center">
          <button aria-label="Close preview" onClick={() => { setPreviewItem(null); navigate(location.pathname, { replace: true }); }} className="absolute inset-0 bg-black/50" />
          <div className="relative z-[61] w-11/12 max-w-md rounded-2xl bg-white p-6 shadow-deep">
            <div className="flex items-center gap-4">
              <img src={previewItem.image} alt={previewItem.name} className="h-20 w-20 rounded-full object-cover border-2 border-yellow-400" />
              <div>
                <h3 className="text-xl font-bold text-brown-900">{previewItem.name}</h3>
                <p className="text-brown-700 text-sm">Explore details and purchase from our store.</p>
              </div>
            </div>
            <div className="mt-4">
              <img src={previewItem.image} alt={previewItem.name} className="w-full h-56 object-contain rounded-xl bg-yellow-50" />
            </div>
             <div className="mt-6 flex gap-2 justify-end">
              <button onClick={() => { setPreviewItem(null); navigate(location.pathname, { replace: true }); }} className="rounded-lg border border-gray-300 px-3 py-1.5 text-sm text-gray-700 font-semibold hover:bg-gray-50">Close</button>
              {(() => {
                const id = resolveProductId(previewItem?.name);
                const to = id ? `/product/${id}` : `/store?product=${encodeURIComponent(previewItem?.name || '')}`;
                return (
                  <Link to={to} className="rounded-lg bg-black/80 px-3 py-1.5 text-sm text-white font-semibold hover:bg-black/70">View Details</Link>
                );
              })()}
              <Link to="/store" className="rounded-lg bg-yellow-500 px-3 py-1.5 text-sm text-brown-900 font-semibold hover:bg-yellow-400">Go to RUDRAGURU Store</Link>
            </div>
          </div>
        </div>
      )}

      {/* Testimonials */}
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${gradHead}`}>
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            {
              name: "Amit Sharma",
              city: "Delhi, IN",
              text: "Quality bahut achcha hai James Stone suggest achcha Kiya Hai aur mujhe bahut achcha service mila hai",
               image: "/assets/testimonial1.jpg",
              rating: 5,
            },
            {
              name: "Rohit Verma",
              city: "Mumbai, IN",
              text: "Astrologer ki service bahut acchi hai jab Bhi mujhe kuchh problem hota hai guidance mila hai, gemstone quality very good",
              image: "/assets/testimonial2.jpg",
              rating: 4,
            },
            {
              name: "Soumen Patel",
              city: "Kolkata, IN",
              text: "Gemstone ki quality bahut acchi hai Money magnet bracelet bhi Gift me mila hai thank you Rudhra Guru",
              image: "/assets/testimonial3.jpg",
              rating: 4.5,
            },
          ].map((t) => (
            <div
              key={t.name}
              className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-shadow-float"
            >
              <p className="text-brown-800">“{t.text}”</p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={t.image}
                  alt={t.name}
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-yellow-700">{t.name}</p>
                  <p className="text-xs text-brown-700">{t.city}</p>
                  <div className="mt-1">
                    {renderStars(t.rating, t.name.replace(/\s+/g, "-"))}
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Store Showcase */}
      <Section className="py-16">
        <div className="text-center mb-12">
          <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${gradHead}`}>Featured Astro Products</h2>
          <p className="text-brown-800 max-w-2xl mx-auto">
            Discover our collection of authentic gemstones, rudraksha beads, and spiritual products 
            carefully selected for their quality and astrological benefits.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            {
              name: "Yellow Sapphire (Pukhraj)",
              price: "₹25,000",
              originalPrice: "₹31,250",
              discount: "20% OFF",
              image: "/assets/sapphire-yellow.png",
              benefits: "Wisdom, Prosperity, Spiritual Growth"
            },
            {
              name: "5 Mukhi Rudraksha",
              price: "₹2,500",
              originalPrice: "₹3,125",
              discount: "20% OFF",
              image: "/assets/rudraksha.png",
              benefits: "Jupiter's Blessings, Knowledge, Success"
            },
            {
              name: "Blue Sapphire (Neelam)",
              price: "₹18,000",
              originalPrice: "₹22,500",
              discount: "20% OFF",
              image: "/assets/sapphire-blue.png",
              benefits: "Discipline, Focus, Career Stability"
            },
            {
              name: "7 Chakra Bracelet",
              price: "₹799",
              originalPrice: "₹999",
              discount: "20% OFF",
              image: "/assets/serviceLogo.png",
              benefits: "Energy Balance, Spiritual Healing"
            }
          ].map((product, index) => (
            <div
              key={index}
              className="rounded-2xl p-4 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:-translate-y-2 hover:scale-105 animate-shadow-glow"
            >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-2xl"
                />
                <div className="absolute top-2 left-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  {product.discount}
                </div>
              </div>
              <h3 className="font-semibold text-brown-900 mb-2 line-clamp-2">{product.name}</h3>
              <p className="text-sm text-gray-600 mb-3 line-clamp-2">{product.benefits}</p>
              <div className="flex items-center gap-2 mb-3">
                <span className="text-lg font-bold text-gray-900">{product.price}</span>
                <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
              </div>
              <Link
                to="/store"
                className="w-full inline-flex justify-center items-center rounded-lg bg-yellow-500 px-4 py-2 text-brown-900 font-semibold hover:bg-yellow-400 transition"
              >
                View Details
              </Link>
            </div>
          ))}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/store"
            className="inline-flex items-center rounded-xl bg-transparent border-2 border-yellow-400 px-6 py-3 text-gray-700 font-semibold shadow hover:bg-gray-50 transition"
          >
            View All Products
          </Link>
        </div>
      </Section>
      


      {/* Footer CTA */}
      <Section className="py-16">
        <div className="rounded-2xl p-8 text-center bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105 animate-shadow-deep">
          <h3 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Ready to get guidance?</h3>
          <p className="mt-2 text-brown-800">Start a chat with certified astrologers anytime, anywhere.</p>
          <div className="mt-5">
            <Link to="/chat" className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400">
              Start Chat • 3 min FREE • ₹11/5 min after
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}