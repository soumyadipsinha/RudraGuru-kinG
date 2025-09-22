import { Link, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import { Bell, User } from "lucide-react";
// Use public asset path

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);
  const [showNotifications, setShowNotifications] = useState(false);
  const location = useLocation();

  // Mock notification data
  const notifications = [
    {
      id: 1,
      title: "New Chat Message",
      message: "You have a new message from Priya Sharma",
      time: "2 minutes ago",
      type: "chat",
      read: false
    },
    {
      id: 2,
      title: "Appointment Reminder",
      message: "Your consultation with Rajesh Kumar is in 30 minutes",
      time: "15 minutes ago",
      type: "appointment",
      read: false
    },
    {
      id: 3,
      title: "Order Update",
      message: "Your Rudraksha order has been shipped",
      time: "1 hour ago",
      type: "order",
      read: true
    },
    {
      id: 4,
      title: "New Service Available",
      message: "Weekly Horoscope service is now available",
      time: "2 hours ago",
      type: "service",
      read: true
    }
  ];

  const unreadCount = notifications.filter(n => !n.read).length;
  const notificationRef = useRef<HTMLDivElement>(null);

  // Close notifications when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [showNotifications]);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  const handleMenuItemClick = () => {
    setActiveDropdown(null);
  };

  const handleNotificationToggle = () => {
    setShowNotifications(!showNotifications);
    setActiveDropdown(null); // Close other dropdowns
  };

  // Helper function to check if a route is active
  const isActiveRoute = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  // Helper function to get nav link classes
  const getNavLinkClasses = (path: string) => {
    const baseClasses = "relative px-3 py-2 rounded-lg font-medium transition-all duration-300 group";
    const activeClasses = "text-red-600 bg-red-50 shadow-sm";
    const inactiveClasses = "text-brown-800 hover:text-red-600 hover:bg-red-50";
    
    return `${baseClasses} ${isActiveRoute(path) ? activeClasses : inactiveClasses}`;
  };

  // Helper function to get dropdown button classes
  const getDropdownButtonClasses = (dropdown: string) => {
    const baseClasses = "flex items-center gap-1 px-3 py-2 rounded-lg font-medium transition-all duration-300 group";
    const activeClasses = "text-red-600 bg-red-50 shadow-sm";
    const inactiveClasses = "text-brown-800 hover:text-red-600 hover:bg-red-50";
    
    return `${baseClasses} ${activeDropdown === dropdown ? activeClasses : inactiveClasses}`;
  };

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-white/98 backdrop-blur-lg shadow-deep border-b-2 border-red-100",
      ].join(" ")}
    >
      {/* Top Row - AstroTalk Style */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-16 sm:h-18 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center group">
            <img src="/assets/HeroLogo.png" alt="RUDRAGURU" className="h-8 w-auto sm:h-29 group-hover:scale-110 transition-transform duration-300" />
          </Link>

          {/* Desktop Navigation and Login */}
          <div className="hidden lg:flex items-center gap-3">
            <Link
              to="/kundli"
              className={getNavLinkClasses("/kundli")}
            >
              Kundli
              {isActiveRoute("/kundli") && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </Link>
            
            <Link
              to="/chat"
              className={getNavLinkClasses("/chat")}
            >
              Chat with Astrologer
              {isActiveRoute("/chat") && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </Link>
            
            <Link
              to="/store"
              className={getNavLinkClasses("/store")}
            >
              RUDRAGURU Store
              {isActiveRoute("/store") && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </Link>
            
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('services')}
                className={getDropdownButtonClasses('services')}
              >
                Our Services
                <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'services' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-64 bg-white/98 backdrop-blur-lg rounded-xl shadow-deep-hover border border-red-100 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-red-100">
                    <span className="text-sm font-semibold text-red-600">Calculators</span>
                  </div>
                  <Link to="/calculators" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">All Calculators</Link>
                  <Link to="/calculators/love" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Love Calculator</Link>
                  <Link to="/calculators/numerology" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Numerology</Link>
                  <Link to="/calculators/rashi" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Rashi (Zodiac)</Link>
                  <Link to="/calculators/mangal-dosha" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Mangal Dosha</Link>
                  <Link to="/calculators/lucky-name-number" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Lucky Name/Number</Link>
                  
                  <div className="px-4 py-2 border-b border-red-100 mt-2">
                    <span className="text-sm font-semibold text-red-600">Horoscopes</span>
                  </div>
                  <Link to="/horoscope" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Daily Horoscope</Link>
                  <Link to="/horoscope/weekly" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Weekly Horoscope</Link>
                  <Link to="/horoscope/monthly" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Monthly Horoscope</Link>
                  <Link to="/horoscope/yearly" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">Yearly Horoscope</Link>
                </div>
              )}
            </div>
            
            <Link
              to="/about"
              className={getNavLinkClasses("/about")}
            >
              About Us
              {isActiveRoute("/about") && (
                <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-red-500 rounded-full"></div>
              )}
            </Link>
            
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('language')}
                className={getDropdownButtonClasses('language')}
              >
                Eng
                <svg className={`w-4 h-4 transition-transform duration-300 ${activeDropdown === 'language' ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'language' && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white/98 backdrop-blur-lg rounded-xl shadow-deep-hover border border-red-100 py-2 z-50 animate-fade-in">
                  <button onClick={handleMenuItemClick} className="block w-full text-left px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">English</button>
                  <button onClick={handleMenuItemClick} className="block w-full text-left px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">हिंदी</button>
                  <button onClick={handleMenuItemClick} className="block w-full text-left px-4 py-2 text-brown-700 hover:bg-red-50 hover:text-red-600 transition-all duration-300">বাংলা</button>
                </div>
              )}
            </div>

            {/* Notification Icon */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={handleNotificationToggle}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300 hover:scale-105"
              >
                <Bell className="w-5 h-5 text-brown-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold animate-pulse">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Notification Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-80 bg-white/98 backdrop-blur-lg rounded-xl shadow-deep-hover border border-gray-200 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-brown-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {notifications.map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${
                          notification.read ? 'border-transparent' : 'border-red-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.read ? 'bg-gray-300' : 'bg-red-500'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${
                              notification.read ? 'text-gray-700' : 'text-brown-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className={`inline-flex items-center gap-2 rounded-full px-6 py-2 font-semibold shadow-md transition-all duration-300 ${
                isActiveRoute("/login") 
                  ? "bg-red-500 text-white shadow-red-200" 
                  : "bg-yellow-500 text-brown-900 hover:bg-yellow-400 hover:scale-105"
              }`}
            >
              <User className="w-4 h-4" />
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3 relative">
            {/* Mobile Notification Icon */}
            <div className="relative" ref={notificationRef}>
              <button
                onClick={handleNotificationToggle}
                className="relative p-2 rounded-full bg-gray-100 hover:bg-gray-200 transition-all duration-300"
              >
                <Bell className="w-5 h-5 text-brown-700" />
                {unreadCount > 0 && (
                  <span className="absolute -top-1 -right-1 h-4 w-4 bg-red-500 text-white text-xs rounded-full flex items-center justify-center font-semibold">
                    {unreadCount > 9 ? '9+' : unreadCount}
                  </span>
                )}
              </button>
              
              {/* Mobile Notification Dropdown */}
              {showNotifications && (
                <div className="absolute top-full right-0 mt-2 w-72 bg-white/98 backdrop-blur-lg rounded-xl shadow-deep-hover border border-gray-200 py-2 z-50 animate-fade-in">
                  <div className="px-4 py-2 border-b border-gray-200">
                    <div className="flex items-center justify-between">
                      <h3 className="text-sm font-semibold text-brown-900">Notifications</h3>
                      {unreadCount > 0 && (
                        <span className="text-xs bg-red-100 text-red-700 px-2 py-1 rounded-full">
                          {unreadCount} new
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="max-h-60 overflow-y-auto">
                    {notifications.slice(0, 3).map((notification) => (
                      <div
                        key={notification.id}
                        className={`px-4 py-3 hover:bg-gray-50 transition-colors cursor-pointer border-l-4 ${
                          notification.read ? 'border-transparent' : 'border-red-500'
                        }`}
                      >
                        <div className="flex items-start gap-3">
                          <div className={`w-2 h-2 rounded-full mt-2 ${
                            notification.read ? 'bg-gray-300' : 'bg-red-500'
                          }`}></div>
                          <div className="flex-1">
                            <h4 className={`text-sm font-medium ${
                              notification.read ? 'text-gray-700' : 'text-brown-900'
                            }`}>
                              {notification.title}
                            </h4>
                            <p className="text-xs text-gray-600 mt-1">
                              {notification.message}
                            </p>
                            <p className="text-xs text-gray-500 mt-1">
                              {notification.time}
                            </p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="px-4 py-2 border-t border-gray-200">
                    <Link
                      to="/notifications"
                      onClick={() => setShowNotifications(false)}
                      className="text-xs text-blue-600 hover:text-blue-700 font-medium"
                    >
                      View all notifications
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              to="/login"
              className="inline-flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2 text-brown-900 font-semibold shadow-md hover:bg-yellow-400 transition-all duration-200 text-sm"
            >
              <User className="w-4 h-4" />
              <span className="hidden sm:inline">Login</span>
            </Link>
            <button
              onClick={() => handleDropdownToggle('mobile')}
              className="p-2 rounded-md text-brown-800 hover:text-blue-600 hover:bg-gray-50 transition-all duration-300"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Mobile Dropdown Menu */}
            {activeDropdown === 'mobile' && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-deep-hover border border-gray-200 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-gray-200">
                  <span className="text-sm font-semibold text-blue-600">Main Menu</span>
                </div>
                <Link to="/kundli" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Kundli</Link>
                <Link to="/chat" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Chat with Astrologer</Link>
                <Link to="/store" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">RUDRAGURU Store</Link>
                <Link to="/about" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">About Us</Link>
                <div className="px-4 py-2 border-b border-gray-200 mt-2">
                  <span className="text-sm font-semibold text-blue-600">Our Services</span>
                </div>
                <Link to="/horoscope" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Daily Horoscope</Link>
                <Link to="/horoscope/weekly" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Weekly Horoscope</Link>
                <Link to="/horoscope/monthly" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Monthly Horoscope</Link>
                <Link to="/horoscope/yearly" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Yearly Horoscope</Link>
                <Link to="/calculators" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">All Calculators</Link>
                <Link to="/calculators/love" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Love Calculator</Link>
                <Link to="/calculators/numerology" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Numerology</Link>
                <Link to="/calculators/rashi" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Rashi (Zodiac)</Link>
                <Link to="/calculators/mangal-dosha" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Mangal Dosha</Link>
                <Link to="/calculators/lucky-name-number" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Lucky Name/Number</Link>
                <div className="px-4 py-2 border-b border-gray-200 mt-2">
                  <span className="text-sm font-semibold text-blue-600">Products</span>
                </div>
                <Link to="/gemstones" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Gemstones</Link>
                <Link to="/store" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">All Products</Link>
                <div className="px-4 py-2 border-b border-gray-200 mt-2">
                  <span className="text-sm font-semibold text-blue-600">Account</span>
                </div>
                <Link to="/login" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Login</Link>
                <Link to="/signup" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-gray-50 hover:text-blue-600 transition-all duration-300">Sign Up</Link>
              </div>
            )}
          </div>
        </div>

      </nav>

      {/* Click outside to close dropdowns */}
      {activeDropdown && (
        <div
          className="fixed inset-0 z-40"
          onClick={handleDropdownClose}
        />
      )}
    </header>
  );
}