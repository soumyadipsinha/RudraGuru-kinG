import { useState } from "react";
import { Link } from "react-router-dom";

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
  { name: "Taurus", date: "Apr 20 - May 20", symbol: "♉", color: "bg-green-500" },
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

  const getHoroscopeData = (sign: string, period: string) => {
    const horoscopes = {
      Aries: {
        Today: {
          overall: 4,
          love: 3,
          career: 5,
          health: 4,
          finance: 3,
          text: "Today brings opportunities for leadership and new beginnings. Your energy is high, making it perfect for starting new projects. In love, be patient with your partner. Career prospects look promising with potential recognition coming your way."
        },
        Tomorrow: {
          overall: 3,
          love: 4,
          career: 4,
          health: 3,
          finance: 4,
          text: "Tomorrow requires more patience and careful planning. Avoid impulsive decisions, especially in financial matters. Your relationships will benefit from open communication."
        },
        "This Week": {
          overall: 4,
          love: 4,
          career: 4,
          health: 4,
          finance: 3,
          text: "This week brings a mix of challenges and opportunities. Focus on your goals and don't let minor setbacks discourage you. Mid-week is particularly favorable for important decisions."
        }
      }
    };
    
    return horoscopes[sign as keyof typeof horoscopes]?.[period as keyof typeof horoscopes.Aries] || {
      overall: 3,
      love: 3,
      career: 3,
      health: 3,
      finance: 3,
      text: "Your horoscope is being prepared. Please check back soon for detailed predictions."
    };
  };

  const getRatingStars = (rating: number) => {
    return "★".repeat(rating) + "☆".repeat(5 - rating);
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return "text-green-500";
    if (rating >= 3) return "text-yellow-500";
    return "text-red-500";
  };

  const horoscopeData = getHoroscopeData(selectedSign, selectedPeriod);

  return (
    <main className="relative bg-transparent overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
        <div className="absolute left-12 top-28 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]">✦</div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]">✧</div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]">✶</div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
        @keyframes twinkle{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.08);} }
      `}</style>

      {/* Hero Section */}
      <Section className="pt-28 pb-12">
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

            {/* Overall Rating */}
            <div className="text-center mb-8">
              <div className="text-4xl mb-2">
                <span className={getRatingColor(horoscopeData.overall)}>
                  {getRatingStars(horoscopeData.overall)}
                </span>
              </div>
              <p className="text-brown-600">Overall Rating: {horoscopeData.overall}/5</p>
            </div>

            {/* Detailed Ratings */}
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4 mb-8">
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-2xl mb-2">💕</div>
                <h4 className="font-semibold text-brown-900">Love</h4>
                <div className={`text-lg ${getRatingColor(horoscopeData.love)}`}>
                  {getRatingStars(horoscopeData.love)}
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-2xl mb-2">💼</div>
                <h4 className="font-semibold text-brown-900">Career</h4>
                <div className={`text-lg ${getRatingColor(horoscopeData.career)}`}>
                  {getRatingStars(horoscopeData.career)}
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-2xl mb-2">🏥</div>
                <h4 className="font-semibold text-brown-900">Health</h4>
                <div className={`text-lg ${getRatingColor(horoscopeData.health)}`}>
                  {getRatingStars(horoscopeData.health)}
                </div>
              </div>
              <div className="text-center p-4 bg-yellow-50 rounded-xl">
                <div className="text-2xl mb-2">💰</div>
                <h4 className="font-semibold text-brown-900">Finance</h4>
                <div className={`text-lg ${getRatingColor(horoscopeData.finance)}`}>
                  {getRatingStars(horoscopeData.finance)}
                </div>
              </div>
            </div>

            {/* Horoscope Text */}
            <div className="bg-yellow-50 p-6 rounded-xl">
              <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Your Prediction</h3>
              <p className="text-brown-800 leading-relaxed text-lg">{horoscopeData.text}</p>
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
            <div className="text-4xl mb-3">🎨</div>
            <h3 className="font-bold text-brown-900 mb-2">Lucky Color</h3>
            <p className="text-brown-600">Red & Gold</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-3">🔢</div>
            <h3 className="font-bold text-brown-900 mb-2">Lucky Number</h3>
            <p className="text-brown-600">1, 8, 17</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-3">📅</div>
            <h3 className="font-bold text-brown-900 mb-2">Lucky Day</h3>
            <p className="text-brown-600">Tuesday</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-3">💎</div>
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
