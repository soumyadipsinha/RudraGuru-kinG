import { useState } from "react";
import { 
  Calendar,
  Clock,
  Plus,
  Edit,
  Trash2,
  Save,
  X,
  Check,
  AlertCircle
} from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

interface TimeSlot {
  id: number;
  day: string;
  startTime: string;
  endTime: string;
  type: 'Available' | 'Busy' | 'Break';
  isActive: boolean;
}

interface Appointment {
  id: number;
  userName: string;
  userEmail: string;
  date: string;
  time: string;
  duration: string;
  type: 'Chat' | 'Call';
  status: 'Confirmed' | 'Pending' | 'Completed' | 'Cancelled';
  notes?: string;
}

export default function Schedule() {
  const [activeTab, setActiveTab] = useState<'availability' | 'appointments'>('availability');
  const [editingSlot, setEditingSlot] = useState<TimeSlot | null>(null);
  const [newSlot, setNewSlot] = useState<Partial<TimeSlot>>({});
  const [showAddSlot, setShowAddSlot] = useState(false);

  const timeSlots: TimeSlot[] = [
    { id: 1, day: 'Monday', startTime: '09:00', endTime: '12:00', type: 'Available', isActive: true },
    { id: 2, day: 'Monday', startTime: '14:00', endTime: '18:00', type: 'Available', isActive: true },
    { id: 3, day: 'Tuesday', startTime: '09:00', endTime: '12:00', type: 'Available', isActive: true },
    { id: 4, day: 'Tuesday', startTime: '14:00', endTime: '18:00', type: 'Available', isActive: true },
    { id: 5, day: 'Wednesday', startTime: '09:00', endTime: '12:00', type: 'Available', isActive: true },
    { id: 6, day: 'Wednesday', startTime: '14:00', endTime: '18:00', type: 'Available', isActive: true },
    { id: 7, day: 'Thursday', startTime: '09:00', endTime: '12:00', type: 'Available', isActive: true },
    { id: 8, day: 'Thursday', startTime: '14:00', endTime: '18:00', type: 'Available', isActive: true },
    { id: 9, day: 'Friday', startTime: '09:00', endTime: '12:00', type: 'Available', isActive: true },
    { id: 10, day: 'Friday', startTime: '14:00', endTime: '18:00', type: 'Available', isActive: true },
    { id: 11, day: 'Saturday', startTime: '10:00', endTime: '14:00', type: 'Available', isActive: true },
    { id: 12, day: 'Sunday', startTime: '10:00', endTime: '14:00', type: 'Available', isActive: false },
  ];

  const appointments: Appointment[] = [
    {
      id: 1,
      userName: "Deepika Verma",
      userEmail: "deepika.verma@email.com",
      date: "2024-01-16",
      time: "15:30",
      duration: "30 min",
      type: "Chat",
      status: "Confirmed"
    },
    {
      id: 2,
      userName: "Vikram Joshi",
      userEmail: "vikram.joshi@email.com",
      date: "2024-01-16",
      time: "16:00",
      duration: "25 min",
      type: "Call",
      status: "Pending"
    },
    {
      id: 3,
      userName: "Meera Gupta",
      userEmail: "meera.gupta@email.com",
      date: "2024-01-16",
      time: "16:30",
      duration: "20 min",
      type: "Chat",
      status: "Confirmed"
    },
    {
      id: 4,
      userName: "Suresh Patel",
      userEmail: "suresh.patel@email.com",
      date: "2024-01-17",
      time: "10:00",
      duration: "30 min",
      type: "Call",
      status: "Confirmed"
    }
  ];

  const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Confirmed':
        return 'bg-green-100 text-green-700';
      case 'Pending':
        return 'bg-yellow-100 text-yellow-700';
      case 'Completed':
        return 'bg-blue-100 text-blue-700';
      case 'Cancelled':
        return 'bg-red-100 text-red-700';
      default:
        return 'bg-gray-100 text-gray-700';
    }
  };

  const getTypeColor = (type: string) => {
    return type === 'Available' ? 'bg-green-100 text-green-700' : 
           type === 'Busy' ? 'bg-red-100 text-red-700' : 
           'bg-yellow-100 text-yellow-700';
  };

  const handleEditSlot = (slot: TimeSlot) => {
    setEditingSlot(slot);
  };

  const handleSaveSlot = () => {
    setEditingSlot(null);
  };

  const handleAddSlot = () => {
    setShowAddSlot(false);
    setNewSlot({});
  };

  const handleToggleSlot = (slotId: number) => {
    // Toggle slot active status
  };

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
          <h1 className={`text-3xl font-bold ${gradHead}`}>Schedule Management</h1>
          <p className="text-brown-600 mt-1">Manage your availability and appointments</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowAddSlot(true)}
            className="inline-flex items-center gap-2 rounded-lg bg-yellow-500 px-4 py-2 text-brown-900 font-semibold hover:bg-yellow-400 transition"
          >
            <Plus className="w-4 h-4" />
            Add Time Slot
          </button>
        </div>
      </div>

      {/* Tabs */}
      <div className="flex bg-white rounded-xl p-1 shadow-sm border border-gray-100">
        <button
          onClick={() => setActiveTab('availability')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === 'availability'
              ? 'bg-yellow-500 text-brown-900 shadow-sm'
              : 'text-brown-700 hover:text-yellow-600'
          }`}
        >
          Availability
        </button>
        <button
          onClick={() => setActiveTab('appointments')}
          className={`flex-1 py-3 px-4 rounded-lg font-semibold transition-all duration-300 ${
            activeTab === 'appointments'
              ? 'bg-yellow-500 text-brown-900 shadow-sm'
              : 'text-brown-700 hover:text-yellow-600'
          }`}
        >
          Appointments
        </button>
      </div>

      {activeTab === 'availability' && (
        <div className="space-y-6">
          {/* Weekly Schedule */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-brown-900 mb-4">Weekly Availability</h2>
            <div className="space-y-4">
              {days.map(day => {
                const daySlots = timeSlots.filter(slot => slot.day === day);
                return (
                  <div key={day} className="border border-gray-200 rounded-lg p-4">
                    <h3 className="font-medium text-brown-900 mb-3">{day}</h3>
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                      {daySlots.map(slot => (
                        <div key={slot.id} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                          <div className="flex items-center gap-3">
                            <div className={`w-3 h-3 rounded-full ${slot.isActive ? 'bg-green-500' : 'bg-gray-300'}`}></div>
                            <div>
                              <p className="text-sm font-medium text-brown-900">
                                {slot.startTime} - {slot.endTime}
                              </p>
                              <span className={`px-2 py-1 rounded-full text-xs font-medium ${getTypeColor(slot.type)}`}>
                                {slot.type}
                              </span>
                            </div>
                          </div>
                          <div className="flex gap-2">
                            <button
                              onClick={() => handleEditSlot(slot)}
                              className="p-1 text-blue-600 hover:text-blue-800"
                            >
                              <Edit className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleToggleSlot(slot.id)}
                              className={`p-1 ${slot.isActive ? 'text-red-600 hover:text-red-800' : 'text-green-600 hover:text-green-800'}`}
                            >
                              {slot.isActive ? <X className="w-4 h-4" /> : <Check className="w-4 h-4" />}
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-green-100 rounded-lg">
                  <Clock className="w-6 h-6 text-green-600" />
                </div>
                <div>
                  <p className="text-sm text-brown-600">Total Hours</p>
                  <p className="text-2xl font-bold text-brown-900">42</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-sm text-brown-600">Working Days</p>
                  <p className="text-2xl font-bold text-brown-900">6</p>
                </div>
              </div>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <AlertCircle className="w-6 h-6 text-yellow-600" />
                </div>
                <div>
                  <p className="text-sm text-brown-600">Available Slots</p>
                  <p className="text-2xl font-bold text-brown-900">12</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'appointments' && (
        <div className="space-y-6">
          {/* Upcoming Appointments */}
          <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
            <h2 className="text-lg font-semibold text-brown-900 mb-4">Upcoming Appointments</h2>
            <div className="space-y-4">
              {appointments.map(appointment => (
                <div key={appointment.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-lg">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-700 font-semibold">
                        {appointment.userName.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-semibold text-brown-900">{appointment.userName}</h3>
                      <p className="text-sm text-brown-600">{appointment.userEmail}</p>
                      <div className="flex items-center gap-4 mt-1 text-sm text-brown-500">
                        <span>{formatDate(appointment.date)}</span>
                        <span>{appointment.time}</span>
                        <span>{appointment.duration}</span>
                        <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                          appointment.type === 'Chat' ? 'bg-green-100 text-green-700' : 'bg-blue-100 text-blue-700'
                        }`}>
                          {appointment.type}
                        </span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(appointment.status)}`}>
                      {appointment.status}
                    </span>
                    <div className="flex gap-2 mt-2">
                      <button className="px-3 py-1 text-sm bg-green-500 text-white rounded hover:bg-green-600 transition">
                        Confirm
                      </button>
                      <button className="px-3 py-1 text-sm border border-gray-300 text-brown-700 rounded hover:bg-gray-50 transition">
                        Reschedule
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Appointment Stats */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-brown-900">4</p>
              <p className="text-sm text-brown-600">Today's Appointments</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-brown-900">12</p>
              <p className="text-sm text-brown-600">This Week</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-brown-900">3</p>
              <p className="text-sm text-brown-600">Pending</p>
            </div>
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100 text-center">
              <p className="text-2xl font-bold text-brown-900">1</p>
              <p className="text-sm text-brown-600">Confirmed</p>
            </div>
          </div>
        </div>
      )}

      {/* Edit Slot Modal */}
      {editingSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-brown-900 mb-4">Edit Time Slot</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Day</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option value={editingSlot.day}>{editingSlot.day}</option>
                </select>
              </div>
                <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Start Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      defaultValue={editingSlot.startTime}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <select className="p-2 border border-gray-300 rounded-lg">
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">End Time</label>
                  <div className="flex gap-2">
                    <input
                      type="time"
                      defaultValue={editingSlot.endTime}
                      className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                    <select className="p-2 border border-gray-300 rounded-lg">
                      <option>AM</option>
                      <option>PM</option>
                    </select>
                  </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Break">Break</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleSaveSlot}
                className="flex-1 py-2 px-4 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition font-medium"
              >
                Save Changes
              </button>
              <button
                onClick={() => setEditingSlot(null)}
                className="flex-1 py-2 px-4 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Add Slot Modal */}
      {showAddSlot && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-xl max-w-md w-full p-6">
            <h2 className="text-lg font-semibold text-brown-900 mb-4">Add New Time Slot</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Day</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  {days.map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">Start Time</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <select className="p-2 border border-gray-300 rounded-lg">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
                </div>
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-1">End Time</label>
                <div className="flex gap-2">
                  <input
                    type="time"
                    className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                  <select className="p-2 border border-gray-300 rounded-lg">
                    <option>AM</option>
                    <option>PM</option>
                  </select>
                </div>
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-brown-700 mb-1">Type</label>
                <select className="w-full p-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent">
                  <option value="Available">Available</option>
                  <option value="Busy">Busy</option>
                  <option value="Break">Break</option>
                </select>
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button
                onClick={handleAddSlot}
                className="flex-1 py-2 px-4 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition font-medium"
              >
                Add Slot
              </button>
              <button
                onClick={() => setShowAddSlot(false)}
                className="flex-1 py-2 px-4 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition font-medium"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
