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
  const [score, setScore] = useState<number | null>(null);

  const calculate = () => {
    const s = (name1.trim().length + name2.trim().length) % 101; // placeholder logic
    setScore(s);
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
        <input value={name1} onChange={e=>setName1(e.target.value)} placeholder="Your Name" className="rounded-md border p-3"/>
        <input value={name2} onChange={e=>setName2(e.target.value)} placeholder="Partner Name" className="rounded-md border p-3"/>
      </div>
      <div className="mt-3 grid grid-cols-2 gap-2">
        <button className="rounded-md border p-2">Male</button>
        <button className="rounded-md border p-2">Female</button>
      </div>
      <button onClick={calculate} className="mt-4 rounded-md bg-yellow-500 px-6 py-2 font-semibold text-brown-900 hover:bg-yellow-400">Calculate Love %</button>
      {score !== null && (
        <div className="mt-4 text-brown-900 font-semibold">Compatibility: {score}%</div>
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


