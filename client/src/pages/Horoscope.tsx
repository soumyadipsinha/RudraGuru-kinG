import { useState } from "react";
import { Link } from "react-router-dom";
import { Palette, Hash, Calendar, Gem, Sparkles, Star } from "lucide-react";

// Gradient heading
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const ZODIAC_SIGNS = [
  { name: "Aries", date: "Mar 21 - Apr 19", symbol: "♈", color: "bg-red-500" },
  { name: "Taurus", date: "Apr 20 - May 20", symbol: "♉", color: "bg-yellow-500" },
  { name: "Gemini", date: "May 21 - Jun 20", symbol: "♊", color: "bg-yellow-500" },
  { name: "Cancer", date: "Jun 21 - Jul 22", symbol: "♋", color: "bg-blue-500" },
  { name: "Leo", date: "Jul 23 - Aug 22", symbol: "♌", color: "bg-orange-500" },
  { name: "Virgo", date: "Aug 23 - Sep 22", symbol: "♍", color: "bg-purple-500" },
  { name: "Libra", date: "Sep 23 - Oct 22", symbol: "♎", color: "bg-pink-500" },
  { name: "Scorpio", date: "Oct 23 - Nov 21", symbol: "♏", color: "bg-red-600" },
  { name: "Sagittarius", date: "Nov 22 - Dec 21", symbol: "♐", color: "bg-indigo-500" },
  { name: "Capricorn", date: "Dec 22 - Jan 19", symbol: "♑", color: "bg-gray-600" },
  { name: "Aquarius", date: "Jan 20 - Feb 18", symbol: "♒", color: "bg-cyan-500" },
  { name: "Pisces", date: "Feb 19 - Mar 20", symbol: "♓", color: "bg-teal-500" }
];

const HOROSCOPE_PERIODS = ["Today", "Tomorrow", "This Week", "This Month", "This Year"];

