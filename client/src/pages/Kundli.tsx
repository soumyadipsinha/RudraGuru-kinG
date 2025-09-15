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

interface KundliForm {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
  gender: string;
  email: string;
}

export default function Kundli() {
  const [formData, setFormData] = useState<KundliForm>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
    email: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [kundliGenerated, setKundliGenerated] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsGenerating(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setKundliGenerated(true);
    setIsGenerating(false);
  };

  const kundliData = {
    zodiacSign: "Aries",
    moonSign: "Taurus",
    risingSign: "Gemini",
    planetaryPositions: [
      { planet: "Sun", sign: "Aries", house: "1st", degree: "15°" },
      { planet: "Moon", sign: "Taurus", house: "2nd", degree: "8°" },
      { planet: "Mars", sign: "Leo", house: "5th", degree: "22°" },
      { planet: "Mercury", sign: "Pisces", house: "12th", degree: "3°" },
      { planet: "Jupiter", sign: "Sagittarius", house: "9th", degree: "18°" },
      { planet: "Venus", sign: "Aquarius", house: "11th", degree: "25°" },
      { planet: "Saturn", sign: "Capricorn", house: "10th", degree: "12°" }
    ],
    houses: [
      { house: "1st House", sign: "Aries", meaning: "Personality, Appearance" },
      { house: "2nd House", sign: "Taurus", meaning: "Wealth, Family" },
      { house: "3rd House", sign: "Gemini", meaning: "Communication, Siblings" },
      { house: "4th House", sign: "Cancer", meaning: "Home, Mother" },
      { house: "5th House", sign: "Leo", meaning: "Children, Creativity" },
      { house: "6th House", sign: "Virgo", meaning: "Health, Service" },
      { house: "7th House", sign: "Libra", meaning: "Marriage, Partnership" },
      { house: "8th House", sign: "Scorpio", meaning: "Transformation, Occult" },
      { house: "9th House", sign: "Sagittarius", meaning: "Higher Learning, Philosophy" },
      { house: "10th House", sign: "Capricorn", meaning: "Career, Father" },
      { house: "11th House", sign: "Aquarius", meaning: "Friends, Gains" },
      { house: "12th House", sign: "Pisces", meaning: "Spirituality, Losses" }
    ]
  };

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
            Free Kundli Generation
          </h1>
          <p className="text-xl text-brown-800 max-w-3xl mx-auto">
            Generate your detailed birth chart (Kundli) for free. Get insights into your personality, 
            career, relationships, and life path based on Vedic astrology.
          </p>
        </div>
      </Section>

      {!kundliGenerated ? (
        /* Kundli Form */
        <Section className="pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl border border-yellow-400 bg-white p-8">
              <h2 className={`text-2xl font-bold mb-6 ${gradHead}`}>Birth Details</h2>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-brown-900 mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter your full name"
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-brown-900 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      type="date"
                      id="dateOfBirth"
                      name="dateOfBirth"
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                  <div>
                    <label htmlFor="timeOfBirth" className="block text-sm font-medium text-brown-900 mb-2">
                      Time of Birth *
                    </label>
                    <input
                      type="time"
                      id="timeOfBirth"
                      name="timeOfBirth"
                      value={formData.timeOfBirth}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div>
                  <label htmlFor="placeOfBirth" className="block text-sm font-medium text-brown-900 mb-2">
                    Place of Birth *
                  </label>
                  <input
                    type="text"
                    id="placeOfBirth"
                    name="placeOfBirth"
                    value={formData.placeOfBirth}
                    onChange={handleInputChange}
                    placeholder="City, State, Country"
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div className="grid gap-4 md:grid-cols-2">
                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-brown-900 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brown-900 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      placeholder="your@email.com"
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div className="bg-yellow-50 p-4 rounded-xl">
                  <h3 className="font-semibold text-brown-900 mb-2">Important Notes:</h3>
                  <ul className="text-sm text-brown-700 space-y-1">
                    <li>• Accurate birth time is crucial for precise calculations</li>
                    <li>• If birth time is unknown, use 12:00 PM as default</li>
                    <li>• Birth place should be as specific as possible</li>
                    <li>• Your data is secure and will not be shared</li>
                  </ul>
                </div>

                <button
                  type="submit"
                  disabled={isGenerating}
                  className={`w-full py-4 rounded-xl font-semibold text-lg transition-all ${
                    isGenerating
                      ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                      : "bg-yellow-500 text-brown-900 hover:bg-yellow-400 shadow-lg hover:shadow-xl"
                  }`}
                >
                  {isGenerating ? "Generating Kundli..." : "Generate Free Kundli"}
                </button>
              </form>
            </div>
          </div>
        </Section>
      ) : (
        /* Kundli Results */
        <Section className="pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-green-600 text-2xl">✓</span>
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${gradHead}`}>Kundli Generated Successfully!</h2>
              <p className="text-brown-600">Here's your detailed birth chart analysis</p>
            </div>

            {/* Basic Information */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">♈</div>
                <h3 className="font-bold text-brown-900">Zodiac Sign</h3>
                <p className="text-brown-600">{kundliData.zodiacSign}</p>
              </div>
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">🌙</div>
                <h3 className="font-bold text-brown-900">Moon Sign</h3>
                <p className="text-brown-600">{kundliData.moonSign}</p>
              </div>
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">⬆️</div>
                <h3 className="font-bold text-brown-900">Rising Sign</h3>
                <p className="text-brown-600">{kundliData.risingSign}</p>
              </div>
            </div>

            {/* Planetary Positions */}
            <div className="rounded-2xl border border-yellow-400 bg-white p-8 mb-8">
              <h3 className={`text-2xl font-bold mb-6 ${gradHead}`}>Planetary Positions</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {kundliData.planetaryPositions.map((planet, index) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-xl">
                    <div className="flex justify-between items-center">
                      <div>
                        <h4 className="font-semibold text-brown-900">{planet.planet}</h4>
                        <p className="text-brown-600">{planet.sign} • {planet.house}</p>
                      </div>
                      <div className="text-yellow-600 font-bold">{planet.degree}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Houses */}
            <div className="rounded-2xl border border-yellow-400 bg-white p-8 mb-8">
              <h3 className={`text-2xl font-bold mb-6 ${gradHead}`}>Houses Analysis</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {kundliData.houses.map((house, index) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-xl">
                    <h4 className="font-semibold text-brown-900 mb-1">{house.house}</h4>
                    <p className="text-brown-600 text-sm mb-2">{house.sign}</p>
                    <p className="text-brown-700 text-xs">{house.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-yellow-500 text-brown-900 rounded-xl font-semibold hover:bg-yellow-400 transition">
                Download PDF
              </button>
              <button className="px-6 py-3 border border-yellow-400 text-yellow-600 rounded-xl font-semibold hover:bg-yellow-50 transition">
                Share Kundli
              </button>
              <Link
                to="/astrologers"
                className="px-6 py-3 border border-yellow-400 text-yellow-600 rounded-xl font-semibold hover:bg-yellow-50 transition text-center"
              >
                Get Detailed Analysis
              </Link>
            </div>
          </div>
        </Section>
      )}

      {/* Features Section */}
      <Section className="pb-16">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${gradHead}`}>
          What You Get in Your Kundli
        </h2>
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-4">🌟</div>
            <h3 className="font-bold text-brown-900 mb-2">Planetary Positions</h3>
            <p className="text-brown-600">Detailed analysis of all planets and their positions in your birth chart</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-4">🏠</div>
            <h3 className="font-bold text-brown-900 mb-2">House Analysis</h3>
            <p className="text-brown-600">Complete breakdown of all 12 houses and their significance in your life</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-4">💫</div>
            <h3 className="font-bold text-brown-900 mb-2">Zodiac Signs</h3>
            <p className="text-brown-600">Your Sun, Moon, and Rising signs with detailed interpretations</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-4">📊</div>
            <h3 className="font-bold text-brown-900 mb-2">Life Predictions</h3>
            <p className="text-brown-600">Insights into career, relationships, health, and financial prospects</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-4">💎</div>
            <h3 className="font-bold text-brown-900 mb-2">Gemstone Recommendations</h3>
            <p className="text-brown-600">Personalized gemstone suggestions based on your planetary positions</p>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
            <div className="text-4xl mb-4">🔮</div>
            <h3 className="font-bold text-brown-900 mb-2">Remedies</h3>
            <p className="text-brown-600">Vedic remedies and mantras to enhance positive planetary influences</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${gradHead}`}>Need Expert Interpretation?</h3>
          <p className="text-brown-800 mb-6">
            Get detailed analysis and personalized guidance from our certified astrologers. 
            Understand the deeper meanings and implications of your birth chart.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/astrologers"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
            >
              Consult an Astrologer
            </Link>
            <Link
              to="/services"
              className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
