import { JSX } from 'react';
import { Navigate } from 'react-router-dom';
import { useAppSelector } from './redux/store';

export const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = useAppSelector((state) => state.users.auth);

  if (!isAuthenticated) {
    return <Navigate to="/sign-in" replace />;
  }

  return children;
};
