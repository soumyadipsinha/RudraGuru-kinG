import { useState } from "react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

interface Person {
  name: string;
  dateOfBirth: string;
  timeOfBirth: string;
  placeOfBirth: string;
}

export default function KundliMatching() {
  const [boy, setBoy] = useState<Person>({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  const [girl, setGirl] = useState<Person>({ name: "", dateOfBirth: "", timeOfBirth: "", placeOfBirth: "" });
  const [score, setScore] = useState<number | null>(null);

  const handleChange = (who: 'boy'|'girl', e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    who === 'boy' ? setBoy(prev => ({ ...prev, [name]: value })) : setGirl(prev => ({ ...prev, [name]: value }));
  };

  const calculate = () => {
    // placeholder gun milan style out of 36
    const sum = (boy.name + girl.name).replace(/\s+/g, '').length + new Date(boy.dateOfBirth).getDate() + new Date(girl.dateOfBirth).getDate();
    setScore(Math.min(36, Math.max(0, (sum % 37))));
  };

  return (
    <main className="bg-transparent">
      <Section className="pt-20 pb-10">
        <h1 className={`text-3xl sm:text-4xl font-extrabold text-center mb-6 ${gradHead}`}>Kundli Matching</h1>
        <p className="text-brown-800 text-center max-w-3xl mx-auto">Find your right one through matchmaking. Enter both birth details to get a quick compatibility score (out of 36) and brief notes.</p>
      </Section>

      {/* CTA Banner */}
      <Section className="pb-6">
        <div className="rounded-2xl bg-yellow-400/90 p-4 sm:p-6 md:p-8 shadow-xl grid gap-4 md:grid-cols-2 items-center">
          <div className="text-brown-900 font-semibold">
            Connect with an Astrologer on Call or Chat for personalised detailed predictions.
          </div>
          <div className="flex gap-3 justify-center md:justify-end">
            <a href="/chat" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white font-semibold shadow-md hover:bg-gray-800 transition">Talk to Astrologer</a>
            <a href="/chat" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white font-semibold shadow-md hover:bg-gray-800 transition">Chat with Astrologer</a>
          </div>
        </div>
      </Section>

      <Section className="pb-16">
        <div className="max-w-5xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Boy's Detail */}
            <div className="rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="font-semibold text-brown-900 mb-4">BOY'S DETAIL</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Boy's Name *</label>
                  <input name="name" value={boy.name} onChange={(e)=>handleChange('boy',e)} placeholder="Enter name" className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={boy.dateOfBirth} onChange={(e)=>handleChange('boy',e)} className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Time of Birth *</label>
                  <input type="time" name="timeOfBirth" value={boy.timeOfBirth} onChange={(e)=>handleChange('boy',e)} className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Place of Birth *</label>
                  <input name="placeOfBirth" value={boy.placeOfBirth} onChange={(e)=>handleChange('boy',e)} placeholder="City, State, Country" className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
              </div>
            </div>

            {/* Girl's Detail */}
            <div className="rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className="font-semibold text-brown-900 mb-4">GIRL'S DETAIL</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Girl's Name *</label>
                  <input name="name" value={girl.name} onChange={(e)=>handleChange('girl',e)} placeholder="Enter name" className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Date of Birth *</label>
                  <input type="date" name="dateOfBirth" value={girl.dateOfBirth} onChange={(e)=>handleChange('girl',e)} className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Time of Birth *</label>
                  <input type="time" name="timeOfBirth" value={girl.timeOfBirth} onChange={(e)=>handleChange('girl',e)} className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-1">Place of Birth *</label>
                  <input name="placeOfBirth" value={girl.placeOfBirth} onChange={(e)=>handleChange('girl',e)} placeholder="City, State, Country" className="w-full rounded-xl border border-yellow-400 p-3"/>
                </div>
              </div>
            </div>
          </div>

          <div className="mt-6 flex justify-center">
            <button onClick={calculate} className="rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">Calculate Match</button>
          </div>

          {score !== null && (
            <div className="mt-8 rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              <h3 className={`text-2xl font-bold mb-2 ${gradHead}`}>Gun Milan Score: {score} / 36</h3>
              <p className="text-brown-800">This is a quick overview for reference. For deeper understanding and remedies, consult our verified astrologers.</p>
            </div>
          )}
        </div>
      </Section>

      {/* Informational Sections */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${gradHead}`}>What is Kundli Milan - A Friend Or A Foe?</h2>
        <p className="text-brown-800 mb-3">Think of kundli matching like a map. It shows the way but doesn’t decide the destination. A score helps highlight strengths and areas of extra care in a relationship so couples can prepare wisely.</p>
        <p className="text-brown-800">Used correctly, gun milan can make your relationship stronger by revealing expectations early and guiding remedies when needed.</p>
      </Section>

      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${gradHead}`}>What Happens During Kundli Milan?</h2>
        <p className="text-brown-800">Astrologers compare the two birth charts using exact birth details, evaluate key factors (Ashtakoota), and provide an overall compatibility score along with notes on harmony, longevity, and remedies if required.</p>
      </Section>

      <Section className="pb-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>The 8 Factors in Ashtakoota Milan</h2>
        <div className="grid gap-4 md:grid-cols-2">
          {[
            'Varna', 'Vashya', 'Tara', 'Yoni', 'Graha Maitri', 'Gana', 'Bhakoot', 'Nadi'
          ].map((koota) => (
            <div key={koota} className="rounded-2xl border-2 border-yellow-300/60 p-5 bg-white/90 backdrop-blur-sm">
              <h3 className="font-semibold text-brown-900">{koota}</h3>
              <p className="text-brown-700 text-sm mt-1">Contributes to the overall 36-point score; indicates different dimensions of compatibility.</p>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}


