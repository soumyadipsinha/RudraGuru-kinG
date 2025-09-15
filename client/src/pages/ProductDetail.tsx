import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import { 
  ArrowLeft, 
  Heart, 
  Star, 
  Plus, 
  Minus, 
  ShoppingCart, 
  Shield, 
  Truck, 
  RotateCcw,
  Share2,
  CheckCircle
} from "lucide-react";
import { Button } from "../components/ui/button";
import { Badge } from "../components/ui/badge";
import { products as catalog } from "../lib/products";

// Build detail data from catalog entry
function buildDetailFromCatalog(base: any) {
  return {
    id: base.id,
    name: base.name,
    category: base.category,
    subcategory: base.subcategory,
    price: base.price,
    originalPrice: base.originalPrice,
    discount: base.discount,
    images: [base.image, base.image, base.image],
    rating: base.rating,
    reviews: base.reviews,
    inStock: base.inStock,
    description: base.description,
    longDescription: base.description,
    benefits: base.benefits || [],
    specifications: {
      weight: base.weight || "—",
      origin: base.origin || "—",
      certification: base.certification || "—",
      color: "—",
      clarity: "—",
      cut: "—",
      treatment: "—",
    },
    howToWear: {
      finger: "—",
      day: "—",
      time: "—",
      metal: "—",
      mantra: "—",
    },
    careInstructions: [
      "Clean with mild soap and water",
      "Avoid harsh chemicals and perfumes",
      "Store separately to prevent scratches",
    ],
    shipping: {
      freeShipping: true,
      estimatedDelivery: "3-5 business days",
      returnPolicy: "30 days return policy",
      warranty: "1 year warranty",
    },
  };
}

