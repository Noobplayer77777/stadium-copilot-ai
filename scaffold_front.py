from pathlib import Path
import os

src = Path('src')
lib = src / 'lib'
providers = src / 'providers'
components = src / 'components' / 'auth'

lib.mkdir(exist_ok=True, parents=True)
providers.mkdir(exist_ok=True, parents=True)
components.mkdir(exist_ok=True, parents=True)

# lib/auth.ts
auth_ts = '''export function getToken(): string | null {
  if (typeof window === "undefined") return null;
  return localStorage.getItem("stadium_access_token");
}

export function setToken(token: string): void {
  if (typeof window !== "undefined") {
    localStorage.setItem("stadium_access_token", token);
  }
}

export function removeToken(): void {
  if (typeof window !== "undefined") {
    localStorage.removeItem("stadium_access_token");
  }
}
'''
with open(lib / 'auth.ts', 'w') as f: f.write(auth_ts)

# lib/http.ts
http_ts = '''import { getToken, removeToken } from "./auth";

export const API_BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export async function fetchWithAuth(endpoint: string, options: RequestInit = {}) {
  const token = getToken();
  const headers = new Headers(options.headers || {});
  
  if (token) {
    headers.set("Authorization", Bearer );
  }
  if (!headers.has("Content-Type") && !(options.body instanceof FormData)) {
    headers.set("Content-Type", "application/json");
  }

  const response = await fetch(${API_BASE}, {
    ...options,
    headers,
  });

  if (response.status === 401) {
    // Token expired or invalid
    removeToken();
    if (typeof window !== "undefined" && !window.location.pathname.includes("/login")) {
      window.location.href = "/login";
    }
  }

  if (!response.ok) {
    throw new Error(API Error: );
  }

  return response;
}
'''
with open(lib / 'http.ts', 'w') as f: f.write(http_ts)

# lib/api.ts
api_ts = '''import { fetchWithAuth } from "./http";
import type { User } from "@/types";

export const api = {
  auth: {
    login: async (email: string, password: string) => {
      const formData = new URLSearchParams();
      formData.append("username", email);
      formData.append("password", password);

      const response = await fetchWithAuth("/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData,
      });
      return response.json();
    },
    getMe: async (): Promise<User> => {
      const response = await fetchWithAuth("/auth/me");
      const data = await response.json();
      return {
        id: data.id,
        name: data.full_name,
        email: data.email,
        role: data.role.name,
        language: "en", // default for now
      };
    }
  }
};
'''
with open(lib / 'api.ts', 'w') as f: f.write(api_ts)

# providers/AuthProvider.tsx
auth_provider = '''"use client";

import { createContext, useContext, useEffect, useState, ReactNode } from "react";
import { useRouter, usePathname } from "next/navigation";
import { User } from "@/types";
import { api } from "@/lib/api";
import { getToken, removeToken } from "@/lib/auth";

interface AuthContextType {
  user: User | null;
  isLoading: boolean;
  logout: () => void;
  refreshUser: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const router = useRouter();
  const pathname = usePathname();

  const refreshUser = async () => {
    try {
      const token = getToken();
      if (!token) throw new Error("No token");
      const userData = await api.auth.getMe();
      setUser(userData);
    } catch (e) {
      setUser(null);
      removeToken();
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    refreshUser();
  }, []);

  const logout = () => {
    setUser(null);
    removeToken();
    router.push("/login");
  };

  return (
    <AuthContext.Provider value={{ user, isLoading, logout, refreshUser }}>
      {children}
    </AuthContext.Provider>
  );
}

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) throw new Error("useAuth must be used within AuthProvider");
  return context;
};
'''
with open(providers / 'AuthProvider.tsx', 'w') as f: f.write(auth_provider)

# components/auth/ProtectedRoute.tsx
protected_route = '''"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/providers/AuthProvider";

export function ProtectedRoute({ children, allowedRoles }: { children: React.ReactNode, allowedRoles?: string[] }) {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (!user) {
        router.replace("/login");
      } else if (allowedRoles && !allowedRoles.includes(user.role)) {
        // Redirect to their default dashboard if they don't have access
        router.replace(//dashboard);
      }
    }
  }, [user, isLoading, router, allowedRoles]);

  if (isLoading) {
    return (
      <div className="flex h-screen w-screen items-center justify-center">
        <div className="h-16 w-16 animate-spin rounded-full border-b-2 border-t-2 border-primary"></div>
      </div>
    );
  }

  if (!user) return null;
  
  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return null;
  }

  return <>{children}</>;
}
'''
with open(components / 'ProtectedRoute.tsx', 'w') as f: f.write(protected_route)

# update providers/index.tsx
prov_index_path = providers / 'index.tsx'
if prov_index_path.exists():
    with open(prov_index_path, 'r') as f:
        content = f.read()
    if 'AuthProvider' not in content:
        content = 'import { AuthProvider } from "./AuthProvider";\n' + content
        content = content.replace('<ThemeProvider', '<AuthProvider>\n      <ThemeProvider')
        content = content.replace('</ThemeProvider>', '</ThemeProvider>\n    </AuthProvider>')
        with open(prov_index_path, 'w') as f:
            f.write(content)

print("Frontend auth scaffolding complete")
