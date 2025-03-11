import { Navigate, Outlet } from 'react-router-dom';

export const ProtectedRoute = () => {
  const isAuthenticated = localStorage.getItem('authToken');
  return isAuthenticated ? <Outlet /> : <Navigate to="/sign-in" replace />;
};
