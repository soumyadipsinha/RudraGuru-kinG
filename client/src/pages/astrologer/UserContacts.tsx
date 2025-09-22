import { useState } from "react";
import { 
  MessageSquare, 
  Phone, 
  Clock, 
  Star, 
  Search,
  Filter,
  Calendar,
  User,
  Mail,
  MapPin,
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

interface Contact {
  id: number;
  name: string;
  email: string;
  phone: string;
  location: string;
  totalSessions: number;
  totalDuration: string;
  totalSpent: string;
  lastContact: string;
  averageRating: number;
  preferredType: 'Chat' | 'Call';
  status: 'Active' | 'Inactive';
  joinDate: string;
  sessions: {
    id: number;
    type: 'Chat' | 'Call';
    date: string;
    time: string;
    duration: string;
    amount: string;
    rating: number;
    notes?: string;
  }[];
}

export default function UserContacts() {
  const [searchTerm, setSearchTerm] = useState("");
  const [filterType, setFilterType] = useState("all");
  const [filterStatus, setFilterStatus] = useState("all");
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);

  const contacts: Contact[] = [
    {
      id: 1,
      name: "Priya Sharma",
      email: "priya.sharma@email.com",
      phone: "+91 98765 43210",
      location: "Mumbai, Maharashtra",
      totalSessions: 12,
      totalDuration: "3h 45m",
      totalSpent: "₹2,450",
      lastContact: "2024-01-15",
      averageRating: 4.8,
      preferredType: 'Chat',
      status: 'Active',
      joinDate: "2023-11-20",
      sessions: [
        {
          id: 1,
          type: 'Chat',
          date: '2024-01-15',
          time: '2:30 PM',
          duration: '15 min',
          amount: '₹165',
          rating: 4.8,
          notes: 'Asked about career guidance'
        },
        {
          id: 2,
          type: 'Call',
          date: '2024-01-10',
          time: '11:00 AM',
          duration: '25 min',
          amount: '₹625',
          rating: 4.9
        }
      ]
    },
    {
      id: 2,
      name: "Rajesh Kumar",
      email: "rajesh.kumar@email.com",
      phone: "+91 87654 32109",
      location: "Delhi, NCR",
      totalSessions: 8,
      totalDuration: "2h 15m",
      totalSpent: "₹1,850",
      lastContact: "2024-01-14",
      averageRating: 4.9,
      preferredType: 'Call',
      status: 'Active',
      joinDate: "2023-12-05",
      sessions: [
        {
          id: 3,
          type: 'Call',
          date: '2024-01-14',
          time: '1:45 PM',
          duration: '25 min',
          amount: '₹625',
          rating: 4.9,
          notes: 'Relationship consultation'
        }
      ]
    },
    {
      id: 3,
      name: "Sunita Patel",
      email: "sunita.patel@email.com",
      phone: "+91 76543 21098",
      location: "Ahmedabad, Gujarat",
      totalSessions: 5,
      totalDuration: "1h 20m",
      totalSpent: "₹980",
      lastContact: "2024-01-12",
      averageRating: 4.7,
      preferredType: 'Chat',
      status: 'Inactive',
      joinDate: "2023-12-20",
      sessions: [
        {
          id: 4,
          type: 'Chat',
          date: '2024-01-12',
          time: '12:20 PM',
          duration: '8 min',
          amount: '₹88',
          rating: 4.7
        }
      ]
    },
    {
      id: 4,
      name: "Amit Singh",
      email: "amit.singh@email.com",
      phone: "+91 65432 10987",
      location: "Pune, Maharashtra",
      totalSessions: 15,
      totalDuration: "4h 30m",
      totalSpent: "₹3,200",
      lastContact: "2024-01-13",
      averageRating: 4.9,
      preferredType: 'Call',
      status: 'Active',
      joinDate: "2023-10-15",
      sessions: [
        {
          id: 5,
          type: 'Call',
          date: '2024-01-13',
          time: '11:15 AM',
          duration: '18 min',
          amount: '₹450',
          rating: 4.9,
          notes: 'Business consultation'
        }
      ]
    }
  ];

  const filteredContacts = contacts.filter(contact => {
    const matchesSearch = contact.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         contact.phone.includes(searchTerm);
    const matchesType = filterType === "all" || contact.preferredType.toLowerCase() === filterType;
    const matchesStatus = filterStatus === "all" || contact.status.toLowerCase() === filterStatus;
    
    return matchesSearch && matchesType && matchesStatus;
  });

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'short',
      day: 'numeric'
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${gradHead}`}>User Contacts</h1>
          <p className="text-brown-600 mt-1">Manage and track your user interactions</p>
        </div>
        <div className="text-sm text-brown-600">
          Total Contacts: <span className="font-semibold text-brown-900">{contacts.length}</span>
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
                placeholder="Search by name, email, or phone..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-3">
            <select
              value={filterType}
              onChange={(e) => setFilterType(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Types</option>
              <option value="chat">Chat</option>
              <option value="call">Call</option>
            </select>
            <select
              value={filterStatus}
              onChange={(e) => setFilterStatus(e.target.value)}
              className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            >
              <option value="all">All Status</option>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </div>

      {/* Contacts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredContacts.map((contact) => (
          <div key={contact.id} className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 hover:shadow-md transition-shadow">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                  <span className="text-yellow-700 font-semibold">
                    {contact.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <h3 className="font-semibold text-brown-900">{contact.name}</h3>
                  <p className="text-sm text-brown-600">{contact.location}</p>
                </div>
              </div>
              <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                contact.status === 'Active' 
                  ? 'bg-green-100 text-green-700' 
                  : 'bg-gray-100 text-gray-700'
              }`}>
                {contact.status}
              </span>
            </div>

            <div className="space-y-2 mb-4">
              <div className="flex items-center gap-2 text-sm text-brown-600">
                <Mail className="w-4 h-4" />
                <span>{contact.email}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brown-600">
                <Phone className="w-4 h-4" />
                <span>{contact.phone}</span>
              </div>
              <div className="flex items-center gap-2 text-sm text-brown-600">
                <MapPin className="w-4 h-4" />
                <span>{contact.location}</span>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4 mb-4">
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-brown-900">{contact.totalSessions}</p>
                <p className="text-xs text-brown-600">Sessions</p>
              </div>
              <div className="text-center p-3 bg-gray-50 rounded-lg">
                <p className="text-lg font-semibold text-brown-900">{contact.totalDuration}</p>
                <p className="text-xs text-brown-600">Duration</p>
              </div>
            </div>

            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-1">
                <Star className="w-4 h-4 text-yellow-500 fill-current" />
                <span className="text-sm font-medium text-brown-900">{contact.averageRating}</span>
              </div>
              <div className="text-right">
                <p className="text-sm font-semibold text-green-600">{contact.totalSpent}</p>
                <p className="text-xs text-brown-600">Total Spent</p>
              </div>
            </div>

            <div className="flex items-center justify-between text-sm text-brown-600 mb-4">
              <span>Last Contact: {formatDate(contact.lastContact)}</span>
              <span>Joined: {formatDate(contact.joinDate)}</span>
            </div>

            <div className="flex gap-2">
              <button
                onClick={() => setSelectedContact(contact)}
                className="flex-1 flex items-center justify-center gap-2 py-2 px-3 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition text-sm font-medium"
              >
                <Eye className="w-4 h-4" />
                View Details
              </button>
              <button className="flex items-center justify-center gap-2 py-2 px-3 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition text-sm font-medium">
                {contact.preferredType === 'Chat' ? <MessageSquare className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Contact Details Modal */}
      {selectedContact && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6 border-b border-gray-200">
              <div className="flex items-center justify-between">
                <h2 className="text-xl font-semibold text-brown-900">Contact Details - {selectedContact.name}</h2>
                <button
                  onClick={() => setSelectedContact(null)}
                  className="text-gray-400 hover:text-gray-600"
                >
                  ✕
                </button>
              </div>
            </div>
            
            <div className="p-6 space-y-6">
              {/* Contact Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <h3 className="font-semibold text-brown-900 mb-3">Contact Information</h3>
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4 text-brown-600" />
                      <span className="text-sm text-brown-700">{selectedContact.name}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Mail className="w-4 h-4 text-brown-600" />
                      <span className="text-sm text-brown-700">{selectedContact.email}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Phone className="w-4 h-4 text-brown-600" />
                      <span className="text-sm text-brown-700">{selectedContact.phone}</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <MapPin className="w-4 h-4 text-brown-600" />
                      <span className="text-sm text-brown-700">{selectedContact.location}</span>
                    </div>
                  </div>
                </div>
                
                <div>
                  <h3 className="font-semibold text-brown-900 mb-3">Statistics</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-brown-900">{selectedContact.totalSessions}</p>
                      <p className="text-xs text-brown-600">Total Sessions</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-brown-900">{selectedContact.totalDuration}</p>
                      <p className="text-xs text-brown-600">Total Duration</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <p className="text-lg font-semibold text-green-600">{selectedContact.totalSpent}</p>
                      <p className="text-xs text-brown-600">Total Spent</p>
                    </div>
                    <div className="text-center p-3 bg-gray-50 rounded-lg">
                      <div className="flex items-center justify-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-lg font-semibold text-brown-900">{selectedContact.averageRating}</span>
                      </div>
                      <p className="text-xs text-brown-600">Avg Rating</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Session History */}
              <div>
                <h3 className="font-semibold text-brown-900 mb-3">Session History</h3>
                <div className="space-y-3">
                  {selectedContact.sessions.map((session) => (
                    <div key={session.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${
                          session.type === 'Chat' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {session.type === 'Chat' ? <MessageSquare className="w-4 h-4" /> : <Phone className="w-4 h-4" />}
                        </div>
                        <div>
                          <p className="font-medium text-brown-900">{session.type} Session</p>
                          <p className="text-sm text-brown-600">{formatDate(session.date)} at {session.time}</p>
                          {session.notes && (
                            <p className="text-sm text-brown-500 italic">{session.notes}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <div className="flex items-center gap-1 mb-1">
                          <Star className="w-4 h-4 text-yellow-500 fill-current" />
                          <span className="text-sm font-medium text-brown-900">{session.rating}</span>
                        </div>
                        <p className="text-sm text-brown-600">{session.duration}</p>
                        <p className="text-sm font-semibold text-green-600">{session.amount}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
