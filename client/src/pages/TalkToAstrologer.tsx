import { Link } from "react-router-dom";
import { ASTROLOGERS } from "../data/astrologers";
import { Star } from "lucide-react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps { children: React.ReactNode; className?: string; }
const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function TalkToAstrologer() {
  const LIST = ASTROLOGERS.slice(0,4);
  return (
    <main className="bg-transparent">
      <Section className="pt-20 pb-6">
        <div className="flex items-center justify-between">
          <h1 className={`text-3xl sm:text-5xl font-extrabold ${gradHead}`}>Talk to Astrologer</h1>
          <div className="flex items-center gap-3 text-sm text-brown-700">
            <span>Available balance: ₹0</span>
            <button className="rounded-full bg-yellow-500 px-4 py-1.5 text-brown-900 font-semibold hover:bg-yellow-400">Recharge</button>
          </div>
        </div>
      </Section>

      <Section className="pb-6">
        <div className="grid gap-5 md:grid-cols-2">
          {LIST.map((a) => (
            <div key={a.id} className="rounded-2xl border-2 border-yellow-300/60 p-5 bg-white/90 backdrop-blur-sm shadow-lg flex items-center gap-4">
              <img src={a.img} alt={a.name} className="h-16 w-16 rounded-full object-cover border-2 border-yellow-500" />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-semibold text-brown-900">{a.name}</p>
                    <p className="text-sm text-brown-700">{a.skills.join(", ")}</p>
                    <p className="text-xs text-brown-600">Exp: {Math.max(3, Math.round(a.rating*3))} Years</p>
                  </div>
                  <div className="text-right">
                    <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="text-yellow-600">{a.rating.toFixed(1)}</span></div>
                    <div className="text-sm text-brown-700 mt-1">₹{a.call}/min</div>
                  </div>
                </div>
                <div className="mt-3 flex gap-3">
                  <Link to={`/chat?astro=${a.id}`} className="rounded-full bg-black px-4 py-1.5 text-white font-semibold hover:bg-gray-800">Chat</Link>
                  <Link to={`/calling?astro=${a.id}`} className="rounded-full border border-yellow-400 px-4 py-1.5 text-yellow-700 font-semibold hover:bg-yellow-50">Call</Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      <Section className="pb-12">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-3 ${gradHead}`}>How talking to an astrologer can help you?</h2>
        <p className="text-brown-800">24×7 Astrology consultation with verified experts to guide you on relationships, career, finance, health, and more. Get practical remedies and timelines tailored to your chart.</p>
      </Section>
    </main>
  );
}


