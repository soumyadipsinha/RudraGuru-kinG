import { Link } from "react-router-dom";
import { Heart, Calculator, Moon, Flame, Hash } from "lucide-react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function CalculatorsIndex() {
  const cards = [
    { title: "Love Calculator", text: "Check name compatibility.", to: "/calculators/love", icon: <Heart className="w-6 h-6"/> },
    { title: "Numerology", text: "Find your core numbers.", to: "/calculators/numerology", icon: <Calculator className="w-6 h-6"/> },
    { title: "Rashi (Zodiac)", text: "Know your Moon sign.", to: "/calculators/rashi", icon: <Moon className="w-6 h-6"/> },
    { title: "Mangal Dosha", text: "Check Manglik status.", to: "/calculators/mangal-dosha", icon: <Flame className="w-6 h-6"/> },
    { title: "Lucky Name/Number", text: "Choose auspicious names & numbers.", to: "/calculators/lucky-name-number", icon: <Hash className="w-6 h-6"/> },
  ];

  return (
    <main className="bg-transparent">
      <Section className="pt-20 pb-12">
        <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold mb-6 ${gradHead}`}>Astrology Calculators</h1>
        <p className="text-brown-800 mb-8">Explore essential Vedic tools inspired by leading platforms to get quick insights.</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
          {cards.map((c)=> (
            <Link
              key={c.title}
              to={c.to}
              className="rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-2xl hover:border-yellow-400/80"
            >
              <div className="flex items-start gap-4">
                <div className="h-12 w-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow">
                  {c.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-yellow-600 mb-2 text-xl">{c.title}</h3>
                  <p className="text-brown-800">{c.text}</p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </Section>
    </main>
  );
}


