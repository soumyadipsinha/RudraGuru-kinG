export interface ProductItem {
  id: number;
  name: string;
  category: "gemstones" | "rudraksha" | "bracelets" | "mala";
  subcategory: string;
  price: number;
  originalPrice?: number;
  discount: number;
  image: string;
  rating: number;
  reviews: number;
  inStock: boolean;
  description: string;
  benefits?: string[];
  // optional extras used by some categories
  weight?: string;
  origin?: string;
  certification?: string;
  mukhi?: string;
  size?: string;
  beads?: string;
  material?: string;
}

// Central catalog used by Store and ProductDetail
export const products: ProductItem[] = [
  // NOTE: The contents of this array were previously defined in Store.tsx
  // Gemstones
  {
    id: 1,
    name: "Yellow Sapphire (Pukhraj) - 2.5 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
    price: 25000,
    originalPrice: 31250,
    discount: 20,
    image: "/src/assets/sapphire-yellow.png",
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
    name: "Ruby (Manik) - 3.2 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
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
    name: "Emerald (Panna) - 2.1 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
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
    name: "Red Coral (Moonga) - 4.5 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
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
    name: "Hessonite (Gomed) - 3.8 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
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
    name: "Cat's Eye (Lehsuniya) - 2.7 Carats",
    category: "gemstones",
    subcategory: "rashi-ratna",
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
    name: "Opal Stone - 3.1 Carats",
    category: "gemstones",
    subcategory: "other-gems",
    price: 8000,
    originalPrice: 10000,
    discount: 20,
    image: "/src/assets/opal.png",
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
    image: "/src/assets/rudraksha.png",
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
    image: "/src/assets/rudraksha.png",
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
    image: "/src/assets/rudraksha.png",
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
    image: "/src/assets/rudraksha.png",
    rating: 4.8,
    reviews: 98,
    inStock: true,
    description: "Natural 9 Mukhi Rudraksha for Ketu planet. Provides spiritual protection and enlightenment.",
    benefits: ["Spiritual Protection", "Enlightenment", "Removes Fear", "Intuition"],
    mukhi: "9 Mukhi",
    origin: "Nepal",
    size: "12-14mm"
  },
  // Additional items (mala, bracelets, gemstones webp)
  // The rest were copied from Store.tsx additions
  { id: 13, name: "7 Chakra Agate Bracelet", category: "bracelets", subcategory: "chakra", price: 799, originalPrice: 999, discount: 20, image: "/src/assets/serviceLogo.png", rating: 4.6, reviews: 145, inStock: true, description: "Beautiful 7 Chakra Agate Bracelet for energy balance and spiritual healing.", benefits: ["Energy Balance", "Spiritual Healing", "Chakra Alignment", "Emotional Stability"], material: "Agate", size: "Adjustable" },
  { id: 14, name: "Rudraksha Mala (108 Beads)", category: "mala", subcategory: "rudraksha", price: 3500, originalPrice: 4375, discount: 20, image: "/src/assets/rudraksha.png", rating: 4.8, reviews: 167, inStock: true, description: "Traditional 108 bead Rudraksha Mala for meditation and spiritual practices.", benefits: ["Meditation Aid", "Spiritual Growth", "Stress Relief", "Inner Peace"], beads: "108 Beads", material: "Rudraksha" },
  { id: 15, name: "5 Mukhi Rudraksha (Premium)", category: "rudraksha", subcategory: "nepali", price: 2999, originalPrice: 3499, discount: 15, image: "/src/assets/5mukhi.webp", rating: 4.7, reviews: 210, inStock: true, description: "Premium 5 Mukhi Rudraksha blessed for wisdom and prosperity.", benefits: ["Wisdom", "Prosperity", "Spiritual Growth"], mukhi: "5 Mukhi", origin: "Nepal", size: "12-14mm" },
  { id: 16, name: "5 Mukhi Silver Capped Rudraksha Mala", category: "mala", subcategory: "rudraksha", price: 5499, originalPrice: 6999, discount: 21, image: "/src/assets/5mukhisilverrudrakhshamala.webp", rating: 4.8, reviews: 134, inStock: true, description: "Silver-capped 5 Mukhi Rudraksha mala for meditation and protection.", benefits: ["Meditation", "Protection", "Calm Mind"], beads: "108 Beads", material: "Rudraksha" },
  { id: 17, name: "Crystal + Rudraksha Mala", category: "mala", subcategory: "rudraksha", price: 4499, originalPrice: 5499, discount: 18, image: "/src/assets/rudrakhsacrystal.webp", rating: 4.7, reviews: 98, inStock: true, description: "Combination mala for clarity and spiritual upliftment.", benefits: ["Clarity", "Healing", "Spiritual Upliftment"], beads: "108 Beads", material: "Crystal + Rudraksha" },
  { id: 18, name: "7 Chakra Healing Bracelet", category: "bracelets", subcategory: "chakra", price: 799, originalPrice: 999, discount: 20, image: "/src/assets/7chakra.webp", rating: 4.6, reviews: 175, inStock: true, description: "Align your chakras with natural stones.", benefits: ["Energy Balance", "Harmony", "Focus"], material: "Mixed Stones", size: "Adjustable" },
  { id: 19, name: "7 Chakra Lava Bracelet", category: "bracelets", subcategory: "chakra", price: 749, originalPrice: 949, discount: 21, image: "/src/assets/7chakralava.webp", rating: 4.5, reviews: 120, inStock: true, description: "Chakra stones with lava beads for essential oils.", benefits: ["Grounding", "Balance", "Aromatherapy"], material: "Lava + Stones", size: "Adjustable" },
  { id: 20, name: "7 Chakra Agate Bracelet", category: "bracelets", subcategory: "chakra", price: 699, originalPrice: 899, discount: 22, image: "/src/assets/7charaagate.webp", rating: 4.4, reviews: 98, inStock: true, description: "Agate based 7 chakra bracelet for stability.", benefits: ["Stability", "Balance", "Calm"], material: "Agate", size: "Adjustable" },
  { id: 21, name: "Black Obsidian Bracelet", category: "bracelets", subcategory: "crystal", price: 899, originalPrice: 1099, discount: 18, image: "/src/assets/blackobsidian.webp", rating: 4.6, reviews: 112, inStock: true, description: "Protection and grounding crystal bracelet.", benefits: ["Protection", "Grounding", "Shielding"], material: "Obsidian", size: "Adjustable" },
  { id: 22, name: "African Turquoise Bracelet", category: "bracelets", subcategory: "crystal", price: 999, originalPrice: 1199, discount: 17, image: "/src/assets/africanturquoise.webp", rating: 4.5, reviews: 84, inStock: true, description: "Growth and positive change.", benefits: ["Growth", "Positivity", "Calm"], material: "African Turquoise", size: "Adjustable" },
  { id: 23, name: "Opalite Bracelet", category: "bracelets", subcategory: "crystal", price: 799, originalPrice: 999, discount: 20, image: "/src/assets/opalite.webp", rating: 4.4, reviews: 77, inStock: true, description: "Soothing and emotional balance.", benefits: ["Soothing", "Balance", "Clarity"], material: "Opalite", size: "Adjustable" },
  { id: 24, name: "Natural Carnelian Bracelet", category: "bracelets", subcategory: "crystal", price: 859, originalPrice: 1049, discount: 18, image: "/src/assets/naturalcarnelian.webp", rating: 4.5, reviews: 69, inStock: true, description: "Confidence and motivation boost.", benefits: ["Confidence", "Motivation", "Creativity"], material: "Carnelian", size: "Adjustable" },
  { id: 25, name: "Aquamarine 10.7 Carat", category: "gemstones", subcategory: "other-gems", price: 52000, originalPrice: 59000, discount: 12, image: "/src/assets/aquamarine10.7.webp", rating: 4.7, reviews: 45, inStock: true, description: "High clarity aquamarine gemstone.", benefits: ["Calm", "Communication", "Clarity"], weight: "10.7 Carat", origin: "Brazil" },
  { id: 26, name: "Aquamarine 5.64 Carat", category: "gemstones", subcategory: "other-gems", price: 28500, originalPrice: 33500, discount: 15, image: "/src/assets/aquamarine5.64carat.webp", rating: 4.6, reviews: 33, inStock: true, description: "Beautiful aquamarine for serenity.", benefits: ["Serenity", "Balance"], weight: "5.64 Carat", origin: "Brazil" },
  { id: 27, name: "Bicolor Sapphire", category: "gemstones", subcategory: "other-gems", price: 74000, originalPrice: 82000, discount: 10, image: "/src/assets/bicolorsapphire.webp", rating: 4.8, reviews: 22, inStock: true, description: "Rare bicolor sapphire.", benefits: ["Wealth", "Focus"], weight: "Varies", origin: "Sri Lanka" },
  { id: 28, name: "Bicolor Tourmaline", category: "gemstones", subcategory: "other-gems", price: 38500, originalPrice: 46500, discount: 17, image: "/src/assets/bicolortoumiline.webp", rating: 4.6, reviews: 31, inStock: true, description: "Attractive bicolor tourmaline.", benefits: ["Balance", "Protection"], weight: "Varies", origin: "Africa" },
  { id: 29, name: "Emerald Premium", category: "gemstones", subcategory: "vedic-gems", price: 68000, originalPrice: 76000, discount: 11, image: "/src/assets/emerald.webp", rating: 4.7, reviews: 40, inStock: true, description: "Premium quality emerald.", benefits: ["Intelligence", "Business Success"], weight: "Varies", origin: "Colombia" },
  { id: 30, name: "Emerald 8.32 Carat", category: "gemstones", subcategory: "vedic-gems", price: 92000, originalPrice: 104000, discount: 12, image: "/src/assets/emerald8.32carat.webp", rating: 4.8, reviews: 27, inStock: true, description: "High carat emerald stone.", benefits: ["Communication", "Memory"], weight: "8.32 Carat", origin: "Zambia" },
  { id: 31, name: "Green Tourmaline", category: "gemstones", subcategory: "other-gems", price: 28500, originalPrice: 33500, discount: 15, image: "/src/assets/greentourmaline.webp", rating: 4.5, reviews: 29, inStock: true, description: "Healing green tourmaline.", benefits: ["Healing", "Heart Chakra"], weight: "Varies", origin: "Africa" },
  { id: 32, name: "Greenish Blue Tourmaline", category: "gemstones", subcategory: "other-gems", price: 31200, originalPrice: 36800, discount: 15, image: "/src/assets/greenishBluetourmaline.webp", rating: 4.5, reviews: 24, inStock: true, description: "Unique greenish blue tone tourmaline.", benefits: ["Balance", "Calm"], weight: "Varies", origin: "Africa" },
  { id: 33, name: "Chrome Tourmaline 4.03 Carat", category: "gemstones", subcategory: "other-gems", price: 41500, originalPrice: 48500, discount: 14, image: "/src/assets/chrometourmaline4.03carat.webp", rating: 4.6, reviews: 21, inStock: true, description: "Vivid chrome tourmaline.", benefits: ["Confidence", "Vitality"], weight: "4.03 Carat", origin: "Tanzania" },
  { id: 34, name: "Brown Tourmaline 7.18 Carat", category: "gemstones", subcategory: "other-gems", price: 26800, originalPrice: 31800, discount: 16, image: "/src/assets/browntourmiline7.18carate.webp", rating: 4.4, reviews: 18, inStock: true, description: "Earthy brown tourmaline.", benefits: ["Grounding", "Stability"], weight: "7.18 Carat", origin: "Africa" },
  { id: 35, name: "Burmese Ruby", category: "gemstones", subcategory: "vedic-gems", price: 125000, originalPrice: 142000, discount: 12, image: "/src/assets/burmeseruby.webp", rating: 4.9, reviews: 19, inStock: true, description: "Premium Burmese ruby.", benefits: ["Authority", "Vitality"], weight: "Varies", origin: "Myanmar" },
  { id: 36, name: "Star Ruby 7.56 Carat", category: "gemstones", subcategory: "vedic-gems", price: 84000, originalPrice: 94000, discount: 11, image: "/src/assets/startruby7.56carat.webp", rating: 4.7, reviews: 14, inStock: true, description: "Beautiful star ruby.", benefits: ["Protection", "Courage"], weight: "7.56 Carat", origin: "Sri Lanka" },
  { id: 37, name: "Star Ruby 9.48 Carat", category: "gemstones", subcategory: "vedic-gems", price: 112000, originalPrice: 126000, discount: 11, image: "/src/assets/starruby9.48carat.webp", rating: 4.8, reviews: 11, inStock: true, description: "High carat star ruby.", benefits: ["Protection", "Strength"], weight: "9.48 Carat", origin: "Sri Lanka" },
  { id: 38, name: "Rubellite 3.47 Carat", category: "gemstones", subcategory: "other-gems", price: 38800, originalPrice: 44800, discount: 13, image: "/src/assets/rubelite3.47carat.webp", rating: 4.6, reviews: 17, inStock: true, description: "Bright rubellite gemstone.", benefits: ["Love", "Vitality"], weight: "3.47 Carat", origin: "Madagascar" },
  { id: 39, name: "Rubellite", category: "gemstones", subcategory: "other-gems", price: 32000, originalPrice: 38000, discount: 16, image: "/src/assets/rubelite.webp", rating: 4.5, reviews: 20, inStock: true, description: "Attractive rubellite stone.", benefits: ["Love", "Courage"], weight: "Varies", origin: "Africa" },
  { id: 40, name: "Shree Pyrite Yantra", category: "gemstones", subcategory: "other-gems", price: 2100, originalPrice: 2600, discount: 19, image: "/src/assets/shreepyriteyantra.webp", rating: 4.4, reviews: 28, inStock: true, description: "Pyrite yantra for prosperity.", benefits: ["Prosperity", "Protection"], weight: "—", origin: "India" },
];


