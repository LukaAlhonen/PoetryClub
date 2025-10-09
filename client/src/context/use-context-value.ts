import { useState, useEffect } from "react";

export const useAuthContextValue = () => {
  const [user, setUser] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser)
  }, [])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "username" || event.key === "token") {
        const savedUser = localStorage.getItem("username");
        setUser(savedUser ? savedUser : null)
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [])

  const login = (token: string, username: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username)
    setUser(username)
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    setUser(null)
  }

  return { user, login, logout}
}
