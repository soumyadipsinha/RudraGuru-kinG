import { useState } from "react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

interface Area { title: string; body: string; }
interface Yearly { areas: Area[]; mantra: string; }

export default function YearlyHoroscope() {
  const [sign, setSign] = useState("Aries");

  const getYearly = (s: string): Yearly => ({
    mantra: "Anchor routines, communicate clearly, and choose long‑term over short‑term.",
    areas: [
      { title: "Overall", body: `${s} sees sustainable growth through consistent effort and skill upgrades.` },
      { title: "Love", body: "Depth over drama; nurture bonds via honest dialogue and mutual goals." },
      { title: "Career", body: "Build reputation; mid‑year favors promotions and role clarity." },
      { title: "Finance", body: "Budget conservatively; invest in education/tools; avoid speculative risks." },
      { title: "Health", body: "Sleep, mobility, and stress hygiene define vitality. Quarterly resets help." },
      { title: "Travel", body: "Short purposeful trips > long exhaustive ones; Q2 and Q4 best windows." }
    ]
  });

  const data = getYearly(sign);

  return (
    <main className="bg-transparent">
      <Section className="pt-20 pb-2 text-center">
        <h1 className={`text-4xl sm:text-5xl font-extrabold mb-2 ${gradHead}`}>Yearly Horoscope</h1>
      </Section>
      <Section className="pb-6 text-center">
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-300 bg-white text-brown-800">{new Date().getFullYear()}</p>
      </Section>
      <Section className="pb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {SIGNS.map(x=> (
            <button key={x} onClick={()=>setSign(x)} className={`px-4 py-2 rounded-full border ${sign===x? 'bg-yellow-500 text-brown-900 border-yellow-500':'bg-white border-yellow-400 hover:bg-yellow-50'}`}>{x}</button>
          ))}
        </div>
      </Section>
      <Section className="pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <h2 className="text-2xl font-bold text-brown-900 text-center">{sign} Yearly Horoscope</h2>
          {data.areas.map(a=> (
            <div key={a.title} className="bg-yellow-50 p-6 rounded-xl">
              <h3 className={`text-xl font-bold mb-2 ${gradHead}`}>{a.title}</h3>
              <p className="text-brown-800">{a.body}</p>
            </div>
          ))}
          <div className="bg-white border border-yellow-200 p-6 rounded-xl">
            <h4 className="font-semibold text-brown-900 mb-1">Mantra</h4>
            <p className="text-brown-800">{data.mantra}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}


