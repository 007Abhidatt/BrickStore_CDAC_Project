import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  id: string;
  name: string;
  email: string;
  role: 'USER' | 'EMPLOYEE' | 'ADMIN';
  siteVerified?: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateUser: (updates: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Mock API calls - replace with actual backend endpoints
const API_BASE = 'http://localhost:8080/api';

const mockUsers = [
  { id: '1', email: 'user@brickstore.com', password: 'password', name: 'John Doe', role: 'USER' as const, siteVerified: false },
  { id: '2', email: 'employee@brickstore.com', password: 'password', name: 'Jane Smith', role: 'EMPLOYEE' as const },
  { id: '3', email: 'admin@brickstore.com', password: 'password', name: 'Admin User', role: 'ADMIN' as const },
];

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('brickstore_token');
    const userData = localStorage.getItem('brickstore_user');
    
    if (token && userData) {
      try {
        setUser(JSON.parse(userData));
      } catch (error) {
        localStorage.removeItem('brickstore_token');
        localStorage.removeItem('brickstore_user');
      }
    }
    setLoading(false);
  }, []);

  const login = async (email: string, password: string) => {
    try {
      // Mock login - replace with actual API call
      const mockUser = mockUsers.find(u => u.email === email && u.password === password);
      
      if (!mockUser) {
        throw new Error('Invalid credentials');
      }

      const userData = {
        id: mockUser.id,
        name: mockUser.name,
        email: mockUser.email,
        role: mockUser.role,
        siteVerified: mockUser.siteVerified
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('brickstore_token', mockToken);
      localStorage.setItem('brickstore_user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Login successful!');
    } catch (error) {
      toast.error('Login failed. Please check your credentials.');
      throw error;
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      // Mock registration - replace with actual API call
      const userData = {
        id: Date.now().toString(),
        name,
        email,
        role: 'USER' as const,
        siteVerified: false
      };

      const mockToken = 'mock_jwt_token_' + Date.now();
      
      localStorage.setItem('brickstore_token', mockToken);
      localStorage.setItem('brickstore_user', JSON.stringify(userData));
      setUser(userData);
      
      toast.success('Registration successful!');
    } catch (error) {
      toast.error('Registration failed. Please try again.');
      throw error;
    }
  };

  const logout = () => {
    localStorage.removeItem('brickstore_token');
    localStorage.removeItem('brickstore_user');
    setUser(null);
    toast.success('Logged out successfully');
  };

  const updateUser = (updates: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...updates };
      setUser(updatedUser);
      localStorage.setItem('brickstore_user', JSON.stringify(updatedUser));
    }
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}