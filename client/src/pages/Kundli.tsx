import { useState } from "react";
import { Link } from "react-router-dom";
import { Star, Sparkles, Gem, Circle, BarChart3, Home, Check, Moon, ArrowUp } from "lucide-react";

interface Person {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

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
  phone: string;
  email: string;
}

export default function Kundli() {
  const [activeTab, setActiveTab] = useState<'kundli' | 'matching'>('kundli');
  const [formData, setFormData] = useState<KundliForm>({
    name: "",
    dateOfBirth: "",
    timeOfBirth: "",
    placeOfBirth: "",
    gender: "",
    phone: "",
    email: ""
  });
  const [isGenerating, setIsGenerating] = useState(false);
  const [kundliGenerated, setKundliGenerated] = useState(false);
  const [timeHour, setTimeHour] = useState<string>("");
  const [timeMinute, setTimeMinute] = useState<string>("");
  const [timeMeridiem, setTimeMeridiem] = useState<'AM' | 'PM' | ''>("");
  const [boy, setBoy] = useState<Person>({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  const [girl, setGirl] = useState<Person>({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  const [score, setScore] = useState<number | null>(null);

  const meridiem = (t: string) => {
    if (!t) return "";
    const [hh] = t.split(":");
    const h = parseInt(hh, 10);
    if (isNaN(h)) return "";
    return h >= 12 ? "PM" : "AM";
  };

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

    // Build 24h time from hour/minute + AM/PM
    if (timeHour && timeMinute && timeMeridiem) {
      const h = parseInt(timeHour, 10) % 12 + (timeMeridiem === 'PM' ? 12 : 0);
      const hh = String(h).padStart(2, '0');
      const mm = String(parseInt(timeMinute, 10) || 0).padStart(2, '0');
      setFormData(prev => ({ ...prev, timeOfBirth: `${hh}:${mm}` }));
    }
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    setKundliGenerated(true);
    setIsGenerating(false);
  };

  const handleMatchingChange = (who: 'boy'|'girl', e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    who === 'boy' ? setBoy(prev => ({ ...prev, [name]: value })) : setGirl(prev => ({ ...prev, [name]: value }));
  };

  const calculateMatch = () => {
    // placeholder gun milan style out of 36
    const sum = (boy.name + girl.name).replace(/\s+/g, '').length + new Date(boy.dateOfBirth).getDate() + new Date(girl.dateOfBirth).getDate();
    setScore(Math.min(36, Math.max(0, (sum % 37))));
  };

  const kundliData = {
    zodiacSign: "Aries",
    moonSign: "Taurus",
    risingSign: "Gemini",
    planetaryPositions: [],
    houses: []
  };

  // Ethiopian calendar formatting (tries Intl Ethiopic calendar, falls back to ISO)
  const formatEthiopianDate = (isoDate: string) => {
    if (!isoDate) return "";
    try {
      const date = new Date(isoDate);
      const fmt = new Intl.DateTimeFormat('am-ET-u-ca-ethiopic', {
        year: 'numeric', month: 'long', day: 'numeric'
      } as Intl.DateTimeFormatOptions);
      const out = fmt.format(date);
      return out;
    } catch {
      return isoDate; // fallback
    }
  };

  // Gemstone recommendation based on zodiac sign
  const getGemstoneRecommendation = (sign: string) => {
    const map: Record<string, { name: string; image: string; desc: string }> = {
      Aries: { name: 'Red Coral (Moonga)', image: '/assets/redCoral.png', desc: 'Boosts courage and vitality for Mars-ruled Aries.' },
      Taurus: { name: 'Emerald (Panna)', image: '/assets/emerald.webp', desc: 'Enhances stability, communication, and growth.' },
      Gemini: { name: 'Emerald (Panna)', image: '/assets/emerald.webp', desc: 'Supports intellect and expression for Mercury-ruled Gemini.' },
      Cancer: { name: 'Pearl (Moti)', image: '/assets/pearl.jpg', desc: 'Calms emotions and nurtures Moon-ruled natives.' },
      Leo: { name: 'Ruby (Manik)', image: '/assets/ruby.png', desc: 'Strengthens Sun energy, leadership, and confidence.' },
      Virgo: { name: 'Emerald (Panna)', image: '/assets/emerald.webp', desc: 'Aids analytical ability and clarity.' },
      Libra: { name: 'Diamond (Heera)', image: '/assets/heera.png', desc: 'Improves harmony, relationships, and Venus energy.' },
      Scorpio: { name: 'Red Coral (Moonga)', image: '/assets/redCoral.png', desc: 'Empowers Mars energy and resilience.' },
      Sagittarius: { name: 'Yellow Sapphire (Pukhraj)', image: '/assets/sapphire-yellow.png', desc: 'Supports wisdom, prosperity, and Jupiter blessings.' },
      Capricorn: { name: 'Blue Sapphire (Neelam)', image: '/assets/sapphire-blue.png', desc: 'Enhances discipline, focus, and Saturn support.' },
      Aquarius: { name: 'Blue Sapphire (Neelam)', image: '/assets/sapphire-blue.png', desc: 'Aids innovation, discipline, and Saturn guidance.' },
      Pisces: { name: 'Yellow Sapphire (Pukhraj)', image: '/assets/sapphire-yellow.png', desc: 'Bolsters spiritual growth and Jupiter energy.' },
    };
    return map[sign] || map['Aries'];
  };

  // Western Sun Sign calculation from birth date
  const getSunSign = (isoDate: string): string => {
    if (!isoDate) return "";
    const d = new Date(isoDate + 'T00:00:00');
    if (Number.isNaN(d.getTime())) return "";
    const m = d.getUTCMonth() + 1; // 1-12
    const day = d.getUTCDate();
    // Date ranges (inclusive) for Western zodiac (approximate)
    if ((m === 3 && day >= 21) || (m === 4 && day <= 19)) return "Aries";
    if ((m === 4 && day >= 20) || (m === 5 && day <= 20)) return "Taurus";
    if ((m === 5 && day >= 21) || (m === 6 && day <= 20)) return "Gemini";
    if ((m === 6 && day >= 21) || (m === 7 && day <= 22)) return "Cancer";
    if ((m === 7 && day >= 23) || (m === 8 && day <= 22)) return "Leo";
    if ((m === 8 && day >= 23) || (m === 9 && day <= 22)) return "Virgo";
    if ((m === 9 && day >= 23) || (m === 10 && day <= 22)) return "Libra";
    if ((m === 10 && day >= 23) || (m === 11 && day <= 21)) return "Scorpio";
    if ((m === 11 && day >= 22) || (m === 12 && day <= 21)) return "Sagittarius";
    if ((m === 12 && day >= 22) || (m === 1 && day <= 19)) return "Capricorn";
    if ((m === 1 && day >= 20) || (m === 2 && day <= 18)) return "Aquarius";
    return "Pisces"; // (Feb 19–Mar 20)
  };

  // Map zodiac names to public assets as provided in /assets
  const ZODIAC_SVG_MAP: Record<string, string> = {
    Aries: "/assets/areies.svg",
    Taurus: "/assets/tauras.svg",
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

  // Title case for location
  const toTitleCase = (s: string) => s.replace(/\w\S*/g, (txt) => txt.charAt(0).toUpperCase() + txt.slice(1).toLowerCase());

  // Build consistent positions and houses from inputs
  const sun = getSunSign(formData.dateOfBirth) || kundliData.zodiacSign;
  const computedHouses = [
    { house: "1st House", sign: kundliData.risingSign, meaning: "Personality, Appearance" },
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
  ];

  const computedPositions = [
    { planet: "Sun", sign: sun, house: "—", degree: "" },
    { planet: "Moon", sign: kundliData.moonSign, house: "—", degree: "" },
    { planet: "Mars", sign: "Leo", house: "—", degree: "" },
    { planet: "Mercury", sign: sun, house: "—", degree: "" },
    { planet: "Jupiter", sign: "Sagittarius", house: "—", degree: "" },
    { planet: "Venus", sign: "Capricorn", house: "—", degree: "" },
    { planet: "Saturn", sign: "Aquarius", house: "—", degree: "" }
  ];

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
            Kundli & Matching
          </h1>
          <p className="text-xl text-brown-800 max-w-3xl mx-auto">
            Generate your detailed birth chart (Kundli) for free and check compatibility with your partner
          </p>
        </div>
        
        {/* Tabs */}
        <div className="flex justify-center mt-8">
          <div className="flex bg-white/90 backdrop-blur-sm rounded-xl p-1 shadow-deep">
            <button
              onClick={() => setActiveTab('kundli')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'kundli'
                  ? 'bg-yellow-500 text-brown-900 shadow-sm'
                  : 'text-brown-700 hover:text-yellow-600'
              }`}
            >
              Free Kundli
            </button>
            <button
              onClick={() => setActiveTab('matching')}
              className={`px-6 py-3 rounded-lg font-semibold transition-all duration-300 ${
                activeTab === 'matching'
                  ? 'bg-yellow-500 text-brown-900 shadow-sm'
                  : 'text-brown-700 hover:text-yellow-600'
              }`}
            >
              Kundli Matching
            </button>
          </div>
        </div>
      </Section>

      {activeTab === 'kundli' && !kundliGenerated ? (
        /* Kundli Form */
        <Section className="pb-16">
          <div className="max-w-2xl mx-auto">
            <div className="rounded-2xl bg-white p-8 shadow-deep">
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
                    className="w-full rounded-xl bg-white p-3 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                    <label className="block text-sm font-medium text-brown-900 mb-2">
                      Time of Birth *
                    </label>
                    <div className="grid grid-cols-[1fr_1fr_auto] gap-2 items-center">
                      <input
                        type="number"
                        inputMode="numeric"
                        min={1}
                        max={12}
                        placeholder="HH"
                        value={timeHour}
                        onChange={(e)=>setTimeHour(e.target.value)}
                        className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                      <input
                        type="number"
                        inputMode="numeric"
                        min={0}
                        max={59}
                        placeholder="MM"
                        value={timeMinute}
                        onChange={(e)=>setTimeMinute(e.target.value)}
                        className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      />
                      <select
                        value={timeMeridiem}
                        onChange={(e)=>setTimeMeridiem(e.target.value as 'AM'|'PM')}
                        className="rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                        required
                      >
                        <option value="">AM/PM</option>
                        <option value="AM">AM</option>
                        <option value="PM">PM</option>
                      </select>
                    </div>
                    {timeHour && timeMinute && timeMeridiem && (
                      <p className="mt-1 text-xs font-medium text-brown-700">{`${timeHour}:${String(parseInt(timeMinute||'0',10)).padStart(2,'0')} ${timeMeridiem}`}</p>
                    )}
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
                    className="w-full rounded-xl bg-white p-3 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
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
                    className="w-full rounded-xl bg-white p-3 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brown-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      id="phone"
                      name="phone"
                      value={formData.phone}
                      onChange={handleInputChange}
                      placeholder="e.g. 9876543210"
                      pattern="[0-9]{10}"
                    className="w-full rounded-xl bg-white p-3 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      required
                    />
                  </div>
                </div>

                <div className="grid gap-4 md:grid-cols-2">
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
                    className="w-full rounded-xl bg-white p-3 shadow-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div className="text-sm text-brown-700 self-end">
                    We will send your free Kundli link to your phone number.
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
      ) : activeTab === 'matching' ? (
        /* Kundli Matching Form */
        <Section className="pb-16">
          <div className="max-w-5xl mx-auto">
            <div className="grid lg:grid-cols-2 gap-6">
              {/* Boy's Detail */}
              <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
                <h3 className="font-semibold text-brown-900 mb-4">BOY'S DETAIL</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Boy's Name *</label>
                    <input name="name" value={boy.name} onChange={(e)=>handleMatchingChange('boy',e)} placeholder="Enter name" className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={boy.dateOfBirth} onChange={(e)=>handleMatchingChange('boy',e)} className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Time of Birth *</label>
                    <div className="flex gap-2">
                      <input type="time" name="timeOfBirth" value={boy.timeOfBirth} onChange={(e)=>handleMatchingChange('boy',e)} className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                      <select className="rounded-xl bg-white p-3 shadow-sm border border-gray-200">
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Place of Birth *</label>
                    <input name="placeOfBirth" value={boy.placeOfBirth} onChange={(e)=>handleMatchingChange('boy',e)} placeholder="City, State, Country" className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                  </div>
                </div>
              </div>

              {/* Girl's Detail */}
              <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
                <h3 className="font-semibold text-brown-900 mb-4">GIRL'S DETAIL</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Girl's Name *</label>
                    <input name="name" value={girl.name} onChange={(e)=>handleMatchingChange('girl',e)} placeholder="Enter name" className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Date of Birth *</label>
                    <input type="date" name="dateOfBirth" value={girl.dateOfBirth} onChange={(e)=>handleMatchingChange('girl',e)} className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Time of Birth *</label>
                    <div className="flex gap-2">
                      <input type="time" name="timeOfBirth" value={girl.timeOfBirth} onChange={(e)=>handleMatchingChange('girl',e)} className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                      <select className="rounded-xl bg-white p-3 shadow-sm border border-gray-200">
                        <option>AM</option>
                        <option>PM</option>
                      </select>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-900 mb-1">Place of Birth *</label>
                    <input name="placeOfBirth" value={girl.placeOfBirth} onChange={(e)=>handleMatchingChange('girl',e)} placeholder="City, State, Country" className="w-full rounded-xl bg-white p-3 shadow-sm"/>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 flex justify-center">
              <button onClick={calculateMatch} className="rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">Calculate Match</button>
            </div>

            {score !== null && (
              <div className="mt-8 rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
                <h3 className={`text-2xl font-bold mb-2 ${gradHead}`}>Gun Milan Score: {score} / 36</h3>
                <p className="text-brown-800">This is a quick overview for reference. For deeper understanding and remedies, consult our verified astrologers.</p>
              </div>
            )}
          </div>
        </Section>
      ) : (
        /* Kundli Results */
        <Section className="pb-16">
          <div className="max-w-6xl mx-auto">
            {/* Success Message */}
            <div className="text-center mb-8">
              <div className="w-16 h-16 bg-yellow-50 rounded-full flex items-center justify-center mx-auto mb-4 shadow-sm">
                <Check className="w-6 h-6 text-yellow-600" />
              </div>
              <h2 className={`text-3xl font-bold mb-2 ${gradHead}`}>Kundli Generated Successfully!</h2>
              <p className="text-brown-600">Here's your detailed birth chart analysis</p>
            </div>

            {/* Basic Information */}
            <div className="grid gap-6 md:grid-cols-3 mb-8">
              <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
                {(() => { const sun = getSunSign(formData.dateOfBirth) || kundliData.zodiacSign; return (
                  <>
                    <img src={getZodiacAsset(sun)} alt={sun} className="h-16 w-16 mx-auto mb-2 object-contain" />
                    <h3 className="font-bold text-brown-900">Zodiac Sign</h3>
                    <p className="text-brown-600">{sun}</p>
                  </>
                ); })()}
              </div>
              <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
                <Moon className="w-8 h-8 text-blue-500 mx-auto mb-2" />
                <h3 className="font-bold text-brown-900">Moon Sign</h3>
                <p className="text-brown-600">{kundliData.moonSign}</p>
              </div>
              <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
                <ArrowUp className="w-8 h-8 text-green-500 mx-auto mb-2" />
                <h3 className="font-bold text-brown-900">Rising Sign</h3>
                <p className="text-brown-600">{kundliData.risingSign}</p>
              </div>
            </div>

      {/* Birth Details (Ethiopian calendar display) */}
      <div className="rounded-2xl bg-white p-6 text-center shadow-deep mb-8">
        <h3 className="font-bold text-brown-900 mb-2">Birth Details (Ethiopian Calendar)</h3>
              <p className="text-brown-700 text-sm">
          {formatEthiopianDate(formData.dateOfBirth)} • {formData.placeOfBirth ? toTitleCase(formData.placeOfBirth) : '—'} • {(() => {
            const [hStr, mStr] = (formData.timeOfBirth||'').split(':');
            if (!hStr) return '—';
            const h = parseInt(hStr, 10);
            const m = parseInt(mStr||'0', 10);
            const mer = h >= 12 ? 'PM' : 'AM';
            const hh = ((h % 12) || 12).toString().padStart(2,'0');
            const mm = m.toString().padStart(2,'0');
            return `${hh}:${mm} ${mer}`;
          })()}
        </p>
      </div>

            {/* Planetary Positions */}
            <div className="rounded-2xl bg-white p-8 mb-8 shadow-deep">
              <h3 className={`text-2xl font-bold mb-6 ${gradHead}`}>Planetary Positions</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(computedPositions.length ? computedPositions : kundliData.planetaryPositions).map((planet, index) => (
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
            <div className="rounded-2xl bg-white p-8 mb-8 shadow-deep">
              <h3 className={`text-2xl font-bold mb-6 ${gradHead}`}>Houses Analysis</h3>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                {(computedHouses.length ? computedHouses : kundliData.houses).map((house, index) => (
                  <div key={index} className="p-4 bg-yellow-50 rounded-xl">
                    <h4 className="font-semibold text-brown-900 mb-1">{house.house}</h4>
                    <p className="text-brown-600 text-sm mb-2">{house.sign}</p>
                    <p className="text-brown-700 text-xs">{house.meaning}</p>
                  </div>
                ))}
              </div>
            </div>

      {/* Gemstone Recommendation */}
      <div className="rounded-2xl bg-white p-6 mb-8 shadow-deep flex items-center gap-4">
        {(() => { const sun = getSunSign(formData.dateOfBirth) || kundliData.zodiacSign; const rec = getGemstoneRecommendation(sun); return (
          <>
            <img src={rec.image} alt={rec.name} className="h-16 w-16 rounded-full object-cover border-2 border-yellow-400" />
            <div>
              <h3 className={`text-xl font-bold ${gradHead}`}>Recommended Gemstone: {rec.name}</h3>
              <p className="text-brown-700 text-sm">{rec.desc}</p>
            </div>
          </>
        ); })()}
      </div>

      {/* Actions */}
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button className="px-6 py-3 bg-yellow-500 text-brown-900 rounded-xl font-semibold hover:bg-yellow-400 transition">
                Download PDF
              </button>
              <button className="px-6 py-3 bg-white text-yellow-600 rounded-xl font-semibold shadow-sm hover:bg-yellow-50 transition">
                Share Kundli
              </button>
              <Link
                to="/astrologers"
                className="px-6 py-3 bg-white text-yellow-600 rounded-xl font-semibold shadow-sm hover:bg-yellow-50 transition text-center"
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
          <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
            <Star className="w-8 h-8 text-yellow-500 mx-auto mb-4" />
            <h3 className="font-bold text-brown-900 mb-2">Planetary Positions</h3>
            <p className="text-brown-600">Detailed analysis of all planets and their positions in your birth chart</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
            <Home className="w-8 h-8 text-orange-500 mx-auto mb-4" />
            <h3 className="font-bold text-brown-900 mb-2">House Analysis</h3>
            <p className="text-brown-600">Complete breakdown of all 12 houses and their significance in your life</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
            <Sparkles className="w-8 h-8 text-blue-500 mx-auto mb-4" />
            <h3 className="font-bold text-brown-900 mb-2">Zodiac Signs</h3>
            <p className="text-brown-600">Your Sun, Moon, and Rising signs with detailed interpretations</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
            <BarChart3 className="w-8 h-8 text-green-500 mx-auto mb-4" />
            <h3 className="font-bold text-brown-900 mb-2">Life Predictions</h3>
            <p className="text-brown-600">Insights into career, relationships, health, and financial prospects</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
            <Gem className="w-8 h-8 text-purple-500 mx-auto mb-4" />
            <h3 className="font-bold text-brown-900 mb-2">Gemstone Recommendations</h3>
            <p className="text-brown-600">Personalized gemstone suggestions based on your planetary positions</p>
          </div>
          <div className="rounded-2xl bg-white p-6 text-center shadow-deep">
            <Circle className="w-8 h-8 text-indigo-500 mx-auto mb-4" />
            <h3 className="font-bold text-brown-900 mb-2">Remedies</h3>
            <p className="text-brown-600">Vedic remedies and mantras to enhance positive planetary influences</p>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-16">
        <div className="rounded-2xl p-8 text-center bg-white shadow-deep transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
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
              className="inline-flex items-center rounded-xl bg-white px-6 py-3 text-yellow-600 font-semibold shadow-sm hover:bg-brown-50 transition"
            >
              View All Services
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
