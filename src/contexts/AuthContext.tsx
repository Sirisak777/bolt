import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, AuthState } from '../types';

interface AuthContextType extends AuthState {
  login: (email: string, password: string) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
}

interface RegisterData {
  email: string;
  password: string;
  name: string;
  shopName: string;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
  });

  useEffect(() => {
    // Check for stored user data on app load
    const storedUser = localStorage.getItem('bakery_user');
    if (storedUser) {
      try {
        const user = JSON.parse(storedUser);
        setState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
      } catch {
        localStorage.removeItem('bakery_user');
        setState(prev => ({ ...prev, isLoading: false }));
      }
    } else {
      setState(prev => ({ ...prev, isLoading: false }));
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    // Mock authentication - in real app, this would be an API call
    if (email === 'demo@bakery.com' && password === 'demo123') {
      const user: User = {
        id: '1',
        email,
        name: 'Demo User',
        shopName: 'Sweet Dreams Bakery',
        createdAt: new Date(),
      };
      
      localStorage.setItem('bakery_user', JSON.stringify(user));
      setState({
        user,
        isAuthenticated: true,
        isLoading: false,
      });
      return true;
    }
    
    setState(prev => ({ ...prev, isLoading: false }));
    return false;
  };

  const register = async (data: RegisterData): Promise<boolean> => {
    setState(prev => ({ ...prev, isLoading: true }));
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    const user: User = {
      id: Date.now().toString(),
      email: data.email,
      name: data.name,
      shopName: data.shopName,
      createdAt: new Date(),
    };
    
    localStorage.setItem('bakery_user', JSON.stringify(user));
    setState({
      user,
      isAuthenticated: true,
      isLoading: false,
    });
    return true;
  };

  const logout = () => {
    localStorage.removeItem('bakery_user');
    setState({
      user: null,
      isAuthenticated: false,
      isLoading: false,
    });
    // Redirect to landing page after logout
    window.location.href = '/';
  };

  return (
    <AuthContext.Provider value={{ ...state, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};