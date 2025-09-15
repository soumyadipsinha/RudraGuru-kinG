import { Link } from "react-router-dom";
import HeroLogo from "../assets/HeroLogo.png";
import Astrologer from "../assets/astrologer.png";
import { MessageSquare, PhoneCall, ShoppingBag, Sparkles, Gem, ShieldCheck, Stars, ArrowRight } from "lucide-react";

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
      {/* Top Promo Banner (Astrotalk-style) */}
      <Section className="pt-18 pb-8 ">
        <div className="rounded-2xl md:rounded-3xl bg-gradient-to-r from-yellow-500 via-yellow-300 to-amber-500 p-4 sm:p-6 md:p-8 shadow-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-10 items-center">
            {/* Text */}
            <div className="text-center md:text-left">
              <p className="text-sm sm:text-base font-semibold text-brown-800/90 tracking-wide">200+ Celebs recommend RudraGuru</p>
              <h1 className="mt-2 text-3xl sm:text-4xl md:text-5xl font-extrabold text-brown-900">
                Chat With Astrologer
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
              <img src={Astrologer} alt="Astrologer" className="w-full max-w-[260px] md:max-w-[320px] h-auto object-contain drop-shadow-lg" />
            </div>
          </div>
        </div>
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
                className="inline-flex items-center justify-center rounded-xl bg-green-500 px-6 py-3 text-white font-semibold shadow hover:bg-green-400 transition"
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
            { title: "Instant Chat", text: "Get quick answers on our secure chat platform.", emoji: "💬" },
            { title: "Voice Calls", text: "Detailed conversations over crystal clear calls.", emoji: "📞" },
            { title: "Video Sessions", text: "Face‑to‑face consultations for deeper readings.", emoji: "🎥" },
            { title: "Verified Experts", text: "All astrologers are vetted and certified.", emoji: "🛡️" },
            { title: "24×7 Available", text: "Round‑the‑clock guidance, anywhere.", emoji: "🕒" },
            { title: "Personalized Reports", text: "Detailed birth charts, kundli, and reports.", emoji: "⭐" },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border-2 border-yellow-300/60 p-7 bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-400/80"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl shadow">
                  {c.emoji}
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
        <div className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-6">
          {[
            {
              name: "Dr. Kavita Joshi",
              specialty: "Vedic Astrology, Palm Reading",
              language: "Hindi, English",
              rate: "₹15/min",
              rating: "4.9",
              img: "https://randomuser.me/api/portraits/women/45.jpg",
            },
            {
              name: "Rajesh Mehta",
              specialty: "Numerology, Vastu Shastra",
              language: "Hindi, Gujarati",
              rate: "₹10/min",
              rating: "4.7",
              img: "https://randomuser.me/api/portraits/men/32.jpg",
            },
            {
              name: "Ananya Kapoor",
              specialty: "Tarot Reading, Relationship Expert",
              language: "English, Bengali",
              rate: "₹20/min",
              rating: "4.8",
              img: "https://randomuser.me/api/portraits/women/68.jpg",
            },
            {
              name: "Arjun Sharma",
              specialty: "Career Guidance, Numerology",
              language: "Hindi, Tamil",
              rate: "₹12/min",
              rating: "4.6",
              img: "https://randomuser.me/api/portraits/men/76.jpg",
            },
          ].map((p) => (
            <div
              key={p.name}
              className="rounded-2xl border-2 border-yellow-300/60 p-5 bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:shadow-2xl hover:-translate-y-1 hover:border-yellow-400/80"
            >
              <div className="flex gap-4">
                <img
                  src={p.img}
                  alt={p.name}
                  className="w-20 h-20 rounded-full object-cover border-2 border-yellow-500"
                />
                <div>
                  <h3 className="font-bold text-lg text-yellow-700">
                    {p.name}
                  </h3>
                  <p className="text-sm text-brown-700">{p.specialty}</p>
                  <p className="text-sm text-brown-600">Languages: {p.language}</p>
                  <p className="text-sm font-semibold text-green-700">{p.rate}</p>
                  <p className="text-sm text-yellow-500">⭐ {p.rating}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-3">
                <button className="flex-1 rounded-lg bg-yellow-600 text-white px-4 py-2 hover:bg-yellow-700">
                  Chat
                </button>
                <button className="flex-1 rounded-lg border border-yellow-600 text-yellow-600 px-4 py-2 hover:bg-yellow-50">
                  Call
                </button>
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
                  <div className="text-yellow-500 text-sm">★★★★★</div>
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
            className="inline-flex items-center rounded-xl bg-green-500 px-6 py-3 text-white font-semibold shadow hover:bg-green-400 transition"
          >
            View All Products
          </Link>
        </div>
      </Section>
      <Section className="py-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>WHY ASTROLOGY? Astrology Reveals the Will of God</h2>
        <p className="text-brown-800 mb-4">
          Have you ever felt that things in life sometimes happen at just the right time, like someone is silently guiding you? Astrology helps us understand this. It shows how God’s energy flows through planets and stars, shaping our daily lives.
        </p>
        <p className="text-brown-800 mb-4">
          This old and trusted knowledge explains that nothing is random; everything has a reason. The stars often hold clues about our purpose and future. Many people today feel unsure about life choices, but astrology offers direction.
        </p>
        <p className="text-brown-800 mb-8">
          It connects our daily worries to higher wisdom. By learning to read signs from the universe, we can walk in tune with God’s plan. For years, astrology has helped people make better decisions in love, work, family, and their spiritual journey.
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-brown-900">How does Online Astrology Consultation & Services Work?</h3>
        <ol className="space-y-3 list-decimal pl-6 text-brown-800">
          <li>Online astrology consultation brings ancient astrological wisdom right to your phone or computer. You can get divine guidance anytime you need it, right from your home.</li>
          <li>Using your birth details like date, time, and place, professional astrologers prepare a special chart. This chart helps them understand your life's journey as per God's plan.</li>
          <li>Apps and platforms connect you with experienced astrologers. Choose chat, call, or video—whatever feels right for you.</li>
          <li>Many websites also offer free predictions so you can begin your spiritual journey easily at no cost.</li>
          <li>In the session, your astrologer studies your birth chart and current planetary placements to share future insights.</li>
          <li>These platforms also provide free daily horoscope readings to help you stay in sync with cosmic energy.</li>
          <li>The best part? It’s simple and convenient. You can get guidance without travelling, and some sessions are recorded for later.</li>
        </ol>

        <h3 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-brown-900">Why Should You Choose an Online Astrologer?</h3>
        <p className="text-brown-800 mb-4">
          Online astrologers bring ancient wisdom with modern convenience—easy access, pocket‑friendly pricing, and verified expertise. You can try different astrologers, protect your privacy, and get 24×7 support, often with recordings to revisit guidance.
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-brown-900">How to Stay Updated With Daily Horoscope Predictions & Zodiac Signs?</h3>
        <p className="text-brown-800 mb-4">Daily horoscopes reveal how today’s cosmic movements influence your sign—helping you make better choices and avoid small troubles.</p>
        <ul className="list-disc pl-6 space-y-2 text-brown-800 mb-8">
          <li>12 zodiac signs react differently to planetary shifts. Knowing your sun, moon, and rising gives a fuller picture.</li>
          <li>Start your day with guidance on love, career, health, and spiritual growth.</li>
          <li>Track patterns in mood and outcomes, and use weekly/monthly updates for planning.</li>
        </ul>

        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-brown-900">Why Choose Our Astrology Experts?</h3>
        <p className="text-brown-800 mb-4">
          Our certified experts blend Vedic wisdom with a modern, empathetic approach. You’ll find original spiritual items—gemstones, yantras, and puja tools—recommended with clear, safe instructions. Transparent options include chats, reports, and quick answers.
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-brown-900">Conclusion</h3>
        <p className="text-brown-800 mb-8">
          Astrology helps you align with God’s plan by reading the universe’s signs. It doesn’t remove free will—it empowers it, so your actions are wise and well‑timed.
        </p>

        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-brown-900">FAQs</h3>
        <div className="space-y-4">
          <div className="rounded-2xl border-2 border-yellow-300/60 bg-white/90 backdrop-blur-sm p-4">
            <p className="font-semibold text-brown-900">Q: Why is astrology so accurate?</p>
            <p className="text-brown-800">Because it’s based on centuries of observation linking planetary patterns with human experience. A birth chart maps energies at your exact birth moment for personalized insight.</p>
          </div>
          <div className="rounded-2xl border-2 border-yellow-300/60 bg-white/90 backdrop-blur-sm p-4">
            <p className="font-semibold text-brown-900">Q: Is astrology prediction true?</p>
            <p className="text-brown-800">Predictions indicate likely outcomes from cosmic patterns—your free will and actions shape the final result. Skilled astrologers interpret how transits interact with your chart.</p>
          </div>
          <div className="rounded-2xl border-2 border-yellow-300/60 bg-white/90 backdrop-blur-sm p-4">
            <p className="font-semibold text-brown-900">Q: How can online astrology help with the future?</p>
            <p className="text-brown-800">By analyzing transits and timing to highlight opportunities, challenges, and ideal moments for decisions—so you act in harmony with universal energy.</p>
          </div>
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