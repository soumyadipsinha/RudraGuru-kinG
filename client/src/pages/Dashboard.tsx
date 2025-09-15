import { useState } from "react";
import { Link } from "react-router-dom";

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

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("overview");

  const tabs = [
    { id: "overview", label: "Overview", icon: "🏠" },
    { id: "consultations", label: "My Consultations", icon: "💬" },
    { id: "reports", label: "My Reports", icon: "📊" },
    { id: "profile", label: "Profile", icon: "👤" },
    { id: "orders", label: "Orders", icon: "🛍️" }
  ];

  const recentConsultations = [
    {
      id: 1,
      astrologer: "Dr. Kavita Joshi",
      type: "Chat",
      date: "2024-01-15",
      duration: "25 min",
      amount: "₹375",
      status: "Completed",
      rating: 5,
      time: ""
    },
    {
      id: 2,
      astrologer: "Pandit Rajesh Sharma",
      type: "Call",
      date: "2024-01-12",
      duration: "45 min",
      amount: "₹675",
      status: "Completed",
      rating: 5,
      time: ""
    }
  ];

  const upcomingConsultations = [
    {
      id: 3,
      astrologer: "Acharya Vivek Sharma",
      type: "Video Call",
      date: "2024-01-20",
      time: "2:00 PM",
      amount: "₹500",
      status: "Upcoming",
      rating: 0,
      duration: ""
    }
  ];

  const myReports = [
    {
      id: 1,
      title: "Birth Chart Analysis",
      date: "2024-01-10",
      type: "Kundli Report"
    },
    {
      id: 2,
      title: "Career Guidance Report",
      date: "2024-01-08",
      type: "Career Analysis"
    }
  ];

  return (
    <main className="relative bg-transparent overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
      `}</style>

      {/* Header */}
      <Section className="pt-28 pb-8">
        <div className="flex items-center justify-between">
          <div>
            <h1 className={`text-3xl sm:text-4xl font-extrabold mb-2 ${gradHead}`}>
              Welcome back, User!
            </h1>
            <p className="text-brown-700">Manage your consultations, reports, and profile</p>
          </div>
          <div className="flex gap-3">
            <Link
              to="/astrologers"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-4 py-2 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
            >
              Book Consultation
            </Link>
            <Link
              to="/kundli"
              className="inline-flex items-center rounded-xl border border-yellow-400 px-4 py-2 text-yellow-600 font-semibold hover:bg-yellow-50 transition"
            >
              Generate Kundli
            </Link>
          </div>
        </div>
      </Section>

      {/* Tabs */}
      <Section className="pb-8">
        <div className="flex flex-wrap gap-2 border-b border-yellow-200">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`flex items-center gap-2 px-4 py-3 font-medium transition-all ${
                activeTab === tab.id
                  ? "text-yellow-600 border-b-2 border-yellow-500"
                  : "text-brown-600 hover:text-yellow-600"
              }`}
            >
              <span>{tab.icon}</span>
              {tab.label}
            </button>
          ))}
        </div>
      </Section>

      {/* Tab Content */}
      <Section className="pb-16">
        {activeTab === "overview" && (
          <div className="space-y-8">
            {/* Quick Stats */}
            <div className="grid gap-6 md:grid-cols-4">
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">💬</div>
                <div className="text-2xl font-bold text-brown-900">12</div>
                <div className="text-brown-600">Total Consultations</div>
              </div>
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">📊</div>
                <div className="text-2xl font-bold text-brown-900">5</div>
                <div className="text-brown-600">Reports Generated</div>
              </div>
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">⭐</div>
                <div className="text-2xl font-bold text-brown-900">4.8</div>
                <div className="text-brown-600">Average Rating</div>
              </div>
              <div className="rounded-2xl border border-yellow-400 bg-white p-6 text-center">
                <div className="text-3xl mb-2">💰</div>
                <div className="text-2xl font-bold text-brown-900">₹2,450</div>
                <div className="text-brown-600">Total Spent</div>
              </div>
            </div>

            {/* Upcoming Consultations */}
            <div className="rounded-2xl border border-yellow-400 bg-white p-6">
              <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Upcoming Consultations</h3>
              {upcomingConsultations.map((consultation) => (
                <div key={consultation.id} className="flex items-center justify-between p-4 bg-yellow-50 rounded-xl mb-3">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 font-bold">📞</span>
                    </div>
                    <div>
                      <div className="font-semibold text-brown-900">{consultation.astrologer}</div>
                      <div className="text-sm text-brown-600">{consultation.type} • {consultation.date} at {consultation.time}</div>
                    </div>
                  </div>
                  <div className="text-right">
                    <div className="font-semibold text-brown-900">{consultation.amount}</div>
                    <button className="text-yellow-600 hover:text-yellow-700 text-sm">Join Now</button>
                  </div>
                </div>
              ))}
            </div>

            {/* Recent Activity */}
            <div className="grid gap-6 md:grid-cols-2">
              <div className="rounded-2xl border border-yellow-400 bg-white p-6">
                <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Recent Consultations</h3>
                {recentConsultations.slice(0, 3).map((consultation) => (
                  <div key={consultation.id} className="flex items-center justify-between p-3 border-b border-yellow-100 last:border-b-0">
                    <div>
                      <div className="font-medium text-brown-900">{consultation.astrologer}</div>
                      <div className="text-sm text-brown-600">{consultation.type} • {consultation.duration}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-brown-600">{consultation.date}</div>
                      <div className="text-yellow-500">{"★".repeat(consultation.rating)}</div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="rounded-2xl border border-yellow-400 bg-white p-6">
                <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Recent Reports</h3>
                {myReports.slice(0, 3).map((report) => (
                  <div key={report.id} className="flex items-center justify-between p-3 border-b border-yellow-100 last:border-b-0">
                    <div>
                      <div className="font-medium text-brown-900">{report.title}</div>
                      <div className="text-sm text-brown-600">{report.type}</div>
                    </div>
                    <div className="text-right">
                      <div className="text-sm text-brown-600">{report.date}</div>
                      <button className="text-yellow-600 hover:text-yellow-700 text-sm">View</button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === "consultations" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className={`text-2xl font-bold ${gradHead}`}>All Consultations</h3>
              <Link
                to="/astrologers"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-4 py-2 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
              >
                Book New Consultation
              </Link>
            </div>

            <div className="space-y-4">
              {[...recentConsultations, ...upcomingConsultations].map((consultation) => (
                <div key={consultation.id} className="rounded-2xl border border-yellow-400 bg-white p-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                        <span className="text-2xl">👨‍💼</span>
                      </div>
                      <div>
                        <div className="font-bold text-brown-900">{consultation.astrologer}</div>
                        <div className="text-brown-600">{consultation.type}</div>
                        <div className="text-sm text-brown-500">
                          {consultation.date} {consultation.time && `at ${consultation.time}`}
                          {consultation.duration && ` • ${consultation.duration}`}
                        </div>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="font-bold text-brown-900">{consultation.amount}</div>
                      <div className={`text-sm px-3 py-1 rounded-full ${
                        consultation.status === 'Completed' 
                          ? 'bg-green-100 text-green-700' 
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {consultation.status || 'Upcoming'}
                      </div>
                      {consultation.rating && (
                        <div className="text-yellow-500 mt-1">{"★".repeat(consultation.rating)}</div>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "reports" && (
          <div className="space-y-6">
            <div className="flex justify-between items-center">
              <h3 className={`text-2xl font-bold ${gradHead}`}>My Reports</h3>
              <Link
                to="/kundli"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-4 py-2 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
              >
                Generate New Report
              </Link>
            </div>

            <div className="grid gap-6 md:grid-cols-2">
              {myReports.map((report) => (
                <div key={report.id} className="rounded-2xl border border-yellow-400 bg-white p-6">
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-600 text-xl">📊</span>
                    </div>
                    <div>
                      <div className="font-bold text-brown-900">{report.title}</div>
                      <div className="text-brown-600">{report.type}</div>
                    </div>
                  </div>
                  <div className="flex justify-between items-center">
                    <div className="text-sm text-brown-500">Generated on {report.date}</div>
                    <div className="flex gap-2">
                      <button className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-lg hover:bg-yellow-200 transition">
                        View
                      </button>
                      <button className="px-3 py-1 border border-yellow-400 text-yellow-600 rounded-lg hover:bg-yellow-50 transition">
                        Download
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {activeTab === "profile" && (
          <div className="max-w-2xl">
            <h3 className={`text-2xl font-bold mb-6 ${gradHead}`}>Profile Settings</h3>
            <div className="rounded-2xl border border-yellow-400 bg-white p-6 space-y-6">
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Full Name</label>
                <input
                  type="text"
                  defaultValue="John Doe"
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="john@example.com"
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Phone</label>
                <input
                  type="tel"
                  defaultValue="+91 9876543210"
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Date of Birth</label>
                <input
                  type="date"
                  defaultValue="1990-01-01"
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Time of Birth</label>
                <input
                  type="time"
                  defaultValue="10:30"
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-900 mb-2">Place of Birth</label>
                <input
                  type="text"
                  defaultValue="Mumbai, India"
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                />
              </div>
              <button className="w-full rounded-xl bg-yellow-500 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition">
                Update Profile
              </button>
            </div>
          </div>
        )}

        {activeTab === "orders" && (
          <div className="space-y-6">
            <h3 className={`text-2xl font-bold ${gradHead}`}>My Orders</h3>
            <div className="text-center py-12">
              <div className="text-6xl mb-4">🛍️</div>
              <h4 className="text-xl font-semibold text-brown-900 mb-2">No Orders Yet</h4>
              <p className="text-brown-600 mb-6">You haven't placed any orders for gemstones or products.</p>
              <Link
                to="/gemstones"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
              >
                Explore Gemstones
              </Link>
            </div>
          </div>
        )}
      </Section>
    </main>
  );
}
