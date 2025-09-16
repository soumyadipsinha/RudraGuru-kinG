import { useState } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  X,
  Star,
  Heart,
  ShoppingCart,
  Plus,
  Minus
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";

// Comprehensive gemstone data based on GemsMantra
const gemstones = [
  // Rashi Ratna (Main Planetary Gemstones)
  {
    id: 1,
    name: "Yellow Sapphire (Pukhraj)",
    category: "rashi-ratna",
    color: "Yellow",
    planet: "Jupiter",
    zodiac: ["Sagittarius", "Pisces"],
    price: 25000,
    originalPrice: 31250,
    discount: 20,
    image: "/src/assets/sapphire-yellow.png",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Natural Yellow Sapphire for Jupiter planet. Enhances wisdom, prosperity and spiritual growth.",
    benefits: ["Wisdom & Knowledge", "Prosperity & Wealth", "Spiritual Growth", "Academic Success"],
    weight: "2.5 Carats",
    origin: "Sri Lanka",
    certification: "IGI Certified"
  },
  {
    id: 2,
    name: "Blue Sapphire (Neelam)",
    category: "rashi-ratna",
    color: "Blue",
    planet: "Saturn",
    zodiac: ["Capricorn", "Aquarius"],
    price: 18000,
    originalPrice: 22500,
    discount: 20,
    image: "/src/assets/sapphire-blue.png",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    description: "Natural Blue Sapphire for Saturn planet. Brings discipline, focus and removes obstacles.",
    benefits: ["Discipline & Focus", "Removes Obstacles", "Career Stability", "Spiritual Protection"],
    weight: "1.8 Carats",
    origin: "Kashmir",
    certification: "GIA Certified"
  },
  {
    id: 3,
    name: "Ruby (Manik)",
    category: "rashi-ratna",
    color: "Red",
    planet: "Sun",
    zodiac: ["Leo"],
    price: 45000,
    originalPrice: 56250,
    discount: 20,
    image: "/src/assets/ruby.png",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    description: "Natural Ruby for Sun planet. Enhances leadership, confidence and vitality.",
    benefits: ["Leadership Qualities", "Confidence & Vitality", "Authority & Power", "Health & Energy"],
    weight: "3.2 Carats",
    origin: "Burma",
    certification: "IGI Certified"
  },
  {
    id: 4,
    name: "Emerald (Panna)",
    category: "rashi-ratna",
    color: "Green",
    planet: "Mercury",
    zodiac: ["Gemini", "Virgo"],
    price: 32000,
    originalPrice: 40000,
    discount: 20,
    image: "/src/assets/panna.png",
    rating: 4.6,
    reviews: 87,
    inStock: true,
    description: "Natural Emerald for Mercury planet. Improves communication, intelligence and business success.",
    benefits: ["Communication Skills", "Intelligence & Memory", "Business Success", "Mental Clarity"],
    weight: "2.1 Carats",
    origin: "Colombia",
    certification: "GIA Certified"
  },
  {
    id: 5,
    name: "Red Coral (Moonga)",
    category: "rashi-ratna",
    color: "Red",
    planet: "Mars",
    zodiac: ["Aries", "Scorpio"],
    price: 15000,
    originalPrice: 18750,
    discount: 20,
    image: "/src/assets/redCoral.png",
    rating: 4.5,
    reviews: 73,
    inStock: true,
    description: "Natural Red Coral for Mars planet. Enhances courage, energy and removes enemies.",
    benefits: ["Courage & Energy", "Removes Enemies", "Physical Strength", "Leadership"],
    weight: "4.5 Carats",
    origin: "Mediterranean",
    certification: "IGI Certified"
  },
  {
    id: 6,
    name: "Hessonite (Gomed)",
    category: "rashi-ratna",
    color: "Orange",
    planet: "Rahu",
    zodiac: ["Aquarius", "Capricorn"],
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: "/src/assets/hessonite.png",
    rating: 4.4,
    reviews: 65,
    inStock: true,
    description: "Natural Hessonite for Rahu planet. Removes negative energies and brings success.",
    benefits: ["Removes Negativity", "Success & Growth", "Protection from Evil", "Spiritual Progress"],
    weight: "3.8 Carats",
    origin: "Sri Lanka",
    certification: "IGI Certified"
  },
  {
    id: 7,
    name: "Cat's Eye (Lehsuniya)",
    category: "rashi-ratna",
    color: "Brown",
    planet: "Ketu",
    zodiac: ["Pisces", "Sagittarius"],
    price: 22000,
    originalPrice: 27500,
    discount: 20,
    image: "/src/assets/catEye.png",
    rating: 4.7,
    reviews: 92,
    inStock: true,
    description: "Natural Cat's Eye for Ketu planet. Provides protection and spiritual enlightenment.",
    benefits: ["Spiritual Protection", "Enlightenment", "Removes Fear", "Intuition"],
    weight: "2.7 Carats",
    origin: "Sri Lanka",
    certification: "GIA Certified"
  },
  {
    id: 8,
    name: "Pearl (Moti)",
    category: "rashi-ratna",
    color: "White",
    planet: "Moon",
    zodiac: ["Cancer"],
    price: 18000,
    originalPrice: 22500,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.6,
    reviews: 89,
    inStock: true,
    description: "Natural Pearl for Moon planet. Enhances emotional balance and intuition.",
    benefits: ["Emotional Balance", "Intuition", "Peace of Mind", "Fertility"],
    weight: "3.5 Carats",
    origin: "South Sea",
    certification: "IGI Certified"
  },
  {
    id: 9,
    name: "Diamond (Heera)",
    category: "rashi-ratna",
    color: "White",
    planet: "Venus",
    zodiac: ["Taurus", "Libra"],
    price: 75000,
    originalPrice: 93750,
    discount: 20,
    image: "/src/assets/heera.png",
    rating: 4.9,
    reviews: 134,
    inStock: true,
    description: "Natural Diamond for Venus planet. Enhances love, beauty and luxury.",
    benefits: ["Love & Relationships", "Beauty & Charm", "Luxury & Comfort", "Artistic Abilities"],
    weight: "1.2 Carats",
    origin: "South Africa",
    certification: "GIA Certified"
  },
  // Vedic Gems
  {
    id: 10,
    name: "Amethyst",
    category: "vedic-gems",
    color: "Purple",
    planet: "Saturn",
    zodiac: ["Capricorn", "Aquarius"],
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.5,
    reviews: 67,
    inStock: true,
    description: "Natural Amethyst for spiritual growth and mental clarity.",
    benefits: ["Spiritual Growth", "Mental Clarity", "Stress Relief", "Intuition"],
    weight: "4.2 Carats",
    origin: "Brazil",
    certification: "IGI Certified"
  },
  {
    id: 11,
    name: "Turquoise (Firoza)",
    category: "vedic-gems",
    color: "Blue",
    planet: "Jupiter",
    zodiac: ["Sagittarius", "Pisces"],
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: "/src/assets/turquoise.png",
    rating: 4.4,
    reviews: 54,
    inStock: true,
    description: "Natural Turquoise for protection and communication.",
    benefits: ["Protection", "Communication", "Healing", "Wisdom"],
    weight: "3.8 Carats",
    origin: "Iran",
    certification: "IGI Certified"
  },
  {
    id: 12,
    name: "Citrine (Sunela)",
    category: "vedic-gems",
    color: "Yellow",
    planet: "Sun",
    zodiac: ["Leo"],
    price: 6000,
    originalPrice: 7500,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.3,
    reviews: 43,
    inStock: true,
    description: "Natural Citrine for abundance and success.",
    benefits: ["Abundance", "Success", "Creativity", "Optimism"],
    weight: "5.1 Carats",
    origin: "Brazil",
    certification: "IGI Certified"
  },
  {
    id: 13,
    name: "Garnet",
    category: "vedic-gems",
    color: "Red",
    planet: "Mars",
    zodiac: ["Aries", "Scorpio"],
    price: 9000,
    originalPrice: 11250,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.4,
    reviews: 58,
    inStock: true,
    description: "Natural Garnet for passion and energy.",
    benefits: ["Passion", "Energy", "Courage", "Vitality"],
    weight: "3.6 Carats",
    origin: "India",
    certification: "IGI Certified"
  },
  {
    id: 14,
    name: "Peridot",
    category: "vedic-gems",
    color: "Green",
    planet: "Mercury",
    zodiac: ["Gemini", "Virgo"],
    price: 11000,
    originalPrice: 13750,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.5,
    reviews: 61,
    inStock: true,
    description: "Natural Peridot for healing and growth.",
    benefits: ["Healing", "Growth", "Prosperity", "Harmony"],
    weight: "2.9 Carats",
    origin: "Pakistan",
    certification: "IGI Certified"
  },
  {
    id: 15,
    name: "Zircon (Jarkan)",
    category: "vedic-gems",
    color: "Blue",
    planet: "Venus",
    zodiac: ["Taurus", "Libra"],
    price: 7000,
    originalPrice: 8750,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.2,
    reviews: 39,
    inStock: true,
    description: "Natural Zircon for clarity and wisdom.",
    benefits: ["Clarity", "Wisdom", "Protection", "Spiritual Growth"],
    weight: "4.7 Carats",
    origin: "Sri Lanka",
    certification: "IGI Certified"
  },
  // Other Gems
  {
    id: 16,
    name: "Tiger's Eye",
    category: "other-gems",
    color: "Brown",
    planet: "Sun",
    zodiac: ["Leo"],
    price: 4000,
    originalPrice: 5000,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.3,
    reviews: 47,
    inStock: true,
    description: "Natural Tiger's Eye for courage and protection.",
    benefits: ["Courage", "Protection", "Confidence", "Strength"],
    weight: "6.2 Carats",
    origin: "South Africa",
    certification: "IGI Certified"
  },
  {
    id: 17,
    name: "Jasper",
    category: "other-gems",
    color: "Red",
    planet: "Mars",
    zodiac: ["Aries", "Scorpio"],
    price: 3000,
    originalPrice: 3750,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.1,
    reviews: 35,
    inStock: true,
    description: "Natural Jasper for grounding and stability.",
    benefits: ["Grounding", "Stability", "Protection", "Nurturing"],
    weight: "8.5 Carats",
    origin: "India",
    certification: "IGI Certified"
  },
  {
    id: 18,
    name: "Moonstone",
    category: "other-gems",
    color: "White",
    planet: "Moon",
    zodiac: ["Cancer"],
    price: 5000,
    originalPrice: 6250,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.4,
    reviews: 52,
    inStock: true,
    description: "Natural Moonstone for intuition and emotional balance.",
    benefits: ["Intuition", "Emotional Balance", "Fertility", "New Beginnings"],
    weight: "4.8 Carats",
    origin: "Sri Lanka",
    certification: "IGI Certified"
  },
  {
    id: 19,
    name: "Lapis Lazuli",
    category: "other-gems",
    color: "Blue",
    planet: "Jupiter",
    zodiac: ["Sagittarius", "Pisces"],
    price: 8500,
    originalPrice: 10625,
    discount: 20,
    image: "/src/assets/serviceLogo.png",
    rating: 4.6,
    reviews: 68,
    inStock: true,
    description: "Natural Lapis Lazuli for wisdom and truth.",
    benefits: ["Wisdom", "Truth", "Communication", "Spiritual Awareness"],
    weight: "3.3 Carats",
    origin: "Afghanistan",
    certification: "IGI Certified"
  },
  {
    id: 20,
    name: "Opal Stone",
    category: "other-gems",
    color: "Multi",
    planet: "Venus",
    zodiac: ["Taurus", "Libra"],
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    image: "/src/assets/opal.png",
    rating: 4.3,
    reviews: 54,
    inStock: true,
    description: "Natural Opal for creativity and emotional balance.",
    benefits: ["Creativity", "Emotional Balance", "Love & Relationships", "Artistic Abilities"],
    weight: "3.1 Carats",
    origin: "Australia",
    certification: "IGI Certified"
  }
];

