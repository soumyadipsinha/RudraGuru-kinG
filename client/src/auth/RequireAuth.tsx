import type { JSX } from "react";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }: { children: JSX.Element }) {
  const location = useLocation();
  const isLoggedIn = typeof window !== 'undefined' && localStorage.getItem('isLoggedIn') === 'true';

  if (!isLoggedIn) {
    const redirect = encodeURIComponent(location.pathname + location.search);
    return <Navigate to={`/login?redirect=${redirect}`} replace />;
  }

  return children;
}


