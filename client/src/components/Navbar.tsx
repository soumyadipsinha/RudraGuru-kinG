import { Link } from "react-router-dom";
import { useState } from "react";
import Logo from "../assets/Logo2.png";

export default function Navbar() {
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  const handleDropdownToggle = (dropdown: string) => {
    setActiveDropdown(activeDropdown === dropdown ? null : dropdown);
  };

  const handleDropdownClose = () => {
    setActiveDropdown(null);
  };

  const handleMenuItemClick = () => {
    setActiveDropdown(null);
  };

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 transition-all duration-300",
        "bg-white/95 backdrop-blur-md shadow-xl border-b-2 border-yellow-200/50",
      ].join(" ")}
    >
      {/* Top Row - AstroTalk Style */}
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="h-14 sm:h-16 flex items-center justify-between">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 sm:gap-3">
            <img src={Logo} alt="RUDRAGURU" className="h-8 w-auto sm:h-10 invert" />
            <span className="text-brown-900 font-bold text-lg sm:text-xl tracking-wide">RUDRAGURU</span>
          </Link>

          {/* Desktop Navigation and Login */}
          <div className="hidden lg:flex items-center gap-6">
            <Link
              to="/kundli"
              className="text-brown-800 hover:text-yellow-600 font-medium transition-colors"
            >
              Free Kundli
            </Link>
           
            <Link
              to="/kundli-matching"
              className="text-brown-800 hover:text-yellow-600 font-medium transition-colors"
            >
              Kundli Matching
            </Link>
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('calculators')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Calculators
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'calculators' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <Link to="/calculators" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">All Calculators</Link>
                  <Link to="/calculators/love" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Love Calculator</Link>
                  <Link to="/calculators/numerology" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Numerology</Link>
                  <Link to="/calculators/rashi" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Rashi (Zodiac)</Link>
                  <Link to="/calculators/mangal-dosha" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Mangal Dosha</Link>
                  <Link to="/calculators/lucky-name-number" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Lucky Name/Number</Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('horoscopes')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Horoscopes
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'horoscopes' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <Link to="/horoscope" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Daily Horoscope</Link>
                  <Link to="/horoscope/weekly" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Weekly Horoscope</Link>
                  <Link to="/horoscope/monthly" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Monthly Horoscope</Link>
                  <Link to="/horoscope/yearly" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Yearly Horoscope</Link>
                </div>
              )}
            </div>
             <Link
              to="/about"
              className="text-brown-800 hover:text-yellow-600 font-medium transition-colors"
            >
              About Us
            </Link>
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('language')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Eng
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'language' && (
                <div className="absolute top-full left-0 mt-2 w-32 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <button onClick={handleMenuItemClick} className="block w-full text-left px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">English</button>
                  <button onClick={handleMenuItemClick} className="block w-full text-left px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">हिंदी</button>
                </div>
              )}
            </div>

            {/* Login Button */}
            <Link
              to="/login"
              className="inline-flex items-center gap-2 rounded-full bg-yellow-500 px-6 py-2 text-brown-900 font-semibold shadow-md hover:bg-yellow-400 transition-all duration-200"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              Login
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="lg:hidden flex items-center gap-3 relative">
            <Link
              to="/login"
              className="inline-flex items-center gap-1 rounded-full bg-yellow-500 px-4 py-2 text-brown-900 font-semibold shadow-md hover:bg-yellow-400 transition-all duration-200 text-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
              </svg>
              <span className="hidden sm:inline">Login</span>
            </Link>
            <button
              onClick={() => handleDropdownToggle('mobile')}
              className="p-2 rounded-md text-brown-800 hover:text-yellow-600 hover:bg-yellow-50 transition-colors"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
            
            {/* Mobile Dropdown Menu */}
            {activeDropdown === 'mobile' && (
              <div className="absolute top-full right-0 mt-2 w-72 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50 max-h-96 overflow-y-auto">
                <div className="px-4 py-2 border-b border-yellow-200/30">
                  <span className="text-sm font-semibold text-yellow-600">Main Menu</span>
                </div>
                <Link to="/kundli" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Free Kundli</Link>
                <Link to="/about" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">About Us</Link>
                <Link to="/horoscope" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Daily Horoscope</Link>
                <Link to="/horoscope/weekly" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Weekly Horoscope</Link>
                <Link to="/horoscope/monthly" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Monthly Horoscope</Link>
                <Link to="/horoscope/yearly" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Yearly Horoscope</Link>
                <Link to="/astrologers" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Best Astrologers</Link>
                <Link to="/chat" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Chat with Astrologer</Link>
                <div className="px-4 py-2 border-b border-yellow-200/30 mt-2">
                  <span className="text-sm font-semibold text-yellow-600">Products</span>
                </div>
                <Link to="/gemstones" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Gemstones</Link>
                <Link to="/store" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">All Products</Link>
                <Link to="/blog" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Blogs</Link>
                <div className="px-4 py-2 border-b border-yellow-200/30 mt-2">
                  <span className="text-sm font-semibold text-yellow-600">Calculators</span>
                </div>
                <Link to="/calculators" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">All Calculators</Link>
                <Link to="/calculators/love" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Love Calculator</Link>
                <Link to="/calculators/numerology" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Numerology</Link>
                <Link to="/calculators/rashi" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Rashi (Zodiac)</Link>
                <Link to="/calculators/mangal-dosha" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Mangal Dosha</Link>
                <Link to="/calculators/lucky-name-number" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Lucky Name/Number</Link>
                <div className="px-4 py-2 border-b border-yellow-200/30 mt-2">
                  <span className="text-sm font-semibold text-yellow-600">Account</span>
                </div>
                <Link to="/login" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Login</Link>
                <Link to="/signup" onClick={handleMenuItemClick} className="block px-4 py-3 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600 transition-colors">Sign Up</Link>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Row - Services */}
        <div className="h-12 flex items-center justify-center border-t border-gray-100">
          <div className="hidden lg:flex items-center gap-8">
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('astrologers')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Best Astrologers
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'astrologers' && (
                <div className="absolute top-full left-0 mt-2 w-56 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <Link to="/astrologers" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">All Astrologers</Link>
                  <Link to="/top-astrologers" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Top Rated</Link>
                  <Link to="/vedic-astrologers" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Vedic Astrologers</Link>
                  <Link to="/numerology-experts" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Numerology Experts</Link>
                </div>
              )}
            </div>
            <Link
              to="/chat"
              className="text-brown-800 hover:text-yellow-600 font-medium transition-colors"
            >
              Chat with Astrologer
            </Link>
            <Link
              to="/talk-to-astrologer"
              className="text-brown-800 hover:text-yellow-600 font-medium transition-colors"
            >
              Talk to Astrologer
            </Link>
            
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('store')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Astromall
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'store' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <Link to="/gemstones" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Gemstones</Link>
                  <Link to="/store" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">All Products</Link>
                  <Link to="/rudraksha" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Rudraksha</Link>
                  <Link to="/yantras" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Yantras</Link>
                  <Link to="/puja-items" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Puja Items</Link>
                </div>
              )}
            </div>
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('services')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Our Services
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'services' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <Link to="/services" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">All Services</Link>
                  <Link to="/kundli" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Free Kundli</Link>
                  <Link to="/horoscope" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Horoscope</Link>
                  <Link to="/vastu" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Vastu Consultation</Link>
                </div>
              )}
            </div>
            <Link
              to="/store"
              className="text-brown-800 hover:text-yellow-600 font-medium transition-colors"
            >
              RUDRAGURU Store
            </Link>
            <div className="relative">
              <button
                onClick={() => handleDropdownToggle('blog')}
                className="flex items-center gap-1 text-brown-800 hover:text-yellow-600 font-medium transition-colors"
              >
                Blogs
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              {activeDropdown === 'blog' && (
                <div className="absolute top-full left-0 mt-2 w-48 bg-white/95 backdrop-blur-md rounded-xl shadow-2xl border-2 border-yellow-200/50 py-2 z-50">
                  <Link to="/blog" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">All Articles</Link>
                  <Link to="/write-article" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Write Article</Link>
                  <Link to="/become-author" onClick={handleMenuItemClick} className="block px-4 py-2 text-brown-700 hover:bg-yellow-50 hover:text-yellow-600">Become Author</Link>
                </div>
              )}
            </div>
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