const filterOptions = {
  name: [
    "Amber", "Apatite", "Aventurine", "Azurite", "Tourmaline", "Bloodstone", "Ruby",
    "Carnelian", "Quartz", "Howlite", "Amethyst", "Aquamarine", "Sapphire", "Emerald",
    "Citrine", "Opal", "Hessonite", "Iolite", "Jasper", "Pearl", "Lapis Lazuli",
    "Moonstone", "Peridot", "Coral", "Tigers Eye", "Turquoise", "Zircon"
  ],
  color: ["Aqua", "Blue", "Brown", "Green", "Maroon", "Orange", "Purple", "Red", "White", "Yellow"],
  planet: ["Sun", "Moon", "Jupiter", "Rahu", "Mercury", "Venus", "Ketu", "Saturn", "Mars"],
  zodiac: ["Aries", "Taurus", "Gemini", "Cancer", "Leo", "Virgo", "Libra", "Scorpio", "Sagittarius", "Capricorn", "Aquarius", "Pisces"]
};

export default function GemstonesPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedFilters, setSelectedFilters] = useState({
    name: [] as string[],
    color: [] as string[],
    planet: [] as string[],
    zodiac: [] as string[]
  });
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<{[key: number]: number}>({});
  const [wishlist, setWishlist] = useState<number[]>([]);

  // Filter gemstones based on search and selected filters
  const filteredGemstones = gemstones.filter(gemstone => {
    const matchesSearch = gemstone.name.toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesName = selectedFilters.name.length === 0 || 
      selectedFilters.name.some(filter => gemstone.name.toLowerCase().includes(filter.toLowerCase()));
    
    const matchesColor = selectedFilters.color.length === 0 || 
      selectedFilters.color.includes(gemstone.color);
    
    const matchesPlanet = selectedFilters.planet.length === 0 || 
      selectedFilters.planet.includes(gemstone.planet);
    
    const matchesZodiac = selectedFilters.zodiac.length === 0 || 
      selectedFilters.zodiac.some(zodiac => gemstone.zodiac.includes(zodiac));
    
    return matchesSearch && matchesName && matchesColor && matchesPlanet && matchesZodiac;
  });

  const handleFilterChange = (filterType: keyof typeof selectedFilters, value: string) => {
    setSelectedFilters(prev => ({
      ...prev,
      [filterType]: prev[filterType].includes(value)
        ? prev[filterType].filter(item => item !== value)
        : [...prev[filterType], value]
    }));
  };

  const clearFilters = () => {
    setSelectedFilters({
      name: [],
      color: [],
      planet: [],
      zodiac: []
    });
    setSearchTerm("");
  };

  const addToCart = (gemstoneId: number) => {
    setCart(prev => ({
      ...prev,
      [gemstoneId]: (prev[gemstoneId] || 0) + 1
    }));
  };

  const removeFromCart = (gemstoneId: number) => {
    setCart(prev => {
      const newCart = { ...prev };
      if (newCart[gemstoneId] > 1) {
        newCart[gemstoneId]--;
      } else {
        delete newCart[gemstoneId];
      }
      return newCart;
    });
  };

  const toggleWishlist = (gemstoneId: number) => {
    setWishlist(prev => 
      prev.includes(gemstoneId) 
        ? prev.filter(id => id !== gemstoneId)
        : [...prev, gemstoneId]
    );
  };

  const getTotalCartItems = () => {
    return Object.values(cart).reduce((total, quantity) => total + quantity, 0);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20">
          <div className="text-center">
            <h1 className="text-4xl font-bold text-gray-900 mb-4">Gemstones</h1>
            <p className="text-xl text-gray-600 mb-6">The whispers of the universe curated into a collection</p>
            
            {/* Decorative heading design */}
            <div className="flex items-center justify-center mb-8">
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-32"></div>
              <span className="mx-4 text-yellow-600 font-semibold">heading-design</span>
              <div className="h-px bg-gradient-to-r from-transparent via-yellow-500 to-transparent w-32"></div>
            </div>
            
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">Gemstones Collection</h2>
            <h3 className="text-lg text-gray-600">Shop gemstones that resonate with your energy</h3>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filters Sidebar */}
          <div className="lg:w-80 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-semibold text-gray-900">Filter by:</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-2 hover:bg-gray-100 rounded-lg"
                >
                  <Filter className="w-5 h-5" />
                </button>
              </div>

              <div className={`space-y-6 ${showFilters ? 'block' : 'hidden lg:block'}`}>
                {/* Search */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Search</label>
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <input
                      type="text"
                      placeholder="Search gemstones..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Name Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Name</label>
                  <div className="space-y-2 max-h-48 overflow-y-auto">
                    {filterOptions.name.map(name => (
                      <label key={name} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.name.includes(name)}
                          onChange={() => handleFilterChange('name', name)}
                          className="mr-2 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{name}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Color Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Color</label>
                  <div className="space-y-2">
                    {filterOptions.color.map(color => (
                      <label key={color} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.color.includes(color)}
                          onChange={() => handleFilterChange('color', color)}
                          className="mr-2 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{color}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Planet Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Planet</label>
                  <div className="space-y-2">
                    {filterOptions.planet.map(planet => (
                      <label key={planet} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.planet.includes(planet)}
                          onChange={() => handleFilterChange('planet', planet)}
                          className="mr-2 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{planet}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Zodiac Filter */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Zodiac</label>
                  <div className="space-y-2">
                    {filterOptions.zodiac.map(zodiac => (
                      <label key={zodiac} className="flex items-center">
                        <input
                          type="checkbox"
                          checked={selectedFilters.zodiac.includes(zodiac)}
                          onChange={() => handleFilterChange('zodiac', zodiac)}
                          className="mr-2 rounded border-gray-300 text-yellow-600 focus:ring-yellow-500"
                        />
                        <span className="text-sm text-gray-700">{zodiac}</span>
                      </label>
                    ))}
                  </div>
                </div>

                {/* Clear Filters */}
                <div className="pt-4 border-t">
                  <Button
                    onClick={clearFilters}
                    variant="outline"
                    className="w-full"
                  >
                    Clear Filters
                  </Button>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Results Header */}
            <div className="flex items-center justify-between mb-6">
              <div>
                <p className="text-gray-600">
                  Showing {filteredGemstones.length} of {gemstones.length} gemstones
                </p>
              </div>
              <div className="flex items-center gap-4">
                <button
                  className="relative p-2 text-gray-600 hover:text-yellow-600 transition-colors"
                >
                  <ShoppingCart className="w-6 h-6" />
                  {getTotalCartItems() > 0 && (
                    <span className="absolute -top-1 -right-1 bg-yellow-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                      {getTotalCartItems()}
                    </span>
                  )}
                </button>
              </div>
            </div>

            {/* Gemstones Grid */}
            {filteredGemstones.length > 0 ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredGemstones.map(gemstone => (
                  <div key={gemstone.id} className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
                    <div className="relative">
                      <img
                        src={gemstone.image}
                        alt={gemstone.name}
                        className="w-full h-48 object-cover"
                      />
                      <button
                        onClick={() => toggleWishlist(gemstone.id)}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
                          wishlist.includes(gemstone.id) ? 'text-red-500 bg-white shadow-md' : 'text-gray-400 bg-white shadow-md hover:text-red-500'
                        }`}
                      >
                        <Heart className={`w-5 h-5 ${wishlist.includes(gemstone.id) ? 'fill-current' : ''}`} />
                      </button>
                      {gemstone.discount > 0 && (
                        <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                          {gemstone.discount}% OFF
                        </div>
                      )}
                    </div>
                    
                    <div className="p-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="success">{gemstone.category.replace('-', ' ').toUpperCase()}</Badge>
                        <Badge variant="info">{gemstone.planet}</Badge>
                      </div>
                      
                      <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2">{gemstone.name}</h3>
                      <p className="text-gray-600 text-sm mb-3 line-clamp-2">{gemstone.description}</p>
                      
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star
                              key={i}
                              className={`w-4 h-4 ${
                                i < Math.floor(gemstone.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                              }`}
                            />
                          ))}
                        </div>
                        <span className="text-sm text-gray-600">({gemstone.reviews})</span>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-4">
                        <span className="text-xl font-bold text-gray-900">₹{gemstone.price.toLocaleString()}</span>
                        {gemstone.originalPrice && (
                          <span className="text-sm text-gray-500 line-through">₹{gemstone.originalPrice.toLocaleString()}</span>
                        )}
                      </div>
                      
                      {cart[gemstone.id] ? (
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => removeFromCart(gemstone.id)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              <Minus className="w-4 h-4" />
                            </button>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                              {cart[gemstone.id]}
                            </span>
                            <button
                              onClick={() => addToCart(gemstone.id)}
                              className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                            >
                              <Plus className="w-4 h-4" />
                            </button>
                          </div>
                          <Link
                            to={`/product/${gemstone.id}`}
                            className="text-yellow-600 hover:text-yellow-700 text-sm font-medium"
                          >
                            View Details
                          </Link>
                        </div>
                      ) : (
                        <div className="flex gap-2">
                          <Button
                            onClick={() => addToCart(gemstone.id)}
                            className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                          >
                            Add to Cart
                          </Button>
                          <Link to={`/product/${gemstone.id}`}>
                            <Button variant="outline" className="px-4">
                              View
                            </Button>
                          </Link>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">Oops! No matching gemstones found.</h3>
                <p className="text-gray-600 mb-4">Try adjusting your filters or browse our full collection.</p>
                <Button onClick={clearFilters} className="bg-yellow-500 hover:bg-yellow-600 text-white">
                  Clear All Filters
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Educational Section */}
      <div className="bg-white py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Gemstones & You</h2>
            <div className="max-w-4xl mx-auto">
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                Through Vedic astrological wisdom, we understand that the universe's vibrations link our everyday lives to the planets.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed mb-6">
                These planets include the seven visible ones—Sun, Moon, Mars, Mercury, Jupiter, Venus, and Saturn—and two invisible forces, Rahu and Ketu.
              </p>
              <p className="text-lg text-gray-700 leading-relaxed">
                Gemstones, formed over millennia, share vibrational energies with these planets. Acting as conduits for cosmic forces, gemstones hold the power to balance planetary influences in your life.
              </p>
            </div>
          </div>

          <div className="text-center">
            <h3 className="text-2xl font-semibold text-gray-900 mb-4">A promise of purity & authenticity</h3>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-8">
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Star className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Certified Quality</h4>
                <p className="text-gray-600">All gemstones come with authentic certification from recognized laboratories.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Expert Guidance</h4>
                <p className="text-gray-600">Get personalized recommendations from our certified astrologers.</p>
              </div>
              <div className="text-center">
                <div className="w-16 h-16 bg-yellow-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <ShoppingCart className="w-8 h-8 text-yellow-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Secure Delivery</h4>
                <p className="text-gray-600">Safe and insured delivery with 30-day return policy.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
