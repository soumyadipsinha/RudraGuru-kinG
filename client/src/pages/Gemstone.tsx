// src/pages/Gemstones.jsx
import { Link } from "react-router-dom";
import { Scale, Palette, MapPin, FlaskConical, Sparkles, Shield, Zap } from "lucide-react";

// Assets
import Gemsstone from "../assets/gemstone.png";
import Rudraksha from "../assets/rudraksha.png";
import Abhimantrit from "../assets/abhimantrit.png";
import Diamond from "../assets/heera.png";
import SapphireBlue from "../assets/sapphire-blue.png";
import SapphireYellow from "../assets/sapphire-yellow.png";
import Ruby from "../assets/ruby.png";
import Emerald from "../assets/Panna.png";
import Opal from "../assets/opal.png";
import RedCoral from "../assets/redCoral.png";
import Turquoise from "../assets/turquoise.png";
import Hessonite from "../assets/hessonite.png";
import CatEye from "../assets/catEye.png";

// Gradient heading
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

// Gemstone catalog data (using imported assets)
const GEMSTONES = [
  {
    key: "diamond",
    name: "Diamond (Heera)",
    tagline: "The King of Gemstones",
    img: Diamond,
    to: "/gemstones/diamond",
  },
  {
    key: "sapphire-blue",
    name: "Sapphire — Blue",
    tagline: "The Celestial Stone",
    img: SapphireBlue,
    to: "/gemstones/sapphire-blue",
  },
  {
    key: "sapphire-yellow",
    name: "Sapphire — Yellow",
    tagline: "The Jupiter Stone",
    img: SapphireYellow,
    to: "/gemstones/sapphire-yellow",
  },
  {
    key: "ruby",
    name: "Ruby (Manikya)",
    tagline: "The Gem of the Sun",
    img: Ruby,
    to: "/gemstones/ruby",
  },
  {
    key: "emerald",
    name: "Emerald (Panna)",
    tagline: "The Green Beryl",
    img: Emerald,
    to: "/gemstones/emerald",
  },
  {
    key: "opal",
    name: "Opal",
    tagline: "The Venus Gemstone",
    img: Opal,
    to: "/gemstones/opal",
  },
  {
    key: "red-coral",
    name: "Red Coral (Moonga)",
    tagline: "The Warrior’s Gemstone",
    img: RedCoral,
    to: "/gemstones/red-coral",
  },
  {
    key: "turquoise-firoza",
    name: "Turquoise (Firoza)",
    tagline: "The Mystic Stone",
    img: Turquoise,
    to: "/gemstones/turquoise",
  },
  {
    key: "hessonite",
    name: "Hessonite (Gomed)",
    tagline: "The Rahu Gemstone",
    img: Hessonite,
    to: "/gemstones/hessonite",
  },
  {
    key: "cats-eye",
    name: "Cat’s Eye (Lehsunia)",
    tagline: "The Ketu Stone",
    img: CatEye,
    to: "/gemstones/cats-eye",
  },
];

