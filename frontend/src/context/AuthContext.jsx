// src/context/AuthContext.jsx
import { useState } from 'react';
import { AuthContext } from './authContext.js';

export const AuthProvider = ({ children }) => {
  // lazy init so we only read localStorage once at startup
  const [user, setUser] = useState(() => {
    const storedUser = localStorage.getItem('applyflow_user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const [token, setToken] = useState(() => {
    return localStorage.getItem('applyflow_token') || null;
  });

  const login = (userData, jwt) => {
    setUser(userData);
    setToken(jwt);
    localStorage.setItem('applyflow_token', jwt);
    localStorage.setItem('applyflow_user', JSON.stringify(userData));
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem('applyflow_token');
    localStorage.removeItem('applyflow_user');
  };

  return (
    <AuthContext.Provider value={{ user, token, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;



