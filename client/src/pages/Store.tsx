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
  SlidersHorizontal,
  Sparkles
} from "lucide-react";
import { Button } from "../components/ui/button";
import { products } from "../lib/products";


const categories = [
  { id: "all", name: "All Products", count: products.length },
  { id: "gemstones", name: "Gemstones", count: products.filter(p => p.category === "gemstones").length },
  { id: "rudraksha", name: "Rudraksha", count: products.filter(p => p.category === "rudraksha").length },
  { id: "bracelets", name: "Bracelets", count: products.filter(p => p.category === "bracelets").length },
  { id: "mala", name: "Mala", count: products.filter(p => p.category === "mala").length },
  { id: "ring", name: "Ring", count: products.filter(p => p.category === "ring").length }
];

const subcategories = {
  gemstones: [
    { id: "rashi-ratna", name: "Rashi Ratna" },
    { id: "vedic-gems", name: "Vedic Gems" },
    { id: "other-gems", name: "Other Gems" },
    { id: "jewelry", name: "Jewelry" }
  ],
  rudraksha: [
    { id: "nepali", name: "Nepali Rudraksha" },
    { id: "indonesian", name: "Indonesian Rudraksha" },
    { id: "premium", name: "Premium" },
    { id: "special", name: "Special" },
    { id: "standard", name: "Standard" },
    { id: "decorative", name: "Decorative" }
  ],
  bracelets: [
    { id: "chakra", name: "Chakra Bracelets" },
    { id: "crystal", name: "Crystal Bracelets" },
    { id: "protection", name: "Protection" },
    { id: "fashion", name: "Fashion" },
    { id: "luxury", name: "Luxury" }
  ],
  mala: [
    { id: "rudraksha", name: "Rudraksha Mala" },
    { id: "tulsi", name: "Tulsi Mala" },
    { id: "premium", name: "Premium" },
    { id: "standard", name: "Standard" }
  ],
  ring: [
    { id: "gemstone-rings", name: "Gemstone Rings" },
    { id: "wedding-rings", name: "Wedding Rings" },
    { id: "designer-rings", name: "Designer Rings" },
    { id: "spiritual-rings", name: "Spiritual Rings" },
    { id: "premium-rings", name: "Premium Rings" },
    { id: "turquoise-rings", name: "Turquoise Rings" },
    { id: "islamic-rings", name: "Islamic Rings" },
    { id: "natural-stone-rings", name: "Natural Stone Rings" }
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
  const [isCartPage, setIsCartPage] = useState(false);
  const [wishlist, setWishlist] = useState<number[]>([]);
  const [previewProduct, setPreviewProduct] = useState<any | null>(null);
  const [previewType, setPreviewType] = useState<'image' | 'video'>('image');

  // Helper function to get video path for a product
  const getProductVideo = (productName: string) => {
    const videoMap: { [key: string]: string } = {
      "Cat's Eye": "/assets/catseye.mp4",
      "Cat's Eye Ring": "/assets/catseye2.mp4",
      "Diamond": "/assets/diamond.mp4",
      "Diamond Ring": "/assets/diamondRing.mp4",
      "Pearl": "/assets/moti.mp4",
      "Blue Sapphire": "/assets/neelam.mp4",
      "Blue Sapphire Ring": "/assets/neelam2.mp4"
    };
    return videoMap[productName] || null;
  };

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

  const getTaxAmount = (subtotal: number) => {
    const taxRate = 0.18; // 18% GST
    return Math.round(subtotal * taxRate);
  };

  // Render Full Page Cart when toggled
  if (isCartPage) {
    const subtotal = getTotalPrice();
    const shipping = 0;
    const tax = getTaxAmount(subtotal);
    const total = subtotal + shipping + tax;

    return (
      <div className="min-h-screen bg-transparent">
        <div className="bg-white shadow-sm border-b">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-20">
            <div className="flex items-center justify-between">
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">Your Shopping Cart</h1>
              <div className="flex items-center gap-3">
                <Link to="#" onClick={(e)=>{e.preventDefault(); setIsCartPage(false);}} className="text-sm text-gray-600 hover:text-yellow-600">Continue Shopping</Link>
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          {cart.length === 0 ? (
            <div className="text-center py-16 bg-white rounded-lg border">
              <ShoppingCart className="w-16 h-16 text-gray-300 mx-auto mb-4" />
              <h2 className="text-xl font-semibold mb-2">Your cart is empty</h2>
              <p className="text-gray-600 mb-6">Add items to proceed to checkout.</p>
              <button onClick={()=>setIsCartPage(false)} className="px-4 py-2 rounded-lg border text-brown-900 hover:bg-gray-50">Browse Products</button>
            </div>
          ) : (
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Left: Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {cart.map(item => {
                  const product = products.find(p => p.id === item.id);
                  if (!product) return null;
                  const lineTotal = product.price * item.quantity;
                  return (
                    <div key={item.id} className="bg-white border rounded-lg p-4 flex gap-4">
                      <img src={product.image} alt={product.name} className="w-24 h-24 object-cover rounded" />
                      <div className="flex-1">
                        <div className="flex items-start justify-between gap-3">
                          <div>
                            <h3 className="font-semibold text-gray-900 line-clamp-2">{product.name}</h3>
                            <p className="text-sm text-gray-600 mt-1">₹{product.price.toLocaleString()} each</p>
                          </div>
                          <button onClick={()=>removeFromCart(item.id)} className="text-red-500 hover:text-red-700 p-1"><X className="w-4 h-4"/></button>
                        </div>
                        <div className="mt-3 flex items-center justify-between">
                          <div className="flex items-center gap-2">
                            <button onClick={()=>updateQuantity(item.id, item.quantity - 1)} className="p-1 rounded bg-gray-100 hover:bg-gray-200"><Minus className="w-4 h-4"/></button>
                            <span className="px-3 py-1 bg-yellow-100 text-yellow-800 rounded-full text-sm font-medium">{item.quantity}</span>
                            <button onClick={()=>updateQuantity(item.id, item.quantity + 1)} className="p-1 rounded bg-gray-100 hover:bg-gray-200"><Plus className="w-4 h-4"/></button>
                          </div>
                          <div className="text-right">
                            <span className="text-sm text-gray-600">Total</span>
                            <div className="text-base font-semibold">₹{lineTotal.toLocaleString()}</div>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Right: Order Summary */}
              <div className="lg:col-span-1">
                <div className="bg-white border rounded-lg p-6 sticky top-24">
                  <h2 className="text-lg font-semibold mb-4">Order Summary</h2>
                  <div className="space-y-3 text-sm">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Items ({getTotalCartItems()})</span>
                      <span className="font-medium">₹{subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Shipping</span>
                      <span className="font-medium text-green-600">Free</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Tax</span>
                      <span className="font-medium">₹{tax.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-3 flex justify-between text-base">
                      <span className="font-semibold">Total</span>
                      <span className="font-bold">₹{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <Link to="/checkout" className="block mt-6">
                    <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">Proceed to Checkout</Button>
                  </Link>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-transparent">
      {/* Header */}
      <div className="bg-white shadow-deep">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-20">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div>
              <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">RudraGuru Store</h1>
              <p className="text-gray-600 mt-1 text-sm sm:text-base">Authentic Astrological Products & Remedies</p>
            </div>
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsCartPage(true)}
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
            <div className="bg-white rounded-lg shadow-deep p-6 sticky top-24">
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
                    className="w-full pl-10 pr-4 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors shadow-sm ${
                          selectedCategory === category.id
                            ? 'bg-yellow-100 text-yellow-800'
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
                        className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors shadow-sm ${
                          selectedSubcategory === "all"
                            ? 'bg-yellow-100 text-yellow-800'
                            : 'text-gray-700 hover:bg-gray-100'
                        }`}
                      >
                        All ({filteredProducts.length})
                      </button>
                      {subcategories[selectedCategory as keyof typeof subcategories].map(subcategory => (
                        <button
                          key={subcategory.id}
                          onClick={() => setSelectedSubcategory(subcategory.id)}
                          className={`w-full text-left px-3 py-2 rounded-lg text-sm transition-colors shadow-sm ${
                            selectedSubcategory === subcategory.id
                              ? 'bg-yellow-100 text-yellow-800'
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
                    className="w-full px-3 py-2 rounded-lg bg-white shadow-sm focus:ring-2 focus:ring-blue-500 focus:border-transparent"
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
          previewType={previewType}
          onPreviewTypeChange={setPreviewType}
        />
      )}
    </div>
  );
}

// Product Preview Modal with rotating image animation and video support
function PreviewModal({ product, onClose, onAddToCart, previewType, onPreviewTypeChange }: { 
  product: any; 
  onClose: () => void; 
  onAddToCart: () => void;
  previewType: 'image' | 'video';
  onPreviewTypeChange: (type: 'image' | 'video') => void;
}) {
  const getProductVideo = (productName: string) => {
    const videoMap: { [key: string]: string } = {
      "Cat's Eye (Lehsunia) - Natural": "/assets/catseye.mp4",
      "Cat's Eye Ring - Designer": "/assets/catseye2.mp4",
      "Diamond - Premium Quality": "/assets/diamond.mp4",
      "Diamond Ring - Wedding Collection": "/assets/diamondRing.mp4",
      "Pearl (Moti) - Natural": "/assets/moti.mp4",
      "Blue Sapphire (Neelam) - Premium Quality": "/assets/neelam.mp4",
      "Blue Sapphire Ring - Luxury Collection": "/assets/neelam2.mp4"
    };
    return videoMap[productName] || null;
  };

  const videoPath = getProductVideo(product.name);
  const hasVideo = !!videoPath;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/60" onClick={onClose} />
      <div className="relative z-10 w-full max-w-3xl bg-white rounded-2xl shadow-2xl overflow-hidden">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 p-6 flex items-center justify-center bg-gray-50">
            {previewType === 'image' ? (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm h-auto object-contain animate-[spin_12s_linear_infinite]"
                style={{ animationDirection: 'reverse' }}
              />
            ) : hasVideo ? (
              <video
                src={videoPath}
                controls
                autoPlay
                loop
                muted
                className="w-full max-w-sm h-auto object-contain rounded-lg"
              >
                Your browser does not support the video tag.
              </video>
            ) : (
              <img
                src={product.image}
                alt={product.name}
                className="w-full max-w-sm h-auto object-contain animate-[spin_12s_linear_infinite]"
                style={{ animationDirection: 'reverse' }}
              />
            )}
            
            {/* Video/Image Toggle Buttons */}
            {hasVideo && (
              <div className="absolute top-4 right-4 flex gap-2">
                <button
                  onClick={() => onPreviewTypeChange('image')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    previewType === 'image' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  Image
                </button>
                <button
                  onClick={() => onPreviewTypeChange('video')}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-all duration-300 ${
                    previewType === 'video' 
                      ? 'bg-red-500 text-white' 
                      : 'bg-white/80 text-gray-700 hover:bg-white'
                  }`}
                >
                  Video
                </button>
              </div>
            )}
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
              <Link to={`/product/${product.id}`} className="inline-flex items-center px-4 py-2 border border-gray-300 rounded-lg text-brown-900 hover:bg-gray-50">View Details</Link>
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
                      className="bg-white text-brown-900 border border-gray-300 hover:bg-gray-50"
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
      <div className="bg-white rounded-lg shadow-deep overflow-hidden hover:shadow-xl transition-shadow">
      <div className="relative">
        <img
          src={product.image}
          alt={product.name}
          onClick={() => onPreview(product)}
          className="w-full h-48 object-cover hover:scale-105 transition-transform duration-200 cursor-pointer"
        />
        <button
          onClick={() => onToggleWishlist(product.id)}
          className={`absolute top-3 right-3 p-2 rounded-full transition-colors shadow-deep ${
            isInWishlist ? 'text-red-500 bg-white' : 'text-gray-400 bg-white hover:text-red-500'
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
              className="flex-1 bg-white text-brown-900 shadow-sm hover:bg-gray-50"
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
  const totalItems = cart.reduce((sum, it) => sum + it.quantity, 0);
  return (
    <div className="fixed inset-0 z-50 overflow-hidden">
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm transition-opacity" onClick={onClose} />
      <div className="absolute right-0 top-0 h-full w-full max-w-md bg-white shadow-deep">
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between p-4 shadow-sm sticky top-0 bg-white/90 backdrop-blur-md z-10">
            <h2 className="text-lg font-semibold">Your Cart ({totalItems})</h2>
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
                    <div key={item.id} className="p-3 rounded-xl shadow-sm bg-white">
                      <div className="flex gap-3">
                        <img
                          src={product.image}
                          alt={product.name}
                          className="w-16 h-16 object-cover rounded-lg"
                        />
                        <div className="flex-1 min-w-0">
                          <h4 className="font-semibold text-sm text-gray-900 line-clamp-2">{product.name}</h4>
                          <div className="mt-1 flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity - 1)}
                                className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200"
                                aria-label="Decrease quantity"
                              >
                                <Minus className="w-3.5 h-3.5" />
                              </button>
                              <span className="px-2 py-1 bg-yellow-100 text-yellow-800 rounded text-xs font-medium">
                                {item.quantity}
                              </span>
                              <button
                                onClick={() => onUpdateQuantity(item.id, item.quantity + 1)}
                                className="h-7 w-7 inline-flex items-center justify-center rounded-md bg-gray-100 hover:bg-gray-200"
                                aria-label="Increase quantity"
                              >
                                <Plus className="w-3.5 h-3.5" />
                              </button>
                            </div>
                            <div className="text-right">
                              <div className="text-sm font-semibold text-gray-900">₹{(product.price * item.quantity).toLocaleString()}</div>
                              <div className="text-xs text-gray-500">₹{product.price.toLocaleString()} each</div>
                            </div>
                          </div>
                          <div className="mt-2 flex items-center justify-between">
                            <div className="text-xs text-gray-500">Eligible for returns</div>
                            <button
                              onClick={() => onRemoveFromCart(item.id)}
                              className="text-xs text-red-500 hover:text-red-700"
                            >
                              Remove
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}

                {/* Promo code */}
                <div className="p-3 rounded-xl shadow-sm bg-white">
                  <label className="block text-sm font-medium text-gray-900 mb-2">Have a promo code?</label>
                  <div className="flex gap-2">
                    <input type="text" placeholder="ENTER CODE" className="flex-1 rounded-lg bg-white p-2.5 shadow-sm" />
                    <button className="px-4 py-2 rounded-lg bg-yellow-500 text-brown-900 font-semibold hover:bg-yellow-400">Apply</button>
                  </div>
                  <p className="mt-2 text-xs text-gray-500">Only one code can be applied</p>
                </div>
              </div>
            )}
          </div>
          
          {cart.length > 0 && (
            <div className="p-4 shadow-inner sticky bottom-0 bg-white/90 backdrop-blur-md">
              <div className="space-y-2 text-sm text-gray-700 mb-3">
                <div className="flex justify-between"><span>Subtotal</span><span className="font-medium">₹{totalPrice.toLocaleString()}</span></div>
                <div className="flex justify-between"><span>Estimated Tax</span><span className="font-medium">Calculated at checkout</span></div>
              </div>
              <div className="flex justify-between items-center mb-3">
                <span className="text-lg font-semibold">Total</span>
                <span className="text-lg font-bold">₹{totalPrice.toLocaleString()}</span>
              </div>
              <Link to="/checkout" className="block">
                <Button className="w-full bg-yellow-500 hover:bg-yellow-600 text-white">
                  Proceed to Checkout
                </Button>
              </Link>
              <Link to="/store" className="block mt-2 text-center text-sm text-gray-600 hover:text-gray-800">Continue shopping</Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
