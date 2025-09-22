import { useState } from "react";
import { 
  MessageSquare, 
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  User,
  Eye
} from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

interface ChatSession {
  id: number;
  userName: string;
  userEmail: string;
  startTime: string;
  endTime: string;
  duration: string;
  messageCount: number;
  rating: number;
  amount: string;
  status: 'Completed' | 'Incomplete';
  messages: {
    id: number;
    sender: 'user' | 'astrologer';
    message: string;
    timestamp: string;
  }[];
}

export default function ChatHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedSession, setSelectedSession] = useState<ChatSession | null>(null);

  const chatSessions: ChatSession[] = [
    {
      id: 1,
      userName: "Priya Sharma",
      userEmail: "priya.sharma@email.com",
      startTime: "2024-01-15 14:30:00",
      endTime: "2024-01-15 14:45:00",
      duration: "15 min",
      messageCount: 24,
      rating: 4.8,
      amount: "₹165",
      status: 'Completed',
      messages: [
        {
          id: 1,
          sender: 'user',
          message: "Namaste! I need guidance about my career. I'm confused about whether to continue in my current job or switch to a new field.",
          timestamp: "14:30"
        },
        {
          id: 2,
          sender: 'astrologer',
          message: "Namaste Priya! I'll help you with career guidance. Let me analyze your situation. Can you tell me more about your current job and the field you're considering?",
          timestamp: "14:31"
        },
        {
          id: 3,
          sender: 'user',
          message: "I'm currently working as a software engineer, but I'm interested in starting my own business in the wellness industry.",
          timestamp: "14:32"
        },
        {
          id: 4,
          sender: 'astrologer',
          message: "Based on your birth chart, I can see strong entrepreneurial potential. The current planetary positions favor new beginnings. However, I recommend a gradual transition rather than an immediate switch.",
          timestamp: "14:35"
        }
      ]
    },
    {
      id: 2,
      userName: "Sunita Patel",
      userEmail: "sunita.patel@email.com",
      startTime: "2024-01-12 12:20:00",
      endTime: "2024-01-12 12:28:00",
      duration: "8 min",
      messageCount: 12,
      rating: 4.7,
      amount: "₹88",
      status: 'Completed',
      messages: [
        {
          id: 5,
          sender: 'user',
          message: "Hello! I want to know about my health prospects for this year.",
          timestamp: "12:20"
        },
        {
          id: 6,
          sender: 'astrologer',
          message: "Hello Sunita! I'll analyze your health chart. Generally, your health looks stable this year, but I recommend regular check-ups and maintaining a balanced diet.",
          timestamp: "12:22"
        }
      ]
    },
    {
      id: 3,
      userName: "Deepika Verma",
      userEmail: "deepika.verma@email.com",
      startTime: "2024-01-10 16:15:00",
      endTime: "2024-01-10 16:45:00",
      duration: "30 min",
      messageCount: 35,
      rating: 4.9,
      amount: "₹330",
      status: 'Completed',
      messages: [
        {
          id: 7,
          sender: 'user',
          message: "I'm having relationship issues with my husband. We've been married for 3 years but lately there's been a lot of tension.",
          timestamp: "16:15"
        },
        {
          id: 8,
          sender: 'astrologer',
          message: "I understand your concern. Relationship issues can be challenging. Let me analyze both your charts to provide guidance on improving your marital harmony.",
          timestamp: "16:16"
        }
      ]
    }
  ];

  const filteredSessions = chatSessions.filter(session => {
    const matchesSearch = session.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         session.userEmail.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || session.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesStatus;
  });

  const formatDateTime = (dateTimeString: string) => {
    const date = new Date(dateTimeString);
    return date.toLocaleString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${gradHead}`}>Chat History</h1>
          <p className="text-brown-600 mt-1">Review all your chat conversations with users</p>
        </div>
        <div className="text-sm text-brown-600">
          Total Sessions: <span className="font-semibold text-brown-900">{chatSessions.length}</span>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
        <div className="flex flex-col md:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search by user name or email..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="completed">Completed</option>
              <option value="incomplete">Incomplete</option>
            </select>
          </div>
        </div>
      </div>

      {/* Chat Sessions */}
      <div className="space-y-4">
        {filteredSessions.map((session) => (
          <div key={session.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-700 font-semibold">
                    {session.userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">{session.userName}</h3>
                  <p className="text-sm text-brown-600">{session.userEmail}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-brown-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDateTime(session.startTime)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {session.duration}
                    </span>
                    <span className="flex items-center gap-1">
                      <MessageSquare className="w-3 h-3" />
                      {session.messageCount} messages
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-1 mb-2">
                  <Star className="w-4 h-4 text-yellow-500 fill-current" />
                  <span className="text-sm font-medium text-brown-900">{session.rating}</span>
                </div>
                <p className="text-sm font-semibold text-green-600 mb-2">{session.amount}</p>
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                  session.status === 'Completed' 
                    ? 'bg-green-100 text-green-700' 
                    : 'bg-yellow-100 text-yellow-700'
                }`}>
                  {session.status}
                </span>
              </div>
            </div>
            
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSelectedSession(session)}
                className="flex items-center gap-2 py-2 px-4 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                View Conversation
              </button>
              <button className="flex items-center gap-2 py-2 px-4 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                <MessageSquare className="w-4 h-4" />
                Start New Chat
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Chat Details Modal */}
      {selectedSession && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <div>
                  <h2 className="text-xl font-semibold text-brown-900">Chat with {selectedSession.userName}</h2>
                  <p className="text-sm text-brown-600">
                    {formatDateTime(selectedSession.startTime)} • {selectedSession.duration} • {selectedSession.messageCount} messages
                  </p>
                </div>
                <button
                  onClick={() => setSelectedSession(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6">
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {selectedSession.messages.map((message) => (
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
                      <p className="text-sm">{message.message}</p>
                      <p className="text-xs opacity-70 mt-1">{message.timestamp}</p>
                    </div>
                  </div>
                ))}
              </div>
              
              <div className="mt-6 pt-4 border-t border-gray-200">
                <div className="flex items-center justify-between text-sm text-brown-600">
                  <span>Session Rating: <span className="font-semibold text-brown-900">{selectedSession.rating}/5</span></span>
                  <span>Amount Earned: <span className="font-semibold text-green-600">{selectedSession.amount}</span></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
