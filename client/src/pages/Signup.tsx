import { useState } from "react";
import { Link } from "react-router-dom";
import { Circle, Star, User, Gem, Sparkles } from "lucide-react";

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

export default function Signup() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    dateOfBirth: "",
    gender: "",
    agreeToTerms: false,
    subscribeNewsletter: true
  });
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target;
    const checked = (e.target as HTMLInputElement).checked;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleNextStep = () => {
    if (currentStep < 3) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handlePrevStep = () => {
    if (currentStep > 1) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    setIsLoading(false);
    // Redirect to dashboard or home
    window.location.href = '/dashboard';
  };

  const isStepValid = () => {
    switch (currentStep) {
      case 1:
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 2:
        return formData.password && formData.confirmPassword && formData.password === formData.confirmPassword;
      case 3:
        return formData.dateOfBirth && formData.gender && formData.agreeToTerms;
      default:
        return false;
    }
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
        <div className="max-w-2xl w-full space-y-8">
          {/* Header */}
          <div className="text-center">
            <div className="mx-auto h-16 w-16 bg-yellow-500 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-6 h-6 text-brown-900" />
            </div>
            <h2 className={`text-3xl font-extrabold ${gradHead}`}>
              Join RUDRAGURU
            </h2>
            <p className="mt-2 text-brown-600">
              Create your account and start your spiritual journey
            </p>
          </div>

          {/* Progress Steps */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            {[1, 2, 3].map((step) => (
              <div key={step} className="flex items-center">
                <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-medium ${
                  step <= currentStep 
                    ? 'bg-yellow-500 text-brown-900' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  {step}
                </div>
                {step < 3 && (
                  <div className={`w-16 h-1 mx-2 ${
                    step < currentStep ? 'bg-yellow-500' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>

          {/* Signup Form */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-8 shadow-lg">
            <form className="space-y-6" onSubmit={handleSubmit}>
              {/* Step 1: Personal Information */}
              {currentStep === 1 && (
                <div className="space-y-6">
                  <h3 className={`text-xl font-bold ${gradHead}`}>Personal Information</h3>
                  
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="firstName" className="block text-sm font-medium text-brown-900 mb-2">
                        First Name *
                      </label>
                      <input
                        id="firstName"
                        name="firstName"
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        placeholder="Enter your first name"
                      />
                    </div>
                    <div>
                      <label htmlFor="lastName" className="block text-sm font-medium text-brown-900 mb-2">
                        Last Name *
                      </label>
                      <input
                        id="lastName"
                        name="lastName"
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        placeholder="Enter your last name"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-brown-900 mb-2">
                      Email Address *
                    </label>
                    <input
                      id="email"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      value={formData.email}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="Enter your email address"
                    />
                  </div>

                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-brown-900 mb-2">
                      Phone Number *
                    </label>
                    <input
                      id="phone"
                      name="phone"
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                      placeholder="Enter your phone number"
                    />
                  </div>
                </div>
              )}

              {/* Step 2: Security */}
              {currentStep === 2 && (
                <div className="space-y-6">
                  <h3 className={`text-xl font-bold ${gradHead}`}>Create Password</h3>
                  
                  <div>
                    <label htmlFor="password" className="block text-sm font-medium text-brown-900 mb-2">
                      Password *
                    </label>
                    <div className="relative">
                      <input
                        id="password"
                        name="password"
                        type={showPassword ? "text" : "password"}
                        required
                        value={formData.password}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-yellow-400 p-3 pr-10 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        placeholder="Create a strong password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showPassword ? (
                          <svg className="h-5 w-5 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="confirmPassword" className="block text-sm font-medium text-brown-900 mb-2">
                      Confirm Password *
                    </label>
                    <div className="relative">
                      <input
                        id="confirmPassword"
                        name="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        required
                        value={formData.confirmPassword}
                        onChange={handleInputChange}
                        className="w-full rounded-xl border border-yellow-400 p-3 pr-10 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                        placeholder="Confirm your password"
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute inset-y-0 right-0 pr-3 flex items-center"
                      >
                        {showConfirmPassword ? (
                          <svg className="h-5 w-5 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21" />
                          </svg>
                        ) : (
                          <svg className="h-5 w-5 text-brown-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                          </svg>
                        )}
                      </button>
                    </div>
                    {formData.password && formData.confirmPassword && formData.password !== formData.confirmPassword && (
                      <p className="mt-1 text-sm text-red-600">Passwords do not match</p>
                    )}
                  </div>

                  {/* Password Requirements */}
                  <div className="bg-yellow-50 p-4 rounded-xl">
                    <h4 className="font-medium text-brown-900 mb-2">Password Requirements:</h4>
                    <ul className="text-sm text-brown-700 space-y-1">
                      <li className={formData.password.length >= 8 ? "text-yellow-600" : ""}>
                        • At least 8 characters long
                      </li>
                      <li className={/[A-Z]/.test(formData.password) ? "text-yellow-600" : ""}>
                        • Contains uppercase letter
                      </li>
                      <li className={/[a-z]/.test(formData.password) ? "text-yellow-600" : ""}>
                        • Contains lowercase letter
                      </li>
                      <li className={/\d/.test(formData.password) ? "text-yellow-600" : ""}>
                        • Contains number
                      </li>
                    </ul>
                  </div>
                </div>
              )}

              {/* Step 3: Astrological Information */}
              {currentStep === 3 && (
                <div className="space-y-6">
                  <h3 className={`text-xl font-bold ${gradHead}`}>Astrological Information</h3>
                  
                  <div>
                    <label htmlFor="dateOfBirth" className="block text-sm font-medium text-brown-900 mb-2">
                      Date of Birth *
                    </label>
                    <input
                      id="dateOfBirth"
                      name="dateOfBirth"
                      type="date"
                      required
                      value={formData.dateOfBirth}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    />
                  </div>

                  <div>
                    <label htmlFor="gender" className="block text-sm font-medium text-brown-900 mb-2">
                      Gender *
                    </label>
                    <select
                      id="gender"
                      name="gender"
                      required
                      value={formData.gender}
                      onChange={handleInputChange}
                      className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition-all"
                    >
                      <option value="">Select Gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div className="space-y-4">
                    <div className="flex items-center">
                      <input
                        id="agreeToTerms"
                        name="agreeToTerms"
                        type="checkbox"
                        required
                        checked={formData.agreeToTerms}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-yellow-400 rounded"
                      />
                      <label htmlFor="agreeToTerms" className="ml-2 block text-sm text-brown-700">
                        I agree to the{" "}
                        <Link to="/terms" className="text-yellow-600 hover:text-yellow-500">
                          Terms of Service
                        </Link>{" "}
                        and{" "}
                        <Link to="/privacy" className="text-yellow-600 hover:text-yellow-500">
                          Privacy Policy
                        </Link>
                      </label>
                    </div>

                    <div className="flex items-center">
                      <input
                        id="subscribeNewsletter"
                        name="subscribeNewsletter"
                        type="checkbox"
                        checked={formData.subscribeNewsletter}
                        onChange={handleInputChange}
                        className="h-4 w-4 text-yellow-600 focus:ring-yellow-500 border-yellow-400 rounded"
                      />
                      <label htmlFor="subscribeNewsletter" className="ml-2 block text-sm text-brown-700">
                        Subscribe to our newsletter for daily horoscopes and updates
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 ? (
                  <button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-yellow-400 text-yellow-600 rounded-xl font-medium hover:bg-yellow-50 transition-colors"
                  >
                    Previous
                  </button>
                ) : (
                  <div />
                )}

                {currentStep < 3 ? (
                  <button
                    type="button"
                    onClick={handleNextStep}
                    disabled={!isStepValid()}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      isStepValid()
                        ? "bg-yellow-500 text-brown-900 hover:bg-yellow-400"
                        : "bg-gray-300 text-gray-500 cursor-not-allowed"
                    }`}
                  >
                    Next
                  </button>
                ) : (
                  <button
                    type="submit"
                    disabled={isLoading || !isStepValid()}
                    className={`px-6 py-3 rounded-xl font-medium transition-colors ${
                      isLoading || !isStepValid()
                        ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                        : "bg-yellow-500 text-brown-900 hover:bg-yellow-400"
                    }`}
                  >
                    {isLoading ? "Creating Account..." : "Create Account"}
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-brown-600">
              Already have an account?{" "}
              <Link to="/login" className="font-medium text-yellow-600 hover:text-yellow-500 transition-colors">
                Sign in here
              </Link>
            </p>
          </div>

          {/* Benefits */}
          <div className="rounded-2xl border border-yellow-400 bg-white p-6">
            <h3 className={`text-lg font-bold mb-4 ${gradHead}`}>Why Join RUDRAGURU?</h3>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="flex items-start gap-3">
                <Circle className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-brown-900">Free Kundli Generation</div>
                  <div className="text-sm text-brown-600">Get your detailed birth chart for free</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Star className="w-6 h-6 text-yellow-500" />
                <div>
                  <div className="font-medium text-brown-900">Daily Horoscopes</div>
                  <div className="text-sm text-brown-600">Personalized daily predictions</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <User className="w-6 h-6 text-blue-600" />
                <div>
                  <div className="font-medium text-brown-900">Expert Consultations</div>
                  <div className="text-sm text-brown-600">Chat with certified astrologers</div>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <Gem className="w-6 h-6 text-purple-600" />
                <div>
                  <div className="font-medium text-brown-900">Gemstone Guidance</div>
                  <div className="text-sm text-brown-600">Personalized gemstone recommendations</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

