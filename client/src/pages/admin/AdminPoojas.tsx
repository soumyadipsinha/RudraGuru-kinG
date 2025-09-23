import { useEffect, useRef, useState } from "react";
import { Upload, Trash2, X, CalendarDays, IndianRupee, Image as ImageIcon } from "lucide-react";

interface PoojaItem {
  id: string;
  title: string;
  description: string;
  date: string;
  price: string;
  image: string;
}

const STORAGE_KEY = "poojas";
const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

export default function AdminPoojas() {
  const [poojas, setPoojas] = useState<PoojaItem[]>([]);
  const [form, setForm] = useState<Omit<PoojaItem, "id">>({
    title: "",
    description: "",
    date: "",
    price: "",
    image: "",
  });
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const data = localStorage.getItem(STORAGE_KEY);
    if (data) {
      try {
        setPoojas(JSON.parse(data));
      } catch {
        setPoojas([]);
      }
    }
  }, []);

  const persist = (next: PoojaItem[]) => {
    setPoojas(next);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = typeof reader.result === 'string' ? reader.result : '';
      setForm((prev) => ({ ...prev, image: result }));
    };
    reader.readAsDataURL(file);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    const newItem: PoojaItem = { id: crypto.randomUUID(), ...form };
    persist([newItem, ...poojas]);
    setForm({ title: "", description: "", date: "", price: "", image: "" });
  };

  const remove = (id: string) => {
    persist(poojas.filter((p) => p.id !== id));
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className={`text-3xl font-bold ${gradHead}`}>Manage Poojas</h1>
          <p className="text-gray-600 mt-2">Add and manage Pooja offerings</p>
        </div>
      </div>

      <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Add New Pooja</h2>
        <form onSubmit={handleSubmit} className="grid gap-4 sm:grid-cols-2">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Pooja Title *</label>
            <input
              name="title"
              value={form.title}
              onChange={handleChange}
              placeholder="e.g., Satyanarayan Pooja"
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent"
              required
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Date</label>
            <div className="relative">
              <input
                name="date"
                value={form.date}
                onChange={handleChange}
                placeholder="e.g., 25 Oct 2025"
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent pl-10"
              />
              <CalendarDays className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Price</label>
            <div className="relative">
              <input
                name="price"
                value={form.price}
                onChange={handleChange}
                placeholder="e.g., ₹2100"
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent pl-10"
              />
              <IndianRupee className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Image URL</label>
            <div className="relative">
              <input
                name="image"
                value={form.image}
                onChange={handleChange}
                placeholder="/assets/..."
                className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent pl-10"
              />
              <ImageIcon className="w-4 h-4 absolute left-3 top-3.5 text-gray-400" />
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Upload Image</label>
            <div className="flex items-center gap-4">
              <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleFile} />
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-50"
              >
                <Upload className="w-4 h-4" />
                Upload Image
              </button>
              {form.image && (
                <div className="flex items-center gap-2">
                  <img src={form.image} alt="Preview" className="w-16 h-16 rounded-lg object-cover" />
                  <button type="button" onClick={() => setForm({ ...form, image: "" })} className="text-red-500 hover:text-red-700">
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
            </div>
          </div>
          <div className="sm:col-span-2">
            <label className="block text-sm font-medium text-gray-700 mb-1">Description</label>
            <textarea
              name="description"
              value={form.description}
              onChange={handleChange}
              placeholder="Short description"
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-yellow-500 focus:border-transparent h-24"
              rows={3}
            />
          </div>
          <div className="sm:col-span-2">
            <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-yellow-500 px-6 py-3 font-semibold text-brown-900 hover:bg-yellow-400 shadow-deep">
              <Upload className="w-5 h-5" />
              Save Pooja
            </button>
          </div>
        </form>
      </div>

      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Existing Poojas ({poojas.length})</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {poojas.map((p) => (
          <div key={p.id} className="rounded-2xl p-4 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300">
            <div className="relative mb-3">
              {p.image ? (
                <img src={p.image} alt={p.title} className="w-full h-40 object-cover rounded-xl" />
              ) : (
                <div className="w-full h-40 rounded-xl bg-gray-100 flex items-center justify-center text-gray-400">No image</div>
              )}
              {p.price && <div className="absolute top-2 left-2 bg-yellow-500 text-black text-xs px-2 py-1 rounded-full">{p.price}</div>}
            </div>
            <h3 className="font-bold text-brown-900">{p.title}</h3>
            {p.date && <p className="text-sm text-gray-600">{p.date}</p>}
            {p.description && <p className="mt-1 text-sm text-brown-800 line-clamp-3">{p.description}</p>}
            <div className="mt-3 flex justify-end">
              <button onClick={() => remove(p.id)} className="flex items-center gap-1 text-red-600 hover:bg-red-50 px-3 py-1 rounded-md">
                <Trash2 className="w-4 h-4" />
                Remove
              </button>
            </div>
          </div>
        ))}
        {poojas.length === 0 && (
          <p className="text-gray-600">No poojas added yet.</p>
        )}
      </div>
    </div>
    </div>
  );
}