export default function ProductDetail() {
  const { id } = useParams();
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [showSpecs, setShowSpecs] = useState(false);

  const base = catalog.find(p => p.id === parseInt(id || "1"));
  const product = base ? buildDetailFromCatalog(base) : undefined;

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Product not found</h2>
          <Link to="/store" className="text-yellow-600 hover:text-yellow-700">
            ← Back to Store
          </Link>
        </div>
      </div>
    );
  }

  const handleAddToCart = () => {
    // Add to cart logic
    console.log(`Added ${quantity} ${product.name} to cart`);
  };

  const handleBuyNow = () => {
    // Buy now logic - redirect to checkout
    window.location.href = '/checkout';
  };

  return (
    <div className="min-h-screen bg-transparent">
      {/* Breadcrumb */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 pt-28">
          <div className="flex items-center space-x-2 text-sm">
            <Link to="/store" className="text-gray-500 hover:text-gray-700">
              Store
            </Link>
            <span className="text-gray-400">/</span>
            <Link to="/store" className="text-gray-500 hover:text-gray-700">
              {product.category}
            </Link>
            <span className="text-gray-400">/</span>
            <span className="text-gray-900 font-medium">{product.name}</span>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="aspect-square rounded-lg overflow-hidden bg-white border">
              <img
                src={product.images[selectedImage]}
                alt={product.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="flex space-x-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`w-20 h-20 rounded-lg overflow-hidden border-2 ${
                    selectedImage === index ? 'border-yellow-500' : 'border-gray-200'
                  }`}
                >
                  <img
                    src={image}
                    alt={`${product.name} ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="success">{product.category}</Badge>
                <Badge variant="warning">{product.subcategory}</Badge>
                {product.discount > 0 && (
                  <Badge variant="destructive">{product.discount}% OFF</Badge>
                )}
              </div>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">{product.name}</h1>
              
              <div className="flex items-center gap-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < Math.floor(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-gray-600">({product.reviews} reviews)</span>
                <span className={`px-2 py-1 rounded-full text-sm ${
                  product.inStock ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
                }`}>
                  {product.inStock ? 'In Stock' : 'Out of Stock'}
                </span>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <span className="text-3xl font-bold text-gray-900">₹{product.price.toLocaleString()}</span>
                {product.originalPrice && (
                  <span className="text-xl text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                )}
                {product.discount > 0 && (
                  <span className="text-lg text-green-600 font-semibold">Save ₹{(product.originalPrice - product.price).toLocaleString()}</span>
                )}
              </div>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Description</h3>
              <p className="text-gray-700 leading-relaxed">{product.description}</p>
            </div>

            <div>
              <h3 className="text-lg font-semibold text-gray-900 mb-3">Key Benefits</h3>
              <ul className="space-y-2">
                {product.benefits.map((benefit, index) => (
                  <li key={index} className="flex items-start gap-2">
                    <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-700">{benefit}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Quantity and Actions */}
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Quantity</label>
                <div className="flex items-center gap-3">
                  <div className="flex items-center border rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="px-4 py-2 border-x">{quantity}</span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-gray-100"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <Button
                  onClick={handleAddToCart}
                  className="flex-1 bg-yellow-500 hover:bg-yellow-600 text-white"
                  size="lg"
                >
                  <ShoppingCart className="w-5 h-5 mr-2" />
                  Add to Cart
                </Button>
                <Button
                  onClick={handleBuyNow}
                  className="flex-1 bg-gray-900 hover:bg-gray-800 text-white"
                  size="lg"
                >
                  Buy Now
                </Button>
                <Button
                  onClick={() => setIsInWishlist(!isInWishlist)}
                  variant="outline"
                  size="lg"
                  className={`${isInWishlist ? 'text-red-500 border-red-500' : ''}`}
                >
                  <Heart className={`w-5 h-5 ${isInWishlist ? 'fill-current' : ''}`} />
                </Button>
                <Button variant="outline" size="lg">
                  <Share2 className="w-5 h-5" />
                </Button>
              </div>
            </div>

            {/* Shipping Info */}
            <div className="bg-gray-50 rounded-lg p-4 space-y-3">
              <div className="flex items-center gap-3">
                <Truck className="w-5 h-5 text-green-600" />
                <span className="text-sm text-gray-700">
                  {product.shipping.freeShipping ? 'Free shipping' : 'Shipping charges apply'} - 
                  Estimated delivery: {product.shipping.estimatedDelivery}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <RotateCcw className="w-5 h-5 text-blue-600" />
                <span className="text-sm text-gray-700">
                  {product.shipping.returnPolicy}
                </span>
              </div>
              <div className="flex items-center gap-3">
                <Shield className="w-5 h-5 text-purple-600" />
                <span className="text-sm text-gray-700">
                  {product.shipping.warranty}
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <div className="border-b border-gray-200">
            <nav className="-mb-px flex space-x-8">
              <button
                onClick={() => setShowSpecs(false)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  !showSpecs
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Description
              </button>
              <button
                onClick={() => setShowSpecs(true)}
                className={`py-2 px-1 border-b-2 font-medium text-sm ${
                  showSpecs
                    ? 'border-yellow-500 text-yellow-600'
                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                }`}
              >
                Specifications
              </button>
            </nav>
          </div>

          <div className="py-8">
            {!showSpecs ? (
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">About This Product</h3>
                  <p className="text-gray-700 leading-relaxed">{product.longDescription}</p>
                </div>
                
                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">How to Wear</h3>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900">Finger:</span>
                        <span className="ml-2 text-gray-700">{product.howToWear.finger}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Day:</span>
                        <span className="ml-2 text-gray-700">{product.howToWear.day}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Time:</span>
                        <span className="ml-2 text-gray-700">{product.howToWear.time}</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div>
                        <span className="font-medium text-gray-900">Metal:</span>
                        <span className="ml-2 text-gray-700">{product.howToWear.metal}</span>
                      </div>
                      <div>
                        <span className="font-medium text-gray-900">Mantra:</span>
                        <span className="ml-2 text-gray-700">{product.howToWear.mantra}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-4">Care Instructions</h3>
                  <ul className="space-y-2">
                    {product.careInstructions.map((instruction, index) => (
                      <li key={index} className="flex items-start gap-2">
                        <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                        <span className="text-gray-700">{instruction}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            ) : (
              <div>
                <h3 className="text-xl font-semibold text-gray-900 mb-6">Product Specifications</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-3 border-b border-gray-200">
                      <span className="font-medium text-gray-900 capitalize">
                        {key.replace(/([A-Z])/g, ' $1').trim()}:
                      </span>
                      <span className="text-gray-700">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
