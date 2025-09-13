import { Link } from "react-router-dom";
import HeroLogo from "../assets/HeroLogo.png";

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
    <main className="bg-white">
      {/* Hero */}
      <Section className="pt-24 pb-20">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div className="flex justify-center">
            <img src={HeroLogo} alt="Astrology" className="w-[550px] h-[320px] object-contain" />
          </div>
          <div>
            <h1 className={`text-4xl sm:text-6xl font-extrabold leading-tight ${gradHead}`}>
              Connect with Expert Astrologers
            </h1>
            <p className="mt-5 text-brown-800">
              RUDRAGURU is a company dedicated to providing Astrology sessions or guidance,
              high-quality Rudraksha beads and certified gemstones to our customers. We believe
              in the power of these beads and gemstones to bring about positive changes in people's lives.
            </p>
            <div className="mt-7 flex flex-wrap gap-3">
              <Link
                to="/services"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-5 py-2.5 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
              >
                Explore Services
              </Link>
              <Link
                to="/chat"
                className="inline-flex items-center rounded-xl border border-brown-300 px-5 py-2.5 text-yellow-600 font-semibold hover:bg-brown-50 transition"
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
        <div className="grid md:grid-cols-3 gap-8">
          {[
            {
              title: "What We Offer",
              text: "Premium, Rudraksha beads & certified gemstones.",
              icon: "🪬",
            },
            {
              title: "Our Assurance",
              text: "Authentic, ethically sourced, and lab‑certified gemstones.",
              icon: "✅",
            },
            {
              title: "Our Vision",
              text: "Helping individuals harness gemstones and Rudraksha for health, success, and spiritual growth.",
              icon: "✨",
            },
          ].map((c) => (
            <div
              key={c.title}
              className="group relative rounded-2xl border border-yellow-400 p-6 bg-white transition-all duration-300 hover:scale-[1.03] hover:shadow-xl"
            >
              <div className="absolute -top-5 -left-5 h-12 w-12 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
                <span className="text-xl">{c.icon}</span>
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
        <div className="mt-12 grid gap-8 md:grid-cols-3">
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
              className="rounded-2xl border border-yellow-400 p-7 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:shadow-xl"
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
        <div className="rounded-2xl p-4 bg-white">
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
        <div className="mt-6 grid gap-6 md:grid-cols-2">
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
              className="rounded-2xl border border-yellow-400 p-5 bg-white transition duration-300 hover:shadow-xl hover:-translate-y-1"
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
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-5">
          {ZODIAC.map((sign) => (
            <Link
              key={sign}
              to={`/zodiac/${sign.toLowerCase()}`}
              className="group rounded-2xl border border-yellow-400 p-4 bg-white transition-transform duration-300 hover:scale-[1.03] hover:shadow-xl"
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
        <div className="grid md:grid-cols-3 gap-8">
          {[
            { name: "Anita Sharma", city: "Delhi, IN" },
            { name: "Rohit Verma", city: "Mumbai, IN" },
            { name: "Sonal Patel", city: "Ahmedabad, IN" },
          ].map((c, i) => (
            <div
              key={c.name}
              className="rounded-2xl border border-yellow-400 p-6 bg-white transition duration-300 hover:shadow-xl hover:-translate-y-1"
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

      {/* Footer CTA */}
      <Section className="py-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition duration-300 hover:shadow-xl">
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