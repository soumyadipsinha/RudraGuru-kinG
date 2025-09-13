import { Link, NavLink } from "react-router-dom";
import { useEffect, useState } from "react";
import Logo from "../assets/Logo2.png";

const baseLink =
  "px-3 py-2 transition font-medium text-brown-900 hover:text-yellow-500";
const activeLink =
  "text-yellow-500 underline underline-offset-4 decoration-yellow-500";

export default function Navbar() {
  const [show, setShow] = useState(true);
  const [lastY, setLastY] = useState(0);

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY || window.pageYOffset;
      const goingDown = y > lastY;
      const threshold = 8; // small threshold to avoid jitter

      if (Math.abs(y - lastY) > threshold) {
        setShow(!goingDown || y < 80); // hide when scrolling down past 80px, show when scrolling up
        setLastY(y);
      }
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [lastY]);

  return (
    <header
      className={[
        "fixed top-0 inset-x-0 z-50 bg-white transition-transform duration-300",
        "shadow-md", // persistent subtle shadow under navbar
        show ? "translate-y-0" : "-translate-y-full",
      ].join(" ")}
    >
      <nav className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2">
          <img src={Logo} alt="RUDRAGURU" className="h-15 w-auto invert" />
          <span className="text-yellow-500 font-extrabold tracking-wide">
            RUDRAGURU
          </span>
        </Link>

        {/* Links */}
        <div className="hidden md:flex items-center gap-1">
          {[
            { to: "/", label: "HOME", end: true },
            { to: "/services", label: "SERVICES" },
            { to: "/gemstones", label: "GEMSTONES" },
            
            { to: "/astrologers", label: "BEST ASTROLOGERS" },
            { to: "/blog", label: "BLOG & ARTICLES" },
            { to: "/about", label: "ABOUT US" },
          ].map(({ to, label, end }) => (
            <NavLink
              key={to}
              to={to}
              end={end}
              className={({ isActive }) =>
                `${baseLink} ${isActive ? activeLink : ""}`
              }
            >
              {label}
            </NavLink>
          ))}
        </div>

        {/* Login */}
        <div className="flex items-center gap-3">
          <Link
            to="/login"
            className="inline-flex items-center rounded-2xl bg-yellow-500 px-4 py-2 text-brown-900 font-semibold shadow hover:bg-white hover:text-brown-900 hover:border hover:border-yellow-500"
          >
            Login
          </Link>
        </div>
      </nav>
    </header>
  );
}