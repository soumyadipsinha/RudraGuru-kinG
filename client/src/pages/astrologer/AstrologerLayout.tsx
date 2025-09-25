import { Outlet, Link, useLocation } from "react-router-dom";
import { 
  MessageSquare, 
  Phone, 
  Users, 
  BarChart3, 
  Settings, 
  LogOut,
  Calendar,
  Clock,
  Star,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function AstrologerLayout() {
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  const getNavLinkClasses = (path: string) => {
    const baseClasses = "flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300";
    const activeClasses = "bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500";
    const inactiveClasses = "text-brown-700 hover:bg-yellow-50 hover:text-yellow-600";
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  const sidebarItems = [
    { path: "/astrologer/dashboard", label: "Dashboard", icon: <BarChart3 className="w-5 h-5" /> },
    { path: "/astrologer/contacts", label: "User Contacts", icon: <Users className="w-5 h-5" /> },
    { path: "/astrologer/chats", label: "Chat History", icon: <MessageSquare className="w-5 h-5" /> },
    { path: "/astrologer/calls", label: "Call History", icon: <Phone className="w-5 h-5" /> },
    { path: "/astrologer/schedule", label: "Schedule", icon: <Calendar className="w-5 h-5" /> },
    { path: "/astrologer/settings", label: "Settings", icon: <Settings className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Mobile Header */}
      <header className="lg:hidden bg-white shadow-sm border-b border-gray-200">
        <div className="px-4 py-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <Link to="/" className="flex items-center gap-2">
                <img src="/assets/Logo2.png" alt="RUDRAGURU" className="h-6 w-auto invert" />
                <span className="text-brown-900 font-bold text-sm">RUDRAGURU</span>
              </Link>
            </div>
            <button
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
            >
              {sidebarOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Desktop Header */}
      <header className="hidden lg:block bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <Link to="/" className="flex items-center gap-2">
                <img src="/assets/Logo2.png" alt="RUDRAGURU" className="h-8 w-auto invert" />
                <span className="text-brown-900 font-bold text-lg">RUDRAGURU</span>
              </Link>
              <div className="h-6 w-px bg-gray-300"></div>
              <h1 className={`text-xl font-bold ${gradHead}`}>Astrologer Portal</h1>
            </div>
            
            <div className="flex items-center gap-4">
              <div className="text-right">
                <p className="text-sm font-medium text-brown-900">Acharya Pradeep Shastri</p>
                <p className="text-xs text-brown-600">Vedic Astrology Expert</p>
              </div>
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-700 font-semibold">AP</span>
              </div>
              <Link
                to="/login"
                className="flex items-center gap-2 px-3 py-2 text-brown-600 hover:text-red-600 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                <span className="text-sm">Logout</span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="flex">
        {/* Mobile Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 bg-white shadow-sm min-h-screen transition-transform duration-300`}>
          <div className="p-4">
            {/* Mobile User Info */}
            <div className="lg:hidden flex items-center gap-3 mb-6 p-3 bg-yellow-50 rounded-lg">
              <div className="w-10 h-10 bg-yellow-100 rounded-full flex items-center justify-center">
                <span className="text-yellow-700 font-semibold">AP</span>
              </div>
              <div>
                <p className="text-sm font-medium text-brown-900">Acharya Pradeep Shastri</p>
                <p className="text-xs text-brown-600">Vedic Astrology Expert</p>
              </div>
            </div>

            <nav className="space-y-2">
              {sidebarItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={getNavLinkClasses(item.path)}
                >
                  {item.icon}
                  {item.label}
                </Link>
              ))}
            </nav>

            {/* Mobile Logout */}
            <div className="lg:hidden mt-6 pt-4 border-t border-gray-200">
              <Link
                to="/login"
                onClick={() => setSidebarOpen(false)}
                className="flex items-center gap-2 px-4 py-3 text-brown-600 hover:text-red-600 hover:bg-red-50 rounded-lg transition-colors"
              >
                <LogOut className="w-5 h-5" />
                <span>Logout</span>
              </Link>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 lg:p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
