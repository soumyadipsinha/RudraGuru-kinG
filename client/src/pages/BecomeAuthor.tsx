import { Link } from "react-router-dom";
import { BookOpen, Globe, Gem, Sparkles, Check } from "lucide-react";

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

export default function BecomeAuthor() {
  return (
    <main className="relative bg-transparent overflow-hidden">
      {/* Background decoration */}
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

      {/* Hero Section */}
      <Section className="pt-20 pb-12">
        <div className="text-center">
          <h1 className={`text-4xl sm:text-6xl font-extrabold mb-6 ${gradHead}`}>
            Become an Author
          </h1>
          <p className="text-xl text-brown-800 max-w-3xl mx-auto">
            Join our community of expert authors and share your knowledge about gemstones, 
            astrology, and spirituality with thousands of readers worldwide.
          </p>
        </div>
      </Section>

      {/* Benefits Section */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-12 ${gradHead}`}>
          Why Become an Author?
        </h2>
        <div className="grid gap-8 md:grid-cols-3">
          <div className="rounded-2xl border border-yellow-400 bg-white p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <BookOpen className="w-8 h-8 text-blue-600" />
            </div>
            <h3 className="text-xl font-bold text-brown-900 mb-3">Share Your Expertise</h3>
            <p className="text-brown-700">
              Help others learn from your years of experience in astrology, gemstones, and spiritual practices.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-400 bg-white p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Globe className="w-8 h-8 text-yellow-600" />
            </div>
            <h3 className="text-xl font-bold text-brown-900 mb-3">Reach Global Audience</h3>
            <p className="text-brown-700">
              Your articles will be read by thousands of people seeking spiritual guidance and knowledge.
            </p>
          </div>

          <div className="rounded-2xl border border-yellow-400 bg-white p-8 text-center transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
              <Gem className="w-8 h-8 text-purple-600" />
            </div>
            <h3 className="text-xl font-bold text-brown-900 mb-3">Build Your Reputation</h3>
            <p className="text-brown-700">
              Establish yourself as a trusted expert in your field and grow your professional network.
            </p>
          </div>
        </div>
      </Section>

      {/* Requirements Section */}
      <Section className="pb-12">
        <div className="grid gap-12 lg:grid-cols-2 items-center">
          <div>
            <h2 className={`text-3xl sm:text-4xl font-bold mb-6 ${gradHead}`}>
              Author Requirements
            </h2>
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">Expertise in Your Field</h3>
                  <p className="text-brown-700 text-sm">Proven knowledge in astrology, gemstones, spirituality, or related fields</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">Writing Skills</h3>
                  <p className="text-brown-700 text-sm">Ability to write clear, engaging, and informative content</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">Regular Contribution</h3>
                  <p className="text-brown-700 text-sm">Commitment to writing at least 2-3 articles per month</p>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 bg-yellow-500 rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                  <Check className="w-4 h-4 text-brown-900" />
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">Quality Content</h3>
                  <p className="text-brown-700 text-sm">Well-researched, accurate, and helpful articles for our readers</p>
                </div>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-yellow-400 bg-white p-8">
            <h3 className={`text-2xl font-bold mb-6 ${gradHead}`}>Application Process</h3>
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 text-brown-900 rounded-full flex items-center justify-center font-bold">1</div>
                <span className="text-brown-800">Submit your application with credentials</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 text-brown-900 rounded-full flex items-center justify-center font-bold">2</div>
                <span className="text-brown-800">Write a sample article for review</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 bg-yellow-500 text-brown-900 rounded-full flex items-center justify-center font-bold">3</div>
                <span className="text-brown-800">Get approved and start publishing</span>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* Topics Section */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold text-center mb-8 ${gradHead}`}>
          Topics We Cover
        </h2>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
          {[
            "Gemstone Properties & Benefits",
            "Vedic Astrology & Birth Charts",
            "Rudraksha Beads & Usage",
            "Numerology & Life Path",
            "Vastu Shastra & Home Design",
            "Meditation & Spiritual Practices",
            "Planetary Influences",
            "Healing & Wellness",
            "Ancient Wisdom & Traditions"
          ].map((topic) => (
            <div key={topic} className="rounded-xl border border-yellow-300 bg-white p-4 text-center hover:shadow-lg transition">
              <span className="text-brown-800 font-medium">{topic}</span>
            </div>
          ))}
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${gradHead}`}>Ready to Start Writing?</h3>
          <p className="text-brown-800 mb-6">
            Join our community of expert authors and help others on their spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/write-article"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
            >
              Write Your First Article
            </Link>
            <a
              href="mailto:authors@rudraguru.com"
              className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
            >
              Contact Us
            </a>
          </div>
        </div>
      </Section>
    </main>
  );
}
