import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { 
  Search, 
  Filter, 
  ShoppingCart, 
  Heart, 
  Star, 
  Plus, 
  Minus,
  X,
  ChevronDown,
  Grid3X3,
  List,
  SlidersHorizontal
} from "lucide-react";
import { Button } from "../components/ui/button";

// Product data based on GemsMantra website
const products = [
  // Gemstones
  {
    id: 1,
    name: "Yellow Sapphire (Pukhraj) - 2.5 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 25000,
    originalPrice: 31250,
    discount: 20,
    image: "/assets/sapphire-yellow.png",
    rating: 4.8,
    reviews: 124,
    inStock: true,
    description: "Natural Yellow Sapphire for Jupiter planet. Enhances wisdom, prosperity and spiritual growth.",
    benefits: ["Wealth & Prosperity", "Wisdom & Knowledge", "Spiritual Growth", "Career Success"],
    weight: "2.5 Carats",
    origin: "Sri Lanka",
    certification: "IGI Certified"
  },
  {
    id: 2,
    name: "Blue Sapphire (Neelam) - 1.8 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 18000,
    originalPrice: 22500,
    discount: 20,
    image: "/assets/sapphire-blue.png",
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
    name: "Ruby (Manik) - 3.2 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 45000,
    originalPrice: 56250,
    discount: 20,
    image: "/assets/ruby.png",
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
    name: "Emerald (Panna) - 2.1 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 32000,
    originalPrice: 40000,
    discount: 20,
    image: "/assets/panna.png",
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
    name: "Red Coral (Moonga) - 4.5 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 15000,
    originalPrice: 18750,
    discount: 20,
    image: "/assets/redCoral.png",
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
    name: "Hessonite (Gomed) - 3.8 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 12000,
    originalPrice: 15000,
    discount: 20,
    image: "/assets/hessonite.png",
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
    name: "Cat's Eye (Lehsuniya) - 2.7 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 22000,
    originalPrice: 27500,
    discount: 20,
    image: "/assets/catEye.png",
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
    name: "Opal Stone - 3.1 Carats",
    category: "gemstones",
    subcategory: "other-gems",
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    image: "/assets/opal.png",
    rating: 4.3,
    reviews: 54,
    inStock: true,
    description: "Natural Opal stone for creativity and emotional balance.",
    benefits: ["Creativity", "Emotional Balance", "Love & Relationships", "Artistic Abilities"],
    weight: "3.1 Carats",
    origin: "Australia",
    certification: "IGI Certified"
  },
  // Rudraksha
  {
    id: 9,
    name: "5 Mukhi Rudraksha (Nepali)",
    category: "rudraksha",
    subcategory: "nepali",
    price: 2500,
    originalPrice: 3125,
    discount: 20,
    image: "/assets/rudraksha.png",
    rating: 4.8,
    reviews: 234,
    inStock: true,
    description: "Natural 5 Mukhi Rudraksha for Jupiter planet. Brings wisdom, knowledge and prosperity.",
    benefits: ["Wisdom & Knowledge", "Prosperity", "Spiritual Growth", "Academic Success"],
    mukhi: "5 Mukhi",
    origin: "Nepal",
    size: "12-14mm"
  },
  {
    id: 10,
    name: "6 Mukhi Rudraksha (Nepali)",
    category: "rudraksha",
    subcategory: "nepali",
    price: 3200,
    originalPrice: 4000,
    discount: 20,
    image: "/assets/rudraksha.png",
    rating: 4.7,
    reviews: 189,
    inStock: true,
    description: "Natural 6 Mukhi Rudraksha for Venus planet. Enhances love, beauty and relationships.",
    benefits: ["Love & Relationships", "Beauty & Charm", "Artistic Abilities", "Material Comforts"],
    mukhi: "6 Mukhi",
    origin: "Nepal",
    size: "12-14mm"
  },
  {
    id: 11,
    name: "7 Mukhi Rudraksha (Nepali)",
    category: "rudraksha",
    subcategory: "nepali",
    price: 4500,
    originalPrice: 5625,
    discount: 20,
    image: "/assets/rudraksha.png",
    rating: 4.9,
    reviews: 156,
    inStock: true,
    description: "Natural 7 Mukhi Rudraksha for Saturn planet. Brings discipline, focus and removes obstacles.",
    benefits: ["Discipline & Focus", "Removes Obstacles", "Career Stability", "Longevity"],
    mukhi: "7 Mukhi",
    origin: "Nepal",
    size: "12-14mm"
  },
  {
    id: 12,
    name: "9 Mukhi Rudraksha (Nepali)",
    category: "rudraksha",
    subcategory: "nepali",
    price: 8500,
    originalPrice: 10625,
    discount: 20,
    image: "/assets/rudraksha.png",
    rating: 4.8,
    reviews: 98,
    inStock: true,
    description: "Natural 9 Mukhi Rudraksha for Ketu planet. Provides spiritual protection and enlightenment.",
    benefits: ["Spiritual Protection", "Enlightenment", "Removes Fear", "Intuition"],
    mukhi: "9 Mukhi",
    origin: "Nepal",
    size: "12-14mm"
  },
  // Bracelets
  {
    id: 13,
    name: "7 Chakra Agate Bracelet",
    category: "bracelets",
    subcategory: "chakra",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: "/assets/serviceLogo.png",
    rating: 4.6,
    reviews: 145,
    inStock: true,
    description: "Beautiful 7 Chakra Agate Bracelet for energy balance and spiritual healing.",
    benefits: ["Energy Balance", "Spiritual Healing", "Chakra Alignment", "Emotional Stability"],
    material: "Agate",
    size: "Adjustable"
  },
  {
    id: 14,
    name: "Rudraksha Mala (108 Beads)",
    category: "mala",
    subcategory: "rudraksha",
    price: 3500,
    originalPrice: 4375,
    discount: 20,
    image: "/assets/rudraksha.png",
    rating: 4.8,
    reviews: 167,
    inStock: true,
    description: "Traditional 108 bead Rudraksha Mala for meditation and spiritual practices.",
    benefits: ["Meditation Aid", "Spiritual Growth", "Stress Relief", "Inner Peace"],
    beads: "108 Beads",
    material: "Rudraksha"
  }
  ,
  // Additional Rudraksha & Mala
  {
    id: 15,
    name: "5 Mukhi Rudraksha (Premium)",
    category: "rudraksha",
    subcategory: "nepali",
    price: 2999,
    originalPrice: 3499,
    discount: 15,
    image: "/assets/5mukhi.webp",
    rating: 4.7,
    reviews: 210,
    inStock: true,
    description: "Premium 5 Mukhi Rudraksha blessed for wisdom and prosperity.",
    benefits: ["Wisdom", "Prosperity", "Spiritual Growth"],
    mukhi: "5 Mukhi",
    origin: "Nepal",
    size: "12-14mm"
  },
  {
    id: 16,
    name: "5 Mukhi Silver Capped Rudraksha Mala",
    category: "mala",
    subcategory: "rudraksha",
    price: 5499,
    originalPrice: 6999,
    discount: 21,
    image: "/assets/5mukhisilverrudrakhshamala.webp",
    rating: 4.8,
    reviews: 134,
    inStock: true,
    description: "Silver-capped 5 Mukhi Rudraksha mala for meditation and protection.",
    benefits: ["Meditation", "Protection", "Calm Mind"],
    beads: "108 Beads",
    material: "Rudraksha"
  },
  {
    id: 17,
    name: "Crystal + Rudraksha Mala",
    category: "mala",
    subcategory: "rudraksha",
    price: 4499,
    originalPrice: 5499,
    discount: 18,
    image: "/assets/rudrakhsacrystal.webp",
    rating: 4.7,
    reviews: 98,
    inStock: true,
    description: "Combination mala for clarity and spiritual upliftment.",
    benefits: ["Clarity", "Healing", "Spiritual Upliftment"],
    beads: "108 Beads",
    material: "Crystal + Rudraksha"
  },
  // Bracelets
  {
    id: 18,
    name: "7 Chakra Healing Bracelet",
    category: "bracelets",
    subcategory: "chakra",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: "/assets/7chakra.webp",
    rating: 4.6,
    reviews: 175,
    inStock: true,
    description: "Align your chakras with natural stones.",
    benefits: ["Energy Balance", "Harmony", "Focus"],
    material: "Mixed Stones",
    size: "Adjustable"
  },
  {
    id: 19,
    name: "7 Chakra Lava Bracelet",
    category: "bracelets",
    subcategory: "chakra",
    price: 749,
    originalPrice: 949,
    discount: 21,
    image: "/assets/7chakralava.webp",
    rating: 4.5,
    reviews: 120,
    inStock: true,
    description: "Chakra stones with lava beads for essential oils.",
    benefits: ["Grounding", "Balance", "Aromatherapy"],
    material: "Lava + Stones",
    size: "Adjustable"
  },
  {
    id: 20,
    name: "7 Chakra Agate Bracelet",
    category: "bracelets",
    subcategory: "chakra",
    price: 699,
    originalPrice: 899,
    discount: 22,
    image: "/assets/7charaagate.webp",
    rating: 4.4,
    reviews: 98,
    inStock: true,
    description: "Agate based 7 chakra bracelet for stability.",
    benefits: ["Stability", "Balance", "Calm"],
    material: "Agate",
    size: "Adjustable"
  },
  {
    id: 21,
    name: "Black Obsidian Bracelet",
    category: "bracelets",
    subcategory: "crystal",
    price: 899,
    originalPrice: 1099,
    discount: 18,
    image: "/assets/blackobsidian.webp",
    rating: 4.6,
    reviews: 112,
    inStock: true,
    description: "Protection and grounding crystal bracelet.",
    benefits: ["Protection", "Grounding", "Shielding"],
    material: "Obsidian",
    size: "Adjustable"
  },
  {
    id: 22,
    name: "African Turquoise Bracelet",
    category: "bracelets",
    subcategory: "crystal",
    price: 999,
    originalPrice: 1199,
    discount: 17,
    image: "/assets/africanturquoise.webp",
    rating: 4.5,
    reviews: 84,
    inStock: true,
    description: "Growth and positive change.",
    benefits: ["Growth", "Positivity", "Calm"],
    material: "African Turquoise",
    size: "Adjustable"
  },
  {
    id: 23,
    name: "Opalite Bracelet",
    category: "bracelets",
    subcategory: "crystal",
    price: 799,
    originalPrice: 999,
    discount: 20,
    image: "/assets/opalite.webp",
    rating: 4.4,
    reviews: 77,
    inStock: true,
    description: "Soothing and emotional balance.",
    benefits: ["Soothing", "Balance", "Clarity"],
    material: "Opalite",
    size: "Adjustable"
  },
  {
    id: 24,
    name: "Natural Carnelian Bracelet",
    category: "bracelets",
    subcategory: "crystal",
    price: 859,
    originalPrice: 1049,
    discount: 18,
    image: "/assets/naturalcarnelian.webp",
    rating: 4.5,
    reviews: 69,
    inStock: true,
    description: "Confidence and motivation boost.",
    benefits: ["Confidence", "Motivation", "Creativity"],
    material: "Carnelian",
    size: "Adjustable"
  },
  // Gemstones - WebP
  {
    id: 25,
    name: "Aquamarine 10.7 Carat",
    category: "gemstones",
    subcategory: "other-gems",
    price: 52000,
    originalPrice: 59000,
    discount: 12,
    image: "/assets/aquamarine10.7.webp",
    rating: 4.7,
    reviews: 45,
    inStock: true,
    description: "High clarity aquamarine gemstone.",
    benefits: ["Calm", "Communication", "Clarity"],
    weight: "10.7 Carat",
    origin: "Brazil"
  },
  {
    id: 26,
    name: "Aquamarine 5.64 Carat",
    category: "gemstones",
    subcategory: "other-gems",
    price: 28500,
    originalPrice: 33500,
    discount: 15,
    image: "/assets/aquamarine5.64carat.webp",
    rating: 4.6,
    reviews: 33,
    inStock: true,
    description: "Beautiful aquamarine for serenity.",
    benefits: ["Serenity", "Balance"],
    weight: "5.64 Carat",
    origin: "Brazil"
  },
  {
    id: 27,
    name: "Bicolor Sapphire",
    category: "gemstones",
    subcategory: "other-gems",
    price: 74000,
    originalPrice: 82000,
    discount: 10,
    image: "/assets/bicolorsapphire.webp",
    rating: 4.8,
    reviews: 22,
    inStock: true,
    description: "Rare bicolor sapphire.",
    benefits: ["Wealth", "Focus"],
    weight: "Varies",
    origin: "Sri Lanka"
  },
  {
    id: 28,
    name: "Bicolor Tourmaline",
    category: "gemstones",
    subcategory: "other-gems",
    price: 38500,
    originalPrice: 46500,
    discount: 17,
    image: "/assets/bicolortoumiline.webp",
    rating: 4.6,
    reviews: 31,
    inStock: true,
    description: "Attractive bicolor tourmaline.",
    benefits: ["Balance", "Protection"],
    weight: "Varies",
    origin: "Africa"
  },
  {
    id: 29,
    name: "Emerald Premium",
    category: "gemstones",
    subcategory: "vedic-gems",
    price: 68000,
    originalPrice: 76000,
    discount: 11,
    image: "/assets/emerald.webp",
    rating: 4.7,
    reviews: 40,
    inStock: true,
    description: "Premium quality emerald.",
    benefits: ["Intelligence", "Business Success"],
    weight: "Varies",
    origin: "Colombia"
  },
  {
    id: 30,
    name: "Emerald 8.32 Carat",
    category: "gemstones",
    subcategory: "vedic-gems",
    price: 92000,
    originalPrice: 104000,
    discount: 12,
    image: "/assets/emerald8.32carat.webp",
    rating: 4.8,
    reviews: 27,
    inStock: true,
    description: "High carat emerald stone.",
    benefits: ["Communication", "Memory"],
    weight: "8.32 Carat",
    origin: "Zambia"
  },
  {
    id: 31,
    name: "Green Tourmaline",
    category: "gemstones",
    subcategory: "other-gems",
    price: 28500,
    originalPrice: 33500,
    discount: 15,
    image: "/assets/greentourmaline.webp",
    rating: 4.5,
    reviews: 29,
    inStock: true,
    description: "Healing green tourmaline.",
    benefits: ["Healing", "Heart Chakra"],
    weight: "Varies",
    origin: "Africa"
  },
  {
    id: 32,
    name: "Greenish Blue Tourmaline",
    category: "gemstones",
    subcategory: "other-gems",
    price: 31200,
    originalPrice: 36800,
    discount: 15,
    image: "/assets/greenishBluetourmaline.webp",
    rating: 4.5,
    reviews: 24,
    inStock: true,
    description: "Unique greenish blue tone tourmaline.",
    benefits: ["Balance", "Calm"],
    weight: "Varies",
    origin: "Africa"
  },
  {
    id: 33,
    name: "Chrome Tourmaline 4.03 Carat",
    category: "gemstones",
    subcategory: "other-gems",
    price: 41500,
    originalPrice: 48500,
    discount: 14,
    image: "/assets/chrometourmaline4.03carat.webp",
    rating: 4.6,
    reviews: 21,
    inStock: true,
    description: "Vivid chrome tourmaline.",
    benefits: ["Confidence", "Vitality"],
    weight: "4.03 Carat",
    origin: "Tanzania"
  },
  {
    id: 34,
    name: "Brown Tourmaline 7.18 Carat",
    category: "gemstones",
    subcategory: "other-gems",
    price: 26800,
    originalPrice: 31800,
    discount: 16,
    image: "/assets/browntourmiline7.18carate.webp",
    rating: 4.4,
    reviews: 18,
    inStock: true,
    description: "Earthy brown tourmaline.",
    benefits: ["Grounding", "Stability"],
    weight: "7.18 Carat",
    origin: "Africa"
  },
  {
    id: 35,
    name: "Burmese Ruby",
    category: "gemstones",
    subcategory: "vedic-gems",
    price: 125000,
    originalPrice: 142000,
    discount: 12,
    image: "/assets/burmeseruby.webp",
    rating: 4.9,
    reviews: 19,
    inStock: true,
    description: "Premium Burmese ruby.",
    benefits: ["Authority", "Vitality"],
    weight: "Varies",
    origin: "Myanmar"
  },
  {
    id: 36,
    name: "Star Ruby 7.56 Carat",
    category: "gemstones",
    subcategory: "vedic-gems",
    price: 84000,
    originalPrice: 94000,
    discount: 11,
    image: "/assets/startruby7.56carat.webp",
    rating: 4.7,
    reviews: 14,
    inStock: true,
    description: "Beautiful star ruby.",
    benefits: ["Protection", "Courage"],
    weight: "7.56 Carat",
    origin: "Sri Lanka"
  },
  {
    id: 37,
    name: "Star Ruby 9.48 Carat",
    category: "gemstones",
    subcategory: "vedic-gems",
    price: 112000,
    originalPrice: 126000,
    discount: 11,
    image: "/assets/starruby9.48carat.webp",
    rating: 4.8,
    reviews: 11,
    inStock: true,
    description: "High carat star ruby.",
    benefits: ["Protection", "Strength"],
    weight: "9.48 Carat",
    origin: "Sri Lanka"
  },
  {
    id: 38,
    name: "Rubellite 3.47 Carat",
    category: "gemstones",
    subcategory: "other-gems",
    price: 38800,
    originalPrice: 44800,
    discount: 13,
    image: "/assets/rubelite3.47carat.webp",
    rating: 4.6,
    reviews: 17,
    inStock: true,
    description: "Bright rubellite gemstone.",
    benefits: ["Love", "Vitality"],
    weight: "3.47 Carat",
    origin: "Madagascar"
  },
  {
    id: 39,
    name: "Rubellite",
    category: "gemstones",
    subcategory: "other-gems",
    price: 32000,
    originalPrice: 38000,
    discount: 16,
    image: "/assets/rubelite.webp",
    rating: 4.5,
    reviews: 20,
    inStock: true,
    description: "Attractive rubellite stone.",
    benefits: ["Love", "Courage"],
    weight: "Varies",
    origin: "Africa"
  },
  {
    id: 40,
    name: "Shree Pyrite Yantra",
    category: "gemstones",
    subcategory: "other-gems",
    price: 2100,
    originalPrice: 2600,
    discount: 19,
    image: "/assets/shreepyriteyantra.webp",
    rating: 4.4,
    reviews: 28,
    inStock: true,
    description: "Pyrite yantra for prosperity.",
    benefits: ["Prosperity", "Protection"],
    weight: "—",
    origin: "India"
  }
];

