import { useState, useRef, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { BarChart3, Gem, Circle, Smartphone, Star } from "lucide-react";

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

interface Message {
  id: number;
  text: string;
  sender: 'user' | 'astrologer';
  timestamp: string;
  type: 'text' | 'image' | 'file';
}

export default function Chat() {
  const location = useLocation();
  const params = new URLSearchParams(location.search);
  const astroId = params.get('astro');
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Namaste! I'm Acharya Pradeep Shastri. How can I help you today?",
      sender: 'astrologer',
      timestamp: '10:30 AM',
      type: 'text'
    }
  ]);
  const [newMessage, setNewMessage] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const [callDuration, setCallDuration] = useState(0);
  const [isCallActive, setIsCallActive] = useState(false);
  const [chatSeconds, setChatSeconds] = useState(0);
  const [chatStarted, setChatStarted] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = () => {
    if (newMessage.trim()) {
      const message: Message = {
        id: messages.length + 1,
        text: newMessage,
        sender: 'user',
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        type: 'text'
      };
      setMessages([...messages, message]);
      setNewMessage("");
      setIsTyping(true);
      if (!chatStarted) setChatStarted(true);

      // Simulate astrologer response
      setTimeout(() => {
        const astrologerResponse: Message = {
          id: messages.length + 2,
          text: "Thank you for sharing. Let me analyze your situation and provide guidance.",
          sender: 'astrologer',
          timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
          type: 'text'
        };
        setMessages(prev => [...prev, astrologerResponse]);
        setIsTyping(false);
      }, 2000);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const startCall = () => {
    setIsCallActive(true);
    // Simulate call timer
    const interval = setInterval(() => {
      setCallDuration(prev => prev + 1);
    }, 1000);
    
    // Stop call after 5 minutes for demo
    setTimeout(() => {
      setIsCallActive(false);
      clearInterval(interval);
      setCallDuration(0);
    }, 300000);
  };

  // Start chat timer after first user message; free for first 180 seconds
  useEffect(() => {
    if (!chatStarted) return;
    const interval = setInterval(() => setChatSeconds(prev => prev + 1), 1000);
    return () => clearInterval(interval);
  }, [chatStarted]);

  const freeRemaining = Math.max(0, 180 - chatSeconds);
  const isFreeOver = freeRemaining === 0 && chatStarted;

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <main className="relative bg-transparent overflow-hidden min-h-screen">
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

      {/* Header */}
      <Section className="pt-20 pb-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              to="/astrologers"
              className="text-yellow-600 hover:text-yellow-700 transition"
            >
              ← Back to Astrologers
            </Link>
          </div>
          <div className="flex items-center gap-3">
            <div className="text-sm text-brown-600">
              Rate: ₹11 / 5 min • Balance: ₹500
            </div>
            <button className="px-3 py-1 bg-transparent border border-yellow-400 text-yellow-700 rounded-full text-sm">
              Online
            </button>
          </div>
        </div>
      </Section>

      {/* Free Chat Banner */}
      <Section className="pb-0">
        <div className={`rounded-2xl p-4 mb-4 ${isFreeOver ? 'bg-red-50 border border-red-200' : 'bg-transparent border border-yellow-200'}`}>
          {isFreeOver ? (
            <div className="flex items-center justify-between">
              <p className="text-red-700 font-semibold">Free 3 minutes ended. Standard charges apply: ₹11 / 5 min.</p>
              <span className="text-sm text-red-600">Session time: {formatTime(chatSeconds)}</span>
            </div>
          ) : (
            <div className="flex items-center justify-between">
              <p className="text-yellow-700 font-semibold">First 3 minutes FREE for all users.</p>
              <span className="text-sm text-yellow-700">Free time left: {formatTime(freeRemaining)}</span>
            </div>
          )}
        </div>
      </Section>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid gap-6 lg:grid-cols-3">
          {/* Astrologer Info */}
          <div className="lg:col-span-1">
            <div className="rounded-2xl border border-yellow-400 bg-white p-6 sticky top-24">
              <div className="text-center mb-6">
                <img
                  src="https://avatar-placeholder.iran.liara.run/public/4"
                  alt="Astrologer"
                  className="w-20 h-20 rounded-full mx-auto mb-4 border-4 border-yellow-400"
                />
                <h3 className="text-xl font-bold text-brown-900">{astroId ? `Astrologer #${astroId}` : 'Astrologer'}</h3>
                <p className="text-brown-600">Vedic Astrology Expert</p>
                <div className="flex items-center justify-center gap-1 mt-2">
                  <div className="flex"><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /><Star className="w-4 h-4 text-yellow-500 fill-current" /></div>
                  <span className="text-brown-600 text-sm">(4.9)</span>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                  <span className="text-brown-700">Chat Rate</span>
                  <span className="font-semibold text-brown-900">₹11 / 5 min</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                  <span className="text-brown-700">Call Rate</span>
                  <span className="font-semibold text-brown-900">₹25/min</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                  <span className="text-brown-700">Experience</span>
                  <span className="font-semibold text-brown-900">15+ years</span>
                </div>
                <div className="flex justify-between items-center p-3 bg-yellow-50 rounded-xl">
                  <span className="text-brown-700">Languages</span>
                  <span className="font-semibold text-brown-900">Hindi, English</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <button
                  onClick={startCall}
                  disabled={isCallActive}
                  className={`w-full py-3 rounded-xl font-semibold transition ${
                    isCallActive
                      ? "bg-red-500 text-white"
                      : "bg-yellow-500 text-brown-900 hover:bg-yellow-400"
                  }`}
                >
                  {isCallActive ? `Call Active ${formatTime(callDuration)}` : "Start Voice Call"}
                </button>
                <button className="w-full py-3 rounded-xl border border-yellow-400 text-yellow-600 font-semibold hover:bg-yellow-50 transition">
                  Video Call
                </button>
              </div>

              {isCallActive && (
                <div className="mt-4 p-4 bg-red-50 rounded-xl text-center">
                  <div className="text-red-600 font-semibold">Call in Progress</div>
                  <div className="text-red-500 text-sm">₹25/min being charged</div>
                </div>
              )}
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-2">
            <div className="rounded-2xl border border-yellow-400 bg-white h-[600px] flex flex-col">
              {/* Chat Header */}
              <div className="p-4 border-b border-yellow-200 bg-yellow-50 rounded-t-2xl">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
                    <span className="font-semibold text-brown-900">{astroId ? `Astrologer #${astroId}` : 'Astrologer'}</span>
                    <span className="text-brown-600 text-sm">is online</span>
                  </div>
                  <div className="text-sm text-brown-600">
                    Session: {formatTime(chatSeconds)} {isFreeOver ? '• Charges apply' : '• Free'}
                  </div>
                </div>
              </div>

              {/* Messages */}
              <div className="flex-1 overflow-y-auto p-4 space-y-4">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  >
                    <div
                      className={`max-w-xs lg:max-w-md px-4 py-2 rounded-2xl ${
                        message.sender === 'user'
                          ? 'bg-yellow-500 text-brown-900'
                          : 'bg-gray-100 text-brown-900'
                      }`}
                    >
                      <p className="text-sm">{message.text}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-gray-100 text-brown-900 px-4 py-2 rounded-2xl">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce"></div>
                        <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                        <div className="w-2 h-2 bg-brown-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                      </div>
                    </div>
                  </div>
                )}
                <div ref={messagesEndRef} />
              </div>

              {/* Message Input */}
              <div className="p-4 border-t border-yellow-200">
                <div className="flex gap-3">
                  <input
                    type="text"
                    value={newMessage}
                    onChange={(e) => setNewMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your message..."
                    className="flex-1 rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <button
                    onClick={handleSendMessage}
                    className="px-6 py-3 bg-yellow-500 text-brown-900 rounded-xl hover:bg-yellow-400 transition"
                  >
                    Send
                  </button>
                </div>
                <div className="flex justify-between items-center mt-2 text-sm text-brown-600">
                  <span>Press Enter to send</span>
                  <span>{isFreeOver ? '₹11 / 5 min' : 'First 3 min FREE'} • Auto-recharge when balance is low</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <Section className="py-8">
        <div className="rounded-2xl border border-yellow-400 p-6 bg-white">
          <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Quick Actions</h3>
          <div className="grid gap-4 md:grid-cols-4">
            <button className="flex items-center gap-3 p-4 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition">
              <BarChart3 className="w-6 h-6 text-blue-600" />
              <span className="font-medium">Share Birth Chart</span>
            </button>
            <button className="flex items-center gap-3 p-4 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition">
              <Gem className="w-6 h-6 text-purple-600" />
              <span className="font-medium">Gemstone Query</span>
            </button>
            <button className="flex items-center gap-3 p-4 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition">
              <Circle className="w-6 h-6 text-indigo-600" />
              <span className="font-medium">Ask Question</span>
            </button>
            <button className="flex items-center gap-3 p-4 border border-yellow-300 rounded-xl hover:bg-yellow-50 transition">
              <Smartphone className="w-6 h-6 text-green-600" />
              <span className="font-medium">Upload Photo</span>
            </button>
          </div>
        </div>
      </Section>
    </main>
  );
}
