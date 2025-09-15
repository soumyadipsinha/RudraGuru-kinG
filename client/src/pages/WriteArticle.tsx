import { useState } from "react";
import { Link } from "react-router-dom";

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

interface ArticleForm {
  title: string;
  excerpt: string;
  content: string;
  category: string;
  tags: string[];
  featuredImage: string;
  author: string;
  authorBio: string;
}

export default function WriteArticle() {
  const [formData, setFormData] = useState<ArticleForm>({
    title: "",
    excerpt: "",
    content: "",
    category: "",
    tags: [],
    featuredImage: "",
    author: "",
    authorBio: ""
  });

  const [currentTag, setCurrentTag] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const categories = ["Gemstones", "Rudraksha", "Astrology", "Spirituality", "Vastu", "Numerology", "Meditation", "Healing"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAddTag = () => {
    if (currentTag.trim() && !formData.tags.includes(currentTag.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, currentTag.trim()]
      }));
      setCurrentTag("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    alert("Article submitted successfully! It will be reviewed before publishing.");
    setIsSubmitting(false);
  };

  return (
    <main className="relative bg-transparent overflow-hidden">
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

      {/* Header */}
      <Section className="pt-28 pb-8">
        <div className="text-center">
          <h1 className={`text-4xl sm:text-5xl font-extrabold mb-4 ${gradHead}`}>
            Write an Article
          </h1>
          <p className="text-xl text-brown-800 max-w-2xl mx-auto">
            Share your knowledge about gemstones, astrology, and spirituality with our community. 
            Help others on their spiritual journey.
          </p>
        </div>
      </Section>

      {/* Article Form */}
      <Section className="pb-16">
        <div className="max-w-4xl mx-auto">
          <form onSubmit={handleSubmit} className="space-y-8">
            {/* Basic Information */}
            <div className="rounded-2xl border border-yellow-400 bg-white p-8">
              <h2 className={`text-2xl font-bold mb-6 ${gradHead}`}>Article Information</h2>
              
              <div className="space-y-6">
                {/* Title */}
                <div>
                  <label htmlFor="title" className="block text-sm font-medium text-brown-900 mb-2">
                    Article Title *
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter a compelling title for your article"
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Excerpt */}
                <div>
                  <label htmlFor="excerpt" className="block text-sm font-medium text-brown-900 mb-2">
                    Article Excerpt *
                  </label>
                  <textarea
                    id="excerpt"
                    name="excerpt"
                    value={formData.excerpt}
                    onChange={handleInputChange}
                    placeholder="Write a brief summary of your article (2-3 sentences)"
                    rows={3}
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                {/* Category */}
                <div>
                  <label htmlFor="category" className="block text-sm font-medium text-brown-900 mb-2">
                    Category *
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  >
                    <option value="">Select a category</option>
                    {categories.map((category) => (
                      <option key={category} value={category}>{category}</option>
                    ))}
                  </select>
                </div>

                {/* Tags */}
                <div>
                  <label className="block text-sm font-medium text-brown-900 mb-2">
                    Tags
                  </label>
                  <div className="flex gap-2 mb-3">
                    <input
                      type="text"
                      value={currentTag}
                      onChange={(e) => setCurrentTag(e.target.value)}
                      placeholder="Add a tag"
                      className="flex-1 rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                      onKeyPress={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddTag())}
                    />
                    <button
                      type="button"
                      onClick={handleAddTag}
                      className="px-4 py-3 bg-yellow-500 text-brown-900 rounded-xl hover:bg-yellow-400 transition"
                    >
                      Add
                    </button>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {formData.tags.map((tag) => (
                      <span
                        key={tag}
                        className="inline-flex items-center gap-1 bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                      >
                        {tag}
                        <button
                          type="button"
                          onClick={() => handleRemoveTag(tag)}
                          className="text-yellow-600 hover:text-yellow-800"
                        >
                          ×
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Image */}
                <div>
                  <label htmlFor="featuredImage" className="block text-sm font-medium text-brown-900 mb-2">
                    Featured Image URL
                  </label>
                  <input
                    type="url"
                    id="featuredImage"
                    name="featuredImage"
                    value={formData.featuredImage}
                    onChange={handleInputChange}
                    placeholder="https://example.com/image.jpg"
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Author Information */}
            <div className="rounded-2xl border border-yellow-400 bg-white p-8">
              <h2 className={`text-2xl font-bold mb-6 ${gradHead}`}>Author Information</h2>
              
              <div className="space-y-6">
                <div>
                  <label htmlFor="author" className="block text-sm font-medium text-brown-900 mb-2">
                    Author Name *
                  </label>
                  <input
                    type="text"
                    id="author"
                    name="author"
                    value={formData.author}
                    onChange={handleInputChange}
                    placeholder="Your full name"
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                    required
                  />
                </div>

                <div>
                  <label htmlFor="authorBio" className="block text-sm font-medium text-brown-900 mb-2">
                    Author Bio
                  </label>
                  <textarea
                    id="authorBio"
                    name="authorBio"
                    value={formData.authorBio}
                    onChange={handleInputChange}
                    placeholder="Brief description of your expertise and background"
                    rows={3}
                    className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
                  />
                </div>
              </div>
            </div>

            {/* Article Content */}
            <div className="rounded-2xl border border-yellow-400 bg-white p-8">
              <h2 className={`text-2xl font-bold mb-6 ${gradHead}`}>Article Content</h2>
              
              <div>
                <label htmlFor="content" className="block text-sm font-medium text-brown-900 mb-2">
                  Article Content *
                </label>
                <textarea
                  id="content"
                  name="content"
                  value={formData.content}
                  onChange={handleInputChange}
                  placeholder="Write your article content here. You can use HTML tags for formatting like &lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, etc."
                  rows={20}
                  className="w-full rounded-xl border border-yellow-400 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent font-mono text-sm"
                  required
                />
                <p className="text-sm text-brown-600 mt-2">
                  You can use HTML tags for formatting. Common tags: &lt;h2&gt;, &lt;h3&gt;, &lt;p&gt;, &lt;ul&gt;, &lt;li&gt;, &lt;strong&gt;, &lt;em&gt;
                </p>
              </div>
            </div>

            {/* Guidelines */}
            <div className="rounded-2xl border border-yellow-400 bg-yellow-50 p-8">
              <h3 className={`text-xl font-bold mb-4 ${gradHead}`}>Writing Guidelines</h3>
              <ul className="space-y-2 text-brown-800">
                <li>• Ensure your content is accurate and well-researched</li>
                <li>• Use proper grammar and spelling</li>
                <li>• Include practical examples and actionable advice</li>
                <li>• Respect different beliefs and practices</li>
                <li>• Avoid making medical claims without proper disclaimers</li>
                <li>• All articles will be reviewed before publishing</li>
              </ul>
            </div>

            {/* Submit Button */}
            <div className="flex justify-center">
              <button
                type="submit"
                disabled={isSubmitting}
                className={`px-8 py-4 rounded-xl font-semibold text-lg transition-all ${
                  isSubmitting
                    ? "bg-gray-400 text-gray-600 cursor-not-allowed"
                    : "bg-yellow-500 text-brown-900 hover:bg-yellow-400 shadow-lg hover:shadow-xl"
                }`}
              >
                {isSubmitting ? "Submitting..." : "Submit Article"}
              </button>
            </div>
          </form>
        </div>
      </Section>

      {/* CTA Section */}
      <Section className="pb-16">
        <div className="rounded-2xl border border-yellow-400 p-8 text-center bg-white transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
          <h3 className={`text-2xl sm:text-3xl font-bold mb-4 ${gradHead}`}>Become a Regular Contributor</h3>
          <p className="text-brown-800 mb-6">
            Join our team of expert authors and share your knowledge regularly with our growing community.
          </p>
          <Link
            to="/become-author"
            className="inline-flex items-center rounded-xl border border-brown-300 px-6 py-3 text-yellow-600 font-semibold hover:bg-brown-50 transition"
          >
            Learn More About Becoming an Author
          </Link>
        </div>
      </Section>
    </main>
  );
}
