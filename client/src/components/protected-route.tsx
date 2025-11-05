import { Navigate } from "react-router-dom";
import { useAuth } from "../context/use-auth"
import { notifyError } from "../utils/notify";
import { useRef, useEffect } from "react";

export const ProtectedRoute = ({ redirect = "/login", msg, children }: { redirect?: string, msg?: string; children: React.ReactNode}) => {
  const hasNotified = useRef(false);
  const { user } = useAuth();

  useEffect(() => {
    if (!user && msg && !hasNotified.current){
      notifyError(msg)
      hasNotified.current = true;
    }
  }, [user, msg])

  return (
    user ? children : <Navigate to={redirect} replace={true} />
  )
}
