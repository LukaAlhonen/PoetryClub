import Pages from "./pages";
import GlobalStyles from "./styles";
import { AuthProvider } from "./context/auth-provider";

const App = () => {
  return (
    <div>
      <AuthProvider>
        <GlobalStyles />
        <Pages />
      </AuthProvider>
    </div>
  );
};

export default App;
