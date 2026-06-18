import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";

import api from "../services/api";

const AuthContext = createContext(null);

const USER_KEY = "taskflow-user";
const TOKEN_KEY = "taskflow-token";

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [authReady, setAuthReady] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const storedUser = localStorage.getItem(USER_KEY) || localStorage.getItem("user");
    const storedToken = localStorage.getItem(TOKEN_KEY) || localStorage.getItem("token");

    setUser(storedUser ? JSON.parse(storedUser) : null);
    setToken(storedToken || null);
    setAuthReady(true);
  }, []);

  useEffect(() => {
    if (user) {
      localStorage.setItem(USER_KEY, JSON.stringify(user));
      localStorage.setItem("user", JSON.stringify(user));
    } else {
      localStorage.removeItem(USER_KEY);
      localStorage.removeItem("user");
    }

    if (token) {
      localStorage.setItem(TOKEN_KEY, token);
      localStorage.setItem("token", token);
    } else {
      localStorage.removeItem(TOKEN_KEY);
      localStorage.removeItem("token");
    }
  }, [token, user]);

  const login = useCallback(async (credentials) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/login", credentials);
      setUser(data.user);
      setToken(data.token);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const register = useCallback(async (payload) => {
    setLoading(true);
    try {
      const { data } = await api.post("/auth/register", payload);
      return data;
    } finally {
      setLoading(false);
    }
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    setToken(null);
  }, []);

  const value = useMemo(
    () => ({ user, token, loading, authReady, login, register, logout, setUser, setToken, isAuthenticated: Boolean(token && user) }),
    [authReady, loading, login, logout, register, token, user]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  return context;
}