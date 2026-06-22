import React, { createContext, useState, useEffect, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is logged in
    const storedUser = localStorage.getItem('saas_task_user');
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoading(false);
  }, []);

  const login = async (email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (email && password) {
          const userData = { id: '1', name: 'Demo User', email };
          localStorage.setItem('saas_task_user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('Invalid credentials'));
        }
      }, 800);
    });
  };

  const register = async (name, email, password) => {
    // Mock API call
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        if (name && email && password) {
          const userData = { id: '1', name, email };
          localStorage.setItem('saas_task_user', JSON.stringify(userData));
          setUser(userData);
          resolve(userData);
        } else {
          reject(new Error('All fields are required'));
        }
      }, 800);
    });
  };

  const logout = () => {
    localStorage.removeItem('saas_task_user');
    setUser(null);
  };

  const value = {
    user,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};