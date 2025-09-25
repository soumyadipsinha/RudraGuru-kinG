import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  MessageSquare, 
  Phone, 
  Users, 
  Clock, 
  Star, 
  TrendingUp,
  Calendar,
  DollarSign,
  Activity
} from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function AstrologerDashboard() {
  const [timeRange, setTimeRange] = useState('today');

  const stats = [
    {
      title: "Total Consultations",
      value: "127",
      change: "+12%",
      icon: <Users className="w-6 h-6 text-blue-600" />,
      color: "bg-blue-50 text-blue-700"
    },
    {
      title: "Chat Sessions",
      value: "89",
      change: "+8%",
      icon: <MessageSquare className="w-6 h-6 text-green-600" />,
      color: "bg-green-50 text-green-700"
    },
    {
      title: "Call Sessions",
      value: "38",
      change: "+15%",
      icon: <Phone className="w-6 h-6 text-purple-600" />,
      color: "bg-purple-50 text-purple-700"
    },
    {
      title: "Total Earnings",
      value: "₹12,450",
      change: "+18%",
      icon: <DollarSign className="w-6 h-6 text-yellow-600" />,
      color: "bg-yellow-50 text-yellow-700"
    }
  ];

  const recentContacts = [
    {
      id: 1,
      name: "Priya Sharma",
      type: "Chat",
      duration: "15 min",
      time: "2:30 PM",
      rating: 4.8,
      amount: "₹165"
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      type: "Call",
      duration: "25 min",
      time: "1:45 PM",
      rating: 4.9,
      amount: "₹625"
    },
    {
      id: 3,
      name: "Sunita Patel",
      type: "Chat",
      duration: "8 min",
      time: "12:20 PM",
      rating: 4.7,
      amount: "₹88"
    },
    {
      id: 4,
      name: "Amit Singh",
      type: "Call",
      duration: "18 min",
      time: "11:15 AM",
      rating: 4.9,
      amount: "₹450"
    }
  ];

  const upcomingSessions = [
    {
      id: 1,
      name: "Deepika Verma",
      type: "Chat",
      time: "3:30 PM",
      status: "Confirmed"
    },
    {
      id: 2,
      name: "Vikram Joshi",
      type: "Call",
      time: "4:00 PM",
      status: "Pending"
    },
    {
      id: 3,
      name: "Meera Gupta",
      type: "Chat",
      time: "4:30 PM",
      status: "Confirmed"
    }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4 mb-6">
        <div>
          <h1 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Dashboard</h1>
          <p className="text-brown-600 mt-1 text-sm sm:text-base">Welcome back, Acharya Pradeep Shastri</p>
        </div>
        <div className="flex flex-col sm:flex-row gap-3">
          <select
            value={timeRange}
            onChange={(e) => setTimeRange(e.target.value)}
            className="rounded-lg border border-gray-300 px-3 py-2 text-sm focus:ring-2 focus:ring-yellow-500 focus:border-transparent w-full sm:w-auto"
          >
            <option value="today">Today</option>
            <option value="week">This Week</option>
            <option value="month">This Month</option>
            <option value="year">This Year</option>
          </select>
          <Link
            to="/astrologer/contacts"
            className="inline-flex items-center justify-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-brown-900 font-semibold hover:bg-yellow-400 transition text-sm sm:text-base"
          >
            <Users className="w-4 h-4" />
            <span className="hidden sm:inline">View All Contacts</span>
            <span className="sm:hidden">Contacts</span>
          </Link>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat, index) => (
          <div key={index} className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-brown-600 truncate">{stat.title}</p>
                <p className="text-xl sm:text-2xl font-bold text-brown-900 mt-1">{stat.value}</p>
                <p className="text-xs sm:text-sm text-green-600 mt-1 flex items-center gap-1">
                  <TrendingUp className="w-3 h-3" />
                  <span className="truncate">{stat.change} from last period</span>
                </p>
              </div>
              <div className={`p-2 sm:p-3 rounded-lg ${stat.color} flex-shrink-0 ml-3`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 sm:gap-6">
        {/* Recent Contacts */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-brown-900">Recent Contacts</h2>
            <Link to="/astrologer/contacts" className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium">
              View All
            </Link>
          </div>
          <div className="space-y-3">
            {recentContacts.map((contact) => (
              <div key={contact.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-yellow-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-yellow-700 font-semibold text-xs sm:text-sm">
                      {contact.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brown-900 text-sm sm:text-base truncate">{contact.name}</p>
                    <p className="text-xs sm:text-sm text-brown-600 flex items-center gap-1">
                      {contact.type === 'Chat' ? <MessageSquare className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                      <span className="truncate">{contact.type} • {contact.duration} • {contact.time}</span>
                    </p>
                  </div>
                </div>
                <div className="text-right flex-shrink-0 ml-2">
                  <div className="flex items-center gap-1">
                    <Star className="w-3 h-3 sm:w-4 sm:h-4 text-yellow-500 fill-current" />
                    <span className="text-xs sm:text-sm font-medium text-brown-900">{contact.rating}</span>
                  </div>
                  <p className="text-xs sm:text-sm font-semibold text-green-600">{contact.amount}</p>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Sessions */}
        <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-base sm:text-lg font-semibold text-brown-900">Upcoming Sessions</h2>
            <Link to="/astrologer/schedule" className="text-yellow-600 hover:text-yellow-700 text-xs sm:text-sm font-medium">
              Manage Schedule
            </Link>
          </div>
          <div className="space-y-3">
            {upcomingSessions.map((session) => (
              <div key={session.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                <div className="flex items-center gap-3 min-w-0 flex-1">
                  <div className="w-8 h-8 sm:w-10 sm:h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                    <span className="text-blue-700 font-semibold text-xs sm:text-sm">
                      {session.name.split(' ').map(n => n[0]).join('')}
                    </span>
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="font-medium text-brown-900 text-sm sm:text-base truncate">{session.name}</p>
                    <p className="text-xs sm:text-sm text-brown-600 flex items-center gap-1">
                      {session.type === 'Chat' ? <MessageSquare className="w-3 h-3" /> : <Phone className="w-3 h-3" />}
                      <span className="truncate">{session.type} • {session.time}</span>
                    </p>
                  </div>
                </div>
                <span className={`px-2 py-1 rounded-full text-xs font-medium flex-shrink-0 ml-2 ${
                  session.status === 'Confirmed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {session.status}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="bg-white rounded-xl p-4 sm:p-6 shadow-sm border border-gray-100">
        <h2 className="text-base sm:text-lg font-semibold text-brown-900 mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          <Link
            to="/astrologer/contacts"
            className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition"
          >
            <Users className="w-5 h-5 sm:w-6 sm:h-6 text-blue-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-brown-900 text-sm sm:text-base">View All Contacts</p>
              <p className="text-xs sm:text-sm text-brown-600 line-clamp-2">See complete contact history</p>
            </div>
          </Link>
          <Link
            to="/astrologer/schedule"
            className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition"
          >
            <Calendar className="w-5 h-5 sm:w-6 sm:h-6 text-green-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-brown-900 text-sm sm:text-base">Manage Schedule</p>
              <p className="text-xs sm:text-sm text-brown-600 line-clamp-2">Set availability and appointments</p>
            </div>
          </Link>
          <Link
            to="/astrologer/settings"
            className="flex items-center gap-3 p-3 sm:p-4 border border-gray-200 rounded-lg hover:bg-yellow-50 hover:border-yellow-300 transition sm:col-span-2 lg:col-span-1"
          >
            <Activity className="w-5 h-5 sm:w-6 sm:h-6 text-purple-600 flex-shrink-0" />
            <div className="min-w-0 flex-1">
              <p className="font-medium text-brown-900 text-sm sm:text-base">Update Profile</p>
              <p className="text-xs sm:text-sm text-brown-600 line-clamp-2">Manage your profile and rates</p>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
