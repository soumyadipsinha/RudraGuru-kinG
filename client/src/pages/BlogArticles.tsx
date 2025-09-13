import { useState, useMemo } from "react";
import { Link } from "react-router-dom";

// Import gemstone assets
import Ruby from "../assets/ruby.png";
import Rudraksha from "../assets/rudraksha.png";
import SapphireBlue from "../assets/sapphire-blue.png";
import Emerald from "../assets/panna.png";
import SapphireYellow from "../assets/sapphire-yellow.png";
import GemstoneGeneral from "../assets/gemstone.png";

// Gradient heading
const gradHead =
  "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

const Section = ({ children, className = "" }: SectionProps) => (
  <section className={`mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</section>
);

// Blog article interface
interface BlogArticle {
  id: number;
  title: string;
  excerpt: string;
  content: string;
  author: string;
  authorImage: string;
  publishDate: string;
  readTime: string;
  category: string;
  tags: string[];
  featuredImage: string;
  featured: boolean;
  views: number;
  likes: number;
}

// Sample blog articles data
const BLOG_ARTICLES: BlogArticle[] = [
  {
    id: 1,
    title: "The Complete Guide to Ruby (Manikya) - The King of Gemstones",
    excerpt: "Discover the powerful properties of Ruby, its astrological significance, and how to choose the perfect stone for maximum benefits.",
    content: "Ruby, known as Manikya in Sanskrit, is one of the most powerful gemstones in Vedic astrology...",
    author: "Dr. Kavita Joshi",
    authorImage: "https://avatar-placeholder.iran.liara.run/public/4",
    publishDate: "2024-01-15",
    readTime: "8 min read",
    category: "Gemstones",
    tags: ["Ruby", "Manikya", "Sun", "Astrology", "Gemstone Guide"],
    featuredImage: Ruby,
    featured: true,
    views: 1250,
    likes: 89
  },
  {
    id: 2,
    title: "Understanding Rudraksha Beads: Types, Benefits, and Wearing Methods",
    excerpt: "Learn about different types of Rudraksha beads, their spiritual significance, and proper methods of wearing them for maximum benefits.",
    content: "Rudraksha beads are considered sacred in Hinduism and are believed to have powerful spiritual properties...",
    author: "Pandit Rajesh Sharma",
    authorImage: "https://avatar-placeholder.iran.liara.run/public/1",
    publishDate: "2024-01-12",
    readTime: "12 min read",
    category: "Rudraksha",
    tags: ["Rudraksha", "Spirituality", "Meditation", "Benefits", "Wearing Methods"],
    featuredImage: Rudraksha,
    featured: true,
    views: 980,
    likes: 67
  },
  {
    id: 3,
    title: "Blue Sapphire (Neelam) - The Saturn Stone: Complete Analysis",
    excerpt: "Explore the mystical properties of Blue Sapphire, its connection to Saturn, and how it can transform your life when worn correctly.",
    content: "Blue Sapphire, or Neelam, is associated with the planet Saturn and is known for its transformative powers...",
    author: "Acharya Vivek Sharma",
    authorImage: "https://avatar-placeholder.iran.liara.run/public/5",
    publishDate: "2024-01-10",
    readTime: "10 min read",
    category: "Gemstones",
    tags: ["Blue Sapphire", "Neelam", "Saturn", "Transformation", "Astrology"],
    featuredImage: SapphireBlue,
    featured: false,
    views: 756,
    likes: 45
  },
  {
    id: 4,
    title: "Emerald (Panna) - The Mercury Gemstone for Communication and Intelligence",
    excerpt: "Discover how Emerald can enhance your communication skills, boost intelligence, and improve business success.",
    content: "Emerald, known as Panna in Hindi, is the gemstone of Mercury and is highly valued for its ability to enhance communication...",
    author: "Dr. Meera Iyer",
    authorImage: "https://avatar-placeholder.iran.liara.run/public/6",
    publishDate: "2024-01-08",
    readTime: "7 min read",
    category: "Gemstones",
    tags: ["Emerald", "Panna", "Mercury", "Communication", "Intelligence"],
    featuredImage: Emerald,
    featured: false,
    views: 623,
    likes: 38
  },
  {
    id: 5,
    title: "Yellow Sapphire (Pukhraj) - The Jupiter Stone for Wisdom and Prosperity",
    excerpt: "Learn about Yellow Sapphire's connection to Jupiter, its benefits for wealth, wisdom, and spiritual growth.",
    content: "Yellow Sapphire, or Pukhraj, is associated with Jupiter, the planet of wisdom, knowledge, and prosperity...",
    author: "Guruji Arun Kumar",
    authorImage: "https://avatar-placeholder.iran.liara.run/public/3",
    publishDate: "2024-01-05",
    readTime: "9 min read",
    category: "Gemstones",
    tags: ["Yellow Sapphire", "Pukhraj", "Jupiter", "Wisdom", "Prosperity"],
    featuredImage: SapphireYellow,
    featured: false,
    views: 892,
    likes: 52
  },
  {
    id: 6,
    title: "How to Choose the Right Gemstone Based on Your Birth Chart",
    excerpt: "A comprehensive guide to selecting the perfect gemstone based on your astrological birth chart and planetary positions.",
    content: "Choosing the right gemstone is crucial for maximizing its benefits. Your birth chart plays a vital role in this selection...",
    author: "Astrologer Priya Devi",
    authorImage: "https://avatar-placeholder.iran.liara.run/public/2",
    publishDate: "2024-01-03",
    readTime: "15 min read",
    category: "Astrology",
    tags: ["Birth Chart", "Gemstone Selection", "Astrology", "Planetary Positions", "Guide"],
    featuredImage: GemstoneGeneral,
    featured: true,
    views: 1456,
    likes: 94
  }
];

const CATEGORIES = ["All", "Gemstones", "Rudraksha", "Astrology", "Spirituality", "Vastu", "Numerology"];

export default function BlogArticles() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");

  // Filter articles based on category and search
  const filteredArticles = useMemo(() => {
    let filtered = BLOG_ARTICLES;

    if (selectedCategory !== "All") {
      filtered = filtered.filter(article => article.category === selectedCategory);
    }

    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      filtered = filtered.filter(article =>
        article.title.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some(tag => tag.toLowerCase().includes(query))
      );
    }

    return filtered;
  }, [selectedCategory, searchQuery]);

  const featuredArticles = BLOG_ARTICLES.filter(article => article.featured);

  return (
    <main className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
        <div className="absolute left-12 top-28 text-[rgba(179,120,58,0.45)] animate-[twinkle_3.5s_ease-in-out_infinite]">✦</div>
        <div className="absolute right-16 top-40 text-[rgba(120,72,32,0.40)] animate-[twinkle_4.2s_ease-in-out_infinite]">✧</div>
        <div className="absolute left-1/3 bottom-24 text-[rgba(179,120,58,0.42)] animate-[twinkle_5s_ease-in-out_infinite]">✶</div>
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
        @keyframes twinkle{0%,100%{opacity:.25;transform:scale(1);}50%{opacity:.7;transform:scale(1.08);} }
      `}</style>

      {/* Hero Section */}
      <Section className="pt-24 pb-12">
        <div className="text-center">
          <h1 className={`text-4xl sm:text-6xl font-extrabold mb-6 ${gradHead}`}>
            Blog & Articles
          </h1>
          <p className="text-xl text-brown-800 max-w-3xl mx-auto">
            Discover the ancient wisdom of gemstones, Rudraksha, and astrology through our expert-written articles. 
            Learn about the mystical properties, benefits, and proper usage of these powerful spiritual tools.
          </p>
        </div>
      </Section>

      {/* Search and Filter */}
      <Section className="pb-8">
        <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
          <div className="flex-1 max-w-md">
            <input
              type="text"
              placeholder="Search articles..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
            />
          </div>
          <div className="flex flex-wrap gap-2">
            {CATEGORIES.map((category) => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                  selectedCategory === category
                    ? "bg-yellow-500 text-brown-900"
                    : "bg-white border border-yellow-400 text-brown-800 hover:bg-yellow-50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>
        </div>
      </Section>

      {/* Featured Articles */}
      <Section className="pb-12">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${gradHead}`}>Featured Articles</h2>
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {featuredArticles.map((article) => (
            <ArticleCard key={article.id} article={article} featured={true} />
          ))}
        </div>
      </Section>

      {/* All Articles */}
      <Section className="pb-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className={`text-3xl sm:text-4xl font-bold ${gradHead}`}>
            {selectedCategory === "All" ? "All Articles" : `${selectedCategory} Articles`}
          </h2>
          <span className="text-brown-600">
            {filteredArticles.length} article{filteredArticles.length !== 1 ? 's' : ''}
          </span>
        </div>

        {filteredArticles.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-brown-600 text-lg">No articles found matching your criteria.</p>
          </div>
        ) : (
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {filteredArticles.map((article) => (
              <ArticleCard key={article.id} article={article} featured={false} />
            ))}
          </div>
        )}
      </Section>

      {/* Write Article CTA */}
      <Section className="pb-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${gradHead}`}>Share Your Knowledge</h3>
          <p className="text-brown-800 mb-6">
            Are you an expert in astrology, gemstones, or spirituality? Share your knowledge with our community 
            and help others on their spiritual journey.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/write-article"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
            >
              Write an Article
            </Link>
            <Link
              to="/become-author"
              className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
            >
              Become an Author
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}

// Article Card Component
interface ArticleCardProps {
  article: BlogArticle;
  featured: boolean;
}

function ArticleCard({ article, featured }: ArticleCardProps) {
  return (
    <article className={`rounded-2xl border border-yellow-400 bg-white overflow-hidden transition-all duration-300 hover:shadow-xl hover:-translate-y-1 ${
      featured ? 'ring-2 ring-yellow-300' : ''
    }`}>
      <div className="relative">
        <img
          src={article.featuredImage}
          alt={article.title}
          className="w-full h-48 object-cover"
        />
        {featured && (
          <div className="absolute top-4 left-4">
            <span className="bg-yellow-500 text-brown-900 px-3 py-1 rounded-full text-sm font-semibold">
              Featured
            </span>
          </div>
        )}
        <div className="absolute top-4 right-4">
          <span className="bg-white/90 backdrop-blur-sm text-brown-800 px-3 py-1 rounded-full text-sm">
            {article.category}
          </span>
        </div>
      </div>
      
      <div className="p-6">
        <div className="flex items-center gap-2 mb-3">
          {article.tags.slice(0, 2).map((tag) => (
            <span key={tag} className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <h3 className="text-xl font-bold text-brown-900 mb-3 line-clamp-2">
          {article.title}
        </h3>
        
        <p className="text-brown-700 mb-4 line-clamp-3">
          {article.excerpt}
        </p>
        
        <div className="flex items-center justify-between text-sm text-brown-600 mb-4">
          <div className="flex items-center gap-4">
            <span>{article.readTime}</span>
            <span>•</span>
            <span>{article.views} views</span>
            <span>•</span>
            <span>{article.likes} likes</span>
          </div>
          <span>{new Date(article.publishDate).toLocaleDateString()}</span>
        </div>
        
        <div className="flex items-center gap-3 mb-4">
          <img
            src={article.authorImage}
            alt={article.author}
            className="w-8 h-8 rounded-full object-cover"
          />
          <span className="text-sm font-medium text-brown-800">{article.author}</span>
        </div>
        
        <Link
          to={`/blog/${article.id}`}
          className="inline-flex items-center text-yellow-600 hover:text-yellow-700 font-semibold transition"
        >
          Read More
          <svg className="w-4 h-4 ml-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </Link>
      </div>
    </article>
  );
}
