import { useState, useRef } from "react";
import { Upload, User, Star, Trash2, Edit, Save, X } from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface AstrologerForm {
  id: string;
  name: string;
  skills: string;
  rate: string;
  image: string | null;
  rating: number;
  experience: string;
  language: string;
}

export default function AdminAstrologers() {
  const [form, setForm] = useState<Omit<AstrologerForm, 'id' | 'rating'>>({ 
    name: "", 
    skills: "", 
    rate: "", 
    image: null,
    experience: "",
    language: ""
  });
  const [list, setList] = useState<AstrologerForm[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<AstrologerForm | null>(null);
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
    
    const newAstrologer: AstrologerForm = {
      id: Date.now().toString(),
      ...form,
      rating: 4.5 + Math.random() * 0.5, // Random rating between 4.5-5.0
    };
    
    setList(prev => [...prev, newAstrologer]);
    setForm({ name: "", skills: "", rate: "", image: null, experience: "", language: "" });
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleEdit = (astrologer: AstrologerForm) => {
    setEditingId(astrologer.id);
    setEditingForm({ ...astrologer });
  };

  const handleSaveEdit = () => {
    if (!editingForm) return;
    setList(prev => prev.map(a => a.id === editingId ? editingForm : a));
    setEditingId(null);
    setEditingForm(null);
  };

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(a => a.id !== id));
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${gradHead}`}>Manage Astrologers</h1>
        <p className="text-gray-600 mt-2">Add and manage astrologer profiles for your platform</p>
      </div>

      {/* Add Form */}
      <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Astrologer</h2>
        <form onSubmit={handleAdd} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Name *</label>
            <input 
              placeholder="Astrologer Name" 
              value={form.name} 
              onChange={e=>setForm({ ...form, name: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Rate (₹/min) *</label>
            <input 
              placeholder="e.g., 25" 
              value={form.rate} 
              onChange={e=>setForm({ ...form, rate: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Experience *</label>
            <input 
              placeholder="e.g., 15+ years" 
              value={form.experience} 
              onChange={e=>setForm({ ...form, experience: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Languages *</label>
            <input 
              placeholder="e.g., Hindi, English" 
              value={form.language} 
              onChange={e=>setForm({ ...form, language: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Skills *</label>
            <input 
              placeholder="e.g., Vedic Astrology, Palm Reading, Numerology" 
              value={form.skills} 
              onChange={e=>setForm({ ...form, skills: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Profile Photo</label>
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
                Upload Photo
              </button>
              {form.image && (
                <div className="flex items-center gap-2">
                  <img src={form.image} alt="Preview" className="w-12 h-12 rounded-full object-cover" />
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
              <User className="w-5 h-5" />
              Add Astrologer
            </button>
          </div>
        </form>
      </div>

      {/* Astrologers List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Astrologers ({list.length})</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((astrologer) => (
            <div key={astrologer.id} className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300 hover:scale-105">
              {editingId === astrologer.id ? (
                <div className="space-y-3">
                  <input
                    value={editingForm?.name || ''}
                    onChange={e => setEditingForm({ ...editingForm!, name: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
                  <input
                    value={editingForm?.rate || ''}
                    onChange={e => setEditingForm({ ...editingForm!, rate: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-2"
                  />
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
                    {astrologer.image ? (
                      <img src={astrologer.image} alt={astrologer.name} className="w-16 h-16 rounded-full object-cover" />
                    ) : (
                      <div className="w-16 h-16 rounded-full bg-gray-200 flex items-center justify-center">
                        <User className="w-8 h-8 text-gray-400" />
                      </div>
                    )}
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{astrologer.name}</h3>
                      <div className="flex items-center gap-1">
                        <Star className="w-4 h-4 text-yellow-500 fill-current" />
                        <span className="text-sm text-gray-600">{astrologer.rating.toFixed(1)}</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-2 text-sm text-gray-600">
                    <p><span className="font-medium">Rate:</span> ₹{astrologer.rate}/min</p>
                    <p><span className="font-medium">Experience:</span> {astrologer.experience}</p>
                    <p><span className="font-medium">Languages:</span> {astrologer.language}</p>
                    <p><span className="font-medium">Skills:</span> {astrologer.skills}</p>
                  </div>
                  
                  <div className="flex gap-2 mt-4">
                    <button
                      onClick={() => handleEdit(astrologer)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(astrologer.id)}
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
    </div>
  );
}


