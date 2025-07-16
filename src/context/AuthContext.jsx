// src/context/AuthContext.jsx
import React, { createContext, useContext, useEffect, useState } from "react";
import PropTypes from "prop-types";
import Cookies from "js-cookie";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [token, setToken] = useState(() => Cookies.get("token") || null);
  const [tokenExpiry, setTokenExpiry] = useState(() => {
    const raw = Cookies.get("tokenExpiry");
    return raw ? Number(raw) * 1000 : null; // convert to milliseconds
  });
  const [user, setUser] = useState(() => {
    const userData = Cookies.get("user");
    return userData ? JSON.parse(userData) : null;
  });

  const isAuthenticated = !!token;

  const login = (jwt, expiryInSeconds, userData) => {
    const expiryMs = expiryInSeconds * 1000;

    Cookies.set("token", jwt);
    Cookies.set("tokenExpiry", expiryInSeconds); // store as seconds
    Cookies.set("user", JSON.stringify(userData));

    setToken(jwt);
    setTokenExpiry(expiryMs);
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

  // Auto logout on token expiry
  useEffect(() => {
    if (token && tokenExpiry) {
      const now = Date.now();
      const remainingTime = tokenExpiry - now;

      if (remainingTime <= 0) {
        logout();
      } else {
        const timeout = setTimeout(() => logout(), remainingTime);
        return () => clearTimeout(timeout);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token, tokenExpiry]);

  return (
    <AuthContext.Provider
      value={{
        token,
        tokenExpiry,
        user,
        isAuthenticated,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useAuth = () => useContext(AuthContext);
