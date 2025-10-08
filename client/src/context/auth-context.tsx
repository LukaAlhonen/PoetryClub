import { createContext } from "react";

type AuthContextType = {
  user: string | null;
  login: (token: string, username: string) => void;
  logout: () => void;
}

export const AuthContext = createContext<AuthContextType | null>(null);
