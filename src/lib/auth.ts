export function getToken(): string | null {
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
