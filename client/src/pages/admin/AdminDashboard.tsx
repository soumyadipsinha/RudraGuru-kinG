import { Link } from "react-router-dom";
import { Users, Package, Bell, TrendingUp, Eye, Plus } from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

export default function AdminDashboard() {
  const stats = [
    { label: "Total Astrologers", value: "12", icon: <Users className="w-6 h-6" />, color: "text-blue-600" },
    { label: "Active Products", value: "45", icon: <Package className="w-6 h-6" />, color: "text-green-600" },
    { label: "Notifications Sent", value: "8", icon: <Bell className="w-6 h-6" />, color: "text-purple-600" },
    { label: "Store Views", value: "1.2K", icon: <Eye className="w-6 h-6" />, color: "text-orange-600" },
  ];

  const quickActions = [
    { 
      title: "Add New Astrologer", 
      description: "Add a new astrologer to the platform",
      icon: <Users className="w-8 h-8" />,
      link: "/admin/astrologers",
      color: "bg-blue-500"
    },
    { 
      title: "Add New Product", 
      description: "Add products to Store or Astromall",
      icon: <Package className="w-8 h-8" />,
      link: "/admin/products",
      color: "bg-green-500"
    },
    { 
      title: "Send Notification", 
      description: "Notify users about new products",
      icon: <Bell className="w-8 h-8" />,
      link: "/admin/notifications",
      color: "bg-purple-500"
    },
  ];

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="mb-6">
        <h1 className={`text-2xl sm:text-3xl font-bold ${gradHead}`}>Admin Dashboard</h1>
        <p className="text-gray-600 mt-2 text-sm sm:text-base">Welcome back! Manage your RUDRAGURU platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-2xl p-4 sm:p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div className="flex-1 min-w-0">
                <p className="text-xs sm:text-sm font-medium text-gray-600 truncate">{stat.label}</p>
                <p className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-2 sm:p-3 rounded-xl bg-gray-100 ${stat.color} flex-shrink-0 ml-3`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Quick Actions</h2>
        <div className="grid gap-4 sm:gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group rounded-2xl p-4 sm:p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-3 sm:gap-4">
                <div className={`p-2 sm:p-3 rounded-xl text-white ${action.color} flex-shrink-0`}>
                  {action.icon}
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors text-sm sm:text-base">
                    {action.title}
                  </h3>
                  <p className="text-xs sm:text-sm text-gray-600 mt-1 line-clamp-2">{action.description}</p>
                </div>
                <Plus className="w-4 h-4 sm:w-5 sm:h-5 text-gray-400 group-hover:text-yellow-600 transition-colors flex-shrink-0" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl p-4 sm:p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h2 className="text-xl sm:text-2xl font-bold text-gray-900 mb-4 sm:mb-6">Recent Activity</h2>
        <div className="space-y-3 sm:space-y-4">
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50">
            <div className="p-2 rounded-lg bg-green-100 text-green-600 flex-shrink-0">
              <Package className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm sm:text-base">New product added</p>
              <p className="text-xs sm:text-sm text-gray-600">Yellow Sapphire - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600 flex-shrink-0">
              <Users className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm sm:text-base">Astrologer profile updated</p>
              <p className="text-xs sm:text-sm text-gray-600">Dr. Rajesh Sharma - 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-3 sm:gap-4 p-3 sm:p-4 rounded-xl bg-gray-50">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600 flex-shrink-0">
              <Bell className="w-4 h-4 sm:w-5 sm:h-5" />
            </div>
            <div className="min-w-0 flex-1">
              <p className="font-medium text-gray-900 text-sm sm:text-base">Notification sent</p>
              <p className="text-xs sm:text-sm text-gray-600">New gemstone collection - 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