const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "gemstones", name: "Gemstones", count: products.filter(p => p.category === "gemstones").length },
  { id: "rudraksha", name: "Rudraksha", count: products.filter(p => p.category === "rudraksha").length },
  { id: "bracelets", name: "Bracelets", count: products.filter(p => p.category === "bracelets").length },
  { id: "mala", name: "Mala", count: products.filter(p => p.category === "mala").length }
];

const subcategories = {
  gemstones: [
    { id: "rashi-ratna", name: "Rashi Ratna" },
    { id: "vedic-gems", name: "Vedic Gems" },
    { id: "other-gems", name: "Other Gems" }
  ],
  rudraksha: [
    { id: "nepali", name: "Nepali Rudraksha" },
    { id: "indonesian", name: "Indonesian Rudraksha" }
  ],
  bracelets: [
    { id: "chakra", name: "Chakra Bracelets" },
    { id: "crystal", name: "Crystal Bracelets" }
  ],
  mala: [
    { id: "rudraksha", name: "Rudraksha Mala" },
    { id: "tulsi", name: "Tulsi Mala" }
  ]
};

interface CartItem {
  id: number;
  quantity: number;
}

export default function Store() {
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [sortBy, setSortBy] = useState("featured");
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");
  const [showFilters, setShowFilters] = useState(false);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [showCart, setShowCart] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);

  // Filter products based on search, category, and subcategory
  const filteredProducts = products.filter(product => {
    const matchesSearch = product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         product.description.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === "all" || product.category === selectedCategory;
    const matchesSubcategory = selectedSubcategory === "all" || product.subcategory === selectedSubcategory;
    
    return matchesSearch && matchesCategory && matchesSubcategory;
  });

  // Sort products
  const sortedProducts = [...filteredProducts].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price;
      case "price-high":
        return b.price - a.price;
      case "rating":
        return b.rating - a.rating;
      case "newest":
        return b.id - a.id;
      default:
        return 0;
    }
  });

  const addToCart = (productId: number) => {
    setCart(prev => {
      const existingItem = prev.find(item => item.id === productId);
      if (existingItem) {
        return prev.map(item =>
          item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { id: productId, quantity: 1 }];
    });
  };

  const removeFromCart = (productId: number) => {
    setCart(prev => prev.filter(item => item.id !== productId));
  };

  const updateQuantity = (productId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(productId);
      return;
    }
    setCart(prev => prev.map(item =>
      item.id === productId ? { ...item, quantity } : item
    ));
  };

  const toggleWishlist = (productId: number) => {
    setWishlist(prev => 
      prev.includes(productId) 
        ? prev.filter(id => id !== productId)
        : [...prev, productId]
    );
  };

  const getCartItem = (productId: number) => {
    return cart.find(item => item.id === productId);
  };

  const getTotalCartItems = () => {
    return cart.reduce((total, item) => total + item.quantity, 0);
  };

  const getTotalPrice = () => {
    return cart.reduce((total, item) => {
      const product = products.find(p => p.id === item.id);
      return total + (product ? product.price * item.quantity : 0);
    }, 0);
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">RudraGuru Store</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Authentic Astrological Products & Remedies</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowCart(true)}
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
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className="lg:w-64 flex-shrink-0">
            <div className="bg-white rounded-lg shadow-sm p-6 sticky top-24">
              <div className="flex items-center justify-between mb-4">
                <h3 className="font-semibold text-gray-900">Filters</h3>
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className="lg:hidden p-1"
                >
                  <SlidersHorizontal className="w-5 h-5" />
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
                      placeholder="Search products..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    />
                  </div>
                </div>

                {/* Categories */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Categories</label>
                  <div className="space-y-2">
                    {categories.map(category => (
                      <button
                        key={category.id}
                        onClick={() => {
                          setSelectedCategory(category.id);
                          setSelectedSubcategory("all");
                        }}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedCategory === category.id
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        {category.name} ({category.count})
                      </button>
                    ))}
                  </div>
                </div>

                {/* Subcategories */}
                {selectedCategory !== "all" && subcategories[selectedCategory as keyof typeof subcategories] && (
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Subcategories</label>
                    <div className="space-y-2">
                      <button
                        onClick={() => setSelectedSubcategory("all")}
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                          selectedSubcategory === "all"
                            ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All ({filteredProducts.length})
                      </button>
                      {subcategories[selectedCategory as keyof typeof subcategories].map(subcategory => (
                        <button
                          key={subcategory.id}
                          onClick={() => setSelectedSubcategory(subcategory.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                              : 'text-gray-700 hover:bg-gray-100'
                          }`}
                        >
                          {subcategory.name}
                        </button>
                      ))}
                    </div>
                  </div>
                )}

                {/* Sort */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  >
                    <option value="featured">Featured</option>
                    <option value="price-low">Price: Low to High</option>
                    <option value="price-high">Price: High to Low</option>
                    <option value="rating">Customer Rating</option>
                    <option value="newest">Newest First</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {/* Toolbar */}
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-4">
                <p className="text-gray-600">
                  Showing {sortedProducts.length} of {products.length} products
                </p>
              </div>
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setViewMode("grid")}
                  className={`p-2 rounded-lg ${viewMode === "grid" ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <Grid3X3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => setViewMode("list")}
                  className={`p-2 rounded-lg ${viewMode === "list" ? 'bg-yellow-100 text-yellow-600' : 'text-gray-400 hover:text-gray-600'}`}
                >
                  <List className="w-5 h-5" />
                </button>
              </div>
            </div>

            {/* Products Grid */}
            <div className={`grid gap-6 ${
              viewMode === "grid" 
                ? "grid-cols-1 sm:grid-cols-2 lg:grid-cols-3" 
                : "grid-cols-1"
            }`}>
              {sortedProducts.map(product => (
                <ProductCard
                  key={product.id}
                  product={product}
                  viewMode={viewMode}
                  onAddToCart={addToCart}
                  onToggleWishlist={toggleWishlist}
                  isInWishlist={wishlist.includes(product.id)}
                  cartItem={getCartItem(product.id)}
                  onUpdateQuantity={updateQuantity}
                  onRemoveFromCart={removeFromCart}
                  onPreview={(p)=>setPreviewProduct(p)}
                />
              ))}
            </div>

            {sortedProducts.length === 0 && (
              <div className="text-center py-12">
                <div className="text-gray-400 mb-4">
                  <Search className="w-16 h-16 mx-auto" />
                </div>
                <h3 className="text-lg font-medium text-gray-900 mb-2">No products found</h3>
                <p className="text-gray-600">Try adjusting your search or filter criteria</p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Shopping Cart Sidebar */}
      {showCart && (
        <CartSidebar
          cart={cart}
          products={products}
          onClose={() => setShowCart(false)}
          onUpdateQuantity={updateQuantity}
          onRemoveFromCart={removeFromCart}
          totalPrice={getTotalPrice()}
        />
      )}

      {previewProduct && (
        <PreviewModal
          product={previewProduct}
          onClose={() => setPreviewProduct(null)}
          onAddToCart={() => {
            addToCart(previewProduct.id);
            setPreviewProduct(null);
          }}
        />
      )}
    </div>
  );
}

// Product Preview Modal with rotating image animation
function PreviewModal({ product, onClose, onAddToCart }: { product: any; onClose: () => void; onAddToCart: () => void; }) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
            <img
              src={product.image}
              alt={product.name}
              className="w-full max-w-sm h-auto object-contain animate-[spin_12s_linear_infinite]"
              style={{ animationDirection: 'reverse' }}
            />
          </div>
          <div className="md:w-1/2 p-6">
            <h3 className="text-2xl font-bold text-gray-900 mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <div className="flex items-center gap-3 mb-4">
              <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
              {product.originalPrice && (
                <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
              )}
              {product.discount > 0 && (
                <span className="bg-red-100 text-red-700 text-xs px-2 py-1 rounded-full">{product.discount}% OFF</span>
              )}
            </div>
            {product.benefits && (
              <ul className="list-disc pl-5 text-sm text-gray-700 space-y-1 mb-4">
                {product.benefits.map((b: string, i: number) => (
                  <li key={i}>{b}</li>
                ))}
              </ul>
            )}
            <div className="flex items-center gap-3">
              <Button className="bg-yellow-500 hover:bg-yellow-600 text-white" onClick={onAddToCart}>Add to Cart</Button>
              <Link to={`/product/${product.id}`} className="inline-flex items-center px-4 py-2 border border-yellow-300 rounded-lg text-brown-900 hover:bg-yellow-50">View Details</Link>
              <button onClick={onClose} className="ml-auto text-gray-500 hover:text-gray-700">Close</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Product Card Component
function ProductCard({ 
  product, 
  viewMode, 
  onAddToCart, 
  onToggleWishlist, 
  isInWishlist, 
  cartItem, 
  onUpdateQuantity, 
  onRemoveFromCart,
  onPreview
}: {
  product: any;
  viewMode: "grid" | "list";
  onAddToCart: (id: number) => void;
  onToggleWishlist: (id: number) => void;
  isInWishlist: boolean;
  cartItem?: CartItem;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
  onPreview: (product: any) => void;
}) {
  if (viewMode === "list") {
    return (
      <div className="bg-white rounded-lg shadow-sm border p-6">
        <div className="flex gap-6">
          <div className="flex-shrink-0">
            <img
              src={product.image}
              alt={product.name}
              className="w-32 h-32 object-cover rounded-lg"
            />
          </div>
          <div className="flex-1">
            <div className="flex justify-between items-start">
              <div>
                <Link to={`/product/${product.id}`}>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2 hover:text-yellow-600 transition-colors">{product.name}</h3>
                </Link>
                <p className="text-gray-600 text-sm mb-3">{product.description}</p>
                <div className="flex items-center gap-2 mb-3">
                  <div className="flex items-center">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`w-4 h-4 ${
                          i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">({product.reviews})</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-2xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                  {product.originalPrice && (
                    <>
                      <span className="text-lg text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                      <span className="bg-red-100 text-red-800 text-xs px-2 py-1 rounded-full">
                        {product.discount}% OFF
                      </span>
                    </>
                  )}
                </div>
              </div>
              <div className="flex flex-col items-end gap-3">
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  className={`p-2 rounded-full transition-colors ${
                    isInWishlist ? 'text-red-500 bg-red-50' : 'text-gray-400 hover:text-red-500 hover:bg-red-50'
                  }`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </button>
                {cartItem ? (
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onUpdateQuantity(product.id, cartItem.quantity - 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                      {cartItem.quantity}
                    </span>
                    <button
                      onClick={() => onUpdateQuantity(product.id, cartItem.quantity + 1)}
                      className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Button
                      onClick={() => onPreview(product)}
                      className="bg-white text-brown-900 border border-yellow-300 hover:bg-yellow-50"
                    >
                      View
                    </Button>
                    <Button
                      onClick={() => onAddToCart(product.id)}
                      className="bg-yellow-500 hover:bg-yellow-600 text-white"
                    >
                      Add to Cart
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-sm border overflow-hidden hover:shadow-md transition-shadow">
      <div className="relative">
        <Link to={`/product/${product.id}`}>
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200"
          />
        </Link>
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors ${
            isInWishlist ? 'text-red-500 bg-white shadow-md' : 'text-gray-400 bg-white shadow-md hover:text-red-500'
          }`}
        >
          <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
        </button>
        {product.discount > 0 && (
          <div className="absolute top-3 left-3 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
            {product.discount}% OFF
          </div>
        )}
      </div>
      
      <div className="p-4">
        <Link to={`/product/${product.id}`}>
          <h3 className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-yellow-600 transition-colors">{product.name}</h3>
        </Link>
        <p className="text-gray-600 text-sm mb-3 line-clamp-2">{product.description}</p>
        
        <div className="flex items-center gap-2 mb-3">
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className={`w-4 h-4 ${
                  i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                }`}
              />
            ))}
          </div>
          <span className="text-sm text-gray-600">({product.reviews})</span>
        </div>
        
        <div className="flex items-center gap-2 mb-4">
          <span className="text-xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
          {product.originalPrice && (
            <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
          )}
        </div>
        
        {cartItem ? (
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <button
                onClick={() => onUpdateQuantity(product.id, cartItem.quantity - 1)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">
                {cartItem.quantity}
              </span>
              <button
                onClick={() => onUpdateQuantity(product.id, cartItem.quantity + 1)}
                className="p-1 rounded-full bg-gray-100 hover:bg-gray-200"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>
            <button
              onClick={() => onRemoveFromCart(product.id)}
              className="text-red-500 hover:text-red-700 text-sm"
            >
              Remove
            </button>
          </div>
        ) : (
          <div className="flex items-center gap-2">
            <Button
              onClick={() => onPreview(product)}
              className="flex-1 bg-white text-brown-900 border border-yellow-300 hover:bg-yellow-50"
            >
              View
            </Button>
            <Button
              onClick={() => onAddToCart(product.id)}
              className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
            >
              Add to Cart
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

// Cart Sidebar Component
function CartSidebar({ 
  cart, 
  products, 
  onClose, 
  onUpdateQuantity, 
  onRemoveFromCart, 
  totalPrice 
}: {
  cart: CartItem[];
  products: any[];
  onClose: () => void;
  onUpdateQuantity: (id: number, quantity: number) => void;
  onRemoveFromCart: (id: number) => void;
  totalPrice: number;
}) {
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black bg-opacity-50" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-xl">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 border-b">
            <h2 className="text-lg font-semibold">Shopping Cart</h2>
            <button onClick={onClose} className="p-2 hover:bg-gray-100 rounded-full">
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex-1 overflow-y-auto p-4">
            {cart.length === 0 ? (
              <div className="text-center py-8">
                <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-600">Your cart is empty</p>
              </div>
            ) : (
              <div className="space-y-4">
                {cart.map(item => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;
                  
                  return (
                    <div key={item.id} className="flex gap-3 p-3 border rounded-lg">
                      <img
                        src={product.image}
                        alt={product.name}
                        className="w-16 h-16 object-cover rounded"
                      />
                      <div className="flex-1">
                        <h4 className="font-medium text-sm line-clamp-2">{product.name}</h4>
                        <p className="text-gray-600 text-sm">₹{product.price.toLocaleString()}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                            className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                          >
                            <Minus className="w-3 h-3" />
                          </button>
                          <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                            className="p-1 rounded bg-gray-100 hover:bg-gray-200"
                          >
                            <Plus className="w-3 h-3" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => onRemoveFromCart(item.id)}
                        className="p-1 text-red-500 hover:text-red-700"
                      >
                        <X className="w-4 h-4" />
                      </button>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="border-t p-4">
              <div className="flex justify-between items-center mb-4">
                <span className="text-lg font-semibold">Total:</span>
                <span className="text-lg font-bold">₹{totalPrice.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                  Proceed to Checkout
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
