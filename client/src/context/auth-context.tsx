import { createContext } from "react";

type AuthContextType = {
  user: string | null;
  userId: string | null;
  login: (token: string, username: string, userId: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
