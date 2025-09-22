import { useState } from "react";
import { Bell, Send, Clock, Users, Eye, Trash2, Edit, Save, X } from "lucide-react";

const gradHead = "inline-block bg-clip-text text-transparent bg-gradient-to-r from-yellow-500 via-yellow-600 to-amber-800";

interface NotificationForm {
  id: string;
  title: string;
  message: string;
  type: "product" | "general" | "promotion";
  status: "draft" | "sent";
  createdAt: Date;
  sentAt?: Date;
}

export default function AdminNotifications() {
  const [form, setForm] = useState<Omit<NotificationForm, 'id' | 'status' | 'createdAt'>>({ 
    title: "", 
    message: "", 
    type: "product"
  });
  const [list, setList] = useState<NotificationForm[]>([]);
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingForm, setEditingForm] = useState<NotificationForm | null>(null);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.title.trim()) return;
    
    const newNotification: NotificationForm = {
      id: Date.now().toString(),
      ...form,
      status: "draft",
      createdAt: new Date(),
    };
    
    setList(prev => [newNotification, ...prev]);
    setForm({ title: "", message: "", type: "product" });
  };

  const handleSend = (id: string) => {
    setList(prev => prev.map(n => 
      n.id === id 
        ? { ...n, status: "sent" as const, sentAt: new Date() }
        : n
    ));
  };

  const handleEdit = (notification: NotificationForm) => {
    setEditingId(notification.id);
    setEditingForm({ ...notification });
  };

  const handleSaveEdit = () => {
    if (!editingForm) return;
    setList(prev => prev.map(n => n.id === editingId ? editingForm : n));
    setEditingId(null);
    setEditingForm(null);
  };

  const handleDelete = (id: string) => {
    setList(prev => prev.filter(n => n.id !== id));
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case "product": return "bg-blue-100 text-blue-700";
      case "general": return "bg-green-100 text-green-700";
      case "promotion": return "bg-purple-100 text-purple-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "sent": return "bg-green-100 text-green-700";
      case "draft": return "bg-yellow-100 text-yellow-700";
      default: return "bg-gray-100 text-gray-700";
    }
  };

  return (
    <div className="space-y-8">
      {/* Header */}
      <div>
        <h1 className={`text-3xl font-bold ${gradHead}`}>Manage Notifications</h1>
        <p className="text-gray-600 mt-2">Create and send notifications to users about new products and updates</p>
      </div>

      {/* Stats */}
      <div className="grid gap-6 sm:grid-cols-3">
        <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-blue-100 text-blue-600">
              <Bell className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Total Notifications</p>
              <p className="text-2xl font-bold text-gray-900">{list.length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-green-100 text-green-600">
              <Send className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Sent</p>
              <p className="text-2xl font-bold text-gray-900">{list.filter(n => n.status === 'sent').length}</p>
            </div>
          </div>
        </div>
        <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
          <div className="flex items-center gap-4">
            <div className="p-3 rounded-xl bg-yellow-100 text-yellow-600">
              <Clock className="w-6 h-6" />
            </div>
            <div>
              <p className="text-sm font-medium text-gray-600">Drafts</p>
              <p className="text-2xl font-bold text-gray-900">{list.filter(n => n.status === 'draft').length}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Create Form */}
      <div className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">Create New Notification</h2>
        <form onSubmit={handleAdd} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Notification Type *</label>
            <select 
              value={form.type} 
              onChange={e=>setForm({ ...form, type: e.target.value as any })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
            >
              <option value="product">New Product Launch</option>
              <option value="general">General Update</option>
              <option value="promotion">Special Promotion</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Title *</label>
            <input 
              placeholder="e.g., New Gemstone Collection Available!" 
              value={form.title} 
              onChange={e=>setForm({ ...form, title: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">Message *</label>
            <textarea 
              placeholder="Write your notification message here..." 
              value={form.message} 
              onChange={e=>setForm({ ...form, message: e.target.value })} 
              className="w-full rounded-md border border-gray-300 p-3 focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-300 h-32"
              required
            />
          </div>
          
          <button 
            type="submit" 
            className="inline-flex items-center gap-2 rounded-md bg-yellow-500 px-6 py-3 font-semibold text-brown-900 hover:bg-yellow-400 shadow-deep hover:shadow-deep-hover transition-all duration-300"
          >
            <Bell className="w-5 h-5" />
            Create Notification
          </button>
        </form>
      </div>

      {/* Notifications List */}
      <div>
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Notifications ({list.length})</h2>
        <div className="space-y-4">
          {list.map((notification) => (
            <div key={notification.id} className="rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep hover:shadow-deep-hover transition-all duration-300">
              {editingId === notification.id ? (
                <div className="space-y-4">
                  <input
                    value={editingForm?.title || ''}
                    onChange={e => setEditingForm({ ...editingForm!, title: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-3"
                    placeholder="Title"
                  />
                  <textarea
                    value={editingForm?.message || ''}
                    onChange={e => setEditingForm({ ...editingForm!, message: e.target.value })}
                    className="w-full rounded-md border border-gray-300 p-3 h-24"
                    placeholder="Message"
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
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900 mb-2">{notification.title}</h3>
                      <p className="text-gray-600 mb-3">{notification.message}</p>
                      <div className="flex items-center gap-2">
                        <span className={`text-xs px-2 py-1 rounded-full ${getTypeColor(notification.type)}`}>
                          {notification.type.charAt(0).toUpperCase() + notification.type.slice(1)}
                        </span>
                        <span className={`text-xs px-2 py-1 rounded-full ${getStatusColor(notification.status)}`}>
                          {notification.status.charAt(0).toUpperCase() + notification.status.slice(1)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {notification.createdAt.toLocaleDateString()}
                        </span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    {notification.status === 'draft' && (
                      <button
                        onClick={() => handleSend(notification.id)}
                        className="flex-1 flex items-center justify-center gap-1 rounded-md bg-green-500 px-3 py-2 text-white hover:bg-green-600 transition-all duration-300"
                      >
                        <Send className="w-4 h-4" />
                        Send Now
                      </button>
                    )}
                    <button
                      onClick={() => handleEdit(notification)}
                      className="flex-1 flex items-center justify-center gap-1 rounded-md bg-blue-500 px-3 py-2 text-white hover:bg-blue-600 transition-all duration-300"
                    >
                      <Edit className="w-4 h-4" />
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(notification.id)}
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


