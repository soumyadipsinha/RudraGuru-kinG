import { useState } from "react";
import { Heart } from "lucide-react";
import CalculatorLayout from "./CalculatorLayout";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function LoveCalculator() {
  const [name1, setName1] = useState("");
  const [name2, setName2] = useState("");
  const [dob1, setDob1] = useState<string>("");
  const [dob2, setDob2] = useState<string>("");
  const [rashi1, setRashi1] = useState<string>("");
  const [rashi2, setRashi2] = useState<string>("");
  const [error, setError] = useState<string>("");
  const [score, setScore] = useState<number | null>(null);

  const RASHI = [
    "Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo",
    "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces",
  ];

  // Very simplified compatibility pairs (for demo purposes only)
  const COMPATIBLE: Record<string, string[]> = {
    Aries: ["Leo", "Sagittarius", "Gemini"],
    Taurus: ["Virgo", "Capricorn", "Cancer"],
    Gemini: ["Libra", "Aquarius", "Aries"],
    Cancer: ["Scorpio", "Pisces", "Taurus"],
    Leo: ["Aries", "Sagittarius", "Libra"],
    Virgo: ["Taurus", "Capricorn", "Cancer"],
    Libra: ["Gemini", "Aquarius", "Leo"],
    Scorpio: ["Cancer", "Pisces", "Capricorn"],
    Sagittarius: ["Aries", "Leo", "Aquarius"],
    Capricorn: ["Taurus", "Virgo", "Scorpio"],
    Aquarius: ["Gemini", "Libra", "Sagittarius"],
    Pisces: ["Cancer", "Scorpio", "Capricorn"],
  };

  const calculate = () => {
    setError("");

    if (!name1.trim() || !name2.trim()) {
      setError("Please enter both names.");
      setScore(null);
      return;
    }
    if (!dob1 || !dob2) {
      setError("Please select both dates of birth.");
      setScore(null);
      return;
    }
    if (!rashi1 || !rashi2) {
      setError("Please select both Rashis (zodiac signs).");
      setScore(null);
      return;
    }

    // Base from names
    let total = (name1.trim().length + name2.trim().length) % 101;

    // Add DOB numerology influence (sum of digits reduced)
    const reduceNum = (s: string) =>
      s.replace(/\D/g, "").split("").reduce((a, b) => a + Number(b), 0);
    const n1 = reduceNum(dob1);
    const n2 = reduceNum(dob2);
    const dobInfluence = ((n1 % 9) + (n2 % 9)) % 10; // 0..9
    total = Math.min(100, total + dobInfluence);

    // Rashi compatibility influence
    if (rashi1 === rashi2) {
      total = Math.min(100, total + 10);
    } else if (COMPATIBLE[rashi1]?.includes(rashi2)) {
      total = Math.min(100, total + 15);
    } else if (COMPATIBLE[rashi2]?.includes(rashi1)) {
      total = Math.min(100, total + 12);
    } else {
      total = Math.max(0, total - 5);
    }

    // Gentle clamp
    total = Math.max(0, Math.min(100, total));
    setScore(Math.round(total));
  };

  return (
    <>
    <CalculatorLayout
      title="Love Calculator: Find Your Perfect Match"
      subtitle="Enter your names to see a quick compatibility estimate inspired by Vedic numerology principles."
      icon={<Heart className="w-8 h-8 text-pink-600" />}
      sidebar={<div><h3 className="font-semibold text-yellow-600 mb-2">Love Quote of the Day</h3><p className="text-sm text-brown-800">Your love will be a masterpiece, crafted with care and devotion.</p></div>}
    >
      <div className="grid gap-3 sm:grid-cols-2">
        <input
          value={name1}
          onChange={e=>setName1(e.target.value)}
          placeholder="Your Name"
          className="rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
        <input
          value={name2}
          onChange={e=>setName2(e.target.value)}
          placeholder="Partner Name"
          className="rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
        />
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl p-3 bg-white/90 backdrop-blur-sm shadow-deep animate-shadow-pulse">
          <label className="block text-sm font-medium text-brown-800 mb-1">Your Date of Birth</label>
          <input
            type="date"
            value={dob1}
            onChange={e=>setDob1(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>
        <div className="rounded-2xl p-3 bg-white/90 backdrop-blur-sm shadow-deep animate-shadow-pulse">
          <label className="block text-sm font-medium text-brown-800 mb-1">Partner Date of Birth</label>
          <input
            type="date"
            value={dob2}
            onChange={e=>setDob2(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          />
        </div>
      </div>

      <div className="mt-3 grid gap-3 sm:grid-cols-2">
        <div className="rounded-2xl p-3 bg-white/90 backdrop-blur-sm shadow-deep animate-shadow-float">
          <label className="block text-sm font-medium text-brown-800 mb-1">Your Rashi (Zodiac)</label>
          <select
            value={rashi1}
            onChange={e=>setRashi1(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Rashi</option>
            {RASHI.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
        <div className="rounded-2xl p-3 bg-white/90 backdrop-blur-sm shadow-deep animate-shadow-float">
          <label className="block text-sm font-medium text-brown-800 mb-1">Partner Rashi (Zodiac)</label>
          <select
            value={rashi2}
            onChange={e=>setRashi2(e.target.value)}
            className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
          >
            <option value="">Select Rashi</option>
            {RASHI.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>
      </div>

      {error && (
        <div className="mt-3 rounded-md bg-red-50 text-red-700 px-3 py-2 border border-red-200 shadow-deep">
          {error}
        </div>
      )}

      <button
        onClick={calculate}
        className="mt-4 rounded-md bg-yellow-500 px-6 py-2 font-semibold text-brown-900 hover:bg-yellow-400 shadow-deep hover:shadow-deep-hover transition-all duration-300"
      >
        Calculate Love %
      </button>

      {score !== null && (
        <div className="mt-4 rounded-2xl p-4 bg-white/90 backdrop-blur-sm shadow-deep animate-shadow-glow text-brown-900 font-semibold">
          Compatibility: {score}%
        </div>
      )}
    </CalculatorLayout>

    {/* Info Section separate from form */}
    <Section className="pt-20 pb-16">
      <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${gradHead}`}>What is Love?</h2>
      <p className="text-brown-800 mb-6">Love is a special feeling that brings joy, trust, and meaning to life. At first, it feels exciting, and later it grows into a deep and strong bond.</p>

      <h3 className="text-xl font-bold text-brown-900 mb-2">What is a Love Calculator?</h3>
      <p className="text-brown-800 mb-4">A Love Calculator is a fun tool that checks your compatibility with someone. It uses names, birth dates, or zodiac signs to give you a love percentage score.</p>

      <h3 className="text-xl font-bold text-brown-900 mb-2">How Does It Work?</h3>
      <ol className="list-decimal pl-6 text-brown-800 space-y-1 mb-4">
        <li>Enter your name and your partner’s name.</li>
        <li>The calculator converts letters into numbers using numerology.</li>
        <li>Birth dates and zodiac signs add extra insights.</li>
        <li>Finally, it shows your compatibility score (0–100%).</li>
      </ol>

      <h3 className="text-xl font-bold text-brown-900 mb-2">Why Use a Love Calculator?</h3>
      <ul className="list-disc pl-6 text-brown-800 space-y-1 mb-4">
        <li>Quick, easy, and free.</li>
        <li>Fun to try with your partner, friends, or even celebrities.</li>
        <li>Gives hints about relationship strengths and challenges.</li>
        <li>Great for conversation starters.</li>
      </ul>
      <p className="text-sm text-brown-700 mb-8">Reminder: Love calculators are fun, but real love needs care, trust, and effort.</p>

      <h3 className="text-xl font-bold text-brown-900 mb-2">Expanded Version</h3>
      <p className="text-brown-800 mb-3">Love is more than excitement—it grows with trust, respect, and time. People often wonder: “Do they love me back?” or “Will this relationship last?” That’s where a love calculator comes in.</p>
      <p className="text-brown-800 mb-3">Our Love Calculator uses names, numerology, birth dates, and zodiac signs to give you a fun compatibility score. It’s not only for romance—you can try it with friends or crushes for fun.</p>
      <h4 className="font-semibold text-brown-900 mb-2">Benefits include:</h4>
      <ul className="list-disc pl-6 text-brown-800 space-y-1">
        <li>Quick insights into compatibility.</li>
        <li>A light-hearted way to understand your bond.</li>
        <li>A confidence boost when confused.</li>
        <li>A way to learn about your own love patterns.</li>
      </ul>
    </Section>
    </>
  );
}