export default function Horoscope() {
  const [selectedSign, setSelectedSign] = useState("Aries");
  const [selectedPeriod, setSelectedPeriod] = useState("Today");
  const [userBirthDate, setUserBirthDate] = useState("");

  interface DailySection { title: string; body: string; }
  interface DailyHoroscope { sections: DailySection[]; lucky: string; }

  const getDaily = (sign: string): DailyHoroscope => {
    if (sign === "Aries") {
      return {
        lucky: "Lucky numbers 3, 9, 21. Best hours: afternoon. Colors: red, orange.",
        sections: [
          { title: "Overview", body: "Aries, the pioneering fire sign ruled by Mars, embodies courage, leadership, and boundless energy. Your natural enthusiasm drives bold beginnings and decisive action today." },
          { title: "Love & Relationships", body: "Romantic sparks ignite through confident expression and spontaneous gestures. Singles attract those who admire your authenticity; couples deepen bonds via shared adventure." },
          { title: "Personal Life", body: "Powerful opportunities for reinvention appear. Make choices that align with your true self and watch growth accelerate." },
          { title: "Career & Finance", body: "Breakthroughs arrive through initiative. Showcase leadership on challenging tasks and leverage key networking moments this evening." },
          { title: "Health & Wellness", body: "Midday energy peaks—ideal for vigorous workouts. Hydrate and favor strength‑building routines." },
          { title: "Emotions & Mind", body: "Passion runs high; use direct communication to resolve issues. Channel intensity into constructive action or creativity." },
          { title: "Lucky Insights", body: "Fortune favors competitive settings and new ventures. Trust courageous instincts." },
          { title: "Travel & Movement", body: "Short, spontaneous trips are favored. Explore nearby routes and opportunities." },
          { title: "Remedies", body: "Wear red or orange; carry carnelian; chant 'Om Angarakaya Namaha'; exercise at sunrise." }
        ]
      };
    }
    if (sign === "Taurus") {
      return {
        lucky: "Lucky numbers 6, 15, 24. Best window 3‑5 PM. Colors: green, pink.",
        sections: [
          { title: "Overview", body: "Taurus, Venus blesses stability, comfort, and steady progress today." },
          { title: "Love & Relationships", body: "Nurturing connection grows through simple shared pleasures and sincere dialogue." },
          { title: "Personal Life", body: "Focus on strong foundations; patient effort shows tangible results." },
          { title: "Career & Finance", body: "Consistency and practical solutions win recognition. Lunch networking helps." },
          { title: "Health & Wellness", body: "Keep routine steady; soothe neck/throat; herbal teas support balance." },
          { title: "Emotions & Mind", body: "Gentle attention to family matters restores peace." },
          { title: "Lucky Insights", body: "Practical choices over speculation; harmony brings fortune." },
          { title: "Travel & Movement", body: "Choose leisurely routes and nature‑rich stops." },
          { title: "Remedies", body: "Wear earthy greens; carry rose quartz; chant 'Om Shukraya Namaha'." }
        ]
      };
    }
    // Generic template for other signs (can be expanded similarly)
    return {
      lucky: "Fortune favors calm focus and clear communication today.",
      sections: [
        { title: "Overview", body: `${sign} energy supports progress through mindful action and balance.` },
        { title: "Love & Relationships", body: "Honest conversation strengthens bonds; singles connect through shared values." },
        { title: "Personal Life", body: "Small disciplined steps produce meaningful gains." },
        { title: "Career & Finance", body: "Collaborative efforts and thoughtful planning bring steady results." },
        { title: "Health & Wellness", body: "Favor routine movement, hydration, and restorative sleep." },
        { title: "Emotions & Mind", body: "Name feelings clearly; channel them into creative or practical outlets." },
        { title: "Lucky Insights", body: "Keep decisions simple; align with long‑term intent." },
        { title: "Travel & Movement", body: "Short local trips run smoothly; avoid unnecessary rush." },
        { title: "Remedies", body: "Light incense, wear your sign color, and practice 5 minutes of breathwork." }
      ]
    };
  };

  const getRatingStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-yellow-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const horoscopeDaily = getDaily(selectedSign);

  return (
    <main className="relative bg-transparent overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
        <div className="absolute left-12 top-28 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
        @keyframes twinkle{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.08);} }
      `}</style>

      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="text-center">
          <h1 className={`text-4xl sm:text-6xl font-extrabold mb-6 ${gradHead}`}>
            Daily Horoscope
          </h1>
          <p className="text-xl text-brown-800 max-w-3xl mx-auto">
            Discover what the stars have in store for you today. Get personalized horoscope predictions 
            based on your zodiac sign and planetary positions.
          </p>
        </div>
      </Section>

      {/* Birth Date Input */}
      <Section className="pb-8">
        <div className="max-w-md mx-auto">
          <div className="rounded-2xl border border-yellow-400 bg-white p-6">
            <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Find Your Zodiac Sign</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Date of Birth</label>
                <input
                  type="date"
                  value={userBirthDate}
                  onChange={(e) => setUserBirthDate(e.target.value)}
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <button className="w-full rounded-xl bg-yellow-500 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">
                Get My Horoscope
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Zodiac Signs Grid */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${gradHead}`}>
          Choose Your Zodiac Sign
        </h2>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {ZODIAC_SIGNS.map((sign) => (
            <button
              key={sign.name}
              onClick={() => setSelectedSign(sign.name)}
              className={`p-4 rounded-2xl border transition-all ${
                selectedSign === sign.name
                  ? "border-yellow-500 bg-yellow-50 ring-2 ring-yellow-300"
                  : "border-yellow-400 bg-white hover:bg-yellow-50"
              }`}
            >
              <div className="text-center">
                <div className={`w-12 h-12 ${sign.color} rounded-full flex items-center justify-center mx-auto mb-3 text-white text-2xl`}>
                  {sign.symbol}
                </div>
                <h3 className="font-bold text-brown-900">{sign.name}</h3>
                <p className="text-sm text-brown-600">{sign.date}</p>
              </div>
            </button>
          ))}
        </div>
      </Section>

      {/* Period Selection */}
      <Section className="pb-8">
        <div className="flex flex-wrap justify-center gap-3">
          {HOROSCOPE_PERIODS.map((period) => (
            <button
              key={period}
              onClick={() => setSelectedPeriod(period)}
              className={`px-6 py-3 rounded-full font-medium transition-all ${
                selectedPeriod === period
                  ? "bg-yellow-500 text-brown-900"
                  : "bg-white border border-yellow-400 text-brown-800 hover:bg-yellow-50"
              }`}
            >
              {period}
            </button>
          ))}
        </div>
      </Section>

      {/* Horoscope Content */}
      <Section className="pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="rounded-2xl border border-yellow-400 bg-white p-8">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <div className="w-16 h-16 bg-yellow-500 rounded-full flex items-center justify-center text-white text-3xl">
                  {ZODIAC_SIGNS.find(s => s.name === selectedSign)?.symbol}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-brown-900">{selectedSign}</h2>
                  <p className="text-brown-600">{selectedPeriod} Horoscope</p>
                </div>
              </div>
            </div>

            {/* Detailed Sections */}
            <div className="space-y-6">
              {horoscopeDaily.sections.map((s) => (
                <div key={s.title} className="bg-yellow-50 p-6 rounded-xl">
                  <h3 className={`text-xl font-bold mb-2 ${gradHead}`}>{s.title}</h3>
                  <p className="text-brown-800 leading-relaxed">{s.body}</p>
                </div>
              ))}
              <div className="bg-white border border-yellow-200 p-6 rounded-xl">
                <h4 className="font-semibold text-brown-900 mb-1">Lucky Insights</h4>
                <p className="text-brown-800">{horoscopeDaily.lucky}</p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Lucky Elements */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${gradHead}`}>
          Lucky Elements for {selectedSign}
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <Palette className="w-8 h-8 text-pink-500 mx-auto mb-3" />
            <h3 className="font-bold text-brown-900 mb-2">Lucky Color</h3>
            <p className="text-brown-600">Red & Gold</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <Hash className="w-8 h-8 text-blue-500 mx-auto mb-3" />
            <h3 className="font-bold text-brown-900 mb-2">Lucky Number</h3>
            <p className="text-brown-600">1, 8, 17</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <Calendar className="w-8 h-8 text-yellow-500 mx-auto mb-3" />
            <h3 className="font-bold text-brown-900 mb-2">Lucky Day</h3>
            <p className="text-brown-600">Tuesday</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <Gem className="w-8 h-8 text-purple-500 mx-auto mb-3" />
            <h3 className="font-bold text-brown-900 mb-2">Lucky Gemstone</h3>
            <p className="text-brown-600">Ruby</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${gradHead}`}>Want More Detailed Predictions?</h3>
          <p className="text-brown-800 mb-6">
            Get personalized horoscope readings, birth chart analysis, and detailed predictions from our expert astrologers.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/astrologers"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
            >
              Consult an Astrologer
            </Link>
            <Link
              to="/kundli"
              className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
            >
              Generate Birth Chart
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
