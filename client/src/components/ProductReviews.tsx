import React, { useState } from 'react';
import { Star, ThumbsUp, Play, CheckCircle, MessageSquare } from 'lucide-react';
import type { ProductReview } from '../lib/products';

interface ProductReviewsProps {
  productId: number;
  reviews: ProductReview[];
}

export default function ProductReviews({ productId, reviews }: ProductReviewsProps) {
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [newReview, setNewReview] = useState({
    customerName: '',
    customerEmail: '',
    rating: 5,
    title: '',
    comment: '',
    images: [] as string[],
    video: null as string | null
  });
  const [purchaseVerification, setPurchaseVerification] = useState({
    orderId: '',
    email: '',
    verified: false
  });
  const [sortBy, setSortBy] = useState<'newest' | 'oldest' | 'highest' | 'lowest'>('newest');
  const [filterRating, setFilterRating] = useState<number | null>(null);

  const productReviews = reviews.filter(review => review.productId === productId);

  const sortedReviews = [...productReviews].sort((a, b) => {
    switch (sortBy) {
      case 'newest':
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case 'oldest':
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case 'highest':
        return b.rating - a.rating;
      case 'lowest':
        return a.rating - b.rating;
      default:
        return 0;
    }
  });

  const filteredReviews = filterRating 
    ? sortedReviews.filter(review => review.rating === filterRating)
    : sortedReviews;

  const averageRating = productReviews.length > 0 
    ? productReviews.reduce((sum, review) => sum + review.rating, 0) / productReviews.length 
    : 0;

  const ratingDistribution = [5, 4, 3, 2, 1].map(rating => ({
    rating,
    count: productReviews.filter(r => r.rating === rating).length,
    percentage: productReviews.length > 0 
      ? (productReviews.filter(r => r.rating === rating).length / productReviews.length) * 100 
      : 0
  }));

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    if (files.length > 0) {
      const newImages: string[] = [];
      files.forEach(file => {
        const reader = new FileReader();
        reader.onload = (event) => {
          newImages.push(event.target?.result as string);
          if (newImages.length === files.length) {
            setNewReview(prev => ({ ...prev, images: [...prev.images, ...newImages] }));
          }
        };
        reader.readAsDataURL(file);
      });
    }
  };

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setNewReview(prev => ({ ...prev, video: event.target?.result as string }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handlePurchaseVerification = () => {
    if (purchaseVerification.orderId && purchaseVerification.email) {
      // In a real app, this would verify with the backend
      setPurchaseVerification(prev => ({ ...prev, verified: true }));
      alert('Purchase verified! You can now write a review.');
    } else {
      alert('Please enter both Order ID and Email for verification.');
    }
  };

  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!purchaseVerification.verified) {
      alert('Please verify your purchase first before writing a review.');
      return;
    }
    
    if (newReview.customerName && newReview.title && newReview.comment) {
      // Create new review object
      const newReviewData = {
        id: Date.now().toString(),
        productId: productId,
        customerName: newReview.customerName,
        customerEmail: newReview.customerEmail,
        rating: newReview.rating,
        title: newReview.title,
        comment: newReview.comment,
        images: newReview.images,
        video: newReview.video,
        verified: true, // Verified because purchase was verified
        helpful: 0,
        date: new Date().toISOString().split('T')[0]
      };
      
      // In a real app, this would submit to the backend
      console.log('New review submitted:', newReviewData);
      alert('Thank you for your review! It has been published.');
      
      setShowReviewForm(false);
      setNewReview({
        customerName: '',
        customerEmail: '',
        rating: 5,
        title: '',
        comment: '',
        images: [],
        video: null
      });
      setPurchaseVerification({
        orderId: '',
        email: '',
        verified: false
      });
    }
  };

  return (
    <div className="space-y-8">
      {/* Reviews Header */}
      <div className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 mb-3">Customer Reviews</h2>
            <div className="flex items-center gap-6">
              <div className="flex items-center gap-3">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-6 h-6 ${
                        i < Math.floor(averageRating) ? 'text-yellow-400 fill-current' : 'text-gray-300'
                      }`}
                    />
                  ))}
                </div>
                <span className="text-3xl font-bold text-gray-900">{averageRating.toFixed(1)}</span>
              </div>
              <div className="h-8 w-px bg-gray-300"></div>
              <span className="text-lg text-gray-600 font-medium">{productReviews.length} reviews</span>
            </div>
          </div>
          <button
            onClick={() => setShowReviewForm(true)}
            className="inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
          >
            <MessageSquare className="w-6 h-6" />
            Write a Review
          </button>
        </div>

        {/* Rating Distribution */}
        <div className="mt-8">
          <h3 className="text-xl font-semibold text-gray-900 mb-6">Rating Distribution</h3>
          <div className="space-y-3">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center gap-4">
                <span className="text-sm font-bold text-gray-700 w-8">{rating}</span>
                <Star className="w-5 h-5 text-yellow-400 fill-current" />
                <div className="flex-1 bg-gray-200 rounded-full h-3 shadow-inner">
                  <div 
                    className="bg-gradient-to-r from-yellow-400 to-amber-400 h-3 rounded-full transition-all duration-500 shadow-sm"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-sm font-bold text-gray-700 w-8">{count}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="bg-white rounded-2xl p-6 shadow-lg border border-gray-100">
        <div className="flex flex-col sm:flex-row gap-6">
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-3">Sort by</label>
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value as any)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 hover:bg-white"
            >
              <option value="newest">Newest First</option>
              <option value="oldest">Oldest First</option>
              <option value="highest">Highest Rating</option>
              <option value="lowest">Lowest Rating</option>
            </select>
          </div>
          <div className="flex-1">
            <label className="block text-sm font-bold text-gray-700 mb-3">Filter by rating</label>
            <select
              value={filterRating || ''}
              onChange={(e) => setFilterRating(e.target.value ? parseInt(e.target.value) : null)}
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 bg-gray-50 hover:bg-white"
            >
              <option value="">All Ratings</option>
              <option value="5">5 Stars</option>
              <option value="4">4 Stars</option>
              <option value="3">3 Stars</option>
              <option value="2">2 Stars</option>
              <option value="1">1 Star</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-8">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-2xl p-8 shadow-lg border border-gray-100 hover:shadow-xl transition-all duration-300">
            <div className="flex items-start justify-between mb-6">
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gradient-to-br from-yellow-100 to-amber-100 rounded-full flex items-center justify-center shadow-md">
                  <span className="text-yellow-700 font-bold text-lg">
                    {review.customerName.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-2">
                    <h4 className="font-bold text-gray-900 text-lg">{review.customerName}</h4>
                    {review.verified && (
                      <span className="inline-flex items-center gap-2 px-3 py-1 bg-green-100 text-green-700 text-sm font-bold rounded-full shadow-sm">
                        <CheckCircle className="w-4 h-4" />
                        Verified Purchase
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-5 h-5 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className="text-sm text-gray-600 font-medium">{new Date(review.date).toLocaleDateString()}</span>
                  </div>
                </div>
              </div>
              <div className="flex items-center gap-2 text-sm text-gray-600 bg-gray-50 px-3 py-2 rounded-full">
                <ThumbsUp className="w-4 h-4" />
                <span className="font-medium">{review.helpful} helpful</span>
              </div>
            </div>

            <h3 className="font-bold text-gray-900 text-xl mb-3">{review.title}</h3>
            <p className="text-gray-700 text-lg leading-relaxed mb-6">{review.comment}</p>

            {/* Review Media */}
            {(review.images.length > 0 || review.video) && (
              <div className="mb-6">
                <h4 className="text-sm font-bold text-gray-700 mb-3">Customer Photos & Videos</h4>
                <div className="flex flex-wrap gap-4">
                  {review.images.map((image, index) => (
                    <div key={index} className="relative group">
                      <img
                        src={image}
                        alt={`Review image ${index + 1}`}
                        className="w-24 h-24 object-cover rounded-xl border-2 border-gray-200 cursor-pointer hover:border-yellow-400 transition-all duration-300 shadow-md hover:shadow-lg"
                      />
                      <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 rounded-xl transition-all duration-300 flex items-center justify-center">
                        <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                          <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  ))}
                  {review.video && (
                    <div className="relative w-24 h-24 bg-gradient-to-br from-gray-100 to-gray-200 rounded-xl flex items-center justify-center cursor-pointer hover:from-gray-200 hover:to-gray-300 transition-all duration-300 shadow-md hover:shadow-lg border-2 border-gray-200 hover:border-yellow-400">
                      <Play className="w-8 h-8 text-gray-600" />
                    </div>
                  )}
                </div>
              </div>
            )}

            {/* Admin Response */}
            {review.adminResponse && (
              <div className="bg-gradient-to-r from-blue-50 to-indigo-50 border-l-4 border-blue-500 p-6 rounded-r-xl shadow-md">
                <div className="flex items-center gap-3 mb-3">
                  <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
                    <svg className="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <span className="font-bold text-blue-900">Admin Response</span>
                    <div className="flex items-center gap-2 text-sm text-blue-600">
                      <span>by {review.adminResponse.adminName}</span>
                      <span>•</span>
                      <span>{new Date(review.adminResponse.date).toLocaleDateString()}</span>
                    </div>
                  </div>
                </div>
                <p className="text-blue-800 text-lg leading-relaxed">{review.adminResponse.response}</p>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Review Form Modal */}
      {showReviewForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl max-h-[90vh] overflow-y-auto">
            <h3 className="text-2xl font-bold text-gray-900 mb-6">Write a Review</h3>
            
            {/* Purchase Verification Section */}
            {!purchaseVerification.verified ? (
              <div className="bg-gradient-to-r from-yellow-50 to-amber-50 border-2 border-yellow-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-10 h-10 bg-yellow-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h4 className="text-lg font-bold text-yellow-800">Verify Your Purchase</h4>
                </div>
                <p className="text-yellow-700 mb-4">To write a review, please verify that you have purchased this product.</p>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Order ID *</label>
                    <input
                      type="text"
                      value={purchaseVerification.orderId}
                      onChange={(e) => setPurchaseVerification(prev => ({ ...prev, orderId: e.target.value }))}
                      placeholder="Enter your order ID"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-gray-700 mb-2">Email Address *</label>
                    <input
                      type="email"
                      value={purchaseVerification.email}
                      onChange={(e) => setPurchaseVerification(prev => ({ ...prev, email: e.target.value }))}
                      placeholder="Enter your email"
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                      required
                    />
                  </div>
                </div>
                <button
                  type="button"
                  onClick={handlePurchaseVerification}
                  className="mt-4 px-6 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl"
                >
                  Verify Purchase
                </button>
              </div>
            ) : (
              <div className="bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 rounded-2xl p-6 mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center">
                    <svg className="w-6 h-6 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <div>
                    <h4 className="text-lg font-bold text-green-800">Purchase Verified!</h4>
                    <p className="text-green-700">You can now write your review.</p>
                  </div>
                </div>
              </div>
            )}

            <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg mb-6">
              <p className="text-sm text-blue-800">
                <strong>Review Guidelines:</strong> Please share your honest experience with this product. 
                Photos and videos help other customers make informed decisions.
              </p>
            </div>
            <form onSubmit={handleSubmitReview} className="space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Your Name *</label>
                  <input
                    type="text"
                    value={newReview.customerName}
                    onChange={(e) => setNewReview(prev => ({ ...prev, customerName: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                    required
                  />
                </div>
                <div>
                  <label className="block text-sm font-bold text-gray-700 mb-3">Email</label>
                  <input
                    type="email"
                    value={newReview.customerEmail}
                    onChange={(e) => setNewReview(prev => ({ ...prev, customerEmail: e.target.value }))}
                    className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Rating *</label>
                <div className="flex items-center gap-2">
                  {[...Array(5)].map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => setNewReview(prev => ({ ...prev, rating: i + 1 }))}
                      className={`w-12 h-12 transition-all duration-300 hover:scale-110 ${
                        i < newReview.rating ? 'text-yellow-400 fill-current' : 'text-gray-300 hover:text-yellow-300'
                      }`}
                    >
                      <Star className="w-full h-full" />
                    </button>
                  ))}
                  <span className="ml-3 text-lg font-bold text-gray-700">{newReview.rating}/5</span>
                </div>
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Review Title *</label>
                <input
                  type="text"
                  value={newReview.title}
                  onChange={(e) => setNewReview(prev => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-bold text-gray-700 mb-3">Your Review *</label>
                <textarea
                  value={newReview.comment}
                  onChange={(e) => setNewReview(prev => ({ ...prev, comment: e.target.value }))}
                  rows={4}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-yellow-500 focus:border-yellow-500 transition-all duration-300 resize-none"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Photos (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                  <input
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={handleImageUpload}
                    className="hidden"
                    id="image-upload"
                  />
                  <label
                    htmlFor="image-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Click to upload photos</p>
                    <p className="text-xs text-gray-400">You can upload multiple images</p>
                  </label>
                </div>
                {newReview.images.length > 0 && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Photos ({newReview.images.length})</p>
                    <div className="grid grid-cols-4 gap-2">
                      {newReview.images.map((image, index) => (
                        <div key={index} className="relative">
                          <img
                            src={image}
                            alt={`Upload ${index + 1}`}
                            className="w-full h-20 object-cover rounded-lg border"
                          />
                          <button
                            type="button"
                            onClick={() => {
                              const newImages = newReview.images.filter((_, i) => i !== index);
                              setNewReview(prev => ({ ...prev, images: newImages }));
                            }}
                            className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                          >
                            <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                            </svg>
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Upload Video (Optional)</label>
                <div className="border-2 border-dashed border-gray-300 rounded-lg p-4 hover:border-yellow-400 transition-colors">
                  <input
                    type="file"
                    accept="video/*"
                    onChange={handleVideoUpload}
                    className="hidden"
                    id="video-upload"
                  />
                  <label
                    htmlFor="video-upload"
                    className="flex flex-col items-center justify-center cursor-pointer"
                  >
                    <div className="w-12 h-12 bg-yellow-100 rounded-full flex items-center justify-center mb-2">
                      <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 10l4.553-2.276A1 1 0 0121 8.618v6.764a1 1 0 01-1.447.894L15 14M5 18h8a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v8a2 2 0 002 2z" />
                      </svg>
                    </div>
                    <p className="text-sm text-gray-600">Click to upload video</p>
                    <p className="text-xs text-gray-400">MP4, MOV, AVI formats supported</p>
                  </label>
                </div>
                {newReview.video && (
                  <div className="mt-3">
                    <p className="text-sm font-medium text-gray-700 mb-2">Uploaded Video</p>
                    <div className="relative">
                      <video
                        src={newReview.video}
                        controls
                        className="w-full max-w-md rounded-lg"
                      />
                      <button
                        type="button"
                        onClick={() => setNewReview(prev => ({ ...prev, video: null }))}
                        className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 hover:bg-red-600 transition-colors"
                      >
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                        </svg>
                      </button>
                    </div>
                  </div>
                )}
              </div>

              <div className="flex justify-end gap-4 pt-4">
                <button
                  type="button"
                  onClick={() => setShowReviewForm(false)}
                  className="px-6 py-3 text-gray-600 border-2 border-gray-300 rounded-xl hover:bg-gray-50 transition-all duration-300 font-bold"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-yellow-500 to-amber-500 text-white font-bold rounded-xl hover:from-yellow-600 hover:to-amber-600 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:scale-105"
                >
                  Submit Review
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
