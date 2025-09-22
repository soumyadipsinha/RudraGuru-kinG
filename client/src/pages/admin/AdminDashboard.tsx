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
      <div>
        <h1 className={`text-3xl font-bold ${gradHead}`}>Admin Dashboard</h1>
        <p className="text-gray-600 mt-2">Welcome back! Manage your RUDRAGURU platform</p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={index} className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.label}</p>
                <p className="text-3xl font-bold text-gray-900 mt-2">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-xl bg-gray-100 ${stat.color}`}>
                {stat.icon}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Quick Actions */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Quick Actions</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {quickActions.map((action, index) => (
            <Link
              key={index}
              to={action.link}
              className="group rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105"
            >
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-xl text-white ${action.color}`}>
                  {action.icon}
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold text-gray-900 group-hover:text-yellow-600 transition-colors">
                    {action.title}
                  </h3>
                  <p className="text-sm text-gray-600 mt-1">{action.description}</p>
                </div>
                <Plus className="w-5 h-5 text-gray-400 group-hover:text-yellow-600 transition-colors" />
              </div>
            </Link>
          ))}
        </div>
      </div>

      {/* Recent Activity */}
      <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Recent Activity</h2>
        <div className="space-y-4">
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
            <div className="p-2 rounded-lg bg-green-100 text-green-600">
              <Package className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">New product added</p>
              <p className="text-sm text-gray-600">Yellow Sapphire - 2 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
            <div className="p-2 rounded-lg bg-blue-100 text-blue-600">
              <Users className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Astrologer profile updated</p>
              <p className="text-sm text-gray-600">Dr. Rajesh Sharma - 4 hours ago</p>
            </div>
          </div>
          <div className="flex items-center gap-4 p-4 rounded-xl bg-gray-50">
            <div className="p-2 rounded-lg bg-purple-100 text-purple-600">
              <Bell className="w-5 h-5" />
            </div>
            <div>
              <p className="font-medium text-gray-900">Notification sent</p>
              <p className="text-sm text-gray-600">New gemstone collection - 1 day ago</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}


