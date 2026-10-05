"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { server } from "@/app/_api/api";

const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);
  const router = useRouter();

  useEffect(() => {
    try {
      const savedToken = localStorage.getItem("token");
      const savedUser = localStorage.getItem("user");

      if (savedToken && savedUser) {
        setToken(savedToken);
        setUser(JSON.parse(savedUser));
      }
    } catch (error) {
      console.error("Failed to parse stored auth state", error);
    } finally {
      setLoading(false);
    }
  }, []);

  const login = async (email, password) => {
    const res = await server.post("/auth/login", { email, password });
    const { token: newToken, user: userData } = res.data;

    const adminUserData = {
      ...userData,
      role: userData?.role || "admin",
    };

    localStorage.setItem("token", newToken);
    localStorage.setItem("user", JSON.stringify(adminUserData));

    setToken(newToken);
    setUser(adminUserData);

    router.push("/admin/dishes");
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setToken(null);
    setUser(null);
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
