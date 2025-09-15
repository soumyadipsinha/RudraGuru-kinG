import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  ArrowLeft, 
  CreditCard, 
  MapPin, 
  Phone, 
  Mail, 
  User,
  Shield,
  Truck,
  CheckCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Input } from "../components/ui/input";

// Mock cart data
const cartItems = [
  {
    id: 1,
    name: "Yellow Sapphire (Pukhraj) - 2.5 Carats",
    price: 25000,
    quantity: 1,
    image: "/src/assets/sapphire-yellow.png"
  },
  {
    id: 2,
    name: "5 Mukhi Rudraksha (Nepali)",
    price: 2500,
    quantity: 2,
    image: "/src/assets/rudraksha.png"
  }
];

export default function Checkout() {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
    paymentMethod: "card"
  });

  const subtotal = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const shipping = subtotal > 1000 ? 0 : 100;
  const tax = subtotal * 0.18; // 18% GST
  const total = subtotal + shipping + tax;

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
    }
  };

  const handlePrevious = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle order submission
    console.log("Order submitted:", formData);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-28">
          <div className="flex items-center gap-4">
            <Link to="/store" className="text-gray-600 hover:text-gray-800">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">Checkout</h1>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            {/* Progress Steps */}
            <div className="mb-8">
              <div className="flex items-center justify-between">
                {[
                  { number: 1, title: "Shipping", icon: MapPin },
                  { number: 2, title: "Payment", icon: CreditCard },
                  { number: 3, title: "Review", icon: CheckCircle }
                ].map((stepItem, index) => (
                  <div key={stepItem.number} className="flex items-center">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-full border-2 ${
                      step >= stepItem.number 
                        ? 'bg-yellow-500 border-yellow-500 text-white' 
                        : 'border-gray-300 text-gray-400'
                    }`}>
                      <stepItem.icon className="w-5 h-5" />
                    </div>
                    <span className={`ml-2 text-sm font-medium ${
                      step >= stepItem.number ? 'text-yellow-600' : 'text-gray-400'
                    }`}>
                      {stepItem.title}
                    </span>
                    {index < 2 && (
                      <div className={`w-16 h-0.5 mx-4 ${
                        step > stepItem.number ? 'bg-yellow-500' : 'bg-gray-300'
                      }`} />
                    )}
                  </div>
                ))}
              </div>
            </div>

            {/* Step Content */}
            <div className="bg-white rounded-lg shadow-sm p-6">
              {step === 1 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Shipping Information</h2>
                  <form className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">First Name</label>
                        <Input
                          name="firstName"
                          value={formData.firstName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Last Name</label>
                        <Input
                          name="lastName"
                          value={formData.lastName}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number</label>
                      <Input
                        type="tel"
                        name="phone"
                        value={formData.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Address</label>
                      <Input
                        name="address"
                        value={formData.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">City</label>
                        <Input
                          name="city"
                          value={formData.city}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">State</label>
                        <Input
                          name="state"
                          value={formData.state}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Pincode</label>
                        <Input
                          name="pincode"
                          value={formData.pincode}
                          onChange={handleInputChange}
                          required
                        />
                      </div>
                    </div>
                  </form>
                </div>
              )}

              {step === 2 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Payment Method</h2>
                  <div className="space-y-4">
                    <div className="border rounded-lg p-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="card"
                          checked={formData.paymentMethod === "card"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <CreditCard className="w-5 h-5 mr-2" />
                        <span className="font-medium">Credit/Debit Card</span>
                      </label>
                    </div>
                    <div className="border rounded-lg p-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="upi"
                          checked={formData.paymentMethod === "upi"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <div className="w-5 h-5 mr-2 bg-blue-500 rounded flex items-center justify-center">
                          <span className="text-white text-xs font-bold">UPI</span>
                        </div>
                        <span className="font-medium">UPI Payment</span>
                      </label>
                    </div>
                    <div className="border rounded-lg p-4">
                      <label className="flex items-center cursor-pointer">
                        <input
                          type="radio"
                          name="paymentMethod"
                          value="cod"
                          checked={formData.paymentMethod === "cod"}
                          onChange={handleInputChange}
                          className="mr-3"
                        />
                        <Truck className="w-5 h-5 mr-2" />
                        <span className="font-medium">Cash on Delivery</span>
                      </label>
                    </div>
                  </div>
                </div>
              )}

              {step === 3 && (
                <div>
                  <h2 className="text-xl font-semibold text-gray-900 mb-6">Review Your Order</h2>
                  <div className="space-y-4">
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Shipping Address</h3>
                      <p className="text-gray-700">
                        {formData.firstName} {formData.lastName}<br />
                        {formData.address}<br />
                        {formData.city}, {formData.state} - {formData.pincode}<br />
                        {formData.phone}
                      </p>
                    </div>
                    <div className="bg-gray-50 rounded-lg p-4">
                      <h3 className="font-medium text-gray-900 mb-3">Payment Method</h3>
                      <p className="text-gray-700 capitalize">
                        {formData.paymentMethod === "card" && "Credit/Debit Card"}
                        {formData.paymentMethod === "upi" && "UPI Payment"}
                        {formData.paymentMethod === "cod" && "Cash on Delivery"}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Navigation Buttons */}
              <div className="flex justify-between mt-8">
                {step > 1 && (
                  <Button onClick={handlePrevious} variant="outline">
                    Previous
                  </Button>
                )}
                <div className="ml-auto">
                  {step < 3 ? (
                    <Button onClick={handleNext} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                      Next
                    </Button>
                  ) : (
                    <Button onClick={handleSubmit} className="bg-green-500 hover:bg-green-600 text-white">
                      Place Order
                    </Button>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Order Summary</h3>
              
              <div className="space-y-4 mb-6">
                {cartItems.map(item => (
                  <div key={item.id} className="flex items-center gap-3">
                    <img
                      src={item.image}
                      alt={item.name}
                      className="w-12 h-12 object-cover rounded"
                    />
                    <div className="flex-1">
                      <h4 className="text-sm font-medium text-gray-900 line-clamp-2">{item.name}</h4>
                      <p className="text-sm text-gray-600">Qty: {item.quantity}</p>
                    </div>
                    <span className="text-sm font-medium text-gray-900">
                      ₹{(item.price * item.quantity).toLocaleString()}
                    </span>
                  </div>
                ))}
              </div>

              <div className="border-t pt-4 space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Subtotal</span>
                  <span className="text-gray-900">₹{subtotal.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Shipping</span>
                  <span className="text-gray-900">
                    {shipping === 0 ? 'Free' : `₹${shipping}`}
                  </span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-gray-600">Tax (GST)</span>
                  <span className="text-gray-900">₹{tax.toLocaleString()}</span>
                </div>
                <div className="flex justify-between text-lg font-semibold border-t pt-2">
                  <span className="text-gray-900">Total</span>
                  <span className="text-gray-900">₹{total.toLocaleString()}</span>
                </div>
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Shield className="w-4 h-4" />
                  <span>Secure payment</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <Truck className="w-4 h-4" />
                  <span>Free shipping on orders above ₹1000</span>
                </div>
                <div className="flex items-center gap-2 text-sm text-gray-600">
                  <CheckCircle className="w-4 h-4" />
                  <span>30 days return policy</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
