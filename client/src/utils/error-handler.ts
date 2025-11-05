import type { ErrorLike } from "@apollo/client"
import { notify, notifyError } from "./notify"
import { useApolloClient } from "@apollo/client/react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/use-auth";

export const useHandleError = () => {
  const client = useApolloClient();
  const navigate = useNavigate();
  const { logout } = useAuth();

  return ({error, shouldNotify = true }: { error: ErrorLike, shouldNotify?: boolean }) => {
    console.log("hello2")
    if (error.message === "not authenticated") {
      console.log("hello3")
      client.clearStore();
      logout();
      navigate("/login")
      if(shouldNotify) notifyError(error.message);
    } else if (error.message === "Poem does not exist" || error.message === "Author does not exist") {
      if(shouldNotify) notifyError(error.message)
      navigate("/")
    } else {
      // navigate(0)
      if (shouldNotify) notifyError(error.message)
      client.refetchObservableQueries()
    }
  }
}
