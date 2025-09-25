import { useState } from 'react';
import { Star, ThumbsUp, MessageSquare, Video, CheckCircle, XCircle, Trash2, Reply, Search } from 'lucide-react';
import type { ProductReview } from '../../lib/products';
import { productReviews } from '../../lib/products';

export default function AdminReviews() {
  const [reviews, setReviews] = useState<ProductReview[]>(productReviews);
  const [filter, setFilter] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedReview, setSelectedReview] = useState<ProductReview | null>(null);
  const [adminResponse, setAdminResponse] = useState('');
  const [showResponseModal, setShowResponseModal] = useState(false);

  const filteredReviews = reviews.filter(review => {
    const matchesFilter = filter === 'all' || 
      (filter === 'verified' && review.verified) ||
      (filter === 'unverified' && !review.verified) ||
      (filter === 'responded' && review.adminResponse) ||
      (filter === 'pending' && !review.adminResponse);
    
    const matchesSearch = review.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      review.comment.toLowerCase().includes(searchTerm.toLowerCase());
    
    return matchesFilter && matchesSearch;
  });

  const handleDeleteReview = (reviewId: string) => {
    if (window.confirm('Are you sure you want to delete this review?')) {
      setReviews(prev => prev.filter(review => review.id !== reviewId));
    }
  };

  const handleToggleVerification = (reviewId: string) => {
    setReviews(prev => prev.map(review => 
      review.id === reviewId 
        ? { ...review, verified: !review.verified }
        : review
    ));
  };

  const handleAddResponse = (review: ProductReview) => {
    setSelectedReview(review);
    setAdminResponse(review.adminResponse?.response || '');
    setShowResponseModal(true);
  };

  const handleSubmitResponse = () => {
    if (selectedReview && adminResponse.trim()) {
      setReviews(prev => prev.map(review => 
        review.id === selectedReview.id 
          ? { 
              ...review, 
              adminResponse: {
                response: adminResponse,
                adminName: 'Admin Team',
                date: new Date().toISOString().split('T')[0]
              }
            }
          : review
      ));
      setShowResponseModal(false);
      setAdminResponse('');
      setSelectedReview(null);
    }
  };

  const getRatingColor = (rating: number) => {
    if (rating >= 4) return 'text-green-600';
    if (rating >= 3) return 'text-yellow-600';
    return 'text-red-600';
  };

  const getFilterStats = () => {
    return {
      total: reviews.length,
      verified: reviews.filter(r => r.verified).length,
      unverified: reviews.filter(r => !r.verified).length,
      responded: reviews.filter(r => r.adminResponse).length,
      pending: reviews.filter(r => !r.adminResponse).length
    };
  };

  const stats = getFilterStats();

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Product Reviews Management</h1>
        <p className="text-gray-600 mt-2">Manage customer reviews, respond to feedback, and moderate content</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Total Reviews</p>
              <p className="text-2xl font-bold text-gray-900">{stats.total}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Verified</p>
              <p className="text-2xl font-bold text-green-600">{stats.verified}</p>
            </div>
            <CheckCircle className="w-8 h-8 text-green-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Unverified</p>
              <p className="text-2xl font-bold text-yellow-600">{stats.unverified}</p>
            </div>
            <XCircle className="w-8 h-8 text-yellow-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Responded</p>
              <p className="text-2xl font-bold text-blue-600">{stats.responded}</p>
            </div>
            <Reply className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        <div className="bg-white rounded-lg p-4 shadow-sm border">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-gray-600">Pending</p>
              <p className="text-2xl font-bold text-red-600">{stats.pending}</p>
            </div>
            <MessageSquare className="w-8 h-8 text-red-600" />
          </div>
        </div>
      </div>

      {/* Filters and Search */}
      <div className="bg-white rounded-lg p-6 shadow-sm border">
        <div className="flex flex-col sm:flex-row gap-4">
          <div className="flex-1">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search reviews by customer name, title, or comment..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>
          <div className="flex gap-2">
            <select
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
              className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="all">All Reviews</option>
              <option value="verified">Verified</option>
              <option value="unverified">Unverified</option>
              <option value="responded">Responded</option>
              <option value="pending">Pending Response</option>
            </select>
          </div>
        </div>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {filteredReviews.map((review) => (
          <div key={review.id} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow">
            <div className="flex flex-col lg:flex-row lg:items-start gap-4">
              {/* Review Content */}
              <div className="flex-1">
                <div className="flex items-start justify-between mb-3">
                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1">
                      {[...Array(5)].map((_, i) => (
                        <Star
                          key={i}
                          className={`w-4 h-4 ${
                            i < review.rating ? 'text-yellow-400 fill-current' : 'text-gray-300'
                          }`}
                        />
                      ))}
                    </div>
                    <span className={`font-semibold ${getRatingColor(review.rating)}`}>
                      {review.rating}/5
                    </span>
                    {review.verified && (
                      <span className="inline-flex items-center gap-1 px-2 py-1 bg-green-100 text-green-700 text-xs rounded-full">
                        <CheckCircle className="w-3 h-3" />
                        Verified
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => handleToggleVerification(review.id)}
                      className={`p-2 rounded-lg transition-colors ${
                        review.verified 
                          ? 'bg-green-100 text-green-600 hover:bg-green-200' 
                          : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                      }`}
                      title={review.verified ? 'Mark as unverified' : 'Mark as verified'}
                    >
                      {review.verified ? <CheckCircle className="w-4 h-4" /> : <XCircle className="w-4 h-4" />}
                    </button>
                    <button
                      onClick={() => handleAddResponse(review)}
                      className="p-2 bg-blue-100 text-blue-600 rounded-lg hover:bg-blue-200 transition-colors"
                      title="Add admin response"
                    >
                      <Reply className="w-4 h-4" />
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review.id)}
                      className="p-2 bg-red-100 text-red-600 rounded-lg hover:bg-red-200 transition-colors"
                      title="Delete review"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <h3 className="font-semibold text-gray-900 mb-2">{review.title}</h3>
                <p className="text-gray-700 mb-3">{review.comment}</p>

                {/* Review Media */}
                {(review.images.length > 0 || review.video) && (
                  <div className="mb-3">
                    <div className="flex flex-wrap gap-2">
                      {review.images.map((image, index) => (
                        <img
                          key={index}
                          src={image}
                          alt={`Review image ${index + 1}`}
                          className="w-16 h-16 object-cover rounded-lg border"
                        />
                      ))}
                      {review.video && (
                        <div className="w-16 h-16 bg-gray-100 rounded-lg flex items-center justify-center">
                          <Video className="w-6 h-6 text-gray-600" />
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* Customer Info */}
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-3">
                  <span className="font-medium">{review.customerName}</span>
                  <span>•</span>
                  <span>{new Date(review.date).toLocaleDateString()}</span>
                  <span>•</span>
                  <div className="flex items-center gap-1">
                    <ThumbsUp className="w-3 h-3" />
                    <span>{review.helpful} helpful</span>
                  </div>
                </div>

                {/* Admin Response */}
                {review.adminResponse && (
                  <div className="bg-blue-50 border-l-4 border-blue-400 p-4 rounded-r-lg">
                    <div className="flex items-center gap-2 mb-2">
                      <span className="font-semibold text-blue-900">Admin Response</span>
                      <span className="text-sm text-blue-600">by {review.adminResponse.adminName}</span>
                      <span className="text-sm text-blue-600">•</span>
                      <span className="text-sm text-blue-600">{new Date(review.adminResponse.date).toLocaleDateString()}</span>
                    </div>
                    <p className="text-blue-800">{review.adminResponse.response}</p>
                  </div>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Admin Response Modal */}
      {showResponseModal && selectedReview && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg p-6 w-full max-w-2xl">
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Add Admin Response</h3>
            <div className="mb-4">
              <p className="text-sm text-gray-600 mb-2">Responding to review by {selectedReview.customerName}:</p>
              <p className="text-gray-800 italic">"{selectedReview.comment}"</p>
            </div>
            <textarea
              value={adminResponse}
              onChange={(e) => setAdminResponse(e.target.value)}
              placeholder="Write your response here..."
              className="w-full h-32 p-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
            />
            <div className="flex justify-end gap-3 mt-4">
              <button
                onClick={() => setShowResponseModal(false)}
                className="px-4 py-2 text-gray-600 border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSubmitResponse}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Submit Response
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
