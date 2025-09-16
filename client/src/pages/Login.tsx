import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Star, User, Circle } from "lucide-react";

// Gradient heading
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function Login() {
  const location = useLocation();
  const navigate = useNavigate();
  const redirectTo = new URLSearchParams(location.search).get('redirect') || '/dashboard';

  const [phone, setPhone] = useState("");
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const sanitized = phone.replace(/\D/g, "");
    if (!/^\d{10}$/.test(sanitized)) {
      alert('Please enter a valid 10-digit phone number');
      return;
    }
    
    setIsLoading(true);
    // Simulate sending OTP
    await new Promise(resolve => setTimeout(resolve, 1000));
    setIsLoading(false);
    
    // Navigate to OTP verification page with phone number
    navigate("/verify-otp", { 
      state: { phone: sanitized, rememberMe },
      replace: true 
    });
  };

  return (
    <main className="relative bg-transparent overflow-hidden min-h-screen">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
        <div className="absolute left-12 top-28 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]"><Sparkles className="w-4 h-4" /></div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
        @keyframes twinkle{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.08);} }
      `}</style>

      <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-brown-900" />
            </div>
            <h2 className={`text-3xl font-extrabold ${gradHead}`}>Welcome Back</h2>
            <p className="mt-2 text-brown-600">
              Sign in with your phone number
            </p>
          </div>

          {/* Login Form */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-8 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="phone" className="block text-sm font-medium text-brown-900 mb-2">Phone Number</label>
                <input
                  id="phone"
                  name="phone"
                  type="tel"
                  inputMode="numeric"
                  pattern="[0-9]{10}"
                  required
                  value={phone}
                  onChange={(e)=>setPhone(e.target.value)}
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="Enter 10-digit phone number"
                />
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    id="rememberMe"
                    name="rememberMe"
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e)=>setRememberMe(e.target.checked)}
                    className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-yellow-400 rounded"
                  />
                  <label htmlFor="rememberMe" className="ml-2 block text-sm text-brown-700">
                    Remember me
                  </label>
                </div>
                <div className="text-sm" />
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-brown-900 transition-all duration-200 ${
                    isLoading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-yellow-500 hover:bg-yellow-400 shadow-md hover:shadow-lg"
                  }`}
                >
                  {isLoading ? (
                    <div className="flex items-center">
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-brown-900" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending OTP...
                    </div>
                  ) : (
                    "Send OTP"
                  )}
                </button>
              </div>

              {/* Quick Access */}
              <div className="mt-6">
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-yellow-200" />
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-2 bg-white text-brown-500">Or quick access</span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-2 gap-3">
                  <Link
                    to="/kundli"
                    className="w-full inline-flex justify-center py-2 px-4 border border-yellow-300 rounded-xl shadow-sm bg-white text-sm font-medium text-brown-700 hover:bg-yellow-50 transition-colors text-center"
                  >Free Kundli</Link>
                  <Link
                    to="/horoscope"
                    className="w-full inline-flex justify-center py-2 px-4 border border-yellow-300 rounded-xl shadow-sm bg-white text-sm font-medium text-brown-700 hover:bg-yellow-50 transition-colors text-center"
                  >Daily Horoscope</Link>
                </div>
              </div>
            </form>
          </div>

          {/* Sign Up Link */}
          <div className="text-center">
            <p className="text-brown-600">
              Don't have an account{" "}
              <Link to="/signup" className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
                Sign up for free
              </Link>
            </p>
          </div>

          {/* Quick Access */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-6">
            <h3 className={`text-lg font-bold mb-4 ${gradHead}`}>Quick Access</h3>
            <div className="grid gap-3">
              <Link
                to="/kundli"
                className="flex items-center gap-3 p-3 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition-colors"
              >
                <Circle className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-brown-900">Free Kundli</div>
                  <div className="text-sm text-brown-600">Generate your birth chart</div>
                </div>
              </Link>
              <Link
                to="/horoscope"
                className="flex items-center gap-3 p-3 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition-colors"
              >
                <Star className="w-6 h-6 text-yellow-500" />
                <div>
                  <div className="font-medium text-brown-900">Daily Horoscope</div>
                  <div className="text-sm text-brown-600">Check your daily predictions</div>
                </div>
              </Link>
              <Link
                to="/astrologers"
                className="flex items-center gap-3 p-3 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition-colors"
              >
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-brown-900">Consult Astrologer</div>
                  <div className="text-sm text-brown-600">Get expert guidance</div>
                </div>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

