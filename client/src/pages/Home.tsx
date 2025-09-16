import { Link } from "react-router-dom";
import HeroLogo from "../assets/HeroLogo.png";
import Astrologer from "../assets/astrologer.png";
import { MessageSquare, PhoneCall, ShoppingBag, Sparkles, Gem, ShieldCheck, Stars, ArrowRight, Video, Clock3, FileText, Star } from "lucide-react";
import { ASTROLOGERS } from "../data/astrologers";
import ladyastro from "../assets/ladyastro.png";
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

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

export default function Home() {
  return (
    <main className="bg-transparent">
      <style>{`
        .banner-swiper {
          padding: 0 0 50px 0;
        }
        .banner-swiper .swiper-pagination {
          bottom: 10px;
        }
        .banner-swiper .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.5);
          opacity: 1;
        }
        .banner-swiper .swiper-pagination-bullet-active {
          background: #f59e0b;
        }
        .banner-swiper .swiper-button-next,
        .banner-swiper .swiper-button-prev {
          color: #f59e0b;
        }
        .banner-swiper .swiper-button-next:after,
        .banner-swiper .swiper-button-prev:after {
          font-size: 24px;
        }
      `}</style>
      {/* Swiper Banner Section */}
      <Section className="pt-20 pb-8">
        <Swiper
          modules={[Autoplay, Pagination, Navigation]}
          spaceBetween={30}
          slidesPerView={1}
          autoplay={{
            delay: 2000,
            disableOnInteraction: false,
          }}
          pagination={{
            clickable: true,
            dynamicBullets: true,
          }}
          navigation={true}
          loop={true}
          className="banner-swiper"
        >
          {/* First Banner - Male Astrologer */}
          <SwiperSlide>
            <div className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-yellow-500 via-yellow-300 to-amber-500 p-4 sm:p-6 md:p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* Text */}
                <div className="text-center md:text-left">
                  <p className="text-sm sm:text-base font-semibold text-brown-800/90 tracking-wide">200+ Celebs recommend RudraGuru</p>
                  <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown-900">
                    Chat With Expert Astrologer
                  </h1>
                  <Link
                    to="/chat"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-black px-6 py-3 text-white font-semibold shadow-md hover:bg-gray-800 transition"
                  >
                    Chat Now 
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Image */}
                <div className="flex justify-center md:justify-end">
                  <img src={Astrologer} alt="Expert Astrologer" className="w-full max-w-[260px] md:max-w-[320px] h-auto object-contain drop-shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>

          {/* Second Banner - Female Astrologer */}
          <SwiperSlide>
            <div className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-yellow-500 via-pink-300 to-rose-500 p-4 sm:p-6 md:p-8 shadow-xl">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
                {/* Text */}
                <div className="text-center md:text-left">
                  <p className="text-sm sm:text-base font-semibold text-white/90 tracking-wide">Expert Female Astrologer Available</p>
                  <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-white">
                    Connect with Lady Astrologer
                  </h1>
                  <Link
                    to="/chat"
                    className="mt-5 inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-3 text-purple-600 font-semibold shadow-md hover:bg-gray-100 transition"
                  >
                    Start Consultation 
                    <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
                {/* Image */}
                <div className="flex justify-center md:justify-end">
                  <img src={ladyastro} alt="Lady Astrologer" className="w-full max-w-[260px] md:max-w-[320px] h-auto object-contain drop-shadow-lg" />
                </div>
              </div>
            </div>
          </SwiperSlide>
        </Swiper>
      </Section>


      {/* Why Astrology - Long Form Content */}
      
      {/* Quick Actions under banner */}
      <Section className="pb-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {[
            { label: "Chat with Astrologer", to: "/chat", icon: <MessageSquare className="w-6 h-6" /> },
            { label: "Talk to Astrologer", to: "/chat", icon: <PhoneCall className="w-6 h-6" /> },
            { label: "Astromall Shop", to: "/store", icon: <ShoppingBag className="w-6 h-6" /> },
            { label: "Book A Puja", to: "/services", icon: <Sparkles className="w-6 h-6" /> },
          ].map((x) => (
            <Link
              key={x.label}
              to={x.to}
              className="rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-yellow-300/60 p-6 shadow-lg hover:shadow-2xl hover:border-yellow-400/80 transition flex items-center gap-4"
            >
              <span className="h-12 w-12 flex items-center justify-center rounded-xl bg-yellow-100 text-yellow-700 shadow-sm">{x.icon}</span>
              <span className="font-semibold text-brown-900">{x.label}</span>
            </Link>
          ))}
        </div>
      </Section>

      {/* Hero */}
      <Section className="pt-0 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center order-2 md:order-1">
            <img src={HeroLogo} alt="Astrology" className="w-full max-w-[400px] md:max-w-[550px] h-auto md:h-[320px] object-contain" />
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
                className="inline-flex items-center justify-center rounded-xl bg-transparent border-2 border-yellow-400 px-6 py-3 text-yellow-600 font-semibold shadow hover:bg-yellow-50 transition"
              >
                Shop Astro Products
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center justify-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
              >
                Start Chat ₹1/min
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
              className="group relative rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm transition-all duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-yellow-400/80"
            >
              <div className="absolute -top-5 -left-5 h-12 w-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
                {c.icon}
              </div>
              <h3 className="font-semibold text-yellow-600 mb-2 text-lg">{c.title}</h3>
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
              className="rounded-2xl border-2 border-yellow-300/60 p-7 bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-400/80"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-600 mb-2 text-xl">{c.title}</h3>
                  <p className="text-brown-800">{c.text}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Choose Your Perfect Astrologer */}
      <Section className="py-16">
        
        <h2
          className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${gradHead}`}
        >
          Choose Your Perfect Astrologer
        </h2>
        <p className=" text-brown-700 mb-2">
          Connect with certified astrologers specializing in various fields of
          astrology and divination
        </p>

        {/* Search + Filters */}
        <div className="rounded-2xl p-4 bg-white/90 backdrop-blur-sm border-2 border-yellow-300/60 shadow-lg">
          <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
            <div className="flex-1">
              <input
                type="text"
                placeholder="Search by name, specialty, or language..."
                className="w-full rounded-md border border-yellow-500 p-3"
              />
              <div className="mt-3 flex flex-wrap gap-2">
                {[
                  "Available Now",
                  "Under ₹20/min",
                  "Top Rated",
                  "Relationship Expert",
                  "Career Guidance",
                ].map((x) => (
                  <button
                    key={x}
                    className="rounded-full border border-yellow-500 px-3 py-1 text-sm text-brown-800 hover:bg-brown-50"
                  >
                    {x}
                  </button>
                ))}
              </div>
            </div>

            <div className="flex gap-3">
              <select className="rounded-md border border-yellow-500 p-2">
                <option>Specialty</option>
                <option>Palm Reading</option>
                <option>Numerology</option>
                <option>Tarot Reading</option>
                <option>Vedic Astrology</option>
              </select>
              <select className="rounded-md border border-yellow-500 p-2">
                <option>Language</option>
                <option>Hindi</option>
                <option>English</option>
                <option>Bengali</option>
                <option>Tamil</option>
              </select>
              <select className="rounded-md border border-yellow-500 p-2">
                <option>Sort by</option>
                <option>Highest Rate</option>
                <option>Lowest Rate</option>
                <option>Price: Low to High</option>
                <option>Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>

        {/* Astrologer Cards */}
       <Section className="py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className={`text-3xl sm:text-4xl font-bold ${gradHead}`}>Choose Your Best Astrologer</h2>
          <Link to="/astrologers" className="text-yellow-700 font-semibold hover:underline">View all</Link>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {ASTROLOGERS.slice(0,3).map((a) => (
            <div key={a.id} className="rounded-2xl border-2 border-yellow-300/60 p-5 bg-white/90 backdrop-blur-sm shadow-lg hover:shadow-2xl transition">
              <div className="flex items-center gap-4">
                <Link to={`/astrologers?select=${a.id}`} className="shrink-0">
                  <img src={a.img} alt={a.name} className="h-16 w-16 rounded-full object-cover border-2 border-yellow-500" />
                </Link>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <Link to={`/astrologers?select=${a.id}`} className="font-semibold text-brown-900 hover:underline">{a.name}</Link>
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="text-yellow-600">{a.rating.toFixed(1)}</span></div>
                  </div>
                  <p className="text-sm text-brown-700">{a.skills[0]}</p>
                </div>
              </div>
              <div className="mt-3 flex gap-3">
                <Link to={`/chat?astro=${a.id}`} className="flex-1 rounded-md bg-yellow-500 py-2 text-center text-brown-900 font-semibold hover:bg-yellow-400 transition">Chat • 3 min FREE</Link>
                <Link to={`/calling?astro=${a.id}`} className="flex-1 rounded-md border border-yellow-400 py-2 text-center text-yellow-600 font-semibold hover:bg-yellow-50 transition">Call</Link>
              </div>
            </div>
          ))}
        </div>
      </Section>
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
              to={`/zodiac/${sign.toLowerCase()}`}
              className="group rounded-2xl border-2 border-yellow-300/60 p-4 bg-white/90 backdrop-blur-sm shadow-lg transition-transform duration-300 hover:scale-[1.03] hover:shadow-2xl hover:border-yellow-400/80"
            >
              <div className="h-16 flex items-center justify-center">
                <img src={`/images/zodiac/${sign.toLowerCase()}.png`} alt={sign} className="h-12 w-12 object-contain"/>
              </div>
              <p className="mt-3 text-center font-semibold text-brown-900 group-hover:text-yellow-600">{sign}</p>
            </Link>
          ))}
        </div>
        
      </Section>

      {/* Testimonials */}
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${gradHead}`}>
          Testimonials
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          {[
            { name: "Anita Sharma", city: "Delhi, IN" },
            { name: "Rohit Verma", city: "Mumbai, IN" },
            { name: "Sonal Patel", city: "Ahmedabad, IN" },
          ].map((c, i) => (
            <div
              key={c.name}
              className="rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-400/80"
            >
              <p className="text-brown-800">
                “Wonderful insights and accurate guidance. The gemstone
                recommendation truly helped.”
              </p>
              <div className="mt-4 flex items-center gap-3">
                <img
                  src={`https://randomuser.me/api/portraits/lego/${i + 1}.jpg`}
                  alt="Client"
                  className="h-10 w-10 rounded-full object-cover"
                />
                <div>
                  <p className="text-sm font-bold text-yellow-700">{c.name}</p>
                  <p className="text-xs text-brown-700">{c.city}</p>
                  <div className="flex text-sm"><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /></div>
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
              image: "/src/assets/sapphire-yellow.png",
              benefits: "Wisdom, Prosperity, Spiritual Growth"
            },
            {
              name: "5 Mukhi Rudraksha",
              price: "₹2,500",
              originalPrice: "₹3,125",
              discount: "20% OFF",
              image: "/src/assets/rudraksha.png",
              benefits: "Jupiter's Blessings, Knowledge, Success"
            },
            {
              name: "Blue Sapphire (Neelam)",
              price: "₹18,000",
              originalPrice: "₹22,500",
              discount: "20% OFF",
              image: "/src/assets/sapphire-blue.png",
              benefits: "Discipline, Focus, Career Stability"
            },
            {
              name: "7 Chakra Bracelet",
              price: "₹799",
              originalPrice: "₹999",
              discount: "20% OFF",
              image: "/src/assets/serviceLogo.png",
              benefits: "Energy Balance, Spiritual Healing"
            }
          ].map((product, index) => (
            <div
              key={index}
              className="rounded-2xl border-2 border-yellow-300/60 p-4 bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-400/80"
            >
              <div className="relative mb-4">
                <img
                  src={product.image}
                  alt={product.name}
                  className="w-full h-32 object-cover rounded-lg"
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
            className="inline-flex items-center rounded-xl bg-transparent border-2 border-yellow-400 px-6 py-3 text-yellow-600 font-semibold shadow hover:bg-yellow-50 transition"
          >
            View All Products
          </Link>
        </div>
      </Section>
      


      {/* Footer CTA */}
      <Section className="py-16">
        <div className="rounded-2xl border-2 border-yellow-300/60 p-8 text-center bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:shadow-2xl hover:border-yellow-400/80">
          <h3 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Ready to get guidance?</h3>
          <p className="mt-2 text-brown-800">Start a chat with certified astrologers anytime, anywhere.</p>
          <div className="mt-5">
            <Link to="/chat" className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400">
              Start Chat ₹1/min
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}