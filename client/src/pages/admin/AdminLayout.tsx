import { Link, Outlet, useLocation } from "react-router-dom";
import { 
  LayoutDashboard, 
  Users, 
  Package, 
  Bell, 
  BookOpen,
  LogOut,
  Menu,
  X
} from "lucide-react";
import { useState } from "react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

export default function AdminLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const location = useLocation();

  const handleLogout = () => {
    localStorage.removeItem('adminLoggedIn');
    window.location.href = '/';
  };

  const navItems = [
    { path: "/admin", label: "Dashboard", icon: <LayoutDashboard className="w-5 h-5" /> },
    { path: "/admin/astrologers", label: "Astrologers", icon: <Users className="w-5 h-5" /> },
    { path: "/admin/products", label: "Products", icon: <Package className="w-5 h-5" /> },
    { path: "/admin/notifications", label: "Notifications", icon: <Bell className="w-5 h-5" /> },
    { path: "/admin/poojas", label: "Pooja Add", icon: <BookOpen className="w-5 h-5" /> },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-yellow-50 via-white to-amber-50">
      {/* Mobile Header */}
      <div className="lg:hidden bg-white/95 backdrop-blur-md shadow-deep border-b border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <h1 className={`text-xl font-bold ${gradHead}`}>RUDRAGURU Admin</h1>
          <button 
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-md hover:bg-gray-100 transition-all duration-300"
          >
            {sidebarOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>

      {/* Mobile Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-black/50 z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      <div className="grid grid-cols-1 lg:grid-cols-[280px_1fr]">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 fixed lg:static inset-y-0 left-0 z-50 lg:z-auto w-72 bg-white/95 backdrop-blur-md shadow-deep border-r border-gray-200 transition-transform duration-300`}>
          <div className="p-6">
            <div className="flex items-center gap-3 mb-8">
              <img src="/assets/Logo2.png" alt="RUDRAGURU" className="h-10 w-auto" />
              <div>
                <h1 className={`text-lg font-bold ${gradHead}`}>RUDRAGURU</h1>
                <p className="text-xs text-gray-600">Admin Panel</p>
              </div>
            </div>
            
            <nav className="space-y-2">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  onClick={() => setSidebarOpen(false)}
                  className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                    location.pathname === item.path
                      ? 'bg-yellow-100 text-yellow-700 shadow-deep'
                      : 'text-gray-700 hover:bg-gray-50 hover:text-yellow-600'
                  }`}
                >
                  {item.icon}
                  <span className="font-medium">{item.label}</span>
                </Link>
              ))}
            </nav>

            <div className="mt-8 pt-6 border-t border-gray-200">
              <button
                onClick={handleLogout}
                className="flex items-center gap-3 px-4 py-3 w-full text-red-600 hover:bg-red-50 rounded-xl transition-all duration-300"
              >
                <LogOut className="w-5 h-5" />
                <span className="font-medium">Logout</span>
              </button>
            </div>
          </div>
        </aside>

        {/* Main Content */}
        <main className="p-6 lg:p-8">
          <div className="max-w-7xl mx-auto">
            <Outlet />
          </div>
        </main>
      </div>
    </div>
  );
}


