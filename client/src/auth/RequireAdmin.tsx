import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAdmin({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isAdmin = typeof window !== 'undefined' && localStorage.getItem('adminLoggedIn') === 'true';

  if (!isAdmin) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/admin/login?redirect=${redirect}`} replace />;
  }

  return children;
}


