import Pages from "./pages";
import GlobalStyles from "./styles";
import { AuthProvider } from "./context/auth-provider";
import { Toaster } from "react-hot-toast";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <GlobalStyles />
        <Pages />
        <Toaster />
      </AuthProvider>
    </div>
  );
};

export default App;
