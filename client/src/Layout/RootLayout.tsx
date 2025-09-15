// src/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col relative">
      {/* Background overlay for better content readability */}
      <div className="fixed inset-0 bg-white/30 backdrop-blur-sm z-0"></div>
      
      <div className="relative z-10 flex flex-col min-h-screen">
        <Navbar/>
        <main className="flex-1 pt-20 lg:pt-28">
          <Outlet />
        </main>
        <Footer />
      </div>
    </div>
  );
}