import { useState } from "react";
import { Link, useParams } from "react-router-dom";

// Import gemstone assets
import Ruby from "../assets/ruby.png";
import Rudraksha from "../assets/rudraksha.png";
import SapphireBlue from "../assets/sapphire-blue.png";
import Emerald from "../assets/panna.png";

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

// Sample detailed article content
const ARTICLE_CONTENT: Record<number, string> = {
  1: `
    <h2>Introduction to Ruby (Manikya)</h2>
    <p>Ruby, known as Manikya in Sanskrit, is one of the most powerful and revered gemstones in Vedic astrology. This magnificent red stone is associated with the Sun, the king of all planets, and is believed to bestow upon its wearer the qualities of leadership, courage, and vitality.</p>
    
    <h3>Astrological Significance</h3>
    <p>In Vedic astrology, Ruby represents the Sun and is considered the gemstone of kings and leaders. It is believed to:</p>
    <ul>
      <li>Enhance leadership qualities and authority</li>
      <li>Improve confidence and self-esteem</li>
      <li>Bring success in government and administrative roles</li>
      <li>Strengthen the heart and circulatory system</li>
      <li>Provide protection against negative energies</li>
    </ul>
    
    <h3>Physical and Healing Properties</h3>
    <p>Ruby is not just spiritually significant but also has remarkable healing properties:</p>
    <ul>
      <li><strong>Heart Health:</strong> Ruby is believed to strengthen the heart and improve blood circulation</li>
      <li><strong>Energy Boost:</strong> It provides vitality and energy to overcome fatigue</li>
      <li><strong>Mental Clarity:</strong> Enhances focus and decision-making abilities</li>
      <li><strong>Emotional Balance:</strong> Helps in overcoming depression and anxiety</li>
    </ul>
    
    <h3>How to Choose the Right Ruby</h3>
    <p>When selecting a Ruby, consider these factors:</p>
    <ol>
      <li><strong>Color:</strong> Look for a deep, vibrant red color without any brown or orange tints</li>
      <li><strong>Clarity:</strong> While some inclusions are acceptable, avoid stones with visible cracks</li>
      <li><strong>Cut:</strong> Well-cut stones maximize the gem's brilliance and color</li>
      <li><strong>Carat Weight:</strong> Choose a weight that's appropriate for your finger size and budget</li>
    </ol>
    
    <h3>Proper Wearing Method</h3>
    <p>To maximize the benefits of Ruby:</p>
    <ul>
      <li>Wear it on the ring finger of the right hand</li>
      <li>Set it in gold for maximum effectiveness</li>
      <li>Wear it on a Sunday morning after proper energization</li>
      <li>Ensure the stone touches your skin directly</li>
    </ul>
    
    <h3>Conclusion</h3>
    <p>Ruby is truly the king of gemstones, offering both spiritual and physical benefits. When worn correctly and with proper faith, it can transform your life by bringing success, health, and prosperity. Always consult with an experienced astrologer before wearing any gemstone to ensure it's suitable for your birth chart.</p>
  `,
  2: `
    <h2>Understanding Rudraksha Beads</h2>
    <p>Rudraksha beads are considered one of the most sacred and powerful spiritual tools in Hinduism. These beads come from the Rudraksha tree (Elaeocarpus ganitrus) and are believed to have been created from the tears of Lord Shiva.</p>
    
    <h3>Types of Rudraksha Beads</h3>
    <p>Rudraksha beads are classified based on the number of faces (mukhi) they have:</p>
    <ul>
      <li><strong>1 Mukhi:</strong> Represents Lord Shiva, provides spiritual enlightenment</li>
      <li><strong>2 Mukhi:</strong> Represents Ardhanarishvara, improves relationships</li>
      <li><strong>3 Mukhi:</strong> Represents Agni, enhances confidence and courage</li>
      <li><strong>4 Mukhi:</strong> Represents Brahma, improves knowledge and creativity</li>
      <li><strong>5 Mukhi:</strong> Most common, represents Kalagni Rudra, provides general well-being</li>
      <li><strong>6 Mukhi:</strong> Represents Kartikeya, improves focus and concentration</li>
      <li><strong>7 Mukhi:</strong> Represents Saptarishi, brings wealth and prosperity</li>
      <li><strong>8 Mukhi:</strong> Represents Ganesha, removes obstacles</li>
      <li><strong>9 Mukhi:</strong> Represents Navadurga, provides protection</li>
      <li><strong>10 Mukhi:</strong> Represents Lord Vishnu, brings peace and harmony</li>
    </ul>
    
    <h3>Benefits of Wearing Rudraksha</h3>
    <p>Rudraksha beads offer numerous benefits:</p>
    <ul>
      <li><strong>Spiritual Growth:</strong> Enhances meditation and spiritual practices</li>
      <li><strong>Health Benefits:</strong> Regulates blood pressure and reduces stress</li>
      <li><strong>Mental Clarity:</strong> Improves focus and concentration</li>
      <li><strong>Protection:</strong> Shields from negative energies and evil eye</li>
      <li><strong>Emotional Balance:</strong> Helps in managing emotions and reducing anxiety</li>
    </ul>
    
    <h3>How to Wear Rudraksha</h3>
    <p>Proper wearing methods are essential for maximum benefits:</p>
    <ol>
      <li><strong>Purification:</strong> Clean the beads with holy water before first use</li>
      <li><strong>Energization:</strong> Chant appropriate mantras while wearing</li>
      <li><strong>Maintenance:</strong> Keep the beads clean and avoid contact with chemicals</li>
      <li><strong>Respect:</strong> Treat the beads with reverence and respect</li>
    </ol>
    
    <h3>Care and Maintenance</h3>
    <p>To maintain the potency of your Rudraksha beads:</p>
    <ul>
      <li>Clean them regularly with a soft cloth</li>
      <li>Avoid exposing them to harsh chemicals</li>
      <li>Store them in a clean, sacred place when not wearing</li>
      <li>Re-energize them periodically with appropriate mantras</li>
    </ul>
  `,
  6: `
    <h2>Choosing the Right Gemstone Based on Your Birth Chart</h2>
    <p>Selecting the perfect gemstone is a crucial decision that should be based on careful analysis of your birth chart. Each gemstone corresponds to specific planets and can either strengthen beneficial planets or pacify malefic ones.</p>
    
    <h3>Understanding Planetary Influences</h3>
    <p>In Vedic astrology, each planet governs specific aspects of life:</p>
    <ul>
      <li><strong>Sun:</strong> Leadership, authority, father, government positions</li>
      <li><strong>Moon:</strong> Mind, emotions, mother, public relations</li>
      <li><strong>Mars:</strong> Energy, courage, siblings, property</li>
      <li><strong>Mercury:</strong> Communication, intelligence, business</li>
      <li><strong>Jupiter:</strong> Wisdom, knowledge, children, wealth</li>
      <li><strong>Venus:</strong> Love, beauty, marriage, luxury</li>
      <li><strong>Saturn:</strong> Discipline, karma, longevity, career</li>
    </ul>
    
    <h3>Steps to Choose the Right Gemstone</h3>
    <ol>
      <li><strong>Birth Chart Analysis:</strong> Get your birth chart analyzed by a qualified astrologer</li>
      <li><strong>Identify Weak Planets:</strong> Determine which planets are weak or afflicted in your chart</li>
      <li><strong>Check Planetary Periods:</strong> Consider the current planetary period (dasha) you're going through</li>
      <li><strong>Evaluate Life Goals:</strong> Choose gemstones that align with your current life objectives</li>
      <li><strong>Consult an Expert:</strong> Always seek guidance from an experienced astrologer</li>
    </ol>
    
    <h3>Common Gemstone Recommendations</h3>
    <p>Based on common astrological conditions:</p>
    <ul>
      <li><strong>Weak Sun:</strong> Ruby (Manikya) to strengthen leadership and authority</li>
      <li><strong>Afflicted Moon:</strong> Pearl (Moti) for emotional stability and mental peace</li>
      <li><strong>Weak Mars:</strong> Red Coral (Moonga) for energy and courage</li>
      <li><strong>Mercury Issues:</strong> Emerald (Panna) for communication and intelligence</li>
      <li><strong>Jupiter Problems:</strong> Yellow Sapphire (Pukhraj) for wisdom and prosperity</li>
      <li><strong>Venus Afflictions:</strong> Diamond (Heera) for love and luxury</li>
      <li><strong>Saturn Issues:</strong> Blue Sapphire (Neelam) for discipline and career</li>
    </ul>
    
    <h3>Important Considerations</h3>
    <p>Before wearing any gemstone:</p>
    <ul>
      <li>Ensure it's authentic and properly certified</li>
      <li>Get it energized by a qualified priest or astrologer</li>
      <li>Wear it on the correct finger and hand</li>
      <li>Follow the proper wearing method and timing</li>
      <li>Monitor your experiences and consult your astrologer regularly</li>
    </ul>
    
    <h3>Conclusion</h3>
    <p>Choosing the right gemstone is a sacred process that requires careful consideration of your birth chart, current life situation, and spiritual goals. Always consult with an experienced astrologer to ensure you select the most beneficial gemstone for your unique astrological profile.</p>
  `
};

