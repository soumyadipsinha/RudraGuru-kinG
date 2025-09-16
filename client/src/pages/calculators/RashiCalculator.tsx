import { useState } from "react";
import { Moon } from "lucide-react";
import CalculatorLayout from "./CalculatorLayout";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function RashiCalculator() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [place, setPlace] = useState("");
  const [rashi, setRashi] = useState<string | null>(null);

  const calculate = () => {
    // placeholder logic: use month to select sign
    const month = new Date(dob).getMonth() + 1 || 1;
    const signs = ["Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"];
    setRashi(signs[(month - 1) % 12]);
  };

  return (
    <>
      <CalculatorLayout
        title="Rashi/Moon Sign Calculator: Find Your Moon sign & Unlock Life's Mysteries"
        subtitle="Enter your birth details to calculate your rashi (zodiac sign)"
        icon={<Moon className="w-8 h-8 text-blue-600" />}
      >
        <div className="grid gap-4">
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Name *</label>
            <input value={name} onChange={e=>setName(e.target.value)} placeholder="Enter your full name" className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Gender *</label>
            <select value={gender} onChange={e=>setGender(e.target.value)} className="rounded-md border p-3 w-full">
              <option value="">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Date of Birth *</label>
            <input type="date" value={dob} onChange={e=>setDob(e.target.value)} className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="text-sm font-medium text-brown-900">Time of Birth *</label>
              <label className="text-sm flex items-center gap-2"><input type="checkbox" checked={unknownTime} onChange={(e)=>setUnknownTime(e.target.checked)} /> I don't know my time of birth</label>
            </div>
            <input type="time" value={time} onChange={e=>setTime(e.target.value)} disabled={unknownTime} className="rounded-md border p-3 w-full"/>
          </div>
          <div>
            <label className="block text-sm font-medium text-brown-900 mb-1">Place of Birth *</label>
            <input value={place} onChange={e=>setPlace(e.target.value)} placeholder="Enter your birth place" className="rounded-md border p-3 w-full"/>
          </div>
        </div>
        <button onClick={calculate} className="mt-4 rounded-md bg-yellow-500 px-6 py-2 font-semibold text-brown-900 hover:bg-yellow-400">Rashi Calculator</button>
        {rashi && (
          <div className="mt-4 text-brown-900 font-semibold">Your Rashi: {rashi}</div>
        )}
      </CalculatorLayout>

      {/* Info section */}
      <Section className="pt-20 pb-16">
        <p className="text-brown-800 mb-4">Many use a moon sign calculator free to get instant results, offering quick emotional insights based on Vedic astrology.</p>
        <p className="text-brown-800 mb-6">With just your birth date, time, and place, it can reveal your moon sign and unlock a world of self-understanding. To dive deeper, consider using a rashi chart calculator that shows planetary positions along with your moon sign.</p>
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${gradHead}`}>What is Rashi/Moon Sign?</h2>
        <p className="text-brown-800 mb-6">Your Rashi is more than just a zodiac sign—it mirrors your emotional self and instincts. Because the Moon shifts signs every 2–3 days, accurate Rashi needs date, time, and place.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">What is My Rashi by Name?</h3>
        <p className="text-brown-800 mb-6">Naming by Rashi is a cherished tradition. While auspicious sounds exist for each sign, your true Rashi is best found using birth details.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">What is My Rashi by Date of Birth?</h3>
        <p className="text-brown-800 mb-6">Birth date alone can be misleading because the Moon moves quickly. Time and place refine accuracy.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">What is My Rashi by Date of Birth and Time?</h3>
        <p className="text-brown-800 mb-6">Including exact time pinpoints the Moon’s sign when you were born—crucial if the Moon changed signs that day.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">How to Check Rashi by Date of Birth?</h3>
        <p className="text-brown-800 mb-6">Enter birth date, time, and place. The calculator adjusts for location to find your Moon sign precisely.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">What is the Importance of Knowing Your Rashi?</h3>
        <p className="text-brown-800 mb-6">Your Rashi explains emotional needs and patterns—useful for relationships, stress styles, and decision making.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">What is Planet Moon and Rashi Lord?</h3>
        <p className="text-brown-800 mb-6">Each Rashi has a ruling planet (Rashi Lord) that colors your emotional expression. Placement in a full chart adds depth.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-3">Meaning Behind Each Rashi</h3>
        <p className="text-brown-800">Each sign carries distinct energy—action of Aries, stability of Taurus, curiosity of Gemini, and so on—shaping your inner world.</p>
      </Section>
    </>
  );
}