export default function Gemstones() {
  return (
    <main className="relative bg-transparent overflow-hidden">
      {/* Ambient background like other pages */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
        <div className="absolute left-12 top-28 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
      </div>
      <style>{`
@keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
@keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
@keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
@keyframes twinkle{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.08);} }
      `}</style>

      {/* Intro: About Gemstones */}
      <Section className="pt-20 pb-12">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${gradHead}`}>
              About Gemstones
            </h1>

            {/* Yellow bullet list text */}
            <div className="text-brown-800">
              <p>Gemstones carry cosmic energies that can positively impact your life.</p>

              <p className="mt-4 font-semibold text-brown-900">They help in:</p>
              <ul className="mt-2 space-y-2">
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" aria-hidden="true"></span>
                  <span>Attracting prosperity & wealth</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" aria-hidden="true"></span>
                  <span>Balancing planetary influences</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" aria-hidden="true"></span>
                  <span>Enhancing career, relationships & health</span>
                </li>
                <li className="flex items-start gap-3">
                  <span className="mt-2 h-2 w-2 rounded-full bg-yellow-500" aria-hidden="true"></span>
                  <span>Removing obstacles & negative energies</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="flex justify-center">
            <img
              src={Gemsstone}
              alt="Gemstones"
              className="w-full max-w-md rounded-2xl object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
        </div>
      </Section>

      {/* What are Rudraksha Beads */}
      <Section className="pb-12">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div className="flex justify-center order-1 md:order-none">
            <img
              src={Rudraksha}
              alt="Rudraksha Beads"
              className="w-full max-w-md rounded-2xl object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
            />
          </div>
          <div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-4 ${gradHead}`}>What are Rudraksha Beads?</h2>
            <p className="text-brown-800 whitespace-pre-line">
              Mukhi Rudraksha beads are a type of Rudraksha bead that is said to have many benefits, including:

              Balancing energy
              Reducing stress
              Overcoming obstacles
              Improving financial situations
              We source our beads from reputable suppliers and ensure that they are of the highest quality.
            </p>
          </div>
        </div>
      </Section>

      {/* Different Types of Gemstones */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Different Types of Gemstones</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {GEMSTONES.map((g) => (
            <div
              key={g.key}
              className="rounded-2xl border border-yellow-400 bg-white p-4 transition duration-300 hover:shadow-xl hover:-translate-y-0.5"
            >
              <div className="aspect-[4/3] w-full overflow-hidden rounded-xl border border-yellow-300">
                <img src={g.img} alt={g.name} className="h-full w-full object-cover" />
              </div>
              <div className="mt-4">
                <p className="font-semibold text-brown-900">{g.name}</p>
                <p className="text-sm text-brown-700">{g.tagline}</p>
                <div className="mt-4 flex">
                  <Link
                    to={g.to}
                    className="inline-flex items-center rounded-md bg-yellow-500 px-4 py-2 text-brown-900 font-semibold hover:bg-yellow-400"
                  >
                    About
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* How is Price Determined? */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>How is Price Determined?</h2>
        <div className="grid gap-6 md:grid-cols-4">
          <PriceCard icon={<Scale className="w-6 h-6 text-blue-600" />} title="Carat Weight" text="Heavier stones are more expensive." />
          <PriceCard icon={<Palette className="w-6 h-6 text-pink-600" />} title="Color & Clarity" text="Vibrant & clear stones cost more." />
          <PriceCard icon={<MapPin className="w-6 h-6 text-yellow-600" />} title="Origin & Rarity" text="Rare sources increase price." />
          <PriceCard icon={<FlaskConical className="w-6 h-6 text-purple-600" />} title="Treatment" text="Untreated stones have higher value." />
        </div>
      </Section>

      {/* Carat vs Ratti */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>Carat vs Ratti</h2>
        <div className="grid gap-6 md:grid-cols-2">
          <div className="rounded-2xl border border-yellow-400 p-6 bg-white transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <h3 className="text-xl font-semibold text-brown-900 mb-2">Understanding Measurements</h3>
            <p className="text-brown-800">
              Carat (Ct): The international unit of measurement for gemstones and diamonds.<br />
              Ratti (Rt): A traditional Indian unit used for gemstones in Vedic astrology.
            </p>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
          </div>
          <div className="rounded-2xl border border-yellow-400 p-6 bg-white transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <h3 className="text-xl font-semibold text-brown-900 mb-2">Why is this important?</h3>
            <p className="text-brown-800">
              Many gemstones in India are measured in Ratti, while internationally, they are measured in Carat.
              Understanding the conversion helps in accurate gemstone purchasing & astrology recommendations.
            </p>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
          </div>
        </div>
      </Section>

      {/* Abhimantrit Gemstones — The Divine Advantage */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>
          Abhimantrit Gemstones — The Divine Advantage
        </h2>

        <div className="grid gap-8 md:grid-cols-2 items-center">
          {/* LEFT: Benefits in a column */}
          <div>
            <div className="grid gap-4">
              {/* Card 1 */}
              <div className="rounded-2xl bg-white p-6 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center"><Zap className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-brown-900">Vedic Energization</p>
                    <p className="text-brown-800 text-sm">
                      Purified with Vedic mantras for better results.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
              </div>

              {/* Card 2 */}
              <div className="rounded-2xl bg-white p-6 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center"><Shield className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-brown-900">Protective Aura</p>
                    <p className="text-brown-800 text-sm">
                      Removes negative energies & boosts power.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
              </div>

              {/* Card 3 */}
              <div className="rounded-2xl bg-white p-6 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
                <div className="flex items-start gap-3">
                  <div className="h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center"><Sparkles className="w-5 h-5" /></div>
                  <div>
                    <p className="font-semibold text-brown-900">Planetary Support</p>
                    <p className="text-brown-800 text-sm">
                      Enhances positive planetary effects.
                    </p>
                  </div>
                </div>
                <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
              </div>
            </div>

            {/* CTA under the left column list */}
            <div className="mt-6">
              <Link
                to="/astrologers"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400"
              >
                Get Your Abhimantrit Gemstones from Divine Lane!
              </Link>
            </div>
          </div>

          {/* RIGHT: Picture */}
          <div className="flex justify-center">
            <img
              src={Abhimantrit}
              alt="Abhimantrit (Energized) Gemstones"
              className="w-full max-w-md rounded-2xl object-cover shadow-sm transition-transform duration-300 hover:scale-[1.02]"
              onError={(e)=>{ e.currentTarget.src = Gemsstone; }}
            />
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section className="py-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Get your gemstone recommendation from our expert pandits!</h3>
          <p className="mt-2 text-brown-800">Personalized guidance based on birth details, goals, and current dasha/planetary period.</p>
          <div className="mt-5">
            <Link to="/astrologers" className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400">
              Consult Now
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

/* Small components */

interface PriceCardProps {
  icon: string;
  title: string;
  text: string;
}

function PriceCard({ icon, title, text }: PriceCardProps) {
  return (
    <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <div className="mx-auto mb-3 h-12 w-12 rounded-2xl bg-yellow-100 text-yellow-700 flex items-center justify-center text-2xl">
        {icon}
      </div>
      <p className="font-semibold text-brown-900">{title}</p>
      <p className="text-sm text-brown-700 mt-1">{text}</p>
    </div>
  );
}