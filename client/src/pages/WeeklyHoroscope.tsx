import { useMemo, useState } from "react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const ZODIAC_SIGNS = [
  "Aries","Taurus","Gemini","Cancer","Leo","Virgo","Libra","Scorpio","Sagittarius","Capricorn","Aquarius","Pisces"
];

interface WeeklySection { title: string; body: string; }
interface WeeklyHoroscope { sections: WeeklySection[]; lucky: string; }

export default function WeeklyHoroscope() {
  const [selectedSign, setSelectedSign] = useState("Aries");

  const getWeekly = (sign: string): WeeklyHoroscope => {
    if (sign === "Aries") {
      return {
        lucky: "Lucky numbers 3, 9, 21 • Best days Tue & Thu • Colors: red, orange",
        sections: [
          { title: "Overview", body: "Aries, Mars fuels courage and pioneering drive. Your cardinal fire initiates bold starts and inspires others through action." },
          { title: "Love & Relationships", body: "Passion rises mid‑week. Singles attract equally adventurous partners; couples deepen intimacy via shared challenges and spontaneous gestures." },
          { title: "Personal Life", body: "Self‑discovery accelerates. Launch new personal projects and make decisions aligned with your authentic self." },
          { title: "Career & Finance", body: "Showcase leadership on Tue. Network in the evening; avoid rushing major choices on Fri." },
          { title: "Health & Wellness", body: "High vitality—start or intensify training. Manage stress through movement; prioritize sleep." },
          { title: "Emotions & Mind", body: "Intensity early week; clarity Wed‑Fri. Communicate directly; channel fire into creative work." },
          { title: "Travel & Movement", body: "Short spontaneous trips favored Tue‑Thu; skip Monday for smoother logistics." },
          { title: "Remedies", body: "Wear red/orange, carry carnelian, chant 'Om Angarakaya Namaha' on Tuesdays, sunrise practice." }
        ]
      };
    }
    if (sign === "Taurus") {
      return {
        lucky: "Lucky numbers 6, 14, 23, 31 • Best days Tue & Sat • Colors: green, pink",
        sections: [
          { title: "Overview", body: "Venus blesses steady growth and comfort. Fixed earth favors patient progress and reliable choices." },
          { title: "Love & Relationships", body: "Shared simple pleasures deepen bonds. Singles meet someone through art, food, or nature." },
          { title: "Personal Life", body: "Methodical steps transform long‑term goals. Mid‑week supports value‑aligned decisions." },
          { title: "Career & Finance", body: "Consistency and aesthetics win recognition. Network Friday; avoid rushing outcomes." },
          { title: "Health & Wellness", body: "Gentle, sustainable routines; soothe neck/throat; herbal teas help balance." },
          { title: "Emotions & Mind", body: "Stability grows through patient communication; family talks resolve tension Thu." },
          { title: "Travel & Movement", body: "Comfort‑focused trips mid‑week; choose leisurely routes and nature." },
          { title: "Remedies", body: "Wear emerald/rose quartz; chant 'Om Shukraya Namaha' Fri AM; ground in nature." }
        ]
      };
    }
    return {
      lucky: "Luck favors balanced effort and clear planning this week.",
      sections: [
        { title: "Overview", body: `${sign} energy supports steady progress and mindful choices.` },
        { title: "Love & Relationships", body: "Honest conversations deepen bonds; quality time beats quantity." },
        { title: "Personal Life", body: "Refine goals; small habits create durable change." },
        { title: "Career & Finance", body: "Collaborate mid‑week; document decisions; avoid Friday rush." },
        { title: "Health & Wellness", body: "Prioritize routine movement, hydration, and sleep hygiene." },
        { title: "Emotions & Mind", body: "Name feelings; journal mid‑week insights; set gentle boundaries." },
        { title: "Travel & Movement", body: "Short purposeful trips favored; plan buffers into schedules." },
        { title: "Remedies", body: "Light incense, wear sign colors, 5‑minute breathwork daily." }
      ]
    };
  };

  const weekly = getWeekly(selectedSign);

  return (
    <main className="relative bg-transparent overflow-hidden">
      <Section className="pt-20 pb-2 text-center">
        <h1 className={`text-4xl sm:text-5xl font-extrabold mb-2 ${gradHead}`}>Weekly Horoscope</h1>
        <p className="text-brown-800">Sunday - Saturday</p>
      </Section>
      <Section className="pb-6 text-center">
        <p className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-yellow-300 bg-white text-brown-800">{new Intl.DateTimeFormat(undefined,{ month:'long', day:'numeric'}).format(new Date())}</p>
      </Section>

      <Section className="pb-6">
        <div className="flex flex-wrap justify-center gap-2">
          {ZODIAC_SIGNS.map(sign => (
            <button key={sign} onClick={()=>setSelectedSign(sign)} className={`px-4 py-2 rounded-full border ${selectedSign===sign? 'bg-yellow-500 text-brown-900 border-yellow-500':'bg-white border-yellow-400 hover:bg-yellow-50'}`}>{sign}</button>
          ))}
        </div>
      </Section>

      <Section className="pb-12">
        <div className="max-w-4xl mx-auto space-y-6">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-brown-900">{selectedSign} Weekly Horoscope</h2>
          </div>
          {weekly.sections.map(s=> (
            <div key={s.title} className="bg-yellow-50 p-6 rounded-xl">
              <h3 className={`text-xl font-bold mb-2 ${gradHead}`}>{s.title}</h3>
              <p className="text-brown-800 leading-relaxed">{s.body}</p>
            </div>
          ))}
          <div className="bg-white border border-yellow-200 p-6 rounded-xl">
            <h4 className="font-semibold text-brown-900 mb-1">Lucky Insights</h4>
            <p className="text-brown-800">{weekly.lucky}</p>
          </div>
        </div>
      </Section>
    </main>
  );
}


