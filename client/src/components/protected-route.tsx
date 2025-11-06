import { Navigate } from "react-router-dom";
import { useAuth } from "../context/use-auth"
import { notifyError } from "../utils/notify";
import { useRef, useEffect, useState } from "react";

export const ProtectedRoute = ({ redirect = "/login", msg, children }: { redirect?: string, msg?: string; children: React.ReactNode}) => {
  const hasNotified = useRef(false);
  const { user } = useAuth();
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setChecked(true), 50);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (checked && !user && msg && !hasNotified.current){
      notifyError(msg)
      hasNotified.current = true;
    }
  }, [user, msg, checked])

  if (!checked) {
    return null;
  }

  return (
    user ? children : <Navigate to={redirect} replace={true} />
  )
}
