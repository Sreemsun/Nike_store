// src/context/AuthContext.jsx
import React, { createContext, useContext, useState, useEffect } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // On mount, check for user in localStorage
    const token = localStorage.getItem('access_token');
    const email = localStorage.getItem('user_email');
    if (token && email) {
      setUser({ email, token });
    } else {
      setUser(null);
    }
  }, []);

  const login = (email, token) => {
    localStorage.setItem('access_token', token);
    localStorage.setItem('user_email', email);
    setUser({ email, token });
  };

  const logout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('user_email');
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
