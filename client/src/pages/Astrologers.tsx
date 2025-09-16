import { useEffect, useMemo, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Gem, ShieldCheck, Stars, MessageSquare, Phone, Star } from "lucide-react";

import Astrologer from "../assets/astrologer.png"
import { ASTROLOGERS } from "../data/astrologers";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

// Using shared ASTROLOGERS from data module

const skillBuckets: Record<string, (skills: string[]) => boolean> = {
  "Palm Reading": (s: string[]) => s.some((x: string) => /palm/i.test(x)),
  "Numerology":   (s: string[]) => s.some((x: string) => /numero/i.test(x)),
  "Tarot Reading":(s: string[]) => s.some((x: string) => /tarot/i.test(x)),
  "Vedic Astrology": (s: string[]) => s.some((x: string) => /vedic/i.test(x)),
};

export default function Astrologers() {
  const location = useLocation();
  const [q, setQ] = useState("");
  const [skill, setSkill] = useState("All");
  const [lang, setLang] = useState("All");
  const [sort, setSort] = useState("Default");

  // Quick filters
  const quickFilter = (type: string) => {
    if (type === "Available Now") {
      setSort("Highest rate");
    } else if (type === "Under ₹20/min") {
      setSort("Price: Low to High");
    } else if (type === "Top Rated") {
      setSort("Highest rate");
    } else if (type === "Relationship Expert") {
      setQ("Love");
    } else if (type === "Career Guidance") {
      setQ("Career");
    }
  };

  const filtered = useMemo(() => {
    let rows = ASTROLOGERS.filter(a =>
      a.name.toLowerCase().includes(q.trim().toLowerCase()) ||
      a.skills.some(s => s.toLowerCase().includes(q.trim().toLowerCase()))
    );

    if (skill !== "All") {
      const fn = skillBuckets[skill];
      if (fn) rows = rows.filter(a => fn(a.skills));
    }

    if (lang !== "All") {
      rows = rows.filter(a => a.langs.some(l => l.toLowerCase() === lang.toLowerCase()));
    }

    switch (sort) {
      case "Highest rate":
        rows = [...rows].sort((a,b) => b.rating - a.rating);
        break;
      case "Lowest rate":
        rows = [...rows].sort((a,b) => a.rating - b.rating);
        break;
      case "Price: Low to High":
        rows = [...rows].sort((a,b) => a.chat - b.chat);
        break;
      case "Price: High to Low":
        rows = [...rows].sort((a,b) => b.chat - a.chat);
        break;
      default:
        break;
    }
    return rows;
  }, [q, skill, lang, sort]);

  const topRated = useMemo(() => {
    return [...ASTROLOGERS].sort((a,b) => b.rating - a.rating).slice(0,4);
  }, []);

  // Scroll to selected astrologer if query param present
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const selected = params.get("select");
    if (!selected) return;
    const element = document.getElementById(`astro-${selected}`);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
      element.classList.add("ring-2","ring-yellow-500");
      setTimeout(() => element.classList.remove("ring-2","ring-yellow-500"), 2000);
    }
  }, [location.search]);

  return (
    <main className="relative bg-transparent overflow-hidden">

      {/* Intro Section */}
      <Section className="pt-20 pb-9">
        <div className="grid gap-8 md:gap-10 md:grid-cols-2 items-center">
          <div className="text-center md:text-left">
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold pb-1 mb-6 ${gradHead}`}>Connect with Expert Astrologers</h1>
            <div className="grid gap-6 md:grid-cols-3 pt-6 mb-10">
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-yellow-300/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-yellow-700"><Gem className="w-5 h-5"/></span>
                <p className="font-semibold">What We Offer</p>
                <p>Premium guidance with certified experts.</p>
              </div>
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-yellow-300/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-yellow-700"><ShieldCheck className="w-5 h-5"/></span>
                <p className="font-semibold">Our Assurance</p>
                <p>24×7 availability anywhere.</p>
              </div>
              <div className="rounded-2xl bg-white/90 backdrop-blur-sm border-2 border-yellow-300/60 p-6 shadow-lg hover:shadow-xl transition-all duration-300">
                <span className="text-yellow-700"><Stars className="w-5 h-5"/></span>
                <p className="font-semibold">Our Vision</p>
                <p>Personalized kundli & reports.</p>
              </div>
            </div>
          </div>
          {/* Pandit Ji photo */}
          <div className="flex justify-center">
            <img
              src={Astrologer}
              alt="Pandit Ji"
              className="w-full max-w-sm rounded-2xl object-cover"
            />
          </div>
        </div>
      </Section>

      {/* Search + Sort in one line */}
      <Section className="pb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <input
            type="text"
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Search by name or skill..."
            className="flex-1 rounded-md border-2 border-yellow-300/60 p-3 bg-white/90 backdrop-blur-sm shadow-lg"
          />
          <div className="flex flex-col sm:flex-row gap-2">
            <select value={skill} onChange={(e)=>setSkill(e.target.value)} className="rounded-md border-2 border-yellow-300/60 p-2 bg-white/90 backdrop-blur-sm shadow-lg">
              <option>All</option>
              <option>Palm Reading</option>
              <option>Numerology</option>
              <option>Tarot Reading</option>
              <option>Vedic Astrology</option>
            </select>
            <select value={lang} onChange={(e)=>setLang(e.target.value)} className="rounded-md border-2 border-yellow-300/60 p-2 bg-white/90 backdrop-blur-sm shadow-lg">
              <option>All</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Bengali</option>
              <option>Tamil</option>
              <option>Gujarati</option>
            </select>
            <select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-md border-2 border-yellow-300/60 p-2 bg-white/90 backdrop-blur-sm shadow-lg">
              <option>Default</option>
              <option>Highest rate</option>
              <option>Lowest rate</option>
              <option>Price: Low to High</option>
              <option>Price: High to Low</option>
            </select>
          </div>
        </div>
        {/* Quick filter buttons */}
        <div className="mt-3 flex flex-wrap gap-2">
          {["Available Now","Under ₹20/min","Top Rated","Relationship Expert","Career Guidance"].map(x=>(
            <button
              key={x}
              onClick={()=>quickFilter(x)}
              className="rounded-full border border-yellow-400 px-3 py-1 text-sm hover:bg-yellow-50"
            >
              {x}
            </button>
          ))}
        </div>
      </Section>

      {/* Best Rated */}
      <Section className="py-8">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${gradHead}`}>Best Rated Astrologers</h2>
        <div className="grid gap-6 md:grid-cols-4">
          {topRated.map((p)=>(<AstroCard key={p.id} a={p} />))}
        </div>
      </Section>

      {/* Quick Booking */}
      <Section className="pb-8">
        <div className="rounded-2xl border border-yellow-400 p-6 bg-white">
          <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Quick Booking</h3>
          <div className="grid gap-4 md:grid-cols-3">
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <MessageSquare className="w-8 h-8 text-blue-600 mx-auto mb-2" />
              <h4 className="font-semibold text-brown-900">Instant Chat</h4>
              <p className="text-sm text-brown-600">Start chatting immediately</p>
              <p className="text-yellow-600 font-bold">From ₹10/min</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <Phone className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
              <h4 className="font-semibold text-brown-900">Voice Call</h4>
              <p className="text-sm text-brown-600">Clear audio consultation</p>
              <p className="text-yellow-600 font-bold">From ₹15/min</p>
            </div>
            <div className="text-center p-4 bg-yellow-50 rounded-xl">
              <div className="text-3xl mb-2">🎥</div>
              <h4 className="font-semibold text-brown-900">Video Call</h4>
              <p className="text-sm text-brown-600">Face-to-face consultation</p>
              <p className="text-yellow-600 font-bold">From ₹25/min</p>
            </div>
          </div>
        </div>
      </Section>

      {/* All Astrologers */}
      <Section className="pb-16">
        <h2 className={`text-2xl sm:text-3xl font-bold mb-6 ${gradHead}`}>All Astrologers</h2>
        {filtered.length === 0 ? (
          <p>No astrologers match the current filters.</p>
        ) : (
          <div className="grid gap-6 md:grid-cols-2">
            {filtered.map((p)=>(<AstroCard key={p.id} a={p} />))}
          </div>
        )}
      </Section>
    </main>
  );
}

