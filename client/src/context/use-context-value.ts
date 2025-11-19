import { useState, useEffect } from "react";

export const useAuthContextValue = () => {
  const [user, setUser] = useState<string | null>(null);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem("username");
    if (savedUser) setUser(savedUser)
    const savedUserId = localStorage.getItem("userId");
    if (savedUserId) setUserId(savedUserId);
  }, [])

  useEffect(() => {
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "username" || event.key === "token" || event.key === "userId") {
        const savedUser = localStorage.getItem("username");
        const savedUserId = localStorage.getItem("userId");
        setUser(savedUser ? savedUser : null);
        setUserId(savedUserId ? savedUserId : null);
      }
    };
    window.addEventListener("storage", handleStorageChange);
    return () => window.removeEventListener("storage", handleStorageChange);
  }, [])

  const login = (token: string, username: string, userId: string) => {
    localStorage.setItem("token", token);
    localStorage.setItem("username", username);
    localStorage.setItem("userId", userId);
    setUser(username);
    setUserId(userId);
  }

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    localStorage.removeItem("userId")
    setUser(null)
  }

  return { user, userId, login, logout}
}
