import { fetchWithAuth } from "./http";
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
