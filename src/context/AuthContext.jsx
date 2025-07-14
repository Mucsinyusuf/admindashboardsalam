// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => Cookies.get("token") || null);
  const [tokenExpiry, setTokenExpiry] = useState(() => Cookies.get("tokenExpiry") || null);
  const [user, setUser] = useState(() => {
    const userData = Cookies.get("user");
    return userData ? JSON.parse(userData) : null;
  });

  const isAuthenticated = !!token;

  const login = (jwt, expiry, userData) => {
    Cookies.set("token", jwt);
    Cookies.set("tokenExpiry", expiry);
    Cookies.set("user", JSON.stringify(userData));

    setToken(jwt);
    setTokenExpiry(expiry);
    setUser(userData);
  };

  const logout = () => {
    Cookies.remove("token");
    Cookies.remove("tokenExpiry");
    Cookies.remove("user");

    setToken(null);
    setTokenExpiry(null);
    setUser(null);

    navigate("/signin", { replace: true });
  };

  // Auto-logout if token is expired
  useEffect(() => {
    if (token && tokenExpiry) {
      const expiryTime = Number(tokenExpiry);
      if (Date.now() > expiryTime) {
        logout();
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpiry]);

  return (
    <AuthContext.Provider value={{ token, tokenExpiry, user, isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
