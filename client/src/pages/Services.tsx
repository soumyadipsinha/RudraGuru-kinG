import { Link } from "react-router-dom";
import serviceLogo from "../assets/serviceLogo.png";

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

export default function Services() {
  return (
    <main className="relative bg-white overflow-hidden">
      {/* Animated browns + astrology background */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        {/* Soft brown radial blobs */}
        <div className="absolute -top-24 -left-24 h-80 w-80 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]"></div>
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]"></div>
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]"></div>

        {/* Constellation-like faint dots/lines grid */}
        <svg className="absolute inset-0 h-full w-full opacity-30">
          <defs>
            <pattern id="astroGrid" x="0" y="0" width="120" height="120" patternUnits="userSpaceOnUse">
              <circle cx="6" cy="6" r="1.2" fill="rgba(120,72,32,0.25)" />
              <circle cx="60" cy="30" r="1" fill="rgba(120,72,32,0.22)" />
              <circle cx="100" cy="80" r="1.2" fill="rgba(120,72,32,0.25)" />
              <line x1="6" y1="6" x2="60" y2="30" stroke="rgba(179,120,58,0.18)" strokeWidth="0.6" />
              <line x1="60" y1="30" x2="100" y2="80" stroke="rgba(179,120,58,0.18)" strokeWidth="0.6" />
            </pattern>
            <linearGradient id="fadeMask" x1="0" x2="0" y1="0" y2="1">
              <stop offset="0%" stopColor="white" stopOpacity="0.55" />
              <stop offset="100%" stopColor="white" stopOpacity="0.35" />
            </linearGradient>
            <mask id="gridMask">
              <rect x="0" y="0" width="100%" height="100%" fill="url(#fadeMask)" />
            </mask>
          </defs>
          <rect x="0" y="0" width="100%" height="100%" fill="url(#astroGrid)" mask="url(#gridMask)"></rect>
        </svg>

        {/* Gentle twinkling stars */}
        <div className="absolute left-10 top-24 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]">✦</div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]">✧</div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]">✶</div>
      </div>

      {/* Inline keyframes */}
      <style>{`
@keyframes float1 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(12px) translateX(8px); } }
@keyframes float2 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(-10px) translateX(-12px); } }
@keyframes float3 { 0%,100% { transform: translateY(0) translateX(0); } 50% { transform: translateY(14px) translateX(-10px); } }
@keyframes twinkle { 0%,100% { opacity: 0.25; transform: scale(1); } 50% { opacity: 0.7; transform: scale(1.08); } }
      `}</style>

      {/* Intro */}
      <Section className="pt-24 pb-5">
        <div className="grid gap-8 md:grid-cols-2 items-center">
          <div>
            <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${gradHead}`}>Our Services</h1>
            <p className="text-brown-800">
              Expert astrology guidance, authentic remedies, and modern tools—crafted to help with clarity,
              prosperity, relationships, health, and spiritual growth. Explore kundli, horoscope, matchmaking,
              Vastu, and gemstone guidance—all in one trusted platform.
            </p>
            <div className="mt-6">
              <Link
                to="/astrologers"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow transition-all duration-300 hover:bg-white hover:text-brown-900 hover:border hover:border-yellow-500"
              >
                Consult with Astrologer
              </Link>
            </div>
          </div>
          <div className="flex justify-center">
            <img
              src={serviceLogo}
              alt="Astrology Services"
              className="w-full max-w-md rounded-2xl object-cover transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </Section>

      {/* Free Kundli */}
      <Section className="py-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Free Kundli</h2>
        <div className="rounded-2xl border border-yellow-400 p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <label className="text-sm text-brown-700">Full Name</label>
              <input type="text" className="w-full rounded-md border border-brown-300 p-3" placeholder="Enter your name" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brown-700">Date of Birth</label>
              <input type="date" className="w-full rounded-md border border-brown-300 p-3" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brown-700">Time of Birth</label>
              <input type="time" className="w-full rounded-md border border-brown-300 p-3" />
            </div>
            <div className="space-y-2">
              <label className="text-sm text-brown-700">Place of Birth</label>
              <input type="text" className="w-full rounded-md border border-brown-300 p-3" placeholder="City, Country" />
            </div>
          </div>
          <div className="mt-5">
            <button className="w-full rounded-xl bg-yellow-500 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">
              Generate Free Kundli
            </button>
          </div>
        </div>
      </Section>

      {/* Horoscope */}
      <Section className="py-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Daily / Weekly / Monthly Horoscope</h2>
        <div className="grid md:grid-cols-2 gap-6">
          {[
            { title: "Aries", range: "Mar 21 – Apr 19", text: "Great opportunities await you today!" },
            { title: "Taurus", range: "Apr 20 – May 20", text: "Focus on financial planning today." },
            { title: "Gemini", range: "May 21 – Jun 20", text: "Communication brings success." },
            { title: "Cancer", range: "Jun 21 – Jul 22", text: "Family matters need attention." },
          ].map((c) => (
            <div
              key={c.title}
              className="rounded-2xl border border-yellow-400 p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex items-start justify-between">
                <h3 className="text-2xl font-semibold text-brown-900">{c.title}</h3>
                <span className="text-xs rounded-full bg-brown-50 border border-brown-200 px-3 py-1 text-brown-700">{c.range}</span>
              </div>
              <p className="mt-3 text-brown-800">{c.text}</p>
              <div className="mt-4 flex gap-2">
                <Link to="/horoscope/daily" className="rounded-full border border-brown-300 px-3 py-1 text-sm text-brown-800 hover:bg-brown-50">Daily</Link>
                <Link to="/horoscope/weekly" className="rounded-full border border-brown-300 px-3 py-1 text-sm text-brown-800 hover:bg-brown-50">Weekly</Link>
                <Link to="/horoscope/monthly" className="rounded-full border border-brown-300 px-3 py-1 text-sm text-brown-800 hover:bg-brown-50">Monthly</Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Matchmaking */}
      <Section className="py-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Matchmaking (Kundli Milan)</h2>

        <div className="grid md:grid-cols-2 gap-6">
          {/* Boy's Details */}
          <div className="rounded-2xl border border-yellow-400 p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-yellow-500 px-4 py-1 text-brown-900 font-semibold">Boy's Detail</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-brown-700">Name</label>
                <input className="w-full rounded-md border border-brown-300 p-3" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-sm text-brown-700">Date of Birth</label>
                <input type="date" className="w-full rounded-md border border-brown-300 p-3" />
              </div>
              <div>
                <label className="text-sm text-brown-700">Time of Birth</label>
                <input type="time" className="w-full rounded-md border border-brown-300 p-3" />
              </div>
              <div>
                <label className="text-sm text-brown-700">Birth Place</label>
                <input className="w-full rounded-md border border-brown-300 p-3" placeholder="City, State, Country" />
              </div>
            </div>
          </div>

          {/* Girl's Details */}
          <div className="rounded-2xl border border-yellow-400 p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="mb-4">
              <span className="inline-block rounded-full bg-yellow-500 px-4 py-1 text-brown-900 font-semibold">Girl's Detail</span>
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm text-brown-700">Name</label>
                <input className="w-full rounded-md border border-brown-300 p-3" placeholder="Enter name" />
              </div>
              <div>
                <label className="text-sm text-brown-700">Date of Birth</label>
                <input type="date" className="w-full rounded-md border border-brown-300 p-3" />
              </div>
              <div>
                <label className="text-sm text-brown-700">Time of Birth</label>
                <input type="time" className="w-full rounded-md border border-brown-300 p-3" />
              </div>
              <div>
                <label className="text-sm text-brown-700">Birth Place</label>
                <input className="w-full rounded-md border border-brown-300 p-3" placeholder="City, State, Country" />
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6">
          <button className="w-full rounded-xl bg-yellow-500 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">
            Match Kundli
          </button>
        </div>
      </Section>

      {/* Vastu Shastra */}
      <Section className="py-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Vastu Shastra Consultation</h2>
        <p className="text-brown-800 mb-4">
          Optimize homes and workplaces with Vastu principles. Get personalized layouts, remedies, and directions to
          enhance harmony, health, and prosperity—guided by experienced astrologers.
        </p>
        <div className="grid md:grid-cols-3 gap-6">
          {[
            { name: "Acharya Vivek Sharma", skill: "Vastu, Vedic Astrology", exp: "18 yrs", img: "https://avatar-placeholder.iran.liara.run/public/21" },
            { name: "Dr. Meera Iyer", skill: "Vastu, Numerology", exp: "12 yrs", img: "https://avatar-placeholder.iran.liara.run/public/22" },
            { name: "Pandit Suresh Rao", skill: "Vastu, KP Astrology", exp: "16 yrs", img: "https://avatar-placeholder.iran.liara.run/public/23" },
          ].map((a) => (
            <div
              key={a.name}
              className="rounded-2xl border border-yellow-400 p-5 bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="flex items-center gap-4">
                <img src={a.img} alt={a.name} className="h-14 w-14 rounded-full object-cover" />
                <div>
                  <h3 className="font-semibold text-brown-900">{a.name}</h3>
                  <p className="text-sm text-brown-700">{a.skill}</p>
                  <p className="text-sm text-brown-700">Exp: {a.exp}</p>
                </div>
              </div>
              <div className="mt-4 flex gap-2">
                <Link to="/chat" className="flex-1 rounded-md bg-yellow-500 py-2 text-center text-brown-900 font-semibold hover:bg-yellow-400">Chat</Link>
                <Link to="/call" className="flex-1 rounded-md border border-brown-300 py-2 text-center text-yellow-600 font-semibold">Call</Link>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* Gemstone Recommendation */}
      <Section className="py-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Gemstone Recommendation</h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: Tool and copy (no border, styled points with dark-yellow ticks) */}
          <div className="rounded-2xl p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <p className="text-brown-800">
              Gemstones carry cosmic energies that can positively impact your life.
            </p>

            <ul className="mt-4 space-y-3">
              {[
                "Attracting prosperity & wealth",
                "Balancing planetary influences",
                "Enhancing career, relationships & health",
                "Removing obstacles & negative energies",
              ].map((txt) => (
                <li key={txt} className="flex items-start gap-3">
                  <span
                    className="mt-0.5 inline-flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-yellow-600 text-white"
                    aria-hidden="true"
                  >
                    ✓
                  </span>
                  <span className="text-brown-900">{txt}</span>
                </li>
              ))}
            </ul>

            <p className="mt-4 text-brown-800">
              👉 Get your gemstone recommendation from our expert pandits!
            </p>

            <div className="mt-5 grid sm:grid-cols-2 gap-4">
              <input className="rounded-md border border-brown-300 p-3" placeholder="Full Name" />
              <input type="date" className="rounded-md border border-brown-300 p-3" />
              <input type="time" className="rounded-md border border-brown-300 p-3" />
              <input className="rounded-md border border-brown-300 p-3" placeholder="Place of Birth" />
            </div>

            {/* Buttons updated to redirect */}
            <Link to="/astrologers" className="mt-5 w-full inline-flex justify-center rounded-xl bg-yellow-500 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">
              Get Recommendation
            </Link>
            <Link to="/gemstones" className="mt-3 w-full inline-flex justify-center rounded-xl bg-yellow-500 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">
              Knows about more Gemstones
            </Link>
          </div>

          {/* Right: Designed reference table */}
          <div className="rounded-2xl border border-yellow-400 p-6 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Substitutes, Finger & Day (Reference)</h3>

            <div className="overflow-x-auto rounded-xl border border-yellow-300">
              <table className="min-w-full divide-y divide-yellow-200">
                <thead className="bg-yellow-50">
                  <tr>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-brown-900 uppercase tracking-wider">Planet</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-brown-900 uppercase tracking-wider">Main Gemstone</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-brown-900 uppercase tracking-wider">Substitutes</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-brown-900 uppercase tracking-wider">Finger to Wear</th>
                    <th className="px-4 py-3 text-left text-xs font-semibold text-brown-900 uppercase tracking-wider">Day to Wear</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-yellow-100 bg-white">
                  {[
                    ["Sun", "Ruby", "Red Garnet", "Ring Finger", "Sunday"],
                    ["Moon", "Pearl", "Moonstone", "Little Finger", "Monday"],
                    ["Mars", "Red Coral", "Carnelian", "Ring Finger", "Tuesday"],
                    ["Mercury", "Emerald", "Green Tourmaline", "Little Finger", "Wednesday"],
                    ["Jupiter", "Yellow Sapphire", "Citrine", "Index Finger", "Thursday"],
                    ["Venus", "Diamond", "White Topaz", "Middle Finger", "Friday"],
                    ["Saturn", "Blue Sapphire", "Amethyst", "Middle Finger", "Saturday"],
                    ["Rahu", "Hessonite (Gomed)", "Orange Zircon", "Middle Finger", "Saturday"],
                    ["Ketu", "Cat’s Eye", "Tiger’s Eye", "Little Finger", "Thursday"],
                  ].map((row) => (
                    <tr key={row[0]} className="hover:bg-yellow-50/60 transition">
                      {row.map((cell, idx) => (
                        <td key={idx} className="px-4 py-3 text-sm text-brown-800">{cell}</td>
                      ))}
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <p className="mt-3 text-sm text-brown-700">
              Note: This is a general reference. Final gemstones are prescribed after detailed horoscope analysis by expert astrologers.
            </p>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Need personalized guidance?</h3>
          <p className="mt-2 text-brown-800">Talk to verified astrologers for precise remedies and actionable solutions.</p>
          <div className="mt-5 flex justify-center gap-3">
            <Link to="/chat" className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-white hover:text-brown-900 hover:border hover:border-yellow-500 transition">
              Start Chat
            </Link>
            <Link to="/call" className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition">
              Call Now
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}