// Sample article data (same as in BlogArticles.tsx)
const SAMPLE_ARTICLE: BlogArticle = {
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
};

export default function BlogArticle() {
  const { id } = useParams<{ id: string }>();
  const [isLiked, setIsLiked] = useState(false);
  const [likes, setLikes] = useState(SAMPLE_ARTICLE.likes);

  const handleLike = () => {
    if (!isLiked) {
      setLikes(likes + 1);
      setIsLiked(true);
    } else {
      setLikes(likes - 1);
      setIsLiked(false);
    }
  };

  const articleContent = ARTICLE_CONTENT[parseInt(id || "1")] || ARTICLE_CONTENT[1];

  return (
    <main className="relative bg-white overflow-hidden">
      {/* Background decoration */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-[rgba(120,72,32,0.10)] blur-3xl animate-[float1_12s_ease-in-out_infinite]" />
        <div className="absolute top-1/3 -right-24 h-96 w-96 rounded-full bg-[rgba(179,120,58,0.10)] blur-3xl animate-[float2_14s_ease-in-out_infinite]" />
        <div className="absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-[rgba(90,56,28,0.10)] blur-3xl animate-[float3_16s_ease-in-out_infinite]" />
      </div>

      <style>{`
        @keyframes float1 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(12px) translateX(8px);} }
        @keyframes float2 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(-10px) translateX(-12px);} }
        @keyframes float3 { 0%,100% { transform: translateY(0) translateX(0);} 50% { transform: translateY(14px) translateX(-10px);} }
      `}</style>

      {/* Article Header */}
      <Section className="pt-24 pb-8">
        <div className="max-w-4xl mx-auto">
          {/* Breadcrumb */}
          <nav className="mb-6">
            <Link to="/blog" className="text-yellow-600 hover:text-yellow-700 font-medium">
              ← Back to Blog
            </Link>
          </nav>

          {/* Article Meta */}
          <div className="flex items-center gap-2 mb-4">
            <span className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm font-medium">
              {SAMPLE_ARTICLE.category}
            </span>
            <span className="text-brown-600">•</span>
            <span className="text-brown-600">{SAMPLE_ARTICLE.readTime}</span>
            <span className="text-brown-600">•</span>
            <span className="text-brown-600">{new Date(SAMPLE_ARTICLE.publishDate).toLocaleDateString()}</span>
          </div>

          {/* Article Title */}
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-6 ${gradHead}`}>
            {SAMPLE_ARTICLE.title}
          </h1>

          {/* Article Excerpt */}
          <p className="text-xl text-brown-700 mb-8 leading-relaxed">
            {SAMPLE_ARTICLE.excerpt}
          </p>

          {/* Author Info */}
          <div className="flex items-center gap-4 mb-8">
            <img
              src={SAMPLE_ARTICLE.authorImage}
              alt={SAMPLE_ARTICLE.author}
              className="w-12 h-12 rounded-full object-cover"
            />
            <div>
              <p className="font-semibold text-brown-900">{SAMPLE_ARTICLE.author}</p>
              <p className="text-brown-600 text-sm">Expert Astrologer & Gemstone Specialist</p>
            </div>
          </div>

          {/* Featured Image */}
          <div className="mb-8">
            <img
              src={SAMPLE_ARTICLE.featuredImage}
              alt={SAMPLE_ARTICLE.title}
              className="w-full h-64 sm:h-80 object-cover rounded-2xl"
            />
          </div>
        </div>
      </Section>

      {/* Article Content */}
      <Section className="pb-12">
        <div className="max-w-4xl mx-auto">
          <div className="prose prose-lg max-w-none">
            <div 
              className="text-brown-800 leading-relaxed"
              dangerouslySetInnerHTML={{ __html: articleContent }}
            />
          </div>

          {/* Tags */}
          <div className="mt-12 pt-8 border-t border-yellow-200">
            <h3 className="text-lg font-semibold text-brown-900 mb-4">Tags</h3>
            <div className="flex flex-wrap gap-2">
              {SAMPLE_ARTICLE.tags.map((tag) => (
                <span key={tag} className="bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm">
                  {tag}
                </span>
              ))}
            </div>
          </div>

          {/* Like and Share */}
          <div className="mt-8 flex items-center justify-between">
            <button
              onClick={handleLike}
              className={`flex items-center gap-2 px-4 py-2 rounded-full transition-all ${
                isLiked 
                  ? "bg-red-100 text-red-600" 
                  : "bg-gray-100 text-gray-600 hover:bg-gray-200"
              }`}
            >
              <svg className="w-5 h-5" fill={isLiked ? "currentColor" : "none"} stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
              </svg>
              {likes} likes
            </button>

            <div className="flex items-center gap-4">
              <span className="text-brown-600">{SAMPLE_ARTICLE.views} views</span>
              <button className="text-brown-600 hover:text-yellow-600 transition">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.367 2.684 3 3 0 00-5.367-2.684z" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      </Section>

      {/* Related Articles */}
      <Section className="pb-16">
        <h2 className={`text-3xl sm:text-4xl font-bold mb-8 ${gradHead}`}>Related Articles</h2>
        <div className="grid gap-6 md:grid-cols-3">
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img
              src={Emerald}
              alt="Emerald Gemstone"
              className="w-full h-32 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-brown-900 mb-2">Emerald (Panna) Guide</h3>
            <p className="text-brown-700 text-sm mb-4">Learn about the Mercury gemstone and its benefits...</p>
            <Link to="/blog" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
              Read More →
            </Link>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img
              src={SapphireBlue}
              alt="Blue Sapphire"
              className="w-full h-32 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-brown-900 mb-2">Blue Sapphire (Neelam)</h3>
            <p className="text-brown-700 text-sm mb-4">Discover the power of the Saturn stone...</p>
            <Link to="/blog" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
              Read More →
            </Link>
          </div>
          <div className="rounded-2xl border border-yellow-400 bg-white p-6 transition-all duration-300 hover:shadow-xl hover:-translate-y-1">
            <img
              src={Rudraksha}
              alt="Rudraksha Beads"
              className="w-full h-32 object-cover rounded-xl mb-4"
            />
            <h3 className="font-bold text-brown-900 mb-2">Rudraksha Benefits</h3>
            <p className="text-brown-700 text-sm mb-4">Understanding sacred Rudraksha beads...</p>
            <Link to="/blog" className="text-yellow-600 hover:text-yellow-700 font-semibold text-sm">
              Read More →
            </Link>
          </div>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${gradHead}`}>Need Personalized Guidance?</h3>
          <p className="text-brown-800 mb-6">
            Get expert advice on choosing the right gemstone for your birth chart and life goals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/astrologers"
              className="inline-flex items-center rounded-xl bg-yellow-500 px-6 py-3 text-brown-900 font-semibold shadow hover:bg-yellow-400 transition"
            >
              Consult an Astrologer
            </Link>
            <Link
              to="/gemstones"
              className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
            >
              Explore Gemstones
            </Link>
          </div>
        </div>
      </Section>
    </main>
  );
}
