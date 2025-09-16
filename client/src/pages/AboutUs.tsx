// src/Pages/AboutUs.jsx
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Gem, Search, Compass, Clock, Handshake, Shield, Sparkles, Timer, Zap, Check } from "lucide-react";

// Gradient heading
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </section>
);

export default function AboutUs() {
  // simple mount animation trigger for intro text
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setMounted(true), 50);
    return () => clearTimeout(t);
  }, []);

  return (
    <main className="relative bg-transparent overflow-hidden">
      {/* Animated, subtle brownish background */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 -z-10"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
        <div className="absolute left-12 top-28 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]">
          <Sparkles className="w-4 h-4" />
        </div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]">
          <Sparkles className="w-4 h-4" />
        </div>
      </div>

      <style>{`
@keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
@keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
@keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
@keyframes twinkle{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.08);} }
      `}</style>

      {/* Intro (centered) */}
      <Section className="pt-20 pb-20">
        <div className="flex flex-col items-center text-center gap-6">
          <h1 className={`text-4xl sm:text-5xl font-extrabold ${gradHead}`}>
            About RUDRAGURU
          </h1>

          <p
            className={`max-w-3xl text-brown-800 transition-all duration-900 ease-in-out ${
              mounted ? "opacity-100 translate-y-0" : "opacity-2 translate-y-2"
            }`}
          >
            RUDRAGURU is a company dedicated to providing Astrology sessions or
            guidance, high‑quality Rudraksha beads and certified gemstones to
            our customers. We believe in the power of these beads and gemstones
            to bring about positive changes in people’s lives.
          </p>

          <img
            src="/images/about/team-hero.jpg"
            onError={(e) => {
              e.currentTarget.src =
                "https://avatar-placeholder.iran.liara.run/public/20";
            }}
            alt="Our Team"
            className="w-full max-w-md rounded-2xl object-cover shadow-md transition-transform duration-300 hover:scale-[1.02]"
          />
        </div>
      </Section>

      {/* Why Astrology (moved from Home) */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>WHY ASTROLOGY? Astrology Reveals the Will of God</h2>
        <p className="text-brown-800 mb-4">Have you ever felt that things in life sometimes happen at just the right time, like someone is silently guiding you? Astrology helps us understand this. It shows how God’s energy flows through planets and stars, shaping our daily lives.</p>
        <p className="text-brown-800 mb-4">This old and trusted knowledge explains that nothing is random; everything has a reason. The stars often hold clues about our purpose and future. Many people today feel unsure about life choices, but astrology offers direction.</p>
        <p className="text-brown-800 mb-8">It connects our daily worries to higher wisdom. By learning to read signs from the universe, we can walk in tune with God’s plan. For years, astrology has helped people make better decisions in love, work, family, and their spiritual journey.</p>

        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-brown-900">How does Online Astrology Consultation & Services Work?</h3>
        <ol className="space-y-3 list-decimal pl-6 text-brown-800">
          <li>Online astrology consultation brings ancient astrological wisdom right to your phone or computer. You can get divine guidance anytime you need it, right from your home.</li>
          <li>Using your birth details like date, time, and place, professional astrologers prepare a special chart. This chart helps them understand your life's journey as per God's plan.</li>
          <li>Apps and platforms connect you with experienced astrologers. Choose chat, call, or video—whatever feels right for you.</li>
          <li>Many websites also offer free predictions so you can begin your spiritual journey easily at no cost.</li>
          <li>In the session, your astrologer studies your birth chart and current planetary placements to share future insights.</li>
          <li>These platforms also provide free daily horoscope readings to help you stay in sync with cosmic energy.</li>
          <li>The best part? It’s simple and convenient. You can get guidance without travelling, and some sessions are recorded for later.</li>
        </ol>

        <h3 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-brown-900">Why Should You Choose an Online Astrologer?</h3>
        <p className="text-brown-800 mb-4">Online astrologers bring ancient wisdom with modern convenience—easy access, pocket‑friendly pricing, and verified expertise. You can try different astrologers, protect your privacy, and get 24×7 support, often with recordings to revisit guidance.</p>

        <h3 className="text-2xl sm:text-3xl font-bold mt-10 mb-4 text-brown-900">How to Stay Updated With Daily Horoscope Predictions & Zodiac Signs?</h3>
        <p className="text-brown-800 mb-4">Daily horoscopes reveal how today’s cosmic movements influence your sign—helping you make better choices and avoid small troubles.</p>
        <ul className="list-disc pl-6 space-y-2 text-brown-800 mb-8">
          <li>12 zodiac signs react differently to planetary shifts. Knowing your sun, moon, and rising gives a fuller picture.</li>
          <li>Start your day with guidance on love, career, health, and spiritual growth.</li>
          <li>Track patterns in mood and outcomes, and use weekly/monthly updates for planning.</li>
        </ul>

        <h3 className="text-2xl sm:text-3xl font-bold mb-4 text-brown-900">Why Choose Our Astrology Experts?</h3>
        <p className="text-brown-800 mb-8">Our certified experts blend Vedic wisdom with a modern, empathetic approach. You’ll find original spiritual items—gemstones, yantras, and puja tools—recommended with clear, safe instructions. Transparent options include chats, reports, and quick answers.</p>
      </Section>

      {/* Why our team is best – screenshot style feature cards */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>
          Why Our Team Stands Out
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          <FeatureCard
            icon={<Shield className="w-6 h-6 text-indigo-600" />}
            title="Certified Expertise"
            text="Astrologers with verified credentials across Vedic, KP, Tarot, Numerology, and Vastu."
          />
          <FeatureCard
            icon={<Search className="w-6 h-6 text-blue-600" />}
            title="Evidence‑led Guidance"
            text="Practical remedies rooted in tradition and aligned to real‑world goals."
          />
          <FeatureCard
            icon={<Gem className="w-6 h-6 text-purple-600" />}
            title="Ethical Sourcing"
            text="Rudraksha & gemstones are responsibly procured and lab‑certified."
          />
          <FeatureCard
            icon={<Compass className="w-6 h-6 text-yellow-600" />}
            title="Personalization First"
            text="Reports & sessions tailored to birth details, timelines, and intent."
          />
          <FeatureCard
            icon={<Clock className="w-6 h-6 text-orange-600" />}
            title="24×7 Availability"
            text="Consult via chat, call, and receive detailed reports round‑the‑clock."
          />
          <FeatureCard
            icon={<Handshake className="w-6 h-6 text-pink-600" />}
            title="After‑care Support"
            text="Follow‑ups ensure remedies are easy to adopt and effective."
          />
        </div>
      </Section>

      {/* Orders on Hold / Common reasons */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>
          How to Not Put Your Orders on Hold
        </h2>
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Left: reasons */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="relative mb-9">
              <div className="absolute -top-4 left-0 h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
                <Timer className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-brown-900 mb-3">
              Common Reasons Orders Get Delayed
            </h3>
            <ul className="space-y-2 text-brown-900">
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Incorrect or
                incomplete shipping details
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Payment issues
                (pending transactions/orders)
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Ring size issue
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Special orders
                requiring customization or energization
              </li>
            </ul>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
          </div>

          {/* Right: ensure smooth */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
            <div className="relative mb-9">
              <div className="absolute -top-4 left-0 h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
                <Zap className="w-5 h-5" />
              </div>
            </div>
            <h3 className="text-xl font-semibold text-brown-900 mb-3">
              Ensure a Smooth & Fast Delivery!
            </h3>
            <ul className="space-y-2 text-brown-900">
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Double‑check
                your shipping address & details
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Try to collect
                minimum 20% advance
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Offer adjustable
                rings to avoid sizing delays
              </li>
              <li className="flex items-start gap-3">
                <span className="text-yellow-600 mt-1">•</span> Pre‑book
                energized gemstones to save time
              </li>
            </ul>
            <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
          </div>
        </div>
      </Section>

      {/* Meet Our Team (top image, column layout) */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>
          Meet Our Team
        </h2>
        <div className="grid gap-6 md:grid-cols-3">
          {[
            {
              name: "Acharya Vivek Sharma",
              role: "Chief Astrologer • Vedic, KP",
              bio: "18+ years guiding clients with precise remedies and practical timelines.",
              img: "https://avatar-placeholder.iran.liara.run/public/21",
            },
            {
              name: "Dr. Meera Iyer",
              role: "Numerologist & Vastu Expert",
              bio: "Bridging numerology with spatial harmony to boost wellbeing and success.",
              img: "https://avatar-placeholder.iran.liara.run/public/22",
            },
            {
              name: "Pandit Suresh Rao",
              role: "Gemstone & Ritual Specialist",
              bio: "Expert in energized gemstones and traditional rituals for alignment.",
              img: "https://avatar-placeholder.iran.liara.run/public/23",
            },
          ].map((m) => (
            <div
              key={m.name}
              className="rounded-2xl border border-yellow-400 p-5 bg-white transition duration-300 hover:shadow-xl hover:-translate-y-0.5 flex flex-col items-center text-center"
            >
              <img
                src={m.img}
                alt={m.name}
                className="h-20 w-20 rounded-full object-cover mb-4"
              />
              <p className="font-semibold text-brown-900">{m.name}</p>
              <p className="text-sm text-brown-700">{m.role}</p>
              <p className="mt-3 text-brown-800 text-sm">{m.bio}</p>
              <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
            </div>
          ))}
        </div>
      </Section>

      {/* FAQ accordion */}
      <FAQSection />

      {/* CTA */}
      <Section className="py-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>
            Ready to get guidance?
          </h3>
          <p className="mt-2 text-brown-800">
            Talk to verified astrologers or order certified gemstones and
            Rudraksha.
          </p>
          <div className="mt-5 flex justify-center gap-3">
            <Link
              to="/astrologers"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-white hover:text-brown-900 hover:border hover:border-yellow-500 transition"
            >
              Consult Now
            </Link>
            <Link
              to="/gemstones"
              className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
            >
              Explore Gemstones
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

/* Feature card styled like screenshot */
interface FeatureCardProps {
  icon: string;
  title: string;
  text: string;
}

function FeatureCard({ icon, title, text }: FeatureCardProps) {
  return (
    <div className="relative rounded-2xl border border-yellow-300 bg-white px-6 pb-6 pt-9 transition duration-300 hover:shadow-xl hover:-translate-y-0.5">
      <div className="absolute -top-4 left-6 h-10 w-10 rounded-xl bg-yellow-100 text-yellow-700 flex items-center justify-center shadow-sm">
        <span className="text-lg">{icon}</span>
      </div>
      <p className="font-semibold text-brown-900">{title}</p>
      <p className="mt-2 text-brown-800">{text}</p>
      <div className="mt-4 h-1 w-16 rounded-full bg-gradient-to-r from-yellow-300 to-yellow-500"></div>
    </div>
  );
}

/* FAQ accordion */
function FAQSection() {
  const items = [
    {
      q: "Which details are needed for an accurate kundli or report?",
      a: "Accurate date, time, and place of birth. If time is unknown, a rectification session can narrow it down for better accuracy.",
    },
    {
      q: "How soon can a gemstone start showing results?",
      a: "Results vary by chart and intent. Many experience subtle changes within weeks; energized and correctly worn stones may show faster alignment.",
    },
    {
      q: "Are Rudraksha beads suitable for everyone?",
      a: "Most beads are universally beneficial when chosen by a professional. We recommend a brief consultation to match the bead to your goals.",
    },
    {
      q: "Do remedies interfere with religious beliefs?",
      a: "Remedies are supportive, non‑coercive practices. They complement diverse beliefs and can be personalized to comfort and faith.",
    },
    {
      q: "Can sessions be done online at late hours?",
      a: "Yes. Many astrologers are 24×7 available via chat and call. Scheduling ensures fast response and dedicated time.",
    },
    {
      q: "What if the ring size or product customization is wrong?",
      a: "Contact support immediately. Adjustable options and pre‑measurement help avoid delays; exchanges follow quality checks and policy.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <Section className="py-12">
      <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>
        Frequently Asked Questions
      </h2>
      <div className="rounded-2xl border border-yellow-300 bg-white divide-y divide-yellow-200 transition duration-300 hover:shadow-md">
        {items.map((item, idx) => (
          <AccordionItem
            key={idx}
            idx={idx}
            open={open}
            setOpen={setOpen}
            q={item.q}
            a={item.a}
          />
        ))}
      </div>
    </Section>
  );
}

interface AccordionItemProps {
  idx: number;
  open: number | null;
  setOpen: (value: number | null) => void;
  q: string;
  a: string;
}

function AccordionItem({ idx, open, setOpen, q, a }: AccordionItemProps) {
  const isOpen = open === idx;
  return (
    <div className="p-4">
      <button
        onClick={() => setOpen(isOpen ? null : idx)}
        className="w-full text-left flex items-center justify-between gap-3"
      >
        <span className="font-semibold text-brown-900">{q}</span>
        <span
          className={`text-yellow-600 transform transition-transform ${
            isOpen ? "rotate-45" : ""
          }`}
        >
          <Check className="w-4 h-4" />
        </span>
      </button>
      <div
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen
            ? "grid-rows-[1fr] opacity-100 mt-2"
            : "grid-rows-[0fr] opacity-0"
        } overflow-hidden`}
      >
        <div className="text-brown-800 text-sm">{a}</div>
      </div>
    </div>
  );
}
