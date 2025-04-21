import { Navigate, Outlet } from 'react-router-dom';
import { toast } from 'react-toastify';
import { useState, useEffect } from 'react';

const PrivateRoute = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('access_token')


  
    setIsAuthenticated(!!token); 
  }, []);

  if (isAuthenticated === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-white dark:bg-[#221F42]">
        <div className="w-10 h-10 rounded-full bg-gray-200 dark:bg-[#1E1C3B] animate-pulse" />
      </div>
    );
  }

  if (!isAuthenticated) {
    console.log('PrivateRoute: No access token found, redirecting to /login');
    toast.error('Please log in to access this page.', {
      position: 'top-right',
      autoClose: 3000,
    });
    return <Navigate to="/login" state={{ from: window.location.pathname }} replace />;
  }

  return <Outlet />;
};

export default PrivateRoute;