import { useState } from "react";
import { Calculator } from "lucide-react";
import CalculatorLayout from "./CalculatorLayout";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

function reduceToSingleDigit(n: number): number {
  while (n > 9 && n !== 11 && n !== 22) {
    n = n.toString().split("").reduce((a, b) => a + parseInt(b, 10), 0);
  }
  return n;
}

export default function NumerologyCalculator() {
  const [name, setName] = useState("");
  const [dob, setDob] = useState("");
  const [system, setSystem] = useState("pythagorean"); // 'pythagorean' | 'chaldean'
  const [destinyNumber, setDestinyNumber] = useState<number | null>(null);
  const [lifePath, setLifePath] = useState<number | null>(null);

  const CHALDEAN_MAP: Record<string, number> = {
    A:1, B:2, C:3, D:4, E:5, F:8, G:3, H:5, I:1,
    J:1, K:2, L:3, M:4, N:5, O:7, P:8, Q:1, R:2,
    S:3, T:4, U:6, V:6, W:6, X:5, Y:1, Z:7
  };

  const PYTHAGOREAN_MAP: Record<string, number> = {
    A:1,B:2,C:3,D:4,E:5,F:6,G:7,H:8,I:9,
    J:1,K:2,L:3,M:4,N:5,O:6,P:7,Q:8,R:9,
    S:1,T:2,U:3,V:4,W:5,X:6,Y:7,Z:8
  };

  const calculate = () => {
    const letters = name.toUpperCase().replace(/[^A-Z]/g, "").split("");
    const map = system === "chaldean" ? CHALDEAN_MAP : PYTHAGOREAN_MAP;
    const total = letters.reduce((sum, ch) => sum + (map[ch] || 0), 0);
    setDestinyNumber(reduceToSingleDigit(total));

    if (dob) {
      const digits = dob.replace(/[^0-9]/g, "").split("").map(d=>parseInt(d,10)).reduce((a,b)=>a+b,0);
      setLifePath(reduceToSingleDigit(digits));
    } else {
      setLifePath(null);
    }
  };

  return (
    <>
      <CalculatorLayout
        title="Name Numerology Calculator | Accurate Name Number Calculator Online"
        subtitle="Enter your name and optional date of birth. Choose Cheiro/Chaldean or Pythagorean to reveal your name (Destiny) number and Life Path number."
        icon={<Calculator className="w-8 h-8 text-yellow-600" />}
      >
        <div className="grid gap-3">
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Name *</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter Name in English Only" className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Date (DD/MM/YYYY)</label>
            <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Type</label>
            <select value={system} onChange={e=>setSystem(e.target.value)} className="rounded-md border p-3 w-full">
              <option value="chaldean">Cheiro / Chaldean</option>
              <option value="pythagorean">Pythagorean (Western)</option>
            </select>
          </div>
        </div>
        <button onClick={calculate} className="mt-4 rounded-md bg-yellow-500 px-6 py-2 font-semibold text-brown-900 hover:bg-yellow-400">Calculate</button>
        {(destinyNumber !== null || lifePath !== null) && (
          <div className="mt-4 text-brown-900 font-semibold space-y-1">
            {destinyNumber !== null && (<div>Destiny (Name) Number: {destinyNumber}</div>)}
            {lifePath !== null && (<div>Life Path Number: {lifePath}</div>)}
          </div>
        )}
      </CalculatorLayout>

      {/* Info content below form */}
      <section className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        <h2 className="text-2xl sm:text-3xl font-bold mb-3">What Is a Numerology Calculator?</h2>
        <p className="text-brown-800 mb-3">A numerology calculator converts the letters in your name into meaningful numbers to reveal character, talents, and life purpose. Whether you use Chaldean (Cheiro) or Pythagorean, your name holds powerful insights.</p>
        <p className="text-brown-800 mb-6">Understanding your name number helps with wiser decisions about career, relationships, and growth. Adding date of birth brings Life Path for deeper clarity.</p>

        <h3 className="text-xl font-bold text-brown-900 mb-2">How Does a Numerology Name Calculator Work?</h3>
        <p className="text-brown-800 mb-3">Each letter maps to a number. We sum and reduce to a single digit (except master numbers 11 and 22). Two common systems:</p>
        <ul className="list-disc pl-6 text-brown-800 mb-4">
          <li><span className="font-semibold">Pythagorean</span>: Popular in the West (A=1 ... I=9; repeats).</li>
          <li><span className="font-semibold">Chaldean (Cheiro)</span>: Ancient, vibration‑focused mapping (1–8).</li>
        </ul>

        <h3 className="text-xl font-bold text-brown-900 mb-2">Key Numbers Revealed</h3>
        <ul className="list-disc pl-6 text-brown-800 mb-4">
          <li><span className="font-semibold">Name/Destiny Number</span>: Life purpose and overall direction.</li>
          <li><span className="font-semibold">Soul Urge</span>: What your heart truly desires.</li>
          <li><span className="font-semibold">Personality</span>: First impression and social mask.</li>
          <li><span className="font-semibold">Life Path</span>: Derived from DOB; core lessons and path.</li>
        </ul>

        <h3 className="text-xl font-bold text-brown-900 mb-2">How Your Name Number Influences Life</h3>
        <p className="text-brown-800 mb-2">It touches career, relationships, and personal challenges. Use your strengths, understand compatibility, and time key decisions with awareness.</p>
      </section>
    </>
  );
}


