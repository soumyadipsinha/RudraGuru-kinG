import { useState } from 'react';
import { Calendar as CalendarIcon, Clock, MapPin, Phone, User, Mail, Star, ChevronDown, Check } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Popover, PopoverTrigger, PopoverContent } from '../components/ui/popover';
import { Calendar } from '../components/ui/calendar';
import { Label } from '../components/ui/label';
import { Input } from '../components/ui/input';

interface Puja {
  id: number;
  name: string;
  hindiName: string;
  description: string;
  duration: string;
  price: number;
  benefits: string[];
  image: string;
  category: string;
}

interface Priest {
  id: number;
  name: string;
  experience: string;
  specialization: string[];
  rating: number;
  price: number;
  image: string;
  languages: string[];
}

const pujas: Puja[] = [
  {
    id: 1,
    name: "Ganesh Puja",
    hindiName: "गणेश पूजा",
    description: "Lord Ganesha worship is performed to remove obstacles and for new beginnings.",
    duration: "1-2 hours",
    price: 1100,
    benefits: ["Obstacle Removal", "Success Achievement", "Wisdom Enhancement", "Auspiciousness"],
    image: "/assets/give  me ganesh puja picture by panditji.jpg",
    category: "Regular Puja"
  },
  {
    id: 2,
    name: "Satyanarayana Puja",
    hindiName: "सत्यनारायण पूजा",
    description: "Lord Vishnu's Satyanarayana form worship is performed for wish fulfillment.",
    duration: "2-3 hours",
    price: 2100,
    benefits: ["Wish Fulfillment", "Prosperity", "Family Happiness", "Religious Merit"],
    image: "/assets/satyanarayan puja with panditji.jpg",
    category: "Vrat Puja"
  },
  {
    id: 3,
    name: "Lakshmi Puja",
    hindiName: "लक्ष्मी पूजा",
    description: "Goddess Lakshmi worship is performed for wealth, prosperity and peace.",
    duration: "1-2 hours",
    price: 1501,
    benefits: ["Wealth Gain", "Prosperity", "Business Growth", "Home Peace"],
    image: "/assets/give me lakshmi puja pic with pandit ji.jpg",
    category: "Regular Puja"
  },
  {
    id: 4,
    name: "Durga Puja",
    hindiName: "दुर्गा पूजा",
    description: "Goddess Durga worship is performed for gaining power and protection from evil.",
    duration: "2-3 hours",
    price: 2501,
    benefits: ["Power Gain", "Protection", "Liberation from Evil", "Victory Achievement"],
    image: "/assets/give me durga puja pic from pandit ji.jpg",
    category: "Goddess Puja"
  },
  {
    id: 5,
    name: "Shiva Puja",
    hindiName: "शिव पूजा",
    description: "Lord Shiva worship is performed for spiritual advancement and salvation.",
    duration: "1-2 hours",
    price: 1801,
    benefits: ["Spiritual Advancement", "Mental Peace", "Well-being", "Path to Salvation"],
    image: "/assets/give me shivratri pic with panditji.jpg",
    category: "Regular Puja"
  },
  {
    id: 6,
    name: "Hanuman Puja",
    hindiName: "हनुमान पूजा",
    description: "Lord Hanuman worship is performed for gaining strength, courage and devotion.",
    duration: "1 hour",
    price: 1001,
    benefits: ["Strength Enhancement", "Courage", "Devotion", "Problem Resolution"],
    image: "/assets/hanuman puja pic with panditji.jpg",
    category: "Regular Puja"
  },
  {
    id: 7,
    name: "Navgraha Puja",
    hindiName: "नवग्रह पूजा",
    description: "Nine planets worship is performed for planetary defect removal and good fortune.",
    duration: "2-3 hours",
    price: 3501,
    benefits: ["Planetary Defect Removal", "Good Fortune", "Health Benefits", "Career Advancement"],
    image: "/assets/give me nabagrahaa puja pic with panditji.jpg",
    category: "Special Puja"
  },
  {
    id: 8,
    name: "Kali Puja",
    hindiName: "काली पूजा",
    description: "Goddess Kali worship is performed for enemy destruction and power gain.",
    duration: "2 hours",
    price: 2001,
    benefits: ["Enemy Destruction", "Power Gain", "Protection", "Justice Achievement"],
    image: "/assets/serviceLogo.png",
    category: "Goddess Puja"
  },
  {
    id: 9,
    name: "Rudrabhishek",
    hindiName: "रुद्राभिषेक",
    description: "Lord Shiva's Rudrabhishek is performed for sin destruction and salvation.",
    duration: "3-4 hours",
    price: 5101,
    benefits: ["Sin Destruction", "Salvation Achievement", "Health Benefits", "Spiritual Purification"],
    image: "/assets/rudravishek pic with panditji.jpg",
    category: "Special Puja"
  },
  {
    id: 10,
    name: "Griha Pravesh Puja",
    hindiName: "गृह प्रवेश पूजा",
    description: "House warming ceremony performed for auspiciousness and prosperity in new home.",
    duration: "2-3 hours",
    price: 3001,
    benefits: ["Home Purification", "Vastu Defect Removal", "Prosperity", "Auspicious Beginning"],
    image: "/assets/give me grihaprabesh puja pic.jpg",
    category: "Ritual Puja"
  },
  {
    id: 11,
    name: "Vastu Shanti Puja",
    hindiName: "वास्तु शांति पूजा",
    description: "Vastu peace ceremony performed for removing vastu defects and establishing peace at home.",
    duration: "3-4 hours",
    price: 4001,
    benefits: ["Vastu Defect Removal", "Peace", "Prosperity", "Positive Energy"],
    image: "/assets/give me vastu puja pic with panditji.jpg",
    category: "Special Puja"
  },
  {
    id: 12,
    name: "Sundarkand Path",
    hindiName: "सुंदरकांड पाठ",
    description: "Hanuman Chalisa and Sundarkand recitation is performed for problem resolution.",
    duration: "2 hours",
    price: 1501,
    benefits: ["Problem Resolution", "Mental Peace", "Devotion Enhancement", "Blessings"],
    image: "/assets/serviceLogo.png",
    category: "Path-Puja"
  }
];

