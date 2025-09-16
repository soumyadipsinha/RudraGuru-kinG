import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { Sparkles, Smartphone } from "lucide-react";

// Gradient heading
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

export default function VerifyOtp() {
  const location = useLocation();
  const navigate = useNavigate();
  const [otp, setOtp] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [timeLeft, setTimeLeft] = useState(60);
  const [canResend, setCanResend] = useState(false);

  // Get phone number from location state
  const phone = location.state?.phone || "";

  useEffect(() => {
    if (!phone) {
      navigate("/login");
      return;
    }

    // Start countdown timer
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          setCanResend(true);
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [phone, navigate]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (otp.length !== 6) {
      alert("Please enter a valid 6-digit OTP");
      return;
    }

    setIsLoading(true);
    // Simulate OTP verification
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, accept any 6-digit OTP
    if (otp.length === 6) {
      localStorage.setItem('isLoggedIn', 'true');
      localStorage.setItem('loginPhone', phone);
      setIsLoading(false);
      alert("Logged in successfully!");
      navigate("/dashboard", { replace: true });
    } else {
      setIsLoading(false);
      alert("Invalid OTP. Please try again.");
    }
  };

  const handleResendOtp = async () => {
    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 800));
    setTimeLeft(60);
    setCanResend(false);
    setIsLoading(false);
    alert("OTP sent successfully!");
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
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
              <Smartphone className="w-6 h-6 text-brown-900" />
            </div>
            <h2 className={`text-3xl font-extrabold ${gradHead}`}>
              Verify OTP
            </h2>
            <p className="mt-2 text-brown-600">
              Enter the 6-digit code sent to
            </p>
            <p className="text-brown-800 font-semibold">
              +91 {phone}
            </p>
          </div>

          {/* OTP Form */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-8 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              <div>
                <label htmlFor="otp" className="block text-sm font-medium text-brown-900 mb-2">
                  Enter OTP
                </label>
                <input
                  id="otp"
                  name="otp"
                  type="text"
                  inputMode="numeric"
                  pattern="[0-9]{6}"
                  maxLength={6}
                  required
                  value={otp}
                  onChange={(e) => setOtp(e.target.value.replace(/\D/g, ''))}
                  className="w-full rounded-xl border border-yellow-400 p-4 text-center text-2xl font-bold tracking-widest focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                  placeholder="000000"
                />
              </div>

              {/* Timer */}
              <div className="text-center">
                {!canResend ? (
                  <p className="text-brown-600">
                    Resend OTP in <span className="font-semibold text-yellow-600">{formatTime(timeLeft)}</span>
                  </p>
                ) : (
                  <button
                    type="button"
                    onClick={handleResendOtp}
                    disabled={isLoading}
                    className="text-yellow-600 hover:text-yellow-500 font-medium transition-colors"
                  >
                    Resend OTP
                  </button>
                )}
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isLoading || otp.length !== 6}
                  className={`w-full flex justify-center py-3 px-4 border border-transparent rounded-xl text-sm font-medium text-brown-900 transition-all duration-200 ${
                    isLoading || otp.length !== 6
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
                      Verifying...
                    </div>
                  ) : (
                    "Verify & Continue"
                  )}
                </button>
              </div>
            </form>
          </div>

          {/* Back to Login */}
          <div className="text-center">
            <button
              onClick={() => navigate("/login")}
              className="text-brown-600 hover:text-brown-500 font-medium transition-colors"
            >
              ← Back to Login
            </button>
          </div>
        </div>
      </div>
    </main>
  );
}
