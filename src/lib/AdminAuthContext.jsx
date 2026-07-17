import React, { createContext, useContext, useEffect, useState } from "react";
import { apiRequest, clearAdminToken, getAdminToken, setAdminToken } from "@/lib/api";

const AdminAuthContext = createContext();

export const AdminAuthProvider = ({ children }) => {
  const [admin, setAdmin] = useState(null);
  const [isLoadingAuth, setIsLoadingAuth] = useState(true);

  useEffect(() => {
    (async () => {
      if (!getAdminToken()) {
        setIsLoadingAuth(false);
        return;
      }
      try {
        const me = await apiRequest("/admin/me", { auth: true });
        setAdmin(me);
      } catch {
        clearAdminToken();
        setAdmin(null);
      } finally {
        setIsLoadingAuth(false);
      }
    })();
  }, []);

  const login = async (email, password) => {
    const { access_token } = await apiRequest("/admin/login", {
      method: "POST",
      body: { email, password },
    });
    setAdminToken(access_token);
    const me = await apiRequest("/admin/me", { auth: true });
    setAdmin(me);
  };

  const logout = () => {
    clearAdminToken();
    setAdmin(null);
  };

  return (
    <AdminAuthContext.Provider
      value={{ admin, isAuthenticated: !!admin, isLoadingAuth, login, logout }}
    >
      {children}
    </AdminAuthContext.Provider>
  );
};

export const useAdminAuth = () => {
  const context = useContext(AdminAuthContext);
  if (!context) {
    throw new Error("useAdminAuth must be used within an AdminAuthProvider");
  }
  return context;
};
