import { useAuthContextValue } from "./use-context-value";
import { AuthContext } from "./auth-context";
import { type ReactNode } from "react";

export const AuthProvider = ({ children }: { children: ReactNode}) => {
  const value = useAuthContextValue();

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}
