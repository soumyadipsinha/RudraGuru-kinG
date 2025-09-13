import { Link } from "react-router-dom";
import Logo from "../assets/Logo2.png";

export default function Footer() {
  return (
    <footer className="bg-yellow-50 ">
      {/* top area */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-10 shadow-inner">
        {/* Brand */}
        <div>
          <div className="flex items-center gap-2">
            <img src={Logo} alt="RUDRAGURU" className="h-15 w-auto invert" />
            <span className="text-yellow-600 font-extrabold tracking-wide">RUDRAGURU</span>
          </div>
          <p className="mt-4 text-sm text-brown-800">
            Trusted guidance, authentic Rudraksha & certified gemstones for wellbeing, success and spiritual growth.
          </p>
        </div>

        {/* Services */}
        <div>
          <h4 className="text-brown-900 font-semibold mb-3">Services</h4>
          <ul className="space-y-2">
            <li><Link to="/services/kundli" className="text-yellow-700 hover:underline">Free Kundli</Link></li>
            <li><Link to="/services/horoscope" className="text-yellow-700 hover:underline">Daily/Weekly/Monthly Horoscope</Link></li>
            <li><Link to="/services/matchmaking" className="text-yellow-700 hover:underline">Matchmaking</Link></li>
            <li><Link to="/services/vastu" className="text-yellow-700 hover:underline">Vastu Shastra</Link></li>
            <li><Link to="/gemstones" className="text-yellow-700 hover:underline">Gemstone Recommendation</Link></li>
          </ul>
        </div>

        {/* Support */}
        <div>
          <h4 className="text-brown-900 font-semibold mb-3">Support</h4>
          <ul className="space-y-2">
            <li><Link to="/about" className="text-yellow-700 hover:underline">About us</Link></li>
            <li><Link to="/contact" className="text-yellow-700 hover:underline">Contact</Link></li>
            <li><Link to="/faq" className="text-yellow-700 hover:underline">FAQ</Link></li>
            <li><Link to="/privacy" className="text-yellow-700 hover:underline">Privacy Policy</Link></li>
            <li><Link to="/terms" className="text-yellow-700 hover:underline">Terms of Service</Link></li>
          </ul>
        </div>

        {/* Connect (single row) */}
        <div>
          <h4 className="text-brown-900 font-semibold mb-3">Connect</h4>
          <ul className="flex flex-wrap items-center gap-4">
            <li><a href="https://facebook.com" className="text-yellow-700 hover:text-yellow-600" aria-label="Facebook">Facebook</a></li>
            <li><a href="https://instagram.com" className="text-yellow-700 hover:text-yellow-600" aria-label="Instagram">Instagram</a></li>
            <li><a href="https://x.com" className="text-yellow-700 hover:text-yellow-600" aria-label="X">X</a></li>
            <li><a href="https://youtube.com" className="text-yellow-700 hover:text-yellow-600" aria-label="YouTube">YouTube</a></li>
          </ul>
        </div>
      </div>

      {/* thin bottom bar */}
      <div className="border-t border-yellow-600/70" />
      <div className="py-3">
        <p className="text-center text-sm text-brown-800">
          © {new Date().getFullYear()} RUDRAGURU. All rights reserved.
        </p>
      </div>
    </footer>
  );
}