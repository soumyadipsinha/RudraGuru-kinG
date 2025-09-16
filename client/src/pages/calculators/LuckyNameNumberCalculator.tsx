import { useState } from "react";
import { Hash } from "lucide-react";
import CalculatorLayout from "./CalculatorLayout";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

function numerologyValue(name: string): number {
  const total = name
    .toUpperCase()
    .replace(/[^A-Z]/g, "")
    .split("")
    .reduce((sum, ch) => sum + (ch.charCodeAt(0) - 64), 0);
  return total % 9 === 0 ? 9 : total % 9;
}

export default function LuckyNameNumberCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [type, setType] = useState("cheiro");
  const [lucky, setLucky] = useState<number | null>(null);

  const calculate = () => {
    setLucky(numerologyValue(name));
  };

  return (
    <>
      <CalculatorLayout
        title="Lucky Name Numerology Calculator: Find Your Perfect Name"
        subtitle="Calculate your Lucky Name Numerology here"
        icon={<Hash className="w-8 h-8 text-yellow-600" />}
      >
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Full Name *</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Date of Birth *</label>
            <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Numerology Type *</label>
            <select value={type} onChange={e=>setType(e.target.value)} className="rounded-md border p-3 w-full">
              <option value="cheiro">Cheiro</option>
              <option value="pythagorean">Pythagorean</option>
            </select>
          </div>
        </div>
        <button onClick={calculate} className="mt-4 rounded-md bg-yellow-500 px-6 py-2 font-semibold text-brown-900 hover:bg-yellow-400">Find Lucky Number</button>
        {lucky !== null && (
          <div className="mt-4 text-brown-900 font-semibold">Lucky Number: {lucky}</div>
        )}
      </CalculatorLayout>

      {/* Info section below form */}
      <Section className="pt-20 pb-16">
        <p className="text-brown-800 mb-4">Your name holds energy that affects your journey. Matching name vibrations with your destiny can support career, relationships, and overall life flow.</p>
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${gradHead}`}>What Is Name Numerology?</h2>
        <p className="text-brown-800 mb-4">Each letter maps to a number; together they create vibrations that can help or hinder goals. A lucky name calculator helps align your name with your path.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">How to find your Lucky Name?</h3>
        <p className="text-brown-800 mb-4">Use birth date and name numerology together. Try alternate spellings or slight tweaks; even small changes can improve alignment.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">How Does it Work?</h3>
        <p className="text-brown-800 mb-4">Choose Pythagorean or Chaldean; compute expression, soul urge, and personality numbers; compare with your life path for harmony.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">Benefits</h3>
        <ul className="list-disc pl-6 text-brown-800">
          <li>Career and business growth</li>
          <li>Better relationships and confidence</li>
          <li>Wealth attraction and spiritual balance</li>
        </ul>
      </Section>
    </>
  );
}


