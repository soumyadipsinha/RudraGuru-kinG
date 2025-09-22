import { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

export default function AdminLogin() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const location = useLocation();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Demo auth: replace with real API check
    if (email === "admin@rudraguru.in" && password === "admin123") {
      localStorage.setItem('adminLoggedIn', 'true');
      const redirect = new URLSearchParams(location.search).get('redirect') || '/admin';
      navigate(redirect, { replace: true });
      return;
    }
    setError("Invalid admin credentials");
  };

  return (
    <div className="min-h-screen grid place-items-center p-6">
      <form onSubmit={handleSubmit} className="w-full max-w-sm rounded-2xl p-6 bg-white/90 backdrop-blur-sm shadow-deep">
        <h1 className="text-2xl font-bold text-brown-900 mb-4">Admin Login</h1>
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <input type="email" value={email} onChange={e=>setEmail(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Password</label>
            <input type="password" value={password} onChange={e=>setPassword(e.target.value)} className="w-full rounded-md border border-gray-300 p-2 focus:ring-2 focus:ring-blue-500 focus:border-transparent"/>
          </div>
          {error && <div className="text-sm text-red-600">{error}</div>}
          <button type="submit" className="w-full rounded-md bg-yellow-500 px-4 py-2 font-semibold text-brown-900 hover:bg-yellow-400 shadow-deep">Login</button>
        </div>
      </form>
    </div>
  );
}