const priests: Priest[] = [
  {
    id: 1,
    name: "Pandit Ram Sharma",
    experience: "15+ years",
    specialization: ["Vedic Puja", "Griha Pravesh", "Marriage Rituals"],
    rating: 4.9,
    price: 500,
    image: "/assets/astro1.jpg",
    languages: ["Hindi", "Sanskrit", "English"]
  },
  {
    id: 2,
    name: "Pandit Suresh Tiwari",
    experience: "20+ years",
    specialization: ["Navgraha Puja", "Rudrabhishek", "Vastu Shanti"],
    rating: 4.8,
    price: 700,
    image: "/assets/astro2.jpg",
    languages: ["Hindi", "Sanskrit", "Bengali"]
  },
  {
    id: 3,
    name: "Pandit Ajay Pande",
    experience: "12+ years",
    specialization: ["Goddess Puja", "Hanuman Chalisa", "Satyanarayana Vrat"],
    rating: 4.7,
    price: 450,
    image: "/assets/astro3.jpg",
    languages: ["Hindi", "Sanskrit", "Marathi"]
  },
  {
    id: 4,
    name: "Pandit Vijay Shukla",
    experience: "18+ years",
    specialization: ["Shiva Puja", "Lakshmi Puja", "Ganesh Puja"],
    rating: 4.9,
    price: 600,
    image: "/assets/astrologer.png",
    languages: ["Hindi", "Sanskrit", "Gujarati"]
  }
];

const categories = [
  "All",
  "Regular Puja",
  "Goddess Puja", 
  "Special Puja",
  "Vrat Puja",
  "Ritual Puja",
  "Path-Puja"
];

