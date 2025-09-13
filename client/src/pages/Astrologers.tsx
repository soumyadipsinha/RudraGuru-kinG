import { useMemo, useState } from "react";
import { Link } from "react-router-dom";

import Astrologer from "../assets/astrologer.png"

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

const ASTROLOGERS = [
  { id: 1, name: "Pandit Rajesh Sharma", skills: ["Vedic Astrology","Marriage"], langs: ["Hindi","English"], rating: 4.9, chat: 18, call: 45, img: "https://avatar-placeholder.iran.liara.run/public/1" },
  { id: 2, name: "Astrologer Priya Devi", skills: ["Tarot Reading","Love & Relationships"], langs: ["Hindi","English","Bengali"], rating: 4.8, chat: 22, call: 50, img: "https://avatar-placeholder.iran.liara.run/public/2" },
  { id: 3, name: "Guruji Arun Kumar", skills: ["KP Astrology","Business"], langs: ["Hindi","Tamil","English"], rating: 4.9, chat: 20, call: 48, img: "https://avatar-placeholder.iran.liara.run/public/3" },
  { id: 4, name: "Smt. Kavita Joshi", skills: ["Palm Reading","Gemstone"], langs: ["Hindi","Gujarati","English"], rating: 4.7, chat: 19, call: 46, img: "https://avatar-placeholder.iran.liara.run/public/4" },
  { id: 5, name: "Acharya Vivek Sharma", skills: ["Vedic Astrology","Career"], langs: ["Hindi","English"], rating: 4.95, chat: 25, call: 55, img: "https://avatar-placeholder.iran.liara.run/public/5" },
  { id: 6, name: "Dr. Meera Iyer", skills: ["Numerology","Vastu"], langs: ["English","Tamil"], rating: 4.6, chat: 16, call: 40, img: "https://avatar-placeholder.iran.liara.run/public/6" },
  { id: 7, name: "Pandit Suresh Rao", skills: ["Vastu","KP Astrology"], langs: ["Hindi","English"], rating: 4.85, chat: 21, call: 49, img: "https://avatar-placeholder.iran.liara.run/public/7" },
  { id: 8, name: "Astrologer Nisha Gupta", skills: ["Tarot Reading","Gemstone"], langs: ["Hindi","English"], rating: 4.75, chat: 17, call: 44, img: "https://avatar-placeholder.iran.liara.run/public/8" },
];

const skillBuckets: Record<string, (skills: string[]) => boolean> = {
  "Palm Reading": (s: string[]) => s.some((x: string) => /palm/i.test(x)),
  "Numerology":   (s: string[]) => s.some((x: string) => /numero/i.test(x)),
  "Tarot Reading":(s: string[]) => s.some((x: string) => /tarot/i.test(x)),
  "Vedic Astrology": (s: string[]) => s.some((x: string) => /vedic/i.test(x)),
};

export default function Astrologers() {
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

  return (
    <main className="relative bg-white overflow-hidden">

      {/* Intro Section */}
      <Section className="pt-24 pb-9">
        <div className="grid gap-10 md:grid-cols-2 items-center">
          <div>
            <h1 className={`text-4xl sm:text-5xl font-extrabold pb-1 mb-6 ${gradHead}`}>Connect with Expert Astrologers</h1>
            <div className="grid gap-6 md:grid-cols-3 pt-6 mb-10">
              <div className="rounded-2xl bg-white p-6 ">
                <span className="text-lg">🜃</span>
                <p className="font-semibold">What We Offer</p>
                <p>Premium guidance with certified experts.</p>
              </div>
              <div className="rounded-2xl bg-white p-6 ">
                <span className="text-lg">✅</span>
                <p className="font-semibold">Our Assurance</p>
                <p>24×7 availability anywhere.</p>
              </div>
              <div className="rounded-2xl bg-white p-6 ">
                <span className="text-lg">✨</span>
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
            className="flex-1 rounded-md border border-yellow-400 p-3"
          />
          <div className="flex gap-2">
            <select value={skill} onChange={(e)=>setSkill(e.target.value)} className="rounded-md border border-yellow-400 p-2">
              <option>All</option>
              <option>Palm Reading</option>
              <option>Numerology</option>
              <option>Tarot Reading</option>
              <option>Vedic Astrology</option>
            </select>
            <select value={lang} onChange={(e)=>setLang(e.target.value)} className="rounded-md border border-yellow-400 p-2">
              <option>All</option>
              <option>Hindi</option>
              <option>English</option>
              <option>Bengali</option>
              <option>Tamil</option>
              <option>Gujarati</option>
            </select>
            <select value={sort} onChange={(e)=>setSort(e.target.value)} className="rounded-md border border-yellow-400 p-2">
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
    <div className="rounded-2xl border border-yellow-400 p-5 bg-white hover:shadow-xl transition">
      <div className="flex items-center gap-4">
        <img src={a.img} alt={a.name} className="h-16 w-16 rounded-full object-cover" />
        <div className="flex-1">
          <div className="flex justify-between items-center">
            <h3 className="font-semibold">{a.name}</h3>
            <span className="text-yellow-600">★ {a.rating.toFixed(2)}</span>
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
        Chat ₹{a.chat}/min • Call ₹{a.call}/min
      </div>
      <div className="mt-3 flex gap-3">
        <Link to="/chat" className="flex-1 rounded-md bg-yellow-500 py-2 text-center hover:bg-yellow-400">Chat</Link>
        <Link to="/call" className="flex-1 rounded-md border py-2 text-center hover:bg-gray-50">Call</Link>
      </div>
    </div>
  );
}