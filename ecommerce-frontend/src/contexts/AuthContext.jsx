// src/contexts/AuthContext.jsx
import { useContext, createContext, useState, useEffect, useCallback } from 'react';
import api from '../services/api';
import { toast } from 'react-toastify';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // Track initial auth check
  const [error, setError] = useState(null);

  // Login function
  const login = useCallback(async (credentials) => {
    try {
      setLoading(true);
      const { data } = await api.login(credentials);
      
      localStorage.setItem('token', data.token);
      setUser(data.user);
      setError(null);
      
      toast.success('Login successful!');
      return data.user;
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
      toast.error(err.response?.data?.message || 'Login failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Logout function
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    setUser(null);
    toast.success('Logged out successfully');
  }, []);

  // Check auth state on initial load
  const checkAuth = useCallback(async () => {
    try {
      setLoading(true);
      const token = localStorage.getItem('token');
      
      if (token) {
        const { data } = await api.getProfile();
        setUser(data);
      }
    } catch (err) {
      localStorage.removeItem('token');
      setError('Session expired. Please login again.');
    } finally {
      setLoading(false);
    }
  }, []);

  // Update profile function
  const updateProfile = useCallback(async (profileData) => {
    try {
      setLoading(true);
      const { data } = await api.updateProfile(profileData);
      setUser(data);
      toast.success('Profile updated successfully!');
      return data;
    } catch (err) {
      setError(err.response?.data?.message || 'Profile update failed');
      toast.error(err.response?.data?.message || 'Profile update failed');
      throw err;
    } finally {
      setLoading(false);
    }
  }, []);

  // Check auth state on mount
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  // Context value
  const value = {
    user,
    loading,
    error,
    login,
    logout,
    updateProfile,
    isAuthenticated: !!user, // Boolean flag for easy checks
    checkAuth // Allow manual re-check of auth state
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};