const PujaBooking = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedPuja, setSelectedPuja] = useState<Puja | null>(null);
  const [selectedPriest, setSelectedPriest] = useState<Priest | null>(null);
  const [currentStep, setCurrentStep] = useState(1);
  const [showPriestDropdown, setShowPriestDropdown] = useState(false);
  const [bookingDetails, setBookingDetails] = useState({
    name: '',
    phone: '',
    email: '',
    address: '',
    date: '',
    time: '',
    specialRequests: ''
  });

  const filteredPujas = selectedCategory === "All" 
    ? pujas 
    : pujas.filter(puja => puja.category === selectedCategory);

  const handlePujaSelect = (puja: Puja) => {
    setSelectedPuja(puja);
    setCurrentStep(2);
  };

  const handlePriestSelect = (priest: Priest) => {
    setSelectedPriest(priest);
    setShowPriestDropdown(false);
    setCurrentStep(3);
  };

  const handleBookingSubmit = () => {
    // Handle booking submission logic here
    console.log('Booking Details:', {
      puja: selectedPuja,
      priest: selectedPriest,
      details: bookingDetails
    });
    setCurrentStep(4);
  };

  const totalAmount = (selectedPuja?.price || 0) + (selectedPriest?.price || 0);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-red-50 to-pink-50">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-red-600 to-orange-600 text-white py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Puja Booking
          </h1>
          <p className="text-xl md:text-2xl mb-6">
            Book Authentic Puja & Path Services at Home
          </p>
          <div className="flex flex-wrap justify-center gap-4 text-sm md:text-base">
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Certified Pandits
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              Guaranteed Service
            </span>
            <span className="flex items-center gap-2">
              <Check className="w-5 h-5" />
              24/7 Support
            </span>
          </div>
        </div>
      </div>

      {/* Steps Indicator */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex justify-between items-center mb-8">
          {[
            { step: 1, title: "Choose Puja", icon: <CalendarIcon className="w-5 h-5" /> },
            { step: 2, title: "Select Pandit", icon: <User className="w-5 h-5" /> },
            { step: 3, title: "Fill Details", icon: <Mail className="w-5 h-5" /> },
            { step: 4, title: "Complete Booking", icon: <Check className="w-5 h-5" /> }
          ].map((item, index) => (
            <div key={item.step} className="flex items-center">
              <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                currentStep >= item.step 
                  ? 'bg-red-600 text-white border-red-600' 
                  : 'bg-white text-gray-400 border-gray-300'
              }`}>
                {currentStep > item.step ? <Check className="w-5 h-5" /> : item.icon}
              </div>
              <span className={`ml-3 text-sm font-medium ${
                currentStep >= item.step ? 'text-red-600' : 'text-gray-400'
              }`}>
                {item.title}
              </span>
              {index < 3 && (
                <div className={`hidden md:block w-16 h-0.5 ml-4 ${
                  currentStep > item.step ? 'bg-red-600' : 'bg-gray-300'
                }`} />
              )}
            </div>
          ))}
        </div>

        {/* Step 1: Choose Puja */}
        {currentStep === 1 && (
          <div>
            {/* Category Filter */}
            <div className="mb-8">
              <h3 className="text-xl font-semibold mb-4">Choose Puja Category</h3>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <Button
                    key={category}
                    variant={selectedCategory === category ? "default" : "outline"}
                    onClick={() => setSelectedCategory(category)}
                    className={`${
                      selectedCategory === category
                        ? 'bg-red-600 text-white'
                        : 'bg-white text-red-600 border-red-300 hover:bg-red-50'
                    }`}
                  >
                    {category}
                  </Button>
                ))}
              </div>
            </div>

            {/* Puja Grid */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Select Puja</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredPujas.map((puja) => (
                  <div
                    key={puja.id}
                    className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-red-100 hover:border-red-300"
                  >
                    <img src={puja.image} alt={puja.name} className="w-full h-40 object-cover rounded-t-xl" />
                    <div className="p-6">
                      <div className="flex justify-between items-start mb-4">
                        <div>
                          <h4 className="font-bold text-lg text-gray-900">{puja.name}</h4>
                          <p className="text-red-600 font-semibold">₹{puja.price}</p>
                        </div>
                        <span className="text-2xl">{puja.hindiName}</span>
                      </div>
                      
                      <p className="text-gray-600 mb-4 text-sm">{puja.description}</p>
                      
                      <div className="flex items-center gap-4 mb-4 text-sm text-gray-500">
                        <span className="flex items-center gap-1">
                          <Clock className="w-4 h-4" />
                          {puja.duration}
                        </span>
                        <span className="bg-red-100 text-red-600 px-2 py-1 rounded-full text-xs">
                          {puja.category}
                        </span>
                      </div>
                      
                      <div>
                        <p className="font-medium text-gray-900 mb-2">Benefits:</p>
                        <div className="flex flex-wrap gap-1">
                          {puja.benefits.slice(0, 3).map((benefit, index) => (
                            <span key={index} className="bg-orange-100 text-orange-600 px-2 py-1 rounded-full text-xs">
                              {benefit}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="mt-5 flex gap-3">
                        <Button className="bg-red-600 hover:bg-red-700 text-white" onClick={() => handlePujaSelect(puja)}>
                          View Details
                        </Button>
                        <QuickBook />
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Step 2: Select Priest */}
        {currentStep === 2 && selectedPuja && (
          <div>
            <div className="bg-white rounded-xl shadow-lg p-6 mb-8">
              <h3 className="text-xl font-semibold mb-4">Selected Puja</h3>
              <div className="flex items-center gap-4">
                <div>
                  <h4 className="font-bold text-lg">{selectedPuja.name}</h4>
                  <p className="text-red-600 font-semibold">₹{selectedPuja.price}</p>
                </div>
                <Button
                  variant="outline"
                  onClick={() => setCurrentStep(1)}
                  className="ml-auto"
                >
                  Change Puja
                </Button>
              </div>
            </div>

            <h3 className="text-xl font-semibold mb-4">Select Pandit Ji</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {priests.map((priest) => (
                <div
                  key={priest.id}
                  onClick={() => handlePriestSelect(priest)}
                  className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer border border-red-100 hover:border-red-300"
                >
                  <div className="p-6">
                    <div className="flex items-start gap-4">
                      <img
                        src={priest.image}
                        alt={priest.name}
                        className="w-16 h-16 rounded-full object-cover"
                      />
                      <div className="flex-1">
                        <h4 className="font-bold text-lg text-gray-900">{priest.name}</h4>
                        <p className="text-gray-600">{priest.experience}</p>
                        <div className="flex items-center gap-1 mt-1">
                          <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          <span className="text-sm text-gray-600">{priest.rating}</span>
                        </div>
                      </div>
                      <p className="text-red-600 font-semibold">₹{priest.price}</p>
                    </div>
                    
                    <div className="mt-4">
                      <p className="font-medium text-gray-900 mb-2">Specialization:</p>
                      <div className="flex flex-wrap gap-1 mb-3">
                        {priest.specialization.map((spec, index) => (
                          <span key={index} className="bg-blue-100 text-blue-600 px-2 py-1 rounded-full text-xs">
                            {spec}
                          </span>
                        ))}
                      </div>
                      
                      <p className="font-medium text-gray-900 mb-2">Languages:</p>
                      <div className="flex flex-wrap gap-1">
                        {priest.languages.map((lang, index) => (
                          <span key={index} className="bg-green-100 text-green-600 px-2 py-1 rounded-full text-xs">
                            {lang}
                          </span>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Fill Details */}
        {currentStep === 3 && selectedPuja && selectedPriest && (
          <div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Booking Form */}
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-semibold mb-6">Booking Details</h3>
                
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Full Name *
                    </label>
                    <input
                      type="text"
                      value={bookingDetails.name}
                      onChange={(e) => setBookingDetails({...bookingDetails, name: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Phone Number *
                    </label>
                    <input
                      type="tel"
                      value={bookingDetails.phone}
                      onChange={(e) => setBookingDetails({...bookingDetails, phone: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your phone number"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Email Address
                    </label>
                    <input
                      type="email"
                      value={bookingDetails.email}
                      onChange={(e) => setBookingDetails({...bookingDetails, email: e.target.value})}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your email address"
                    />
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Address *
                    </label>
                    <textarea
                      value={bookingDetails.address}
                      onChange={(e) => setBookingDetails({...bookingDetails, address: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Enter your complete address"
                    />
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Date *
                      </label>
                      <input
                        type="date"
                        value={bookingDetails.date}
                        onChange={(e) => setBookingDetails({...bookingDetails, date: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                        min={new Date().toISOString().split('T')[0]}
                      />
                    </div>
                    
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Preferred Time *
                      </label>
                      <input
                        type="time"
                        value={bookingDetails.time}
                        onChange={(e) => setBookingDetails({...bookingDetails, time: e.target.value})}
                        className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Special Requests
                    </label>
                    <textarea
                      value={bookingDetails.specialRequests}
                      onChange={(e) => setBookingDetails({...bookingDetails, specialRequests: e.target.value})}
                      rows={3}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-red-500 focus:border-red-500"
                      placeholder="Any special requirements or requests..."
                    />
                  </div>
                </div>
                
                <Button
                  onClick={handleBookingSubmit}
                  className="w-full mt-6 bg-red-600 hover:bg-red-700 text-white py-3"
                  disabled={!bookingDetails.name || !bookingDetails.phone || !bookingDetails.address || !bookingDetails.date || !bookingDetails.time}
                >
                  Confirm Booking
                </Button>
              </div>

              {/* Booking Summary */}
              <div className="bg-white rounded-xl shadow-lg p-6 h-fit">
                <h3 className="text-xl font-semibold mb-6">Booking Summary</h3>
                
                <div className="space-y-4">
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900">Selected Puja</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span>{selectedPuja.name}</span>
                      <span className="text-red-600 font-semibold">₹{selectedPuja.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{selectedPuja.duration}</p>
                  </div>
                  
                  <div className="border-b pb-4">
                    <h4 className="font-semibold text-gray-900">Selected Pandit</h4>
                    <div className="flex justify-between items-center mt-2">
                      <span>{selectedPriest.name}</span>
                      <span className="text-red-600 font-semibold">₹{selectedPriest.price}</span>
                    </div>
                    <p className="text-gray-600 text-sm mt-1">{selectedPriest.experience}</p>
                  </div>
                  
                  <div className="pt-4">
                    <div className="flex justify-between items-center text-lg font-bold">
                      <span>Total Amount</span>
                      <span className="text-red-600">₹{totalAmount}</span>
                    </div>
                  </div>
                </div>
                
                <div className="mt-6 p-4 bg-green-50 rounded-lg">
                  <div className="flex items-center gap-2 text-green-600">
                    <Check className="w-5 h-5" />
                    <span className="font-medium">What's Included:</span>
                  </div>
                  <ul className="mt-2 text-sm text-green-700 space-y-1">
                    <li>• Complete puja materials (samagri)</li>
                    <li>• Certified pandit service</li>
                    <li>• Travel allowance included</li>
                    <li>• Post-puja guidance</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Step 4: Booking Confirmation */}
        {currentStep === 4 && (
          <div className="text-center">
            <div className="bg-white rounded-xl shadow-lg p-8 max-w-2xl mx-auto">
              <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                <Check className="w-10 h-10 text-green-600" />
              </div>
              
              <h3 className="text-2xl font-bold text-gray-900 mb-4">
                Booking Confirmed!
              </h3>
              
              <p className="text-gray-600 mb-6">
                Your puja booking has been confirmed. Our team will contact you within 1 hour to confirm the details.
              </p>
              
              <div className="bg-gray-50 rounded-lg p-6 mb-6">
                <h4 className="font-semibold mb-4">Booking Details</h4>
                <div className="text-left space-y-2">
                  <p><span className="font-medium">Puja:</span> {selectedPuja?.name}</p>
                  <p><span className="font-medium">Pandit:</span> {selectedPriest?.name}</p>
                  <p><span className="font-medium">Date:</span> {bookingDetails.date}</p>
                  <p><span className="font-medium">Time:</span> {bookingDetails.time}</p>
                  <p><span className="font-medium">Total Amount:</span> ₹{totalAmount}</p>
                </div>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button 
                  onClick={() => window.location.href = '/'}
                  className="bg-red-600 hover:bg-red-700 text-white"
                >
                  Back to Home
                </Button>
                <Button 
                  variant="outline"
                  onClick={() => {
                    setCurrentStep(1);
                    setSelectedPuja(null);
                    setSelectedPriest(null);
                    setBookingDetails({
                      name: '',
                      phone: '',
                      email: '',
                      address: '',
                      date: '',
                      time: '',
                      specialRequests: ''
                    });
                  }}
                  className="border-red-600 text-red-600 hover:bg-red-50"
                >
                  Book Another Puja
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default PujaBooking;

function QuickBook() {
  const [open, setOpen] = useState(false);
  const [date, setDate] = useState<Date | undefined>(undefined);
  const [time, setTime] = useState<string>("10:30:00");

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="whitespace-nowrap">
          Quick Book
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto overflow-hidden p-4" align="end">
        <div className="flex gap-4">
          <div className="flex flex-col gap-3">
            <Label htmlFor="qb-date" className="px-1">Date</Label>
            <Calendar
              mode="single"
              selected={date}
              captionLayout="dropdown"
              onSelect={(d) => setDate(d)}
            />
          </div>
          <div className="flex flex-col gap-3">
            <Label htmlFor="qb-time" className="px-1">Time</Label>
            <Input
              type="time"
              id="qb-time"
              step="60"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-background"
            />
            <Button
              className="mt-auto"
              onClick={() => {
                setOpen(false);
                alert(`Puja booked on ${date ? date.toLocaleDateString() : "[select date]"} at ${time}`);
              }}
            >
              Confirm
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  );
}