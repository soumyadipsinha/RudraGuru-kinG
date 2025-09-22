import { useState } from "react";
import { 
  Phone, 
  Search,
  Filter,
  Calendar,
  Clock,
  Star,
  User,
  Eye,
  Play,
  Download
} from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

interface CallSession {
  id: number;
  userName: string;
  userEmail: string;
  userPhone: string;
  startTime: string;
  endTime: string;
  duration: string;
  rating: number;
  amount: string;
  status: 'Completed' | 'Missed' | 'Cancelled';
  callType: 'Incoming' | 'Outgoing';
  recordingAvailable: boolean;
  notes?: string;
}

export default function CallHistory() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterStatus, setFilterStatus] = useState("all");
  const [filterType, setFilterType] = useState("all");
  const [selectedCall, setSelectedCall] = useState<CallSession | null>(null);

  const callSessions: CallSession[] = [
    {
      id: 1,
      userName: "Rajesh Kumar",
      userEmail: "rajesh.kumar@email.com",
      userPhone: "+91 87654 32109",
      startTime: "2024-01-14 13:45:00",
      endTime: "2024-01-14 14:10:00",
      duration: "25 min",
      rating: 4.9,
      amount: "₹625",
      status: 'Completed',
      callType: 'Incoming',
      recordingAvailable: true,
      notes: 'Relationship consultation - discussed marriage compatibility'
    },
    {
      id: 2,
      userName: "Amit Singh",
      userEmail: "amit.singh@email.com",
      userPhone: "+91 65432 10987",
      startTime: "2024-01-13 11:15:00",
      endTime: "2024-01-13 11:33:00",
      duration: "18 min",
      rating: 4.9,
      amount: "₹450",
      status: 'Completed',
      callType: 'Incoming',
      recordingAvailable: true,
      notes: 'Business consultation - discussed expansion plans'
    },
    {
      id: 3,
      userName: "Vikram Joshi",
      userEmail: "vikram.joshi@email.com",
      userPhone: "+91 54321 09876",
      startTime: "2024-01-12 16:00:00",
      endTime: "2024-01-12 16:00:00",
      duration: "0 min",
      rating: 0,
      amount: "₹0",
      status: 'Missed',
      callType: 'Incoming',
      recordingAvailable: false
    },
    {
      id: 4,
      userName: "Meera Gupta",
      userEmail: "meera.gupta@email.com",
      userPhone: "+91 43210 98765",
      startTime: "2024-01-11 14:30:00",
      endTime: "2024-01-11 14:30:00",
      duration: "0 min",
      rating: 0,
      amount: "₹0",
      status: 'Cancelled',
      callType: 'Incoming',
      recordingAvailable: false,
      notes: 'User cancelled before call started'
    },
    {
      id: 5,
      userName: "Suresh Patel",
      userEmail: "suresh.patel@email.com",
      userPhone: "+91 32109 87654",
      startTime: "2024-01-10 10:00:00",
      endTime: "2024-01-10 10:20:00",
      duration: "20 min",
      rating: 4.8,
      amount: "₹500",
      status: 'Completed',
      callType: 'Outgoing',
      recordingAvailable: true,
      notes: 'Follow-up call for previous consultation'
    }
  ];

  const filteredCalls = callSessions.filter(call => {
    const matchesSearch = call.userName.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.userEmail.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         call.userPhone.includes(searchTerm);
    const matchesStatus = filterStatus === "all" || call.status.toLowerCase() === filterStatus;
    const matchesType = filterType === "all" || call.callType.toLowerCase() === filterType;
    
    return matchesSearch && matchesStatus && matchesType;
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

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completed':
        return 'bg-green-100 text-green-700';
      case 'Missed':
        return 'bg-red-100 text-red-700';
      case 'Cancelled':
        return 'bg-yellow-100 text-yellow-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Incoming' ? 'bg-blue-100 text-blue-700' : 'bg-purple-100 text-purple-700';
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${gradHead}`}>Call History</h1>
          <p className="text-brown-600 mt-1">Review all your call sessions with users</p>
        </div>
        <div className="text-sm text-brown-600">
          Total Calls: <span className="font-semibold text-brown-900">{callSessions.length}</span>
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
                placeholder="Search by user name, email, or phone..."
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
              <option value="missed">Missed</option>
              <option value="cancelled">Cancelled</option>
            </select>
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="incoming">Incoming</option>
              <option value="outgoing">Outgoing</option>
            </select>
          </div>
        </div>
      </div>

      {/* Call Sessions */}
      <div className="space-y-4">
        {filteredCalls.map((call) => (
          <div key={call.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-700 font-semibold">
                    {call.userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">{call.userName}</h3>
                  <p className="text-sm text-brown-600">{call.userEmail}</p>
                  <p className="text-sm text-brown-600">{call.userPhone}</p>
                  <div className="flex items-center gap-4 mt-1 text-sm text-brown-500">
                    <span className="flex items-center gap-1">
                      <Calendar className="w-3 h-3" />
                      {formatDateTime(call.startTime)}
                    </span>
                    <span className="flex items-center gap-1">
                      <Clock className="w-3 h-3" />
                      {call.duration}
                    </span>
                  </div>
                </div>
              </div>
              
              <div className="text-right">
                <div className="flex items-center gap-2 mb-2">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(call.status)}`}>
                    {call.status}
                  </span>
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(call.callType)}`}>
                    {call.callType}
                  </span>
                </div>
                {call.rating > 0 && (
                  <div className="flex items-center gap-1 mb-2">
                    <Star className="w-4 h-4 text-yellow-500 fill-current" />
                    <span className="text-sm font-medium text-brown-900">{call.rating}</span>
                  </div>
                )}
                <p className="text-sm font-semibold text-green-600 mb-2">{call.amount}</p>
                {call.recordingAvailable && (
                  <div className="flex gap-1">
                    <button className="p-1 text-blue-600 hover:text-blue-800">
                      <Play className="w-4 h-4" />
                    </button>
                    <button className="p-1 text-green-600 hover:text-green-800">
                      <Download className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </div>
            </div>
            
            {call.notes && (
              <div className="mt-4 p-3 bg-gray-50 rounded-lg">
                <p className="text-sm text-brown-700">
                  <span className="font-medium">Notes:</span> {call.notes}
                </p>
              </div>
            )}
            
            <div className="mt-4 flex gap-3">
              <button
                onClick={() => setSelectedCall(call)}
                className="flex items-center gap-2 py-2 px-4 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              {call.recordingAvailable && (
                <button className="flex items-center gap-2 py-2 px-4 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                  <Play className="w-4 h-4" />
                  Play Recording
                </button>
              )}
              <button className="flex items-center gap-2 py-2 px-4 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                <Phone className="w-4 h-4" />
                Call Back
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Call Details Modal */}
      {selectedCall && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-2xl w-full">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-brown-900">Call Details</h2>
                <button
                  onClick={() => setSelectedCall(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex items-center gap-4">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-700 font-semibold text-lg">
                    {selectedCall.userName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900 text-lg">{selectedCall.userName}</h3>
                  <p className="text-brown-600">{selectedCall.userEmail}</p>
                  <p className="text-brown-600">{selectedCall.userPhone}</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-brown-600">Call Type</p>
                  <p className="font-semibold text-brown-900">{selectedCall.callType}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-brown-600">Status</p>
                  <p className="font-semibold text-brown-900">{selectedCall.status}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-brown-600">Duration</p>
                  <p className="font-semibold text-brown-900">{selectedCall.duration}</p>
                </div>
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-brown-600">Amount</p>
                  <p className="font-semibold text-green-600">{selectedCall.amount}</p>
                </div>
              </div>
              
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="text-sm text-brown-600 mb-2">Call Time</p>
                <p className="font-semibold text-brown-900">{formatDateTime(selectedCall.startTime)}</p>
                {selectedCall.endTime !== selectedCall.startTime && (
                  <p className="text-sm text-brown-600">Ended: {formatDateTime(selectedCall.endTime)}</p>
                )}
              </div>
              
              {selectedCall.rating > 0 && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-brown-600 mb-2">Rating</p>
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 text-yellow-500 fill-current" />
                    <span className="font-semibold text-brown-900">{selectedCall.rating}/5</span>
                  </div>
                </div>
              )}
              
              {selectedCall.notes && (
                <div className="p-4 bg-gray-50 rounded-lg">
                  <p className="text-sm text-brown-600 mb-2">Notes</p>
                  <p className="text-brown-900">{selectedCall.notes}</p>
                </div>
              )}
              
              {selectedCall.recordingAvailable && (
                <div className="flex gap-3">
                  <button className="flex items-center gap-2 py-2 px-4 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition">
                    <Play className="w-4 h-4" />
                    Play Recording
                  </button>
                  <button className="flex items-center gap-2 py-2 px-4 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition">
                    <Download className="w-4 h-4" />
                    Download
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
