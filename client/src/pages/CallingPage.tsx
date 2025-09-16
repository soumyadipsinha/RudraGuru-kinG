import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { PhoneOff, Mic, MicOff, Volume2, VolumeX, User, Star, Clock, CreditCard } from "lucide-react";

const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function CallingPage() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const astroId = params.get('astro') || '1';
  
  const [callStatus, setCallStatus] = useState<'connecting' | 'connected' | 'ended'>('connecting');
  const [callDuration, setCallDuration] = useState(0);
  const [isMuted, setIsMuted] = useState(false);
  const [isSpeakerOn, setIsSpeakerOn] = useState(true);
  const [callCost, setCallCost] = useState(0);

  // Simulate call connection
  useEffect(() => {
    const timer = setTimeout(() => {
      setCallStatus('connected');
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  // Call duration timer
  useEffect(() => {
    if (callStatus === 'connected') {
      const interval = setInterval(() => {
        setCallDuration(prev => prev + 1);
        setCallCost(prev => prev + (45 / 60)); // ₹45 per minute
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [callStatus]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const endCall = () => {
    setCallStatus('ended');
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleSpeaker = () => {
    setIsSpeakerOn(!isSpeakerOn);
  };

  if (callStatus === 'ended') {
    return (
      <main className="bg-transparent min-h-screen flex items-center justify-center">
        <Section>
          <div className="text-center">
            <div className="w-20 h-20 bg-transparent border-2 border-yellow-400 rounded-full flex items-center justify-center mx-auto mb-6">
              <PhoneOff className="w-10 h-10 text-yellow-600" />
            </div>
            <h1 className={`text-3xl font-bold mb-4 ${gradHead}`}>Call Ended</h1>
            <p className="text-brown-600 mb-6">Call duration: {formatTime(callDuration)}</p>
            <p className="text-brown-600 mb-8">Total cost: ₹{callCost.toFixed(2)}</p>
            <div className="flex gap-4 justify-center">
              <Link
                to="/talk-to-astrologer"
                className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
              >
                Call Again
              </Link>
              <Link
                to="/dashboard"
                className="inline-flex items-center rounded-xl border border-yellow-400 px-6 py-3 text-yellow-600 font-semibold hover:bg-yellow-50 transition"
              >
                Go to Dashboard
              </Link>
            </div>
          </div>
        </Section>
      </main>
    );
  }

  return (
    <main className="bg-transparent min-h-screen">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
      `}</style>

      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <div className="max-w-md w-full">
          {/* Astrologer Info */}
          <div className="text-center mb-8">
            <div className="w-32 h-32 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4 border-4 border-yellow-400">
              <User className="w-16 h-16 text-yellow-600" />
            </div>
            <h2 className="text-2xl font-bold text-brown-900 mb-2">Astrologer #{astroId}</h2>
            <p className="text-brown-600 mb-4">Vedic Astrology Expert</p>
            <div className="flex items-center justify-center gap-1 mb-2">
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <Star className="w-4 h-4 text-yellow-500 fill-current" />
              <span className="text-yellow-600 ml-2">4.9</span>
            </div>
          </div>

          {/* Call Status */}
          <div className="text-center mb-8">
            {callStatus === 'connecting' && (
              <div>
                <div className="w-16 h-16 border-4 border-yellow-500 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
                <h3 className="text-xl font-semibold text-brown-900 mb-2">Connecting...</h3>
                <p className="text-brown-600">Please wait while we connect you to the astrologer</p>
              </div>
            )}
            
            {callStatus === 'connected' && (
              <div>
                <div className="flex items-center justify-center gap-2 mb-4">
                  <div className="w-3 h-3 bg-yellow-500 rounded-full animate-pulse"></div>
                  <h3 className="text-xl font-semibold text-yellow-600">Connected</h3>
                </div>
                <div className="flex items-center justify-center gap-2 text-brown-600">
                  <Clock className="w-4 h-4" />
                  <span className="text-lg font-mono">{formatTime(callDuration)}</span>
                </div>
                <div className="flex items-center justify-center gap-2 text-brown-600 mt-2">
                  <CreditCard className="w-4 h-4" />
                  <span>₹{callCost.toFixed(2)}</span>
                </div>
              </div>
            )}
          </div>

          {/* Call Controls */}
          {callStatus === 'connected' && (
            <div className="flex justify-center gap-6 mb-8">
              <button
                onClick={toggleMute}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                  isMuted 
                    ? 'bg-red-500 text-white' 
                    : 'bg-white border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                {isMuted ? <MicOff className="w-6 h-6" /> : <Mic className="w-6 h-6" />}
              </button>
              
              <button
                onClick={toggleSpeaker}
                className={`w-14 h-14 rounded-full flex items-center justify-center transition ${
                  isSpeakerOn 
                    ? 'bg-yellow-500 text-brown-900' 
                    : 'bg-white border-2 border-yellow-400 text-yellow-600 hover:bg-yellow-50'
                }`}
              >
                {isSpeakerOn ? <Volume2 className="w-6 h-6" /> : <VolumeX className="w-6 h-6" />}
              </button>
            </div>
          )}

          {/* End Call Button */}
          <div className="text-center">
            <button
              onClick={endCall}
              className="w-16 h-16 bg-red-500 text-white rounded-full flex items-center justify-center mx-auto hover:bg-red-600 transition shadow-lg"
            >
              <PhoneOff className="w-8 h-8" />
            </button>
            <p className="text-sm text-brown-600 mt-3">End Call</p>
          </div>

          {/* Call Info */}
          <div className="mt-8 p-4 bg-white/90 backdrop-blur-sm rounded-xl border border-yellow-300/60">
            <div className="text-center">
              <p className="text-sm text-brown-600 mb-2">Call Rate: ₹45/minute</p>
              <p className="text-sm text-brown-600">Balance will be deducted automatically</p>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
