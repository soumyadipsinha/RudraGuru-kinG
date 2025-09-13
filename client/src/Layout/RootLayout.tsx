// src/layout/RootLayout.tsx
import { Outlet } from "react-router-dom";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";


export default function RootLayout() {
  return (
    <div className="min-h-screen flex flex-col">
      <Navbar/>
      <main className="flex-1">
        <Outlet />
      </main>
      <Footer />
    </div>
  );
}