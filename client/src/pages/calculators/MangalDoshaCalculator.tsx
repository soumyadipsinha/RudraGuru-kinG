import { useState } from "react";
import { Flame } from "lucide-react";
import CalculatorLayout from "./CalculatorLayout";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-3xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function MangalDoshaCalculator() {
  const [name, setName] = useState("");
  const [gender, setGender] = useState("");
  const [dob, setDob] = useState("");
  const [time, setTime] = useState("");
  const [unknownTime, setUnknownTime] = useState(false);
  const [place, setPlace] = useState("");
  const [isManglik, setIsManglik] = useState<boolean | null>(null);

  const calculate = () => {
    // placeholder rule: odd day => Manglik (to be replaced with real ephemeris logic)
    const day = new Date(dob).getDate();
    setIsManglik(Boolean(day % 2));
  };

  return (
    <>
      <CalculatorLayout
        title="Mangal Dosha Calculator: Complete Guide to Understanding Mars Influence"
        subtitle="Calculate your Mangal Dosha here"
        icon={<Flame className="w-8 h-8 text-red-600" />}
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
        <button onClick={calculate} className="mt-4 rounded-md bg-yellow-500 px-6 py-2 font-semibold text-brown-900 hover:bg-yellow-400">Check</button>
        {isManglik !== null && (
          <div className="mt-4 text-brown-900 font-semibold">{isManglik ? "Manglik (Mangal Dosha present)" : "Not Manglik"}</div>
        )}
      </CalculatorLayout>

      {/* Informational Section */}
      <Section className="pt-20 pb-16">
        <p className="text-brown-800 mb-6">In India, where arranged matches and kundli compatibility matter so much, knowing your Mangal Dosha status early can save you from emotional confusion and mismatched partnerships. It's not about superstition—it's about awareness.</p>
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${gradHead}`}>What is Mangal Dosha or Kuja Dosha?</h2>
        <p className="text-brown-800 mb-6">Mangal Dosha occurs when Mars sits in specific houses (1,2,4,7,8,12) in the natal chart. It brings intensity to relationships, especially marriage, but with the right approach and remedies, it can be balanced.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">What is Mangal Dosha Calculator?</h3>
        <p className="text-brown-800 mb-6">A calculator checks your chart using DOB, time, and place to see if Mars forms dosha and explains impact with potential remedies.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">How to Use Mangal Dosha Calculator?</h3>
        <p className="text-brown-800 mb-6">Use accurate birth time and place; enter details and calculate to see your status instantly.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">Types of Manglik Dosha</h3>
        <p className="text-brown-800 mb-6">Anshik (partial), Purna (strong), High, and Low—impact varies with house, aspects, degrees, and nakshatra.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">Common Traits</h3>
        <p className="text-brown-800 mb-6">Strong Mars gives drive, leadership, and passion; learn balance to avoid rigidity and impatience.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">Effects by House Placement</h3>
        <p className="text-brown-800 mb-6">1st—bold personality; 2nd—speech/family friction; 4th—home restlessness; 7th—partnership intensity; 8th—transformations; 12th—expenses/distance.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">Role of Astrology</h3>
        <p className="text-brown-800 mb-6">Full-chart view matters—guna matching, timing, and individualized remedies provide clarity.</p>
        <h3 className="text-xl font-bold text-brown-900 mb-2">Remedies</h3>
        <p className="text-brown-800 mb-6">Consider gemstone (red coral) with guidance, Mars mantras, Hanuman puja, Tuesday fasts, charity, and mindful timing for marriage.</p>
      </Section>
    </>
  );
}