interface Astrologer {
  id: number;
  name: string;
  skills: string[];
  langs: string[];
  rating: number;
  chat: number;
  call: number;
  img: string;
}

interface AstroCardProps {
  a: Astrologer;
}

function AstroCard({ a }: AstroCardProps) {
  return (
    <div id={`astro-${a.id}`} className="rounded-2xl border border-yellow-400 p-5 bg-white hover:shadow-xl transition">
      <div className="flex items-center gap-4">
        <img src={a.img} alt={a.name} className="h-16 w-16 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{a.name}</h3>
            <div className="flex items-center gap-1"><Star className="w-4 h-4 text-yellow-500 fill-current" /><span className="text-yellow-600">{a.rating.toFixed(2)}</span></div>
          </div>
          <div className="flex flex-wrap gap-2 text-sm mt-1">
            {a.skills.map(s => (
              <span key={s} className="rounded-full bg-yellow-50 px-2 py-0.5 border">{s}</span>
            ))}
          </div>
          <div className="text-sm text-gray-600 mt-1">Languages: {a.langs.join(", ")}</div>
        </div>
      </div>
      {/* Rates aligned right */}
      <div className="mt-2 flex justify-end text-sm font-medium text-gray-700">
        Chat ₹{a.chat} / 5 min • Call ₹{a.call}/min
      </div>
      <div className="mt-3 flex gap-3">
        <Link to={`/chat?astro=${a.id}`} className="flex-1 rounded-md bg-yellow-500 py-2 text-center text-brown-900 font-semibold hover:bg-yellow-400 transition">Chat • 3 min FREE</Link>
        <Link to={`/calling?astro=${a.id}`} className="flex-1 rounded-md border border-yellow-400 py-2 text-center text-yellow-600 font-semibold hover:bg-yellow-50 transition">Call ₹{a.call}/min</Link>
      </div>
    </div>
  );
}