import { useState, useRef } from "react";
import { Upload, Package, Edit, Trash2, Save, X, Eye, Tag } from "lucide-react";
import { products as existingProducts } from "../../lib/products";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

// Local interface to avoid import issues
interface ProductItem {
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
  weight?: string;
  origin?: string;
  certification?: string;
  mukhi?: string;
  size?: string;
  beads?: string;
  material?: string;
}

interface ProductForm {
  id: string;
  name: string;
  price: string;
  originalPrice: string;
  category: "gemstones" | "rudraksha" | "bracelets" | "mala";
  subcategory: string;
  image: string | null;
  description: string;
  benefits: string;
  weight?: string;
  origin?: string;
  certification?: string;
  mukhi?: string;
  size?: string;
  beads?: string;
  material?: string;
  inStock: boolean;
}

export default function AdminProducts() {
  const [form, setForm] = useState<Omit<ProductForm, 'id'>>({ 
    name: "", 
    price: "", 
    originalPrice: "",
    category: "gemstones",
    subcategory: "rashi-ratna",
    image: null,
    description: "",
    benefits: "",
    weight: "",
    origin: "",
    certification: "",
    mukhi: "",
    size: "",
    beads: "",
    material: "",
    inStock: true
  });
  const [list, setList] = useState<ProductForm[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<ProductForm | null>(null);
  const [showExisting, setShowExisting] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (event) => {
        setForm({ ...form, image: event.target?.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    
    const newProduct: ProductForm = {
      id: Date.now().toString(),
      ...form,
    };
    
    setList(prev => [...prev, newProduct]);
    setForm({ 
      name: "", 
      price: "", 
      originalPrice: "",
      category: "gemstones",
      subcategory: "rashi-ratna",
      image: null,
      description: "",
      benefits: "",
      weight: "",
      origin: "",
      certification: "",
      mukhi: "",
      size: "",
      beads: "",
      material: "",
      inStock: true
    });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (product: ProductForm) => {
    setEditingId(product.id);
    setEditingForm({ ...product });
  };

  const handleSaveEdit = () => {
    if (!editingForm) return;
    setList(prev => prev.map(p => p.id === editingId ? editingForm : p));
    setEditingId(null);
    setEditingForm(null);
  };

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(p => p.id !== id));
  };

  const getCategoryLabel = (category: string) => {
    switch (category) {
      case "gemstones": return "Gemstones";
      case "rudraksha": return "Rudraksha";
      case "bracelets": return "Bracelets";
      case "mala": return "Mala";
      default: return category;
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${gradHead}`}>Manage Products</h1>
          <p className="text-gray-600 mt-2">Add and manage products for Store and Astromall</p>
        </div>
        <button
          onClick={() => setShowExisting(!showExisting)}
          className="flex items-center gap-2 px-4 py-2 rounded-md bg-blue-500 text-white hover:bg-blue-600 transition-all duration-300"
        >
          <Eye className="w-4 h-4" />
          {showExisting ? 'Hide' : 'Show'} Existing Products
        </button>
      </div>

      {/* Add Form */}
      <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Product</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Name *</label>
            <input 
              placeholder="e.g., Yellow Sapphire (Pukhraj)" 
              value={form.name} 
              onChange={e=>setForm({ ...form, name: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Category *</label>
            <select 
              value={form.category} 
              onChange={e=>setForm({ ...form, category: e.target.value as any })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="gemstones">Gemstones</option>
              <option value="rudraksha">Rudraksha</option>
              <option value="bracelets">Bracelets</option>
              <option value="mala">Mala</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price (₹) *</label>
            <input 
              placeholder="e.g., 25000" 
              value={form.price} 
              onChange={e=>setForm({ ...form, price: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Original Price (₹)</label>
            <input 
              placeholder="e.g., 31250" 
              value={form.originalPrice} 
              onChange={e=>setForm({ ...form, originalPrice: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Subcategory</label>
            <input 
              placeholder="e.g., rashi-ratna, nepali, chakra" 
              value={form.subcategory} 
              onChange={e=>setForm({ ...form, subcategory: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Weight/Size</label>
            <input 
              placeholder="e.g., 2.5 Carats, 12-14mm" 
              value={form.weight || form.size || ""} 
              onChange={e=>setForm({ ...form, weight: e.target.value, size: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Origin</label>
            <input 
              placeholder="e.g., Sri Lanka, Nepal" 
              value={form.origin || ""} 
              onChange={e=>setForm({ ...form, origin: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Certification</label>
            <input 
              placeholder="e.g., IGI Certified, GIA Certified" 
              value={form.certification || ""} 
              onChange={e=>setForm({ ...form, certification: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description *</label>
            <textarea 
              placeholder="Product description..." 
              value={form.description} 
              onChange={e=>setForm({ ...form, description: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-24"
              required
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Benefits (comma separated)</label>
            <input 
              placeholder="e.g., Wealth & Prosperity, Wisdom & Knowledge, Spiritual Growth" 
              value={form.benefits} 
              onChange={e=>setForm({ ...form, benefits: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Product Image</label>
            <div className="flex items-center gap-4">
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleImageUpload}
                className="hidden"
              />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50 transition-all duration-300"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              {form.image && (
                <div className="flex items-center gap-2">
                  <img src={form.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                  <button
                    type="button"
                    onClick={() => setForm({ ...form, image: null })}
                    className="text-red-500 hover:text-red-700"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          
          <div className="sm:col-span-2">
            <button 
              type="submit" 
              className="inline-flex items-center gap-2 rounded-md bg-yellow-500 px-6 py-3 font-semibold text-brown-900 hover:bg-yellow-400 shadow-deep hover:shadow-deep-hover transition-all duration-300"
            >
              <Package className="w-5 h-5" />
              Add Product
            </button>
          </div>
        </form>
      </div>

      {/* New Products List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">New Products ({list.length})</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((product) => (
            <div key={product.id} className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105">
              {editingId === product.id ? (
                <div className="space-y-3">
                  <input
                    value={editingForm?.name || ''}
                    onChange={e => setEditingForm({ ...editingForm!, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                  <div className="flex gap-2">
                    <input
                      value={editingForm?.price || ''}
                      onChange={e => setEditingForm({ ...editingForm!, price: e.target.value })}
                      className="flex-1 rounded-md border border-gray-300 p-2"
                      placeholder="Price"
                    />
                    <input
                      value={editingForm?.originalPrice || ''}
                      onChange={e => setEditingForm({ ...editingForm!, originalPrice: e.target.value })}
                      className="flex-1 rounded-md border border-gray-300 p-2"
                      placeholder="Original Price"
                    />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={handleSaveEdit}
                      className="flex-1 flex items-center justify-center gap-1 rounded-md bg-green-500 px-3 py-2 text-white hover:bg-green-600 transition-all duration-300"
                    >
                      <Save className="w-4 h-4" />
                      Save
                    </button>
                    <button
                      onClick={() => setEditingId(null)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-md bg-gray-500 px-3 py-2 text-white hover:bg-gray-600 transition-all duration-300"
                    >
                      <X className="w-4 h-4" />
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <>
                  <div className="flex items-center gap-4 mb-4">
                    {product.image ? (
                      <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-lg bg-gray-200 flex items-center justify-center">
                        <Package className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{product.name}</h3>
                      <div className="flex items-center gap-2">
                        <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                          {getCategoryLabel(product.category)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                          {product.inStock ? 'In Stock' : 'Out of Stock'}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">Price:</span>
                      <span className="text-lg font-bold text-green-600">₹{product.price}</span>
                      {product.originalPrice && (
                        <span className="text-sm text-gray-500 line-through">₹{product.originalPrice}</span>
                      )}
                    </div>
                    {product.weight && <p><span className="font-medium">Weight:</span> {product.weight}</p>}
                    {product.origin && <p><span className="font-medium">Origin:</span> {product.origin}</p>}
                    {product.certification && <p><span className="font-medium">Certification:</span> {product.certification}</p>}
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(product)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-md bg-red-500 px-3 py-2 text-white hover:bg-red-600 transition-all duration-300"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Existing Products */}
      {showExisting && (
        <div>
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Existing Products ({existingProducts.length})</h2>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {existingProducts.slice(0, 12).map((product) => (
              <div key={product.id} className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105">
                <div className="flex items-center gap-4 mb-4">
                  <img src={product.image} alt={product.name} className="w-16 h-16 rounded-lg object-cover" />
                  <div className="flex-1">
                    <h3 className="font-semibold text-gray-900">{product.name}</h3>
                    <div className="flex items-center gap-2">
                      <span className="text-xs bg-yellow-100 text-yellow-700 px-2 py-1 rounded-full">
                        {getCategoryLabel(product.category)}
                      </span>
                      <span className={`text-xs px-2 py-1 rounded-full ${product.inStock ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {product.inStock ? 'In Stock' : 'Out of Stock'}
                      </span>
                    </div>
                  </div>
                </div>
                
                <div className="space-y-2 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">Price:</span>
                    <span className="text-lg font-bold text-green-600">₹{product.price.toLocaleString()}</span>
                    {product.originalPrice && (
                      <span className="text-sm text-gray-500 line-through">₹{product.originalPrice.toLocaleString()}</span>
                    )}
                  </div>
                  {product.weight && <p><span className="font-medium">Weight:</span> {product.weight}</p>}
                  {product.origin && <p><span className="font-medium">Origin:</span> {product.origin}</p>}
                  {product.certification && <p><span className="font-medium">Certification:</span> {product.certification}</p>}
                </div>
                
                <div className="mt-4">
                  <button className="w-full flex items-center justify-center gap-2 rounded-md bg-gray-500 px-3 py-2 text-white hover:bg-gray-600 transition-all duration-300">
                    <Eye className="w-4 h-4" />
                    View in Store
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}


