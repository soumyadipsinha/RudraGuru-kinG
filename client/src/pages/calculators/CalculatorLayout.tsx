import { Link } from "react-router-dom";

export default function CalculatorLayout({
  title,
  subtitle,
  icon,
  children,
  sidebar,
}: {
  title: string;
  subtitle?: string;
  icon?: React.ReactNode;
  children: React.ReactNode;
  sidebar?: React.ReactNode;
}) {
  const gradHead =
    "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

  return (
    <main className="bg-transparent">
      {/* Hero */}
      <section className="pt-20 pb-8 border-b border-yellow-200/40">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex items-center gap-3 mb-3">
            {icon}
            <h1 className={`text-3xl sm:text-4xl md:text-5xl font-extrabold ${gradHead}`}>{title}</h1>
          </div>
          {subtitle && <p className="text-brown-800 max-w-3xl">{subtitle}</p>}
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-6">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-2xl bg-yellow-400/90 p-4 sm:p-6 md:p-8 shadow-xl grid gap-4 md:grid-cols-2 items-center">
            <div className="text-brown-900 font-semibold">
              Connect with an Astrologer on Call or Chat for personalised detailed predictions.
            </div>
            <div className="flex gap-3 justify-center md:justify-end">
              <Link to="/chat" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white font-semibold shadow-md hover:bg-gray-800 transition">
                Talk to Astrologer
              </Link>
              <Link to="/chat" className="inline-flex items-center gap-2 rounded-full bg-black px-5 py-2.5 text-white font-semibold shadow-md hover:bg-gray-800 transition">
                Chat with Astrologer
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-10">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <div className="rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              {children}
            </div>
          </div>
          <aside className="md:col-span-1">
            <div className="rounded-2xl border-2 border-yellow-300/60 p-6 bg-white/90 backdrop-blur-sm shadow-lg">
              {sidebar || (
                <div>
                  <h3 className="font-semibold text-yellow-600 mb-2">Did you know?</h3>
                  <p className="text-brown-800 text-sm">These tools provide quick insights. For accurate, personalised guidance, talk to a verified astrologer.</p>
                </div>
              )}
            </div>
          </aside>
        </div>
      </section>
    </main>
  );
}


