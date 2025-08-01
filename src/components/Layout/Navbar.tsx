import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { Building2, LogOut, User, Settings, Home } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const getRoleBasedNavItems = () => {
    if (!user) return [];

    switch (user.role) {
      case 'USER':
        return [
          { to: '/user/dashboard', label: 'Dashboard', icon: Home },
          { to: '/user/form', label: 'New Order', icon: Building2 },
          { to: '/user/appointments', label: 'Appointments', icon: Settings },
        ];
      case 'EMPLOYEE':
        return [
          { to: '/employee/dashboard', label: 'Dashboard', icon: Home },
          { to: '/employee/appointments', label: 'Site Visits', icon: Building2 },
          { to: '/employee/deliveries', label: 'Deliveries', icon: Settings },
        ];
      case 'ADMIN':
        return [
          { to: '/admin/dashboard', label: 'Dashboard', icon: Home },
          { to: '/admin/orders', label: 'Orders', icon: Building2 },
          { to: '/admin/vendors', label: 'Vendors', icon: Settings },
          { to: '/admin/users', label: 'Users', icon: User },
        ];
      default:
        return [];
    }
  };

  return (
    <nav className="bg-white shadow-lg border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link to="/" className="flex items-center space-x-2">
            <Building2 className="h-8 w-8 text-orange-600" />
            <span className="text-xl font-bold text-gray-900">BrickStore</span>
          </Link>

          {/* Navigation Items */}
          {user && (
            <div className="hidden md:flex items-center space-x-8">
              {getRoleBasedNavItems().map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className="flex items-center space-x-1 text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          )}

          {/* User Menu */}
          {user ? (
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <User className="h-5 w-5 text-gray-500" />
                <span className="text-sm text-gray-700">{user.name}</span>
                <span className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-full">
                  {user.role}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="flex items-center space-x-1 text-gray-700 hover:text-red-600 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                <LogOut className="h-4 w-4" />
                <span>Logout</span>
              </button>
            </div>
          ) : (
            <div className="flex items-center space-x-4">
              <Link
                to="/login"
                className="text-gray-700 hover:text-orange-600 px-3 py-2 rounded-md text-sm font-medium"
              >
                Login
              </Link>
              <Link
                to="/register"
                className="bg-orange-600 hover:bg-orange-700 text-white px-4 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Register
              </Link>
            </div>
          )}
        </div>
      </div>
    </nav>
  );
}