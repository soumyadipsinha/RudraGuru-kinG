import { useMemo } from "react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const SIGNS = [
  { name: "Aries", symbol: "♈" },
  { name: "Taurus", symbol: "♉" },
  { name: "Gemini", symbol: "♊" },
  { name: "Cancer", symbol: "♋" },
  { name: "Leo", symbol: "♌" },
  { name: "Virgo", symbol: "♍" },
  { name: "Libra", symbol: "♎" },
  { name: "Scorpio", symbol: "♏" },
  { name: "Sagittarius", symbol: "♐" },
  { name: "Capricorn", symbol: "♑" },
  { name: "Aquarius", symbol: "♒" },
  { name: "Pisces", symbol: "♓" }
];

export default function MonthlyHoroscope() {
  const monthLabel = useMemo(() => {
    const d = new Date();
    const formatter = new Intl.DateTimeFormat(undefined, { month: 'long', year: 'numeric' });
    return formatter.format(d);
  }, []);

  return (
    <main className="bg-transparent">
      <Section className="pt-20 pb-6 text-center">
        <h1 className={`text-4xl sm:text-5xl font-extrabold mb-2 ${gradHead}`}>Monthly Horoscope</h1>
        <p className="text-brown-700">{monthLabel}</p>
      </Section>
      <Section className="pb-12">
        <div className="grid gap-6 md:grid-cols-2">
          {SIGNS.map((s) => (
            <div key={s.name} className="rounded-2xl border-2 border-yellow-300/60 p-5 bg-white/90 backdrop-blur-sm shadow-lg">
              <div className="flex items-center gap-4">
                <div className="w-24 h-24 bg-yellow-100 rounded-lg flex items-center justify-center text-4xl">{s.symbol}</div>
                <div>
                  <h3 className="font-semibold text-brown-900">{s.name} Monthly Horoscope</h3>
                  <p className="text-brown-700 text-sm line-clamp-4">Overview {s.name} steps into {monthLabel.split(' ')[0]} with focused momentum. Expect steady progress through consistent routines, honest relationships, and practical budgeting. Mid‑month reviews help refine plans; late‑month brings clarity and calm confidence.</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>
    </main>
  );
}


