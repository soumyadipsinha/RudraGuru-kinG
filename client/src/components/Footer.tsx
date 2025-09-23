import { Link } from "react-router-dom";
// Use public asset path
import { Facebook, Instagram, Linkedin, Youtube, Mail, Headphones, Gift } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gray-800 text-white rounded-t-4xl">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Company Branding Section */}
        <div className="mb-8 pb-8 border-b border-gray-700">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <img src="/assets/Logo2.png" alt="RUDRAGURU" className="h-12 w-auto invert" />
              <div>
                <h3 className="text-2xl font-extrabold text-yellow-400 tracking-wide">RUDRAGURU</h3>
                <p className="text-sm text-gray-300">Expert Astrology & Spiritual Guidance</p>
              </div>
            </div>
            <div className="text-center md:text-right">
              <p className="text-sm text-gray-300 max-w-md">
                Trusted guidance, authentic Rudraksha & certified gemstones for wellbeing, success and spiritual growth.
              </p>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Left Column - Horoscopes & Services */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 underline">Horoscopes</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/horoscope" className="text-gray-300 hover:text-yellow-400">Today's Horoscope</Link></li>
              <li><Link to="/horoscope" className="text-gray-300 hover:text-yellow-400">Love Horoscope</Link></li>
              <li><Link to="/horoscope" className="text-gray-300 hover:text-yellow-400">Weekly Horoscope</Link></li>
              <li><Link to="/horoscope" className="text-gray-300 hover:text-yellow-400">Monthly Horoscope</Link></li>
              <li><Link to="/horoscope" className="text-gray-300 hover:text-yellow-400">Yearly Horoscope</Link></li>
            </ul>
            
            <h4 className="text-yellow-400 font-semibold mb-4 mt-6 underline">Shubh Muhurat 2025</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="text-gray-300 hover:text-yellow-400">Marriage</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-yellow-400">Car/Bike Purchase</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-yellow-400">Gold Buying</Link></li>
              <li><Link to="/services" className="text-gray-300 hover:text-yellow-400">Bhoomi Pujan</Link></li>
            </ul>
          </div>

          {/* Middle Column - Astromall & Services */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 underline">Astromall & Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Astromall</Link></li>
              <li><Link to="/carat-to-ratti-calculator" className="text-gray-300 hover:text-yellow-400">Carat to Ratti Calculator</Link></li>
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Today Panchang</Link></li>
              <li><Link to="/astrologers" className="text-gray-300 hover:text-yellow-400">Live Astrologers</Link></li>
              <li><Link to="/kundli" className="text-gray-300 hover:text-yellow-400">Free Kundli</Link></li>
              <li><Link to="/kundli" className="text-gray-300 hover:text-yellow-400">Kundli Matching</Link></li>
              <li><Link to="/chat" className="text-gray-300 hover:text-yellow-400">Chat with Astrologer</Link></li>
              <li><Link to="/chat" className="text-gray-300 hover:text-yellow-400">Talk to Astrologer</Link></li>
            </ul>
            
            <h4 className="text-yellow-400 font-semibold mb-4 mt-6 underline">Shop our products</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Evil Eye</Link></li>
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Rudraksha</Link></li>
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Gemstones</Link></li>
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Pyrite</Link></li>
              <li><Link to="/store" className="text-gray-300 hover:text-yellow-400">Selenite</Link></li>
            </ul>
          </div>

          {/* Right Column - Corporate Info */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 underline">Corporate Info</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/refund" className="text-gray-300 hover:text-yellow-400">Refund & Cancellation Policy</Link></li>
              <li><Link to="/terms" className="text-gray-300 hover:text-yellow-400">Terms & Conditions</Link></li>
              <li><Link to="/privacy" className="text-gray-300 hover:text-yellow-400">Privacy Policy</Link></li>
              <li><Link to="/disclaimer" className="text-gray-300 hover:text-yellow-400">Disclaimer</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-yellow-400">About Us</Link></li>
              <li><Link to="/pricing" className="text-gray-300 hover:text-yellow-400">Pricing Policy</Link></li>
            </ul>
          </div>

          {/* Right Column - Contact & Social */}
          <div>
            <h4 className="text-yellow-400 font-semibold mb-4 underline">Contact us</h4>
            <div className="space-y-3 text-sm">
              <div className="flex items-center gap-2">
                <Headphones className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">We are available 24x7 on chat support,</span>
              </div>
              <Link to="/chat" className="text-blue-400 hover:text-blue-300 underline ml-6">
                click to start chat
              </Link>
              
              <div className="flex items-center gap-2 mt-4">
                <Mail className="w-4 h-4 text-yellow-400" />
                <span className="text-gray-300">contact@rudraguru.com</span>
              </div>
            </div>

            {/* Social Media Icons */}
            <div className="flex items-center gap-4 mt-6">
              <a href="https://facebook.com" className="text-gray-300 hover:text-blue-400 transition-colors" aria-label="Facebook">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="https://instagram.com" className="text-gray-300 hover:text-pink-400 transition-colors" aria-label="Instagram">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="https://linkedin.com" className="text-gray-300 hover:text-blue-600 transition-colors" aria-label="LinkedIn">
                <Linkedin className="w-5 h-5" />
              </a>
              <a href="https://youtube.com" className="text-gray-300 hover:text-red-500 transition-colors" aria-label="YouTube">
                <Youtube className="w-5 h-5" />
              </a>
            </div>

            {/* Free Gift Banner */}
            <div className="mt-6 bg-yellow-500 text-black px-4 py-2 rounded-lg flex items-center gap-2">
              <div className="w-6 h-6 bg-black rounded-full flex items-center justify-center">
                <Gift className="w-4 h-4 text-yellow-500" />
              </div>
              <span className="font-semibold text-sm">Claim your FREE gift!</span>
            </div>
          </div>
        </div>
      </div>

      {/* Newsletter Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 pb-8">
        <div className="mt-4 pt-6 border-t border-gray-700">
          <div className="max-w-2xl mx-auto text-center">
            <h4 className="text-yellow-400 font-semibold">Newsletter</h4>
            <p className="text-sm text-gray-300 mt-2">Sign up to our newsletter to receive exclusive offers.</p>
            <form className="mt-4 flex flex-col sm:flex-row gap-3 justify-center" onSubmit={(e) => e.preventDefault()}>
              <label htmlFor="newsletter-email" className="sr-only">E-mail</label>
              <input
                id="newsletter-email"
                type="email"
                required
                placeholder="E-mail"
                className="w-full sm:w-auto min-w-0 sm:min-w-[280px] px-4 py-2 rounded-md bg-gray-900 text-white placeholder-gray-400 border border-gray-700 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
              <button
                type="submit"
                className="inline-flex items-center justify-center px-5 py-2 rounded-md bg-yellow-500 text-black font-semibold hover:bg-yellow-400 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-yellow-500 focus:ring-offset-gray-800"
              >
                Subscribe
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar with rounded corners */}
      <div className="bg-gray-900">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-4">
          <p className="text-center text-sm text-gray-400">
            © {new Date().getFullYear()} RUDRAGURU. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}