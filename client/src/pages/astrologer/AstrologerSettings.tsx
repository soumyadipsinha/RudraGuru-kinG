import { useState } from "react";
import { 
  User,
  Mail,
  Phone,
  MapPin,
  Star,
  DollarSign,
  Clock,
  Save,
  Upload,
  Camera,
  Shield,
  Bell,
  Globe
} from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

export default function AstrologerSettings() {
  const [activeTab, setActiveTab] = useState<'profile' | 'rates' | 'notifications' | 'security'>('profile');
  const [profileData, setProfileData] = useState({
    name: "Acharya Pradeep Shastri",
    email: "pradeep.shastri@rudraguru.com",
    phone: "+91 98765 43210",
    location: "Varanasi, Uttar Pradesh",
    bio: "Experienced Vedic Astrologer with 15+ years of practice. Specialized in career guidance, relationship counseling, and spiritual healing.",
    specialties: ["Vedic Astrology", "Career Guidance", "Relationship Counseling", "Spiritual Healing"],
    languages: ["Hindi", "English", "Sanskrit"],
    experience: "15+ years",
    education: "M.A. in Sanskrit, Certified Vedic Astrologer",
    rating: 4.9,
    totalConsultations: 1250
  });

  const [rates, setRates] = useState({
    chatRate: 11,
    callRate: 25,
    videoCallRate: 35,
    minimumDuration: 5,
    freeMinutes: 3
  });

  const [notifications, setNotifications] = useState({
    newAppointments: true,
    chatMessages: true,
    callRequests: true,
    emailNotifications: true,
    smsNotifications: false
  });

  const handleSaveProfile = () => {
    // Save profile data
    console.log('Saving profile:', profileData);
  };

  const handleSaveRates = () => {
    // Save rates
    console.log('Saving rates:', rates);
  };

  const handleSaveNotifications = () => {
    // Save notification settings
    console.log('Saving notifications:', notifications);
  };

  const tabs = [
    { id: 'profile', label: 'Profile', icon: <User className="w-4 h-4" /> },
    { id: 'rates', label: 'Rates', icon: <DollarSign className="w-4 h-4" /> },
    { id: 'notifications', label: 'Notifications', icon: <Bell className="w-4 h-4" /> },
    { id: 'security', label: 'Security', icon: <Shield className="w-4 h-4" /> }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className={`text-3xl font-bold ${gradHead}`}>Settings</h1>
          <p className="text-brown-600 mt-1">Manage your profile and preferences</p>
        </div>
      </div>

      <div className="flex gap-6">
        {/* Sidebar */}
        <div className="w-64 bg-white rounded-xl p-4 shadow-sm border border-gray-100">
          <nav className="space-y-2">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg font-medium transition-all duration-300 ${
                  activeTab === tab.id
                    ? 'bg-yellow-100 text-yellow-700 border-l-4 border-yellow-500'
                    : 'text-brown-700 hover:bg-yellow-50 hover:text-yellow-600'
                }`}
              >
                {tab.icon}
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Main Content */}
        <div className="flex-1">
          {activeTab === 'profile' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-brown-900 mb-6">Profile Information</h2>
              
              <div className="space-y-6">
                {/* Profile Photo */}
                <div className="flex items-center gap-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-yellow-100 rounded-full flex items-center justify-center">
                      <span className="text-yellow-700 font-semibold text-2xl">
                        {profileData.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <button className="absolute bottom-0 right-0 p-2 bg-yellow-500 text-brown-900 rounded-full hover:bg-yellow-400 transition">
                      <Camera className="w-4 h-4" />
                    </button>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold text-brown-900">{profileData.name}</h3>
                    <p className="text-brown-600">Vedic Astrology Expert</p>
                    <div className="flex items-center gap-1 mt-1">
                      <Star className="w-4 h-4 text-yellow-500 fill-current" />
                      <span className="text-sm font-medium text-brown-900">{profileData.rating}</span>
                      <span className="text-sm text-brown-600">({profileData.totalConsultations} consultations)</span>
                    </div>
                  </div>
                </div>

                {/* Basic Information */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Full Name</label>
                    <input
                      type="text"
                      value={profileData.name}
                      onChange={(e) => setProfileData({...profileData, name: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Email</label>
                    <input
                      type="email"
                      value={profileData.email}
                      onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Phone</label>
                    <input
                      type="tel"
                      value={profileData.phone}
                      onChange={(e) => setProfileData({...profileData, phone: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Location</label>
                    <input
                      type="text"
                      value={profileData.location}
                      onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Bio */}
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Bio</label>
                  <textarea
                    value={profileData.bio}
                    onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                    rows={4}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                {/* Specialties */}
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Specialties</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.specialties.map((specialty, index) => (
                      <span key={index} className="px-3 py-1 bg-yellow-100 text-yellow-700 rounded-full text-sm">
                        {specialty}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Languages */}
                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Languages</label>
                  <div className="flex flex-wrap gap-2">
                    {profileData.languages.map((language, index) => (
                      <span key={index} className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm">
                        {language}
                      </span>
                    ))}
                  </div>
                </div>

                <button
                  onClick={handleSaveProfile}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Profile
                </button>
              </div>
            </div>
          )}

          {activeTab === 'rates' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-brown-900 mb-6">Service Rates</h2>
              
              <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Chat Rate (per 5 min)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-600">₹</span>
                      <input
                        type="number"
                        value={rates.chatRate}
                        onChange={(e) => setRates({...rates, chatRate: parseInt(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Call Rate (per min)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-600">₹</span>
                      <input
                        type="number"
                        value={rates.callRate}
                        onChange={(e) => setRates({...rates, callRate: parseInt(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Video Call Rate (per min)</label>
                    <div className="relative">
                      <span className="absolute left-3 top-1/2 transform -translate-y-1/2 text-brown-600">₹</span>
                      <input
                        type="number"
                        value={rates.videoCallRate}
                        onChange={(e) => setRates({...rates, videoCallRate: parseInt(e.target.value)})}
                        className="w-full pl-8 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-brown-700 mb-2">Minimum Duration (min)</label>
                    <input
                      type="number"
                      value={rates.minimumDuration}
                      onChange={(e) => setRates({...rates, minimumDuration: parseInt(e.target.value)})}
                      className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-brown-700 mb-2">Free Minutes for New Users</label>
                  <input
                    type="number"
                    value={rates.freeMinutes}
                    onChange={(e) => setRates({...rates, freeMinutes: parseInt(e.target.value)})}
                    className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>

                <button
                  onClick={handleSaveRates}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Rates
                </button>
              </div>
            </div>
          )}

          {activeTab === 'notifications' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-brown-900 mb-6">Notification Settings</h2>
              
              <div className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-brown-900">New Appointments</h3>
                      <p className="text-sm text-brown-600">Get notified when users book appointments</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.newAppointments}
                        onChange={(e) => setNotifications({...notifications, newAppointments: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-brown-900">Chat Messages</h3>
                      <p className="text-sm text-brown-600">Get notified of new chat messages</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.chatMessages}
                        onChange={(e) => setNotifications({...notifications, chatMessages: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-brown-900">Call Requests</h3>
                      <p className="text-sm text-brown-600">Get notified of incoming call requests</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.callRequests}
                        onChange={(e) => setNotifications({...notifications, callRequests: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-brown-900">Email Notifications</h3>
                      <p className="text-sm text-brown-600">Receive notifications via email</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.emailNotifications}
                        onChange={(e) => setNotifications({...notifications, emailNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>

                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h3 className="font-medium text-brown-900">SMS Notifications</h3>
                      <p className="text-sm text-brown-600">Receive notifications via SMS</p>
                    </div>
                    <label className="relative inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        checked={notifications.smsNotifications}
                        onChange={(e) => setNotifications({...notifications, smsNotifications: e.target.checked})}
                        className="sr-only peer"
                      />
                      <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-yellow-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-yellow-500"></div>
                    </label>
                  </div>
                </div>

                <button
                  onClick={handleSaveNotifications}
                  className="flex items-center gap-2 px-6 py-3 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition font-medium"
                >
                  <Save className="w-4 h-4" />
                  Save Settings
                </button>
              </div>
            </div>
          )}

          {activeTab === 'security' && (
            <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
              <h2 className="text-lg font-semibold text-brown-900 mb-6">Security Settings</h2>
              
              <div className="space-y-6">
                <div>
                  <h3 className="font-medium text-brown-900 mb-4">Change Password</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">Current Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">New Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-brown-700 mb-2">Confirm New Password</label>
                      <input
                        type="password"
                        className="w-full p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      />
                    </div>
                    <button className="px-6 py-3 bg-yellow-500 text-brown-900 rounded-lg hover:bg-yellow-400 transition font-medium">
                      Update Password
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-brown-900 mb-4">Two-Factor Authentication</h3>
                  <div className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                    <div>
                      <h4 className="font-medium text-brown-900">SMS Authentication</h4>
                      <p className="text-sm text-brown-600">Add an extra layer of security</p>
                    </div>
                    <button className="px-4 py-2 border border-gray-300 text-brown-700 rounded-lg hover:bg-gray-50 transition">
                      Enable
                    </button>
                  </div>
                </div>

                <div className="border-t border-gray-200 pt-6">
                  <h3 className="font-medium text-brown-900 mb-4">Login Activity</h3>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-brown-900">Current Session</p>
                        <p className="text-xs text-brown-600">Chrome on Windows • Mumbai, India</p>
                      </div>
                      <span className="text-xs text-green-600 font-medium">Active</span>
                    </div>
                    <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                      <div>
                        <p className="text-sm font-medium text-brown-900">Previous Session</p>
                        <p className="text-xs text-brown-600">Mobile App • Delhi, India</p>
                      </div>
                      <span className="text-xs text-gray-600">2 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
