import { createContext, useContext, useEffect, useState } from "react";
import { jwtDecode } from "jwt-decode";
import type { User } from "../types/user.types";
import type { JWTPayload } from "../types/auth.types";

interface AuthContextType {
  user: User | null;
  token: string | null;
  loading: boolean;
  login: (token: string) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [token, setToken] = useState<string | null>(
    localStorage.getItem("token")
  );
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

useEffect(() => {
  if (token) {
    try {
      const decoded = jwtDecode<JWTPayload>(token);

      setUser({
        _id: decoded._id,
        name: decoded.name,
        email: decoded.email,
        avatar: decoded.avatar,
      });
    } catch (error) {
      console.error("Invalid token:", error);
      setToken(null);
      localStorage.removeItem("token");
      setUser(null);
    }
  } else {
    setUser(null);
  }
  const timer = setTimeout(() => {
    setLoading(false);
  }, 50);

  return () => clearTimeout(timer);
}, [token]);

  const login = (newToken: string) => {
    localStorage.setItem("token", newToken);
    setToken(newToken);
  };

  const logout = () => {
    localStorage.removeItem("token");
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, loading, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
};